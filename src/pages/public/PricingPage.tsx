import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function PricingPage() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-textPrimary">Transparent fee examples</h1>
          <p className="mt-4 text-lg text-textSecondary">The current backend defaults to 0.5% buyer and 0.5% seller fees. The production server calculates final amounts; these figures are illustrative only.</p>
        </div>

        <Card className="mx-auto max-w-2xl p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5"><p className="text-sm text-textSecondary">Buyer fee default</p><p className="mt-2 text-2xl font-bold text-primary">0.5%</p><p className="mt-2 text-sm text-textSecondary">Calculated on the transaction amount by the backend.</p></div>
            <div className="rounded-xl bg-slate-50 p-5"><p className="text-sm text-textSecondary">Seller fee default</p><p className="mt-2 text-2xl font-bold text-primary">0.5%</p><p className="mt-2 text-sm text-textSecondary">Deducted in the backend's seller net amount calculation.</p></div>
          </div>
          <p className="mt-5 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-textSecondary">Deployment configuration can change fee rates. Confirm the current rate, rounding, payment-provider costs, taxes, and any other charges before launch. The prototype never authorizes a charge.</p>
          <Button asChild className="mt-5"><Link to="/contact">Ask about pricing</Link></Button>
        </Card>
      </section>
    </PublicLayout>
  );
}
