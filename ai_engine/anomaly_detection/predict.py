"""Predict anomalies using a trained anomaly detection model."""

import json
from typing import List, Dict, Any


def load_model(model_path: str = "ai_engine/anomaly_detection/model.json") -> Dict[str, Any]:
    with open(model_path, "r", encoding="utf-8") as f:
        return json.load(f)


def predict(transactions: List[Dict[str, Any]], model: Dict[str, Any]) -> List[Dict[str, Any]]:
    if not transactions:
        return []

    dept_stats = model.get("dept_stats", {})
    monthly_stats = model.get("monthly_stats", {})
    threshold_z = float(model.get("threshold_z", 1.5))

    anomalies: List[Dict[str, Any]] = []
    anomaly_id = 1

    for t in transactions:
        dept = t.get("department", "Unknown")
        amount = float(t.get("amount", 0))
        date = t.get("date", "")

        stats = dept_stats.get(dept, {"mean": 0, "std": 0})
        avg = stats.get("mean", 0)
        sd = stats.get("std", 0)
        z = (amount - avg) / sd if sd > 0 else 0

        severity = "high" if abs(z) > 2 else "medium" if abs(z) > threshold_z else "low"
        if abs(z) > threshold_z:
            anomalies.append({
                "id": f"anomaly-{anomaly_id}",
                "transaction_id": str(t.get("id", "")),
                "type": "department_outlier",
                "severity": severity,
                "description": f"Outlier in {dept}: amount={amount} (avg={avg:.2f})",
                "confidence": min(abs(z) / 3, 1.0),
                "detected_at": "",
                "status": "open",
                "amount": amount,
                "department": dept,
            })
            anomaly_id += 1

    month_groups: Dict[str, List[float]] = {}
    for t in transactions:
        date = t.get("date", "")
        month = date[:7] if len(date) >= 7 else date
        month_groups.setdefault(month, []).append(float(t.get("amount", 0)))

    for month, amounts in month_groups.items():
        stats = monthly_stats.get(month, {"mean": 0, "std": 0})
        avg = stats.get("mean", 0)
        sd = stats.get("std", 0)
        total = sum(amounts)
        z = (total - avg) / sd if sd > 0 else 0
        severity = "high" if abs(z) > 2 else "medium" if abs(z) > threshold_z else "low"
        if abs(z) > threshold_z:
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
