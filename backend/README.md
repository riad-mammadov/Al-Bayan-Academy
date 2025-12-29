# Al Bayan Academy Backend

Flask backend API for Al Bayan Academy platform.

## Setup

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Set up PostgreSQL database and update `.env` file with your database URL:

```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Run the application:

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## Database Models

- **User**: id, name, email, password_hash, role, created_at
- **Course**: id, title, slug, description, price
- **Application**: id, user_id, course_id, notes, created_at
- **ContactMessage**: id, name, email, message, created_at
