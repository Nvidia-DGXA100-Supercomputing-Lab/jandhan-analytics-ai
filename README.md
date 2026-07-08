<div align="center">

# 📊 JanDhan Analytics AI

### AI-Powered Public Spending Transparency Platform

Transforming government expenditure data into meaningful insights using Artificial Intelligence, Machine Learning, and Interactive Dashboards.

![License](https://img.shields.io/badge/License-MIT-green)
![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Status](https://img.shields.io/badge/Status-Under%20Development-orange)

</div>

---

# 📖 Overview

**JanDhan Analytics AI** is an AI-powered CivicTech platform designed to improve transparency and accountability in government spending. The platform transforms complex public expenditure datasets into interactive dashboards, AI-generated insights, predictive analytics, and intelligent reports.

It enables citizens, NGOs, researchers, and government officials to explore and understand how public funds are allocated and utilized.

---

# 🎯 Problem Statement

Government expenditure data is often available as large spreadsheets or reports, making it difficult for citizens and organizations to analyze.

JanDhan Analytics AI solves this challenge by providing:

- 📊 Interactive Dashboards
- 🤖 AI-powered Financial Insights
- 📈 Budget Forecasting
- 🚨 Spending Anomaly Detection
- 💬 Conversational AI Assistant
- 📄 Automated Reports

---

# ✨ Features

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

# 🏗️ System Architecture

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

# 🛠️ Tech Stack

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

# 📂 Project Structure

```text
JanDhan-Analytics-AI/

├── backend/
├── frontend/
├── database/
├── datasets/
├── docs/
├── deployment/
├── tests/
├── docker-compose.yml
├── README.md
└── LICENSE
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/JanDhan-Analytics-AI.git

cd JanDhan-Analytics-AI
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Run backend

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Database

```sql
CREATE DATABASE jandhan_ai;
```

Run migrations

```bash
alembic upgrade head
```

---

# 📊 Modules

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

# 👥 User Roles

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

# 📸 Screenshots

Screenshots will be added after frontend development.

```
docs/Images/
```

---

# 📚 Documentation

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

# 🗺️ Roadmap

- [x] Project Planning
- [x] Documentation
- [ ] UI Design
- [ ] Backend Development
- [ ] Frontend Development
- [ ] AI Integration
- [ ] Testing
- [ ] Deployment

---

# 🤝 Contributing

Contributions are welcome!

Please read:

```
docs/Contributing.md
```

before creating a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 🙏 Acknowledgements

- Open Government Data (OGD)
- FastAPI
- Next.js
- PostgreSQL
- Google Gemini API
- Scikit-learn

---

# 📬 Contact

**Developer:** Ankit Singh Tomar

GitHub: https://github.com/YOUR_USERNAME

Email: your-email@example.com

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!

</div>