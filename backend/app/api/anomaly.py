from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from statistics import mean, stdev
from app.database.session import get_db
from app.models.transaction import Transaction

router = APIRouter()

@router.get("/detection")
def detect_anomalies(db: Session = Depends(get_db)):
    transactions = db.query(Transaction).all()
    if not transactions:
        return {"anomalies": [], "message": "No transactions available"}

    dept_amounts = {}
    monthly_amounts = {}

    for t in transactions:
        dept_amounts.setdefault(t.department, []).append(t.amount)
        month = t.date[:7] if len(t.date) >= 7 else t.date
        monthly_amounts.setdefault(month, []).append(t.amount)

    anomalies = []

    for dept, amounts in dept_amounts.items():
        if len(amounts) < 2:
            continue
        avg = mean(amounts)
        sd = stdev(amounts)
        for t in transactions:
            if t.department == dept:
                z = (t.amount - avg) / sd if sd > 0 else 0
                severity = "high" if abs(z) > 2 else "medium" if abs(z) > 1.5 else "low"
                if abs(z) > 1.5:
                    anomalies.append({
                        "type": "department_outlier",
                        "department": dept,
                        "transaction_id": t.id,
                        "amount": t.amount,
                        "severity": severity,
                        "message": f"Outlier in {dept}: ₹{t.amount:,.0f} (avg: ₹{avg:,.0f})",
                    })

    for month, amounts in monthly_amounts.items():
        if len(amounts) < 2:
            continue
        avg = mean(amounts)
        sd = stdev(amounts)
        total = sum(amounts)
        z = (total - avg) / sd if sd > 0 else 0
        severity = "high" if abs(z) > 2 else "medium" if abs(z) > 1.5 else "low"
        if abs(z) > 1.5:
            anomalies.append({
                "type": "monthly_outlier",
                "month": month,
                "total_amount": total,
                "severity": severity,
                "message": f"Unusual spending in {month}: ₹{total:,.0f} (avg: ₹{avg:,.0f})",
            })

    anomalies.sort(key=lambda x: x["severity"], reverse=True)
    return {"anomalies": anomalies}