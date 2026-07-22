"""Anomaly detection module for identifying irregularities in spending data."""

from statistics import mean, stdev
from typing import List, Dict, Any


def detect_anomalies(transactions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    if not transactions:
        return []

    dept_amounts: Dict[str, List[float]] = {}
    monthly_amounts: Dict[str, List[float]] = []

    for t in transactions:
        dept = t.get("department", "Unknown")
        amount = float(t.get("amount", 0))
        date = t.get("date", "")

        dept_amounts.setdefault(dept, []).append(amount)

        month = date[:7] if len(date) >= 7 else date
        monthly_amounts.append((month, amount))

    anomalies: List[Dict[str, Any]] = []
    anomaly_id = 1

    for dept, amounts in dept_amounts.items():
        if len(amounts) < 2:
            continue
        avg = mean(amounts)
        sd = stdev(amounts)
        for t in transactions:
            if t.get("department") == dept:
                z = (float(t.get("amount", 0)) - avg) / sd if sd > 0 else 0
                severity = "high" if abs(z) > 2 else "medium" if abs(z) > 1.5 else "low"
                if abs(z) > 1.5:
                    anomalies.append({
                        "id": f"anomaly-{anomaly_id}",
                        "transaction_id": str(t.get("id", "")),
                        "type": "department_outlier",
                        "severity": severity,
                        "description": f"Outlier in {dept}: amount={t.get('amount', 0)} (avg={avg:.2f})",
                        "confidence": min(abs(z) / 3, 1.0),
                        "detected_at": "",
                        "status": "open",
                        "amount": float(t.get("amount", 0)),
                        "department": dept,
                    })
                    anomaly_id += 1

    month_groups: Dict[str, List[float]] = {}
    for month, amount in monthly_amounts:
        month_groups.setdefault(month, []).append(amount)

    for month, amounts in month_groups.items():
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
                "description": f"Unusual spending in {month}: total={total:.2f} (avg={avg:.2f})",
                "confidence": min(abs(z) / 3, 1.0),
                "detected_at": "",
                "status": "open",
                "amount": total,
                "department": "All",
            })
            anomaly_id += 1

    anomalies.sort(key=lambda x: x["severity"], reverse=True)
    return anomalies
