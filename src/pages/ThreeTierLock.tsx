import { Lock } from "lucide-react";
import { PageHeader, Card, InfoBanner } from "../components/ui";
import { RBAC_MATRIX, THREE_TIER_LOCK_NOTE } from "../data/model";

export default function ThreeTierLock() {
  return (
    <div>
      <PageHeader title="三層鎖定機制" subtitle="RBAC ROLE MATRIX — 全平台權限邊界矩陣" />
      <InfoBanner>
        <Lock size={16} className="mt-0.5 shrink-0 text-slate-400" />
        {THREE_TIER_LOCK_NOTE}
      </InfoBanner>

      <Card>
        <div className="space-y-3">
          {RBAC_MATRIX.map((r) => (
            <div key={r.role} className="flex items-center gap-4">
              <div className="w-32 shrink-0 text-sm font-medium text-slate-700">{r.role}</div>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${100 - (r.level - 1) * 20}%` }}
                />
              </div>
              <div className="w-56 shrink-0 text-right text-sm text-slate-500">{r.scope}</div>
              <Lock size={14} className="shrink-0 text-slate-300" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
