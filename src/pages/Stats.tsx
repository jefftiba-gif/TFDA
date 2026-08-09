import { BarChart3 } from "lucide-react";
import { PageHeader, Card, InfoBanner } from "../components/ui";
import { useRole } from "../context/RoleContext";
import { roleByKey, HOSPITAL_STATS, MONTHLY_TREND, STATS_SUMMARY } from "../data/model";

function RateBar({ value }: { value: number }) {
  const color = value >= 90 ? "#22c55e" : value >= 80 ? "#eab308" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-medium" style={{ color }}>{value}%</span>
    </div>
  );
}

const ROLE_FRAMING: Record<string, string> = {
  tfda: "全平台 15 家醫院審查效能總覽，供監管與稽核使用。",
  cde: "依 c-IRB 輪序指派結果彙整之各醫院處理量能與時效，作為輪序調整參考。",
  sysadmin: "平台整體使用量與效能指標，供系統維運與容量規劃參考。",
};

export default function Stats() {
  const { role } = useRole();
  const info = roleByKey(role);
  const maxV = Math.max(...MONTHLY_TREND.map((m) => m.submitted));

  return (
    <div>
      <PageHeader title="統計報表" subtitle={`平台整體審查效能分析（2026 年度）· 目前檢視角色：${info.label}`} />
      {ROLE_FRAMING[role] && (
        <InfoBanner>
          <BarChart3 size={16} className="mt-0.5 shrink-0 text-slate-400" />
          {ROLE_FRAMING[role]}
        </InfoBanner>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <div className="text-sm text-slate-500">總案件數</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{STATS_SUMMARY.totalCases}</div>
          <div className="text-xs text-slate-400">2026 年度</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">核准率</div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">{STATS_SUMMARY.approvalRate.toFixed(1)}%</div>
          <div className="text-xs text-slate-400">核准／總提交</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">平均審查天數</div>
          <div className="mt-2 text-2xl font-bold text-indigo-600">{STATS_SUMMARY.avgDays} 天</div>
          <div className="text-xs text-slate-400">工作天</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">準時完成率</div>
          <div className="mt-2 text-2xl font-bold text-amber-600">{STATS_SUMMARY.onTimeRate.toFixed(1)}%</div>
          <div className="text-xs text-slate-400">在期限內完成</div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="mb-4 text-sm font-semibold text-slate-700">月度案件趨勢</div>
        <div className="flex items-end gap-4" style={{ height: 180 }}>
          {MONTHLY_TREND.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full items-end justify-center gap-1" style={{ height: 140 }}>
                <div
                  className="w-3 rounded-t bg-slate-800"
                  style={{ height: `${(m.submitted / maxV) * 130}px` }}
                  title={`提交 ${m.submitted}`}
                />
                <div
                  className="w-3 rounded-t bg-emerald-500"
                  style={{ height: `${(m.approved / maxV) * 130}px` }}
                  title={`核准 ${m.approved}`}
                />
                <div
                  className="w-3 rounded-t bg-red-400"
                  style={{ height: `${(m.rejected / maxV) * 130}px` }}
                  title={`退件 ${m.rejected}`}
                />
              </div>
              <div className="text-xs text-slate-500">{m.month}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-5 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-800" />提交</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" />核准</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-400" />退件</span>
        </div>
      </Card>

      <Card className="mt-6 !p-0 overflow-hidden">
        <div className="px-5 pt-5 text-sm font-semibold text-slate-700">醫院處理時效與核准率明細</div>
        <div className="overflow-x-auto">
          <table className="mt-3 w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                <th className="px-5 py-3 font-medium">醫院</th>
                <th className="px-5 py-3 font-medium">地區</th>
                <th className="px-5 py-3 font-medium">案件數</th>
                <th className="px-5 py-3 font-medium">平均天數</th>
                <th className="px-5 py-3 font-medium">準時率（10天）</th>
                <th className="px-5 py-3 font-medium">核准率</th>
                <th className="px-5 py-3 font-medium">審查方式</th>
              </tr>
            </thead>
            <tbody>
              {HOSPITAL_STATS.map((h) => (
                <tr key={h.hospital} className="border-b border-slate-100 last:border-0">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{h.hospital}</td>
                  <td className="px-5 py-3.5 text-slate-500">{h.region}</td>
                  <td className="px-5 py-3.5 text-slate-600">{h.cases}</td>
                  <td className="px-5 py-3.5 text-slate-600">{h.avgDays}</td>
                  <td className="px-5 py-3.5"><RateBar value={h.onTimeRate} /></td>
                  <td className="px-5 py-3.5 font-medium text-emerald-600">{h.approvalRate}%</td>
                  <td className="px-5 py-3.5 text-slate-500">{h.reviewMode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
