import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEmployees, deleteEmployee } from "../Global/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import ConfirmModal from "../components/ConfirmModal";
import { Users, UserPlus, Eye, Trash2 } from "lucide-react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadEmployees = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetchEmployees();
      setEmployees(res.data);
    } catch (err) {
      setError("Could not load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteEmployee(deleteTarget.employee_id);
      setEmployees((prev) =>
        prev.filter((emp) => emp.employee_id !== deleteTarget.employee_id)
      );
      setDeleteTarget(null);
    } catch (err) {
      alert("Failed to delete employee");
      setDeleteTarget(null);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={loadEmployees} />;

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
            <Users className="text-indigo-600" /> Employees
          </h2>
          <p className="text-sm text-slate-500">Manage your team members</p>
        </div>
        <Link
          to="/employees/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2 text-sm"
        >
          <UserPlus size={18} />
          Add Employee
        </Link>
      </div>

      {employees.length === 0 ? (
        <EmptyState message="No employees added yet" icon={Users} />
      ) : (
        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.map((emp) => (
                  <tr key={emp.employee_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">{emp.employee_id}</td>
                    <td className="px-6 py-4 text-slate-600">{emp.full_name}</td>
                    <td className="px-6 py-4 text-slate-600">{emp.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {emp.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/attendance/${emp.employee_id}`}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="View Attendance"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(emp)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          title="Delete Employee"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          title="Delete Employee"
          message={`Are you sure you want to delete "${deleteTarget.full_name}" (${deleteTarget.employee_id})? This will also remove all their attendance records.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

export default EmployeeList;
