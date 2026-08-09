import { NavLink } from "react-router-dom";
import { Shield } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { roleByKey } from "../data/model";
import { NAV_BY_ROLE } from "../data/nav";

export default function Sidebar() {
  const { role } = useRole();
  const info = roleByKey(role);
  const items = NAV_BY_ROLE[role];

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col bg-[#0b1526] text-slate-300">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <Shield size={18} />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">TFDA IRB</div>
          <div className="text-[11px] text-slate-400">多中心審查暨送審平台</div>
        </div>
      </div>

      <div className="mx-3 mt-3 mb-1 flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: info.color }}
        >
          {info.userName.slice(0, 1)}
        </div>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-sm font-medium text-white">{info.userName}</div>
          <div className="truncate text-[11px] text-slate-400">{info.label}</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {items.map((item) => (
          <NavLink
            key={item.key}
            data-testid={`nav-${item.key}`}
            to={item.path}
            className={({ isActive }) =>
              `mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <item.icon size={16} className="shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-3 text-[11px] text-slate-500">
        系統版本 v2.0 · 系統運行中
      </div>
    </aside>
  );
}
