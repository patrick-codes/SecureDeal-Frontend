import {
  ArrowRight,
  Bell,
  CreditCard,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/status/StatusBadge";
import { formatGhs, getDemoSession, getMockTransactions } from "../../services/mockSafetra";
import { useMemo } from "react";

export default function DashboardPage() {
  const session = getDemoSession();
  const allTransactions = getMockTransactions();
  const stats = useMemo(() => [
    { label: "Active trades", value: allTransactions.filter((item) => !["RELEASED", "REFUNDED", "PARTIALLY_SETTLED", "CANCELLED", "EXPIRED"].includes(item.status)).length, detail: "Local demo records" },
    { label: "Completed trades", value: allTransactions.filter((item) => item.status === "RELEASED").length, detail: "Released state only" },
    { label: "Awaiting your action", value: allTransactions.filter((item) => (item.buyerName === "Kofi Mensah" && ["INVITED", "PAYMENT_PENDING", "DELIVERED", "INSPECTION"].includes(item.status)) || (item.sellerName === "Kofi Mensah" && ["FUNDED", "ACCEPTED", "SELLER_PREPARING", "SHIPPED"].includes(item.status))).length, detail: "Based on demo role" },
    { label: "Disputes", value: allTransactions.filter((item) => ["DISPUTED", "UNDER_REVIEW"].includes(item.status)).length, detail: "Demo dispute records" },
  ], [allTransactions]);
  const recentTransactions = allTransactions.slice(0, 4);
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-textPrimary">
              Welcome, {session?.name.split(" ")[0] ?? "there"}
            </h1>
            <p className="mt-2 text-textSecondary">
              Here&apos;s what&apos;s happening with your transactions.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-2">
            <Bell className="h-4 w-4 text-textSecondary" />
            <span className="text-sm font-medium text-textPrimary">
              3 new updates
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-5">
              <div className="text-sm text-textSecondary">{stat.label}</div>
              <div className="mt-4 text-3xl font-bold text-textPrimary">
                {stat.value}
              </div>
              <div className="mt-2 text-xs text-primary">{stat.detail}</div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-textPrimary">
                Recent Transactions
              </h2>
              <Link
                to="/dashboard/transactions"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <Link
                  key={transaction.id}
                  to={`/dashboard/transactions/${transaction.id}`}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="text-lg font-semibold text-textPrimary">
                      {transaction.productName}
                    </div>
                    <div className="mt-1 text-sm text-textSecondary">
                      {transaction.id} • {transaction.buyerName === "Kofi Mensah" ? transaction.sellerName : transaction.buyerName}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xl font-bold text-textPrimary">{formatGhs(transaction.amount)}</div>
                      <div className="text-xs text-textSecondary">
                        {transaction.buyerName === "Kofi Mensah" ? "Buyer" : "Seller"}
                      </div>
                    </div>
                    <StatusBadge status={transaction.status} />
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-softGreen text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-textSecondary">Trust status</div>
                  <div className="font-semibold text-textPrimary">
                    Demo only
                  </div>
                </div>
              </div>
              <div className="text-sm text-textSecondary">
                Transaction and payment states shown here are local examples—not proof that funds have been received or held.
              </div>
            </Card>
            <Card className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-softGreen text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-textSecondary">
                    Payout account
                  </div>
                  <div className="font-semibold text-textPrimary">
                    {session?.role === "USER" ? "Manage masked details" : "Role view"}
                  </div>
                </div>
              </div>
              <Button asChild className="mt-3 w-full px-4 py-2.5 text-sm">
                <Link to="/dashboard/wallet">View settlements</Link>
              </Button>
            </Card>
            <Card className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-softGreen text-primary">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-textSecondary">
                    Settlement status
                  </div>
                  <div className="font-semibold text-textPrimary">
                    {allTransactions.filter((item) => item.status === "RELEASE_PENDING").length} pending
                  </div>
                </div>
              </div>
              <div className="text-sm text-textSecondary">
                A released transaction does not mean that a payout succeeded. See sample settlement records for detail.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
