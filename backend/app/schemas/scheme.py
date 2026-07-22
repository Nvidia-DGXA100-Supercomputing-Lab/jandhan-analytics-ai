from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SchemeBase(BaseModel):
    name: str
    department: str
    budget: float
    beneficiaries: int
    description: Optional[str] = None
    status: Optional[str] = "active"
    category: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    spent: Optional[float] = 0.0

class SchemeCreate(SchemeBase):
    pass

class Scheme(SchemeBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ReportBase(BaseModel):
    name: str
    type: str
    date: str
    size: str
    url: Optional[str] = None
    status: Optional[str] = "completed"

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
