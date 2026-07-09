from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SchemeBase(BaseModel):
    name: str
    department: str
    budget: float
    beneficiaries: int
    description: Optional[str] = None

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

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
