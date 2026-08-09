import { ClipboardList, ChevronRight } from "lucide-react";
import { PageHeader, Card, PriorityBadge } from "../components/ui";
import { REVIEW_TASKS, REVIEW_STAGE_ORDER } from "../data/model";

export default function ReviewOps() {
  return (
    <div>
      <PageHeader title="審查作業" subtitle="行政完整性審查 → 完整文件審查 → 補件判定 → 決議" />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-1">
          {REVIEW_STAGE_ORDER.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-600">
                {s}
              </div>
              {i < REVIEW_STAGE_ORDER.length - 1 && <ChevronRight size={16} className="text-slate-300" />}
            </div>
          ))}
        </div>
      </Card>

      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ClipboardList size={15} className="text-slate-400" />
        待處理審查任務
      </div>
      <div className="space-y-3">
        {REVIEW_TASKS.map((t) => (
          <Card key={t.caseId} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono">{t.caseId}</span>
                <PriorityBadge priority={t.priority} />
              </div>
              <div className="truncate text-sm font-medium text-slate-800">{t.title}</div>
              <div className="mt-1.5 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-indigo-600">{t.stage}</span>
                <span className="text-slate-400">期限 {t.dueDate}</span>
              </div>
            </div>
            <button className="shrink-0 rounded-lg border border-slate-200 px-3.5 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
              開始審查
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
