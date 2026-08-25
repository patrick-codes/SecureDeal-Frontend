import {
  CheckCircle2,
  LoaderCircle,
  MessageSquareText,
  Scale,
} from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Toast from "../../components/ui/Toast";

export default function AdminDisputePage() {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleDecision = (label: string) => {
    setIsProcessing(label);
    setToast(null);

    window.setTimeout(() => {
      setIsProcessing(null);
      setToast(`${label} has been applied to the dispute.`);
    }, 900);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Dispute resolution
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-textPrimary">
            Transaction #SD-81290
          </h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.15fr_0.8fr]">
          <Card className="p-5">
            <div className="mb-4 text-lg font-bold text-textPrimary">
              Transaction details
            </div>
            <div className="space-y-3 text-sm text-textSecondary">
              <div className="flex items-center justify-between gap-3">
                <span>Product</span>
                <span className="font-medium text-right text-textPrimary">
                  Sony A7 IV Camera
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Buyer</span>
                <span className="font-medium text-right text-textPrimary">
                  Akosua Mensima
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Seller</span>
                <span className="font-medium text-right text-textPrimary">
                  Nana Kwapong
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Amount</span>
                <span className="font-medium text-right text-textPrimary">
                  GH₵ 18,000
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Risk</span>
                <span className="font-medium text-danger">Medium</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2 text-lg font-bold text-textPrimary">
              <MessageSquareText className="h-5 w-5 text-primary" />
              Conversation & evidence
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="font-semibold text-textPrimary">Buyer</div>
                <div className="mt-2 text-sm leading-6 text-textSecondary">
                  The item arrived damaged and differs from the described
                  condition. I have attached photos and the delivery record.
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="font-semibold text-textPrimary">Seller</div>
                <div className="mt-2 text-sm leading-6 text-textSecondary">
                  The package was sealed when shipped, and the item was in good
                  condition. I have upload proof from the courier and packaging
                  photos.
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-dashed border-border bg-softBlue p-4 text-sm text-textSecondary">
              <div className="flex items-center gap-2 text-textPrimary">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Evidence uploaded: 3 photos • 1 video • 2 invoices
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2 text-lg font-bold text-textPrimary">
              <Scale className="h-5 w-5 text-primary" /> Resolution panel
            </div>
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => handleDecision("Release to Seller")}
                disabled={isProcessing === "Release to Seller"}
              >
                {isProcessing === "Release to Seller" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Release to Seller"
                )}
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleDecision("Refund Buyer")}
                disabled={isProcessing === "Refund Buyer"}
              >
                {isProcessing === "Refund Buyer" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Refund Buyer"
                )}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => handleDecision("Partial Settlement")}
                disabled={isProcessing === "Partial Settlement"}
              >
                {isProcessing === "Partial Settlement" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Partial Settlement"
                )}
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleDecision("Request More Evidence")}
                disabled={isProcessing === "Request More Evidence"}
              >
                {isProcessing === "Request More Evidence" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Request More Evidence"
                )}
              </Button>
              <Button
                variant="danger"
                className="w-full"
                onClick={() => handleDecision("Escalate")}
                disabled={isProcessing === "Escalate"}
              >
                {isProcessing === "Escalate" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Escalating...
                  </span>
                ) : (
                  "Escalate"
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
        tone="info"
      />
    </DashboardLayout>
  );
}
