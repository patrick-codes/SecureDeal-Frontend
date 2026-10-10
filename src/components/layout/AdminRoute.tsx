import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { DemoRole, getDemoSession } from "../../services/mockSafetra";

export default function AdminRoute({ children, roles }: { children: ReactNode; roles?: DemoRole[] }) {
  const session = getDemoSession();
  if (!session) return <Navigate to="/login" replace />;
  if (session.role === "USER" || (roles && !roles.includes(session.role))) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
