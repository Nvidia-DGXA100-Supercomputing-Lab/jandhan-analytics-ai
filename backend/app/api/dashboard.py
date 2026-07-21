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
    total_spending = float(db.query(func.sum(Transaction.amount)).scalar() or 0)
    total_schemes = db.query(Scheme).count()
    total_budget = float(db.query(func.sum(Scheme.budget)).scalar() or 0)
    total_transactions = db.query(Transaction).count()
    beneficiaries = int(db.query(func.sum(Scheme.beneficiaries)).scalar() or 0)
    pending_verifications = db.query(Transaction).filter(Transaction.status == "pending").count()
    recent_transactions = db.query(Transaction).order_by(Transaction.date.desc()).limit(5).all()

    return {
        "total_spending": total_spending,
        "total_schemes": total_schemes,
        "total_budget": total_budget,
        "total_transactions": total_transactions,
        "beneficiaries": beneficiaries,
        "pending_verifications": pending_verifications,
        "recent_transactions": [
            {
                "id": str(t.id),
                "recipient_name": t.recipient_name or "N/A",
                "scheme_id": t.scheme,
                "amount": float(t.amount or 0),
                "status": t.status or "pending",
                "date": t.date,
            }
            for t in recent_transactions
        ],
        "top_schemes": [],
    }
