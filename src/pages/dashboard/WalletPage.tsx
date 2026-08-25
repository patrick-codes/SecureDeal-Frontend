import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet as WalletIcon,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";

const activity = [
  {
    type: "Funds secured",
    amount: "+GH₵ 12,600",
    date: "Today",
    direction: "in",
  },
  {
    type: "Seller payout",
    amount: "-GH₵ 9,500",
    date: "Yesterday",
    direction: "out",
  },
  {
    type: "Dispute hold",
    amount: "GH₵ 2,400",
    date: "2 days ago",
    direction: "hold",
  },
];

export default function WalletPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">
            Wallet & settlements
          </h1>
          <p className="mt-2 text-textSecondary">
            Monitor your protected balances and payout activity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-5">
            <div className="text-sm text-textSecondary">Available balance</div>
            <div className="mt-3 text-3xl font-bold text-textPrimary">
              GH₵ 45,800
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-sm text-textSecondary">Pending settlement</div>
            <div className="mt-3 text-3xl font-bold text-textPrimary">
              GH₵ 21,500
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-sm text-textSecondary">This month</div>
            <div className="mt-3 text-3xl font-bold text-textPrimary">
              GH₵ 84,200
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-softGreen text-primary">
              <WalletIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-textPrimary">
                Recent activity
              </div>
              <div className="text-sm text-textSecondary">
                Protected transactions and settlements
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {activity.map((item) => (
              <div
                key={item.type}
                className="flex items-center justify-between rounded-2xl border border-border bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.direction === "in" ? "bg-success/10 text-success" : item.direction === "out" ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"}`}
                  >
                    {item.direction === "in" ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : item.direction === "out" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <WalletIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-textPrimary">
                      {item.type}
                    </div>
                    <div className="text-sm text-textSecondary">
                      {item.date}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-textPrimary">{item.amount}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
