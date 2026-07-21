SYSTEM_PROMPT = """You are a helpful assistant for the JanDhan Analytics AI platform. You help users understand government spending, schemes, budgets, and analytics data.

Guidelines:
- Answer questions concisely and accurately based on the provided context.
- If you don't know the answer or the context doesn't contain relevant information, say "I don't have enough information to answer that."
- Use simple language suitable for government officials and citizens.
- Include relevant numbers, percentages, or dates when available.
- Do not make up information. If unsure, suggest contacting the relevant department."""

QUESTION_PROMPT_TEMPLATE = """Context:
{context}

User Question: {question}

Answer:"""

ANALYSIS_PROMPT_TEMPLATE = """You are analyzing government spending data.

Data Summary:
{data_summary}

Question: {question}

Provide a brief analysis:"""

TRANSLATION_PROMPT_TEMPLATE = """Translate the following text to Hindi:

{text}

Translation:"""

SUMMARIZATION_PROMPT_TEMPLATE = """Summarize the following text in 2-3 sentences:

{text}

Summary:"""


def get_system_prompt() -> str:
    return SYSTEM_PROMPT


def get_question_prompt(context: str, question: str) -> str:
    return QUESTION_PROMPT_TEMPLATE.format(context=context, question=question)


def get_analysis_prompt(data_summary: str, question: str) -> str:
    return ANALYSIS_PROMPT_TEMPLATE.format(data_summary=data_summary, question=question)


def get_translation_prompt(text: str) -> str:
    return TRANSLATION_PROMPT_TEMPLATE.format(text=text)


def get_summarization_prompt(text: str) -> str:
    return SUMMARIZATION_PROMPT_TEMPLATE.format(text=text)
