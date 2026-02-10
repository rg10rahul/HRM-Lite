from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import date
from typing import Optional
from database import get_db
from schemas import AttendanceCreate, AttendanceResponse, AttendanceSummary
from controllers import attendance_controller

router = APIRouter(prefix="/api/attendance", tags=["Attendance"])


@router.post("/", response_model=AttendanceResponse, status_code=201)
def mark_attendance(data: AttendanceCreate, db: Session = Depends(get_db)):
    return attendance_controller.create_attendance(data, db)


@router.get("/{employee_id}", response_model=list[AttendanceResponse])
def get_attendance(
    employee_id: str,
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    db: Session = Depends(get_db),
):
    return attendance_controller.get_attendance_records(employee_id, start_date, end_date, db)


@router.get("/{employee_id}/summary", response_model=AttendanceSummary)
def get_attendance_summary(employee_id: str, db: Session = Depends(get_db)):
    return attendance_controller.get_summary(employee_id, db)
