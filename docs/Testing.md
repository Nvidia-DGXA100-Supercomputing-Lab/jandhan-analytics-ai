# Testing Guide

## Backend Tests

Run backend tests with pytest:

```bash
cd backend
pytest tests/ -v
```

### Test Structure
- `tests/test_api.py` — API endpoint tests
- `tests/backend/test_auth.py` — Authentication tests

### Writing New Tests
Use `TestClient` from FastAPI for endpoint testing.

## Frontend Tests

Run frontend tests with vitest:

```bash
cd frontend
npm test
```

### Test Structure
- `src/app.test.ts` — Core API client and type tests

### Writing New Tests
Use `vitest` with `@testing-library/react` for component tests.

## AI Engine Tests

Run AI tests with pytest from backend:

```bash
cd backend
pytest tests/ai/ -v
```

## Manual Testing Checklist
1. Register a new user
2. Login with existing credentials
3. View dashboard KPIs
4. Navigate to Analytics, Transactions, Schemes
5. Run anomaly detection
6. Generate a report
7. Upload a CSV dataset
8. Chat with AI assistant
9. View forecasting page
10. Check settings page
