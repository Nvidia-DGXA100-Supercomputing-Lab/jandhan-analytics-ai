from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from app.database.session import get_db
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate, Transaction as TransactionSchema

router = APIRouter()

@router.post("/", response_model=TransactionSchema)
def create_transaction(transaction_data: TransactionCreate, db: Session = Depends(get_db)):
    transaction = Transaction(**transaction_data.dict())
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction

@router.get("/", response_model=list[TransactionSchema])
def get_transactions(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    department: Optional[str] = None,
    status: Optional[str] = None,
    scheme: Optional[str] = None,
):
    query = db.query(Transaction)
    if department:
        query = query.filter(Transaction.department == department)
    if status:
        query = query.filter(Transaction.status == status)
    if scheme:
        query = query.filter(Transaction.scheme == scheme)
    transactions = query.order_by(Transaction.date.desc()).offset(skip).limit(limit).all()
    return transactions

@router.get("/{transaction_id}", response_model=TransactionSchema)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found",
        )
    return transaction

@router.put("/{transaction_id}", response_model=TransactionSchema)
def update_transaction(
    transaction_id: int,
    transaction_data: TransactionCreate,
    db: Session = Depends(get_db),
):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found",
        )
    transaction.scheme = transaction_data.scheme
    transaction.department = transaction_data.department
    transaction.amount = transaction_data.amount
    transaction.status = transaction_data.status
    transaction.date = transaction_data.date
    db.commit()
    db.refresh(transaction)
    return transaction

@router.delete("/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found",
        )
    db.delete(transaction)
    db.commit()
    return {"message": "Transaction deleted successfully"}