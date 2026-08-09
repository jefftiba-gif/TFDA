export type RoleKey =
  | "sponsor"
  | "primary"
  | "secondary"
  | "tfda"
  | "cde"
  | "sysadmin";

export interface RoleInfo {
  key: RoleKey;
  label: string;
  org: string;
  userName: string;
  color: string;
  accounts: string;
  description: string;
}

export const ROLES: RoleInfo[] = [
  {
    key: "sponsor",
    label: "試驗贊助者",
    org: "藥廠 / CRO / 研究機構",
    userName: "陳怡君",
    color: "#2563eb",
    accounts: "2 個帳號",
    description: "建立新案、上傳送審文件、接收審查意見並回覆補件。",
  },
  {
    key: "primary",
    label: "主審 IRB",
    org: "8 家主審醫院 IRB 委員/承辦人",
    userName: "王建國",
    color: "#059669",
    accounts: "2 個帳號",
    description: "受理案件、完整文件審查、決議通過/修正/不通過、通知副審 IRB。",
  },
  {
    key: "secondary",
    label: "副審 IRB",
    org: "各副審醫院 IRB 委員/承辦人",
    userName: "李美玲",
    color: "#0d9488",
    accounts: "2 個帳號",
    description: "接收主審結果，進行簡易審查或一般審查，僅對自家醫院負責。",
  },
  {
    key: "tfda",
    label: "TFDA 管理員",
    org: "衛生福利部食品藥物管理署",
    userName: "黃國棟",
    color: "#7c3aed",
    accounts: "1 個帳號",
    description: "案件受理行政審查、時效監控、統計分析、重大爭議協調窗口。",
  },
  {
    key: "cde",
    label: "CDE 協調員",
    org: "財團法人醫藥品查驗中心",
    userName: "林淑芬",
    color: "#db2777",
    accounts: "1 個帳號",
    description: "c-IRB 案件登錄、輪序指派邏輯維運、與 TFDA ExPRESS 平台整合。",
  },
  {
    key: "sysadmin",
    label: "系統管理員",
    org: "平台資訊維運單位",
    userName: "張志明",
    color: "#475569",
    accounts: "1 個帳號",
    description: "帳號權限設定、系統維運監控、稽核軌跡管理。",
  },
];

export const roleByKey = (k: RoleKey) => ROLES.find((r) => r.key === k)!;

// ---- 案件狀態流（9 大主要狀態，含副審一般審查中）----
export interface CaseState {
  key: string;
  label: string;
  desc: string;
  owner: string;
  trigger: string;
  color: string;
}

export const CASE_STATES: CaseState[] = [
  { key: "draft", label: "草稿", desc: "案件建立中，尚未送件", owner: "廠商", trigger: "廠商登錄新案", color: "#9ca3af" },
  { key: "submitted", label: "已送件", desc: "完成送件，待受理", owner: "廠商", trigger: "廠商填寫送件日期", color: "#3b82f6" },
  { key: "assigning", label: "主審指派中", desc: "系統依輪序指派主審 IRB", owner: "系統", trigger: "案件登錄完成", color: "#a855f7" },
  { key: "assigned", label: "已指派", desc: "主審 IRB 已指派，等待開始審查", owner: "主審IRB", trigger: "系統完成指派", color: "#8b5cf6" },
  { key: "reviewing", label: "主審審查中", desc: "審查期間自送件日翌日起算", owner: "主審IRB", trigger: "系統開始審查計時", color: "#6366f1" },
  { key: "revision", label: "補件中", desc: "廠商準備並上傳補件資料", owner: "廠商", trigger: "主審IRB發出補件通知", color: "#f97316" },
  { key: "revisionReplied", label: "補件已回覆", desc: "廠商已回覆補件，待主審確認", owner: "主審IRB", trigger: "廠商上傳補件文件", color: "#eab308" },
  { key: "primaryDone", label: "主審完成", desc: "主審審查完成並作成決議", owner: "主審IRB", trigger: "主審IRB核准/修正/不通過決議", color: "#14b8a6" },
  { key: "secondaryReviewing", label: "副審審查中", desc: "副審IRB進行簡易審查或一般審查", owner: "副審IRB", trigger: "主審完成通知送達副審", color: "#0ea5e9" },
  { key: "secondaryGeneral", label: "副審一般審查中", desc: "簡審不通過轉一般審查，提報委員全會", owner: "副審IRB", trigger: "簡審決議為不通過", color: "#6366f1" },
  { key: "approved", label: "已核准", desc: "所有副審IRB核准完成，案件核准", owner: "系統", trigger: "全部審查完成", color: "#22c55e" },
];

// linear flow used for the swimlane diagram (excludes branch note)
export const CASE_STATE_FLOW = [
  "draft",
  "submitted",
  "assigning",
  "assigned",
  "reviewing",
  "revision",
  "revisionReplied",
  "primaryDone",
  "secondaryReviewing",
  "secondaryGeneral",
  "approved",
];

// ---- 三層級控制架構 ----
export interface Tier {
  key: string;
  title: string;
  titleEn: string;
  scope: string;
  color: string;
  bullets: string[];
}

export const TIERS: Tier[] = [
  {
    key: "national",
    title: "國家級監管層",
    titleEn: "NATIONAL GOVERNANCE",
    scope: "TFDA 全權督導 + CDE 審查核心 + 系統管理員",
    color: "#3b5bdb",
    bullets: [
      "帳號管理／權限設定，平台維運與帳號管理",
      "c-IRB 案件登錄與輪序指派邏輯（每日 4 梯次：10:30／12:30／13:30／17:30）",
      "案件受理與行政審查",
      "時效監控儀表板：主審 20天／15天，副審 10天",
      "統計分析儀表板：平均／最短／最長處理時間，月度／年度排名",
      "重大爭議協調窗口，升級處理",
    ],
  },
  {
    key: "primary",
    title: "主審機構層",
    titleEn: "PRIMARY IRB",
    scope: "8 家主審醫院（依輪序指派）",
    color: "#e8590c",
    bullets: [
      "接收案件指派，行政完整性審查（確認資料完整性）",
      "完整文件審查／一般審查程序（計畫書／受試者同意書／藥品資料表／全部文件）",
      "審查計時開始：自完整送件翌日起算",
      "需要補件：發出審查意見並要求補件，暫停計時；補件後恢復計時",
      "主審 IRB 決議：通過 ／ 修正後通過 ／ 不通過",
      "新案 20 個工作天（可扣除補件時間）｜變更案 15 個工作天（扣除補件時間）",
    ],
  },
  {
    key: "secondary",
    title: "副審機構層",
    titleEn: "SECONDARY IRB",
    scope: "各參與醫院試驗醫院（依附主審審查）",
    color: "#2f9e44",
    bullets: [
      "接收主審 IRB 完成通知（原始文件＋補件資料＋主審意見＋主審核准函）",
      "審查方式判定：PATH A 簡易審查 或 PATH B 一般審查",
      "簡審：僑核式審查，僅自家醫院受試者同意書及相關行政倫理事項",
      "一般審查：提報審查委員全會決議",
      "關鍵原則：各 IRB 各自對自家醫院負責，無強制仲裁機制，廠商居中協調",
      "所有副審 IRB：10 個工作天（包含補件時間）",
    ],
  },
];

