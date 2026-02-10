from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import date
from typing import Optional
from models import Employee, Attendance
from schemas import AttendanceCreate, AttendanceSummary


def create_attendance(data: AttendanceCreate, db: Session):
    employee = db.query(Employee).filter(Employee.employee_id == data.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail=f"Employee '{data.employee_id}' not found")
    existing = db.query(Attendance).filter(
        Attendance.employee_id == data.employee_id,
        Attendance.date == data.date
    ).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail=f"Attendance already marked for '{data.employee_id}' on {data.date}"
        )

    record = Attendance(
        employee_id=data.employee_id,
        date=data.date,
        status=data.status,
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return record


def get_attendance_records(employee_id: str, start_date: Optional[date], end_date: Optional[date], db: Session):
    employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail=f"Employee '{employee_id}' not found")

    query = db.query(Attendance).filter(Attendance.employee_id == employee_id)

    if start_date:
        query = query.filter(Attendance.date >= start_date)
    if end_date:
        query = query.filter(Attendance.date <= end_date)

    records = query.order_by(Attendance.date.desc()).all()
    return records


def get_summary(employee_id: str, db: Session):
    employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail=f"Employee '{employee_id}' not found")

    records = db.query(Attendance).filter(Attendance.employee_id == employee_id).all()

    present = sum(1 for r in records if r.status == "Present")
    absent = sum(1 for r in records if r.status == "Absent")

    return AttendanceSummary(
        employee_id=employee_id,
        total_days=len(records),
        present_days=present,
        absent_days=absent,
    )
