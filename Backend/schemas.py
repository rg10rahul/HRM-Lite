from pydantic import BaseModel, field_validator
from datetime import date, datetime
from typing import Optional


class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: str
    department: str

    @field_validator("employee_id", "full_name", "department")
    @classmethod
    def not_empty(cls, value, info):
        if not value.strip():
            raise ValueError(f"{info.field_name} cannot be empty")
        return value.strip()

    @field_validator("email")
    @classmethod
    def valid_email(cls, value):
        value = value.strip()
        if "@" not in value or "." not in value.split("@")[-1]:
            raise ValueError("Please enter a valid email address")
        return value


class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: str
    department: str
    created_at: datetime

    class Config:
        from_attributes = True


class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str

    @field_validator("status")
    @classmethod
    def valid_status(cls, value):
        allowed = ["Present", "Absent"]
        if value not in allowed:
            raise ValueError(f"Status must be one of {allowed}")
        return value


class AttendanceResponse(BaseModel):
    id: int
    employee_id: str
    date: date
    status: str

    class Config:
        from_attributes = True


class AttendanceSummary(BaseModel):
    employee_id: str
    total_days: int
    present_days: int
    absent_days: int
