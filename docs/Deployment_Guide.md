# Deployment Guide

# JanDhan Analytics AI

**Version:** 1.0

---

# 1. Introduction

This document explains how to set up, configure, run, and deploy **JanDhan Analytics AI**.

The application consists of:

* Next.js Frontend
* FastAPI Backend
* PostgreSQL Database
* AI Engine
* Docker Containers

This guide covers local development, Docker deployment, and cloud deployment.

---

# 2. System Requirements

## Hardware Requirements

| Component | Minimum                      |
| --------- | ---------------------------- |
| RAM       | 8 GB                         |
| Storage   | 10 GB Free Space             |
| Processor | Intel i5 / Ryzen 5 or Higher |

---

## Software Requirements

* Python 3.12+
* Node.js 22+
* PostgreSQL 16+
* Git
* Docker
* Docker Compose
* VS Code (Recommended)

---

# 3. Clone Repository

Clone the GitHub repository.

```bash
git clone https://github.com/yourusername/jandhan-analytics-ai.git

cd jandhan-analytics-ai
```

---

# 4. Project Structure

```text
frontend/

backend/

database/

datasets/

docs/

deployment/

docker-compose.yml
```

---

# 5. Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate the environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

---

# 6. Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install Node packages.

```bash
npm install
```

or

```bash
pnpm install
```

---

# 7. Database Setup

Install PostgreSQL.

Create a database.

```sql
CREATE DATABASE jandhan_ai;
```

Run database migrations.

```bash
alembic upgrade head
```

---

# 8. Environment Variables

Create a `.env` file inside the backend directory.

Example

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/jandhan_ai

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

GEMINI_API_KEY=your_gemini_api_key
```

Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

# 9. Running the Backend

Start the FastAPI server.

```bash
uvicorn app.main:app --reload
```

Backend URL

```text
http://localhost:8000
```

Swagger Documentation

```text
http://localhost:8000/docs
```

ReDoc

```text
http://localhost:8000/redoc
```

---

# 10. Running the Frontend

Start the development server.

```bash
npm run dev
```

Frontend URL

```text
http://localhost:3000
```

---

# 11. Docker Deployment

Build the containers.

```bash
docker-compose build
```

Start all services.

```bash
docker-compose up
```

Run in detached mode.

```bash
docker-compose up -d
```

Stop containers.

```bash
docker-compose down
```

---

# 12. Production Deployment

## Backend

Deploy using:

* Render
* Railway
* AWS EC2
* DigitalOcean
* Azure App Service

---

## Frontend

Deploy using:

* Vercel (Recommended)
* Netlify
* AWS Amplify

---

## Database

Recommended options:

* Neon PostgreSQL
* Supabase PostgreSQL
* AWS RDS
* PostgreSQL Self-hosted

---

# 13. AI Configuration

Obtain an API key from Google AI Studio.

Add the key to the backend environment.

```env
GEMINI_API_KEY=your_api_key
```

Restart the backend after updating the environment variables.

---

# 14. Folder Deployment Flow

```text
Frontend

↓

REST API

↓

FastAPI

↓

AI Engine

↓

PostgreSQL

↓

Response
```

---

# 15. Health Check

Verify that the following services are running.

Frontend

```text
http://localhost:3000
```

Backend

```text
http://localhost:8000
```

Swagger

```text
http://localhost:8000/docs
```

Database

```text
PostgreSQL Service Running
```

---

# 16. Troubleshooting

## Database Connection Error

Possible Causes

* PostgreSQL not running
* Incorrect credentials
* Wrong port

Solution

Verify the DATABASE_URL and restart PostgreSQL.

---

## Frontend Cannot Connect to Backend

Possible Causes

* Backend not running
* Incorrect API URL

Solution

Verify `NEXT_PUBLIC_API_URL`.

---

## Gemini API Error

Possible Causes

* Invalid API Key
* API Quota Exceeded

Solution

Generate a new API key and verify billing or quota limits if applicable.

---

## Docker Issues

Run

```bash
docker-compose down

docker-compose build

docker-compose up
```

---

# 17. Updating the Application

Pull the latest changes.

```bash
git pull origin main
```

Update backend dependencies.

```bash
pip install -r requirements.txt
```

Update frontend dependencies.

```bash
npm install
```

Run migrations.

```bash
alembic upgrade head
```

Restart the application.

---

# 18. Backup Strategy

Recommended backup schedule:

* Database: Daily
* Reports: Weekly
* Uploaded Datasets: Weekly
* Configuration Files: Monthly

---

# 19. Security Checklist

Before deploying to production:

* Enable HTTPS
* Use strong JWT secret keys
* Store API keys in environment variables
* Disable debug mode
* Restrict database access
* Enable CORS properly
* Configure rate limiting
* Validate all uploaded files

---

# 20. Future Deployment Enhancements

Future versions may include:

* Kubernetes deployment
* CI/CD with GitHub Actions
* Redis caching
* Load balancing
* Monitoring with Prometheus & Grafana
* Automated backups
* Multi-region deployment

---

# Conclusion

This deployment guide provides a complete procedure for setting up and deploying JanDhan Analytics AI in both development and production environments. Following these steps ensures a secure, scalable, and reliable deployment that supports future growth and feature enhancements.
