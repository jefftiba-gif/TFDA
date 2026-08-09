import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Lock, Check } from "lucide-react";
import { PageHeader, Card, StatusBadge, Tabs } from "../components/ui";
import { MOCK_CASES, CASE_DETAILS, CASE_STATES } from "../data/model";

const TABS = [
  { key: "info", label: "案件資訊" },
  { key: "docs", label: "文件管理" },
  { key: "opinions", label: "審查意見" },
  { key: "secondary", label: "副審狀態" },
  { key: "timeline", label: "流程時間軸" },
  { key: "comms", label: "通訊記錄" },
  { key: "internal", label: "內部討論" },
];

function StageChips({ stages }: { stages: { key: string; label: string; status: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
      {stages.map((s, i) => (
        <div key={s.key} className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${
              s.status === "done"
                ? "bg-emerald-500 text-white"
                : s.status === "current"
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-400"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {s.status === "done" && <Check size={12} />}
            {s.label}
          </span>
          {i < stages.length - 1 && <span className="text-slate-300">›</span>}
        </div>
      ))}
    </div>
  );
}

export default function CaseDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState("info");
  const c = MOCK_CASES.find((x) => x.id === id);
  const d = id ? CASE_DETAILS[id] : undefined;

  if (!c || !d) {
    return (
      <div>
        <Link to="/app/cases" className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={14} /> 返回案件列表
        </Link>
        <Card>找不到案件 {id}</Card>
      </div>
    );
  }

  const s = CASE_STATES.find((cs) => cs.key === c.status)!;
  const pct = Math.round((d.daysUsed / d.daysTotal) * 100);

  return (
    <div>
      <Link to="/app/cases" className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={14} /> 返回案件列表
      </Link>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-600">{c.id}</span>
        <span className="rounded-md bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-400">c-IRB: {d.cIrbRef}</span>
      </div>
      <PageHeader title={c.title} />
      <div className="-mt-4 mb-6 flex flex-wrap items-center gap-2">
        <StatusBadge statusKey={c.status} />
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">{d.phase}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">{d.condition}</span>
      </div>

      <Card className="mb-6">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700">審查進度</span>
          <span className="text-slate-400">已用 {d.daysUsed} / {d.daysTotal} 工作天</span>
        </div>
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${pct > 100 ? "bg-red-500" : pct > 80 ? "bg-amber-400" : "bg-emerald-500"}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>

        <div className="mb-4 rounded-lg bg-slate-50 px-4 py-3">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label === "已核准" ? "審查時效" : `${s.owner}審查時效`}
            </span>
            <span className="font-medium" style={{ color: s.color }}>
              剩餘 {Math.max(d.daysTotal - d.daysUsed, 0)} / {d.daysTotal} 工作天
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: s.color }} />
          </div>
          <div className="mt-1 text-xs text-slate-400">已用 {d.daysUsed} 天</div>
        </div>

        <StageChips stages={d.stages} />
      </Card>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === "info" && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 mb-4 flex items-center gap-2">
          <Lock size={14} className="shrink-0" />
          唯讀模式 — 案件資料由系統自動流轉，審查委員不可修改。請至「審查意見」分頁輸入審查結果。
        </div>
      )}

      {tab === "info" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <div className="mb-3 text-sm font-semibold text-slate-700">試驗基本資料</div>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-slate-400">試驗藥物</dt><dd className="text-slate-700">{d.drug}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">適應症</dt><dd className="text-slate-700">{d.condition}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">試驗階段</dt><dd className="text-slate-700">{d.phase}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">主要研究者</dt><dd className="text-slate-700">{d.piName}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">試驗醫院</dt><dd className="text-slate-700">{c.hospital}</dd></div>
            </dl>
          </Card>
          <Card>
            <div className="mb-3 text-sm font-semibold text-slate-700">審查資訊</div>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-slate-400">主審 IRB</dt><dd className="text-slate-700">{c.hospital}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">c-IRB 編號</dt><dd className="font-mono text-xs text-slate-700">{d.cIrbRef}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">目前狀態</dt><dd><StatusBadge statusKey={c.status} /></dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">已用天數</dt><dd className="text-slate-700">{d.daysUsed} / {d.daysTotal} 工作天</dd></div>
            </dl>
          </Card>
        </div>
      )}

      {tab === "docs" && (
        <Card>
          <div className="mb-2 text-sm font-semibold text-slate-700">相關文件</div>
          <p className="text-sm text-slate-500">
            前往 <Link to="/app/docs" className="text-emerald-600 hover:underline">文件中心</Link> 可搜尋、上傳並管理本案所有版本文件。
          </p>
        </Card>
      )}

      {tab === "opinions" && (
        <div className="space-y-3">
          {d.reviewOpinions.length === 0 && <Card className="text-center text-sm text-slate-400">尚無審查意見</Card>}
          {d.reviewOpinions.map((o, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-slate-600">{o.author}</span>
                <span>{o.date}</span>
              </div>
              <p className="mt-1.5 text-sm text-slate-700">{o.content}</p>
            </Card>
          ))}
        </div>
      )}

      {tab === "secondary" && (
        <Card>
          {d.secondaryStatuses.length === 0 ? (
            <div className="text-center text-sm text-slate-400">尚未進入副審階段</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-400">
                  <th className="pb-2 pr-4 font-medium">副審醫院</th>
                  <th className="pb-2 pr-4 font-medium">狀態</th>
                  <th className="pb-2 font-medium">日期</th>
                </tr>
              </thead>
              <tbody>
                {d.secondaryStatuses.map((s2) => (
                  <tr key={s2.hospital} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 text-slate-700">{s2.hospital}</td>
                    <td className="py-3 pr-4 text-slate-600">{s2.status}</td>
                    <td className="py-3 text-slate-400">{s2.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      )}

      {tab === "timeline" && (
        <Card>
          <p className="text-sm text-slate-500">
            完整跨角色時間軸請見 <Link to="/app/tracking" className="text-emerald-600 hover:underline">流程追蹤</Link> 頁面。
          </p>
        </Card>
      )}

      {tab === "comms" && (
        <div className="space-y-3">
          {d.commLog.map((m, i) => (
            <Card key={i} className="flex items-center justify-between gap-3">
              <div>
                <span className="text-sm font-medium text-slate-700">{m.from}</span>
                <p className="text-sm text-slate-600">{m.text}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-400">{m.time}</span>
            </Card>
          ))}
        </div>
      )}

      {tab === "internal" && (
        <div>
          <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-400">
            <Lock size={12} />
            僅本院審查委員與承辦人可見，不對外揭露
          </div>
          <div className="space-y-3">
            {d.internalNotes.length === 0 && <Card className="text-center text-sm text-slate-400">尚無內部討論</Card>}
            {d.internalNotes.map((m, i) => (
              <Card key={i} className="flex items-center justify-between gap-3 bg-slate-50">
                <div>
                  <span className="text-sm font-medium text-slate-700">{m.from}</span>
                  <p className="text-sm text-slate-600">{m.text}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">{m.time}</span>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
