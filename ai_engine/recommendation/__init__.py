"""Recommendation module for suggesting optimizations in spending."""

from typing import Dict, List


def recommend_optimizations(spending_data: Dict) -> List[Dict]:
    recommendations: List[Dict] = []
    spending_by_dept = spending_data.get("spending_by_dept", [])
    if not spending_by_dept:
        return recommendations

    total = sum(item.get("amount", 0) for item in spending_by_dept)
    if total <= 0:
        return recommendations

    for item in spending_by_dept:
        amount = item.get("amount", 0)
        if total > 0 and amount / total > 0.3:
            recommendations.append({
                "department": item.get("department", "Unknown"),
                "suggestion": "Review high spending allocation for potential cost optimization.",
                "priority": "high",
                "current_allocation_percent": round((amount / total) * 100, 2),
            })
    return recommendations
