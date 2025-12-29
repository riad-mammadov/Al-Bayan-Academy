# Quick Setup Guide

## Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- PostgreSQL database

## Frontend Setup (5 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Backend Setup (10 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "DATABASE_URL=postgresql://user:password@localhost/albayan_db" > .env
echo "FLASK_ENV=development" >> .env
echo "FLASK_DEBUG=True" >> .env

# Update DATABASE_URL with your actual PostgreSQL credentials

# Initialize database (run once)
python init_db.py

# Start Flask server
python app.py
```

Backend will run on `http://localhost:5000`

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE albayan_db;
```

2. Update the `DATABASE_URL` in `backend/.env`:
```
DATABASE_URL=postgresql://your_username:your_password@localhost/albayan_db
```

3. Run the initialization script:
```bash
cd backend
python init_db.py
```

## Testing the Contact Form

1. Make sure both frontend (port 3000) and backend (port 5000) are running
2. Navigate to `http://localhost:3000/contact`
3. Fill out and submit the form
4. Check the backend console for confirmation

## Project Structure

- `app/` - Next.js frontend pages and components
- `backend/` - Flask API and database models
- `public/` - Static assets

For more details, see `PROJECT_README.md`