// ---- 輪序指派機制 ----
export const ROTATION_STEPS = [
  { time: "10:30", label: "第一梯次" },
  { time: "12:30", label: "第二梯次" },
  { time: "13:30", label: "第三梯次" },
  { time: "17:30", label: "第四梯次" },
];

// ---- 副審審查方式 PATH A / PATH B ----
export const REVIEW_PATHS = {
  principle: {
    title: "PATH A ｜原則：簡易審查",
    steps: [
      "接收文件包（原始文件＋補件資料＋主審意見＋主審核准函）",
      "審查方式判定（例外：盞區乙）",
      "簡易審查 — 僑核式審查：僅自家醫院受試者同意書及相關行政倫理事項",
      "簡審決議：通過（APPROVED）／要求修改／不通過",
      "要求修改 → 廠商修改自家醫院文件（無需回主審IRB）→ 僅送回原副審IRB重新審查",
      "簡審不得逕行不通過（簡審不得逕為不同意，須轉一般審查）",
    ],
  },
  exception: {
    title: "PATH B ｜例外：一般審查",
    steps: [
      "一般審查 — 提報審查委員全會",
      "全會決議：APPROVED（通過）／NOT APPROVED（不通過）",
      "通過 → 發出核准通知函，通知主審IRB及所有IRB附理由及審查討論文件",
      "不通過 → 發出不核准通知函，廠商可提出申覆（不計入 c-IRB 時效）",
    ],
  },
};

// ---- 變更 / 撤案 / 結案 ----
export const AMENDMENT_RULES = [
  "變更案（Amendment Cases）：自 104 年 6 月15日起，所有 c-IRB 變更案不可選擇暫止送審。",
  "新案 20 個工作天（可扣除補件時間）；變更案 15 個工作天（扣除補件時間）。",
  "案件結案：所有 IRB（主審＋全部副審）審查完成後，發出核准通知函，登錄審查完成日期並結署至 c-IRB 系統。",
  "結案後即可開始執行臨床試驗（ENO）。",
  "撤案：廠商於審查期間得提出撤案申請，經主審 IRB 確認後，案件狀態轉為「已撤案」並停止計時（本平台建議規則，待與 TFDA 需求訪談確認）。",
];

// ---- §6.2 實現邏輯（依提案書工作站儀表板規劃）----
export const SECTION_6_2 = {
  title: "§6.2 工作站儀表板 — 三大區塊實現邏輯",
  blocks: [
    {
      key: "now",
      title: "我的待辦（Now）",
      desc: "急迫性清單（逾期／即將逾期案件）＋工作清單（總案件／進行中／已完成／核准率）＋案件卡片（狀態徽章＋剩餘天數）。",
    },
    {
      key: "ongoing",
      title: "進行中／監控中（Ongoing）",
      desc: "依角色顯示指派中、審查中、補件中之案件；系統正常狀態列、c-IRB 同步狀態列即時顯示。",
    },
    {
      key: "history",
      title: "歷史與歸檔（History）",
      desc: "已核准／已結案／已撤案案件之查詢與下載，含完整操作歷程與版本紀錄。",
    },
  ],
};

// ---- 平台整體統計（首頁）----
export const PLATFORM_STATS = [
  { label: "已審查案件", value: "1,247", icon: "file" },
  { label: "合作醫院", value: "38+", icon: "users" },
  { label: "平均審查天數", value: "14.2 天", icon: "activity" },
  { label: "核准率", value: "87.3%", icon: "check" },
];

// ---- 簡易審查查檢表 ----
export interface ChecklistItem {
  label: string;
  checked: boolean;
  required?: boolean;
}
export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export const SIMPLE_REVIEW_CHECKLIST: ChecklistSection[] = [
  {
    title: "試驗基本資料",
    items: [
      { label: "試驗名稱、計畫書編號與 c-IRB 系統一致", checked: true },
      { label: "主審 IRB 名稱及指派日期正確", checked: true },
      { label: "本院已列入試驗醫院清單", checked: true },
    ],
  },
  {
    title: "受試者同意書",
    items: [
      { label: "同意書版本號與主審審查通過版本一致", checked: true },
      { label: "本院院名、地址、聯絡電話正確", checked: true },
      { label: "主要研究者（PI）姓名正確", checked: true },
      { label: "試驗風險揭露說明符合本院 IRB 標準", checked: false, required: true },
      { label: "補償與賠償說明符合本院規定", checked: false, required: true },
    ],
  },
  {
    title: "行政與倫理事項",
    items: [
      { label: "本院受試者招募方式與相關行政事項", checked: false, required: true },
      { label: "本院利益衝突揭露事項", checked: false, required: true },
      { label: "主審 IRB 核准函完整無誤", checked: false, required: true },
    ],
  },
];

// ---- 案件（Mock）----
export interface CaseItem {
  id: string;
  title: string;
  hospital: string;
  status: string; // CaseState key
  daysLeft: number;
  urgentCount?: number;
}

