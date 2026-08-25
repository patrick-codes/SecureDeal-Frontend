import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImage from "../../images/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "For Buyers", to: "/for-buyers" },
  { label: "For Sellers", to: "/for-sellers" },
  { label: "Pricing", to: "/pricing" },
  { label: "Security", to: "/security" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
              <img
                src={logoImage}
                alt="SafeTra logo"
                className="h-7 w-7 rounded-lg object-cover"
              />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-textPrimary">
                SafeTra
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <div className="glass-panel flex items-center gap-2 rounded-full px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.15)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-textSecondary">
                Live escrow
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-1.5 rounded-full border border-primary/10 bg-slate-100/80 p-1.5 shadow-sm md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-all ${isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "text-textSecondary hover:bg-white hover:text-primary"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="text-sm font-medium text-textSecondary transition hover:text-primary"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-[#0e2d74]"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-textPrimary shadow-sm md:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <nav className="space-y-2 border-t border-border bg-white/80 pb-4 pt-3 backdrop-blur-xl md:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2.5 text-sm font-medium ${isActive ? "bg-primary text-white" : "text-textSecondary hover:bg-slate-100 hover:text-primary"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="grid gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-border px-3 py-2.5 text-center text-sm font-medium text-textPrimary"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-primary px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#0e2d74]"
              >
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
