import { useState } from "react";
import { FolderOpen, Download, Search, UploadCloud, GitCompareArrows, Package, ChevronDown } from "lucide-react";
import { PageHeader, Card, Tabs } from "../components/ui";
import { DOC_FILES, DOC_ACCESS_LOG, RBAC_MATRIX, type DocFile } from "../data/model";

const TABS = [
  { key: "folders", label: "文件夾" },
  { key: "timeline", label: "版本時間軸" },
  { key: "access", label: "存取日誌" },
  { key: "crud", label: "角色 CRUD 矩陣" },
  { key: "tree", label: "版本樹狀圖" },
];

const FOLDERS = ["基本文件夾", "審查文件夾", "行政文件夾"] as const;

function DocCard({ doc }: { doc: DocFile }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <FolderOpen size={16} className="shrink-0 text-slate-400" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-medium text-slate-800">{doc.name}</span>
              {doc.isNew && (
                <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                  [NEW] {doc.latestVersion}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400">
              {doc.versions.length} 個版本 · 最新：{doc.versions[0].fileName}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Download size={13} />
            下載最新版
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50"
          >
            <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-100 px-4 py-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400">
                <th className="pb-1.5 pr-4 font-medium">版本</th>
                <th className="pb-1.5 pr-4 font-medium">日期</th>
                <th className="pb-1.5 pr-4 font-medium">上傳者</th>
                <th className="pb-1.5 font-medium">備註</th>
              </tr>
            </thead>
            <tbody>
              {doc.versions.map((v) => (
                <tr key={v.version} className="border-t border-slate-50">
                  <td className="py-1.5 pr-4 font-mono text-slate-600">{v.version}</td>
                  <td className="py-1.5 pr-4 text-slate-500">{v.date}</td>
                  <td className="py-1.5 pr-4 text-slate-500">{v.uploader}</td>
                  <td className="py-1.5 text-slate-500">{v.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function UploadZone() {
  return (
    <Card className="mb-4 border-dashed border-2 border-slate-200 bg-slate-50/50 text-center">
      <UploadCloud className="mx-auto mb-2 text-slate-300" size={28} />
      <div className="text-sm font-medium text-slate-600">拖曳檔案至此或點擊上傳</div>
      <div className="mt-1 text-xs text-slate-400">支援 PDF／DOCX，上傳後自動建立新版本並保留歷史版本</div>
      <button className="mt-3 rounded-lg bg-emerald-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-600">
        選擇檔案
      </button>
    </Card>
  );
}

function FoldersTab() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = DOC_FILES.filter(
    (d) =>
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.caseId.toLowerCase().includes(q) ||
      d.type.toLowerCase().includes(q) ||
      d.content.toLowerCase().includes(q)
  );

  return (
    <>
      <UploadZone />
      <div className="relative mb-6">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋文件名稱、案號、類型或內容關鍵字…"
          className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-emerald-400"
        />
      </div>

      {q && (
        <div className="mb-3 text-xs text-slate-400">
          找到 {filtered.length} 筆符合「{query}」的文件
        </div>
      )}

      {FOLDERS.map((folder) => {
        const docs = filtered.filter((d) => d.folder === folder);
        if (q && docs.length === 0) return null;
        return (
          <div key={folder} className="mb-6">
            <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FolderOpen size={15} className="text-slate-400" />
              {folder}
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-normal text-slate-500">
                {docs.length} 份文件
              </span>
            </div>
            <div className="space-y-2.5">
              {docs.map((d) => (
                <DocCard key={d.name + d.caseId} doc={d} />
              ))}
              {docs.length === 0 && <div className="text-sm text-slate-400">此文件夾尚無文件</div>}
            </div>
          </div>
        );
      })}
    </>
  );
}

function TimelineTab() {
  const allVersions = DOC_FILES.flatMap((d) => d.versions.map((v) => ({ ...v, doc: d.name, caseId: d.caseId })))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <Card>
      <div className="relative pl-6">
        <div className="absolute bottom-2 left-[9px] top-2 w-px bg-slate-200" />
        {allVersions.map((v, i) => (
          <div key={i} className="relative mb-5 last:mb-0">
            <div className="absolute -left-6 h-3 w-3 rounded-full border-2 border-emerald-500 bg-white" />
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-slate-800">{v.doc}</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-500">{v.version}</span>
              <span className="text-xs text-slate-400">{v.date}</span>
            </div>
            <div className="text-xs text-slate-500">
              {v.caseId} · {v.uploader} · {v.note}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AccessLogTab() {
  return (
    <Card className="!p-0 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
            <th className="px-5 py-3 font-medium">使用者</th>
            <th className="px-5 py-3 font-medium">動作</th>
            <th className="px-5 py-3 font-medium">文件</th>
            <th className="px-5 py-3 font-medium">時間</th>
          </tr>
        </thead>
        <tbody>
          {DOC_ACCESS_LOG.map((l, i) => (
            <tr key={i} className="border-b border-slate-100 last:border-0">
              <td className="px-5 py-3.5 text-slate-700">{l.user}</td>
              <td className="px-5 py-3.5">
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{l.action}</span>
              </td>
              <td className="px-5 py-3.5 text-slate-600">{l.doc}</td>
              <td className="px-5 py-3.5 text-slate-400">{l.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function CrudTab() {
  return (
    <Card>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs text-slate-400">
            <th className="pb-2 pr-4 font-medium">角色</th>
            <th className="pb-2 pr-4 font-medium">新增</th>
            <th className="pb-2 pr-4 font-medium">檢視</th>
            <th className="pb-2 pr-4 font-medium">下載</th>
            <th className="pb-2 font-medium">範圍</th>
          </tr>
        </thead>
        <tbody>
          {RBAC_MATRIX.map((r) => (
            <tr key={r.role} className="border-b border-slate-100 last:border-0">
              <td className="py-3 pr-4 font-medium text-slate-700">{r.role}</td>
              <td className="py-3 pr-4">{r.level <= 3 ? "✓" : r.level === 4 ? "本院/自身案件" : "—"}</td>
              <td className="py-3 pr-4">✓</td>
              <td className="py-3 pr-4">{r.level === 5 ? "—" : "✓"}</td>
              <td className="py-3 text-slate-500">{r.scope}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function TreeTab() {
  return (
    <div className="space-y-4">
      {DOC_FILES.filter((d) => d.versions.length > 1).map((d) => (
        <Card key={d.name + d.caseId}>
          <div className="mb-3 text-sm font-semibold text-slate-700">{d.name}</div>
          <div className="relative pl-4">
            <div className="absolute bottom-1 left-1 top-1 w-px bg-slate-200" />
            {d.versions
              .slice()
              .reverse()
              .map((v, i, arr) => (
                <div key={v.version} className="relative mb-3 flex items-center gap-3 last:mb-0">
                  <span
                    className={`absolute -left-4 h-2.5 w-2.5 rounded-full ${
                      i === arr.length - 1 ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  />
                  <span className="font-mono text-xs text-slate-500">{v.version}</span>
                  <span className="text-xs text-slate-400">{v.date}</span>
                  <span className="text-xs text-slate-600">{v.note}</span>
                </div>
              ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function DocCenter() {
  const [tab, setTab] = useState("folders");
  return (
    <div>
      <PageHeader
        title="文件中心"
        subtitle="§3.4 三大文件夾 · 統一版本號規則 · 版本時間軸 · 差異比較器 · 存取日誌"
      />
      <div className="mb-6 flex flex-wrap gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-600 hover:bg-slate-50">
          <GitCompareArrows size={14} />
          版本差異比較
        </button>
        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-600 hover:bg-slate-50">
          <Package size={14} />
          結案封裝包
        </button>
      </div>
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === "folders" && <FoldersTab />}
      {tab === "timeline" && <TimelineTab />}
      {tab === "access" && <AccessLogTab />}
      {tab === "crud" && <CrudTab />}
      {tab === "tree" && <TreeTab />}
    </div>
  );
}