export const MOCK_CASES: CaseItem[] = [
  { id: "IRB-2026-001", title: "BNT-2026 單株抗體治療晚期非小細胞肺癌之第三期隨機對照臨床試驗", hospital: "國立臺灣大學醫學院附設醫院", status: "approved", daysLeft: 4 },
  { id: "IRB-2026-003", title: "CMUH-DM-2026 新型口服降血糖藥物之第三期多中心隨機雙盲試驗", hospital: "中國醫藥大學附設醫院", status: "reviewing", daysLeft: 12 },
  { id: "IRB-2026-004", title: "VGH-ONCO-2026 免疫檢查點抑制劑聯合化療治療胃癌之第二期試驗", hospital: "臺北榮民總醫院", status: "assigned", daysLeft: 18, urgentCount: 1 },
  { id: "IRB-2026-007", title: "三軍總醫院 IRB 副審案件 — 簡易審查中", hospital: "三軍總醫院", status: "secondaryReviewing", daysLeft: 6 },
  { id: "IRB-2026-008", title: "逾期補件案件 — 需優先處理", hospital: "高雄醫學大學附設醫院", status: "revision", daysLeft: -2, urgentCount: 1 },
];

export const NOTIFICATIONS_COUNT = 4;

// ---- 系統整合（SYSTEM INTEGRATION 面板）----
export interface IntegrationSystem {
  key: string;
  name: string;
  nameEn: string;
  desc: string;
  status: "connected" | "syncing" | "offline";
  lastSync: string;
}

export const INTEGRATION_SYSTEMS: IntegrationSystem[] = [
  {
    key: "express",
    name: "TFDA ExPRESS 平台",
    nameEn: "REST API",
    desc: "案件基本資料／帳號連攜／文件交換",
    status: "connected",
    lastSync: "2 分鐘前",
  },
  {
    key: "cirb",
    name: "CDE c-IRB 系統",
    nameEn: "REST API",
    desc: "案件登錄／佇儲清單／時效管控",
    status: "connected",
    lastSync: "剛剛",
  },
  {
    key: "ejirb",
    name: "醫院 IRB 系統等（eJIRB）",
    nameEn: "REST API／檔案交換",
    desc: "審查意見／狀態同步",
    status: "connected",
    lastSync: "5 分鐘前",
  },
  {
    key: "cert",
    name: "電子憑證管理中心",
    nameEn: "工商憑證／自然人憑證",
    desc: "簽章驗證與憑證管理",
    status: "syncing",
    lastSync: "同步中",
  },
  {
    key: "notify",
    name: "通知引擎",
    nameEn: "電子郵件 + 系統內",
    desc: "補件要求／審查完成／逾期提醒",
    status: "connected",
    lastSync: "剛剛",
  },
];

export const LEGAL_BASIS = "《人體研究法》《醫療法》《醫事法》TFDA 法規";

// ---- 三層鎖定機制 / RBAC ROLE MATRIX ----
export interface RbacRow {
  role: string;
  scope: string;
  level: number; // 1 = broadest .. 5 = narrowest, for visual bar
}

export const RBAC_MATRIX: RbacRow[] = [
  { role: "系統管理員", scope: "全部權限", level: 1 },
  { role: "TFDA 屬權限", scope: "全部案件 ＋ 時效監督", level: 2 },
  { role: "CDE 層權限", scope: "僅案件登錄與主審指派", level: 3 },
  { role: "主審 IRB", scope: "僅自身案件", level: 4 },
  { role: "副審 IRB", scope: "僅自身案件", level: 4 },
  { role: "廠商", scope: "僅限自身案件", level: 4 },
  { role: "一般民眾", scope: "僅公開資訊", level: 5 },
];

export const THREE_TIER_LOCK_NOTE =
  "三層鎖定機制：國家級監管層（TFDA／CDE／系統管理員）→ 主審機構層（8 家主審醫院）→ 副審機構層（各參與醫院），逐層限縮存取範圍；同層級單位間彼此不可存取對方案件資料。";

// ---- 技術架構說明 / SECURITY footer ----
export interface SecuritySection {
  key: string;
  title: string;
  titleZh: string;
  items: string[];
}

export const SECURITY_SECTIONS: SecuritySection[] = [
  {
    key: "auth",
    title: "AUTHENTICATION",
    titleZh: "身分驗證",
    items: ["工商憑證（Business Certificate）", "自然人憑證（NI Certificate）", "SSO 單一登入整合", "OAuth 2.0 授權"],
  },
  {
    key: "encryption",
    title: "DATA ENCRYPTION",
    titleZh: "資料加密",
    items: ["TLS／SSL 傳輸層加密", "靜態儲存加密", "個資及機敏文件加密", "金鑰管理"],
  },
  {
    key: "audit",
    title: "AUDIT LOG",
    titleZh: "稽核軌跡",
    items: ["所有登入事件", "所有文件存取記錄", "所有下載記錄（含使用者／時間／目的）", "版本控制", "不可篡改稽核軌跡"],
  },
  {
    key: "access",
    title: "ACCESS CONTROL",
    titleZh: "存取控制",
    items: ["列層級全安控制", "單位層級遮罩", "時間限制存取", "IP 位址限制", "Session 會話管理"],
  },
  {
    key: "privacy",
    title: "PRIVACY",
    titleZh: "隱私保護",
    items: ["個資去識別化", "最小權限原則", "隱私權政策", "刪除權利"],
  },
  {
    key: "compliance",
    title: "REGULATORY COMPLIANCE",
    titleZh: "法規合規",
    items: ["《人體研究法》", "《醫療法》", "《醫事法》TFDA 法規", "CCP 指導原則", "ISO 41981"],
  },
];

// ---- 關鍵時程總表 ----
export interface MilestoneRow {
  stage: string;
  owner: string;
  duration: string;
  note: string;
}

export const MILESTONES: MilestoneRow[] = [
  { stage: "主審 IRB 審查（新案）", owner: "主審IRB", duration: "20 個工作天", note: "可扣除補件時間；自完整送件翌日起算" },
  { stage: "主審 IRB 審查（變更案）", owner: "主審IRB", duration: "15 個工作天", note: "扣除補件時間" },
  { stage: "副審 IRB 審查（全部）", owner: "副審IRB", duration: "10 個工作天", note: "包含補件時間，各副審平行獨立審查" },
  { stage: "輪序指派梯次", owner: "CDE／系統", duration: "每日 4 梯次", note: "10:30／12:30／13:30／17:30" },
  { stage: "案件受理與行政審查", owner: "TFDA", duration: "即時", note: "案件登錄完成後立即受理" },
  { stage: "變更案暫止送審", owner: "廠商", duration: "不可選擇", note: "自 104 年 6 月15日起，所有 c-IRB 變更案不可選擇暫止送審" },
  { stage: "申覆處理", owner: "廠商", duration: "不計入時效", note: "不核准案件廠商可提出申覆，不計入 c-IRB 時效" },
];

