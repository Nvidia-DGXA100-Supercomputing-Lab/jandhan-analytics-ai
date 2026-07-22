from app.services.gemini import gemini_client

def get_ai_response(message: str, context: str = "") -> Dict:
    if gemini_client.is_configured():
        return gemini_client.chat(message, context)
    return {
        "content": f"AI assistant is not configured. Please set GEMINI_API_KEY in environment variables.",
        "enabled": False,
    }

def generate_insight(data_summary: str, question: str) -> str:
    prompt = f"""You are analyzing government spending data.

Data Summary:
{data_summary}

Question: {question}

Provide a brief analysis:"""
    response = get_ai_response(prompt)
    return response.get("content", "Unable to generate insight.")
