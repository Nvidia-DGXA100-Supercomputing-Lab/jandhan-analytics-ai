# API Documentation

# JanDhan Analytics AI

**Version:** 1.0

**Backend Framework:** FastAPI

**API Style:** REST

**Data Format:** JSON

**Authentication:** JWT (JSON Web Token)

---

# 1. Introduction

This document describes all REST APIs provided by JanDhan Analytics AI.

The APIs allow the frontend to communicate with the backend for:

* Authentication
* Dashboard Data
* Public Spending Analytics
* AI Assistant
* Budget Forecasting
* Anomaly Detection
* Report Generation
* Dataset Upload

---

# 2. Base URL

Development

```
http://localhost:8000/api/v1
```

Production

```
https://your-domain.com/api/v1
```

---

# 3. Authentication

Protected APIs require a JWT Access Token.

Example Header

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 4. Authentication APIs

## 4.1 Register User

**Endpoint**

```
POST /auth/register
```

### Request Body

```json
{
    "full_name":"Ankit Singh",
    "email":"ankit@gmail.com",
    "password":"********"
}
```

### Response

```json
{
    "message":"User Registered Successfully"
}
```

---

## 4.2 Login

**Endpoint**

```
POST /auth/login
```

### Request

```json
{
    "email":"ankit@gmail.com",
    "password":"********"
}
```

### Response

```json
{
    "access_token":"JWT_TOKEN",
    "token_type":"Bearer"
}
```

---

## 4.3 Get Profile

```
GET /auth/profile
```

Returns logged-in user details.

---

# 5. Dashboard APIs

## 5.1 Dashboard Overview

```
GET /dashboard
```

Returns

* Total Budget
* Total Expenditure
* Budget Utilization
* Number of Departments
* Number of Districts
* Number of Schemes

Example Response

```json
{
  "total_budget":1200000000,
  "total_spent":1080000000,
  "utilization":90,
  "departments":18,
  "districts":75
}
```

---

## 5.2 KPI Cards

```
GET /dashboard/kpis
```

Returns all KPI cards.

---

## 5.3 Budget Summary

```
GET /dashboard/summary
```

Returns overall financial summary.

---

# 6. Analytics APIs

## 6.1 Department Analysis

```
GET /analytics/departments
```

Optional Query Parameters

```
?year=2025

?department=Education
```

---

## 6.2 District Analysis

```
GET /analytics/districts
```

Returns district-wise spending.

---

## 6.3 Scheme Analysis

```
GET /analytics/schemes
```

Returns scheme-wise expenditure.

---

## 6.4 Financial Year Comparison

```
GET /analytics/yearly
```

Compare spending across financial years.

---

## 6.5 Spending Trends

```
GET /analytics/trends
```

Returns monthly and yearly trends.

---

# 7. Data Upload APIs

## 7.1 Upload Dataset

```
POST /upload/dataset
```

Supported Formats

* CSV
* Excel (.xlsx)

Request

Multipart Form Data

```
dataset.csv
```

Response

```json
{
    "message":"Dataset Uploaded Successfully"
}
```

---

## 7.2 Validate Dataset

```
POST /upload/validate
```

Checks

* Missing Values
* Duplicate Rows
* Invalid Columns
* Incorrect Data Types

---

# 8. AI Assistant APIs

## 8.1 Ask AI

```
POST /ai/chat
```

Request

```json
{
    "question":"Which department spent the highest budget?"
}
```

Response

```json
{
    "answer":"The Roads Department utilized ₹245 Crores, the highest expenditure in the selected dataset."
}
```

---

## 8.2 Generate AI Summary

```
POST /ai/summary
```

Returns

* Executive Summary
* Spending Insights
* Recommendations

---

## 8.3 Explain Chart

```
POST /ai/explain-chart
```

Returns AI-generated explanation of the selected visualization.

---

# 9. Machine Learning APIs

## 9.1 Budget Forecast

```
GET /prediction/forecast
```

Returns

* Predicted Spending
* Confidence Score
* Future Trends

---

## 9.2 Anomaly Detection

```
GET /prediction/anomalies
```

Returns

* Overspending
* Underutilization
* Spending Spike
* Missing Data Alerts

---

# 10. Reports APIs

## 10.1 Generate Report

```
POST /reports/generate
```

Available Formats

* PDF
* CSV

---

## 10.2 Download Report

```
GET /reports/{report_id}
```

Downloads generated report.

---

## 10.3 Report History

```
GET /reports/history
```

Returns previously generated reports.

---

# 11. Search APIs

## Global Search

```
GET /search
```

Example

```
/search?query=Education
```

Returns matching departments, schemes, and reports.

---

# 12. Notification APIs

## Get Notifications

```
GET /notifications
```

Returns

* AI Alerts
* New Reports
* Dataset Upload Status

---

# 13. HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 422  | Validation Error      |
| 500  | Internal Server Error |

---

# 14. API Security

The API uses the following security mechanisms:

* JWT Authentication
* Password Hashing
* Role-Based Authorization
* HTTPS
* Input Validation
* SQL Injection Prevention
* CORS Configuration

---

# 15. API Versioning

Current Version

```
v1
```

Future versions will be released as:

```
/api/v2

/api/v3
```

to ensure backward compatibility.

---

# 16. Future APIs

The following APIs are planned for future releases:

* Live Government Data Integration
* Voice-Based AI Assistant
* Public Feedback API
* Mobile App APIs
* Real-Time Notifications
* GIS Map APIs
* Open Data APIs
* Blockchain Audit APIs

---

# Conclusion

The API architecture of JanDhan Analytics AI follows RESTful design principles and provides secure, scalable, and modular endpoints for managing authentication, analytics, AI services, machine learning predictions, report generation, and public spending insights.
