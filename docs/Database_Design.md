# Database Design

# JanDhan Analytics AI

---

# 1. Introduction

This document describes the database architecture of **JanDhan Analytics AI**. The database is designed to efficiently store, manage, and retrieve public spending information, user accounts, AI-generated insights, reports, and prediction results.

The system uses **PostgreSQL** as the primary relational database management system due to its reliability, scalability, and strong support for structured analytical data.

---

# 2. Database Objectives

The database has been designed with the following objectives:

* Store public spending data efficiently.
* Maintain relationships between departments, districts, and budgets.
* Support AI-driven analytics and forecasting.
* Enable fast querying and report generation.
* Ensure data integrity and consistency.
* Support future scalability.

---

# 3. Database Management System

| Property       | Value                   |
| -------------- | ----------------------- |
| Database       | PostgreSQL              |
| ORM            | SQLAlchemy              |
| Migration Tool | Alembic                 |
| Data Format    | Relational Database     |
| Normalization  | Third Normal Form (3NF) |

---

# 4. Entity Relationship Overview

The major entities in the system are:

* Users
* Departments
* Districts
* Government Schemes
* Budgets
* Expenditures
* AI Predictions
* AI Alerts
* Reports
* Chat History

Relationship Flow:

Users
↓
Budgets
↓
Departments
↓
Districts
↓
Government Schemes
↓
Expenditures
↓
AI Predictions
↓
Reports

---

# 5. Database Tables

---

## 5.1 Users

Stores user account information.

| Column        | Data Type    | Description                      |
| ------------- | ------------ | -------------------------------- |
| id            | UUID         | Primary Key                      |
| full_name     | VARCHAR(100) | User's full name                 |
| email         | VARCHAR(100) | Unique email                     |
| password_hash | TEXT         | Encrypted password               |
| role          | VARCHAR(30)  | Admin / Citizen / NGO / Official |
| created_at    | TIMESTAMP    | Account creation date            |
| updated_at    | TIMESTAMP    | Last update                      |

Primary Key:

* id

---

## 5.2 Departments

Stores government department details.

| Column          | Data Type    |
| --------------- | ------------ |
| id              | SERIAL       |
| department_name | VARCHAR(100) |
| description     | TEXT         |

Examples:

* Education
* Health
* Roads
* Agriculture
* Water Resources
* Rural Development

---

## 5.3 Districts

Stores district information.

| Column        | Data Type    |
| ------------- | ------------ |
| id            | SERIAL       |
| district_name | VARCHAR(100) |
| state         | VARCHAR(100) |

Example:

Lucknow

Kanpur

Agra

Varanasi

---

## 5.4 Government Schemes

Stores government welfare schemes.

| Column        | Data Type    |
| ------------- | ------------ |
| id            | SERIAL       |
| scheme_name   | VARCHAR(150) |
| department_id | INTEGER      |
| description   | TEXT         |

Examples:

* PM Awas Yojana
* PMGSY
* Ayushman Bharat
* Jal Jeevan Mission

---

## 5.5 Budgets

Stores allocated budget information.

| Column           | Data Type     |
| ---------------- | ------------- |
| id               | SERIAL        |
| department_id    | INTEGER       |
| district_id      | INTEGER       |
| scheme_id        | INTEGER       |
| allocated_budget | DECIMAL(15,2) |
| financial_year   | VARCHAR(20)   |
| created_at       | TIMESTAMP     |

Foreign Keys:

department_id → Departments

district_id → Districts

scheme_id → Government Schemes

---

## 5.6 Expenditures

Stores actual expenditure.

| Column           | Data Type     |
| ---------------- | ------------- |
| id               | SERIAL        |
| budget_id        | INTEGER       |
| amount_spent     | DECIMAL(15,2) |
| expenditure_date | DATE          |
| remarks          | TEXT          |

Foreign Key:

budget_id → Budgets

---

## 5.7 AI Predictions

Stores forecasting results.

| Column           | Data Type     |
| ---------------- | ------------- |
| id               | SERIAL        |
| budget_id        | INTEGER       |
| predicted_amount | DECIMAL(15,2) |
| confidence_score | FLOAT         |
| generated_at     | TIMESTAMP     |

---

## 5.8 AI Alerts

Stores anomaly detection results.

| Column         | Data Type    |
| -------------- | ------------ |
| id             | SERIAL       |
| expenditure_id | INTEGER      |
| alert_type     | VARCHAR(100) |
| severity       | VARCHAR(20)  |
| description    | TEXT         |
| detected_at    | TIMESTAMP    |

Examples:

* Overspending
* Underutilization
* Unusual Spending Spike
* Missing Records

---

## 5.9 Reports

Stores generated reports.

| Column       | Data Type    |
| ------------ | ------------ |
| id           | SERIAL       |
| user_id      | UUID         |
| report_name  | VARCHAR(150) |
| report_type  | VARCHAR(50)  |
| generated_at | TIMESTAMP    |
| download_url | TEXT         |

---

## 5.10 Chat History

Stores conversations with the AI Assistant.

| Column    | Data Type |
| --------- | --------- |
| id        | SERIAL    |
| user_id   | UUID      |
| question  | TEXT      |
| response  | TEXT      |
| timestamp | TIMESTAMP |

---

# 6. Entity Relationships

Departments

↓

Government Schemes

↓

Budgets

↓

Expenditures

↓

AI Predictions

↓

AI Alerts

↓

Reports

Users interact with:

* Dashboard
* Reports
* AI Assistant

---

# 7. Indexing Strategy

Indexes are created on frequently searched columns to improve performance.

Indexed Columns:

* email
* department_name
* district_name
* financial_year
* expenditure_date
* generated_at

---

# 8. Constraints

The database enforces the following constraints:

* Primary Keys
* Foreign Keys
* NOT NULL Constraints
* UNIQUE Email Constraint
* Cascade Delete (where applicable)
* Data Validation Rules

---

# 9. Normalization

The database follows **Third Normal Form (3NF)**.

Benefits:

* Eliminates redundancy
* Improves consistency
* Simplifies updates
* Reduces storage requirements
* Prevents anomalies

---

# 10. Sample Data Flow

Government Budget CSV

↓

Upload by Administrator

↓

Validation

↓

Store in Budgets Table

↓

Create Expenditure Records

↓

Run AI Analysis

↓

Generate Predictions

↓

Generate Alerts

↓

Display Dashboard

↓

Generate Reports

---

# 11. Future Database Enhancements

Future versions may include:

* State-wise budget tables
* Ministry-level expenditure
* Public feedback table
* Audit history
* Real-time API cache
* Blockchain transaction logs
* AI recommendation history
* Dataset version management

---

# Conclusion

The database has been designed using a normalized relational model to efficiently support data storage, analytics, Artificial Intelligence modules, forecasting, anomaly detection, and report generation. The modular structure ensures scalability, maintainability, and seamless integration with the FastAPI backend and AI services.
