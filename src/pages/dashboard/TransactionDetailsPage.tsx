import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Clock3, PackageCheck, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/status/StatusBadge";
import Toast from "../../components/ui/Toast";
import { formatGhs, getMockTransaction, statusLabel, transactionStatusLabel, transitionMockTransaction, TransactionState } from "../../services/mockSafetra";

const workflow: TransactionState[] = ["INVITED", "PAYMENT_PENDING", "FUNDED", "ACCEPTED", "SELLER_PREPARING", "SHIPPED", "DELIVERED", "INSPECTION", "RELEASE_PENDING", "RELEASED"];

export default function TransactionDetailsPage() {
  const { id = "" } = useParams();
  const [transaction, setTransaction] = useState(() => getMockTransaction(id));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  useEffect(() => {
    setTransaction(getMockTransaction(id));
    setError("");
  }, [id]);

  if (!transaction) return <DashboardLayout><Card className="mx-auto max-w-2xl p-7"><h1 className="text-2xl font-bold">Transaction not found</h1><p className="mt-2 text-textSecondary">This reference is not available in the local demo records.</p><Link className="mt-5 inline-block font-semibold text-primary" to="/dashboard/transactions">Back to transactions</Link></Card></DashboardLayout>;

  const buyerView = transaction.buyerName === "Kofi Mensah";
  const nextAction: Partial<Record<TransactionState, { next: TransactionState; label: string; help: string; role: "buyer" | "seller" | "either" }>> = {
    FUNDED: { next: "ACCEPTED", label: "Seller accepts invitation", help: "Shown for the seller-side demo.", role: "seller" },
    ACCEPTED: { next: "SELLER_PREPARING", label: "Start preparing order", help: "Mock seller action.", role: "seller" },
    SELLER_PREPARING: { next: "SHIPPED", label: "Mark as shipped", help: "Mock seller action.", role: "seller" },
    SHIPPED: { next: "DELIVERED", label: "Mark as delivered", help: "Mock delivery event; not buyer confirmation.", role: "seller" },
    DELIVERED: { next: "INSPECTION", label: "Begin inspection", help: "Mock transition to agreed inspection period.", role: "buyer" },
    INSPECTION: { next: "RELEASE_PENDING", label: "Confirm delivery", help: "May start a payout workflow according to platform rules. Demo only; settlement remains separate.", role: "buyer" },
  };
  const proposedAction = nextAction[transaction.status];
  const action = proposedAction && (proposedAction.role === "either" || (proposedAction.role === "buyer" && buyerView) || (proposedAction.role === "seller" && !buyerView))
    ? proposedAction
    : undefined;
  const move = async (next: TransactionState) => {
    setBusy(true);
    setError("");
    try {
      setTransaction(await transitionMockTransaction(transaction.id, next));
      setToast(`Demo transaction is now ${transactionStatusLabel[next]}.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update demo transaction.");
    } finally {
      setBusy(false);
    }
  };
  const currentIndex = workflow.indexOf(transaction.status);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Transaction {transaction.id}</p><h1 className="mt-2 text-3xl font-bold">{transaction.productName}</h1><p className="mt-1 text-sm text-textSecondary">Demo record · Your role: {buyerView ? "Buyer" : "Seller"}</p></div>
          <StatusBadge status={transaction.status} />
        </header>
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <Card className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="text-xl font-semibold">Trade details</h2><p className="mt-2 text-sm text-textSecondary">{transaction.description || "No additional description provided."}</p></div><div className="text-2xl font-bold text-primary">{formatGhs(transaction.amount)}</div></div>
              <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                <div><dt className="text-xs text-textSecondary">Buyer</dt><dd className="mt-1 font-medium">{transaction.buyerName}</dd></div>
                <div><dt className="text-xs text-textSecondary">Seller</dt><dd className="mt-1 font-medium">{transaction.sellerName}</dd></div>
                <div><dt className="text-xs text-textSecondary">Delivery</dt><dd className="mt-1 font-medium">{transaction.deliveryMethod} · {transaction.deliveryDetails || "To be agreed"}</dd></div>
                <div><dt className="text-xs text-textSecondary">Inspection period</dt><dd className="mt-1 font-medium">{transaction.inspectionPeriodHours} hours</dd></div>
              </dl>
            </Card>
            <Card className="p-5 sm:p-6">
              <h2 className="mb-5 text-xl font-semibold">Transaction progress</h2>
              {transaction.status === "DISPUTED" || transaction.status === "UNDER_REVIEW" ? <div className="rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm"><strong className="block">Normal release workflow paused</strong><span className="mt-1 block text-textSecondary">The trade is {transactionStatusLabel[transaction.status].toLowerCase()}. Use the dispute workflow; do not confirm delivery to bypass it.</span></div> : null}
              <ol className="space-y-4">{workflow.filter((step) => !["ACCEPTED", "SELLER_PREPARING"].includes(step) || transaction.status === step || transaction.status === "SHIPPED" || transaction.status === "DELIVERED" || transaction.status === "INSPECTION" || transaction.status === "RELEASE_PENDING" || transaction.status === "RELEASED").map((step) => {
                const position = workflow.indexOf(step);
                const done = currentIndex > position || transaction.status === "RELEASED";
                const current = step === transaction.status;
                return <li key={step} className="flex gap-3"><div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${done ? "bg-success text-white" : current ? "bg-primary text-white" : "bg-slate-100 text-textSecondary"}`}>{done ? <CheckCircle2 className="h-4 w-4" /> : current ? <Clock3 className="h-4 w-4" /> : <span className="text-xs">{position + 1}</span>}</div><div><p className="font-medium">{transactionStatusLabel[step]}{current ? " · Current" : ""}</p><p className="text-xs text-textSecondary">{done ? "Recorded in this browser demo" : current ? "Awaiting the next eligible action" : "Upcoming"}</p></div></li>;
              })}</ol>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-5">
              <h2 className="text-lg font-semibold">Payment and escrow (separate states)</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-2"><dt>Payment</dt><dd className="font-medium">{statusLabel[transaction.paymentStatus] ?? transaction.paymentStatus}</dd></div>
                <div className="flex justify-between gap-2"><dt>Escrow workflow</dt><dd className="font-medium">{statusLabel[transaction.escrowStatus] ?? transaction.escrowStatus}</dd></div>
                <div className="flex justify-between gap-2"><dt>Payment reference</dt><dd className="font-mono text-xs">{transaction.paymentReference || "Not generated"}</dd></div>
                <div className="border-t border-border pt-3"><div className="flex justify-between"><span>Buyer fee (demo)</span><span>{formatGhs(transaction.buyerFee)}</span></div><div className="mt-2 flex justify-between"><span>Seller fee (demo)</span><span>{formatGhs(transaction.sellerFee)}</span></div><div className="mt-2 flex justify-between font-semibold"><span>Buyer total</span><span>{formatGhs(transaction.totalBuyerPayment)}</span></div><div className="mt-2 flex justify-between font-semibold"><span>Seller net</span><span>{formatGhs(transaction.sellerNetAmount)}</span></div></div>
              </dl>
              <p className="mt-4 flex gap-2 rounded-lg bg-softGreen/50 p-3 text-xs text-textSecondary"><ShieldCheck className="h-4 w-4 shrink-0 text-primary" />Status is illustrative only. The backend and payment provider are authoritative; no money is held by this demo.</p>
            </Card>
            <Card className="space-y-3 p-5">
              <h2 className="text-lg font-semibold">Eligible demo actions</h2>
              {(transaction.status === "INVITED" || transaction.status === "PAYMENT_PENDING") && buyerView && <><p className="text-xs text-textSecondary">Checkout is a mock flow; no payment request is sent.</p><Button asChild className="w-full"><Link to={`/pay/${transaction.id}`}>{transaction.status === "PAYMENT_PENDING" ? "Continue payment verification" : "Continue to mock checkout"}</Link></Button></>}
              {action && <><p className="text-xs text-textSecondary">{action.help}</p><Button className="w-full" disabled={busy} onClick={() => move(action.next)}>{busy ? "Updating…" : action.label}</Button></>}
              {(transaction.status === "FUNDED" || transaction.status === "ACCEPTED" || transaction.status === "SELLER_PREPARING" || transaction.status === "SHIPPED" || transaction.status === "DELIVERED" || transaction.status === "INSPECTION") && <Button asChild variant="secondary" className="w-full"><Link to={`/dashboard/disputes?transactionId=${transaction.id}`}><AlertTriangle className="mr-2 h-4 w-4" />Report a problem</Link></Button>}
              {transaction.status === "SHIPPED" && !buyerView && <p className="flex gap-2 text-xs text-textSecondary"><PackageCheck className="h-4 w-4 shrink-0" />As seller, record only a shipped/delivered event. You cannot confirm delivery for the buyer.</p>}
              {error && <p role="alert" className="text-sm text-danger">{error}</p>}
              {!action && transaction.status !== "INVITED" && transaction.status !== "PAYMENT_PENDING" && transaction.status !== "DISPUTED" && transaction.status !== "UNDER_REVIEW" && <p className="text-sm text-textSecondary">No action is available for your role in this state. Settlement and dispute decisions are not user-editable.</p>}
              <Link to="/dashboard/disputes" className="block pt-1 text-sm font-semibold text-primary">Dispute and support center</Link>
            </Card>
          </div>
        </div>
      </div>
      <Toast show={Boolean(toast)} message={toast} onClose={() => setToast("")} />
    </DashboardLayout>
  );
}
