import { PageHeader, Card } from "../components/ui";
import { REVISION_REQUESTS } from "../data/model";

const STATUS_COLOR: Record<string, string> = {
  待回覆: "#f59e0b",
  已回覆: "#22c55e",
  逾期: "#ef4444",
};

export default function RevisionRequests() {
  return (
    <div>
      <PageHeader title="補件需求單" subtitle="補件通知、期限與回覆狀態集中管理" />
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
              <th className="px-5 py-3 font-medium">單號</th>
              <th className="px-5 py-3 font-medium">案號</th>
              <th className="px-5 py-3 font-medium">對象</th>
              <th className="px-5 py-3 font-medium">補件項目</th>
              <th className="px-5 py-3 font-medium">發出日期</th>
              <th className="px-5 py-3 font-medium">期限</th>
              <th className="px-5 py-3 font-medium">狀態</th>
            </tr>
          </thead>
          <tbody>
            {REVISION_REQUESTS.map((r) => {
              const color = STATUS_COLOR[r.status];
              return (
                <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">{r.id}</td>
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">{r.caseId}</td>
                  <td className="px-5 py-4 text-slate-600">{r.target}</td>
                  <td className="max-w-xs px-5 py-4 text-slate-700">{r.item}</td>
                  <td className="px-5 py-4 text-slate-500">{r.issuedDate}</td>
                  <td className="px-5 py-4 text-slate-500">{r.dueDate}</td>
                  <td className="px-5 py-4">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{ backgroundColor: `${color}1a`, color }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                      {r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
