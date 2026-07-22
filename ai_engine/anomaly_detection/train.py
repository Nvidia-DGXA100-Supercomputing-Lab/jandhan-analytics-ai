"""Train a simple anomaly detection model based on spending statistics."""

import json
import os
from typing import List, Dict, Any
from statistics import mean, stdev


def train(transactions: List[Dict[str, Any]], output_path: str = "ai_engine/anomaly_detection/model.json") -> Dict[str, Any]:
    dept_amounts: Dict[str, List[float]] = {}
    monthly_amounts: Dict[str, List[float]] = []

    for t in transactions:
        dept = t.get("department", "Unknown")
        amount = float(t.get("amount", 0))
        date = t.get("date", "")

        dept_amounts.setdefault(dept, []).append(amount)
        month = date[:7] if len(date) >= 7 else date
        monthly_amounts.append((month, amount))

    dept_stats: Dict[str, Dict[str, float]] = {}
    for dept, amounts in dept_amounts.items():
        if len(amounts) >= 2:
            dept_stats[dept] = {"mean": mean(amounts), "std": stdev(amounts)}
        else:
            dept_stats[dept] = {"mean": mean(amounts) if amounts else 0, "std": 0}

    month_groups: Dict[str, List[float]] = {}
    for month, amount in monthly_amounts:
        month_groups.setdefault(month, []).append(amount)

    monthly_stats: Dict[str, Dict[str, float]] = {}
    for month, amounts in month_groups.items():
        if len(amounts) >= 2:
            monthly_stats[month] = {"mean": mean(amounts), "std": stdev(amounts)}
        else:
            monthly_stats[month] = {"mean": mean(amounts) if amounts else 0, "std": 0}

    model = {
        "dept_stats": dept_stats,
        "monthly_stats": monthly_stats,
        "threshold_z": 1.5,
    }

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(model, f, indent=2)

    return model
