from sqlalchemy.orm import Session
from sqlalchemy import func
from io import StringIO, BytesIO
import csv
from datetime import datetime
from app.models.transaction import Transaction
from app.models.scheme import Scheme
from app.models.report import Report

def generate_csv_report(db: Session):
    total_spending = db.query(func.sum(Transaction.amount)).scalar() or 0
    spending_by_dept = (
        db.query(Transaction.department, func.sum(Transaction.amount))
        .group_by(Transaction.department)
        .all()
    )
    monthly = (
        db.query(func.substr(Transaction.date, 1, 7), func.sum(Transaction.amount))
        .group_by(func.substr(Transaction.date, 1, 7))
        .order_by(func.substr(Transaction.date, 1, 7))
        .all()
    )

    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["Metric", "Value"])
    writer.writerow(["Total Spending", total_spending])
    writer.writerow(["Generated At", datetime.now().isoformat()])
    writer.writerow([])
    writer.writerow(["Department", "Amount"])
    for dept, amount in spending_by_dept:
        writer.writerow([dept, amount])
    writer.writerow([])
    writer.writerow(["Month", "Amount"])
    for month, amount in monthly:
        writer.writerow([month, amount])
    output.seek(0)
    return output.getvalue()

def generate_pdf_report(db: Session):
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import letter
    from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
    from reportlab.lib.styles import getSampleStyleSheet

    total_spending = db.query(func.sum(Transaction.amount)).scalar() or 0
    spending_by_dept = (
        db.query(Transaction.department, func.sum(Transaction.amount))
        .group_by(Transaction.department)
        .all()
    )
    monthly = (
        db.query(func.substr(Transaction.date, 1, 7), func.sum(Transaction.amount))
        .group_by(func.substr(Transaction.date, 1, 7))
        .order_by(func.substr(Transaction.date, 1, 7))
        .all()
    )

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("JanDhan Analytics AI - Executive Report", styles["Title"]))
    elements.append(Paragraph(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", styles["Normal"]))
    elements.append(Paragraph(f"Total Spending: ₹{total_spending:,.2f}", styles["Normal"]))
    elements.append(Paragraph("<br/>", styles["Normal"]))

    dept_data = [["Department", "Amount"]] + [[d, f"₹{a:,.2f}"] for d, a in spending_by_dept]
    dept_table = Table(dept_data, hAlign="LEFT")
    dept_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 12),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(dept_table)
    elements.append(Paragraph("<br/>", styles["Normal"]))

    monthly_data = [["Month", "Amount"]] + [[m, f"₹{a:,.2f}"] for m, a in monthly]
    monthly_table = Table(monthly_data, hAlign="LEFT")
    monthly_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 12),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(monthly_table)

    doc.build(elements)
    buffer.seek(0)
    return buffer
