import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, RefreshCw, ChevronDown, Home } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { ROLES, roleByKey, NOTIFICATIONS_COUNT } from "../data/model";

export default function Header({ title }: { title: string }) {
  const { role, setRole } = useRole();
  const info = roleByKey(role);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          title="回首頁"
        >
          <Home size={15} />
          回首頁
        </Link>
        <span className="h-5 w-px bg-slate-200" />
        <span className="text-base font-semibold text-slate-800">
          TFDA IRB 多中心審查暨送審平台
        </span>
        <span className="rounded-full border border-slate-300 px-2.5 py-0.5 text-xs text-slate-500">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw size={14} />
            切換角色
            <ChevronDown size={14} />
          </button>
          {open && (
            <div className="absolute right-0 z-20 mt-2 w-64 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  onClick={() => {
                    setRole(r.key);
                    setOpen(false);
                    navigate("/app/dashboard");
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm hover:bg-slate-50 ${
                    role === r.key ? "bg-slate-50" : ""
                  }`}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                  <span className="flex-1 truncate">{r.label}</span>
                  {role === r.key && <span className="text-xs text-emerald-600">目前</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100">
          <Bell size={18} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {NOTIFICATIONS_COUNT}
          </span>
        </button>

        <div className="flex items-center gap-2.5 border-l border-slate-200 pl-4">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: info.color }}
          >
            {info.userName.slice(0, 1)}
          </div>
          <div className="leading-tight">
            <div className="text-sm font-medium text-slate-800">{info.userName}</div>
            <div className="text-[11px] text-slate-500">{info.org}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
