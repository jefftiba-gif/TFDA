import { useState } from "react";
import { Layers, GitBranch, ChevronRight, ShieldAlert } from "lucide-react";
import { PageHeader, Card, Tabs, InfoBanner } from "../components/ui";
import {
  CASE_STATES,
  CASE_STATE_FLOW,
  TIERS,
  ROTATION_STEPS,
  REVIEW_PATHS,
  AMENDMENT_RULES,
  SECTION_6_2,
} from "../data/model";

const TABS = [
  { key: "flow", label: "案件狀態流（9種）" },
  { key: "tiers", label: "三層級控制架構" },
  { key: "rotation", label: "輪序指派機制" },
  { key: "secondary", label: "副審審查方式" },
  { key: "amendment", label: "變更/撤案/結案" },
  { key: "s62", label: "§6.2 實現邏輯" },
];

function FlowTab() {
  const states = CASE_STATE_FLOW.map((k) => CASE_STATES.find((s) => s.key === k)!);
  return (
    <>
      <InfoBanner>
        <GitBranch size={16} className="mt-0.5 shrink-0 text-slate-400" />
        依據規格書 §3.2.1，本平台實作 9 種主要案件狀態（含副審一般審查中），完整覆蓋從草稿到結案的全生命週期。
      </InfoBanner>
      <Card className="mb-6">
        <div className="mb-4 text-sm font-semibold text-slate-700">主流程狀態轉換</div>
        <div className="flex flex-wrap items-center gap-1 overflow-x-auto pb-2">
          {states.map((s, i) => (
            <div key={s.key} className="flex items-center gap-1">
              <div
                className="flex min-w-[92px] flex-col items-center rounded-lg border px-3 py-2 text-center"
                style={{ borderColor: `${s.color}55`, backgroundColor: `${s.color}12` }}
              >
                <span className="text-sm font-medium" style={{ color: s.color }}>{s.label}</span>
                <span className="mt-0.5 text-[10px] text-slate-400">{s.owner}</span>
              </div>
              {i < states.length - 1 && <ChevronRight size={16} className="shrink-0 text-slate-300" />}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-4 text-sm font-semibold text-slate-700">狀態說明表</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-400">
                <th className="pb-2 pr-4 font-medium">狀態</th>
                <th className="pb-2 pr-4 font-medium">說明</th>
                <th className="pb-2 pr-4 font-medium">負責角色</th>
                <th className="pb-2 font-medium">觸發條件</th>
              </tr>
            </thead>
            <tbody>
              {CASE_STATES.map((s) => (
                <tr key={s.key} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: s.color }}>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                      {s.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{s.desc}</td>
                  <td className="py-3 pr-4 font-medium text-slate-700">{s.owner}</td>
                  <td className="py-3 text-slate-500">{s.trigger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function TiersTab() {
  return (
    <div className="space-y-4">
      {TIERS.map((t) => (
        <Card key={t.key} className="border-l-4" style={{ borderLeftColor: t.color }}>
          <div className="flex items-center gap-2">
            <Layers size={16} style={{ color: t.color }} />
            <span className="font-semibold text-slate-800">{t.title}</span>
            <span className="text-xs text-slate-400">{t.titleEn}</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">{t.scope}</div>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
            {t.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                {b}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

function RotationTab() {
  return (
    <>
      <InfoBanner>
        CDE 為輪序指派邏輯之審查核心，依 8 家主審醫院輪序，每日固定 4 個梯次執行案件登錄與指派作業。
      </InfoBanner>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {ROTATION_STEPS.map((r) => (
          <Card key={r.time} className="text-center">
            <div className="text-2xl font-bold text-purple-600">{r.time}</div>
            <div className="mt-1 text-xs text-slate-500">{r.label}</div>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <div className="mb-2 text-sm font-semibold text-slate-700">輪序指派規則</div>
        <ul className="space-y-1.5 text-sm text-slate-600">
          <li>• 8 家主審醫院依輪序機制循環指派新送件案件。</li>
          <li>• 案件登錄完成後，系統於下一個梯次時間自動執行指派。</li>
          <li>• 指派結果同步寫入 c-IRB 系統，並通知主審 IRB 承辦人。</li>
        </ul>
      </Card>
    </>
  );
}

function SecondaryTab() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="border-l-4 border-l-emerald-500">
        <div className="font-semibold text-emerald-700">{REVIEW_PATHS.principle.title}</div>
        <ol className="mt-3 space-y-2 text-sm text-slate-600">
          {REVIEW_PATHS.principle.steps.map((s, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono text-xs text-emerald-500">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ol>
      </Card>
      <Card className="border-l-4 border-l-orange-500">
        <div className="font-semibold text-orange-700">{REVIEW_PATHS.exception.title}</div>
        <ol className="mt-3 space-y-2 text-sm text-slate-600">
          {REVIEW_PATHS.exception.steps.map((s, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono text-xs text-orange-500">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ol>
      </Card>
      <Card className="lg:col-span-2 border-l-4 border-l-amber-400 bg-amber-50/50">
        <div className="flex items-center gap-2 font-semibold text-amber-700">
          <ShieldAlert size={16} /> KEY PRINCIPLE
        </div>
        <p className="mt-2 text-sm text-amber-800">
          各 IRB 各自對自家醫院負責，無強制仲裁機制，廠商居中協調。
        </p>
      </Card>
    </div>
  );
}

function AmendmentTab() {
  return (
    <Card>
      <div className="mb-3 text-sm font-semibold text-slate-700">變更 / 撤案 / 結案規則</div>
      <ul className="space-y-3 text-sm text-slate-600">
        {AMENDMENT_RULES.map((r, i) => (
          <li key={i} className="flex items-start gap-2.5 rounded-lg bg-slate-50 px-3 py-2.5">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            {r}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function S62Tab() {
  return (
    <div className="space-y-4">
      <InfoBanner>{SECTION_6_2.title}</InfoBanner>
      {SECTION_6_2.blocks.map((b) => (
        <Card key={b.key}>
          <div className="font-semibold text-slate-800">{b.title}</div>
          <p className="mt-1.5 text-sm text-slate-600">{b.desc}</p>
        </Card>
      ))}
    </div>
  );
}

export default function ProcessControl() {
  const [tab, setTab] = useState("flow");
  return (
    <div>
      <PageHeader
        title="流程控制架構"
        subtitle="案件狀態流、三層級控制架構、輪序指派機制、副審審查方式、變更/撤案/結案管理"
      />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === "flow" && <FlowTab />}
      {tab === "tiers" && <TiersTab />}
      {tab === "rotation" && <RotationTab />}
      {tab === "secondary" && <SecondaryTab />}
      {tab === "amendment" && <AmendmentTab />}
      {tab === "s62" && <S62Tab />}
    </div>
  );
}
