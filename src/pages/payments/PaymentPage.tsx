import { useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Smartphone,
  Landmark,
  ShieldCheck,
  Wallet,
  LoaderCircle,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Toast from "../../components/ui/Toast";

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handlePay = () => {
    setIsProcessing(true);
    setToast(null);
    setTimeout(() => {
      setIsProcessing(false);
      setPaid(true);
      setToast("Payment secured successfully. Escrow is now protected.");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-bg px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
            <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-softGreen text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-textSecondary">
                    Secure payment
                  </div>
                  <div className="text-2xl font-bold text-textPrimary">
                    Payment
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-slate-50 p-4">
                <div className="text-sm text-textSecondary">Order summary</div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-textPrimary">
                      iPhone 15 Pro Max
                    </div>
                    <div className="text-sm text-textSecondary">
                      Seller: Kwame Mensah
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    GH₵ 12,000
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-textSecondary">
                  Payment method
                </div>
                <div className="space-y-3">
                  {[
                    { label: "MTN MoMo", icon: Smartphone, selected: true },
                    { label: "Telecel Cash", icon: Smartphone },
                    { label: "AT Money", icon: Wallet },
                    { label: "Card", icon: CreditCard },
                    { label: "Bank", icon: Landmark },
                  ].map(({ label, icon: Icon, selected }) => (
                    <div
                      key={label}
                      className={`flex items-center justify-between rounded-xl border p-3 ${selected ? "border-primary bg-softGreen" : "border-border bg-white"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-textPrimary">
                          {label}
                        </span>
                      </div>
                      {selected && (
                        <div className="h-3 w-3 rounded-full bg-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-softGreen/30 p-6">
              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-textSecondary">
                Summary
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-textSecondary">Item</span>
                  <span className="font-semibold text-textPrimary">
                    GH₵ 12,000
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Protection fee</span>
                  <span className="font-semibold text-textPrimary">
                    GH₵ 60.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Total</span>
                  <span className="text-lg font-bold text-primary">
                    GH₵ 12,060.00
                  </span>
                </div>
              </div>

              {!paid && (
                <Button
                  className="mt-8 h-12 w-full"
                  onClick={handlePay}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="inline-flex items-center gap-2">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Processing payment...
                    </span>
                  ) : (
                    "Pay securely"
                  )}
                </Button>
              )}

              {paid && (
                <div className="mt-8 rounded-2xl border border-success/20 bg-white p-5 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-textPrimary">
                    Payment Secured
                  </div>
                  <p className="mt-2 text-sm text-textSecondary">
                    Your money is protected until the transaction is
                    successfully completed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
      <Toast
        show={Boolean(toast)}
        message={toast ?? ""}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
