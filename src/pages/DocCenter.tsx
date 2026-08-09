import { FolderOpen, Download } from "lucide-react";
import { PageHeader, Card } from "../components/ui";
import { DOCUMENTS } from "../data/model";

export default function DocCenter() {
  return (
    <div>
      <PageHeader title="文件中心" subtitle="文件分類、版本控制、補件前後版本辨識、操作歷程" />
      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
              <th className="px-5 py-3 font-medium">文件名稱</th>
              <th className="px-5 py-3 font-medium">案號</th>
              <th className="px-5 py-3 font-medium">類型</th>
              <th className="px-5 py-3 font-medium">版本</th>
              <th className="px-5 py-3 font-medium">上傳者</th>
              <th className="px-5 py-3 font-medium">日期</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {DOCUMENTS.map((d) => (
              <tr key={d.name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="flex items-center gap-2 px-5 py-4 font-medium text-slate-800">
                  <FolderOpen size={14} className="shrink-0 text-slate-400" />
                  {d.name}
                </td>
                <td className="px-5 py-4 font-mono text-xs text-slate-500">{d.caseId}</td>
                <td className="px-5 py-4 text-slate-500">{d.type}</td>
                <td className="px-5 py-4">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{d.version}</span>
                </td>
                <td className="px-5 py-4 text-slate-500">{d.uploader}</td>
                <td className="px-5 py-4 text-slate-500">{d.date}</td>
                <td className="px-5 py-4 text-right">
                  <Download size={15} className="inline text-slate-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
