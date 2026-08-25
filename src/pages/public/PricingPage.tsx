import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const plans = [
  {
    name: "Basic Transaction",
    description: "For everyday peer-to-peer deals.",
    price: "0.5% buyer / 0.5% seller",
    features: [
      "Simple escrow flow",
      "Transaction history",
      "Buyer and seller protection",
    ],
    highlight: false,
  },
  {
    name: "Business",
    description: "For frequent sellers and businesses.",
    price: "Lower transaction fees",
    features: [
      "Seller verification",
      "Transaction history",
      "Analytics",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    description: "For platforms and marketplaces.",
    price: "Custom pricing",
    features: [
      "Escrow API",
      "Webhooks",
      "Settlement tools",
      "Dedicated support",
    ],
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-textPrimary">
            Pay a small fee for peace of mind.
          </h1>
          <p className="mt-4 text-lg text-textSecondary">
            Actual fees may vary based on transaction size, payment method, and
            verification level.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 ${plan.highlight ? "border-primary/30 bg-primary/5 shadow-card" : ""}`}
            >
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {plan.name}
              </div>
              <h3 className="text-2xl font-bold text-textPrimary">
                {plan.price}
              </h3>
              <p className="mt-3 text-textSecondary">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-textPrimary"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-success">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={plan.highlight ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                <Link to={plan.highlight ? "/register" : "/contact"}>
                  {plan.highlight ? "Get started" : "Learn more"}
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
