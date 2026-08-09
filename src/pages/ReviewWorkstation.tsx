import { MonitorCheck } from "lucide-react";
import { PageHeader, Card, PriorityBadge, EmptyState } from "../components/ui";
import { REVIEW_TASKS, REVIEW_STAGE_ORDER } from "../data/model";

export default function ReviewWorkstation() {
  return (
    <div>
      <PageHeader title="審查工作站" subtitle="依審查階段分組之任務看板" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {REVIEW_STAGE_ORDER.map((stage) => {
          const tasks = REVIEW_TASKS.filter((t) => t.stage === stage);
          return (
            <div key={stage}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <MonitorCheck size={14} className="text-slate-400" />
                  {stage}
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{tasks.length}</span>
              </div>
              <div className="space-y-3">
                {tasks.length === 0 && (
                  <Card>
                    <EmptyState label="無待處理案件" />
                  </Card>
                )}
                {tasks.map((t) => (
                  <Card key={t.caseId}>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono">{t.caseId}</span>
                      <PriorityBadge priority={t.priority} />
                    </div>
                    <div className="mt-1.5 line-clamp-3 text-sm font-medium text-slate-800">{t.title}</div>
                    <div className="mt-2 text-xs text-slate-400">期限 {t.dueDate}</div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
