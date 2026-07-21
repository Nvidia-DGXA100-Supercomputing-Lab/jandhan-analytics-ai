import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database.session import Base, get_db
from app.core.security import get_password_hash

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

Base.metadata.create_all(bind=engine)


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_register_user(client):
    response = client.post(
        "/api/auth/register",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "password": "testpass123",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data


def test_login_user(client):
    client.post(
        "/api/auth/register",
        json={
            "name": "Login User",
            "email": "login@example.com",
            "password": "loginpass123",
        },
    )
    response = client.post(
        "/api/auth/login",
        json={
            "email": "login@example.com",
            "password": "loginpass123",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data


def test_get_dashboard(client):
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Dashboard User",
            "email": "dashboard@example.com",
            "password": "dashpass123",
        },
    )
    token = register_response.json()["access_token"]

    response = client.get(
        "/api/dashboard/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "total_schemes" in data
    assert "total_transactions" in data


def test_analytics_endpoints(client):
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Analytics User",
            "email": "analytics@example.com",
            "password": "analyticspass123",
        },
    )
    token = register_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    endpoints = [
        "/api/analytics/spending-trends/",
        "/api/analytics/category-breakdown/",
        "/api/analytics/scheme-utilization/",
        "/api/analytics/geographic-distribution/",
    ]

    for endpoint in endpoints:
        response = client.get(endpoint, headers=headers)
        assert response.status_code == 200


def test_refresh_token(client):
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Refresh User",
            "email": "refresh@example.com",
            "password": "refreshpass123",
        },
    )
    refresh_token = register_response.json()["refresh_token"]

    response = client.post(
        "/api/auth/refresh",
        json={"refresh": refresh_token},
    )
    assert response.status_code == 200
    assert "access" in response.json()


def test_logout(client):
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Logout User",
            "email": "logout@example.com",
            "password": "logoutpass123",
        },
    )
    token = register_response.json()["access_token"]

    response = client.post(
        "/api/auth/logout",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
