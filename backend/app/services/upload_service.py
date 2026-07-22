import csv
import io
from typing import List, Dict
from app.models.transaction import Transaction
from app.models.scheme import Scheme

def process_transactions_csv(file_content: bytes) -> Dict:
    decoded = file_content.decode("utf-8")
    reader = csv.DictReader(io.StringIO(decoded))
    imported = 0
    errors = []
    for i, row in enumerate(reader, start=2):
        try:
            Transaction(
                scheme=row.get("scheme", ""),
                department=row.get("department", ""),
                amount=float(row.get("amount", 0)),
                status=row.get("status", "pending"),
                date=row.get("date", ""),
                recipient_name=row.get("recipient_name"),
                recipient_account=row.get("recipient_account"),
            )
            imported += 1
        except Exception as e:
            errors.append(f"Row {i}: {str(e)}")
    return {"imported": imported, "errors": errors}

def process_schemes_csv(file_content: bytes) -> Dict:
    decoded = file_content.decode("utf-8")
    reader = csv.DictReader(io.StringIO(decoded))
    imported = 0
    errors = []
    for i, row in enumerate(reader, start=2):
        try:
            Scheme(
                name=row.get("name", ""),
                department=row.get("department", ""),
                budget=float(row.get("budget", 0)),
                beneficiaries=int(row.get("beneficiaries", 0)),
                description=row.get("description"),
                status=row.get("status", "active"),
                category=row.get("category"),
                start_date=row.get("start_date"),
                end_date=row.get("end_date"),
            )
            imported += 1
        except Exception as e:
            errors.append(f"Row {i}: {str(e)}")
    return {"imported": imported, "errors": errors}
