import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="flex pt-[60px]">
        <Sidebar />
        <main className="ml-[220px] flex-1 p-7 min-h-[calc(100vh-60px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
