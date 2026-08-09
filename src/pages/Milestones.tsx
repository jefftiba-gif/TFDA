import { useState } from "react";
import { PageHeader, Card, Tabs } from "../components/ui";
import {
  FULL_MILESTONE_STEPS,
  MILESTONE_LEGEND,
  PLATFORM_POSITIONING,
  INTEGRATION_SYSTEMS,
  TIERS,
} from "../data/model";

const TABS = [
  { key: "steps", label: "時程總表" },
  { key: "positioning", label: "平台定位對比" },
  { key: "architecture", label: "系統架構" },
];

function StepsTab() {
  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
        {MILESTONE_LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
      <div className="space-y-3">
        {FULL_MILESTONE_STEPS.map((s) => (
          <Card key={s.no} className="flex items-center gap-4">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: s.phaseColor }}
            >
              {s.no}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-800">{s.label}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                  style={{ backgroundColor: `${s.phaseColor}1a`, color: s.phaseColor }}
                >
                  {s.phase}
                </span>
              </div>
            </div>
            <div className="hidden shrink-0 items-center gap-1.5 text-sm text-slate-500 md:flex">
              <span>{s.owner}</span>
            </div>
            <div className="hidden w-32 shrink-0 text-sm text-slate-500 lg:block">{s.duration}</div>
            <div className="hidden w-32 shrink-0 text-right text-xs text-slate-400 lg:block">{s.system}</div>
          </Card>
        ))}
      </div>
    </>
  );
}

function PositioningTab() {
  const FIT_COLOR: Record<string, string> = { 高: "#22c55e", 中: "#eab308", 規劃中: "#94a3b8" };
  return (
    <div className="space-y-3">
      {PLATFORM_POSITIONING.map((p) => (
        <Card key={p.title} className="flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-slate-800">{p.title}</div>
            <p className="mt-1 text-sm text-slate-600">{p.desc}</p>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: `${FIT_COLOR[p.fit]}1a`, color: FIT_COLOR[p.fit] }}
          >
            契合度：{p.fit}
          </span>
        </Card>
      ))}
    </div>
  );
}

function ArchitectureTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 text-sm font-semibold text-slate-700">三層級控制架構</div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {TIERS.map((t) => (
            <Card key={t.key} className="border-t-4" style={{ borderTopColor: t.color }}>
              <div className="font-semibold text-slate-800">{t.title}</div>
              <div className="text-xs text-slate-400">{t.scope}</div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3 text-sm font-semibold text-slate-700">外部系統整合</div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {INTEGRATION_SYSTEMS.map((s) => (
            <Card key={s.key}>
              <div className="font-semibold text-slate-800">{s.name}</div>
              <div className="text-xs text-slate-400">{s.nameEn}</div>
              <p className="mt-1.5 text-sm text-slate-600">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Milestones() {
  const [tab, setTab] = useState("steps");
  return (
    <div>
      <PageHeader title="關鍵時程總表" subtitle="臨床試驗 IRB 審查完整流程 · 16 個作業步驟（序號 0–15）· 平台定位對比" />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === "steps" && <StepsTab />}
      {tab === "positioning" && <PositioningTab />}
      {tab === "architecture" && <ArchitectureTab />}
    </div>
  );
}
