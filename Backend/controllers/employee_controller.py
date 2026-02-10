from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import Employee
from schemas import EmployeeCreate


def create_employee(data: EmployeeCreate, db: Session):
    existing = db.query(Employee).filter(Employee.employee_id == data.employee_id).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Employee ID '{data.employee_id}' already exists")

    existing_email = db.query(Employee).filter(Employee.email == data.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail=f"Email '{data.email}' is already registered")

    new_employee = Employee(
        employee_id=data.employee_id,
        full_name=data.full_name,
        email=data.email,
        department=data.department,
    )
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


def get_all_employees(db: Session):
    employees = db.query(Employee).order_by(Employee.created_at.desc()).all()
    return employees


def remove_employee(employee_id: str, db: Session):
    employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()

    if not employee:
        raise HTTPException(status_code=404, detail=f"Employee '{employee_id}' not found")

    db.delete(employee)
    db.commit()

    return {"message": f"Employee '{employee_id}' deleted successfully"}
