import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import AttendanceList from "./pages/AttendanceList";
import MarkAttendance from "./pages/MarkAttendance";
import AttendanceIndex from "./pages/AttendanceIndex";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          
          {/* Attendance index route (list employees to view attendance) */}
          <Route path="/attendance" element={<AttendanceIndex />} />
          
          {/* Specific attendance routes */}
          <Route path="/attendance/:employeeId" element={<AttendanceList />} />
          <Route path="/attendance/:employeeId/mark" element={<MarkAttendance />} />
          
          <Route path="/mark-attendance" element={<MarkAttendance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
