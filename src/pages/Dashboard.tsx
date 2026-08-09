import { useMemo, useState } from "react";
import { AlertTriangle, FileText, Clock, CheckCircle2, TrendingUp, ChevronRight, ChevronLeft, Database, Activity } from "lucide-react";
import { PageHeader, Card, StatusBadge } from "../components/ui";
import { useRole } from "../context/RoleContext";
import { roleByKey, MOCK_CASES } from "../data/model";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

function MiniCalendar() {
  const [month] = useState(new Date(2026, 7, 1)); // 2026年八月
  const today = 8;
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const startWeekday = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const markedDays = new Set([9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 22, 25]);
  const cells = useMemo(() => {
    const arr: (number | null)[] = Array(startWeekday).fill(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [startWeekday, daysInMonth]);

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <ChevronLeft size={16} className="text-slate-400" />
        <span className="text-sm font-medium text-slate-700">2026 年 八月</span>
        <ChevronRight size={16} className="text-slate-400" />
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] text-slate-400">
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
        {cells.map((d, i) => (
          <div key={i} className="relative py-1">
            {d && (
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                  d === today ? "bg-emerald-500 text-white" : "text-slate-600"
                }`}
              >
                {d}
              </span>
            )}
            {d && markedDays.has(d) && d !== today && (
              <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-400" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const { role } = useRole();
  const info = roleByKey(role);
  const urgentCases = MOCK_CASES.filter((c) => c.urgentCount);
  const total = MOCK_CASES.length + 5;
  const inProgress = MOCK_CASES.filter((c) => !["approved"].includes(c.status)).length;
  const done = MOCK_CASES.filter((c) => c.status === "approved").length;

  return (
    <div>
      <PageHeader
        title="工作站儀表板"
        subtitle="§6.1 三大區塊：我的待辦（Now）・進行中/監控中（Ongoing）・歷史與歸檔（History）"
      />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-500">2026年8月8日 星期六 · 目前角色：{info.label}</div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-600">
            <Activity size={12} /> 系統正常
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">
            <Database size={12} /> c-IRB 已同步
          </span>
        </div>
      </div>

      {urgentCases.length > 0 && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={22} />
            <div>
              <div className="font-semibold text-red-700">{urgentCases.length} 件緊急案件</div>
              <div className="text-sm text-red-500">需要優先處理，請儘速審查</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm text-red-600">
              {urgentCases[0].id} — 逾期
            </span>
            <button className="rounded-md bg-red-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600">
              查看
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <div className="flex items-center gap-1.5 text-sm text-slate-500"><FileText size={14} /> 總案件</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{total}</div>
        </Card>
        <Card>
          <div className="flex items-center gap-1.5 text-sm text-slate-500"><Clock size={14} /> 進行中</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">{inProgress}</div>
        </Card>
        <Card>
          <div className="flex items-center gap-1.5 text-sm text-slate-500"><CheckCircle2 size={14} /> 已完成</div>
          <div className="mt-2 text-3xl font-bold text-emerald-600">{done}</div>
        </Card>
        <Card>
          <div className="flex items-center gap-1.5 text-sm text-slate-500"><TrendingUp size={14} /> 核准率</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">75%</div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 text-base font-semibold text-slate-800">工作清單</div>
          <div className="space-y-3">
            {MOCK_CASES.map((c) => (
              <Card key={c.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono">{c.id}</span>
                    {c.urgentCount ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                        {c.urgentCount}
                      </span>
                    ) : null}
                  </div>
                  <div className="truncate text-sm font-medium text-slate-800">{c.title}</div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <StatusBadge statusKey={c.status} />
                    <span className="text-xs text-slate-400">
                      {c.daysLeft >= 0 ? `剩 ${c.daysLeft} 天` : `逾期 ${-c.daysLeft} 天`}
                    </span>
                  </div>
                </div>
                <ChevronRight className="shrink-0 text-slate-300" size={18} />
              </Card>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <MiniCalendar />
          <Card>
            <div className="mb-2 text-sm font-semibold text-slate-700">角色說明</div>
            <p className="text-xs leading-relaxed text-slate-500">{info.description}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
