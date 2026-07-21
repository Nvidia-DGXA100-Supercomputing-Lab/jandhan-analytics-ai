from typing import Optional
from .rag import get_context_for_query, generate_response
from .prompt import get_question_prompt


class SimpleLLM:
    def __init__(self):
        self.model_name = "simple-rag-v1"
        self.is_initialized = True

    def generate(self, query: str, context: Optional[str] = None) -> str:
        result = generate_response(query, context)
        return result["content"]

    def generate_with_prompt(self, prompt: str) -> str:
        return f"Response to: {prompt[:100]}..."

    def chat(self, messages: list) -> str:
        last_message = messages[-1]["content"] if messages else ""
        return self.generate(last_message)


_llm = SimpleLLM()


def get_llm():
    return _llm


def generate_chat_response(query: str, context: Optional[str] = None) -> str:
    llm = get_llm()
    return llm.generate(query, context)
