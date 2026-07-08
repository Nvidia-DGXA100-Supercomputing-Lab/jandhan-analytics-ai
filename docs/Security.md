# Security Policy

# JanDhan Analytics AI

**Version:** 1.0

---

# 1. Introduction

Security is a fundamental aspect of JanDhan Analytics AI. This document outlines the security practices, policies, and mechanisms implemented to protect user data, public spending datasets, and AI services.

The objective is to ensure:

- Confidentiality
- Integrity
- Availability
- Accountability

throughout the application lifecycle.

---

# 2. Security Objectives

The platform is designed to:

- Protect user accounts.
- Secure sensitive configuration data.
- Prevent unauthorized access.
- Ensure secure communication.
- Validate uploaded datasets.
- Protect AI services from misuse.
- Maintain auditability of system operations.

---

# 3. Authentication

The application uses **JWT (JSON Web Token)** based authentication.

Features:

- Secure Login
- Token-Based Authentication
- Access Token Expiration
- Password Hashing
- Role-Based Access Control (RBAC)

Passwords are never stored in plain text.

Recommended hashing algorithm:

- bcrypt

---

# 4. Authorization

The system follows Role-Based Access Control.

## Citizen

Permissions:

- View Dashboard
- Ask AI Questions
- Download Reports

---

## NGO / Researcher

Permissions:

- Analyze Spending
- Generate Reports
- View Forecasts

---

## Government Official

Permissions:

- Monitor Departments
- View AI Insights
- Access Official Reports

---

## Administrator

Permissions:

- Upload Datasets
- Manage Users
- Configure AI Services
- View Logs
- Maintain System

---

# 5. Password Policy

Passwords should meet the following requirements:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

Passwords should never be:

- Stored in plaintext
- Shared with other users
- Logged in application logs

---

# 6. Data Protection

The platform protects stored data through:

- Database Access Control
- Encrypted Password Storage
- Secure Environment Variables
- Restricted Administrative Access

Sensitive information such as API keys and database credentials must never be committed to GitHub.

---

# 7. Environment Variables

Sensitive credentials should be stored in `.env` files.

Example:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/jandhan_ai

SECRET_KEY=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

JWT_ALGORITHM=HS256
```

The `.env` file must be included in `.gitignore`.

---

# 8. Secure API Practices

The backend follows secure REST API practices.

Implemented protections include:

- JWT Authentication
- Input Validation
- Request Validation
- Response Validation
- HTTP Status Codes
- Error Handling

---

# 9. Input Validation

Every incoming request is validated before processing.

Validation includes:

- Required Fields
- Data Types
- Length Constraints
- File Type Validation
- Numeric Validation
- Date Validation

FastAPI and Pydantic models are used to validate requests.

---

# 10. File Upload Security

Only approved dataset formats are accepted.

Supported formats:

- CSV
- XLSX

Validation includes:

- File Extension Check
- File Size Limit
- Required Columns Verification
- Missing Value Detection
- Duplicate Record Detection

Executable files are rejected.

---

# 11. Database Security

The PostgreSQL database is protected through:

- Strong User Passwords
- Limited User Privileges
- Parameterized Queries
- SQLAlchemy ORM
- Regular Backups

Direct SQL query concatenation should never be used.

---

# 12. SQL Injection Protection

The application prevents SQL Injection by:

- Using SQLAlchemy ORM
- Parameterized Queries
- Input Validation
- Escaping User Input

Unsafe SQL queries must never be executed.

---

# 13. Cross-Site Scripting (XSS)

User input displayed on the frontend should be sanitized.

Protection methods include:

- Output Escaping
- React Default Escaping
- Input Validation
- Content Security Policy (Future)

---

# 14. Cross-Site Request Forgery (CSRF)

Future versions may include CSRF protection for state-changing operations if cookie-based authentication is introduced.

Current authentication relies on JWT tokens sent in the Authorization header.

---

# 15. HTTPS

Production deployments must use HTTPS.

Benefits include:

- Encrypted Communication
- Protection Against Man-in-the-Middle Attacks
- Secure Authentication

---

# 16. API Rate Limiting

To prevent abuse, future deployments should implement rate limiting.

Recommended limits:

| Endpoint | Limit |
|----------|-------|
| Login | 5 requests/minute |
| AI Chat | 30 requests/minute |
| Report Generation | 10 requests/minute |
| Dataset Upload | 5 requests/hour |

---

# 17. Logging & Monitoring

The system should log:

- Login Attempts
- Failed Logins
- Dataset Uploads
- AI Requests
- Report Generation
- Administrative Actions

Sensitive information such as passwords and API keys must never be logged.

---

# 18. AI Security

AI-generated responses should:

- Be based on uploaded datasets.
- Avoid fabricating financial information.
- Clearly indicate when insufficient data is available.
- Be treated as analytical assistance rather than official government decisions.

---

# 19. Dependency Security

Project dependencies should be updated regularly.

Recommended tools:

- pip-audit
- npm audit
- Dependabot (GitHub)

Outdated packages should be upgraded after compatibility testing.

---

# 20. Backup & Recovery

Recommended backup schedule:

| Resource | Frequency |
|----------|-----------|
| PostgreSQL Database | Daily |
| Uploaded Datasets | Weekly |
| Reports | Weekly |
| Configuration Files | Monthly |

Backups should be stored securely and tested periodically for recovery.

---

# 21. Incident Reporting

If a security issue is discovered:

1. Do not disclose it publicly.
2. Notify the project maintainers.
3. Provide reproduction steps.
4. Include logs or screenshots if relevant.
5. Wait for confirmation before public disclosure.

---

# 22. Security Best Practices

Developers should:

- Never hardcode secrets.
- Use environment variables.
- Keep dependencies updated.
- Validate all user input.
- Follow secure coding standards.
- Review code before merging.
- Use least-privilege access.

---

# 23. Future Security Enhancements

Planned improvements include:

- Multi-Factor Authentication (MFA)
- OAuth 2.0 Login
- API Rate Limiting
- Security Audit Dashboard
- SIEM Integration
- Intrusion Detection
- Security Headers
- Audit Trail for Administrative Actions

---

# Conclusion

JanDhan Analytics AI is designed with security as a core principle. By implementing strong authentication, secure API practices, encrypted communication, input validation, and role-based access control, the platform aims to protect users and public financial data while maintaining trust, transparency, and compliance with modern software security practices.