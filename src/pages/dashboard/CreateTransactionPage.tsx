import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Copy, ExternalLink, LoaderCircle, Share2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Toast from "../../components/ui/Toast";
import { calculateDemoFees, createMockTransaction, formatGhs, MockTransaction } from "../../services/mockSafetra";

const fieldClass = "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-textPrimary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10";

export default function CreateTransactionPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"PHYSICAL" | "DIGITAL">("PHYSICAL");
  const [deliveryDetails, setDeliveryDetails] = useState("");
  const [inspectionPeriodHours, setInspectionPeriodHours] = useState(24);
  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState<MockTransaction | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const amountInPesewas = Math.round(Number(amount) * 100);
  const fees = useMemo(() => calculateDemoFees(Number.isFinite(amountInPesewas) ? amountInPesewas : 0), [amountInPesewas]);
  const invitationUrl = created ? `${window.location.origin}/t/${created.id}` : "";

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setCreated(null);
    setIsCreating(true);
    try {
      const transaction = await createMockTransaction({
        productName,
        description,
        amount: amountInPesewas,
        sellerContact,
        deliveryMethod,
        deliveryDetails,
        inspectionPeriodHours,
      });
      setCreated(transaction);
      setToast("Demo invitation created on this device. No payment has been initiated.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create the demo transaction.");
    } finally {
      setIsCreating(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setToast("Invitation link copied.");
    } catch {
      setToast(invitationUrl);
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `SafeTra invitation: ${created?.productName}`, url: invitationUrl });
      } catch (cause) {
        if (cause instanceof Error && cause.name !== "AbortError") setToast("Sharing is unavailable. Copy the invitation link instead.");
      }
    } else {
      await copyLink();
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">New protected trade · demo</p>
          <h1 className="mt-2 text-3xl font-bold text-textPrimary">Create a trade invitation</h1>
          <p className="mt-2 text-textSecondary">Agree on the details first. The seller reviews the terms before the buyer proceeds to mock checkout.</p>
        </header>
        <Card className="p-5 sm:p-7">
          <form onSubmit={handleCreate} className="space-y-7">
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-textPrimary">1. Product or service</h2>
              <div>
                <label htmlFor="product" className="mb-1.5 block text-sm font-medium">Name</label>
                <input id="product" className={fieldClass} required maxLength={200} value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="e.g. MacBook Air M3" />
              </div>
              <div>
                <label htmlFor="description" className="mb-1.5 block text-sm font-medium">Description and agreed condition</label>
                <textarea id="description" className={`${fieldClass} min-h-24`} maxLength={2000} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the item or service clearly" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="amount" className="mb-1.5 block text-sm font-medium">Price (GHS)</label>
                  <input id="amount" className={fieldClass} required type="number" min="1" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" />
                </div>
                <div>
                  <label htmlFor="seller" className="mb-1.5 block text-sm font-medium">Seller email or Ghana phone (optional)</label>
                  <input id="seller" className={fieldClass} value={sellerContact} onChange={(event) => setSellerContact(event.target.value)} placeholder="name@example.com or +233…" />
                </div>
              </div>
            </section>
            <section className="space-y-4 border-t border-border pt-6">
              <h2 className="text-lg font-semibold text-textPrimary">2. Delivery and inspection</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="delivery-method" className="mb-1.5 block text-sm font-medium">Delivery type</label>
                  <select id="delivery-method" className={fieldClass} value={deliveryMethod} onChange={(event) => setDeliveryMethod(event.target.value as "PHYSICAL" | "DIGITAL")}>
                    <option value="PHYSICAL">Physical delivery / meet-up</option>
                    <option value="DIGITAL">Digital delivery</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="inspection-period" className="mb-1.5 block text-sm font-medium">Inspection period</label>
                  <select id="inspection-period" className={fieldClass} value={inspectionPeriodHours} onChange={(event) => setInspectionPeriodHours(Number(event.target.value))}>
                    {[12, 24, 48, 72].map((hours) => <option key={hours} value={hours}>{hours} hours</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="delivery-details" className="mb-1.5 block text-sm font-medium">Agreed delivery details</label>
                <textarea id="delivery-details" className={`${fieldClass} min-h-20`} maxLength={1000} value={deliveryDetails} onChange={(event) => setDeliveryDetails(event.target.value)} placeholder="Location, courier arrangement, or digital delivery instructions" />
              </div>
            </section>
            <section className="rounded-2xl bg-softGreen/50 p-5">
              <div className="mb-3 flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5 text-primary" /> Fee preview · demonstration only</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Trade price</span><span>{formatGhs(amountInPesewas)}</span></div>
                <div className="flex justify-between"><span>Buyer fee (0.5% example)</span><span>{formatGhs(fees.buyerFee)}</span></div>
                <div className="flex justify-between"><span>Seller fee (0.5% example)</span><span>{formatGhs(fees.sellerFee)}</span></div>
                <div className="flex justify-between border-t border-primary/15 pt-2 font-semibold"><span>Total buyer payment</span><span>{formatGhs(fees.totalBuyerPayment)}</span></div>
                <div className="flex justify-between"><span>Seller net amount</span><span>{formatGhs(fees.sellerNetAmount)}</span></div>
              </div>
              <p className="mt-3 text-xs text-textSecondary">The backend recalculates fees and totals. These local demo figures do not represent a quote or actual payment.</p>
            </section>
            {error && <p role="alert" className="rounded-xl bg-danger/10 p-3 text-sm text-danger">{error}</p>}
            <Button type="submit" disabled={isCreating} className="w-full sm:w-auto">
              {isCreating ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Creating demo invitation…</> : "Review and create invitation"}
            </Button>
          </form>
        </Card>
        {created && (
          <Card className="space-y-4 border-success/30 p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-success" />
              <div><h2 className="text-xl font-semibold">Invitation ready</h2><p className="mt-1 text-sm text-textSecondary">Reference {created.id} · status: INVITED. Demo data is saved in this browser only.</p></div>
            </div>
            <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <code className="break-all text-sm">{invitationUrl}</code>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={copyLink}><Copy className="mr-2 h-4 w-4" />Copy</Button>
                <Button variant="secondary" onClick={shareLink}><Share2 className="mr-2 h-4 w-4" />Share</Button>
              </div>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-primary" to={`/dashboard/transactions/${created.id}`}>View transaction details <ExternalLink className="h-4 w-4" /></Link>
          </Card>
        )}
      </div>
      <Toast show={Boolean(toast)} message={toast} onClose={() => setToast("")} />
    </DashboardLayout>
  );
}
