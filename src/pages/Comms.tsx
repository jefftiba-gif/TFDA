import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { PageHeader, Card } from "../components/ui";
import { MOCK_CASES } from "../data/model";

const THREAD = [
  { from: "陳怡君（廠商）", time: "08-05 14:20", text: "已依審查意見補件完成，同意書 v2.1 已上傳，請主審IRB確認。" },
  { from: "王建國（主審IRB）", time: "08-06 09:10", text: "收到，將於本週內完成複審。" },
  { from: "系統通知", time: "08-06 09:10", text: "案件 IRB-2026-004 狀態更新為「補件已回覆」。" },
];

export default function Comms() {
  const [active, setActive] = useState(MOCK_CASES[2].id);
  const [draft, setDraft] = useState("");

  return (
    <div>
      <PageHeader title="通訊中心" subtitle="跨角色案件討論串 — 廠商／主審IRB／副審IRB／TFDA 訊息往來" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="!p-0 overflow-hidden md:col-span-1">
          {MOCK_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`block w-full border-b border-slate-100 px-4 py-3 text-left last:border-0 ${
                active === c.id ? "bg-emerald-50" : "hover:bg-slate-50"
              }`}
            >
              <div className="font-mono text-xs text-slate-400">{c.id}</div>
              <div className="truncate text-sm font-medium text-slate-700">{c.title}</div>
            </button>
          ))}
        </Card>

        <Card className="flex flex-col md:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MessageSquare size={15} className="text-slate-400" />
            {active} 討論串
          </div>
          <div className="flex-1 space-y-3">
            {THREAD.map((m, i) => (
              <div key={i} className="rounded-lg bg-slate-50 px-3 py-2.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-600">{m.from}</span>
                  <span>{m.time}</span>
                </div>
                <p className="mt-1 text-sm text-slate-700">{m.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="輸入訊息…"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
            <button
              onClick={() => setDraft("")}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              <Send size={14} />
              送出
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
