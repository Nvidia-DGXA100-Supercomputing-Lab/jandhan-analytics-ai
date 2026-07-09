from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.session import get_db
from app.models.transaction import Transaction

router = APIRouter()

@router.get("/")
def get_forecasting(db: Session = Depends(get_db)):
    monthly = (
        db.query(func.strftime("%Y-%m", Transaction.date), func.sum(Transaction.amount))
        .group_by(func.strftime("%Y-%m", Transaction.date))
        .order_by(func.strftime("%Y-%m", Transaction.date))
        .all()
    )
    return {
        "monthly": [{"month": m, "amount": a} for m, a in monthly],
        "forecast": [
            {"month": "Jul", "amount": 5800000},
            {"month": "Aug", "amount": 6200000},
            {"month": "Sep", "amount": 5900000},
            {"month": "Oct", "amount": 6500000},
            {"month": "Nov", "amount": 7000000},
            {"month": "Dec", "amount": 6800000},
        ],
    }
