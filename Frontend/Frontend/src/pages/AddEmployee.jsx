import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../Global/api";
import ErrorMessage from "../components/ErrorMessage";
import { UserPlus, Save, ArrowLeft } from "lucide-react";

function AddEmployee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.employee_id.trim() || !formData.full_name.trim() ||
        !formData.email.trim() || !formData.department.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      await addEmployee(formData);
      navigate("/employees");
    } catch (err) {
      const msg = err.response?.data?.detail || "Failed to add employee";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 bg-gray-50 transition-colors focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-[3px] focus:ring-indigo-600/10";

  return (
    <div className="max-w-[520px] mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
           <UserPlus className="text-indigo-600" /> Add New Employee
        </h2>
        <p className="text-slate-500 mt-1">Enter the details of the new team member</p>
      </div>

      <form className="bg-white rounded-xl p-7 shadow-sm border border-slate-200" onSubmit={handleSubmit}>
        {error && (
          <div className="flex gap-3 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="employee_id" className="block mb-1.5 text-sm font-semibold text-slate-700">Employee ID</label>
            <input type="text" id="employee_id" name="employee_id" placeholder="e.g. EMP001" value={formData.employee_id} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label htmlFor="full_name" className="block mb-1.5 text-sm font-semibold text-slate-700">Full Name</label>
            <input type="text" id="full_name" name="full_name" placeholder="e.g. John Doe" value={formData.full_name} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1.5 text-sm font-semibold text-slate-700">Email Address</label>
            <input type="email" id="email" name="email" placeholder="e.g. john@company.com" value={formData.email} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label htmlFor="department" className="block mb-1.5 text-sm font-semibold text-slate-700">Department</label>
            <input type="text" id="department" name="department" placeholder="e.g. Engineering" value={formData.department} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div className="flex gap-4 pt-8">
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="flex-1 bg-white text-slate-600 border border-slate-200 py-2.5 rounded-lg font-semibold hover:bg-slate-50 hover:text-slate-800 transition-colors flex justify-center items-center gap-2"
          >
            <ArrowLeft size={18} /> Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-4 focus:ring-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Save size={18} /> Add Employee
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
