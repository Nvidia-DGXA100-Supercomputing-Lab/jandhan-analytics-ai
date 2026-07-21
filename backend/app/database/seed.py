from sqlalchemy.orm import Session
from app.models.user import User
from app.models.scheme import Scheme
from app.models.transaction import Transaction
from app.models.report import Report
from app.core.security import get_password_hash

def seed_database(db: Session):
    if db.query(User).first():
        return

    admin = User(
        email="admin@jandhan.gov.in",
        name="Admin User",
        hashed_password=get_password_hash("admin123"),
        role="admin",
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)

    schemes = [
        Scheme(name="PM Awas Yojana", department="Housing", budget=500000000, beneficiaries=2000000, description="Housing for all scheme"),
        Scheme(name="Ujjwala Yojana", department="Energy", budget=300000000, beneficiaries=5000000, description="Free LPG connections"),
        Scheme(name="Ayushman Bharat", department="Health", budget=800000000, beneficiaries=10000000, description="Health insurance for poor"),
        Scheme(name="PM Kisan", department="Agriculture", budget=600000000, beneficiaries=7500000, description="Income support to farmers"),
        Scheme(name="Digital India", department="Technology", budget=200000000, beneficiaries=3000000, description="Digital infrastructure"),
        Scheme(name="Swachh Bharat", department="Sanitation", budget=150000000, beneficiaries=4000000, description="Clean India mission"),
        Scheme(name="Make in India", department="Industry", budget=400000000, beneficiaries=1500000, description="Boost manufacturing"),
        Scheme(name="Skill India", department="Education", budget=250000000, beneficiaries=5000000, description="Skill development"),
    ]
    for s in schemes:
        db.add(s)
    db.commit()

    transactions = [
        Transaction(scheme="PM Awas Yojana", department="Housing", amount=2500000, status="completed", date="2024-01-15"),
        Transaction(scheme="PM Awas Yojana", department="Housing", amount=1800000, status="completed", date="2024-02-10"),
        Transaction(scheme="PM Awas Yojana", department="Housing", amount=3200000, status="completed", date="2024-03-05"),
        Transaction(scheme="Ujjwala Yojana", department="Energy", amount=1200000, status="completed", date="2024-01-20"),
        Transaction(scheme="Ujjwala Yojana", department="Energy", amount=950000, status="pending", date="2024-02-15"),
        Transaction(scheme="Ayushman Bharat", department="Health", amount=4500000, status="completed", date="2024-01-25"),
        Transaction(scheme="Ayushman Bharat", department="Health", amount=3800000, status="completed", date="2024-03-10"),
        Transaction(scheme="PM Kisan", department="Agriculture", amount=2100000, status="completed", date="2024-02-01"),
        Transaction(scheme="PM Kisan", department="Agriculture", amount=1900000, status="completed", date="2024-03-15"),
        Transaction(scheme="Digital India", department="Technology", amount=800000, status="completed", date="2024-01-30"),
        Transaction(scheme="Digital India", department="Technology", amount=750000, status="pending", date="2024-02-20"),
        Transaction(scheme="Swachh Bharat", department="Sanitation", amount=1100000, status="completed", date="2024-01-10"),
        Transaction(scheme="Swachh Bharat", department="Sanitation", amount=1300000, status="completed", date="2024-03-20"),
        Transaction(scheme="Make in India", department="Industry", amount=5600000, status="completed", date="2024-02-05"),
        Transaction(scheme="Make in India", department="Industry", amount=4800000, status="pending", date="2024-03-01"),
        Transaction(scheme="Skill India", department="Education", amount=1700000, status="completed", date="2024-01-18"),
        Transaction(scheme="Skill India", department="Education", amount=1400000, status="completed", date="2024-02-25"),
        Transaction(scheme="PM Awas Yojana", department="Housing", amount=900000, status="completed", date="2024-03-12"),
        Transaction(scheme="Ayushman Bharat", department="Health", amount=2200000, status="completed", date="2024-02-28"),
        Transaction(scheme="PM Kisan", department="Agriculture", amount=3100000, status="pending", date="2024-03-08"),
        Transaction(scheme="Digital India", department="Technology", amount=1600000, status="completed", date="2024-03-18"),
        Transaction(scheme="Swachh Bharat", department="Sanitation", amount=700000, status="completed", date="2024-02-12"),
        Transaction(scheme="Make in India", department="Industry", amount=3500000, status="completed", date="2024-01-22"),
        Transaction(scheme="Skill India", department="Education", amount=2800000, status="completed", date="2024-03-25"),
        Transaction(scheme="PM Awas Yojana", department="Housing", amount=4100000, status="completed", date="2024-02-18"),
    ]
    for t in transactions:
        db.add(t)
    db.commit()

    reports = [
        Report(name="Q1 2024 Executive Summary", type="pdf", date="2024-03-31", size="2.4 MB", url="/reports/q1-2024.pdf"),
        Report(name="February Spending Analysis", type="csv", date="2024-02-28", size="1.1 MB", url="/reports/feb-2024.csv"),
        Report(name="Annual Budget Review 2023", type="pdf", date="2024-01-15", size="5.2 MB", url="/reports/annual-2023.pdf"),
    ]
    for r in reports:
        db.add(r)
    db.commit()