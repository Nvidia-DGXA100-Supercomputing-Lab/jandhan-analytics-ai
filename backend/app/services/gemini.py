from typing import Optional, Dict, List
import requests
import os
from app.core.config import settings


class GeminiClient:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
        self.enabled = bool(self.api_key)

    def _call_gemini(self, prompt: str, context: Optional[str] = None) -> Dict:
        if not self.enabled:
            return {
                "content": "AI assistant is not configured. Please set GEMINI_API_KEY in environment variables.",
                "enabled": False,
            }

        if context:
            full_prompt = f"Context:\n{context}\n\nUser Question: {prompt}\n\nAnswer:"
        else:
            full_prompt = prompt

        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": full_prompt}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 1024,
            }
        }

        try:
            response = requests.post(
                f"{self.base_url}?key={self.api_key}",
                headers={"Content-Type": "application/json"},
                json=payload,
                timeout=30,
            )
            response.raise_for_status()
            data = response.json()

            content = ""
            if "candidates" in data and data["candidates"]:
                candidate = data["candidates"][0]
                if "content" in candidate and "parts" in candidate["content"]:
                    content = candidate["content"]["parts"][0].get("text", "")

            return {
                "content": content or "I couldn't generate a response. Please try again.",
                "enabled": True,
            }
        except Exception as e:
            return {
                "content": f"Error calling AI service: {str(e)}",
                "enabled": True,
                "error": str(e),
            }

    def chat(self, message: str, context: Optional[str] = None) -> Dict:
        return self._call_gemini(message, context)

    def is_configured(self) -> bool:
        return self.enabled


gemini_client = GeminiClient()
