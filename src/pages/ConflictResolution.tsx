import { Scale, ArrowRight } from "lucide-react";
import { PageHeader, Card, InfoBanner } from "../components/ui";
import { CONFLICT_RESOLUTION } from "../data/model";

export default function ConflictResolution() {
  return (
    <div>
      <PageHeader title="衝突解決機制" subtitle={CONFLICT_RESOLUTION.banner} />
      <InfoBanner>
        <Scale size={16} className="mt-0.5 shrink-0 text-slate-400" />
        各 IRB 各自對自家醫院負責，平台無強制仲裁機制；協調未果之重大爭議由 TFDA 協調窗口升級處理。
      </InfoBanner>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CONFLICT_RESOLUTION.scenarios.map((s) => (
          <Card key={s.title} className="border-l-4 border-l-amber-400">
            <div className="font-semibold text-slate-800">{s.title}</div>
            <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="mb-4 text-sm font-semibold text-slate-700">升級處理流程</div>
        <div className="flex flex-wrap items-center gap-1">
          {CONFLICT_RESOLUTION.steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="max-w-[220px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                <span className="mr-1 font-mono text-slate-400">{i + 1}.</span>
                {s}
              </div>
              {i < CONFLICT_RESOLUTION.steps.length - 1 && (
                <ArrowRight size={14} className="shrink-0 text-slate-300" />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
