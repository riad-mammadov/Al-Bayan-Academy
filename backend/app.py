from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash
from db import supabase
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)


# API Routes
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200


# Initialize database
if __name__ == "__main__":
    app.run(debug=True, port=5000)
