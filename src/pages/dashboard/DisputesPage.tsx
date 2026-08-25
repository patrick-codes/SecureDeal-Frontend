import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  Search,
} from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Toast from "../../components/ui/Toast";

const disputes = [
  {
    id: "#SD-92831",
    reason: "Item not received",
    status: "Open",
    date: "Today",
  },
  {
    id: "#SD-81120",
    reason: "Wrong item",
    status: "Under Review",
    date: "2 days ago",
  },
  {
    id: "#SD-77941",
    reason: "Damaged item",
    status: "Waiting for Buyer",
    date: "5 days ago",
  },
];

export default function DisputesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setToast(null);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setToast(
        "Dispute submitted. A support agent will review it within 24 hours.",
      );
    }, 1100);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">Disputes</h1>
            <p className="mt-2 text-textSecondary">
              Track, respond to, and resolve transaction issues quickly.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-2.5">
            <Search className="h-4 w-4 text-textSecondary" />
            <input
              className="w-48 border-none bg-transparent text-sm outline-none"
              placeholder="Search disputes"
            />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <Card key={dispute.id} className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-[0.18em] text-textSecondary">
                      {dispute.id}
                    </div>
                    <div className="mt-2 text-xl font-bold text-textPrimary">
                      {dispute.reason}
                    </div>
                  </div>
                  <Badge
                    tone={
                      dispute.status === "Open"
                        ? "danger"
                        : dispute.status === "Under Review"
                          ? "warning"
                          : "primary"
                    }
                  >
                    {dispute.status}
                  </Badge>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-textSecondary">
                  <span>{dispute.date}</span>
                  <button className="font-semibold text-primary">
                    View case
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger/10 text-danger">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-textSecondary">Open dispute</div>
                <div className="font-semibold text-textPrimary">Need help?</div>
              </div>
            </div>

            <div className="space-y-4">
              <select className="w-full rounded-xl border border-border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary">
                <option>Item not received</option>
                <option>Wrong item</option>
                <option>Damaged item</option>
              </select>
              <textarea
                className="min-h-[140px] w-full rounded-xl border border-border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="Describe what went wrong..."
              />
              <div className="rounded-xl border border-dashed border-border bg-slate-50 p-4 text-sm text-textSecondary">
                Evidence upload: Photos, Videos, Documents
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-warning/10 p-3 text-sm text-textPrimary">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-warning" />
                Once submitted, the transaction will remain protected while the
                dispute is reviewed.
              </div>
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit dispute"
                )}
              </Button>
            </div>
          </Card>
        </div>
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
