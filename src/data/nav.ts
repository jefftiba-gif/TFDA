import type { RoleKey } from "./model";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Database,
  Activity,
  Scale,
  Layers,
  FolderOpen,
  AlertTriangle,
  Globe,
  Clock,
  Lock,
  Cpu,
  BellRing,
  ListChecks,
  FileCheck2,
  MonitorCheck,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  key: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

const dashboard: NavItem = { key: "dashboard", label: "儀表板", icon: LayoutDashboard, path: "/app/dashboard" };
const caseManagement: NavItem = { key: "cases", label: "案件管理", icon: FileText, path: "/app/cases" };
const comms: NavItem = { key: "comms", label: "通訊中心", icon: MessageSquare, path: "/app/comms" };
const stats: NavItem = { key: "stats", label: "統計報表", icon: BarChart3, path: "/app/stats" };
const cirb: NavItem = { key: "cirb", label: "c-IRB 整合", icon: Database, path: "/app/cirb" };
const tracking: NavItem = { key: "tracking", label: "流程追蹤", icon: Activity, path: "/app/tracking" };
const conflict: NavItem = { key: "conflict", label: "衝突解決機制", icon: Scale, path: "/app/conflict" };
const processControl: NavItem = { key: "process-control", label: "流程控制架構", icon: Layers, path: "/app/process-control" };
const docCenter: NavItem = { key: "docs", label: "文件中心", icon: FolderOpen, path: "/app/docs" };
const timeliness: NavItem = { key: "timeliness", label: "時效監控", icon: Clock, path: "/app/timeliness" };
const sysIntegration: NavItem = { key: "sys-integration", label: "系統整合", icon: Globe, path: "/app/sys-integration" };
const milestones: NavItem = { key: "milestones", label: "關鍵時程總表", icon: AlertTriangle, path: "/app/milestones" };
const threeTierLock: NavItem = { key: "three-tier-lock", label: "三層鎖定機制", icon: Lock, path: "/app/three-tier-lock" };
const techArch: NavItem = { key: "tech-arch", label: "技術架構說明", icon: Cpu, path: "/app/tech-arch" };
const notifyModule: NavItem = { key: "notify", label: "通知稽催模組", icon: BellRing, path: "/app/notify" };
const reviewOps: NavItem = { key: "review-ops", label: "審查作業", icon: ClipboardList, path: "/app/review-ops" };
const revisionRequests: NavItem = { key: "revisions", label: "補件需求單", icon: AlertCircle, path: "/app/revisions" };
const simpleChecklist: NavItem = { key: "simple-checklist", label: "簡審查檢表", icon: ListChecks, path: "/app/simple-checklist" };
const consentChecklist: NavItem = { key: "consent-checklist", label: "同意書查檢表", icon: FileCheck2, path: "/app/consent-checklist" };
const reviewWorkstation: NavItem = { key: "review-workstation", label: "審查工作站", icon: MonitorCheck, path: "/app/review-workstation" };

export const NAV_BY_ROLE: Record<RoleKey, NavItem[]> = {
  tfda: [
    dashboard, caseManagement, comms, stats, cirb, tracking, conflict,
    processControl, docCenter, timeliness, sysIntegration, milestones,
    threeTierLock, techArch, notifyModule,
  ],
  primary: [
    dashboard, caseManagement, reviewOps, comms, conflict, docCenter,
    revisionRequests, simpleChecklist, consentChecklist, reviewWorkstation,
  ],
  secondary: [
    dashboard, caseManagement, reviewOps, comms, conflict, docCenter,
    revisionRequests, simpleChecklist, consentChecklist,
  ],
  sponsor: [
    dashboard, caseManagement, comms, docCenter, revisionRequests, tracking,
  ],
  cde: [
    dashboard, caseManagement, cirb, tracking, stats, sysIntegration, comms,
  ],
  sysadmin: [
    dashboard, sysIntegration, threeTierLock, techArch, docCenter, notifyModule,
  ],
};
