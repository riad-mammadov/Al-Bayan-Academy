import os

from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt

from db import supabase
from auth import (
    create_jwt,
    hash_password,
    check_password,
    require_auth,
    JWT_SECRET,
    JWT_ALGORITHM,
    JWT_EXP_HOURS,
)


# ── Environment-driven config ───────────────────────────────────────────────
# Set ALLOWED_ORIGINS (comma-separated) on Render once the Vercel URL is known.
# Defaults are local dev.
_default_origins = "http://127.0.0.1:3000,http://localhost:3000"
ALLOWED_ORIGINS = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", _default_origins).split(",") if o.strip()
]

# Set PRODUCTION=true on Render so cookies use secure=True, samesite="None"
# (required for cross-domain auth between Vercel + Render).
IS_PRODUCTION = os.getenv("PRODUCTION", "false").lower() == "true"
COOKIE_SECURE = IS_PRODUCTION
COOKIE_SAMESITE = "None" if IS_PRODUCTION else "Lax"


app = Flask(__name__)
CORS(app, supports_credentials=True, origins=ALLOWED_ORIGINS)

# Fields to return from the users table; never include password_hash.
USER_PUBLIC_FIELDS = "id,name,email,role,created_at"

AUTH_COOKIE_NAME = "auth_token"
AUTH_COOKIE_MAX_AGE = JWT_EXP_HOURS * 3600  # keep cookie + JWT in lockstep


def _set_auth_cookie(resp, token):
    resp.set_cookie(
        AUTH_COOKIE_NAME,
        token,
        httponly=True,
        samesite=COOKIE_SAMESITE,
        secure=COOKIE_SECURE,
        max_age=AUTH_COOKIE_MAX_AGE,
        path="/",
    )


def _clear_auth_cookie(resp):
    resp.set_cookie(
        AUTH_COOKIE_NAME,
        "",
        httponly=True,
        samesite=COOKIE_SAMESITE,
        secure=COOKIE_SECURE,
        expires=0,
        max_age=0,
        path="/",
    )


# ── Health ──────────────────────────────────────────────────────────────────
@app.get("/api/health")
def health():
    return jsonify({"status": "healthy"}), 200


# ── Auth ────────────────────────────────────────────────────────────────────
@app.get("/auth/me")
def me():
    token = request.cookies.get(AUTH_COOKIE_NAME)
    if not token:
        return jsonify({"authenticated": False})

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        return jsonify({"authenticated": False})

    user_id = payload.get("sub")
    role = payload.get("role")

    user = None
    if user_id is not None:
        try:
            uid = int(user_id)
        except (TypeError, ValueError):
            uid = user_id
        user_res = (
            supabase.table("users")
            .select(USER_PUBLIC_FIELDS)
            .eq("id", uid)
            .maybe_single()
            .execute()
        )
        user = user_res.data if user_res and user_res.data else None

    return jsonify({"authenticated": True, "role": role, "user": user})


@app.post("/auth/register")
def register():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    name = (data.get("name") or "").strip()

    if not email or not password or not name:
        return jsonify({"error": "Email, name and password are required"}), 400

    existing_res = supabase.table("users").select("id").eq("email", email).execute()
    if existing_res.data:
        return jsonify({"error": "Email is already in use"}), 400

    insert_res = (
        supabase.table("users")
        .insert(
            {
                "email": email,
                "password_hash": hash_password(password),
                "role": "student",
                "name": name,
            }
        )
        .execute()
    )

    if not insert_res.data:
        return jsonify({"error": "Failed to create user, please try again."}), 500

    user = insert_res.data[0]
    token = create_jwt(user["id"], user["role"])

    resp = jsonify(
        {"id": user["id"], "email": user["email"], "role": user["role"]}
    )
    _set_auth_cookie(resp, token)
    return resp, 201


@app.post("/auth/login")
def login():
    try:
        data = request.get_json() or {}
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        res = supabase.table("users").select("*").eq("email", email).execute()
        if not res.data:
            return jsonify({"error": "Invalid email or password"}), 400

        user = res.data[0]
        if not check_password(user["password_hash"], password):
            return jsonify({"error": "Invalid credentials"}), 401

        token = create_jwt(user["id"], user["role"])

        resp = jsonify(
            {"id": user["id"], "email": user["email"], "role": user["role"]}
        )
        _set_auth_cookie(resp, token)
        return resp
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"error": "An error occurred during login"}), 500


