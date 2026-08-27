// ---- HIS／CDSS 互動模擬 — 模擬資料與規則引擎 ----
// 本模組所有病患、藥品與交互作用資料皆為示意用之模擬資料（mock data），
// 非通過驗證之臨床決策依據，僅供平台整合能力展示。

export interface HisDrug {
  id: string;
  name: string;
  nameEn: string;
  category: "抗凝血／抗血小板" | "降血脂" | "抗生素" | "降血糖" | "止痛消炎" | "心血管用藥";
  allergyClass?: string; // e.g. "penicillin"
}

export const HIS_DRUGS: HisDrug[] = [
  { id: "warfarin", name: "華法林", nameEn: "Warfarin", category: "抗凝血／抗血小板" },
  { id: "aspirin", name: "阿斯匹靈", nameEn: "Aspirin", category: "抗凝血／抗血小板" },
  { id: "clopidogrel", name: "保栓通", nameEn: "Clopidogrel", category: "抗凝血／抗血小板" },
  { id: "simvastatin", name: "辛伐他汀", nameEn: "Simvastatin", category: "降血脂" },
  { id: "clarithromycin", name: "克拉黴素", nameEn: "Clarithromycin", category: "抗生素" },
  { id: "amoxicillin", name: "安莫西林", nameEn: "Amoxicillin", category: "抗生素", allergyClass: "penicillin" },
  { id: "metformin", name: "二甲雙胍", nameEn: "Metformin", category: "降血糖" },
  { id: "glimepiride", name: "瑪爾胰", nameEn: "Glimepiride", category: "降血糖" },
  { id: "ibuprofen", name: "布洛芬", nameEn: "Ibuprofen", category: "止痛消炎" },
  { id: "enalapril", name: "益壓寧", nameEn: "Enalapril", category: "心血管用藥" },
];

export const HIS_DRUG_CATEGORIES = Array.from(new Set(HIS_DRUGS.map((d) => d.category)));

export function findDrug(id: string): HisDrug | undefined {
  return HIS_DRUGS.find((d) => d.id === id);
}

export interface HisPatient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: "男" | "女";
  ward: string;
  bedNo: string;
  diagnosis: string;
  allergies: { class: string; label: string }[];
  currentMedIds: string[];
  renalImpairment?: { egfr: number; note: string };
}

export const HIS_PATIENTS: HisPatient[] = [
  {
    id: "p1",
    mrn: "A123456789",
    name: "王小明",
    age: 68,
    gender: "男",
    ward: "心臟內科門診",
    bedNo: "門診 3 診",
    diagnosis: "心房顫動 Atrial Fibrillation",
    allergies: [],
    currentMedIds: ["warfarin"],
  },
  {
    id: "p2",
    mrn: "B987654321",
    name: "陳美玲",
    age: 54,
    gender: "女",
    ward: "新陳代謝科門診",
    bedNo: "門診 5 診",
    diagnosis: "高血脂症 Hyperlipidemia",
    allergies: [{ class: "penicillin", label: "青黴素類 Penicillin（蕁麻疹）" }],
    currentMedIds: ["simvastatin"],
  },
  {
    id: "p3",
    mrn: "C112233445",
    name: "李大同",
    age: 75,
    gender: "男",
    ward: "腎臟內科病房",
    bedNo: "8A-12",
    diagnosis: "第二型糖尿病合併慢性腎臟病第三期 T2DM with CKD Stage 3",
    allergies: [],
    currentMedIds: ["metformin"],
    renalImpairment: { egfr: 38, note: "eGFR 38 mL/min/1.73m²（中度腎功能不全）" },
  },
];

export function findPatient(id: string): HisPatient | undefined {
  return HIS_PATIENTS.find((p) => p.id === id);
}

export type VerdictLevel = "safe" | "soft" | "hard";

export interface Verdict {
  level: VerdictLevel;
  title: string;
  msg: string;
  ruleRef?: string;
}

