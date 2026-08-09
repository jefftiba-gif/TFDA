import { Clock, AlertTriangle } from "lucide-react";
import { PageHeader, Card, InfoBanner, StatusBadge } from "../components/ui";
import { MOCK_CASES } from "../data/model";

function DaysBar({ daysLeft, total }: { daysLeft: number; total: number }) {
  const pct = Math.max(0, Math.min(100, ((total - Math.max(daysLeft, 0)) / total) * 100));
  const overdue = daysLeft < 0;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full ${overdue ? "bg-red-500" : pct > 70 ? "bg-amber-400" : "bg-emerald-500"}`}
        style={{ width: `${overdue ? 100 : pct}%` }}
      />
    </div>
  );
}

export default function Timeliness() {
  const overdue = MOCK_CASES.filter((c) => c.daysLeft < 0);
  const nearDue = MOCK_CASES.filter((c) => c.daysLeft >= 0 && c.daysLeft <= 7);

  return (
    <div>
      <PageHeader title="時效監控" subtitle="時效監控儀表板 — 主審 20天／15天，副審 10天，逾期／即將逾期案件即時掌握" />
      <InfoBanner>
        <Clock size={16} className="mt-0.5 shrink-0 text-slate-400" />
        審查期間自完整送件翌日起算；發出補件通知時暫停計時，廠商回覆補件後恢復計時。
      </InfoBanner>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <div className="text-sm text-slate-500">逾期案件</div>
          <div className="mt-2 text-3xl font-bold text-red-500">{overdue.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">7 天內到期</div>
          <div className="mt-2 text-3xl font-bold text-amber-500">{nearDue.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">監控中案件總數</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{MOCK_CASES.length}</div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <AlertTriangle size={15} className="text-slate-400" />
          案件時效總覽（以 20 個工作天為基準）
        </div>
        <div className="space-y-4">
          {MOCK_CASES.map((c) => (
            <div key={c.id}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-mono text-xs text-slate-500">{c.id}</span>
                <div className="flex items-center gap-2">
                  <StatusBadge statusKey={c.status} />
                  <span className={c.daysLeft < 0 ? "font-medium text-red-500" : "text-slate-500"}>
                    {c.daysLeft >= 0 ? `剩 ${c.daysLeft} 天` : `逾期 ${-c.daysLeft} 天`}
                  </span>
                </div>
              </div>
              <DaysBar daysLeft={c.daysLeft} total={20} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
