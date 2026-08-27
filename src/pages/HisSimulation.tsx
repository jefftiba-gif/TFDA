import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RotateCcw,
  ShieldAlert,
  Pill,
  User,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import {
  HIS_PATIENTS,
  HIS_DRUGS,
  HIS_DRUG_CATEGORIES,
  findDrug,
  findPatient,
  evaluateOrder,
  type VerdictLevel,
  type Verdict,
  type HisOrderLogEntry,
} from "../data/hisData";

const STEPS = [
  { n: 1, label: "開立處方" },
  { n: 2, label: "CDSS 檢核" },
  { n: 3, label: "風險分級" },
  { n: 4, label: "簽署送出" },
];

const LEVEL_STYLE: Record<VerdictLevel, { badge: string; card: string; text: string; gaugePos: number }> = {
  safe: { badge: "bg-[#2F9E58] text-white", card: "bg-[#EAF6EE]", text: "text-[#131A2B]", gaugePos: 16 },
  soft: { badge: "bg-[#B8720E] text-white", card: "bg-[#FCF2E1]", text: "text-[#131A2B]", gaugePos: 50 },
  hard: { badge: "bg-[#B23A3A] text-white", card: "bg-[#FBEAEA]", text: "text-[#131A2B]", gaugePos: 84 },
};

type ResultPhase = "idle" | "checking" | "verdict" | "success";

