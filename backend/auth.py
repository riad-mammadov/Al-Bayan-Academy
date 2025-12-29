import bcrypt
import jwt
from datetime import datetime, timedelta
from flask import request, jsonify, redirect
import os
from flask_bcrypt import Bcrypt
from functools import wraps

bcrypt = Bcrypt()

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXP_HOURS = 2


def hash_password(password):
    return bcrypt.generate_password_hash(password).decode("utf-8")


def check_password(hashed, password):
    return bcrypt.check_password_hash(hashed, password)


def create_jwt(user_id, role):
    payload = {
        "sub": str(user_id),
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=2),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


# Decorator for protected routes
def require_auth(role=None):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            token = request.cookies.get("auth_token")
            if not token:
                return (
                    jsonify({"error": "Unauthorized API access. Token missing."}),
                    401,
                )
            try:
                payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
                print("COOKIE TOKEN:", token)
                print("DECODED:", payload)
                print("REQUIRED ROLE:", role)

            except jwt.ExpiredSignatureError:
                return jsonify({"error": "Token expired"}), 401
            except jwt.InvalidTokenError:
                return jsonify({"error": "Invalid token"}), 401

            if role and payload.get("role") != role:
                return jsonify({"error": "Forbidden"}), 403

            request.user = payload
            return fn(*args, **kwargs)

        return wrapper

    return decorator
