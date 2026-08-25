import { CheckCircle2, Lock, ShieldCheck, Wallet, Search } from "lucide-react";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const benefits = [
  "Your payment is protected",
  "Seller doesn’t receive money immediately",
  "Clear transaction terms",
  "Inspection period",
  "Dispute protection",
  "Transaction history",
];

export default function BuyersPage() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              For buyers
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-textPrimary">
              Buy with confidence, even from strangers.
            </h1>
            <div className="mt-6 space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="font-medium text-textPrimary">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden p-0">
            <div className="border-b border-border bg-softGreen/40 p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-textSecondary">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Buyer overview
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-primary">
                  Protected
                </span>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-textSecondary">
                      iPhone 15 Pro
                    </div>
                    <div className="mt-2 text-2xl font-bold text-textPrimary">
                      GH₵ 12,000
                    </div>
                  </div>
                  <div className="rounded-xl bg-primary/10 p-2 text-primary">
                    <Wallet />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              {[
                { label: "Payment status", value: "Secured", icon: Lock },
                { label: "Seller", value: "Kwame Mensah", icon: Search },
                {
                  label: "Delivery",
                  value: "Courier dispatch",
                  icon: ShieldCheck,
                },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-border bg-slate-50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-textSecondary">{label}</span>
                  </div>
                  <span className="font-semibold text-textPrimary">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-5">
              <Button asChild className="w-full">
                <a href="/dashboard/transactions/SD-83921">
                  Review transaction
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