function useClock() {
  const [text, setText] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setText(`${now.getFullYear()}/${p(now.getMonth() + 1)}/${p(now.getDate())} ${p(now.getHours())}:${p(now.getMinutes())}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return text;
}

export default function HisSimulation() {
  const clock = useClock();
  const [patientId, setPatientId] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [newDrugIds, setNewDrugIds] = useState<string[]>([]);
  const [phase, setPhase] = useState<ResultPhase>("idle");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [overrideReason, setOverrideReason] = useState("");
  const [overrideError, setOverrideError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [orderLog, setOrderLog] = useState<HisOrderLogEntry[]>([]);

  const patient = patientId ? findPatient(patientId) : undefined;

  const addableDrugs = useMemo(
    () => HIS_DRUGS.filter((d) => !patient?.currentMedIds.includes(d.id) && !newDrugIds.includes(d.id)),
    [patient, newDrugIds]
  );

  function selectPatient(id: string) {
    setPatientId(id);
    setStep(1);
    setNewDrugIds([]);
    setPhase("idle");
    setVerdict(null);
    setOverrideReason("");
    setOverrideError(false);
  }

  function addDrug(id: string) {
    setNewDrugIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }
  function removeDrug(id: string) {
    setNewDrugIds((prev) => prev.filter((x) => x !== id));
  }

  function submitCheck() {
    if (!patient || newDrugIds.length === 0) return;
    setStep(2);
    setPhase("checking");
    setVerdict(null);
    window.setTimeout(() => {
      const v = evaluateOrder(patient, newDrugIds);
      setVerdict(v);
      setStep(3);
      setPhase("verdict");
    }, 900);
  }

  function logOrder(v: Verdict, override?: string) {
    if (!patient) return;
    const entry: HisOrderLogEntry = {
      orderNo: `RX-${String(orderLog.length + 1).padStart(4, "0")}`,
      patientId: patient.id,
      patientName: patient.name,
      drugNames: newDrugIds.map((id) => findDrug(id)?.name ?? id),
      verdict: v,
      overrideReason: override,
      signedAt: clock,
      signedBy: "王建明 醫師",
    };
    setOrderLog((prev) => [entry, ...prev]);
  }

  function finishSuccess(msg: string, override?: string) {
    if (!verdict) return;
    logOrder(verdict, override);
    setStep(4);
    setPhase("success");
    setSuccessMsg(msg);
  }

  function startNewOrder() {
    setStep(1);
    setNewDrugIds([]);
    setPhase("idle");
    setVerdict(null);
    setOverrideReason("");
    setOverrideError(false);
  }

  function resetAll() {
    setPatientId(null);
    setOrderLog([]);
    startNewOrder();
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-[#131A2B]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
            <ArrowLeft size={15} />
            返回 TFDA IRB 平台首頁
          </Link>
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 hover:border-slate-300 hover:text-slate-700"
          >
            <RotateCcw size={13} />
            重置示範資料
          </button>
        </div>

        <header className="mb-7 max-w-2xl">
          <p className="mb-2 font-mono text-[.72rem] uppercase tracking-[0.14em] text-[#0E6B63]">
            HIS 醫療資訊系統 × CDSS 智慧臨床決策支援
          </p>
          <h1 className="mb-2 text-2xl font-bold tracking-tight">互動介面模擬</h1>
          <p className="text-sm leading-relaxed text-slate-500">
            模擬醫師於 HIS 選擇病患、開立處方、觸發 CDSS 交互作用檢核，並依規則引擎回傳結果進行風險分級，依
            Hard&nbsp;Stop／Soft&nbsp;Stop 分流處置；同步整合病患過敏史、腎功能與目前用藥判讀。
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
          {/* Patient list */}
          <aside className="h-fit overflow-hidden rounded-xl border border-[#E3E6EB] bg-white shadow-sm">
            <div className="border-b border-[#E3E6EB] px-4 py-3 text-xs font-semibold text-slate-400">
              門診／住院病患清單
            </div>
            <div className="divide-y divide-[#E3E6EB]">
              {HIS_PATIENTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectPatient(p.id)}
                  className={`block w-full px-4 py-3 text-left transition-colors ${
                    patientId === p.id ? "bg-[#E7F2F0]" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{p.name}</span>
                    {p.allergies.length > 0 && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-[#FBEAEA] px-1.5 py-0.5 text-[10px] font-medium text-[#B23A3A]">
                        <ShieldAlert size={10} />
                        過敏
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-slate-400">
                    {p.mrn} · {p.age}/{p.gender}
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-slate-400">{p.diagnosis}</div>
                  <div className="mt-0.5 text-[11px] text-slate-400">{p.ward}・{p.bedNo}</div>
                </button>
              ))}
            </div>
          </aside>

          {/* Workstation */}
          <div className="overflow-hidden rounded-2xl border border-[#E3E6EB] bg-white shadow-[0_1px_2px_rgba(19,26,43,.04),0_12px_32px_-18px_rgba(19,26,43,.18)]">
            <div className="flex items-center gap-2 bg-[#131A2B] px-4 py-2.5 text-white">
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="ml-1.5 text-sm font-medium opacity-90">HIS 醫囑系統・門診用藥</span>
              <span className="ml-auto font-mono text-xs opacity-60">{clock}</span>
            </div>

            {!patient ? (
              <div className="flex flex-col items-center justify-center gap-2 px-6 py-20 text-center text-sm text-slate-400">
                <User size={28} className="text-slate-300" />
                請由左側選擇病患以開始模擬醫囑開立流程
              </div>
            ) : (
              <>
                <div className="flex px-5 pt-4">
                  {STEPS.map((s, i) => (
                    <div key={s.n} className="relative flex-1 text-center">
                      {i < STEPS.length - 1 && (
                        <div
                          className={`absolute left-[56%] top-[11px] z-0 h-0.5 w-[88%] ${
                            s.n < step ? "bg-[#E7F2F0]" : "bg-[#E3E6EB]"
                          }`}
                        />
                      )}
                      <span
                        className={`relative z-10 inline-flex h-[23px] w-[23px] items-center justify-center rounded-full font-mono text-xs ${
                          s.n === step
                            ? "bg-[#0E6B63] text-white"
                            : s.n < step
                            ? "bg-[#E7F2F0] text-[#0A5850]"
                            : "bg-[#E3E6EB] text-slate-400"
                        }`}
                      >
                        {s.n}
                      </span>
                      <span
                        className={`mt-1 block text-[11px] ${
                          s.n === step ? "font-medium text-[#131A2B]" : "text-slate-400"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-6">
                  <section className="mb-4 flex flex-wrap gap-7 border-b border-dashed border-[#E3E6EB] pb-4">
                    <Field label="病患" value={patient.name} />
                    <Field label="病歷號" value={patient.mrn} mono />
                    <Field label="年齡 / 性別" value={`${patient.age} / ${patient.gender}`} />
                    <Field label="診斷" value={patient.diagnosis} />
                    <Field label="科別／床位" value={`${patient.ward}・${patient.bedNo}`} />
                  </section>

                  {patient.allergies.length > 0 && (
                    <div className="mb-4 flex items-start gap-2 rounded-lg bg-[#FBEAEA] px-3.5 py-2.5 text-sm text-[#B23A3A]">
                      <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                      <span>
                        <strong>過敏史警示：</strong>
                        {patient.allergies.map((a) => a.label).join("、")}
                      </span>
                    </div>
                  )}
                  {patient.renalImpairment && (
                    <div className="mb-4 flex items-start gap-2 rounded-lg bg-[#FCF2E1] px-3.5 py-2.5 text-sm text-[#B8720E]">
                      <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                      <span>
                        <strong>腎功能警示：</strong>
                        {patient.renalImpairment.note}
                      </span>
                    </div>
                  )}

                  <h3 className="mb-1.5 mt-2 text-[.74rem] font-medium text-slate-500">目前用藥中</h3>
                  <div className="mb-4 flex min-h-[2rem] flex-wrap items-center gap-2">
                    {patient.currentMedIds.length === 0 ? (
                      <span className="text-sm text-slate-400">無</span>
                    ) : (
                      patient.currentMedIds.map((id) => {
                        const d = findDrug(id);
                        return (
                          <span
                            key={id}
                            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500"
                          >
                            <Pill size={11} />
                            {d?.name} {d?.nameEn}
                          </span>
                        );
                      })
                    )}
                  </div>

                  <h2 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold">
                    <ClipboardList size={15} />
                    本次新增醫囑
                  </h2>
                  <div className="mb-4 flex min-h-[2.4rem] flex-wrap items-center gap-2">
                    {newDrugIds.length === 0 ? (
                      <span className="text-sm text-slate-400">尚未加入藥品，請從下方選擇</span>
                    ) : (
                      newDrugIds.map((id) => {
                        const d = findDrug(id);
                        return (
                          <span
                            key={id}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F2F0] py-[.35rem] pl-3.5 pr-1.5 text-sm font-medium text-[#0A5850]"
                          >
                            {d?.name} {d?.nameEn}
                            <button
                              type="button"
                              aria-label={`移除 ${d?.name}`}
                              onClick={() => removeDrug(id)}
                              className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-sm leading-none hover:bg-black/10"
                            >
                              ×
                            </button>
                          </span>
                        );
                      })
                    )}
                  </div>

                  {HIS_DRUG_CATEGORIES.map((cat) => {
                    const drugs = addableDrugs.filter((d) => d.category === cat);
                    if (drugs.length === 0) return null;
                    return (
                      <div key={cat} className="mb-3">
                        <h3 className="mb-1.5 text-[.74rem] font-medium text-slate-500">{cat}</h3>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {drugs.map((d) => (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => addDrug(d.id)}
                              className="rounded-lg border border-[#E3E6EB] bg-white px-3 py-2 text-left text-sm text-[#131A2B] transition-colors hover:border-[#0E6B63]"
                            >
                              + {d.name} {d.nameEn}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {phase === "idle" && (
                    <button
                      type="button"
                      disabled={newDrugIds.length === 0}
                      onClick={submitCheck}
                      className="mt-4 rounded-lg bg-[#0E6B63] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:bg-[#0A5850] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      送出 CDSS 檢核
                    </button>
                  )}

                  {phase !== "idle" && (
                    <div className="mt-6 border-t border-dashed border-[#E3E6EB] pt-6">
                      {phase === "checking" && (
                        <div className="flex flex-col items-center gap-3 py-6 text-sm text-slate-500">
                          <span className="h-3 w-3 animate-pulse rounded-full bg-[#0E6B63]" />
                          正在呼叫臨床決策規則引擎進行交互作用檢核...
                        </div>
                      )}

                      {phase === "verdict" && verdict && (
                        <VerdictView
                          verdict={verdict}
                          overrideReason={overrideReason}
                          overrideError={overrideError}
                          onOverrideChange={setOverrideReason}
                          onBack={startNewOrder}
                          onConfirmSafe={() => finishSuccess("處方已送出，醫師簽章完成，流程結束。")}
                          onConfirmSoft={() => {
                            if (!overrideReason.trim()) {
                              setOverrideError(true);
                              return;
                            }
                            setOverrideError(false);
                            finishSuccess(
                              "已依覆核理由送出處方，CDSS 已將檢核結果與處置紀錄回傳 HIS，等待藥局複核。",
                              overrideReason.trim()
                            );
                          }}
                        />
                      )}

                      {phase === "success" && (
                        <div className="py-1 text-center">
                          <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF6EE] text-[#2F9E58]">
                            <CheckCircle2 size={18} />
                          </div>
                          <p className="mb-4 text-sm">{successMsg}</p>
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={startNewOrder}
                              className="rounded-lg bg-[#0E6B63] px-4 py-2 text-sm font-medium text-white hover:bg-[#0A5850]"
                            >
                              為此病患開立下一筆醫囑
                            </button>
                            <button
                              onClick={() => selectPatient(HIS_PATIENTS.find((p) => p.id !== patient.id)!.id)}
                              className="rounded-lg border border-[#E3E6EB] px-4 py-2 text-sm text-slate-500 hover:border-slate-300"
                            >
                              切換病患
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <OrderLog entries={orderLog} />

        <p className="mx-auto mt-8 max-w-2xl text-center text-[.72rem] leading-relaxed text-slate-400">
          此頁面為 HIS／CDSS 系統介面互動模擬，病患、藥品與交互作用資料為示範性簡化範例，非通過驗證之臨床決策依據；實際部署以合格臨床藥物資料庫（如
          Medi-Span）回傳結果為準。
        </p>
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <span className="mb-0.5 block text-[.68rem] text-slate-400">{label}</span>
      <span className={`text-sm font-medium ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}

function VerdictView({
  verdict,
  overrideReason,
  overrideError,
  onOverrideChange,
  onBack,
  onConfirmSafe,
  onConfirmSoft,
}: {
  verdict: Verdict;
  overrideReason: string;
  overrideError: boolean;
  onOverrideChange: (v: string) => void;
  onBack: () => void;
  onConfirmSafe: () => void;
  onConfirmSoft: () => void;
}) {
  const style = LEVEL_STYLE[verdict.level];
  return (
    <div>
      <div className="mb-5">
        <div className="relative mt-3.5 flex h-[9px] overflow-visible rounded-md">
          <div className="h-full flex-1 rounded-l-md bg-[#2F9E58]" />
          <div className="h-full flex-1 bg-[#B8720E]" />
          <div className="h-full flex-1 rounded-r-md bg-[#B23A3A]" />
          <div
            className="absolute -top-1.5 h-[21px] w-0.5 bg-[#131A2B] transition-all duration-700 ease-out"
            style={{ left: `${style.gaugePos}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[.68rem] text-slate-400">
          <span>安全</span>
          <span>Soft Stop</span>
          <span>Hard Stop</span>
        </div>
      </div>

      <div className={`mb-4 rounded-xl p-4 ${style.card}`}>
        <span className={`mb-2 inline-block rounded px-2 py-0.5 font-mono text-xs font-semibold ${style.badge}`}>
          {verdict.title}
        </span>
        <p className={`text-sm leading-relaxed ${style.text}`}>{verdict.msg}</p>
        {verdict.ruleRef && <p className="mt-2 font-mono text-[11px] text-slate-400">規則依據：{verdict.ruleRef}</p>}
      </div>

      {verdict.level === "hard" && (
        <button
          onClick={onBack}
          className="rounded-lg border border-[#B23A3A] px-4 py-2 text-sm text-[#B23A3A] hover:bg-[#FBEAEA]"
        >
          返回修改處方
        </button>
      )}

      {verdict.level === "soft" && (
        <div>
          <div className="mb-3.5">
            <label htmlFor="overrideReason" className="mb-1.5 block text-sm text-slate-500">
              覆核理由（Soft Stop 需填寫）
            </label>
            <textarea
              id="overrideReason"
              rows={2}
              value={overrideReason}
              onChange={(e) => onOverrideChange(e.target.value)}
              placeholder="例：已監測病患肌酸激酶指數，調整為低劑量併用"
              className="w-full rounded-lg border border-[#E3E6EB] px-3 py-2.5 text-sm outline-none focus:border-[#0E6B63]"
            />
            {overrideError && <p className="mt-1.5 text-[.76rem] text-[#B23A3A]">請先填寫覆核理由才能送出</p>}
          </div>
          <button
            onClick={onConfirmSoft}
            className="rounded-lg bg-[#0E6B63] px-4 py-2 text-sm font-medium text-white hover:bg-[#0A5850]"
          >
            確認送出並簽章
          </button>
        </div>
      )}

      {verdict.level === "safe" && (
        <button
          onClick={onConfirmSafe}
          className="rounded-lg bg-[#0E6B63] px-4 py-2 text-sm font-medium text-white hover:bg-[#0A5850]"
        >
          確認送出並簽章
        </button>
      )}
    </div>
  );
}

function OrderLog({ entries }: { entries: HisOrderLogEntry[] }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
        <ClipboardList size={15} />
        今日醫囑照會紀錄（本次模擬 Session）
      </h2>
      {entries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E3E6EB] bg-white/60 py-8 text-center text-sm text-slate-400">
          尚無已送出之醫囑紀錄
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#E3E6EB] bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E3E6EB] bg-slate-50 text-xs text-slate-400">
                <th className="px-4 py-2.5 font-medium">單號</th>
                <th className="px-4 py-2.5 font-medium">病患</th>
                <th className="px-4 py-2.5 font-medium">新增藥品</th>
                <th className="px-4 py-2.5 font-medium">檢核結果</th>
                <th className="px-4 py-2.5 font-medium">簽章時間</th>
                <th className="px-4 py-2.5 font-medium">簽章人</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.orderNo} className="border-b border-[#E3E6EB] last:border-0">
                  <td className="px-4 py-2.5 font-mono text-xs text-slate-400">{e.orderNo}</td>
                  <td className="px-4 py-2.5">{e.patientName}</td>
                  <td className="px-4 py-2.5">{e.drugNames.join("、")}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_STYLE[e.verdict.level].badge}`}
                    >
                      {e.verdict.level === "safe" ? "通過" : e.verdict.level === "soft" ? "Soft Stop（已覆核）" : "Hard Stop"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-slate-400">{e.signedAt}</td>
                  <td className="px-4 py-2.5 text-slate-500">{e.signedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
