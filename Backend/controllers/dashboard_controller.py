from sqlalchemy.orm import Session
from datetime import date
from models import Employee, Attendance


def get_dashboard_data(db: Session):
    total_employees = db.query(Employee).count()

    today = date.today()
    today_records = db.query(Attendance).filter(Attendance.date == today).all()

    present_today = sum(1 for r in today_records if r.status == "Present")
    absent_today = sum(1 for r in today_records if r.status == "Absent")

    return {
        "total_employees": total_employees,
        "present_today": present_today,
        "absent_today": absent_today,
        "total_marked_today": len(today_records),
    }
