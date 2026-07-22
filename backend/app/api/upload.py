from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import func
import csv
import io
from datetime import datetime
from app.database.session import get_db
from app.models.transaction import Transaction
from app.models.scheme import Scheme
from app.models.report import Report

router = APIRouter()

@router.post("/transactions/csv/")
def upload_transactions_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only CSV files are supported",
        )

    try:
        contents = file.file.read()
        decoded = contents.decode("utf-8")
        reader = csv.DictReader(io.StringIO(decoded))

        imported = 0
        errors = []

        for i, row in enumerate(reader, start=2):
            try:
                transaction = Transaction(
                    scheme=row.get("scheme", ""),
                    department=row.get("department", ""),
                    amount=float(row.get("amount", 0)),
                    status=row.get("status", "pending"),
                    date=row.get("date", datetime.utcnow().isoformat()),
                    recipient_name=row.get("recipient_name"),
                    recipient_account=row.get("recipient_account"),
                )
                db.add(transaction)
                imported += 1
            except Exception as e:
                errors.append(f"Row {i}: {str(e)}")

        db.commit()

        return {
            "imported": imported,
            "errors": errors,
            "message": f"Successfully imported {imported} transactions",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process file: {str(e)}",
        )

@router.post("/schemes/csv/")
def upload_schemes_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only CSV files are supported",
        )

    try:
        contents = file.file.read()
        decoded = contents.decode("utf-8")
        reader = csv.DictReader(io.StringIO(decoded))

        imported = 0
        errors = []

        for i, row in enumerate(reader, start=2):
            try:
                scheme = Scheme(
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
                db.add(scheme)
                imported += 1
            except Exception as e:
                errors.append(f"Row {i}: {str(e)}")

        db.commit()

        return {
            "imported": imported,
            "errors": errors,
            "message": f"Successfully imported {imported} schemes",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process file: {str(e)}",
        )
