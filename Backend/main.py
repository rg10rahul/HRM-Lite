import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from database import engine, Base
from routes import employee, attendance, dashboard

load_dotenv()
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router)
app.include_router(attendance.router)
app.include_router(dashboard.router)


@app.get("/")
def root():
    return {"message": "HRMS Lite API is running"}


if __name__ == "__main__":
    port = int(os.getenv("APP_PORT", 8000))
    uvicorn.run("main:app", port=port, reload=True)
