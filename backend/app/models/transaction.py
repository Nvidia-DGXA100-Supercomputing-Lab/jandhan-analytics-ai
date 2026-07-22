from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean
from sqlalchemy.sql import func
from app.database.session import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    scheme = Column(String, nullable=False)
    department = Column(String, nullable=False)
    state = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, nullable=False)
    date = Column(String, nullable=False)
    recipient_name = Column(String)
    recipient_account = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
