import type { ReactNode, CSSProperties } from "react";
import { CASE_STATES } from "../data/model";

export function PageHeader({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-2xl font-bold text-slate-900">
        {icon}
        {title}
      </div>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`} style={style}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon,
  valueClassName = "text-slate-900",
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  valueClassName?: string;
}) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          {icon}
          {label}
        </div>
        <div className={`mt-2 text-3xl font-bold ${valueClassName}`}>{value}</div>
      </div>
    </Card>
  );
}

export function StatusBadge({ statusKey }: { statusKey: string }) {
  const s = CASE_STATES.find((c) => c.key === statusKey);
  if (!s) return null;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: `${s.color}1a`, color: s.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {s.label}
    </span>
  );
}

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (k: string) => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-1 rounded-lg bg-slate-200/60 p-1">
      {tabs.map((t) => (
        <button
          key={t.key}
          data-testid={`tab-${t.key}`}
          onClick={() => onChange(t.key)}
          className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
            active === t.key
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function InfoBanner({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
      {children}
    </div>
  );
}

const INTEGRATION_STATUS_STYLE: Record<string, { label: string; color: string }> = {
  connected: { label: "已連線", color: "#22c55e" },
  syncing: { label: "同步中", color: "#eab308" },
  offline: { label: "離線", color: "#ef4444" },
};

export function IntegrationStatusPill({ status }: { status: string }) {
  const s = INTEGRATION_STATUS_STYLE[status] ?? INTEGRATION_STATUS_STYLE.connected;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: `${s.color}1a`, color: s.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {s.label}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = { 高: "#ef4444", 中: "#f59e0b", 低: "#64748b" };
  const color = map[priority] ?? "#64748b";
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{ backgroundColor: `${color}1a`, color }}
    >
      {priority}
    </span>
  );
}

export function EmptyState({ label }: { label: string }) {
  return <div className="py-10 text-center text-sm text-slate-400">{label}</div>;
}
