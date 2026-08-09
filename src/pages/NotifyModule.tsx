import { BellRing, Mail, Monitor } from "lucide-react";
import { PageHeader, Card, InfoBanner } from "../components/ui";
import { NOTIFICATION_RECORDS } from "../data/model";

const TYPE_COLOR: Record<string, string> = {
  補件通知: "#f97316",
  審查完成: "#14b8a6",
  逾期提醒: "#ef4444",
  核准通知: "#22c55e",
  爭議協調: "#a855f7",
};

export default function NotifyModule() {
  return (
    <div>
      <PageHeader title="通知稽催模組" subtitle="通知引擎 — 電子郵件 + 系統內，補件要求／審查完成／逾期提醒" />
      <InfoBanner>
        <BellRing size={16} className="mt-0.5 shrink-0 text-slate-400" />
        逾期案件將自動觸發稽催通知，同步發送電子郵件並於系統內顯示提醒。
      </InfoBanner>

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
    </div>
  );
}