// ---- 衝突解決機制 ----
export const CONFLICT_RESOLUTION = {
  banner: "重大爭議協調窗口 — 升級處理（Escalation）",
  scenarios: [
    { title: "主審與副審決議不一致", desc: "依「各 IRB 各自對自家醫院負責、無強制仲裁機制」原則，先由廠商居中協調；協調未果則升級至 TFDA 重大爭議協調窗口。" },
    { title: "副審簡易審查逕為不通過", desc: "簡審不得逕行不通過，須轉一般審查提報委員全會決議；仍有爭議者由 TFDA 協調處理。" },
    { title: "跨機構審查時效爭議", desc: "涉及輪序指派或多院審查時效認定爭議，由 TFDA 依時效監控紀錄進行認定與升級處理。" },
  ],
  steps: [
    "案件相關方（廠商／主審IRB／副審IRB）提出爭議",
    "系統標記案件為「爭議處理中」，通知 TFDA 協調窗口",
    "TFDA 彙整各方意見與審查歷程",
    "召開協調會議或以書面方式確認處理結果",
    "結果登錄系統並結署，如需升級則轉呈上級主管機關",
  ],
};

// ---- 補件需求單 ----
export interface RevisionRequest {
  id: string;
  caseId: string;
  target: string;
  item: string;
  issuedDate: string;
  dueDate: string;
  status: "待回覆" | "已回覆" | "逾期";
}

export const REVISION_REQUESTS: RevisionRequest[] = [
  { id: "RR-2026-014", caseId: "IRB-2026-008", target: "高雄醫學大學附設醫院", item: "受試者同意書風險揭露說明修正", issuedDate: "2026-07-28", dueDate: "2026-08-07", status: "逾期" },
  { id: "RR-2026-013", caseId: "IRB-2026-004", target: "臺北榮民總醫院", item: "計畫書統計方法補充說明", issuedDate: "2026-08-02", dueDate: "2026-08-16", status: "待回覆" },
  { id: "RR-2026-011", caseId: "IRB-2026-003", target: "中國醫藥大學附設醫院", item: "藥品資料表版本更新", issuedDate: "2026-07-20", dueDate: "2026-07-30", status: "已回覆" },
];

// ---- 同意書查檢表 ----
export const CONSENT_CHECKLIST: ChecklistSection[] = [
  {
    title: "文件基本資訊",
    items: [
      { label: "同意書版本號與版本日期標示於頁尾", checked: true },
      { label: "計畫書編號、試驗名稱與主審核准版本一致", checked: true },
    ],
  },
  {
    title: "受試者權益揭露",
    items: [
      { label: "試驗目的、方法及預期時程說明清楚", checked: true },
      { label: "可能風險、不適及副作用完整揭露", checked: false, required: true },
      { label: "自願參加及隨時退出之權利說明", checked: false, required: true },
      { label: "補償與賠償機制說明符合本院規定", checked: false, required: true },
    ],
  },
  {
    title: "本院適用資訊",
    items: [
      { label: "本院院名、地址、24小時聯絡窗口正確", checked: true },
      { label: "主要研究者（PI）及協同研究者姓名正確", checked: false, required: true },
      { label: "個人資料保護及去識別化說明符合本院政策", checked: false, required: true },
    ],
  },
];

// ---- 審查工作站（Reviewer task queue）----
export interface ReviewTask {
  caseId: string;
  title: string;
  stage: "行政完整性審查" | "完整文件審查" | "補件判定" | "決議";
  dueDate: string;
  priority: "高" | "中" | "低";
}

export const REVIEW_TASKS: ReviewTask[] = [
  { caseId: "IRB-2026-004", title: "VGH-ONCO-2026 免疫檢查點抑制劑聯合化療治療胃癌之第二期試驗", stage: "行政完整性審查", dueDate: "2026-08-10", priority: "高" },
  { caseId: "IRB-2026-003", title: "CMUH-DM-2026 新型口服降血糖藥物之第三期多中心隨機雙盲試驗", stage: "完整文件審查", dueDate: "2026-08-14", priority: "中" },
  { caseId: "IRB-2026-008", title: "逾期補件案件 — 需優先處理", stage: "補件判定", dueDate: "2026-08-09", priority: "高" },
  { caseId: "IRB-2026-007", title: "三軍總醫院 IRB 副審案件 — 簡易審查中", stage: "決議", dueDate: "2026-08-12", priority: "低" },
];

export const REVIEW_STAGE_ORDER = ["行政完整性審查", "完整文件審查", "補件判定", "決議"] as const;

// ---- 文件中心 ----
export interface DocRecord {
  name: string;
  caseId: string;
  version: string;
  uploader: string;
  date: string;
  type: string;
}

export const DOCUMENTS: DocRecord[] = [
  { name: "計畫書 Protocol v3.2", caseId: "IRB-2026-003", version: "v3.2", uploader: "陳怡君（廠商）", date: "2026-08-01", type: "計畫書" },
  { name: "受試者同意書 ICF v2.1", caseId: "IRB-2026-004", version: "v2.1", uploader: "陳怡君（廠商）", date: "2026-08-05", type: "同意書" },
  { name: "藥品資料表 IB v1.4", caseId: "IRB-2026-001", version: "v1.4", uploader: "陳怡君（廠商）", date: "2026-07-22", type: "藥品資料表" },
  { name: "主審核准函", caseId: "IRB-2026-007", version: "v1.0", uploader: "王建國（主審IRB）", date: "2026-08-06", type: "核准函" },
  { name: "補件回覆文件", caseId: "IRB-2026-008", version: "v1.1", uploader: "陳怡君（廠商）", date: "2026-08-03", type: "補件文件" },
];

// ---- 通訊中心 / 通知稽催模組 ----
export interface NotificationRecord {
  id: string;
  type: "補件通知" | "審查完成" | "逾期提醒" | "核准通知" | "爭議協調";
  caseId: string;
  target: string;
  channel: "電子郵件" | "系統內" | "電子郵件 + 系統內";
  time: string;
  read: boolean;
}

