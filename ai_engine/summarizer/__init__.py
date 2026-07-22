"""Summarizer module for generating concise summaries of spending data."""

def summarize_text(text: str, max_sentences: int = 3) -> str:
    sentences = text.split(". ")
    return ". ".join(sentences[:max_sentences]) + "."

def summarize_spending_report(report_data: dict) -> str:
    parts = []
    if "total_spending" in report_data:
        parts.append(f"Total spending is ₹{report_data['total_spending']:,.2f}.")
    if "spending_by_dept" in report_data:
        top_dept = max(report_data["spending_by_dept"], key=lambda x: x["amount"])
        parts.append(f"Highest spending department is {top_dept['department']} with ₹{top_dept['amount']:,.2f}.")
    return " ".join(parts)
