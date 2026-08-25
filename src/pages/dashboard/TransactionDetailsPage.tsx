import {
  Check,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Truck,
  AlertTriangle,
  LoaderCircle,
} from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Toast from "../../components/ui/Toast";

const timeline = [
  {
    title: "Transaction created",
    time: "12:08 PM",
    status: "done",
    description: "Deal setup completed and buyer accepted the terms.",
  },
  {
    title: "Buyer accepted",
    time: "12:21 PM",
    status: "done",
    description: "Buyer reviewed the terms and agreed to proceed.",
  },
  {
    title: "Payment secured",
    time: "12:34 PM",
    status: "done",
    description: "Funds were protected and held by SafeTra.",
  },
  {
    title: "Seller notified",
    time: "12:40 PM",
    status: "done",
    description: "Seller was informed and shipment preparation began.",
  },
  {
    title: "Seller shipping",
    time: "Today",
    status: "active",
    description: "Item is on the way to the buyer.",
  },
  {
    title: "Item delivered",
    time: "Pending",
    status: "pending",
    description: "Waiting for delivery confirmation.",
  },
  {
    title: "Buyer confirmation",
    time: "Pending",
    status: "pending",
    description: "Buyer is expected to confirm successful delivery.",
  },
  {
    title: "Funds released",
    time: "Pending",
    status: "pending",
    description: "Seller receives payment once confirmation is complete.",
  },
];

const pillMap = {
  done: "bg-success/10 text-success",
  active: "bg-primary/10 text-primary",
  pending: "bg-slate-100 text-textSecondary",
};

export default function TransactionDetailsPage() {
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleAction = (label: string, message: string) => {
    setPendingAction(label);
    setToast(null);

    window.setTimeout(() => {
      setPendingAction(null);
      setToast(message);
    }, 900);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Transaction #SD-83921
            </div>
            <h1 className="mt-2 text-3xl font-bold text-textPrimary">
              FUNDS SECURED
            </h1>
          </div>
          <div className="rounded-full bg-success/10 px-3 py-2 text-sm font-semibold text-success">
            Protected
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm text-textSecondary">Product</div>
                  <div className="mt-2 text-2xl font-bold text-textPrimary">
                    MacBook Pro 14-inch
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary">
                  GH₵ 12,500
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-textSecondary">
                <div className="rounded-xl border border-border bg-slate-50 px-3 py-2">
                  Buyer: Kofi Mensah
                </div>
                <div className="rounded-xl border border-border bg-slate-50 px-3 py-2">
                  Seller: Michael Owusu
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-6 text-xl font-bold text-textPrimary">
                Transaction timeline
              </div>
              <div className="space-y-5">
                {timeline.map(({ title, time, description, status }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${status === "done" ? "bg-success text-white" : status === "active" ? "bg-primary text-white" : "bg-slate-200 text-textSecondary"}`}
                      >
                        {status === "done" ? (
                          <Check className="h-4 w-4" />
                        ) : status === "active" ? (
                          <Clock3 className="h-4 w-4" />
                        ) : (
                          <span className="text-xs">○</span>
                        )}
                      </div>
                      {title !== "Funds released" && (
                        <div className="mt-2 h-12 w-px bg-border" />
                      )}
                    </div>
                    <div className="flex-1 rounded-2xl border border-border bg-slate-50 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="font-semibold text-textPrimary">
                          {title}
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${pillMap[status as keyof typeof pillMap]}`}
                        >
                          {time}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-textSecondary">
                        {description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="h-fit p-6">
            <div className="mb-5 text-xl font-bold text-textPrimary">
              Transaction summary
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-textSecondary">Amount</span>
                <span className="font-semibold text-textPrimary">
                  GH₵ 12,500
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Buyer fee</span>
                <span className="font-semibold text-textPrimary">
                  GH₵ 62.50
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Seller fee</span>
                <span className="font-semibold text-textPrimary">
                  GH₵ 62.50
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Total buyer payment</span>
                <span className="font-semibold text-textPrimary">
                  GH₵ 12,562.50
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-textSecondary">Funds status</span>
                <span className="font-bold text-success">PROTECTED</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                className="w-full"
                onClick={() =>
                  handleAction(
                    "Confirm Delivery",
                    "Delivery confirmed. Funds are now pending final release.",
                  )
                }
                disabled={pendingAction === "Confirm Delivery"}
              >
                {pendingAction === "Confirm Delivery" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Confirming...
                  </span>
                ) : (
                  "Confirm Delivery"
                )}
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() =>
                  handleAction(
                    "Open Dispute",
                    "Dispute opened. Support has been notified.",
                  )
                }
                disabled={pendingAction === "Open Dispute"}
              >
                {pendingAction === "Open Dispute" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Open Dispute"
                )}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() =>
                  handleAction(
                    "Message Seller",
                    "Your message has been sent to the seller.",
                  )
                }
                disabled={pendingAction === "Message Seller"}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {pendingAction === "Message Seller" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Message Seller"
                )}
              </Button>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-softGreen/50 p-4">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-4 w-4" /> Payment protected
              </div>
              <div className="mt-2 text-sm text-textSecondary">
                Your money stays protected until the deal is complete.
              </div>
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
