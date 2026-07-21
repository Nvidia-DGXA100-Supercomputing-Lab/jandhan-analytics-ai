from typing import List, Dict, Optional
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

KNOWLEDGE_BASE = [
    {
        "id": "kb1",
        "title": "PM Awas Yojana",
        "content": "PM Awas Yojana is a housing scheme launched by the Government of India to provide affordable housing to the urban poor. It aims to build 2 crore houses by 2022.",
        "department": "Housing",
        "keywords": ["housing", "awas", "yojana", "home", "house", "construction"],
    },
    {
        "id": "kb2",
        "title": "Ujjwala Yojana",
        "content": "Ujjwala Yojana is a scheme by the Ministry of Petroleum and Natural Gas to provide LPG connections to women from Below Poverty Line families. It has provided over 8 crore connections.",
        "department": "Energy",
        "keywords": ["gas", "lpg", "ujjwala", "connection", "cooking", "cylinder"],
    },
    {
        "id": "kb3",
        "title": "Ayushman Bharat",
        "content": "Ayushman Bharat is a national health protection scheme that provides coverage of Rs. 5 lakh per family per year for secondary and tertiary care hospitalization.",
        "department": "Health",
        "keywords": ["health", "hospital", "insurance", "ayushman", "medical", "treatment"],
    },
    {
        "id": "kb4",
        "title": "PM Kisan",
        "content": "PM Kisan is a central sector scheme with 100% funding from the Government of India. It provides income support of Rs. 6000 per year to farmer families in three equal installments.",
        "department": "Agriculture",
        "keywords": ["farmer", "kisan", "agriculture", "income", "installment", "crop"],
    },
    {
        "id": "kb5",
        "title": "Digital India",
        "content": "Digital India is a flagship programme of the Government of India with a vision to transform India into a digitally empowered society and knowledge economy.",
        "department": "Technology",
        "keywords": ["digital", "technology", "internet", "online", "computer", "network"],
    },
    {
        "id": "kb6",
        "title": "Swachh Bharat",
        "content": "Swachh Bharat Abhiyan is a national level campaign for the period 2014 to 2019 to clean up India's streets, roads, and infrastructure.",
        "department": "Sanitation",
        "keywords": ["clean", "sanitation", "toilet", "swachh", "bharat", "hygiene"],
    },
    {
        "id": "kb7",
        "title": "Make in India",
        "content": "Make in India is an initiative launched by the Government of India to encourage foreign direct investment in the manufacturing sector and to turn India into a global manufacturing hub.",
        "department": "Industry",
        "keywords": ["manufacturing", "industry", "make", "business", "factory", "investment"],
    },
    {
        "id": "kb8",
        "title": "Skill India",
        "content": "Skill India is a campaign launched by the Government of India to train over 40 crore people in India in different skills by 2022.",
        "department": "Education",
        "keywords": ["skill", "training", "education", "job", "employment", "course"],
    },
    {
        "id": "kb9",
        "title": "Budget Allocation",
        "content": "The total budget allocation for all schemes is monitored quarterly. Each department submits utilization certificates and expenditure reports.",
        "department": "Finance",
        "keywords": ["budget", "allocation", "expenditure", "fund", "money", "cost", "spending"],
    },
    {
        "id": "kb10",
        "title": "Transaction Monitoring",
        "content": "All transactions are monitored for anomalies using statistical methods. Unusual patterns, duplicate entries, and threshold breaches are flagged for review.",
        "department": "Audit",
        "keywords": ["transaction", "monitor", "anomaly", "audit", "fraud", "review", "flag"],
    },
]


class SimpleRAG:
    def __init__(self, knowledge_base: List[Dict]):
        self.knowledge_base = knowledge_base
        self.documents = [f"{item['title']}. {item['content']}" for item in knowledge_base]
        self.vectorizer = TfidfVectorizer(stop_words="english")
        self.tfidf_matrix = self.vectorizer.fit_transform(self.documents)

    def query(self, question: str, top_k: int = 3) -> List[Dict]:
        if not question.strip():
            return []

        query_vec = self.vectorizer.transform([question])
        similarities = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        top_indices = np.argsort(similarities)[-top_k:][::-1]

        results = []
        for idx in top_indices:
            if similarities[idx] > 0:
                results.append({
                    **self.knowledge_base[idx],
                    "score": float(similarities[idx]),
                })
        return results


_rag = SimpleRAG(KNOWLEDGE_BASE)


def get_context_for_query(query: str, top_k: int = 3) -> str:
    results = _rag.query(query, top_k=top_k)
    if not results:
        return "No relevant information found in the knowledge base."
    context_parts = []
    for r in results:
        context_parts.append(f"[{r['title']}] {r['content']}")
    return "\n\n".join(context_parts)


def build_prompt(query: str, context: Optional[str] = None) -> str:
    if context:
        prompt = f"""You are a helpful assistant for the JanDhan Analytics AI platform. Answer the user's question based on the provided context. If the context does not contain relevant information, say so.

Context:
{context}

User Question: {query}

Answer:"""
    else:
        prompt = f"""You are a helpful assistant for the JanDhan Analytics AI platform. Answer the user's question concisely and accurately.

User Question: {query}

Answer:"""
    return prompt


def generate_response(query: str, context: Optional[str] = None) -> Dict:
    context = context or get_context_for_query(query)
    prompt = build_prompt(query, context)
    response_text = f"Based on the available information:\n\n{context}\n\nFor more details, please refer to the relevant department or scheme documentation."
    return {
        "content": response_text,
        "context": context,
        "prompt": prompt,
    }
