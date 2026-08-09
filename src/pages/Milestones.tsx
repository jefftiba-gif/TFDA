import { AlertTriangle } from "lucide-react";
import { PageHeader, Card } from "../components/ui";
import { MILESTONES } from "../data/model";

export default function Milestones() {
  return (
    <div>
      <PageHeader title="關鍵時程總表" subtitle="全流程各階段時效規則、負責角色與計時說明彙整" />
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
              <th className="px-5 py-3 font-medium">階段</th>
              <th className="px-5 py-3 font-medium">負責角色</th>
              <th className="px-5 py-3 font-medium">時效</th>
              <th className="px-5 py-3 font-medium">說明</th>
            </tr>
          </thead>
          <tbody>
            {MILESTONES.map((m) => (
              <tr key={m.stage} className="border-b border-slate-100 last:border-0">
                <td className="px-5 py-4 font-medium text-slate-800">{m.stage}</td>
                <td className="px-5 py-4 text-slate-500">{m.owner}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-600">
                    <AlertTriangle size={11} />
                    {m.duration}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-500">{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
