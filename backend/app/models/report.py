from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.database.session import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    date = Column(String, nullable=False)
    size = Column(String, nullable=False)
    url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
