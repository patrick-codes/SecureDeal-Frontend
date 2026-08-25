import { Search } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/status/StatusBadge";
import { recentTransactions } from "../../mock/data";

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">
              Transaction history
            </h1>
            <p className="mt-2 text-textSecondary">
              Track buying, selling, and protected deals in one place.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-2.5">
            <Search className="h-4 w-4 text-textSecondary" />
            <input
              className="w-56 border-none bg-transparent text-sm outline-none"
              placeholder="Search by ID or product"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "All",
            "Buying",
            "Selling",
            "Active",
            "Completed",
            "Disputed",
            "Cancelled",
          ].map((filter) => (
            <button
              key={filter}
              className={`rounded-full px-3 py-2 text-sm font-medium ${filter === "All" ? "bg-primary text-white" : "bg-white text-textSecondary border border-border"}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="hidden grid-cols-[1.3fr_0.8fr_0.8fr_1fr_0.8fr] gap-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-textSecondary md:grid">
            <span>Transaction</span>
            <span>Buyer / Seller</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Date</span>
          </div>

          <div className="divide-y divide-border">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid gap-3 px-5 py-4 md:grid-cols-[1.3fr_0.8fr_0.8fr_1fr_0.8fr] md:items-center"
              >
                <div>
                  <div className="font-semibold text-textPrimary">
                    {transaction.product}
                  </div>
                  <div className="mt-1 text-sm text-textSecondary">
                    {transaction.id}
                  </div>
                </div>
                <div className="text-sm text-textSecondary">
                  {transaction.counterparty}
                </div>
                <div className="font-semibold text-textPrimary">
                  GH₵ {transaction.amount.toLocaleString()}
                </div>
                <div>
                  <StatusBadge status={transaction.status} />
                </div>
                <div className="text-sm text-textSecondary">
                  {transaction.date}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
