from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.report import Report
from app.schemas.scheme import ReportCreate, Report as ReportSchema

router = APIRouter()

@router.post("/", response_model=ReportSchema)
def create_report(report_data: ReportCreate, db: Session = Depends(get_db)):
    report = Report(**report_data.dict())
    db.add(report)
    db.commit()
    db.refresh(report)
    return report

@router.get("/", response_model=list[ReportSchema])
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).order_by(Report.date.desc()).all()
    return reports

@router.get("/{report_id}", response_model=ReportSchema)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )
    return report

@router.delete("/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )
    db.delete(report)
    db.commit()
    return {"message": "Report deleted successfully"}