from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.services.gemini import gemini_client
from ai_engine.chatbot.rag import get_context_for_query

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
    context = request.context or get_context_for_query(request.message)
    
    if gemini_client.is_configured():
        result = gemini_client.chat(request.message, context)
        response_content = result.get("content", "Unable to generate response.")
    else:
        response_content = f"Demo response: {request.message}. Configure GEMINI_API_KEY for real AI responses."

    return ChatResponse(
        id=f"msg-{int(datetime.utcnow().timestamp())}",
        role="assistant",
        content=response_content,
        timestamp=datetime.utcnow().isoformat(),
        sources=[{"title": "RAG Context", "content": context}] if context else None,
    )
