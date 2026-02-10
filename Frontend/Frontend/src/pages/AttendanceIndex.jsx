import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEmployees } from "../Global/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { Calendar, UserPlus, Users } from "lucide-react";

function AttendanceIndex() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchEmployees();
        setEmployees(res.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Calendar className="text-indigo-600" /> Attendance Management
        </h2>
        <p className="text-slate-500 mt-1">Select an employee to view their attendance history</p>
      </div>

      {employees.length === 0 ? (
        <EmptyState
          message="No employees found. Please add an employee first to manage attendance."
          icon={Users}
          action={
            <Link
              to="/employees/add"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <UserPlus size={18} />
              Add First Employee
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {employees.map((emp) => (
            <Link
              key={emp.employee_id}
              to={`/attendance/${emp.employee_id}`}
              className="bg-white p-5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group flex items-center justify-between no-underline"
            >
              <div>
                <span className="block text-slate-800 font-semibold group-hover:text-indigo-600 transition-colors">
                  {emp.full_name}
                </span>
                <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md mt-1 inline-block">
                  {emp.employee_id}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                →
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default AttendanceIndex;
