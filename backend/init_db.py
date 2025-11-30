"""
Database initialization script.
Run this once to create all database tables.
"""

from app import app, db

with app.app_context():
    db.create_all()
    print("Database tables created successfully!")
