import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { formatGhs, getMockTransaction, transactionStatusLabel, transitionMockTransaction } from "../../services/mockSafetra";

export default function ShareableTransactionPage() {
  const { transactionId = "" } = useParams();
  const [transaction, setTransaction] = useState(() => getMockTransaction(transactionId));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setTransaction(getMockTransaction(transactionId));
    setMessage("");
  }, [transactionId]);

  if (!transaction) return <PublicLayout><section className="mx-auto max-w-xl px-4 py-16"><Card className="p-7"><h1 className="text-2xl font-bold">Invitation unavailable</h1><p className="mt-2 text-textSecondary">This invitation is invalid or is not stored in this browser’s demo data.</p><Link className="mt-5 inline-block font-semibold text-primary" to="/">Return home</Link></Card></section></PublicLayout>;
  const accept = async () => {
    setBusy(true);
    try {
      setTransaction(await transitionMockTransaction(transaction.id, "ACCEPTED"));
      setMessage("Invitation accepted in the local demo.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not accept invitation.");
    } finally {
      setBusy(false);
    }
  };
  const canPay = transaction.status === "INVITED" || transaction.status === "ACCEPTED" || transaction.status === "PAYMENT_PENDING";
  return <PublicLayout>
    <section className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <Card className="overflow-hidden">
        <div className="bg-primary px-6 py-7 text-white"><div className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5" /> SafeTra trade invitation</div><p className="mt-3 text-sm text-white/80">Review every term before deciding. This page contains demonstration data only.</p></div>
        <div className="space-y-6 p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-wider text-textSecondary">Reference {transaction.id}</p><h1 className="mt-2 text-2xl font-bold">{transaction.productName}</h1></div><span className="rounded-full bg-softGreen px-3 py-1.5 text-xs font-semibold">{transactionStatusLabel[transaction.status]}</span></div>
          <p className="text-sm leading-6 text-textSecondary">{transaction.description || "No additional description was provided."}</p>
          <div className="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2"><div><span className="text-textSecondary">Buyer</span><p className="mt-1 font-medium">{transaction.buyerName}</p></div><div><span className="text-textSecondary">Price</span><p className="mt-1 font-semibold">{formatGhs(transaction.amount)}</p></div><div><span className="text-textSecondary">Buyer fee (demo)</span><p className="mt-1 font-medium">{formatGhs(transaction.buyerFee)}</p></div><div><span className="text-textSecondary">Seller fee (demo)</span><p className="mt-1 font-medium">{formatGhs(transaction.sellerFee)}</p></div><div><span className="text-textSecondary">Buyer total</span><p className="mt-1 font-semibold">{formatGhs(transaction.totalBuyerPayment)}</p></div><div><span className="text-textSecondary">Seller net (demo)</span><p className="mt-1 font-medium">{formatGhs(transaction.sellerNetAmount)}</p></div><div className="sm:col-span-2"><span className="text-textSecondary">Delivery terms</span><p className="mt-1 font-medium">{transaction.deliveryMethod} · {transaction.deliveryDetails || "To be agreed"} · {transaction.inspectionPeriodHours}h inspection</p></div></div>
          <p className="rounded-xl border border-primary/10 bg-softGreen/40 p-4 text-sm text-textSecondary">The real backend determines the authoritative status, fees, payment verification, and outcomes. No funds are held, and displayed fees are examples.</p>
          {message && <p role="status" className="text-sm text-textSecondary">{message}</p>}
          <div className="grid gap-3 sm:grid-cols-2">
            {canPay && <Button asChild><Link to={`/pay/${transaction.id}`}>Review mock checkout</Link></Button>}
            {transaction.status === "FUNDED" && <Button onClick={accept} disabled={busy}>{busy ? "Accepting…" : "Accept invitation (demo)"}</Button>}
            {transaction.status === "ACCEPTED" && <Button asChild><Link to={`/pay/${transaction.id}`}>Continue to mock checkout</Link></Button>}
            {!canPay && transaction.status !== "FUNDED" && transaction.status !== "ACCEPTED" && <p className="text-sm text-textSecondary sm:col-span-2">This invitation is no longer awaiting a decision.</p>}
            <Button variant="secondary" asChild><Link to="/login?returnTo=/t/">Sign in to continue</Link></Button>
          </div>
        </div>
      </Card>
    </section>
  </PublicLayout>;
}
