import { useState } from "react";
import { CheckSquare, Check } from "lucide-react";
import { Card } from "./ui";
import type { ChecklistSection } from "../data/model";

export default function ChecklistBoard({
  initialSections,
  caseLabel,
}: {
  initialSections: ChecklistSection[];
  caseLabel: string;
}) {
  const [items, setItems] = useState(initialSections);
  const flat = items.flatMap((s) => s.items);
  const done = flat.filter((i) => i.checked).length;
  const pct = Math.round((done / flat.length) * 100);

  const toggle = (si: number, ii: number) => {
    setItems((prev) => {
      const next = prev.map((s) => ({ ...s, items: [...s.items] }));
      next[si].items[ii] = { ...next[si].items[ii], checked: !next[si].items[ii].checked };
      return next;
    });
  };

  return (
    <>
      <Card className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-slate-500">{caseLabel}</div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              必填完成：<span className="font-semibold text-amber-500">{done}/{flat.length}</span>
            </span>
            <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-sm font-semibold text-slate-700">{pct}%</span>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {items.map((section, si) => (
          <Card key={section.title}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <CheckSquare size={15} className="text-slate-400" />
              {section.title}
            </div>
            <div className="space-y-2">
              {section.items.map((item, ii) => (
                <button
                  key={item.label}
                  onClick={() => toggle(si, ii)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    item.checked
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        item.checked ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"
                      }`}
                    >
                      {item.checked && <Check size={13} />}
                    </span>
                    {item.label}
                  </span>
                  {!item.checked && item.required && (
                    <span className="shrink-0 rounded bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-500">
                      必填
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
