from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.transaction import Transaction
from app.models.scheme import Scheme

def get_analytics_data(db: Session):
    total_budget = db.query(func.sum(Scheme.budget)).scalar() or 0
    spending_by_dept = (
        db.query(Transaction.department, func.sum(Transaction.amount))
        .group_by(Transaction.department)
        .all()
    )
    quarterly = (
        db.query(func.substr(Transaction.date, 1, 7), func.sum(Transaction.amount))
        .group_by(func.substr(Transaction.date, 1, 7))
        .order_by(func.substr(Transaction.date, 1, 7))
        .all()
    )
    return {
        "total_budget": total_budget,
        "spending_by_dept": [{"department": d, "amount": a} for d, a in spending_by_dept],
        "quarterly": [{"month": m, "amount": a} for m, a in quarterly],
    }

def get_spending_trends(db: Session):
    trends = (
        db.query(func.substr(Transaction.date, 1, 7), func.sum(Transaction.amount))
        .group_by(func.substr(Transaction.date, 1, 7))
        .order_by(func.substr(Transaction.date, 1, 7))
        .all()
    )
    return [{"month": m, "amount": a} for m, a in trends]

def get_category_breakdown(db: Session):
    breakdown = (
        db.query(Transaction.department, func.sum(Transaction.amount))
        .group_by(Transaction.department)
        .all()
    )
    return [{"category": d, "amount": a} for d, a in breakdown]

def get_scheme_utilization(db: Session):
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

def get_geographic_distribution(db: Session):
    districts = (
        db.query(Transaction.department, func.sum(Transaction.amount))
        .group_by(Transaction.department)
        .all()
    )
    return [{"state": d, "amount": a} for d, a in districts]
