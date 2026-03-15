from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import date, datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash
from db import supabase
from auth import (
    create_jwt,
    hash_password,
    check_password,
    require_auth,
    JWT_SECRET,
    JWT_ALGORITHM,
)
from flask_cors import CORS
import jwt


app = Flask(__name__)
CORS(
    app,
    supports_credentials=True,
    origins=["http://127.0.0.1:3000", "http://localhost:3000"],
)


# API Routes
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200


# Auth status route
@app.get("/auth/me")
def me():
    token = request.cookies.get("auth_token")
    if not token:
        return jsonify({"authenticated": False})

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return jsonify({"authenticated": True, "user": payload["role"]})
    except:
        return jsonify({"authenticated": False})


# Account Routes
@app.post("/auth/register")
def register():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    name = data.get("name") or ""

    if not email or not password or not name:
        return jsonify({"error": "Email, Name and password are required"}), 400

    # Check if user exists in DB
    existing_res = supabase.table("users").select("id").eq("email", email).execute()

    if existing_res.data:
        return jsonify({"error": "Email is already in use"}), 400

    # Hash password
    password_hash = hash_password(password)

    # Insert user with default role student
    insert_res = (
        supabase.table("users")
        .insert(
            {
                "email": email,
                "password_hash": password_hash,
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
        {
            "id": user["id"],
            "email": user["email"],
            "role": user["role"],
        }
    )
    resp.set_cookie(
        "auth_token",
        token,
        httponly=True,
    )
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

        if not res.data or len(res.data) == 0:
            return jsonify({"error": "Invalid email or password"}), 400

        user = res.data[0]

        if not check_password(user["password_hash"], password):
            return jsonify({"error": "Invalid credentials"}), 401

        token = create_jwt(user["id"], user["role"])

        response_data = {
            "id": user["id"],
            "email": user["email"],
            "role": user["role"],
        }

        resp = jsonify(response_data)
        resp.set_cookie(
            "auth_token",
            token,
            httponly=True,
            samesite="Lax",
            secure=False,
            max_age=86400 * 7,  # 7 days
        )

        return resp
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"error": "An error occurred during login"}), 500


@app.post("/auth/logout")
def logout():
    resp = jsonify({"ok": True})
    resp.set_cookie("auth_token", "", expires=0)
    return resp


