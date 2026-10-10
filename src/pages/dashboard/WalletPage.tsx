import { FormEvent, useState } from "react";
import { CheckCircle2, Plus, Wallet } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

type PayoutAccount = { network: string; phone: string; name: string; verified: boolean; isDefault: boolean };
const KEY = "safetra.demo.payout-accounts.v1";
const sampleAccounts: PayoutAccount[] = [{ network: "MTN", phone: "+233 ** *** 4567", name: "Kofi Mensah", verified: false, isDefault: true }];
const readAccounts = (): PayoutAccount[] => {
  const value = localStorage.getItem(KEY);
  if (!value) return sampleAccounts;
  try { return JSON.parse(value) as PayoutAccount[]; }
  catch { throw new Error("Local demo payout account data is corrupted. Clear this prototype's browser storage to reset it."); }
};
const settlements = [
  { reference: "DEMO-SET-55211", transaction: "ST-55211", amount: 11442.50, method: "MTN ·•••4567", status: "PENDING", date: "Demo record" },
  { reference: "DEMO-SET-77290", transaction: "ST-77290", amount: 9452.50, method: "Bank ·•••1024", status: "PROCESSING", date: "Demo record" },
  { reference: "DEMO-SET-66831", transaction: "ST-66831", amount: 17910, method: "MTN ·•••4567", status: "FAILED", date: "Demo record" },
];

export default function WalletPage() {
  const [accounts, setAccounts] = useState(readAccounts);
  const [showForm, setShowForm] = useState(false);
  const [network, setNetwork] = useState("MTN");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const save = (event: FormEvent) => {
    event.preventDefault();
    if (!/^(?:0[25]\d{8}|\+?233[25]\d{8})$/.test(phone.replace(/[\s()-]/g, ""))) { setFeedback("Enter a valid Ghana Mobile Money number, such as +233 24 123 4567."); return; }
    const next = [...accounts, { network, phone: `${phone.slice(0, 5)}••••${phone.slice(-4)}`, name, verified: false, isDefault: accounts.length === 0 }];
    localStorage.setItem(KEY, JSON.stringify(next));
    setAccounts(next);
    setPhone("");
    setName("");
    setShowForm(false);
    setFeedback("Demo payout account saved locally. It has not been verified with a provider.");
  };
  const setDefault = (index: number) => {
    const next = accounts.map((account, itemIndex) => ({ ...account, isDefault: index === itemIndex }));
    localStorage.setItem(KEY, JSON.stringify(next));
    setAccounts(next);
  };
  const remove = (index: number) => {
    if (!window.confirm("Remove this payout account from the local demo?")) return;
    const next = accounts.filter((_, itemIndex) => index !== itemIndex).map((account, itemIndex) => ({ ...account, isDefault: itemIndex === 0 }));
    localStorage.setItem(KEY, JSON.stringify(next));
    setAccounts(next);
  };
  return <DashboardLayout><div className="space-y-6">
    <header><h1 className="text-3xl font-bold">Payout accounts & settlement history</h1><p className="mt-2 text-textSecondary">Manage masked demo payout details and review sample settlement states. No payout is initiated here.</p></header>
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-semibold">Payout accounts</h2><p className="mt-1 text-sm text-textSecondary">Recipient codes and provider metadata are never editable here.</p></div><Button onClick={() => setShowForm((value) => !value)}><Plus className="mr-2 h-4 w-4" />Add account</Button></div>
        {showForm && <form onSubmit={save} className="mt-5 space-y-3 rounded-xl bg-slate-50 p-4"><label className="block text-sm font-medium">Account type<select disabled className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2"><option>Ghana Mobile Money</option></select></label><label className="block text-sm font-medium">Network<select className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2" value={network} onChange={(event) => setNetwork(event.target.value)}><option>MTN</option><option>TELECEL</option><option>AIRTELTIGO</option></select></label><label className="block text-sm font-medium">Ghana phone number<input required className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+233 24 123 4567" /></label><label className="block text-sm font-medium">Account holder name<input required minLength={2} className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2" value={name} onChange={(event) => setName(event.target.value)} /></label><Button type="submit">Save demo account</Button></form>}
        {feedback && <p role="status" className="mt-3 text-sm text-textSecondary">{feedback}</p>}
        <div className="mt-4 space-y-3">{accounts.length ? accounts.map((account, index) => <div key={`${account.phone}-${index}`} className="rounded-xl border border-border p-4"><div className="flex items-start justify-between gap-3"><div className="flex gap-3"><Wallet className="mt-1 h-5 w-5 text-primary" /><div><p className="font-semibold">{account.network} Mobile Money {account.isDefault && <span className="ml-1 text-xs text-primary">Default</span>}</p><p className="mt-1 text-sm text-textSecondary">{account.name} · {account.phone}</p><p className="mt-1 text-xs">{account.verified ? "VERIFIED" : "PENDING verification (demo)"}</p></div></div><CheckCircle2 className="h-5 w-5 text-warning" /></div><div className="mt-3 flex gap-4 text-sm"><button className="font-medium text-primary" onClick={() => setDefault(index)} disabled={account.isDefault}>Set default</button><button className="font-medium text-danger" onClick={() => remove(index)}>Remove</button></div></div>) : <p className="rounded-xl bg-slate-50 p-4 text-sm text-textSecondary">No payout accounts saved in this browser.</p>}</div>
        <p className="mt-4 text-xs text-textSecondary">Provider, currency, account types, and network options mirror the backend model. Bank account fields are excluded until its validation requirements are confirmed.</p>
      </Card>
      <Card className="p-5"><h2 className="text-lg font-semibold">Settlement history · samples</h2><p className="mt-1 text-sm text-textSecondary">A completed trade and a confirmed payout are separate events.</p><div className="mt-4 space-y-3">{settlements.map((item) => <div key={item.reference} className="rounded-xl border border-border p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{item.reference}</p><p className="mt-1 text-xs text-textSecondary">Transaction {item.transaction} · {item.method}</p></div><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold">{item.status}</span></div><div className="mt-3 flex justify-between text-sm"><span>{item.date}</span><span className="font-semibold">GH₵ {item.amount.toLocaleString("en-GH", { minimumFractionDigits: 2 })}</span></div>{item.status === "FAILED" && <p className="mt-2 text-xs text-danger">Sample reason: payout details require review.</p>}</div>)}</div><p className="mt-4 rounded-lg bg-softGreen/50 p-3 text-xs text-textSecondary">Demo only. Settlement data is not connected to real transfers or balances.</p></Card>
    </div>
  </div></DashboardLayout>;
}
