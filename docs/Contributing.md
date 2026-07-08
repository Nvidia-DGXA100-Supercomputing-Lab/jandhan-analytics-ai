# Contributing to JanDhan Analytics AI

First of all, thank you for considering contributing to **JanDhan Analytics AI**! 🎉

We welcome contributions from developers, students, researchers, and open-source enthusiasts who want to improve transparency in public spending through Artificial Intelligence and Data Analytics.

Whether you're fixing a bug, improving documentation, adding a new feature, or optimizing performance, your contributions are greatly appreciated.

---

# Table of Contents

- Code of Conduct
- Ways to Contribute
- Getting Started
- Development Setup
- Branch Naming Convention
- Commit Message Guidelines
- Pull Request Process
- Coding Standards
- Reporting Issues
- Feature Requests
- Documentation Contributions
- Community

---

# Code of Conduct

Please be respectful and professional while interacting with other contributors.

We expect everyone to:

- Be respectful.
- Be constructive.
- Welcome newcomers.
- Focus on collaboration.
- Maintain professionalism.

Harassment or abusive behavior will not be tolerated.

---

# Ways to Contribute

You can contribute in many ways, including:

### 🐞 Bug Fixes

- Fix existing issues
- Improve error handling
- Improve validation

---

### ✨ New Features

Examples:

- Dashboard Improvements
- Better Charts
- AI Enhancements
- Authentication
- Admin Panel
- Notifications
- Export Features

---

### 📖 Documentation

Improve:

- README
- User Guide
- API Documentation
- Architecture
- Deployment Guide
- Examples

---

### ⚡ Performance

Help optimize:

- Database Queries
- API Response Time
- Frontend Performance
- AI Processing

---

### 🧪 Testing

Write:

- Unit Tests
- Integration Tests
- API Tests
- Frontend Tests

---

# Getting Started

## 1. Fork the Repository

Click the **Fork** button on GitHub.

---

## 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/JanDhan-Analytics-AI.git

cd JanDhan-Analytics-AI
```

---

## 3. Add Upstream Repository

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/JanDhan-Analytics-AI.git
```

Verify:

```bash
git remote -v
```

---

## 4. Install Dependencies

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

---

### Frontend

```bash
cd frontend

npm install
```

---

# Branch Naming Convention

Never commit directly to the `main` branch.

Create a new branch for every feature or fix.

Examples:

```text
feature/dashboard

feature/ai-chat

feature/report-export

bugfix/login-error

bugfix/chart-render

docs/readme-update

docs/api-documentation

refactor/database

test/api-tests
```

---

# Commit Message Guidelines

Use meaningful commit messages.

Examples:

```text
feat: add AI dashboard insights

feat: implement JWT authentication

fix: resolve login validation issue

fix: optimize SQL queries

docs: update README

docs: improve API documentation

refactor: clean database models

test: add authentication tests
```

Avoid messages like:

```text
update

changes

fixed

done

commit
```

---

# Pull Request Process

Before submitting a Pull Request:

- Create a dedicated branch.
- Ensure the project builds successfully.
- Run tests.
- Update documentation if needed.
- Keep the PR focused on one feature or fix.

Pull Requests should include:

- Description of changes
- Related Issue Number (if any)
- Screenshots (for UI changes)
- Testing details

---

# Coding Standards

Follow the project's coding standards.

### Python

- Follow PEP 8
- Use type hints
- Write docstrings
- Use descriptive variable names

---

### JavaScript / TypeScript

- Use ESLint
- Use Prettier
- Follow React best practices
- Prefer functional components

---

### API

- RESTful naming conventions
- Proper HTTP status codes
- Input validation
- Error handling

---

# Reporting Bugs

Before opening an issue:

- Check existing issues.
- Reproduce the bug.
- Collect logs or screenshots.

Bug reports should include:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Environment details
- Screenshots (if applicable)

---

# Feature Requests

Feature requests are welcome.

Include:

- Problem description
- Proposed solution
- Benefits
- Example use cases

---

# Documentation Contributions

Documentation improvements are always appreciated.

You can improve:

- README
- Deployment Guide
- User Guide
- Architecture
- API Documentation
- Security Guide
- Examples

---

# Project Structure

```text
backend/
frontend/
database/
datasets/
docs/
tests/
deployment/
```

---

# Before Submitting

Please ensure:

- Code compiles successfully.
- Tests pass.
- No unnecessary files are included.
- Documentation is updated.
- Code follows project standards.

---

# Community

We encourage respectful discussions and collaborative development.

If you're unsure about a feature or implementation, feel free to open a discussion or issue before starting work.

---

# Recognition

Every meaningful contribution helps improve **JanDhan Analytics AI**.

Whether it's fixing a typo, improving documentation, or implementing a major feature, your contribution is valued and appreciated.

Thank you for helping build a more transparent and data-driven future for public governance! 🚀