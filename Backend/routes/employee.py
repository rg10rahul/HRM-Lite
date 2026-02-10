from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import EmployeeCreate, EmployeeResponse
from controllers import employee_controller

router = APIRouter(prefix="/api/employees", tags=["Employees"])


@router.post("/", response_model=EmployeeResponse, status_code=201)
def add_employee(data: EmployeeCreate, db: Session = Depends(get_db)):
    return employee_controller.create_employee(data, db)


@router.get("/", response_model=list[EmployeeResponse])
def get_all_employees(db: Session = Depends(get_db)):
    return employee_controller.get_all_employees(db)


@router.delete("/{employee_id}", status_code=200)
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    return employee_controller.remove_employee(employee_id, db)
