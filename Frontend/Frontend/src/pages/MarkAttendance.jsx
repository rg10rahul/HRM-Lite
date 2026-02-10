import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { markAttendance, fetchEmployees } from "../Global/api";
import { ClipboardCheck, CheckCircle, UserPlus, Users } from "lucide-react";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

function MarkAttendance() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_id: employeeId || "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
  }, [employeeId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.employee_id || !formData.date || !formData.status) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      await markAttendance(formData);
      setSuccess("Attendance marked successfully!");

      setTimeout(() => {
        navigate(employeeId ? `/attendance/${formData.employee_id}` : "/attendance");
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.detail || "Failed to mark attendance";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 bg-gray-50 transition-colors focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-[3px] focus:ring-indigo-600/10";

  if (loading) return <Loader />;

  if (employees.length === 0) {
    return (
      <div className="max-w-[600px] mx-auto mt-10">
        <EmptyState 
          message="No employees found. Please add an employee first to mark attendance." 
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
      </div>
    );
  }

  return (
    <div className="max-w-[500px] mx-auto bg-white p-8 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 mt-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <ClipboardCheck className="text-indigo-600" /> Mark Attendance
        </h2>
        <p className="text-slate-500 text-sm mt-1">Recording data for {employeeId || "an employee"}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-5 border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm mb-5 border border-green-200">
            {success}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="employee_id" className="block mb-1.5 text-[13px] font-semibold text-slate-700">Employee</label>
          {employeeId ? (
            <input type="text" id="employee_id" value={employeeId} readOnly className={`${inputClass} !bg-slate-100 !text-slate-500 cursor-not-allowed`} />
          ) : (
            <select id="employee_id" name="employee_id" value={formData.employee_id} onChange={handleChange} className={inputClass}>
              <option value="">-- Select Employee --</option>
              {employees.map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.employee_id} – {emp.full_name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block mb-1.5 text-[13px] font-semibold text-slate-700">Date</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} />
        </div>

        <div className="mb-6">
          <label htmlFor="status" className="block mb-1.5 text-[13px] font-semibold text-slate-700">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} className={inputClass}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(employeeId ? `/attendance/${employeeId}` : "/employees")}
            className="flex-1 bg-white text-slate-600 border border-slate-200 py-2.5 rounded-lg font-semibold hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg focus:ring-4 focus:ring-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {submitting ? (
              "Saving..." 
            ) : (
              "Submit Attendance"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MarkAttendance;
