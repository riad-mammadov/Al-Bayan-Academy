# Al Bayan Academy - MVP Boilerplate

A full-stack boilerplate for a Quran teaching academy platform built with Next.js (App Router) and Flask.

## Project Structure

```
al_bayan/
├── app/                    # Next.js frontend (App Router)
│   ├── components/         # Reusable components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── courses/           # Courses listing
│   │   └── [slug]/        # Dynamic course detail page
│   ├── dashboard/         # Protected dashboard
│   ├── login/             # Login page
│   ├── reviews/           # Reviews page
│   ├── layout.tsx         # Root layout with Navbar/Footer
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── backend/               # Flask backend
│   ├── app.py            # Main Flask application
│   ├── requirements.txt  # Python dependencies
│   └── README.md         # Backend setup instructions
└── public/               # Static assets
```

## Features

### Frontend (Next.js 14)

- ✅ TypeScript
- ✅ TailwindCSS with gold/white theme
- ✅ Fully responsive design
- ✅ Pages: Home, About, Reviews, Contact, Courses, Login, Dashboard
- ✅ Navigation bar and footer
- ✅ Contact form with API integration

### Backend (Flask)

- ✅ SQLAlchemy ORM
- ✅ PostgreSQL database
- ✅ RESTful API endpoints
- ✅ CORS enabled
- ✅ Database models: User, Course, Application, ContactMessage

## Getting Started

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Create a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set up PostgreSQL database and create a `.env` file:

```bash
# Create .env file with:
DATABASE_URL=postgresql://user:password@localhost/albayan_db
FLASK_ENV=development
FLASK_DEBUG=True
```

5. Run the Flask server:

```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

## Database Models

### User

- `id` (Integer, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password_hash` (String)
- `role` (String, default: 'student')
- `created_at` (DateTime)

### Course

- `id` (Integer, Primary Key)
- `title` (String)
- `slug` (String, Unique)
- `description` (Text)
- `price` (Numeric)

### Application

- `id` (Integer, Primary Key)
- `user_id` (Integer, Foreign Key -> User)
- `course_id` (Integer, Foreign Key -> Course)
- `notes` (Text)
- `created_at` (DateTime)

### ContactMessage

- `id` (Integer, Primary Key)
- `name` (String)
- `email` (String)
- `message` (Text)
- `created_at` (DateTime)

## API Endpoints

- `POST /api/contact` - Submit contact form
  - Body: `{ "name": string, "email": string, "message": string }`
- `GET /api/health` - Health check

## Design

The application uses a clean, modern design with:

- White background
- Gold/amber accents (#D97706, #F59E0B)
- Soft typography
- Responsive layout for all screen sizes
- Arabic/Islamic website aesthetic

## Next Steps

This is a boilerplate. You can now:

1. Add authentication and authorization
2. Implement course enrollment functionality
3. Add user dashboard features
4. Integrate payment processing
5. Add admin panel
6. Implement email notifications
7. Add more API endpoints as needed

## Technologies

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Flask, SQLAlchemy, PostgreSQL
- **Styling**: TailwindCSS with custom theme

