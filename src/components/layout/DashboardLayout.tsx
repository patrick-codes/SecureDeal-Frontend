import { ReactNode } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { clearDemoSession, getDemoSession } from "../../services/mockSafetra";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const session = getDemoSession();
  const signOut = () => {
    if (window.confirm("Sign out of this local demo session?")) {
      clearDemoSession();
      navigate("/login");
    }
  };
  if (!session) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-textPrimary">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <header className="border-b border-border bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-textSecondary sm:text-xs">
                  SafeTra dashboard
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold">{session?.name ?? "Demo user"}</div>
                  <div className="text-xs text-textSecondary">{session?.role ?? "USER"} · mock session</div>
                </div>
                <button type="button" onClick={signOut} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-primary hover:bg-slate-50">Sign out</button>
              </div>
            </div>
          </header>
          <nav aria-label="Dashboard navigation" className="flex gap-2 overflow-x-auto border-b border-border bg-white px-4 py-2 lg:hidden">
            {[["Overview", "/dashboard"], ["Trades", "/dashboard/transactions"], ["Create", "/dashboard/create-transaction"], ["Disputes", "/dashboard/disputes"], ["Messages", "/dashboard/messages"], ["Payouts", "/dashboard/wallet"], ["Notifications", "/dashboard/notifications"], ["Profile", "/dashboard/profile"], ["Settings", "/dashboard/settings"], ...(session.role !== "USER" ? [["Operations", "/admin"]] : [])].map(([label, to]) => <NavLink key={to} to={to} end={to === "/dashboard"} className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold ${isActive ? "bg-primary text-white" : "text-textSecondary hover:bg-slate-100"}`}>{label}</NavLink>)}
          </nav>
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
