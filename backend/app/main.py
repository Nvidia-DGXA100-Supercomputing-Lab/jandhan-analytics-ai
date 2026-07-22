import sys
from pathlib import Path
from time import time
sys.path.append(str(Path(__file__).resolve().parent.parent.parent))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.database.session import engine, get_db
from app.models import user, transaction, scheme, report
from app.api import auth, dashboard, analytics, transactions, chatbot, forecasting, reports, schemes, admin, anomaly, report_generation, upload
from app.database.seed import seed_database

user.Base.metadata.create_all(bind=engine)
transaction.Base.metadata.create_all(bind=engine)
scheme.Base.metadata.create_all(bind=engine)
report.Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time()
    response = await call_next(request)
    process_time = time() - start
    response.headers["X-Process-Time"] = str(process_time)
    return response

app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["dashboard"])
app.include_router(analytics.router, prefix=f"{settings.API_V1_STR}/analytics", tags=["analytics"])
app.include_router(transactions.router, prefix=f"{settings.API_V1_STR}/transactions", tags=["transactions"])
app.include_router(chatbot.router, prefix=f"{settings.API_V1_STR}/chatbot", tags=["chatbot"])
app.include_router(forecasting.router, prefix=f"{settings.API_V1_STR}/forecasting", tags=["forecasting"])
app.include_router(reports.router, prefix=f"{settings.API_V1_STR}/reports", tags=["reports"])
app.include_router(schemes.router, prefix=f"{settings.API_V1_STR}/schemes", tags=["schemes"])
app.include_router(admin.router, prefix=f"{settings.API_V1_STR}/admin", tags=["admin"])
app.include_router(anomaly.router, prefix=f"{settings.API_V1_STR}/anomaly", tags=["anomaly"])
app.include_router(report_generation.router, prefix=f"{settings.API_V1_STR}/reports/generate", tags=["report-generation"])
app.include_router(upload.router, prefix=f"{settings.API_V1_STR}/upload", tags=["upload"])

@app.on_event("startup")
def startup_event():
    db = next(get_db())
    try:
        seed_database(db)
    finally:
        db.close()

@app.get("/")
def health_check():
    return {"status": "ok", "message": "JanDhan Analytics AI API is running"}

@app.get("/health")
def health_check_detailed():
    return {
        "status": "healthy",
        "service": "JanDhan Analytics AI",
        "version": settings.VERSION,
        "database": "PostgreSQL" if not settings.DATABASE_URL.startswith("sqlite") else "SQLite",
    }