export const NOTIFICATION_RECORDS: NotificationRecord[] = [
  { id: "N-1042", type: "逾期提醒", caseId: "IRB-2026-008", target: "高雄醫學大學附設醫院", channel: "電子郵件 + 系統內", time: "10 分鐘前", read: false },
  { id: "N-1041", type: "補件通知", caseId: "IRB-2026-004", target: "臺北榮民總醫院", channel: "系統內", time: "1 小時前", read: false },
  { id: "N-1040", type: "審查完成", caseId: "IRB-2026-007", target: "三軍總醫院", channel: "電子郵件 + 系統內", time: "3 小時前", read: true },
  { id: "N-1039", type: "核准通知", caseId: "IRB-2026-001", target: "國立臺灣大學醫學院附設醫院", channel: "電子郵件 + 系統內", time: "昨天", read: true },
  { id: "N-1038", type: "爭議協調", caseId: "IRB-2026-003", target: "中國醫藥大學附設醫院", channel: "系統內", time: "2 天前", read: true },
];

// ---- 流程追蹤（單一案件全生命週期時間軸）----
export const TRACKING_CASE = {
  id: "IRB-2026-004",
  title: "VGH-ONCO-2026 免疫檢查點抑制劑聯合化療治療胃癌之第二期試驗",
  timeline: [
    { state: "draft", date: "2026-07-10", actor: "廠商", note: "廠商登錄新案" },
    { state: "submitted", date: "2026-07-12", actor: "廠商", note: "完成送件" },
    { state: "assigning", date: "2026-07-12", actor: "系統", note: "13:30 梯次完成輪序指派" },
    { state: "assigned", date: "2026-07-12", actor: "主審IRB", note: "臺北榮民總醫院 IRB 已指派" },
    { state: "reviewing", date: "2026-07-13", actor: "主審IRB", note: "審查計時開始" },
    { state: "revision", date: "2026-07-25", actor: "主審IRB", note: "發出補件通知，暫停計時" },
  ],
  current: "revision",
};

// ---- 案件詳情 / 審查進度頁 ----
export interface ReviewStageChip {
  key: string;
  label: string;
  status: "done" | "current" | "pending";
}

export interface ReviewOpinion {
  date: string;
  author: string;
  content: string;
}

export interface SecondaryStatusRow {
  hospital: string;
  status: string;
  date: string;
}

export interface CommEntry {
  from: string;
  time: string;
  text: string;
}

export interface CaseDetail {
  cIrbRef: string;
  phase: string;
  condition: string;
  drug: string;
  piName: string;
  daysUsed: number;
  daysTotal: number;
  stages: ReviewStageChip[];
  reviewOpinions: ReviewOpinion[];
  secondaryStatuses: SecondaryStatusRow[];
  commLog: CommEntry[];
  internalNotes: CommEntry[];
}

const STAGE_LABELS = ["案件提交", "主審指派", "主審審查", "補件往返", "主審決議", "副審審查", "全部完成"];

function buildStages(currentIndex: number): ReviewStageChip[] {
  return STAGE_LABELS.map((label, i) => ({
    key: label,
    label,
    status: i < currentIndex ? "done" : i === currentIndex ? "current" : "pending",
  }));
}

export const CASE_DETAILS: Record<string, CaseDetail> = {
  "IRB-2026-001": {
    cIrbRef: "CIRB-2026-NTUH-0021",
    phase: "Phase III",
    condition: "非小細胞肺癌",
    drug: "BNT-2026（單株抗體）",
    piName: "林志明",
    daysUsed: 20,
    daysTotal: 20,
    stages: buildStages(6),
    reviewOpinions: [
      { date: "2026-07-15", author: "主審IRB（國立臺灣大學醫學院附設醫院）", content: "計畫書與同意書內容完整，無須補件，同意進入決議程序。" },
      { date: "2026-07-28", author: "副審IRB（各參與醫院）", content: "全部副審醫院完成簡易審查，均無意見，同意核准。" },
    ],
    secondaryStatuses: [
      { hospital: "臺北榮民總醫院", status: "已核准", date: "2026-07-26" },
      { hospital: "三軍總醫院", status: "已核准", date: "2026-07-27" },
      { hospital: "中國醫藥大學附設醫院", status: "已核准", date: "2026-07-28" },
    ],
    commLog: [
      { from: "系統通知", time: "07-29 09:00", text: "案件 IRB-2026-001 已完成全部審查，核准函已發出。" },
    ],
    internalNotes: [
      { from: "王建國（主審IRB）", time: "07-15 10:20", text: "本案計畫設計嚴謹，建議加速處理。" },
    ],
  },
  "IRB-2026-003": {
    cIrbRef: "CIRB-2026-CGMH-0067",
    phase: "Phase III",
    condition: "第二型糖尿病",
    drug: "CMUH-DM-2026（GLP-1 receptor agonist）",
    piName: "陳志明",
    daysUsed: 8,
    daysTotal: 20,
    stages: buildStages(2),
    reviewOpinions: [
      { date: "2026-08-03", author: "主審IRB（中國醫藥大學附設醫院）", content: "統計方法說明尚待補充，其餘資料齊備，審查中。" },
    ],
    secondaryStatuses: [
      { hospital: "彰化基督教醫院", status: "尚未開始", date: "—" },
      { hospital: "奇美醫院", status: "尚未開始", date: "—" },
      { hospital: "花蓮慈濟醫院", status: "尚未開始", date: "—" },
    ],
    commLog: [
      { from: "陳怡君（廠商）", time: "08-05 14:20", text: "已收到審查意見，將於本週內補充統計方法說明。" },
      { from: "王建國（主審IRB）", time: "08-06 09:10", text: "收到，將於複審時一併確認。" },
    ],
    internalNotes: [],
  },
  "IRB-2026-004": {
    cIrbRef: "CIRB-2026-VGH-0134",
    phase: "Phase II",
    condition: "胃癌",
    drug: "VGH-ONCO-2026（免疫檢查點抑制劑＋化療）",
    piName: "張美惠",
    daysUsed: 13,
    daysTotal: 20,
    stages: buildStages(3),
    reviewOpinions: [
      { date: "2026-07-25", author: "主審IRB（臺北榮民總醫院）", content: "受試者同意書風險揭露段落需補充，已發出補件通知，暫停計時。" },
    ],
    secondaryStatuses: [],
    commLog: [
      { from: "系統通知", time: "07-25 16:40", text: "案件 IRB-2026-004 狀態更新為「補件中」。" },
    ],
    internalNotes: [
      { from: "王建國（主審IRB）", time: "07-25 16:35", text: "風險段落引用舊版模板，請廠商依最新格式補正。" },
    ],
  },
  "IRB-2026-007": {
    cIrbRef: "CIRB-2026-TSGH-0089",
    phase: "Phase II",
    condition: "多中心副審案件",
    drug: "—",
    piName: "—",
    daysUsed: 6,
    daysTotal: 10,
    stages: buildStages(5),
    reviewOpinions: [
      { date: "2026-08-04", author: "副審IRB（三軍總醫院）", content: "簡易審查中，本院受試者同意書及行政倫理事項確認中。" },
    ],
    secondaryStatuses: [{ hospital: "三軍總醫院", status: "簡易審查中", date: "2026-08-04" }],
    commLog: [
      { from: "王建國（主審IRB）", time: "08-02 11:00", text: "主審已完成，通知副審開始審查。" },
    ],
    internalNotes: [],
  },
  "IRB-2026-008": {
    cIrbRef: "CIRB-2026-KMUH-0055",
    phase: "Phase III",
    condition: "逾期補件案件",
    drug: "—",
    piName: "—",
    daysUsed: 22,
    daysTotal: 20,
    stages: buildStages(3),
    reviewOpinions: [
      { date: "2026-07-28", author: "主審IRB（高雄醫學大學附設醫院）", content: "受試者同意書風險揭露說明需修正，已逾期未回覆，請廠商儘速補件。" },
    ],
    secondaryStatuses: [],
    commLog: [
      { from: "系統通知", time: "今天 08:00", text: "案件 IRB-2026-008 補件已逾期 2 天，已發出稽催通知。" },
    ],
    internalNotes: [],
  },
};

