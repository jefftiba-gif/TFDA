import { Activity, Check } from "lucide-react";
import { PageHeader, Card, InfoBanner } from "../components/ui";
import { CASE_STATES, TRACKING_CASE } from "../data/model";

export default function ProcessTracking() {
  const currentIndex = TRACKING_CASE.timeline.findIndex((t) => t.state === TRACKING_CASE.current);

  return (
    <div>
      <PageHeader title="流程追蹤" subtitle="單一案件全生命週期時間軸 — 跨廠商／主審／副審／系統之操作歷程" />
      <InfoBanner>
        <Activity size={16} className="mt-0.5 shrink-0 text-slate-400" />
        追蹤案件：<span className="font-mono">{TRACKING_CASE.id}</span> · {TRACKING_CASE.title}
      </InfoBanner>

      <Card>
        <div className="relative pl-6">
          <div className="absolute bottom-2 left-[9px] top-2 w-px bg-slate-200" />
          {TRACKING_CASE.timeline.map((t, i) => {
            const s = CASE_STATES.find((cs) => cs.key === t.state)!;
            const isPast = i < currentIndex;
            const isCurrent = i === currentIndex;
            return (
              <div key={i} className="relative mb-6 last:mb-0">
                <div
                  className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white"
                  style={{ borderColor: isPast || isCurrent ? s.color : "#e2e8f0" }}
                >
                  {isPast && <Check size={11} style={{ color: s.color }} />}
                  {isCurrent && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium" style={{ color: s.color }}>
                    {s.label}
                  </span>
                  <span className="text-xs text-slate-400">{t.date}</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500">{t.actor}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{t.note}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
