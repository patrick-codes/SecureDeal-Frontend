import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
                <div className="rounded-full border border-border bg-softBlue px-3 py-1.5 text-xs font-semibold text-primary">
                  Kofi
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  K
                </div>
              </div>
            </div>
          </header>
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
