import { PageHeader, Card, StatusBadge } from "../components/ui";
import { MOCK_CASES } from "../data/model";
import { ChevronRight } from "lucide-react";

export default function Cases() {
  return (
    <div>
      <PageHeader title="案件管理" subtitle="所有送審案件之集中查詢與管理" />
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
              <th className="px-5 py-3 font-medium">案號</th>
              <th className="px-5 py-3 font-medium">試驗名稱</th>
              <th className="px-5 py-3 font-medium">醫院</th>
              <th className="px-5 py-3 font-medium">狀態</th>
              <th className="px-5 py-3 font-medium">剩餘天數</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CASES.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-5 py-4 font-mono text-xs text-slate-500">{c.id}</td>
                <td className="max-w-md truncate px-5 py-4 font-medium text-slate-800">{c.title}</td>
                <td className="px-5 py-4 text-slate-500">{c.hospital}</td>
                <td className="px-5 py-4">
                  <StatusBadge statusKey={c.status} />
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {c.daysLeft >= 0 ? `剩 ${c.daysLeft} 天` : `逾期 ${-c.daysLeft} 天`}
                </td>
                <td className="px-5 py-4 text-right">
                  <ChevronRight size={16} className="inline text-slate-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
