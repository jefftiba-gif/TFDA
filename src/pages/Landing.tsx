import { useNavigate } from "react-router-dom";
import { Shield, FileText, CheckCircle2, Globe, Activity, Lock, Zap } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { ROLES, PLATFORM_STATS } from "../data/model";

const ICONS: Record<string, typeof FileText> = {
  file: FileText,
  users: Globe,
  activity: Activity,
  check: CheckCircle2,
};

const ROLE_ICONS: Record<string, typeof FileText> = {
  sponsor: FileText,
  primary: Shield,
  secondary: CheckCircle2,
  tfda: Globe,
  cde: Activity,
  sysadmin: Lock,
};

export default function Landing() {
  const { setRole } = useRole();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b1526] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
            <Shield size={20} />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">TFDA IRB 多中心審查暨送審平台</div>
            <div className="text-xs text-slate-400">Taiwan FDA IRB Multi-center Review Platform</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full border border-white/20 px-3 py-1 text-slate-300">系統版本 v2.0</span>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            系統運行中
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-10 pt-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
          <Zap size={14} />
          國家級多中心 IRB 審查協作平台
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
          TFDA IRB 多中心審查
          <br />
          <span className="text-emerald-400">暨送審平台</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          整合 c-IRB 系統，提供廠商、主審 IRB、副審 IRB、TFDA 及 CDE 的統一協作平台。
          支援完整的多中心臨床試驗倫理審查流程，確保審查品質與時效。
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-4">
          {PLATFORM_STATS.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <div key={s.label}>
                <div className="flex items-center justify-center gap-1.5 text-slate-400">
                  <Icon size={14} />
                  <span className="text-xs">{s.label}</span>
                </div>
                <div className="mt-1 text-2xl font-bold">{s.value}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <p className="mb-4 text-center text-sm text-slate-400">請選擇您的角色登入</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {ROLES.map((r) => {
            const Icon = ROLE_ICONS[r.key];
            return (
              <button
                key={r.key}
                data-testid={`role-card-${r.key}`}
                onClick={() => {
                  setRole(r.key);
                  navigate("/app/dashboard");
                }}
                className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center transition-colors hover:border-emerald-500/40 hover:bg-white/[0.06]"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: r.color }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <div className="font-medium text-white">{r.label}</div>
                  <div className="mt-1 text-[11px] leading-snug text-slate-400">{r.org}</div>
                </div>
                <div className="text-[11px] text-slate-500">{r.accounts}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
