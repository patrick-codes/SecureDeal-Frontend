import {
  CheckCircle,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

const benefits = [
  "Follow payment verification before dispatch",
  "Keep clear records of agreed transaction terms",
  "Track delivery and inspection milestones",
  "Use the structured dispute workflow if a deal goes wrong",
  "Share a transaction invitation with your buyer",
];

export default function SellersPage() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              For sellers
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-textPrimary">
              Close more sales without asking customers to trust you.
            </h1>
            <p className="mt-5 text-lg leading-8 text-textSecondary">
              Your customer may not know you yet. SafeTra gives them a safe way
              to pay while protecting you from non-payment.
            </p>
            <div className="mt-7 space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-3"
                >
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium text-textPrimary">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-5">
            <div className="rounded-[26px] border border-border bg-softGreen/50 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-sm text-textSecondary">
                    Seller dashboard preview
                  </div>
                  <div className="mt-2 text-2xl font-bold text-textPrimary">
                    Demo account
                  </div>
                </div>
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Payment status", value: "Separate from trade", icon: Wallet },
                  { label: "Buyer identity", value: "Backend-verified", icon: Users },
                  { label: "Settlement", value: "Tracked separately", icon: ShieldCheck },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-border bg-white p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-softGreen text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-textSecondary">
                        {label}
                      </span>
                    </div>
                    <span className="font-semibold text-textPrimary">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <Button asChild className="mt-6 w-full">
                <Link to="/login">Open seller demo</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
