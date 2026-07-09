from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.report import Report
from app.schemas.scheme import Report as ReportSchema

router = APIRouter()

@router.get("/", response_model=list[ReportSchema])
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).order_by(Report.date.desc()).all()
    return reports
