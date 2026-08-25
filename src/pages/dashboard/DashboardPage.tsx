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
import { dashboardStats, recentTransactions } from "../../mock/data";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-textPrimary">
              Good morning, Kofi
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
          {dashboardStats.map((stat) => (
            <Card key={stat.label} className="p-5">
              <div className="text-sm text-textSecondary">{stat.label}</div>
              <div className="mt-4 text-3xl font-bold text-textPrimary">
                {stat.value}
              </div>
              <div className="mt-2 text-xs text-primary">{stat.change}</div>
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
                <div
                  key={transaction.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="text-lg font-semibold text-textPrimary">
                      {transaction.product}
                    </div>
                    <div className="mt-1 text-sm text-textSecondary">
                      {transaction.id} • {transaction.counterparty}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xl font-bold text-textPrimary">
                        GH₵ {transaction.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-textSecondary">
                        {transaction.role}
                      </div>
                    </div>
                    <StatusBadge status={transaction.status} />
                  </div>
                </div>
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
                    Protected
                  </div>
                </div>
              </div>
              <div className="text-sm text-textSecondary">
                Your active transactions are safe and protected until
                confirmation.
              </div>
            </Card>
            <Card className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-softGreen text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-textSecondary">
                    Available balance
                  </div>
                  <div className="font-semibold text-textPrimary">
                    GH₵ 45,800
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
                    Pending releases
                  </div>
                  <div className="font-semibold text-textPrimary">
                    GH₵ 21,500
                  </div>
                </div>
              </div>
              <div className="text-sm text-textSecondary">
                2 deals are awaiting confirmation.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