@app.post("/auth/logout")
def logout():
    resp = jsonify({"ok": True})
    _clear_auth_cookie(resp)
    return resp


# ── Helpers ─────────────────────────────────────────────────────────────────
def _current_user_id():
    """Return the authenticated user id as an int (matches DB schema)."""
    sub = request.user["sub"]
    try:
        return int(sub)
    except (TypeError, ValueError):
        return sub


# ── Student dashboard ───────────────────────────────────────────────────────
@app.get("/student/dashboard")
@require_auth(role="student")
def student_dashboard():
    try:
        user_id = _current_user_id()

        user_res = (
            supabase.table("users")
            .select(USER_PUBLIC_FIELDS)
            .eq("id", user_id)
            .maybe_single()
            .execute()
        )
        user = user_res.data if user_res and user_res.data else {}

        # Enrolled classes
        accepted_enrollments_res = (
            supabase.table("class_enrollments")
            .select("*")
            .eq("student_id", user_id)
            .execute()
        )
        accepted_enrollments = accepted_enrollments_res.data or []
        enrolled_class_ids = {
            e["class_id"] for e in accepted_enrollments if e.get("class_id")
        }

        accepted_classes = []
        if enrolled_class_ids:
            enrolled_classes_res = (
                supabase.table("classes")
                .select("*")
                .in_("id", list(enrolled_class_ids))
                .execute()
            )
            class_map = {c["id"]: c for c in (enrolled_classes_res.data or [])}
            for cid in enrolled_class_ids:
                c = class_map.get(cid)
                if not c:
                    continue
                accepted_classes.append(
                    {
                        "id": c.get("id"),
                        "title": c.get("title", ""),
                        "day": c.get("day", ""),
                        "time": c.get("time", ""),
                        "meeting_link": c.get("meeting_link", ""),
                        "description": c.get("description", ""),
                    }
                )

        # Pending requests
        pending_requests_res = (
            supabase.table("class_requests")
            .select("*")
            .eq("student_id", user_id)
            .eq("status", "pending")
            .execute()
        )
        pending_requests = pending_requests_res.data or []

        pending_class_ids = set()
        for req in pending_requests:
            for cid in req.get("class_ids") or []:
                try:
                    pending_class_ids.add(int(cid))
                except (ValueError, TypeError):
                    pass

        pending_classes = []
        if pending_class_ids:
            pending_classes_res = (
                supabase.table("classes")
                .select("*")
                .in_("id", list(pending_class_ids))
                .execute()
            )
            class_map = {c["id"]: c for c in (pending_classes_res.data or [])}

            for req in pending_requests:
                for cid in req.get("class_ids") or []:
                    try:
                        cid = int(cid)
                    except (ValueError, TypeError):
                        continue
                    if cid in class_map:
                        c = dict(class_map[cid])
                        if req.get("date"):
                            c["date"] = req["date"]
                        if req.get("time"):
                            c["request_time"] = req["time"]
                        pending_classes.append(c)

        # Available classes (not enrolled and not pending)
        all_classes_res = supabase.table("classes").select("*").execute()
        all_classes = all_classes_res.data or []
        available_classes = [
            c
            for c in all_classes
            if c["id"] not in enrolled_class_ids and c["id"] not in pending_class_ids
        ]

        return jsonify(
            {
                "profile": {
                    "name": user.get("name", ""),
                    "email": user.get("email", ""),
                    "role": user.get("role", "student"),
                    "joinedDate": user.get("created_at", ""),
                },
                "accepted_classes": accepted_classes,
                "pending_classes": pending_classes,
                "available_classes": available_classes,
            }
        )
    except Exception as e:
        import traceback

        traceback.print_exc()
        return jsonify({"error": f"Failed to load dashboard: {str(e)}"}), 500


