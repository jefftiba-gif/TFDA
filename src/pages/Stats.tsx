import { BarChart3 } from "lucide-react";
import { PageHeader, Card, InfoBanner } from "../components/ui";
import { PLATFORM_STATS } from "../data/model";

const MONTHLY = [
  { month: "3月", cases: 86 },
  { month: "4月", cases: 102 },
  { month: "5月", cases: 94 },
  { month: "6月", cases: 118 },
  { month: "7月", cases: 131 },
  { month: "8月", cases: 76 },
];

const HOSPITAL_RANKING = [
  { hospital: "國立臺灣大學醫學院附設醫院", avgDays: 11.2, cases: 214 },
  { hospital: "臺北榮民總醫院", avgDays: 12.8, cases: 198 },
  { hospital: "中國醫藥大學附設醫院", avgDays: 13.5, cases: 176 },
  { hospital: "三軍總醫院", avgDays: 14.9, cases: 152 },
  { hospital: "高雄醫學大學附設醫院", avgDays: 16.3, cases: 140 },
];

export default function Stats() {
  const maxCases = Math.max(...MONTHLY.map((m) => m.cases));
  return (
    <div>
      <PageHeader title="統計報表" subtitle="統計分析儀表板 — 平均／最短／最長處理時間，月度／年度排名" />
      <InfoBanner>
        <BarChart3 size={16} className="mt-0.5 shrink-0 text-slate-400" />
        統計數據依 c-IRB 同步之案件審查完成紀錄自動彙整，每日更新。
      </InfoBanner>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {PLATFORM_STATS.map((s) => (
          <Card key={s.label}>
            <div className="text-sm text-slate-500">{s.label}</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <div className="text-sm text-slate-500">最短處理時間</div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">6.5 天</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">平均處理時間</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">14.2 天</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">最長處理時間</div>
          <div className="mt-2 text-2xl font-bold text-red-500">27.8 天</div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="mb-4 text-sm font-semibold text-slate-700">月度案件量</div>
        <div className="flex items-end gap-4" style={{ height: 160 }}>
          {MONTHLY.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-emerald-500/80"
                style={{ height: `${(m.cases / maxCases) * 120}px` }}
                title={`${m.cases} 件`}
              />
              <div className="text-xs text-slate-500">{m.month}</div>
              <div className="text-xs font-medium text-slate-700">{m.cases}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6">
        <div className="mb-3 text-sm font-semibold text-slate-700">醫院處理時效排名</div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs text-slate-400">
              <th className="pb-2 pr-4 font-medium">排名</th>
              <th className="pb-2 pr-4 font-medium">醫院</th>
              <th className="pb-2 pr-4 font-medium">平均審查天數</th>
              <th className="pb-2 font-medium">案件數</th>
            </tr>
          </thead>
          <tbody>
            {HOSPITAL_RANKING.map((h, i) => (
              <tr key={h.hospital} className="border-b border-slate-100 last:border-0">
                <td className="py-3 pr-4 font-mono text-xs text-slate-400">#{i + 1}</td>
                <td className="py-3 pr-4 font-medium text-slate-700">{h.hospital}</td>
                <td className="py-3 pr-4 text-slate-600">{h.avgDays} 天</td>
                <td className="py-3 text-slate-500">{h.cases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
