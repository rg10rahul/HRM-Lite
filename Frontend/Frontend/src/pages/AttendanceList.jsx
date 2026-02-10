import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAttendance, fetchAttendanceSummary } from "../Global/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import { Calendar, CheckCircle, XCircle, Search } from "lucide-react";

function AttendanceList() {
  const { employeeId } = useParams();

  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const loadData = async (start, end) => {
    setLoading(true);
    setError("");

    try {
      const [recordsRes, summaryRes] = await Promise.all([
        fetchAttendance(employeeId, start || null, end || null),
        fetchAttendanceSummary(employeeId),
      ]);
      setRecords(recordsRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      setError("Could not load attendance data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData("", "");
  }, [employeeId]);

  const handleFilter = (e) => {
    e.preventDefault();
    loadData(startDate, endDate);
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    loadData("", "");
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={() => loadData("", "")} />;

  return (
    <div className="max-w-[800px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
            <Calendar className="text-indigo-600" /> Attendance – {employeeId}
          </h2>
          <p className="text-slate-500 text-sm">Attendance history and statistics</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link
            to={`/attendance/${employeeId}/mark`}
            className="px-5 py-2.5 bg-indigo-600 text-white no-underline rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            + Mark Attendance
          </Link>
          <Link to="/employees" className="text-[13px] text-indigo-600 no-underline hover:underline">
            ← Back to Employees
          </Link>
        </div>
      </div>

      {summary && (
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-white rounded-lg p-4 text-center border border-slate-200 shadow-sm">
            <span className="block text-2xl font-bold text-slate-800">{summary.total_days}</span>
            <span className="text-xs text-slate-500">Total Days</span>
          </div>
          <div className="flex-1 bg-white rounded-lg p-4 text-center border-l-4 border-l-green-500 border border-slate-200 shadow-sm">
            <span className="block text-2xl font-bold text-slate-800">{summary.present_days}</span>
            <span className="text-xs text-slate-500">Present</span>
          </div>
          <div className="flex-1 bg-white rounded-lg p-4 text-center border-l-4 border-l-red-500 border border-slate-200 shadow-sm">
            <span className="block text-2xl font-bold text-slate-800">{summary.absent_days}</span>
            <span className="text-xs text-slate-500">Absent</span>
          </div>
        </div>
      )}


      <form className="flex items-end gap-3 mb-5 bg-white p-4 rounded-lg border border-slate-200" onSubmit={handleFilter}>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-[13px] focus:outline-none focus:border-indigo-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-[13px] focus:outline-none focus:border-indigo-600"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white border-none rounded-md text-[13px] cursor-pointer hover:bg-indigo-700 transition-colors">
          Filter
        </button>
        {(startDate || endDate) && (
          <button type="button" onClick={clearFilters} className="px-4 py-2 bg-slate-100 text-slate-600 border-none rounded-md text-[13px] cursor-pointer hover:bg-slate-200 transition-colors">
            Clear
          </button>
        )}
      </form>

      {records.length === 0 ? (
        <EmptyState message="No attendance records found" icon={Calendar} />
      ) : (
        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-800 font-medium">{record.date}</td>
                  <td className="px-6 py-4">
                    <span 
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        record.status === "Present" 
                          ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/20" 
                          : "bg-rose-100 text-rose-700 ring-1 ring-rose-600/20"
                      }`}
                    >
                      {record.status === "Present" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AttendanceList;
