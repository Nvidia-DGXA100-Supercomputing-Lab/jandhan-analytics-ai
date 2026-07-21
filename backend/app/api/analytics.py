from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
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

@router.get("/spending-trends/")
def get_spending_trends(db: Session = Depends(get_db)):
    trends = (
        db.query(func.strftime("%Y-%m", Transaction.date), func.sum(Transaction.amount))
        .group_by(func.strftime("%Y-%m", Transaction.date))
        .order_by(func.strftime("%Y-%m", Transaction.date))
        .all()
    )
    return [{"month": m, "amount": a} for m, a in trends]

@router.get("/category-breakdown/")
def get_category_breakdown(db: Session = Depends(get_db)):
    breakdown = (
        db.query(Transaction.department, func.sum(Transaction.amount))
        .group_by(Transaction.department)
        .all()
    )
    return [{"category": d, "amount": a} for d, a in breakdown]

@router.get("/scheme-utilization/")
def get_scheme_utilization(db: Session = Depends(get_db)):
    schemes = db.query(Scheme).all()
    result = []
    for scheme in schemes:
        spent = (
            db.query(func.sum(Transaction.amount))
            .filter(Transaction.scheme == scheme.name)
            .scalar() or 0
        )
        result.append({
            "scheme": scheme.name,
            "utilized": spent,
            "total": scheme.budget,
        })
    return result

@router.get("/geographic-distribution/")
def get_geographic_distribution(db: Session = Depends(get_db)):
    districts = (
        db.query(Transaction.department, func.sum(Transaction.amount))
        .group_by(Transaction.department)
        .all()
    )
    return [{"state": d, "amount": a} for d, a in districts]

