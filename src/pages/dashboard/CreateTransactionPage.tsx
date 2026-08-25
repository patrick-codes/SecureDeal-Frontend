import { LoaderCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Toast from "../../components/ui/Toast";

const steps = [
  "What are you selling/buying?",
  "Price",
  "Who is the other party?",
  "Delivery method",
  "Inspection period",
  "Review",
];

export default function CreateTransactionPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleCreateTransaction = () => {
    setIsCreating(true);
    setToast(null);

    window.setTimeout(() => {
      setIsCreating(false);
      setCreated(true);
      setToast(
        "Secure transaction created. Your buyer can now review the deal.",
      );
    }, 1200);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">
            Create a secure transaction
          </h1>
          <p className="mt-2 text-textSecondary">
            Guide the customer through a protected and transparent deal flow.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-6">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`rounded-xl border px-3 py-3 text-center text-sm font-medium ${index === 5 ? "border-primary bg-primary text-white" : "border-border bg-white text-textSecondary"}`}
            >
              {step}
            </div>
          ))}
        </div>

        <Card className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">
                  Product or service name
                </label>
                <input
                  className="w-full rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none focus:border-primary"
                  defaultValue="MacBook Pro 14-inch"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">
                  Description
                </label>
                <textarea
                  className="min-h-[130px] w-full rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none focus:border-primary"
                  defaultValue="Apple MacBook Pro 14-inch, M3 Pro, 18GB RAM, 512GB SSD, in excellent condition."
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">
                  Price
                </label>
                <input
                  className="w-full rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none focus:border-primary"
                  defaultValue="GH₵ 12,500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">
                  Other party
                </label>
                <input
                  className="w-full rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none focus:border-primary"
                  defaultValue="michael@safetra.app"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-textPrimary">
                  Delivery method
                </label>
                <select className="w-full rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none focus:border-primary">
                  <option>Courier</option>
                  <option>Pickup</option>
                  <option>In-person</option>
                  <option>Digital delivery</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {["12 hours", "24 hours", "48 hours", "72 hours"].map(
              (period, index) => (
                <button
                  key={period}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium ${index === 2 ? "border-primary bg-primary text-white" : "border-border bg-slate-50 text-textPrimary"}`}
                >
                  {period}
                </button>
              ),
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-softGreen/30 p-5">
            <div className="mb-4 text-lg font-semibold text-textPrimary">
              Review
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="text-sm text-textSecondary">Product</div>
              <div className="text-sm font-medium text-textPrimary">
                MacBook Pro 14-inch
              </div>
              <div className="text-sm text-textSecondary">Price</div>
              <div className="text-sm font-medium text-textPrimary">
                GH₵ 12,500
              </div>
              <div className="text-sm text-textSecondary">Buyer</div>
              <div className="text-sm font-medium text-textPrimary">
                Kofi Mensah
              </div>
              <div className="text-sm text-textSecondary">Seller</div>
              <div className="text-sm font-medium text-textPrimary">
                Michael Owusu
              </div>
              <div className="text-sm text-textSecondary">Delivery</div>
              <div className="text-sm font-medium text-textPrimary">
                Courier
              </div>
              <div className="text-sm text-textSecondary">
                Inspection period
              </div>
              <div className="text-sm font-medium text-textPrimary">
                48 hours
              </div>
              <div className="text-sm text-textSecondary">Fees</div>
              <div className="text-sm font-medium text-textPrimary">
                GH₵ 125.00
              </div>
              <div className="text-sm text-textSecondary">Total</div>
              <div className="text-sm font-bold text-primary">
                GH₵ 12,625.00
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Link to="/dashboard/transactions/SD-83921">
              <Button variant="secondary">Preview transaction</Button>
            </Link>
            <Button
              className="h-12"
              onClick={handleCreateTransaction}
              disabled={isCreating}
            >
              {isCreating ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Secure Transaction"
              )}
            </Button>
          </div>

          {created && (
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-success/20 bg-success/10 p-4 text-sm text-success">
              <CheckCircle2 className="h-5 w-5" />
              Secure deal created and ready for review.
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-border bg-white p-4">
            <div className="mb-2 text-sm text-textSecondary">
              Transaction link
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-mono text-sm text-textPrimary">
                safetra.app/t/SD-83K29
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard?.writeText("safetra.app/t/SD-83K29");
                    setToast("Transaction link copied to clipboard.");
                  }}
                >
                  Copy Link
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setToast("WhatsApp share link prepared for the buyer.")
                  }
                >
                  Share on WhatsApp
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setToast("Link sharing options opened.")}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Toast
        show={Boolean(toast)}
        message={toast ?? ""}
        onClose={() => setToast(null)}
        tone="success"
      />
    </DashboardLayout>
  );
}
