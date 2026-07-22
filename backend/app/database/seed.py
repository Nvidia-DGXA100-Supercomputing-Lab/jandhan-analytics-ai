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
        Scheme(name="PM Awas Yojana", department="Housing", budget=500000000, beneficiaries=2000000, description="Housing for all scheme", status="active", category="Housing", start_date="2024-01-01", end_date="2026-12-31", spent=45000000),
        Scheme(name="Ujjwala Yojana", department="Energy", budget=300000000, beneficiaries=5000000, description="Free LPG connections", status="active", category="Energy", start_date="2024-01-01", end_date="2025-12-31", spent=28500000),
        Scheme(name="Ayushman Bharat", department="Health", budget=800000000, beneficiaries=10000000, description="Health insurance for poor", status="active", category="Health", start_date="2024-01-01", end_date="2027-12-31", spent=83000000),
        Scheme(name="PM Kisan", department="Agriculture", budget=600000000, beneficiaries=7500000, description="Income support to farmers", status="active", category="Agriculture", start_date="2024-01-01", end_date="2025-12-31", spent=40000000),
        Scheme(name="Digital India", department="Technology", budget=200000000, beneficiaries=3000000, description="Digital infrastructure", status="active", category="Technology", start_date="2024-01-01", end_date="2026-12-31", spent=15500000),
        Scheme(name="Swachh Bharat", department="Sanitation", budget=150000000, beneficiaries=4000000, description="Clean India mission", status="active", category="Sanitation", start_date="2024-01-01", end_date="2025-12-31", spent=11250000),
        Scheme(name="Make in India", department="Industry", budget=400000000, beneficiaries=1500000, description="Boost manufacturing", status="active", category="Industry", start_date="2024-01-01", end_date="2027-12-31", spent=56000000),
        Scheme(name="Skill India", department="Education", budget=250000000, beneficiaries=5000000, description="Skill development", status="active", category="Education", start_date="2024-01-01", end_date="2026-12-31", spent=19000000),
    ]
    for s in schemes:
        db.add(s)
    db.commit()

    transactions = [
        Transaction(scheme="PM Awas Yojana", department="Housing", state="Maharashtra", amount=2500000, status="completed", date="2024-01-15", recipient_name="Rajesh Kumar", recipient_account="1234567890"),
        Transaction(scheme="PM Awas Yojana", department="Housing", state="Maharashtra", amount=1800000, status="completed", date="2024-02-10", recipient_name="Sunita Devi", recipient_account="1234567891"),
        Transaction(scheme="PM Awas Yojana", department="Housing", state="Karnataka", amount=3200000, status="completed", date="2024-03-05", recipient_name="Anil Sharma", recipient_account="1234567892"),
        Transaction(scheme="Ujjwala Yojana", department="Energy", state="Gujarat", amount=1200000, status="completed", date="2024-01-20", recipient_name="Priya Singh", recipient_account="1234567893"),
        Transaction(scheme="Ujjwala Yojana", department="Energy", state="Gujarat", amount=950000, status="pending", date="2024-02-15", recipient_name="Vikram Patel", recipient_account="1234567894"),
        Transaction(scheme="Ayushman Bharat", department="Health", state="Tamil Nadu", amount=4500000, status="completed", date="2024-01-25", recipient_name="Meera Joshi", recipient_account="1234567895"),
        Transaction(scheme="Ayushman Bharat", department="Health", state="Tamil Nadu", amount=3800000, status="completed", date="2024-03-10", recipient_name="Rahul Verma", recipient_account="1234567896"),
        Transaction(scheme="PM Kisan", department="Agriculture", state="Punjab", amount=2100000, status="completed", date="2024-02-01", recipient_name="Kavita Reddy", recipient_account="1234567897"),
        Transaction(scheme="PM Kisan", department="Agriculture", state="Punjab", amount=1900000, status="completed", date="2024-03-15", recipient_name="Sanjay Gupta", recipient_account="1234567898"),
        Transaction(scheme="Digital India", department="Technology", state="Karnataka", amount=800000, status="completed", date="2024-01-30", recipient_name="Neha Agarwal", recipient_account="1234567899"),
        Transaction(scheme="Digital India", department="Technology", state="Karnataka", amount=750000, status="pending", date="2024-02-20", recipient_name="Rohit Malhotra", recipient_account="1234567900"),
        Transaction(scheme="Swachh Bharat", department="Sanitation", state="Maharashtra", amount=1100000, status="completed", date="2024-01-10", recipient_name="Pooja Nair", recipient_account="1234567901"),
        Transaction(scheme="Swachh Bharat", department="Sanitation", state="Maharashtra", amount=1300000, status="completed", date="2024-03-20", recipient_name="Arun Iyer", recipient_account="1234567902"),
        Transaction(scheme="Make in India", department="Industry", state="Gujarat", amount=5600000, status="completed", date="2024-02-05", recipient_name="Deepak Khanna", recipient_account="1234567903"),
        Transaction(scheme="Make in India", department="Industry", state="Gujarat", amount=4800000, status="pending", date="2024-03-01", recipient_name="Shalini Rao", recipient_account="1234567904"),
        Transaction(scheme="Skill India", department="Education", state="Tamil Nadu", amount=1700000, status="completed", date="2024-01-18", recipient_name="Manoj Pillai", recipient_account="1234567905"),
        Transaction(scheme="Skill India", department="Education", state="Tamil Nadu", amount=1400000, status="completed", date="2024-02-25", recipient_name="Ritu Bhatt", recipient_account="1234567906"),
        Transaction(scheme="PM Awas Yojana", department="Housing", state="Delhi", amount=900000, status="completed", date="2024-03-12", recipient_name="Suresh Thakur", recipient_account="1234567907"),
        Transaction(scheme="Ayushman Bharat", department="Health", state="Uttar Pradesh", amount=2200000, status="completed", date="2024-02-28", recipient_name="Geeta Rawat", recipient_account="1234567908"),
        Transaction(scheme="PM Kisan", department="Agriculture", state="Haryana", amount=3100000, status="pending", date="2024-03-08", recipient_name="Vinod Chauhan", recipient_account="1234567909"),
        Transaction(scheme="Digital India", department="Technology", state="Telangana", amount=1600000, status="completed", date="2024-03-18", recipient_name="Amit Joshi", recipient_account="1234567910"),
        Transaction(scheme="Swachh Bharat", department="Sanitation", state="Rajasthan", amount=700000, status="completed", date="2024-02-12", recipient_name="Kiran Patel", recipient_account="1234567911"),
        Transaction(scheme="Make in India", department="Industry", state="Delhi", amount=3500000, status="completed", date="2024-01-22", recipient_name="Nisha Singh", recipient_account="1234567912"),
        Transaction(scheme="Skill India", department="Education", state="Kerala", amount=2800000, status="completed", date="2024-03-25", recipient_name="Ravi Kumar", recipient_account="1234567913"),
        Transaction(scheme="PM Awas Yojana", department="Housing", state="Karnataka", amount=4100000, status="completed", date="2024-02-18", recipient_name="Pooja Sharma", recipient_account="1234567914"),
    ]
    for t in transactions:
        db.add(t)
    db.commit()

    reports = [
        Report(name="Q1 2024 Executive Summary", type="pdf", date="2024-03-31", size="2.4 MB", url="/reports/q1-2024.pdf", status="completed"),
        Report(name="February Spending Analysis", type="csv", date="2024-02-28", size="1.1 MB", url="/reports/feb-2024.csv", status="completed"),
        Report(name="Annual Budget Review 2023", type="pdf", date="2024-01-15", size="5.2 MB", url="/reports/annual-2023.pdf", status="completed"),
    ]
    for r in reports:
        db.add(r)
    db.commit()