// 交互作用檢核引擎：綜合病患目前用藥、過敏史、腎功能與本次新增醫囑判斷風險等級
export function evaluateOrder(patient: HisPatient, newDrugIds: string[]): Verdict {
  const newDrugs = newDrugIds.map((id) => findDrug(id)).filter((d): d is HisDrug => !!d);
  const activeIds = new Set([...patient.currentMedIds, ...newDrugIds]);
  const has = (id: string) => activeIds.has(id);

  // 1. 過敏史檢查（最高優先）
  for (const d of newDrugs) {
    if (d.allergyClass && patient.allergies.some((a) => a.class === d.allergyClass)) {
      const allergy = patient.allergies.find((a) => a.class === d.allergyClass)!;
      return {
        level: "hard",
        title: "HARD STOP・藥物過敏禁忌",
        msg: `病患病歷載明對「${allergy.label}」過敏，本次開立之「${d.name} ${d.nameEn}」屬同類成分，有嚴重過敏反應風險。系統已阻擋送出，請更換藥品。`,
        ruleRef: "Allergy Cross-reactivity Check",
      };
    }
  }

  // 2. 抗凝血／抗血小板併用出血風險（Hard Stop）
  if (has("warfarin") && (has("aspirin") || has("clopidogrel") || has("ibuprofen"))) {
    const partner = has("aspirin") ? "阿斯匹靈 Aspirin" : has("clopidogrel") ? "保栓通 Clopidogrel" : "布洛芬 Ibuprofen（NSAID）";
    return {
      level: "hard",
      title: "HARD STOP・高風險",
      msg: `華法林併用${partner}會顯著提高出血風險（Major：抗凝血／抗血小板作用加乘）。系統已阻擋送出，請返回調整處方。`,
      ruleRef: "Medi-Span DDI・Severity: Major",
    };
  }

  // 3. Statin + Macrolide 橫紋肌溶解風險（Soft Stop）
  if (has("simvastatin") && has("clarithromycin")) {
    return {
      level: "soft",
      title: "SOFT STOP・中風險",
      msg: "克拉黴素抑制 CYP3A4 代謝，顯著提高辛伐他汀血中濃度，增加橫紋肌溶解症風險（Moderate）。請填寫覆核理由或調整處方後送出。",
      ruleRef: "Medi-Span DDI・Severity: Moderate",
    };
  }

  // 4. 腎功能不全併用 Metformin 乳酸中毒風險（Soft Stop）
  if (has("metformin") && patient.renalImpairment && patient.renalImpairment.egfr < 45) {
    return {
      level: "soft",
      title: "SOFT STOP・腎功能劑量提醒",
      msg: `病患${patient.renalImpairment.note}，Metformin 於中重度腎功能不全病患有乳酸中毒風險，建議劑量調整或改用其他降血糖藥物。請填寫覆核理由或調整處方後送出。`,
      ruleRef: "Renal Dose-Adjustment Alert",
    };
  }

  // 5. 同類藥物重複治療（Soft Stop）
  const categoryCounts = new Map<string, number>();
  for (const id of activeIds) {
    const d = findDrug(id);
    if (!d) continue;
    categoryCounts.set(d.category, (categoryCounts.get(d.category) ?? 0) + 1);
  }
  for (const [category, count] of categoryCounts) {
    if (count > 1 && (category === "降血脂" || category === "心血管用藥")) {
      return {
        level: "soft",
        title: "SOFT STOP・重複治療提醒",
        msg: `病患目前用藥與新增醫囑中偵測到 2 項以上「${category}」分類藥品，請確認是否為重複治療。請填寫覆核理由或調整處方後送出。`,
        ruleRef: "Duplicate Therapy Check",
      };
    }
  }

  return {
    level: "safe",
    title: "通過・低風險",
    msg: "未偵測到具臨床意義之藥品交互作用、過敏禁忌或重複治療。可直接送出簽章。",
    ruleRef: "Medi-Span DDI・No significant interaction",
  };
}

export interface HisOrderLogEntry {
  orderNo: string;
  patientId: string;
  patientName: string;
  drugNames: string[];
  verdict: Verdict;
  overrideReason?: string;
  signedAt: string;
  signedBy: string;
}