# Student Dashboard route
@app.get("/student/dashboard")
@require_auth(role="student")
def student_dashboard():
    try:
        user_id = request.user["sub"]

        # Get user info
        user_res = (
            supabase.table("users")
            .select("*")
            .eq("id", user_id)
            .maybe_single()
            .execute()
        )
        user = user_res.data if user_res.data else {}

        # Accepted classes (enrollments) - fetch enrollments first
        accepted_enrollments_res = (
            supabase.table("class_enrollments")
            .select("*")
            .eq("student_id", user_id)
            .execute()
        )
        accepted_enrollments = (
            accepted_enrollments_res.data if accepted_enrollments_res.data else []
        )

        # Get class IDs from enrollments
        enrolled_class_ids = {
            e["class_id"] for e in accepted_enrollments if e.get("class_id")
        }

        # Fetch class details for enrolled classes
        accepted_classes = []
        if enrolled_class_ids:
            enrolled_classes_res = (
                supabase.table("classes")
                .select("*")
                .in_("id", list(enrolled_class_ids))
                .execute()
            )
            enrolled_classes_data = (
                enrolled_classes_res.data if enrolled_classes_res.data else []
            )
            # Create a map for quick lookup
            class_map = {c["id"]: c for c in enrolled_classes_data}
            # Format accepted classes
            for e in accepted_enrollments:
                class_id = e.get("class_id")
                if class_id and class_id in class_map:
                    class_data = class_map[class_id]
                    accepted_classes.append(
                        {
                            "id": class_data.get("id"),
                            "title": class_data.get("title", ""),
                            "day": class_data.get("day", ""),
                            "time": class_data.get("time", ""),
                            "meeting_link": class_data.get("meeting_link", ""),
                            "description": class_data.get("description", ""),
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
        pending_requests = (
            pending_requests_res.data if pending_requests_res.data else []
        )

        # Get class details for pending requests
        pending_class_ids = set()
        for req in pending_requests:
            if req.get("class_ids"):
                pending_class_ids.update(req["class_ids"])

        pending_classes = []
        if pending_class_ids:
            pending_classes_res = (
                supabase.table("classes")
                .select("*")
                .in_("id", list(pending_class_ids))
                .execute()
            )
            pending_classes = (
                pending_classes_res.data if pending_classes_res.data else []
            )

        # Available classes (not enrolled and not pending)
        all_classes_res = supabase.table("classes").select("*").execute()
        all_classes = all_classes_res.data if all_classes_res.data else []

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
        print(f"Error in student_dashboard: {str(e)}")
        import traceback

        traceback.print_exc()
        return jsonify({"error": f"Failed to load dashboard: {str(e)}"}), 500


# Admin Dashboard
@app.get("/admin/dashboard")
@require_auth(role="admin")
def admin_dashboard():
    students = supabase.table("users").select("*").eq("role", "student").execute()
    classes = supabase.table("classes").select("*").execute()
    classes_data = classes.data if classes.data else []

    # Get enrollments and attach enrolled students to each class
    enrollments_res = supabase.table("class_enrollments").select("*").execute()
    enrollments = enrollments_res.data if enrollments_res.data else []

    class_to_student_ids = {}
    for enrollment in enrollments:
        class_id = enrollment.get("class_id")
        student_id = enrollment.get("student_id") or enrollment.get("user_id")
        if not class_id or not student_id:
            continue
        class_to_student_ids.setdefault(class_id, []).append(student_id)

    all_enrolled_student_ids = {
        sid for ids in class_to_student_ids.values() for sid in ids
    }
    students_map = {}
    if all_enrolled_student_ids:
        enrolled_students_res = (
            supabase.table("users")
            .select("id, name, email")
            .in_("id", list(all_enrolled_student_ids))
            .execute()
        )
        if enrolled_students_res.data:
            students_map = {s["id"]: s for s in enrolled_students_res.data}

    classes_with_students = []
    for cls in classes_data:
        cls_dict = dict(cls)
        student_ids = class_to_student_ids.get(cls.get("id"), [])
        enrolled_students = [
            students_map[sid] for sid in student_ids if sid in students_map
        ]
        cls_dict["enrolled_students"] = enrolled_students
        cls_dict["enrolled_students_count"] = len(enrolled_students)
        classes_with_students.append(cls_dict)

    # Fetch requests without nested select
    requests_res = (
        supabase.table("class_requests").select("*").eq("status", "pending").execute()
    )
    requests_data = requests_res.data if requests_res.data else []

    # Fetch user details for requests
    student_ids = {req["student_id"] for req in requests_data if req.get("student_id")}
    users_map = {}
    if student_ids:
        users_res = (
            supabase.table("users").select("*").in_("id", list(student_ids)).execute()
        )
        if users_res.data:
            users_map = {u["id"]: u for u in users_res.data}

    # Attach user data to requests
    requests_with_users = []
    for req in requests_data:
        req_dict = dict(req)
        if req.get("student_id") in users_map:
            req_dict["users"] = users_map[req["student_id"]]
        requests_with_users.append(req_dict)

    return jsonify(
        {
            "students": students.data if students.data else [],
            "classes": classes_with_students,
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

    if not class_res.data:
        return jsonify({"error": "Class not found"}), 404

    # Get enrolled students
    enrollments_res = (
        supabase.table("class_enrollments")
        .select("*")
        .eq("class_id", class_id)
        .execute()
    )
    enrollments = enrollments_res.data if enrollments_res.data else []

    # Get student IDs
    student_ids = {
        e.get("student_id") or e.get("user_id")
        for e in enrollments
        if e.get("student_id") or e.get("user_id")
    }

    # Fetch user details
    enrolled_students = []
    if student_ids:
        users_res = (
            supabase.table("users").select("*").in_("id", list(student_ids)).execute()
        )
        if users_res.data:
            enrolled_students = [
                {"id": u["id"], "name": u["name"], "email": u["email"]}
                for u in users_res.data
            ]

    # Get all students for the "add student" dropdown
    all_students_res = (
        supabase.table("users").select("*").eq("role", "student").execute()
    )
    all_students = all_students_res.data if all_students_res.data else []

    return jsonify(
        {
            "class": class_res.data,
            "students": enrolled_students,
            "all_students": all_students,
        }
    )


# Add student to class
@app.post("/admin/classes/<int:class_id>/add-student")
@require_auth(role="admin")
def add_student_to_class(class_id):
    data = request.get_json() or {}
    student_id = data.get("student_id")

    if not student_id:
        return jsonify({"error": "Student ID is required"}), 400

    # Check if class exists
    class_res = (
        supabase.table("classes")
        .select("*")
        .eq("id", class_id)
        .maybe_single()
        .execute()
    )
    if not class_res.data:
        return jsonify({"error": "Class not found"}), 404

    # Check if student exists
    student_res = (
        supabase.table("users")
        .select("*")
        .eq("id", student_id)
        .eq("role", "student")
        .maybe_single()
        .execute()
    )
    if not student_res.data:
        return jsonify({"error": "Student not found"}), 404

    # Check if student is already enrolled
    existing_enrollment = (
        supabase.table("class_enrollments")
        .select("*")
        .eq("class_id", class_id)
        .eq("student_id", student_id)
        .execute()
    )

    if existing_enrollment.data:
        return jsonify({"error": "Student is already enrolled in this class"}), 400

    # Add student to class
    enrollment_res = (
        supabase.table("class_enrollments")
        .insert(
            {
                "class_id": class_id,
                "student_id": student_id,
            }
        )
        .execute()
    )

    if not enrollment_res.data:
        return jsonify({"error": "Failed to add student to class"}), 500

    return jsonify({"ok": True, "message": "Student added successfully"}), 201


# Remove student from class
@app.post("/admin/classes/<int:class_id>/remove-student")
@require_auth(role="admin")
def remove_student_from_class(class_id):
    data = request.json
    student_id = data.get("student_id")

    if not student_id:
        return jsonify({"error": "Student ID is required"}), 400

    # Remove enrollment
    supabase.table("class_enrollments").delete().eq("class_id", class_id).eq(
        "student_id", student_id
    ).execute()

    return jsonify({"ok": True})


# Student Class Request route
@app.route("/classes/request", methods=["POST"])
@require_auth(role="student")
def request_class():
    data = request.json
    user_id = request.user["sub"]

    class_ids = data.get("selectedClasses", [])
    extra_details = data.get("extraDetails", "")

    if not class_ids:
        return jsonify({"error": "No classes selected"}), 400

    res = (
        supabase.table("class_requests")
        .insert(
            {
                "student_id": user_id,
                "class_ids": class_ids,  # array of integers
                "status": "pending",
                "extra_details": extra_details,
            }
        )
        .execute()
    )

    return jsonify({"ok": True})


# For other lessons (One - One etc..)
@app.post("/classes/request-lesson")
@require_auth(role="student")
def request_lesson():
    data = request.get_json() or {}
    user_id = request.user["sub"]

    class_id = data.get("class_id")
    requested_date = data.get("date")
    requested_time = data.get("time")
    extra_details = data.get("extra_details", "")

    if not class_id or not requested_date or not requested_time:
        return jsonify({"error": "Class, date and time are required"}), 400

    # Always store as integer array
    class_ids = [str(class_id)]

    today = date.today().isoformat()

    # Prevent duplicate pending requests
    existing = (
        supabase.table("class_requests")
        .select("id, date")
        .eq("student_id", user_id)
        .in_("status", ["pending", "accepted"])
        .gte("date", today)
        .execute()
    )

    if existing:
        return (
            jsonify(
                {
                    "error": "You already have an active one-to-one lesson. You can request another once it has been completed."
                }
            ),
            400,
        )

    res = (
        supabase.table("class_requests")
        .insert(
            {
                "student_id": user_id,
                "class_ids": class_ids,
                "date": requested_date,
                "time": requested_time,
                "extra_details": extra_details,
                "status": "pending",
            }
        )
        .execute()
    )

    return jsonify({"ok": True, "request": res.data[0]}), 201


# Admin Approval Route
@app.post("/admin/requests/approve")
@require_auth(role="admin")
def approve_request():
    data = request.json

    req_id = data["request_id"]

    # Get request
    req = (
        supabase.table("class_requests")
        .select("*")
        .eq("id", req_id)
        .maybe_single()
        .execute()
    )
    if not req.data:
        return jsonify({"error": "Request not found"}), 404
    student_id = req.data["student_id"]
    class_ids = req.data["class_ids"]  # This is an array

    # Mark request accepted
    supabase.table("class_requests").update({"status": "accepted"}).eq(
        "id", req_id
    ).execute()

    # Create enrollments for each class (schema uses student_id)
    enrollments = [
        {"student_id": student_id, "class_id": class_id} for class_id in class_ids
    ]

    if enrollments:
        supabase.table("class_enrollments").insert(enrollments).execute()

    return jsonify({"ok": True})


@app.post("/admin/requests/reject")
@require_auth(role="admin")
def reject_request():
    data = request.json
    req_id = data["request_id"]

    supabase.table("class_requests").update({"status": "rejected"}).eq(
        "id", req_id
    ).execute()

    return jsonify({"ok": True})


# Get single class details with announcements for student
@app.get("/student/classes/<int:class_id>")
@require_auth(role="student")
def get_student_class_details(class_id):
    try:
        user_id = request.user["sub"]

        # Check if student is enrolled in this class
        enrollment_res = (
            supabase.table("class_enrollments")
            .select("*")
            .eq("student_id", user_id)
            .eq("class_id", class_id)
            .maybe_single()
            .execute()
        )

        if not enrollment_res.data:
            return jsonify({"error": "You are not enrolled in this class"}), 403

        # Get class details
        class_res = (
            supabase.table("classes")
            .select("*")
            .eq("id", class_id)
            .maybe_single()
            .execute()
        )

        if not class_res.data:
            return jsonify({"error": "Class not found"}), 404

        # Get announcements for this class
        announcements_res = (
            supabase.table("class_announcements")
            .select("*")
            .eq("class_id", class_id)
            .order("created_at", desc=True)
            .execute()
        )
        announcements = announcements_res.data if announcements_res.data else []

        return jsonify(
            {
                "class": class_res.data,
                "announcements": announcements,
            }
        )
    except Exception as e:
        print(f"Error in get_student_class_details: {str(e)}")
        import traceback

        traceback.print_exc()
        return jsonify({"error": f"Failed to load class details: {str(e)}"}), 500


# Get student's classes with announcements
@app.get("/student/classes")
@require_auth(role="student")
def get_student_classes():
    try:
        user_id = request.user["sub"]

        # Get enrolled classes
        enrollments_res = (
            supabase.table("class_enrollments")
            .select("*")
            .eq("student_id", user_id)
            .execute()
        )
        enrollments = enrollments_res.data if enrollments_res.data else []

        # Get class IDs
        class_ids = [e["class_id"] for e in enrollments if e.get("class_id")]

        classes_with_announcements = []

        if class_ids:
            # Fetch class details
            classes_res = (
                supabase.table("classes").select("*").in_("id", class_ids).execute()
            )
            classes_data = classes_res.data if classes_res.data else []

            # Fetch announcements for all classes
            announcements_res = (
                supabase.table("class_announcements")
                .select("*")
                .in_("class_id", class_ids)
                .order("created_at", desc=True)
                .execute()
            )
            announcements_data = (
                announcements_res.data if announcements_res.data else []
            )

            # Group announcements by class_id
            announcements_by_class = {}
            for ann in announcements_data:
                class_id = ann.get("class_id")
                if class_id not in announcements_by_class:
                    announcements_by_class[class_id] = []
                announcements_by_class[class_id].append(ann)

            # Combine classes with their announcements
            for class_data in classes_data:
                class_id = class_data.get("id")
                classes_with_announcements.append(
                    {
                        "id": class_id,
                        "title": class_data.get("title", ""),
                        "day": class_data.get("day", ""),
                        "time": class_data.get("time", ""),
                        "description": class_data.get("description", ""),
                        "meeting_link": class_data.get("meeting_link", ""),
                        "announcements": announcements_by_class.get(class_id, []),
                    }
                )

        return jsonify({"classes": classes_with_announcements})
    except Exception as e:
        print(f"Error in get_student_classes: {str(e)}")
        import traceback

        traceback.print_exc()
        return jsonify({"error": f"Failed to load classes: {str(e)}"}), 500


# TBC
@app.post("/teacher/class/announcement")
@require_auth(role="admin")
def post_announcement():
    teacher_id = request.user["sub"]
    data = request.get_json()

    class_id = data.get("class_id")
    message = data.get("message")

    if not class_id or not message:
        return jsonify({"error": "Missing class_id or message"}), 400

    result = (
        supabase.table("class_announcements")
        .insert({"class_id": class_id, "teacher_id": teacher_id, "message": message})
        .execute()
    )

    return jsonify({"ok": True, "announcement": result.data[0]})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
