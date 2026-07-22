from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TransactionBase(BaseModel):
    scheme: str
    department: str
    amount: float
    status: str
    date: str
    recipient_name: Optional[str] = None
    recipient_account: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class TransactionResponse(BaseModel):
    id: int
    scheme: str
    department: str
    amount: float
    status: str
    date: str
    recipient_name: Optional[str] = None
    recipient_account: Optional[str] = None
    created_at: datetime