# ── Admin dashboard ─────────────────────────────────────────────────────────
@app.get("/admin/dashboard")
@require_auth(role="admin")
def admin_dashboard():
    students = (
        supabase.table("users")
        .select(USER_PUBLIC_FIELDS)
        .eq("role", "student")
        .execute()
    )
    classes = supabase.table("classes").select("*").execute()

    requests_res = (
        supabase.table("class_requests").select("*").eq("status", "pending").execute()
    )
    requests_data = requests_res.data or []

    student_ids = {req["student_id"] for req in requests_data if req.get("student_id")}
    users_map = {}
    if student_ids:
        users_res = (
            supabase.table("users")
            .select(USER_PUBLIC_FIELDS)
            .in_("id", list(student_ids))
            .execute()
        )
        if users_res.data:
            users_map = {int(u["id"]): u for u in users_res.data}

    requests_with_users = []
    for req in requests_data:
        req_dict = dict(req)
        sid = req.get("student_id")
        if sid is not None and int(sid) in users_map:
            req_dict["users"] = users_map[int(sid)]
        requests_with_users.append(req_dict)

    return jsonify(
        {
            "students": students.data or [],
            "classes": classes.data or [],
            "requests": requests_with_users,
        }
    )


@app.get("/admin/classes/<int:class_id>")
@require_auth(role="admin")
def get_class_details(class_id):
    class_res = (
        supabase.table("classes")
        .select("*")
        .eq("id", class_id)
        .maybe_single()
        .execute()
    )
    if not class_res or not class_res.data:
        return jsonify({"error": "Class not found"}), 404

    enrollments_res = (
        supabase.table("class_enrollments")
        .select("*")
        .eq("class_id", class_id)
        .execute()
    )
    enrollments = enrollments_res.data or []
    student_ids = {e["student_id"] for e in enrollments if e.get("student_id")}

    enrolled_students = []
    if student_ids:
        users_res = (
            supabase.table("users")
            .select(USER_PUBLIC_FIELDS)
            .in_("id", list(student_ids))
            .execute()
        )
        enrolled_students = [
            {"id": u["id"], "name": u["name"], "email": u["email"]}
            for u in (users_res.data or [])
        ]

    all_students_res = (
        supabase.table("users")
        .select(USER_PUBLIC_FIELDS)
        .eq("role", "student")
        .execute()
    )
    all_students = all_students_res.data or []

    announcements_res = (
        supabase.table("class_announcements")
        .select("*")
        .eq("class_id", class_id)
        .order("created_at", desc=True)
        .execute()
    )
    announcements = announcements_res.data or []

    return jsonify(
        {
            "class": class_res.data,
            "students": enrolled_students,
            "all_students": all_students,
            "announcements": announcements,
        }
    )


@app.post("/admin/classes/<int:class_id>/add-student")
@require_auth(role="admin")
def add_student_to_class(class_id):
    data = request.get_json() or {}
    student_id = data.get("student_id")
    if not student_id:
        return jsonify({"error": "Student ID is required"}), 400

    class_res = (
        supabase.table("classes")
        .select("id")
        .eq("id", class_id)
        .maybe_single()
        .execute()
    )
    if not class_res or not class_res.data:
        return jsonify({"error": "Class not found"}), 404

    student_res = (
        supabase.table("users")
        .select("id")
        .eq("id", student_id)
        .eq("role", "student")
        .maybe_single()
        .execute()
    )
    if not student_res or not student_res.data:
        return jsonify({"error": "Student not found"}), 404

    existing = (
        supabase.table("class_enrollments")
        .select("id")
        .eq("class_id", class_id)
        .eq("student_id", student_id)
        .execute()
    )
    if existing.data:
        return jsonify({"error": "Student is already enrolled in this class"}), 400

    enrollment_res = (
        supabase.table("class_enrollments")
        .insert({"class_id": class_id, "student_id": student_id})
        .execute()
    )
    if not enrollment_res.data:
        return jsonify({"error": "Failed to add student to class"}), 500

    return jsonify({"ok": True, "message": "Student added successfully"}), 201


@app.post("/admin/classes/<int:class_id>/remove-student")
@require_auth(role="admin")
def remove_student_from_class(class_id):
    data = request.get_json() or {}
    student_id = data.get("student_id")
    if not student_id:
        return jsonify({"error": "Student ID is required"}), 400

    supabase.table("class_enrollments").delete().eq("class_id", class_id).eq(
        "student_id", student_id
    ).execute()

    return jsonify({"ok": True})


# ── Student class requests ──────────────────────────────────────────────────
@app.post("/classes/request")
@require_auth(role="student")
def request_class():
    """Bulk request for weekly classes (no specific date/time)."""
    data = request.get_json() or {}
    user_id = _current_user_id()

    class_ids = data.get("selectedClasses", [])
    extra_details = data.get("extraDetails", "")

    if not class_ids:
        return jsonify({"error": "No classes selected"}), 400

    supabase.table("class_requests").insert(
        {
            "student_id": user_id,
            "class_ids": class_ids,
            "status": "pending",
            "extra_details": extra_details,
        }
    ).execute()

    return jsonify({"ok": True})


