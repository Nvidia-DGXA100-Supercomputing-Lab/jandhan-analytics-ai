from typing import List, Dict, Optional
from ai_engine.forecasting.predict import get_forecast

def get_forecast_prediction(data: List[Dict], scheme_id: Optional[str] = None, horizon: int = 6) -> Dict:
    return get_forecast(data, scheme_id=scheme_id, horizon=horizon)
