import bcrypt
import jwt
from datetime import datetime, timedelta
from flask import request, jsonify
import os
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXP_HOURS = 2


def hash_password(password):
    return bcrypt.generate_password_hash(password).decode("utf8")


def check_password(hashed, password):
    return bcrypt.check_password_hash(hashed, password)


def create_jwt(user_id, role):
    payload = {
        "sub": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=2),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
