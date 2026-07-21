from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None

class ChatMessage(BaseModel):
    id: str
    role: str
    content: str
    timestamp: str
    sources: Optional[List[dict]] = None

class ChatResponse(BaseModel):
    id: str
    role: str
    content: str
    timestamp: str
    sources: Optional[List[dict]] = None

@router.get("/history/", response_model=List[ChatMessage])
def get_chat_history():
    return []

@router.post("/chat/", response_model=ChatResponse)
def chat(request: ChatRequest):
    response_text = f"You said: {request.message}. This is a demo response from the AI assistant."
    return ChatResponse(
        id=f"msg-{int(datetime.utcnow().timestamp())}",
        role="assistant",
        content=response_text,
        timestamp=datetime.utcnow().isoformat(),
    )
