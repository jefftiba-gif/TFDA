import { Database, ArrowRightLeft } from "lucide-react";
import { PageHeader, Card, InfoBanner } from "../components/ui";
import { ROTATION_STEPS, MOCK_CASES } from "../data/model";

export default function CirbIntegration() {
  return (
    <div>
      <PageHeader title="c-IRB 整合" subtitle="CDE c-IRB 系統 — 案件登錄、輪序指派邏輯、佇儲清單與時效管控" />
      <InfoBanner>
        <Database size={16} className="mt-0.5 shrink-0 text-slate-400" />
        CDE 為輪序指派邏輯之審查核心：案件登錄後依 8 家主審醫院輪序，於每日固定梯次自動完成指派並回寫 c-IRB 系統。
      </InfoBanner>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {ROTATION_STEPS.map((r) => (
          <Card key={r.time} className="text-center">
            <div className="text-2xl font-bold text-purple-600">{r.time}</div>
            <div className="mt-1 text-xs text-slate-500">{r.label}</div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ArrowRightLeft size={15} className="text-slate-400" />
          c-IRB 案件登錄／佇儲清單
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-400">
                <th className="pb-2 pr-4 font-medium">案號</th>
                <th className="pb-2 pr-4 font-medium">c-IRB 登錄狀態</th>
                <th className="pb-2 font-medium">最後同步時間</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CASES.map((c, i) => (
                <tr key={c.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs text-slate-500">{c.id}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      已登錄並同步
                    </span>
                  </td>
                  <td className="py-3 text-slate-400">{2 + i * 3} 分鐘前</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
