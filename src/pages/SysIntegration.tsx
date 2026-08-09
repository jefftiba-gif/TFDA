import { Link2, ShieldCheck } from "lucide-react";
import { PageHeader, Card, InfoBanner, IntegrationStatusPill } from "../components/ui";
import { INTEGRATION_SYSTEMS, LEGAL_BASIS } from "../data/model";

export default function SysIntegration() {
  return (
    <div>
      <PageHeader title="系統整合" subtitle="SYSTEM INTEGRATION — 平台與外部系統之連接介面總覽" />
      <InfoBanner>
        <Link2 size={16} className="mt-0.5 shrink-0 text-slate-400" />
        本平台透過 REST API 與下列 5 個外部系統／服務進行案件資料、文件與狀態同步，所有連線均採 TLS 加密傳輸。
      </InfoBanner>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {INTEGRATION_SYSTEMS.map((s) => (
          <Card key={s.key}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-800">{s.name}</div>
                <div className="text-xs text-slate-400">{s.nameEn}</div>
              </div>
              <IntegrationStatusPill status={s.status} />
            </div>
            <p className="mt-3 text-sm text-slate-600">{s.desc}</p>
            <div className="mt-3 border-t border-slate-100 pt-2 text-xs text-slate-400">
              最後同步：{s.lastSync}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-l-4 border-l-amber-400 bg-amber-50/40">
        <div className="flex items-center gap-2 font-semibold text-amber-700">
          <ShieldCheck size={16} />
          Legal Basis
        </div>
        <p className="mt-1.5 text-sm text-amber-800">{LEGAL_BASIS}</p>
      </Card>
    </div>
  );
}
