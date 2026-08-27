import type { ComponentType } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import AppLayout from "./components/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import Comms from "./pages/Comms";
import Stats from "./pages/Stats";
import CirbIntegration from "./pages/CirbIntegration";
import ProcessTracking from "./pages/ProcessTracking";
import ConflictResolution from "./pages/ConflictResolution";
import ProcessControl from "./pages/ProcessControl";
import DocCenter from "./pages/DocCenter";
import Timeliness from "./pages/Timeliness";
import SysIntegration from "./pages/SysIntegration";
import Milestones from "./pages/Milestones";
import ThreeTierLock from "./pages/ThreeTierLock";
import TechArch from "./pages/TechArch";
import NotifyModule from "./pages/NotifyModule";
import ReviewOps from "./pages/ReviewOps";
import RevisionRequests from "./pages/RevisionRequests";
import SimpleReviewChecklist from "./pages/SimpleReviewChecklist";
import ConsentChecklist from "./pages/ConsentChecklist";
import ReviewWorkstation from "./pages/ReviewWorkstation";
import Placeholder from "./pages/Placeholder";
import { NAV_BY_ROLE } from "./data/nav";

// Collect every distinct nav path across all roles so each has a route,
// even if the current role's sidebar doesn't show it.
const ALL_NAV_ITEMS = Array.from(
  new Map(
    Object.values(NAV_BY_ROLE)
      .flat()
      .map((item) => [item.key, item])
  ).values()
);

const BUILT_PAGES: Record<string, ComponentType> = {
  dashboard: Dashboard,
  cases: Cases,
  comms: Comms,
  stats: Stats,
  cirb: CirbIntegration,
  tracking: ProcessTracking,
  conflict: ConflictResolution,
  "process-control": ProcessControl,
  docs: DocCenter,
  timeliness: Timeliness,
  "sys-integration": SysIntegration,
  milestones: Milestones,
  "three-tier-lock": ThreeTierLock,
  "tech-arch": TechArch,
  notify: NotifyModule,
  "review-ops": ReviewOps,
  revisions: RevisionRequests,
  "simple-checklist": SimpleReviewChecklist,
  "consent-checklist": ConsentChecklist,
  "review-workstation": ReviewWorkstation,
};

export default function App() {
  return (
    <HashRouter>
      <RoleProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="cases/:id" element={<CaseDetail />} />
            {ALL_NAV_ITEMS.map((item) => {
              const Page = BUILT_PAGES[item.key];
              const relative = item.path.replace("/app/", "");
              return (
                <Route
                  key={item.key}
                  path={relative}
                  element={Page ? <Page /> : <Placeholder title={item.label} />}
                />
              );
            })}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RoleProvider>
    </HashRouter>
  );
}
