from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from app.database.session import get_db
from app.models.transaction import Transaction
from ai_engine.forecasting.predict import get_forecast

router = APIRouter()

@router.get("/")
def get_forecasting(
    db: Session = Depends(get_db),
    scheme_id: Optional[str] = Query(None),
    horizon: Optional[int] = Query(6),
):
    monthly = (
        db.query(func.strftime("%Y-%m", Transaction.date), func.sum(Transaction.amount))
        .group_by(func.strftime("%Y-%m", Transaction.date))
        .order_by(func.strftime("%Y-%m", Transaction.date))
        .all()
    )

    data = [{"month": m, "amount": float(a)} for m, a in monthly]
    forecast_result = get_forecast(data, scheme_id=scheme_id, horizon=horizon)

    return {
        "monthly": data,
        **forecast_result,
    }
