import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { formatGhs, getMockTransaction, transitionMockTransaction } from "../../services/mockSafetra";

export default function PaymentPage() {
  const { transactionId = "" } = useParams();
  const [transaction, setTransaction] = useState(() => getMockTransaction(transactionId));
  const [method, setMethod] = useState("mobile_money");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setTransaction(getMockTransaction(transactionId));
    setMessage("");
  }, [transactionId]);
  if (!transaction) return <main className="mx-auto max-w-xl px-4 py-12"><Card className="p-6"><h1 className="text-2xl font-bold">Demo transaction not found</h1><Link className="mt-4 inline-block font-semibold text-primary" to="/">Return home</Link></Card></main>;
  const startPayment = async () => {
    setBusy(true);
    setMessage("");
    try {
      const updated = transaction.status === "INVITED"
        ? await transitionMockTransaction(transaction.id, "PAYMENT_PENDING")
        : transaction;
      setTransaction(updated);
      if (updated.status === "PAYMENT_PENDING") {
        setMessage("Verification pending in the demo. Select “Simulate verified payment” to continue; no payment request has been sent.");
      } else if (!["PAYMENT_PENDING", "FUNDED"].includes(updated.status)) {
        setMessage(`Checkout is unavailable while this transaction is ${updated.status}.`);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not initialize the mock payment.");
    } finally {
      setBusy(false);
    }
  };
  const simulateVerified = async () => {
    setBusy(true);
    try {
      const updated = await transitionMockTransaction(transaction.id, "FUNDED");
      setTransaction(updated);
      setMessage("Demo payment marked verified. No real payment or escrow hold occurred.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update mock payment.");
    } finally {
      setBusy(false);
    }
  };
  return <main className="min-h-screen bg-bg px-4 py-10">
    <div className="mx-auto max-w-3xl">
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-5 p-5 sm:p-7">
            <div className="flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-primary" /><div><p className="text-sm text-textSecondary">SafeTra · mock checkout</p><h1 className="text-2xl font-bold">Review payment</h1></div></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-textSecondary">Transaction {transaction.id}</p><p className="mt-1 text-lg font-semibold">{transaction.productName}</p><p className="mt-1 text-sm text-textSecondary">Seller: {transaction.sellerName}</p></div>
            <fieldset className="space-y-2"><legend className="mb-2 text-sm font-semibold">Demonstration payment method</legend>{[["mobile_money", "Mobile Money (MTN, Telecel, AirtelTigo)"], ["card", "Card"], ["bank", "Bank"]].map(([value, label]) => <label key={value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3 text-sm"><input type="radio" name="payment-method" value={value} checked={method === value} onChange={() => setMethod(value)} />{label}</label>)}</fieldset>
            <p className="rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs leading-5 text-textSecondary">This prototype does not collect payment credentials, call Paystack, or move money. Selecting a method only changes local UI state.</p>
            {message && <p role="status" className="rounded-xl bg-softGreen p-3 text-sm text-textSecondary">{message}</p>}
          </section>
          <aside className="border-t border-border bg-softGreen/30 p-5 sm:p-7 lg:border-l lg:border-t-0">
            <h2 className="text-lg font-semibold">Amount summary</h2>
            <dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><dt>Price</dt><dd>{formatGhs(transaction.amount)}</dd></div><div className="flex justify-between"><dt>Buyer fee · demo</dt><dd>{formatGhs(transaction.buyerFee)}</dd></div><div className="flex justify-between border-t border-border pt-3 text-base font-bold"><dt>Total due</dt><dd>{formatGhs(transaction.totalBuyerPayment)}</dd></div></dl>
            {transaction.status === "FUNDED" ? <div className="mt-7 space-y-3"><p className="text-sm font-semibold text-success">Demo payment status: SUCCESS</p><p className="break-all font-mono text-xs text-textSecondary">Reference: {transaction.paymentReference}</p><Button asChild className="w-full"><Link to={`/t/${transaction.id}`}>Return to invitation</Link></Button></div> : <div className="mt-7 space-y-3"><Button className="w-full" onClick={startPayment} disabled={busy || transaction.status === "PAYMENT_PENDING"}>{busy ? "Preparing demo…" : transaction.status === "PAYMENT_PENDING" ? "Verification pending" : "Start mock checkout"}</Button>{transaction.status === "PAYMENT_PENDING" && <Button variant="secondary" className="w-full" onClick={simulateVerified} disabled={busy}>{busy ? "Updating…" : "Simulate verified payment"}</Button>}<Link className="block text-center text-sm font-medium text-primary" to={`/t/${transaction.id}`}>Back to terms</Link></div>}
          </aside>
        </div>
      </Card>
    </div>
  </main>;
}
