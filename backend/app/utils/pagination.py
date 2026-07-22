from typing import TypeVar, Generic, List
from pydantic import BaseModel

T = TypeVar("T")

class PaginatedResponse(BaseModel, Generic[T]):
    results: List[T]
    count: int

def paginate(query, page: int = 1, limit: int = 100):
    total = query.count()
    offset = (page - 1) * limit
    items = query.offset(offset).limit(limit).all()
    return {"results": items, "count": total}
