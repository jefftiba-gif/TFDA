import { PageHeader } from "../components/ui";
import ChecklistBoard from "../components/ChecklistBoard";
import { CONSENT_CHECKLIST } from "../data/model";

export default function ConsentChecklist() {
  return (
    <div>
      <PageHeader title="同意書查檢表" subtitle="受試者同意書（ICF）版本、揭露事項與本院適用資訊查檢" />
      <ChecklistBoard initialSections={CONSENT_CHECKLIST} caseLabel="案件：IRB-2026-004 · 臺北榮民總醫院 IRB" />
    </div>
  );
}
