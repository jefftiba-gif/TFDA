import type { ComponentType } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import AppLayout from "./components/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import ProcessControl from "./pages/ProcessControl";
import SimpleReviewChecklist from "./pages/SimpleReviewChecklist";
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
  "process-control": ProcessControl,
  "simple-checklist": SimpleReviewChecklist,
};

export default function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
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
    </BrowserRouter>
  );
}
