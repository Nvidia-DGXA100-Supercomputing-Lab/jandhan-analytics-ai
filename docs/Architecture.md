# System Architecture

# JanDhan Analytics AI

### AI-Powered Public Spending Transparency Platform

---

# 1. Introduction

This document describes the overall architecture of **JanDhan Analytics AI**, including its major components, system layers, communication flow, and technology stack.

The platform follows a modern multi-layer architecture consisting of:

* Presentation Layer
* API Layer
* Business Logic Layer
* AI & Machine Learning Layer
* Data Layer

This architecture ensures scalability, maintainability, security, and modular development.

---

# 2. High-Level Architecture

```
                    +---------------------------+
                    |       End Users           |
                    |---------------------------|
                    | Citizens                 |
                    | NGOs                     |
                    | Researchers              |
                    | Government Officials     |
                    +------------+-------------+
                                 |
                                 |
                                 ▼
                    +---------------------------+
                    |     Next.js Frontend      |
                    |---------------------------|
                    | Dashboard                |
                    | Analytics               |
                    | AI Assistant            |
                    | Reports                 |
                    +------------+-------------+
                                 |
                         REST API / HTTPS
                                 |
                                 ▼
                    +---------------------------+
                    |      FastAPI Backend      |
                    |---------------------------|
                    | Authentication           |
                    | Data Processing          |
                    | Business Logic           |
                    | Report Generation        |
                    +------------+-------------+
                                 |
            +--------------------+--------------------+
            |                                         |
            ▼                                         ▼
+---------------------------+              +--------------------------+
|      AI Engine            |              |      PostgreSQL          |
|---------------------------|              |--------------------------|
| Gemini API                |              | Users                    |
| Forecasting Model         |              | Budgets                  |
| Anomaly Detection         |              | Departments              |
| Recommendation Engine     |              | Districts                |
| AI Insights               |              | Reports                  |
+---------------------------+              +--------------------------+
```

---

# 3. System Layers

## 3.1 Presentation Layer

The Presentation Layer provides the graphical user interface (GUI) through which users interact with the platform.

Responsibilities include:

* User Authentication
* Dashboard Visualization
* Interactive Charts
* AI Chat Interface
* Report Download
* Data Filtering
* Responsive User Experience

Technology:

* Next.js
* React
* Tailwind CSS
* Chart.js / Recharts

---

## 3.2 API Layer

The API Layer acts as the communication bridge between the frontend and backend.

Responsibilities:

* Receive HTTP Requests
* Validate Input
* Authenticate Users
* Forward Requests
* Return JSON Responses

Technology:

* REST API
* FastAPI
* JWT Authentication

---

## 3.3 Business Logic Layer

This layer contains the core application logic.

Responsibilities:

* Budget Analysis
* Department Comparison
* District Comparison
* Report Generation
* Data Validation
* File Processing
* User Management

This layer is independent of the frontend and database, making it easier to maintain and test.

---

## 3.4 AI & Machine Learning Layer

This is the intelligence layer of the platform.

Responsibilities:

* Generate AI Insights
* Forecast Future Spending
* Detect Spending Anomalies
* Process Natural Language Queries
* Recommend Budget Improvements

Components:

* Gemini API
* Isolation Forest
* Forecasting Model
* Prompt Engineering
* Data Preprocessing

---

## 3.5 Data Layer

The Data Layer stores and retrieves all application data.

Responsibilities:

* Store Users
* Store Government Budgets
* Store Departments
* Store District Information
* Store Reports
* Store AI Logs

Technology:

* PostgreSQL
* SQLAlchemy ORM

---

# 4. Frontend Architecture

The frontend is organized into reusable components.

```
Frontend

│

├── Dashboard

├── Analytics

├── AI Assistant

├── Forecasting

├── Reports

├── Authentication

└── Settings
```

Reusable Components:

* Navbar
* Sidebar
* KPI Cards
* Charts
* Tables
* Search Filters
* Chat Window
* Report Viewer

---

# 5. Backend Architecture

The backend follows a modular service-based architecture.

```
Backend

│

├── API Routes

├── Services

├── Authentication

├── Database Models

├── Utilities

├── AI Services

├── Report Generator

└── Middleware
```

Each module performs a single responsibility, improving maintainability and scalability.

---

# 6. AI Architecture

The AI subsystem consists of four major modules.

## AI Insight Generator

Generates human-readable summaries of public spending.

↓

## Natural Language Query Engine

Converts user questions into meaningful analytical responses.

↓

## Forecasting Engine

Predicts future budget utilization based on historical spending.

↓

## Anomaly Detection Engine

Identifies unusual spending behavior using Machine Learning.

---

# 7. Database Architecture

The database stores structured government expenditure data.

Main Tables:

* Users
* Departments
* Districts
* Budgets
* Expenditures
* Schemes
* Reports
* Predictions
* Alerts
* Chat History

Relationships:

Department

↓

Budget

↓

Expenditure

↓

Prediction

↓

Report

---

# 8. Data Flow

The overall system follows the workflow below.

```
Government Dataset

↓

Upload CSV / Excel

↓

Backend Validation

↓

Data Cleaning

↓

Database Storage

↓

AI Analysis

↓

Forecasting

↓

Anomaly Detection

↓

Interactive Dashboard

↓

User Interaction

↓

Report Generation
```

---

# 9. Technology Stack

| Layer            | Technology          |
| ---------------- | ------------------- |
| Frontend         | Next.js             |
| UI               | React               |
| Styling          | Tailwind CSS        |
| Charts           | Chart.js / Recharts |
| Backend          | FastAPI             |
| Authentication   | JWT                 |
| ORM              | SQLAlchemy          |
| Database         | PostgreSQL          |
| AI               | Gemini API          |
| Machine Learning | Scikit-learn        |
| Data Processing  | Pandas              |
| File Upload      | CSV / Excel         |
| Deployment       | Docker              |
| Version Control  | Git & GitHub        |

---

# 10. Security Architecture

The system incorporates multiple security mechanisms.

* JWT Authentication
* Password Hashing
* Role-Based Access Control
* HTTPS Communication
* Input Validation
* SQL Injection Prevention
* Cross-Site Scripting (XSS) Protection
* Secure File Upload Validation

---

# 11. Scalability

The architecture supports future expansion through modular design.

Future improvements may include:

* Microservices
* Kubernetes Deployment
* Redis Caching
* Apache Kafka
* Real-Time Analytics
* Live Government API Integration
* Multi-language AI Assistant
* Mobile Application

---

# 12. Architecture Principles

JanDhan Analytics AI is designed according to the following software engineering principles:

* Separation of Concerns
* Modular Design
* Scalability
* Reusability
* Security by Design
* High Maintainability
* Loose Coupling
* High Cohesion
* API-First Development

---

# Conclusion

The architecture of JanDhan Analytics AI provides a scalable, secure, and modular foundation for analyzing public spending data using Artificial Intelligence. By separating the presentation layer, business logic, AI services, and data layer, the platform remains flexible for future enhancements while ensuring high performance, maintainability, and ease of deployment.
