from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.scheme import Scheme
from app.schemas.scheme import SchemeCreate, Scheme as SchemeSchema

router = APIRouter()

@router.post("/", response_model=SchemeSchema)
def create_scheme(scheme_data: SchemeCreate, db: Session = Depends(get_db)):
    existing_scheme = db.query(Scheme).filter(Scheme.name == scheme_data.name).first()
    if existing_scheme:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Scheme already exists",
        )
    scheme = Scheme(**scheme_data.dict())
    db.add(scheme)
    db.commit()
    db.refresh(scheme)
    return scheme

@router.get("/", response_model=list[SchemeSchema])
def get_schemes(db: Session = Depends(get_db)):
    schemes = db.query(Scheme).all()
    return schemes

@router.get("/{scheme_id}", response_model=SchemeSchema)
def get_scheme(scheme_id: int, db: Session = Depends(get_db)):
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scheme not found",
        )
    return scheme

@router.put("/{scheme_id}", response_model=SchemeSchema)
def update_scheme(
    scheme_id: int,
    scheme_data: SchemeCreate,
    db: Session = Depends(get_db),
):
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scheme not found",
        )
    scheme.name = scheme_data.name
    scheme.department = scheme_data.department
    scheme.budget = scheme_data.budget
    scheme.beneficiaries = scheme_data.beneficiaries
    scheme.description = scheme_data.description
    db.commit()
    db.refresh(scheme)
    return scheme

@router.delete("/{scheme_id}")
def delete_scheme(scheme_id: int, db: Session = Depends(get_db)):
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scheme not found",
        )
    db.delete(scheme)
    db.commit()
    return {"message": "Scheme deleted successfully"}