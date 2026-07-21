<div align="center">

#  JanDhan Analytics AI

### AI-Powered Public Spending Transparency Platform

Transforming government expenditure data into meaningful insights using Artificial Intelligence, Machine Learning, and Interactive Dashboards.

![License](https://img.shields.io/badge/License-MIT-green)
![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Status](https://img.shields.io/badge/Status-Active-green)

</div>

---

#  Overview

**JanDhan Analytics AI** is an AI-powered CivicTech platform designed to improve transparency and accountability in government spending. The platform transforms complex public expenditure datasets into interactive dashboards, AI-generated insights, predictive analytics, and intelligent reports.

It enables citizens, NGOs, researchers, and government officials to explore and understand how public funds are allocated and utilized.

---

#  Problem Statement

Government expenditure data is often available as large spreadsheets or reports, making it difficult for citizens and organizations to analyze.

JanDhan Analytics AI solves this challenge by providing:

-  Interactive Dashboards
-  AI-powered Financial Insights
-  Budget Forecasting
-  Spending Anomaly Detection
-  Conversational AI Assistant
-  Automated Reports

---

#  Features

- Interactive Public Spending Dashboard
- Department-wise Analytics
- District-wise Analytics
- Budget Utilization Tracking
- AI-generated Financial Insights
- Natural Language AI Assistant
- Budget Forecasting
- Spending Anomaly Detection
- Smart Report Generation
- CSV & Excel Dataset Upload
- JWT Authentication
- Role-Based Access Control
- Responsive UI
- REST API
- Docker Support

---

#  System Architecture

```text
                Users
                  │
                  ▼
          Next.js Frontend
                  │
             REST API
                  │
                  ▼
           FastAPI Backend
                  │
      ┌───────────┴───────────┐
      ▼                       ▼
 PostgreSQL Database      AI Engine
                                │
             ┌──────────────────┴─────────────────┐
             ▼                  ▼                 ▼
      Gemini API         Forecasting      Anomaly Detection
```

---

#  Tech Stack

## Frontend

- Next.js
- React
- Tailwind CSS
- Recharts

## Backend

- FastAPI
- SQLAlchemy
- Alembic

## Database

- PostgreSQL

## AI / ML

- Google Gemini API
- Pandas
- NumPy
- Scikit-learn

## DevOps

- Docker
- Git
- GitHub

---

#  Project Structure

```text
JanDhan-Analytics-AI/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI routes
│   │   ├── core/         # Config, security
│   │   ├── database/     # Session, seed
│   │   ├── models/       # SQLAlchemy models
│   │   └── schemas/      # Pydantic schemas
│   ├── alembic/          # Database migrations
│   ├── Dockerfile
│   ├── requirements.txt
│   └── pytest.ini
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js pages
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # API client
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript types
│   ├── Dockerfile
│   ├── package.json
│   └── tailwind.config.js
├── ai_engine/
│   ├── chatbot/          # LLM, RAG, prompts
│   └── forecasting/      # Train, predict models
├── database/
│   ├── schema.sql
│   └── seed_data.sql
├── datasets/
│   └── raw/              # Sample CSV datasets
├── deployment/
│   └── nginx.conf
├── docs/                 # Documentation
├── test/
│   ├── backend/          # Pytest tests
│   └── frontend/         # Vitest tests
├── .github/workflows/    # CI/CD
├── docker-compose.yml
├── PROJECT_COMPLETION_REPORT.md
└── README.md
```

---

#  Getting Started

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/JanDhan-Analytics-AI.git

cd JanDhan-Analytics-AI
```

---

## Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL 15+ (or use SQLite for development)
- Docker & Docker Compose (optional)

## Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://jandhan:jandhan123@localhost:5432/jandhan_db
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=11520
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/Nvidia-DGXA100-Supercomputing-Lab/jandhan-analytics-ai.git
cd jandhan-analytics-ai

# Start all services
docker-compose up --build

# Backend: http://localhost:8000
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/docs
```

## Manual Setup

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Seed database (optional)
python -c "from app.database.seed import seed_database; from app.database.session import SessionLocal; db = SessionLocal(); seed_database(db); db.close()"

# Run backend server
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Database Setup

#### Option 1: SQLite (Development)

```bash
# The app auto-creates SQLite database on first run
# No manual setup required
```

#### Option 2: PostgreSQL (Production)

```bash
# Create database
createdb jandhan_db

# Run migrations
cd backend
alembic upgrade head

# Seed data
psql -d jandhan_db -f database/seed_data.sql
```

## Running Tests

### Backend Tests

```bash
cd backend
pip install pytest httpx
pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
npm test
```

## Project Structure

```
backend/
├── app/
│   ├── api/              # API endpoints
│   ├── core/             # Configuration & security
│   ├── database/         # Database setup
│   ├── models/           # SQLAlchemy models
│   └── schemas/          # Pydantic schemas
├── alembic/              # Database migrations
├── Dockerfile
└── requirements.txt

frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # API client & utilities
│   └── types/            # TypeScript definitions
├── Dockerfile
├── package.json
└── tailwind.config.js
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Default Credentials

- **Email:** admin@jandhan.gov.in
- **Password:** admin123

---

#  Modules

- Authentication
- Dashboard
- Analytics
- AI Assistant
- Budget Forecasting
- Anomaly Detection
- Reports
- Dataset Upload
- Admin Panel

---

# User Roles

### Citizen

- View Dashboard
- Ask AI Questions
- Download Reports

### NGO / Researcher

- Analyze Spending
- Compare Departments
- Export Reports

### Government Official

- Monitor Budgets
- Review Analytics
- Generate Reports

### Administrator

- Upload Datasets
- Manage Users
- Configure AI

---

# Screenshots

Screenshots will be added after frontend development.

```
docs/Images/
```

---

#  Documentation

| Document | Description |
|----------|-------------|
| SRS | Software Requirement Specification |
| Architecture | System Architecture |
| Database Design | Database Schema |
| API Documentation | REST APIs |
| ML Workflow | Machine Learning Pipeline |
| User Guide | End User Documentation |
| Deployment Guide | Setup Instructions |
| Security | Security Practices |
| Testing | Testing Strategy |

---

#  Roadmap

- [x] Project Planning
- [x] Documentation
- [x] Backend Development
- [x] Frontend Development
- [x] AI Integration
- [x] Testing
- [x] Deployment
- [x] CI/CD
- [ ] Mobile App
- [ ] Advanced ML Models
- [ ] Multi-language Support
- [ ] Real-time Notifications

---

#  Contributing

Contributions are welcome!

Please read:

```
docs/Contributing.md
```

before creating a Pull Request.

---

#  License

This project is licensed under the MIT License.

---

#  Acknowledgements

- Open Government Data (OGD)
- FastAPI
- Next.js
- PostgreSQL
- Google Gemini API
- Scikit-learn

---


<div align="center">

 If you found this project useful, consider giving it a star!

</div>
