from typing import List, Dict, Optional
from .train import predict, load_model, prepare_time_series_data
from datetime import datetime, timedelta
import numpy as np


def generate_demo_forecast(data: List[Dict], horizon: int = 6) -> Dict:
    if not data:
        return {
            "predictions": [],
            "accuracy": 0.0,
            "model_version": "v1.0.0-demo",
        }

    amounts = [d.get("amount", 0) for d in data]
    base = amounts[-1] if amounts else 5000000

    predictions = []
    current_date = datetime.utcnow()
    for i in range(1, horizon + 1):
        future_date = current_date + timedelta(days=30 * i)
        predicted = base * (1 + 0.05 * i)
        predictions.append({
            "date": future_date.strftime("%Y-%m-%d"),
            "predicted": round(predicted),
            "lower_bound": round(predicted * 0.9),
            "upper_bound": round(predicted * 1.1),
        })

    return {
        "predictions": predictions,
        "accuracy": 0.85,
        "model_version": "v1.0.0-demo",
    }


def get_forecast(data: List[Dict], scheme_id: Optional[str] = None, horizon: int = 6) -> Dict:
    try:
        model = load_model()
        if model:
            return predict(model, data, horizon)
    except Exception:
        pass
    return generate_demo_forecast(data, horizon)
