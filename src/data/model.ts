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
