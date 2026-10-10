import {
  ArrowRight,
  Check,
  CircleDashed,
  CreditCard,
  PackageCheck,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const steps = [
  {
    number: "01",
    title: "Create the deal",
    text: "Agree on the product, price and delivery terms.",
    icon: CircleDashed,
  },
  {
    number: "02",
    title: "Buyer pays",
    text: "The payment provider verifies payment before the workflow records a funded state.",
    icon: CreditCard,
  },
  {
    number: "03",
    title: "Seller delivers",
    text: "Seller ships or delivers the item.",
    icon: Truck,
  },
  {
    number: "04",
    title: "Buyer confirms",
    text: "Buyer confirms delivery; release and seller settlement then follow separate workflow states.",
    icon: PackageCheck,
  },
];

export default function HowItWorksPage() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-textPrimary">
            A simple, protected transaction flow
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {steps.map(({ number, title, text, icon: Icon }) => (
            <Card key={number} className="p-6">
              <div className="mb-5 text-sm font-semibold text-primary">
                {number}
              </div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-softGreen text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-textPrimary">
                {title}
              </h3>
              <p className="text-textSecondary">{text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid gap-8 rounded-[28px] border border-border bg-white p-6 shadow-card lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-textSecondary">
                  Transaction timeline
                </p>
                <h3 className="mt-2 text-2xl font-bold text-textPrimary">
                  Secure payment journey
                </h3>
              </div>
              <span className="rounded-full bg-lightGreen px-3 py-1.5 text-xs font-semibold text-primary">
                Demo flow
              </span>
            </div>
            <div className="space-y-5">
              {[
                ["Create the deal", "Buyer and seller agree on terms"],
                ["Buyer pays", "Provider payment verification; escrow state is tracked separately"],
                ["Seller delivers", "Item is shipped or provided"],
                ["Buyer confirms", "Release can enter a pending settlement workflow"],
              ].map(([title, text], index) => (
                <div key={title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                      {index + 1}
                    </div>
                    {index < 3 && <div className="mt-2 h-12 w-px bg-border" />}
                  </div>
                  <div className="flex-1 rounded-2xl border border-border bg-softGreen/50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-textPrimary">
                        {title}
                      </div>
                      <Check className="h-5 w-5 text-success" />
                    </div>
                    <div className="mt-1 text-sm text-textSecondary">
                      {text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] bg-primary p-6 text-white">
            <p className="text-sm uppercase tracking-[0.18em] text-white/80">
              Why it matters
            </p>
            <h3 className="mt-4 text-3xl font-bold">No trust drama.</h3>
            <p className="mt-4 text-white/80">
              The process keeps everyone aligned and gives both parties a clear
              path from deal to release.
            </p>
            <div className="mt-8 space-y-3">
              {["Clear milestones", "Dispute review workflow", "Settlement status visibility"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2"
                  >
                    <Check className="h-4 w-4 text-white" />
                    <span>{item}</span>
                  </div>
                ),
              )}
            </div>
            <Button
              asChild
              variant="secondary"
              className="mt-8 h-12 bg-white text-primary hover:bg-slate-100"
            >
              <Link to="/register">Start a secure deal</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