@app.post("/classes/request-lesson")
@require_auth(role="student")
def request_lesson():
    """Single one-off lesson booking with a specific date and time."""
    data = request.get_json() or {}
    user_id = _current_user_id()

    class_id = data.get("class_id")
    date = data.get("date")
    time = data.get("time")
    extra_details = data.get("extra_details", "")

    if not class_id or not date or not time:
        return jsonify({"error": "class_id, date and time are required"}), 400

    supabase.table("class_requests").insert(
        {
            "student_id": user_id,
            "class_ids": [class_id],
            "status": "pending",
            "extra_details": extra_details,
            "date": date,
            "time": time,
        }
    ).execute()

    return jsonify({"ok": True})


@app.post("/admin/requests/approve")
@require_auth(role="admin")
def approve_request():
    data = request.get_json() or {}
    req_id = data.get("request_id")
    if not req_id:
        return jsonify({"error": "request_id is required"}), 400

    req = (
        supabase.table("class_requests")
        .select("*")
        .eq("id", req_id)
        .maybe_single()
        .execute()
    )
    if not req or not req.data:
        return jsonify({"error": "Request not found"}), 404

    if req.data.get("status") != "pending":
        return jsonify({"error": "Request is not pending"}), 400

    student_id = req.data["student_id"]
    class_ids = req.data.get("class_ids") or []

    supabase.table("class_requests").update({"status": "accepted"}).eq(
        "id", req_id
    ).execute()

    # Skip classes the student is already enrolled in to avoid duplicates.
    if class_ids:
        existing_res = (
            supabase.table("class_enrollments")
            .select("class_id")
            .eq("student_id", student_id)
            .in_("class_id", class_ids)
            .execute()
        )
        already = {e["class_id"] for e in (existing_res.data or [])}
        new_enrollments = [
            {"student_id": student_id, "class_id": cid}
            for cid in class_ids
            if cid not in already
        ]
        if new_enrollments:
            supabase.table("class_enrollments").insert(new_enrollments).execute()

    return jsonify({"ok": True})


@app.post("/admin/requests/reject")
@require_auth(role="admin")
def reject_request():
    data = request.get_json() or {}
    req_id = data.get("request_id")
    if not req_id:
        return jsonify({"error": "request_id is required"}), 400

    supabase.table("class_requests").update({"status": "rejected"}).eq(
        "id", req_id
    ).execute()

    return jsonify({"ok": True})


# ── Student class detail ────────────────────────────────────────────────────
@app.get("/student/classes/<int:class_id>")
@require_auth(role="student")
def get_student_class_details(class_id):
    try:
        user_id = _current_user_id()

        enrollment_res = (
            supabase.table("class_enrollments")
            .select("id")
            .eq("student_id", user_id)
            .eq("class_id", class_id)
            .limit(1)
            .execute()
        )
        if not enrollment_res.data:
            return jsonify({"error": "You are not enrolled in this class"}), 403

        class_res = (
            supabase.table("classes")
            .select("*")
            .eq("id", class_id)
            .maybe_single()
            .execute()
        )
        if not class_res or not class_res.data:
            return jsonify({"error": "Class not found"}), 404

        announcements_res = (
            supabase.table("class_announcements")
            .select("*")
            .eq("class_id", class_id)
            .order("created_at", desc=True)
            .execute()
        )

        return jsonify(
            {
                "class": class_res.data,
                "announcements": announcements_res.data or [],
            }
        )
    except Exception as e:
        import traceback

        traceback.print_exc()
        return jsonify({"error": f"Failed to load class details: {str(e)}"}), 500


# ── Teacher / admin announcements ───────────────────────────────────────────
@app.post("/teacher/class/announcement")
@require_auth(role="admin")
def post_announcement():
    teacher_id = _current_user_id()
    data = request.get_json() or {}

    class_id = data.get("class_id")
    message = (data.get("message") or "").strip()

    if not class_id or not message:
        return jsonify({"error": "Missing class_id or message"}), 400

    result = (
        supabase.table("class_announcements")
        .insert({"class_id": class_id, "teacher_id": teacher_id, "message": message})
        .execute()
    )

    return jsonify({"ok": True, "announcement": result.data[0] if result.data else None})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
