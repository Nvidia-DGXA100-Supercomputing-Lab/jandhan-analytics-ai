from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.session import get_db
from app.models.transaction import Transaction
from app.models.scheme import Scheme

router = APIRouter()

@router.get("/")
def get_analytics(db: Session = Depends(get_db)):
    total_budget = db.query(func.sum(Scheme.budget)).scalar() or 0
    spending_by_dept = (
        db.query(Transaction.department, func.sum(Transaction.amount))
        .group_by(Transaction.department)
        .all()
    )
    quarterly = (
        db.query(func.strftime("%Y-%m", Transaction.date), func.sum(Transaction.amount))
        .group_by(func.strftime("%Y-%m", Transaction.date))
        .order_by(func.strftime("%Y-%m", Transaction.date))
        .all()
    )

    return {
        "total_budget": total_budget,
        "spending_by_dept": [{"department": d, "amount": a} for d, a in spending_by_dept],
        "quarterly": [{"month": m, "amount": a} for m, a in quarterly],
    }
