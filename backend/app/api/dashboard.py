from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.session import get_db
from app.models.transaction import Transaction
from app.models.scheme import Scheme
from app.models.report import Report

router = APIRouter()

@router.get("/")
def get_dashboard(db: Session = Depends(get_db)):
    total_spending = db.query(func.sum(Transaction.amount)).scalar() or 0
    active_schemes = db.query(Scheme).count()
    beneficiaries = db.query(func.sum(Scheme.beneficiaries)).scalar() or 0
    transactions = db.query(Transaction).order_by(Transaction.date.desc()).limit(5).all()

    return {
        "total_spending": f"₹{total_spending / 100000:.2f} Cr",
        "active_schemes": active_schemes,
        "beneficiaries": f"{beneficiaries / 1000000:.1f}M",
        "transactions": [
            {
                "scheme": t.scheme,
                "department": t.department,
                "amount": f"₹{t.amount:,.0f}",
                "status": t.status,
                "date": t.date,
            }
            for t in transactions
        ],
    }
