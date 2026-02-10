# HRMS Lite

A lightweight Human Resource Management System for managing employees and tracking attendance.

## Project Overview

HRMS Lite is a clean, efficient tool designed for small organizations to manage their workforce. It focuses on simplicity and speed, allowing admins to:
1.  **Manage Employees**: Add, view, and remove team members.
2.  **Track Attendance**: Mark daily attendance (Present/Absent).
3.  **Analyze Data**: View summary statistics and filter records by date.

## Tech Stack

This project uses a modern, industry-standard stack:

- **Frontend**: React + Vite (Fast, responsive UI)
- **Styling**: Tailwind CSS (Clean, modern design)
- **Backend**: FastAPI (Python) (High performance API)
- **Database**: MySQL (Reliable data storage)
- **ORM**: SQLAlchemy (Easy database interactions)

## System Architecture

The application works in three main parts:

1.  **React Frontend**: Provides the user interface for admins.
2.  **FastAPI Backend**: Handles all logic, validation, and data processing.
3.  **MySQL Database**: Stores employee records and attendance logs securely.

## How to Run Locally

Follow these steps to get the project running on your machine.

### 1. Database Setup
First, make sure you have MySQL installed and running.
```sql
CREATE DATABASE hrms_lite;
```

### 2. Backend Setup
Navigate to the `Backend` folder and set up the environment.

1.  **Create a Virtual Environment**:
    ```bash
    cd Backend
    python -m venv myenv
    ```

2.  **Activate the Environment**:
    - Windows: `myenv\Scripts\activate`
    - Mac/Linux: `source myenv/bin/activate`

3.  **Configure Environment Variables**:
    Create a `.env` file in `Backend/` with your credentials:
    ```ini
    DB_USER=root
    DB_PASSWORD=your_password
    DB_HOST=localhost
    DB_PORT=3306
    DB_NAME=hrms_lite
    APP_PORT=8000
    ```

4.  **Install Dependencies and Run**:
    ```bash
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```
    *The API will start at http://localhost:8000*

### 3. Frontend Setup
Open a new terminal and navigate to the frontend.

```bash
cd Frontend/Frontend
npm install
npm run dev
```
*The app will open at http://localhost:5173*

## Features Implemented

### Core Requirements
- **Employee Management**: Add new employees, valid email checks, prevent duplicates.
- **Attendance Tracking**: Mark present/absent for specific dates.
- **Data Persistence**: All data stored in MySQL database.
- **Validation**: Error handling for invalid inputs and server errors.

### Bonus Features & Polish
- **Dashboard**: Summary view of total employees and daily attendance.
- **Date Filtering**: Filter attendance history by date range.
- **Attendance Summary**: Counts of total Present/Absent days.
- **Empty States**: Helpful prompts when no data exists (e.g., "Add First Employee").
- **Professional UI**: Clean, responsive layout.

## Assumptions

- The app is designed for a single admin user
- Attendance is binary: "Present" or "Absent".
- "Employee ID" is manual entry (to allow organization-specific IDs like EMP001).

