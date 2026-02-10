import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck, ClipboardCheck } from "lucide-react";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 text-sm font-medium border-l-[4px] transition-all duration-200 ${
      isActive
        ? "bg-indigo-50 text-indigo-700 border-indigo-600 shadow-sm"
        : "text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-900 hover:border-slate-200"
    }`;

  return (
    <aside className="fixed top-[60px] left-0 w-[240px] h-[calc(100vh-60px)] bg-white border-r border-slate-200 py-6 overflow-y-auto z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <ul className="space-y-1">
        <li>
          <NavLink to="/" end className={linkClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/employees" className={linkClass}>
            <Users size={20} />
            Employees
          </NavLink>
        </li>
        <li>
          <NavLink to="/attendance" className={linkClass}>
            <CalendarCheck size={20} />
            Attendance
          </NavLink>
        </li>
        <li>
          <NavLink to="/mark-attendance" className={linkClass}>
            <ClipboardCheck size={20} />
            Mark Attendance
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
