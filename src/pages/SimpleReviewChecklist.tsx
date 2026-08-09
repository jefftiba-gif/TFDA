import { useState } from "react";
import { PageHeader, Card, Tabs } from "../components/ui";
import ChecklistBoard from "../components/ChecklistBoard";
import { SIMPLE_REVIEW_CHECKLIST } from "../data/model";

const TABS = [
  { key: "checklist", label: "查檢表" },
  { key: "mismatch", label: "主副審不一致情境" },
  { key: "legal", label: "簡審法規依據" },
];

function MismatchTab() {
  return (
    <Card>
      <div className="mb-3 text-sm font-semibold text-slate-700">主副審意見不一致情境示範</div>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="rounded-lg bg-slate-50 px-3 py-2.5">
          主審 IRB 判定通過，副審 IRB 簡易審查認定本院受試者同意書需修改 → 僅要求廠商修改自家醫院文件，無需回主審 IRB 重新審查。
        </li>
        <li className="rounded-lg bg-slate-50 px-3 py-2.5">
          副審 IRB 簡易審查認為案件應不通過 → 簡審不得逕行不通過，須轉一般審查提報委員全會決議。
        </li>
        <li className="rounded-lg bg-slate-50 px-3 py-2.5">
          主審與副審對同一份文件之審查標準不一致 → 依「各 IRB 各自對自家醫院負責、無強制仲裁機制」原則，由廠商居中協調。
        </li>
      </ul>
    </Card>
  );
}

function LegalTab() {
  return (
    <Card>
      <div className="mb-3 text-sm font-semibold text-slate-700">簡審法規依據</div>
      <ul className="space-y-2 text-sm text-slate-600">
        <li>• 人體研究法</li>
        <li>• 醫療法</li>
        <li>• 醫事法規相關規定（TFDA 法規）</li>
        <li>• c-IRB 平台簡易審查（僑核式審查）範圍界定：僅限自家醫院受試者同意書及相關行政倫理事項。</li>
      </ul>
    </Card>
  );
}

export default function SimpleReviewChecklist() {
  const [tab, setTab] = useState("checklist");
  return (
    <div>
      <PageHeader
        title="簡易審查查檢表"
        subtitle="§2.2 審查重點注意事項檢核表 · 簡易審查範圍核對表 · 主副審意見不一致情境示範"
      />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === "checklist" && (
        <ChecklistBoard initialSections={SIMPLE_REVIEW_CHECKLIST} caseLabel="案件：IRB-2026-007 · 三軍總醫院 IRB" />
      )}
      {tab === "mismatch" && <MismatchTab />}
      {tab === "legal" && <LegalTab />}
    </div>
  );
}
