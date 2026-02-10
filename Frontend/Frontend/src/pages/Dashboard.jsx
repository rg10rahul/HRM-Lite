import { useState, useEffect } from "react";
import { fetchDashboardStats } from "../Global/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { Users, UserCheck, UserX, ClipboardList } from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetchDashboardStats();
      setStats(res.data);
    } catch (err) {
      setError("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={loadStats} />;

  const cards = [
    { 
      icon: <Users size={28} className="text-blue-600" />, 
      value: stats.total_employees, 
      label: "Total Employees", 
      bg: "bg-blue-50 border-blue-100" 
    },
    { 
      icon: <UserCheck size={28} className="text-emerald-600" />, 
      value: stats.present_today, 
      label: "Present Today", 
      bg: "bg-emerald-50 border-emerald-100" 
    },
    { 
      icon: <UserX size={28} className="text-rose-600" />, 
      value: stats.absent_today, 
      label: "Absent Today", 
      bg: "bg-rose-50 border-rose-100" 
    },
    { 
      icon: <ClipboardList size={28} className="text-purple-600" />, 
      value: stats.total_marked_today, 
      label: "Marked Today", 
      bg: "bg-purple-50 border-purple-100" 
    },
  ];

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h2>
        <p className="text-slate-500 mt-1">Key metrics for today's operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${card.bg}`}>
              {card.icon}
            </div>
            <div>
              <span className="block text-4xl font-extrabold text-slate-800 mb-1 tracking-tight group-hover:text-indigo-600 transition-colors">
                {card.value}
              </span>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
