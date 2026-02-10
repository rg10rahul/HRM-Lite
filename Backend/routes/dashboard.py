from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from controllers import dashboard_controller

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/")
def get_dashboard_stats(db: Session = Depends(get_db)):
    return dashboard_controller.get_dashboard_data(db)
