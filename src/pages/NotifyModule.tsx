import { useState } from "react";
import { BellRing, Mail, Monitor, Zap } from "lucide-react";
import { PageHeader, Card, InfoBanner, Tabs } from "../components/ui";
import { NOTIFICATION_RECORDS, NOTIFY_TRIGGER_TABLE, NOTIFY_TRIGGER_TYPES } from "../data/model";

const TABS = [
  { key: "types", label: "觸發條件（6種）" },
  { key: "s76", label: "§7.6 儀表板行為" },
  { key: "log", label: "通知日誌" },
  { key: "settings", label: "通知設定" },
];

const TYPE_COLOR: Record<string, string> = {
  補件通知: "#f97316",
  審查完成: "#14b8a6",
  逾期提醒: "#ef4444",
  核准通知: "#22c55e",
  爭議協調: "#a855f7",
  指派通知: "#6366f1",
};

function TypesTab() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {NOTIFY_TRIGGER_TYPES.map((t) => {
        const color = TYPE_COLOR[t.type] ?? "#64748b";
        return (
          <Card key={t.type}>
            <div className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: `${color}1a`, color }}
              >
                <BellRing size={15} />
              </span>
              <span className="font-semibold text-slate-800">{t.type}</span>
            </div>
            <p className="mt-2.5 text-sm text-slate-600">{t.desc}</p>
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400">
              {t.channel.includes("電子郵件") && <Mail size={12} />}
              {t.channel.includes("系統內") && <Monitor size={12} />}
              {t.channel}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function S76Tab() {
  return (
    <>
      <InfoBanner>
        <Zap size={16} className="mt-0.5 shrink-0 text-slate-400" />
        §7.6 自動提醒整合邏輯 — 提醒模組內嵌於 TFDA 管理與追蹤模組的排程服務中。每個觸發條件不僅發送通知，同時觸發對應角色儀表板的即時狀態更新。
      </InfoBanner>
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">觸發條件（狀態流轉變）</th>
                <th className="px-4 py-3 font-medium">發送對象</th>
                <th className="px-4 py-3 font-medium">發送內容</th>
                <th className="px-4 py-3 font-medium">儀表板即時行為</th>
              </tr>
            </thead>
            <tbody>
              {NOTIFY_TRIGGER_TABLE.map((r) => (
                <tr key={r.no} className="border-b border-slate-100 last:border-0 align-top">
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-400">{r.no}</td>
                  <td className="px-4 py-3.5 font-medium text-slate-800">{r.trigger}</td>
                  <td className="px-4 py-3.5 text-slate-600">{r.target}</td>
                  <td className="px-4 py-3.5 text-slate-600">{r.content}</td>
                  <td className="px-4 py-3.5 text-slate-600">{r.dashboardBehavior}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function LogTab() {
  return (
    <div className="space-y-3">
      {NOTIFICATION_RECORDS.map((n) => {
        const color = TYPE_COLOR[n.type] ?? "#64748b";
        return (
          <Card key={n.id} className={`flex items-center justify-between gap-3 ${n.read ? "opacity-60" : ""}`}>
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${color}1a`, color }}
              >
                <BellRing size={16} />
              </span>
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                  <span style={{ color }}>{n.type}</span>
                  <span className="font-mono text-xs text-slate-400">{n.caseId}</span>
                </div>
                <div className="text-xs text-slate-500">{n.target}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                {n.channel.includes("電子郵件") && <Mail size={12} />}
                {n.channel.includes("系統內") && <Monitor size={12} />}
                {n.channel}
              </span>
              <span>{n.time}</span>
              {!n.read && <span className="h-2 w-2 rounded-full bg-red-500" />}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function ToggleRow({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3.5 last:border-0">
      <div>
        <div className="text-sm font-medium text-slate-700">{label}</div>
        <div className="text-xs text-slate-400">{desc}</div>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-emerald-500" : "bg-slate-200"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SettingsTab() {
  return (
    <Card>
      <ToggleRow label="電子郵件通知" desc="所有觸發條件同步發送電子郵件" defaultOn={true} />
      <ToggleRow label="系統內通知" desc="於儀表板通知鈴顯示即時提醒" defaultOn={true} />
      <ToggleRow label="逾期每日稽催" desc="案件逾期後，每日重複發送提醒直到處理完成" defaultOn={true} />
      <ToggleRow label="爭議協調通知 TFDA" desc="案件標記爭議處理中時，即時通知 TFDA 協調窗口" defaultOn={true} />
    </Card>
  );
}

export default function NotifyModule() {
  const [tab, setTab] = useState("types");
  return (
    <div>
      <PageHeader title="通知稽催模組" subtitle="§3.6 六種觸發條件 · 發送對象 · c-IRB 同步狀態 · 通知日誌" />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === "types" && <TypesTab />}
      {tab === "s76" && <S76Tab />}
      {tab === "log" && <LogTab />}
      {tab === "settings" && <SettingsTab />}
    </div>
  );
}
