import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRole } from "../context/RoleContext";
import { NAV_BY_ROLE } from "../data/nav";

export default function AppLayout() {
  const { role } = useRole();
  const location = useLocation();
  const current = NAV_BY_ROLE[role].find((n) => location.pathname.startsWith(n.path));

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={current?.label ?? ""} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
