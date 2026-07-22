from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from statistics import mean, stdev
from datetime import datetime
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
    anomaly_id = 1

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
                        "id": f"anomaly-{anomaly_id}",
                        "transaction_id": str(t.id),
                        "type": "department_outlier",
                        "severity": severity,
                        "description": f"Outlier in {dept}: ₹{t.amount:,.0f} (avg: ₹{avg:,.0f})",
                        "confidence": min(abs(z) / 3, 1.0),
                        "detected_at": datetime.utcnow().isoformat(),
                        "status": "open",
                        "amount": t.amount,
                        "department": dept,
                    })
                    anomaly_id += 1

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
                "id": f"anomaly-{anomaly_id}",
                "transaction_id": "N/A",
                "type": "monthly_outlier",
                "severity": severity,
                "description": f"Unusual spending in {month}: ₹{total:,.0f} (avg: ₹{avg:,.0f})",
                "confidence": min(abs(z) / 3, 1.0),
                "detected_at": datetime.utcnow().isoformat(),
                "status": "open",
                "amount": total,
                "department": "All",
            })
            anomaly_id += 1

    anomalies.sort(key=lambda x: x["severity"], reverse=True)
    return {"anomalies": anomalies}