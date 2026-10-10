import { Link, NavLink } from "react-router-dom";
import logoImage from "../../images/logo.png";
import {
  LayoutGrid,
  FileText,
  Plus,
  AlertTriangle,
  MessageCircle,
  Wallet,
  Bell,
  User,
  Settings,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { getDemoSession } from "../../services/mockSafetra";

const navItems = [
  { label: "Overview", to: "/dashboard", icon: LayoutGrid },
  { label: "Transactions", to: "/dashboard/transactions", icon: FileText },
  {
    label: "Create Transaction",
    to: "/dashboard/create-transaction",
    icon: Plus,
  },
  { label: "Disputes", to: "/dashboard/disputes", icon: AlertTriangle },
  { label: "Messages", to: "/dashboard/messages", icon: MessageCircle },
  { label: "Wallet / Settlements", to: "/dashboard/wallet", icon: Wallet },
  { label: "Notifications", to: "/dashboard/notifications", icon: Bell },
  { label: "Profile", to: "/dashboard/profile", icon: User },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const session = getDemoSession();
  const isAdmin = session && session.role !== "USER";
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#08152F] text-white lg:flex lg:flex-col">
      <div className="flex items-center gap-3 border-b border-white/10 p-5">
        <img
          src={logoImage}
          alt="SafeTra logo"
          className="h-10 w-10 rounded-xl object-cover"
        />
        <div>
          <div className="text-lg font-bold text-white">SafeTra</div>
          <div className="text-xs text-slate-300">Demo account · no live funds</div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? "bg-white text-primary shadow-sm" : "text-slate-200 hover:bg-white/5 hover:text-white"}`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
        {isAdmin && <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? "bg-white text-primary shadow-sm" : "text-slate-200 hover:bg-white/5 hover:text-white"}`}><ShieldCheck className="h-4 w-4" />Operations console</NavLink>}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link to="/contact" className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3 text-sm font-medium text-slate-100 hover:bg-white/10">
          <HelpCircle className="h-4 w-4" />
          Help & Support
        </Link>
      </div>
    </aside>
  );
}
