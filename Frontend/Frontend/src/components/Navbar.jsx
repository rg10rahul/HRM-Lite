import { ClipboardList } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 h-[60px] bg-slate-900 text-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-1.5 rounded-lg shadow-inner">
          <ClipboardList className="text-white" size={24} />
        </div>
        <h1 className="text-lg font-bold tracking-tight text-white">HRMS Lite</h1>
      </div>
      <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Admin Panel
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
