import { Cpu, KeyRound, ShieldCheck, ScrollText, Eye, UserCheck, Gavel } from "lucide-react";
import { PageHeader, Card } from "../components/ui";
import { SECURITY_SECTIONS } from "../data/model";

const ICONS: Record<string, typeof Cpu> = {
  auth: KeyRound,
  encryption: ShieldCheck,
  audit: ScrollText,
  access: Eye,
  privacy: UserCheck,
  compliance: Gavel,
};

export default function TechArch() {
  return (
    <div>
      <PageHeader title="技術架構說明" subtitle="身分驗證、資料加密、稽核軌跡、存取控制、隱私保護與法規合規範疇" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SECURITY_SECTIONS.map((s) => {
          const Icon = ICONS[s.key] ?? Cpu;
          return (
            <Card key={s.key}>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Icon size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{s.title}</div>
                  <div className="text-xs text-slate-400">{s.titleZh}</div>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                    {it}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
