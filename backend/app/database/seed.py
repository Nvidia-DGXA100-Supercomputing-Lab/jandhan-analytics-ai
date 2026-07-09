from app.database.session import engine, Base
from app.models.user import User
from app.models.transaction import Transaction
from app.models.scheme import Scheme
from app.models.report import Report
from app.core.security import get_password_hash
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

def seed_data():
    db = Session(bind=engine)
    try:
        if db.query(User).first() is None:
            admin = User(
                email="admin@jandhan.ai",
                hashed_password=get_password_hash("admin123"),
                name="Admin User",
            )
            db.add(admin)

        if db.query(Scheme).first() is None:
            schemes = [
                Scheme(name="PM-KISAN", department="Agriculture", budget=750000000, beneficiaries=10000000, description="Income support to farmer families"),
                Scheme(name="PM Awas Yojana", department="Housing", budget=1200000000, beneficiaries=5000000, description="Housing for all by 2022"),
                Scheme(name="Ayushman Bharat", department="Health", budget=800000000, beneficiaries=10000000, description="Health insurance for poor families"),
                Scheme(name="Mid-Day Meal", department="Education", budget=500000000, beneficiaries=120000000, description="Free lunch to school children"),
            ]
            for s in schemes:
                db.add(s)

        if db.query(Transaction).first() is None:
            transactions = [
                Transaction(scheme="PM-KISAN", department="Agriculture", amount=250000, status="Completed", date="2026-07-08"),
                Transaction(scheme="PM Awas Yojana", department="Housing", amount=500000, status="Processing", date="2026-07-07"),
                Transaction(scheme="Ayushman Bharat", department="Health", amount=120000, status="Completed", date="2026-07-06"),
                Transaction(scheme="Mid-Day Meal", department="Education", amount=80000, status="Completed", date="2026-07-05"),
            ]
            for t in transactions:
                db.add(t)

        if db.query(Report).first() is None:
            reports = [
                Report(name="Q3 Spending Analysis", type="PDF", date="2026-07-01", size="2.4 MB"),
                Report(name="Department Budget Report", type="PDF", date="2026-06-28", size="1.8 MB"),
                Report(name="Beneficiary Summary", type="XLSX", date="2026-06-25", size="3.2 MB"),
                Report(name="Anomaly Detection Report", type="PDF", date="2026-06-20", size="1.1 MB"),
            ]
            for r in reports:
                db.add(r)

        db.commit()
        print("Database seeded successfully!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