// ---- §7.6 通知觸發條件 × 儀表板行為對照表 ----
export interface NotifyTriggerRow {
  no: number;
  trigger: string;
  target: string;
  content: string;
  dashboardBehavior: string;
}

export const NOTIFY_TRIGGER_TABLE: NotifyTriggerRow[] = [
  { no: 1, trigger: "新案送件（已送件）", target: "系統（指派）＋ TFDA", content: "通知派案", dashboardBehavior: "廠商畫面顯示「送件成功，待指派」" },
  { no: 2, trigger: "主審指派完成（主審審查中）", target: "主審 IRB 承辦人", content: "新案件待審，20天倒數開始", dashboardBehavior: "主審儀表板「待審佇列」+1，倒數計時器啟動" },
  { no: 3, trigger: "主審要求補件（補件中）", target: "廠商送審人員", content: "補件通知（含審查意見）", dashboardBehavior: "廠商儀表板置頂「補件倒數」，補件進度條顯示 0%" },
  { no: 4, trigger: "廠商完成補件（轉回主審審查中）", target: "主審 IRB 承辦人", content: "補件已回覆，請複審", dashboardBehavior: "主審儀表板案件自動回到佇列頂端，標記「補件已回，待複審」橙色標籤" },
  { no: 5, trigger: "主審完成（主審完成）", target: "副審 IRB 承辦人 + 廠商", content: "主審結果公告，請副審啟動", dashboardBehavior: "副審儀表板新增「待啟動」案件，廠商儀表板顯示「主審完成」" },
  { no: 6, trigger: "副審簡審轉一般審查（副審一般審查中）", target: "TFDA 管理員 + 廠商", content: "副審 IRB 由簡審轉一般審查（提會審查），請注意時程", dashboardBehavior: "副審儀表板顯示「簡審不通過，需轉一般審查」提醒標籤，TFDA 時效監控更新" },
  { no: 7, trigger: "副審完成（已核准）", target: "廠商 + TFDA", content: "整體審查通過通知", dashboardBehavior: "案件移至雙方「歷史歸檔（History）」區塊，廠商可下載所有核准函" },
];

export const NOTIFY_TRIGGER_TYPES = [
  { type: "補件通知", desc: "主審或副審發出補件意見時觸發，同步暫停該案審查計時。", channel: "電子郵件 + 系統內" },
  { type: "審查完成", desc: "主審或副審完成決議並登錄結果時觸發。", channel: "電子郵件 + 系統內" },
  { type: "逾期提醒", desc: "案件超過時效期限（20/15/10 工作天）仍未完成時，每日稽催。", channel: "電子郵件 + 系統內" },
  { type: "核准通知", desc: "所有 IRB 審查完成、案件結案時發出。", channel: "電子郵件 + 系統內" },
  { type: "爭議協調", desc: "案件被標記為爭議處理中，通知 TFDA 協調窗口。", channel: "系統內" },
  { type: "指派通知", desc: "CDE 依輪序完成主審 IRB 指派時，通知該院承辦人。", channel: "系統內" },
];

// ---- 文件中心：文件夾 / 版本 / 存取日誌 ----
export interface DocVersion {
  version: string;
  date: string;
  uploader: string;
  fileName: string;
  note: string;
}

export interface DocFile {
  name: string;
  caseId: string;
  folder: "基本文件夾" | "審查文件夾" | "行政文件夾";
  type: string;
  latestVersion: string;
  isNew: boolean;
  versions: DocVersion[];
  content: string; // searchable excerpt
}

