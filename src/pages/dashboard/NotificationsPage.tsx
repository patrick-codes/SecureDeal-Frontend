import { useState } from "react";
import { BellRing, Check } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const mockNotifications = [
  { id: "funded", category: "Payment", title: "Payment verification recorded", detail: "A sample transaction moved to FUNDED in this local demo.", time: "Demo event", href: "/dashboard/transactions/ST-83921" },
  { id: "shipped", category: "Delivery", title: "Seller marked the item shipped", detail: "Review the sample delivery status and transaction timeline.", time: "Demo event", href: "/dashboard/transactions/ST-83921" },
  { id: "inspection", category: "Action needed", title: "Inspection period is active", detail: "A buyer can report a problem or confirm delivery at the appropriate stage.", time: "Demo event", href: "/dashboard/transactions/ST-77290" },
  { id: "dispute", category: "Dispute", title: "A demo dispute is under review", detail: "Normal release actions are interrupted while the issue is reviewed.", time: "Demo event", href: "/dashboard/transactions/ST-66831" },
];
const KEY = "safetra.demo.read-notifications.v1";
const read = () => {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[]); }
  catch { return new Set<string>(); }
};

export default function NotificationsPage() {
  const [readIds, setReadIds] = useState(read);
  const markRead = (id: string) => {
    const next = new Set(readIds);
    next.add(id);
    localStorage.setItem(KEY, JSON.stringify([...next]));
    setReadIds(next);
  };
  const markAll = () => {
    const next = new Set(mockNotifications.map((item) => item.id));
    localStorage.setItem(KEY, JSON.stringify([...next]));
    setReadIds(next);
  };
  return <DashboardLayout><div className="space-y-6">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-softGreen text-primary"><BellRing className="h-5 w-5" /></div><div><h1 className="text-3xl font-bold">Notifications</h1><p className="text-sm text-textSecondary">Local samples only. No email, SMS, push, or WhatsApp is sent.</p></div></div><Button variant="secondary" onClick={markAll}><Check className="mr-2 h-4 w-4" />Mark all read</Button></header>
    <div className="space-y-3">{mockNotifications.map((item) => { const isRead = readIds.has(item.id); return <Card key={item.id} className={`p-5 ${isRead ? "opacity-75" : "border-primary/30"}`}><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="flex gap-3"><span aria-label={isRead ? "Read" : "Unread"} className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${isRead ? "bg-slate-300" : "bg-primary"}`} /><div><p className="text-xs font-semibold uppercase tracking-wide text-primary">{item.category}</p><h2 className="mt-1 font-semibold">{item.title}</h2><p className="mt-1 text-sm text-textSecondary">{item.detail}</p><p className="mt-2 text-xs text-textSecondary">{item.time}</p></div></div><div className="flex gap-3 pl-5 sm:pl-0"><Link onClick={() => markRead(item.id)} to={item.href} className="text-sm font-semibold text-primary">View transaction</Link>{!isRead && <button className="text-sm text-textSecondary underline" onClick={() => markRead(item.id)}>Mark read</button>}</div></div></Card>; })}</div>
  </div></DashboardLayout>;
}
