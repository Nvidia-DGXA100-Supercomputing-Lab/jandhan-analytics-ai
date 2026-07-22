"""Summarizer module for generating concise summaries of spending data."""

from typing import Dict, List


def summarize_text(text: str, max_sentences: int = 3) -> str:
    sentences = [s.strip() for s in text.split(".") if s.strip()]
    return ". ".join(sentences[:max_sentences]) + "."


def summarize_spending_report(report_data: Dict) -> str:
    parts: List[str] = []
    if "total_spending" in report_data:
        parts.append(f"Total spending is {report_data['total_spending']}.")
    if "spending_by_dept" in report_data and report_data["spending_by_dept"]:
        top_dept = max(report_data["spending_by_dept"], key=lambda x: x.get("amount", 0))
        parts.append(f"Highest spending department is {top_dept.get('department', 'N/A')} with {top_dept.get('amount', 0)}.")
    if "quarterly" in report_data and report_data["quarterly"]:
        latest = report_data["quarterly"][-1]
        parts.append(f"Latest quarterly spending: {latest.get('amount', 0)}.")
    return " ".join(parts) if parts else "No summary available."