export const DOC_FILES: DocFile[] = [
  {
    name: "研究計畫書",
    caseId: "IRB-2026-003",
    folder: "基本文件夾",
    type: "計畫書",
    latestVersion: "v2.0",
    isNew: true,
    content: "CMUH-DM-2026 新型口服降血糖藥物之第三期多中心隨機雙盲試驗 第二型糖尿病 統計方法 受試者納入排除條件",
    versions: [
      { version: "v2.0", date: "2026-08-01", uploader: "陳怡君（廠商）", fileName: "計畫書_v2.0.pdf", note: "補充統計方法段落" },
      { version: "v1.1", date: "2026-07-20", uploader: "陳怡君（廠商）", fileName: "計畫書_v1.1.pdf", note: "修正納入排除條件" },
      { version: "v1.0", date: "2026-07-10", uploader: "陳怡君（廠商）", fileName: "計畫書_v1.0.pdf", note: "初版送審" },
    ],
  },
  {
    name: "受試者同意書",
    caseId: "IRB-2026-003",
    folder: "基本文件夾",
    type: "同意書",
    latestVersion: "v1.2",
    isNew: true,
    content: "CMUH-DM-2026 受試者同意書 第二型糖尿病 風險揭露 補償與賠償 個人資料保護",
    versions: [
      { version: "v1.2", date: "2026-08-01", uploader: "陳怡君（廠商）", fileName: "同意書_v1.2.pdf", note: "更新補償與賠償條款" },
      { version: "v1.0", date: "2026-07-10", uploader: "陳怡君（廠商）", fileName: "同意書_v1.0.pdf", note: "初版送審" },
    ],
  },
  {
    name: "藥品資料表 IB",
    caseId: "IRB-2026-001",
    folder: "基本文件夾",
    type: "藥品資料表",
    latestVersion: "v1.4",
    isNew: false,
    content: "BNT-2026 單株抗體 藥品資料表 Investigator's Brochure 藥動藥效",
    versions: [
      { version: "v1.4", date: "2026-07-22", uploader: "陳怡君（廠商）", fileName: "IB_v1.4.pdf", note: "更新藥動藥效資料" },
    ],
  },
  {
    name: "主審審查意見表",
    caseId: "IRB-2026-004",
    folder: "審查文件夾",
    type: "審查意見",
    latestVersion: "v1.0",
    isNew: true,
    content: "VGH-ONCO-2026 主審審查意見 受試者同意書風險揭露 補件要求",
    versions: [
      { version: "v1.0", date: "2026-07-25", uploader: "王建國（主審IRB）", fileName: "審查意見_v1.0.pdf", note: "發出補件要求" },
    ],
  },
  {
    name: "主審核准函",
    caseId: "IRB-2026-007",
    folder: "審查文件夾",
    type: "核准函",
    latestVersion: "v1.0",
    isNew: true,
    content: "三軍總醫院 主審核准函 副審審查通知",
    versions: [
      { version: "v1.0", date: "2026-08-06", uploader: "王建國（主審IRB）", fileName: "核准函_v1.0.pdf", note: "主審完成，通知副審" },
    ],
  },
  {
    name: "補件回覆文件",
    caseId: "IRB-2026-008",
    folder: "審查文件夾",
    type: "補件文件",
    latestVersion: "v1.1",
    isNew: false,
    content: "高雄醫學大學附設醫院 補件回覆 受試者同意書修正",
    versions: [
      { version: "v1.1", date: "2026-08-03", uploader: "陳怡君（廠商）", fileName: "補件回覆_v1.1.pdf", note: "尚未完成回覆" },
    ],
  },
  {
    name: "試驗醫院清單",
    caseId: "IRB-2026-003",
    folder: "行政文件夾",
    type: "行政文件",
    latestVersion: "v1.0",
    isNew: false,
    content: "多中心試驗醫院清單 主審副審分工",
    versions: [
      { version: "v1.0", date: "2026-07-10", uploader: "陳怡君（廠商）", fileName: "醫院清單_v1.0.pdf", note: "初版" },
    ],
  },
  {
    name: "利益衝突揭露表",
    caseId: "IRB-2026-004",
    folder: "行政文件夾",
    type: "行政文件",
    latestVersion: "v1.0",
    isNew: false,
    content: "臺北榮民總醫院 利益衝突揭露 研究者聲明",
    versions: [
      { version: "v1.0", date: "2026-07-12", uploader: "陳怡君（廠商）", fileName: "利益衝突揭露_v1.0.pdf", note: "初版" },
    ],
  },
];

export const DOC_ACCESS_LOG = [
  { user: "陳怡君（廠商）", action: "上傳", doc: "研究計畫書 v2.0", time: "08-01 10:12" },
  { user: "王建國（主審IRB）", action: "下載", doc: "研究計畫書 v2.0", time: "08-01 14:30" },
  { user: "黃國棟（TFDA管理員）", action: "檢視", doc: "受試者同意書 v1.2", time: "08-02 09:05" },
  { user: "李美玲（副審IRB）", action: "下載", doc: "主審核准函 v1.0", time: "08-06 11:20" },
  { user: "陳怡君（廠商）", action: "上傳", doc: "補件回覆文件 v1.1", time: "08-03 16:45" },
];

// ---- 關鍵時程總表（完整送審生命週期，0–15）----
export interface FullMilestoneStep {
  no: number;
  label: string;
  phase: string;
  phaseColor: string;
  owner: string;
  duration: string;
  system: string;
}

export const FULL_MILESTONE_STEPS: FullMilestoneStep[] = [
  { no: 0, label: "送件前諮詢（可選）", phase: "送件前準備", phaseColor: "#9ca3af", owner: "CDE", duration: "4–12 週", system: "CDE 諮詢系統" },
  { no: 1, label: "TFDA 臨床試驗送件", phase: "ExPRESS 平台", phaseColor: "#3b82f6", owner: "廠商", duration: "—", system: "ExPRESS" },
  { no: 2, label: "TFDA 科學審查", phase: "ExPRESS 平台", phaseColor: "#3b82f6", owner: "TFDA／CDE", duration: "15／45 天", system: "ExPRESS" },
  { no: 3, label: "TFDA 補件", phase: "ExPRESS 平台", phaseColor: "#3b82f6", owner: "廠商", duration: "2 個月 + 1 個月", system: "ExPRESS" },
  { no: 4, label: "c-IRB 系統登錄", phase: "c-IRB 系統", phaseColor: "#14b8a6", owner: "廠商", duration: "—", system: "c-IRB 系統" },
  { no: 5, label: "系統指派主審 IRB", phase: "c-IRB 系統", phaseColor: "#14b8a6", owner: "系統自動", duration: "每日 4 梯次", system: "c-IRB 系統" },
  { no: 6, label: "廠商送件至主審 IRB", phase: "主審 IRB", phaseColor: "#1e293b", owner: "廠商", duration: "—", system: "直接送件" },
  { no: 7, label: "主審 IRB 行政審查", phase: "主審 IRB", phaseColor: "#1e293b", owner: "主審 IRB", duration: "視資料完整性", system: "各醫院 IRB" },
  { no: 8, label: "主審 IRB 實質審查", phase: "主審 IRB", phaseColor: "#1e293b", owner: "主審 IRB", duration: "20／15 工作天", system: "各醫院 IRB" },
  { no: 9, label: "主審 IRB 補件往返", phase: "主審 IRB", phaseColor: "#1e293b", owner: "廠商＋主審", duration: "審查時間暫停", system: "各醫院 IRB" },
  { no: 10, label: "主審 IRB 決議", phase: "主審 IRB", phaseColor: "#1e293b", owner: "主審 IRB", duration: "—", system: "各醫院 IRB" },
  { no: 11, label: "副審 IRB 審查（簡易／一般）", phase: "副審 IRB", phaseColor: "#7c3aed", owner: "副審 IRB", duration: "10 工作天", system: "各醫院 IRB" },
  { no: 12, label: "副審 IRB 補件往返（如需要）", phase: "副審 IRB", phaseColor: "#7c3aed", owner: "廠商＋副審", duration: "包含於 10 工作天內", system: "各醫院 IRB" },
  { no: 13, label: "全部審查完成", phase: "核准", phaseColor: "#16a34a", owner: "系統", duration: "—", system: "c-IRB 系統" },
  { no: 14, label: "核准函發出／結案", phase: "核准", phaseColor: "#16a34a", owner: "TFDA／系統", duration: "—", system: "c-IRB 系統" },
  { no: 15, label: "試驗開始執行（ENO）", phase: "試驗開始", phaseColor: "#0f766e", owner: "廠商", duration: "—", system: "—" },
];

