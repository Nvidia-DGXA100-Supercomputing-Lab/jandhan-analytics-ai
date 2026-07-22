"""Recommendation module for suggesting optimizations in spending."""

def recommend_optimizations(spending_data: dict) -> list:
    recommendations = []
    if "spending_by_dept" in spending_data:
        total = sum(item["amount"] for item in spending_data["spending_by_dept"])
        for item in spending_data["spending_by_dept"]:
            if total > 0 and item["amount"] / total > 0.3:
                recommendations.append({
                    "department": item["department"],
                    "suggestion": "Consider reviewing high spending allocation for potential optimization.",
                    "priority": "high",
                })
    return recommendations
