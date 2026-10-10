import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/status/StatusBadge";
import { formatGhs, getMockTransactions, MockTransaction } from "../../services/mockSafetra";

type Filter = "All" | "Buying" | "Selling" | "Active" | "Disputed" | "Closed";
const closed = new Set(["RELEASED", "REFUNDED", "PARTIALLY_SETTLED", "CANCELLED", "EXPIRED"]);

export default function TransactionsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const transactions = getMockTransactions();
  const visible = useMemo(() => transactions.filter((transaction: MockTransaction) => {
    const query = search.toLowerCase();
    const matchesSearch = `${transaction.id} ${transaction.productName} ${transaction.buyerName} ${transaction.sellerName}`.toLowerCase().includes(query);
    const matchesFilter = filter === "All"
      || (filter === "Buying" && transaction.buyerName === "Kofi Mensah")
      || (filter === "Selling" && transaction.sellerName === "Kofi Mensah")
      || (filter === "Disputed" && ["DISPUTED", "UNDER_REVIEW"].includes(transaction.status))
      || (filter === "Closed" && closed.has(transaction.status))
      || (filter === "Active" && !closed.has(transaction.status));
    return matchesSearch && matchesFilter;
  }), [transactions, filter, search]);
  const filters: Filter[] = ["All", "Buying", "Selling", "Active", "Disputed", "Closed"];
  return <DashboardLayout>
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h1 className="text-3xl font-bold">Transactions</h1><p className="mt-2 text-textSecondary">Track the demo trades attached to this browser.</p></div><label className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5"><Search className="h-4 w-4 text-textSecondary" /><span className="sr-only">Search transactions</span><input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full bg-transparent text-sm outline-none md:w-56" placeholder="Reference, product, party" /></label></header>
      <div className="flex flex-wrap gap-2" aria-label="Filter transactions">{filters.map((item) => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)} className={`rounded-full border px-3 py-2 text-sm font-medium ${filter === item ? "border-primary bg-primary text-white" : "border-border bg-white text-textSecondary"}`}>{item}</button>)}</div>
      {visible.length === 0 ? <Card className="p-8 text-center"><h2 className="font-semibold">No matching trades</h2><p className="mt-2 text-sm text-textSecondary">Try another search or filter, or create a new invitation.</p><Link to="/dashboard/create-transaction" className="mt-4 inline-block font-semibold text-primary">Create a trade</Link></Card> : <Card className="overflow-hidden"><div className="hidden grid-cols-[1.3fr_0.8fr_0.7fr_1fr] gap-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-textSecondary md:grid"><span>Transaction</span><span>Role / counterparty</span><span>Amount</span><span>State</span></div><div className="divide-y divide-border">{visible.map((transaction) => {
        const isBuyer = transaction.buyerName === "Kofi Mensah";
        const other = isBuyer ? transaction.sellerName : transaction.buyerName;
        return <Link key={transaction.id} to={`/dashboard/transactions/${transaction.id}`} className="grid gap-3 px-5 py-4 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:grid-cols-[1.3fr_0.8fr_0.7fr_1fr] md:items-center"><div><p className="font-semibold">{transaction.productName}</p><p className="mt-1 text-sm text-textSecondary">{transaction.id}</p></div><div><p className="text-sm">{isBuyer ? "Buying" : "Selling"}</p><p className="text-xs text-textSecondary">{other}</p></div><div className="font-semibold">{formatGhs(transaction.amount)}</div><div><StatusBadge status={transaction.status} /></div></Link>;
      })}</div></Card>}
    </div>
  </DashboardLayout>;
}