export const MILESTONE_LEGEND = [
  { label: "送件前準備", color: "#9ca3af" },
  { label: "ExPRESS 平台", color: "#3b82f6" },
  { label: "c-IRB 系統", color: "#14b8a6" },
  { label: "主審 IRB", color: "#1e293b" },
  { label: "副審 IRB", color: "#7c3aed" },
  { label: "核准", color: "#16a34a" },
  { label: "試驗開始", color: "#0f766e" },
];

// ---- 平台定位對比（依提案書 §3.1）----
export const PLATFORM_POSITIONING = [
  { title: "IRB 多中心送審與案件管理平台", desc: "以單一案件識別、集中進度追蹤為核心，取代分散的送審與追蹤方式。", fit: "高" },
  { title: "主審與副審醫院協作平台", desc: "支援主審／副審醫院間之文件及審查資訊交換，降低重複作業。", fit: "高" },
  { title: "TFDA 監管與案件追蹤平台", desc: "提供 TFDA 掌握整體案件進度、逾期情形及處理歷程之能力。", fit: "高" },
  { title: "既有系統間之案件及文件交換平台", desc: "與 TFDA ExPRESS、CDE c-IRB、醫院 IRB 系統進行資料與文件交換。", fit: "中" },
  { title: "未來跨機關臨床試驗服務入口", desc: "保留未來與其他主管機關、跨機構服務整合之擴充彈性。", fit: "規劃中" },
];

// ---- 統計報表：醫院效能明細 ----
export interface HospitalStat {
  hospital: string;
  region: string;
  cases: number;
  avgDays: number;
  onTimeRate: number;
  approvalRate: number;
  reviewMode: string;
}

export const HOSPITAL_STATS: HospitalStat[] = [
  { hospital: "三軍總醫院", region: "北部・台北", cases: 18, avgDays: 7.2, onTimeRate: 94, approvalRate: 96, reviewMode: "簡審為主" },
  { hospital: "林口長庚紀念醫院", region: "北部・桃園", cases: 16, avgDays: 7.8, onTimeRate: 88, approvalRate: 91, reviewMode: "簡審" },
  { hospital: "馬偕紀念醫院", region: "北部・台北", cases: 15, avgDays: 8.1, onTimeRate: 87, approvalRate: 93, reviewMode: "簡審" },
  { hospital: "亞東紀念醫院", region: "北部・新北", cases: 14, avgDays: 7.1, onTimeRate: 93, approvalRate: 95, reviewMode: "簡審" },
  { hospital: "臺北榮民總醫院（副審）", region: "北部・台北", cases: 13, avgDays: 7.3, onTimeRate: 92, approvalRate: 94, reviewMode: "簡審" },
  { hospital: "彰化基督教醫院", region: "中部・彰化", cases: 12, avgDays: 7.8, onTimeRate: 92, approvalRate: 92, reviewMode: "簡審" },
  { hospital: "新光吳火獅紀念醫院", region: "北部・台北", cases: 11, avgDays: 7.5, onTimeRate: 91, approvalRate: 91, reviewMode: "簡審" },
  { hospital: "高雄長庚紀念醫院", region: "南部・高雄", cases: 11, avgDays: 7.6, onTimeRate: 91, approvalRate: 93, reviewMode: "簡審" },
  { hospital: "國泰綜合醫院", region: "北部・台北", cases: 10, avgDays: 8.3, onTimeRate: 85, approvalRate: 90, reviewMode: "簡審" },
  { hospital: "台北市立聯合醫院", region: "北部・台北", cases: 9, avgDays: 8.8, onTimeRate: 78, approvalRate: 89, reviewMode: "簡審" },
  { hospital: "奇美醫院", region: "南部・台南", cases: 9, avgDays: 8.0, onTimeRate: 89, approvalRate: 92, reviewMode: "簡審" },
  { hospital: "花蓮慈濟醫院", region: "東部・花蓮", cases: 8, avgDays: 9.2, onTimeRate: 75, approvalRate: 88, reviewMode: "混合" },
  { hospital: "台中榮民總醫院（副審）", region: "中部・台中", cases: 7, avgDays: 6.9, onTimeRate: 96, approvalRate: 97, reviewMode: "簡審" },
  { hospital: "中山醫學大學附設醫院", region: "中部・台中", cases: 6, avgDays: 8.5, onTimeRate: 83, approvalRate: 89, reviewMode: "簡審" },
  { hospital: "嘉義基督教醫院", region: "南部・嘉義", cases: 5, avgDays: 9.5, onTimeRate: 72, approvalRate: 86, reviewMode: "混合" },
];

// ---- 統計報表：月度趨勢（提交／核准／退件）----
export const MONTHLY_TREND = [
  { month: "01月", submitted: 3, approved: 2, rejected: 0 },
  { month: "02月", submitted: 4, approved: 2, rejected: 1 },
  { month: "03月", submitted: 5, approved: 3, rejected: 0 },
  { month: "04月", submitted: 6, approved: 4, rejected: 1 },
  { month: "05月", submitted: 4, approved: 3, rejected: 0 },
  { month: "06月", submitted: 3, approved: 1, rejected: 0 },
];

export const STATS_SUMMARY = {
  totalCases: 10,
  approvalRate: 75.0,
  avgDays: 14.2,
  onTimeRate: 88.0,
};

