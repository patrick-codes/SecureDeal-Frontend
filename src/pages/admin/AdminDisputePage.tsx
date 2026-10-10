import { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, Scale } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getDemoSession, getMockDisputes, getMockTransaction, MockTransaction, transitionMockTransaction, TransactionState } from "../../services/mockSafetra";

const outcomes: { status: TransactionState; label: string }[] = [
  { status: "RELEASED", label: "Release to seller" },
  { status: "REFUNDED", label: "Full refund" },
  { status: "PARTIALLY_SETTLED", label: "Partial settlement" },
  { status: "CANCELLED", label: "Cancel transaction" },
];

export default function AdminDisputePage() {
  const { id = "" } = useParams();
  const [transaction, setTransaction] = useState<MockTransaction | undefined>(() => getMockTransaction(id) ?? getMockTransaction("ST-66831"));
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const role = getDemoSession()?.role;
  const dispute = getMockDisputes().find((item) => item.transactionId === transaction?.id);
  const act = async (status: TransactionState, label: string) => {
    if (!transaction || reason.trim().length < 10) { setMessage("Enter an audit reason of at least 10 characters before taking action."); return; }
    if (!window.confirm(`Confirm demo decision: ${label}? This local change does not issue a refund or payout.`)) return;
    setBusy(true);
    try {
      const updated = await transitionMockTransaction(transaction.id, status);
      setTransaction(updated);
      setMessage(`${label} recorded as a local demo state for ${dispute?.id ?? transaction.id}. No money moved.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not apply this demo state transition.");
    } finally {
      setBusy(false);
    }
  };
  return <DashboardLayout><div className="space-y-6">
    <header><p className="text-sm font-semibold uppercase tracking-wider text-primary">Dispute operations · demo</p><h1 className="mt-2 text-3xl font-bold">Case {dispute?.id ?? id}</h1><p className="mt-2 text-sm text-textSecondary">Restricted operations view for DISPUTE_AGENT and SUPER_ADMIN demo accounts. Backend authorization and audit logs are authoritative.</p></header>
    {!transaction ? <Card className="p-6"><h2 className="font-semibold">No sample transaction found</h2><p className="mt-2 text-sm text-textSecondary">Choose a disputed transaction from the operations list.</p></Card> : <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Card className="p-5"><h2 className="text-lg font-semibold">Transaction context</h2><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt>Transaction</dt><dd className="font-medium">{transaction.id}</dd></div><div className="flex justify-between gap-4"><dt>Product</dt><dd className="font-medium text-right">{transaction.productName}</dd></div><div className="flex justify-between gap-4"><dt>Buyer</dt><dd>{transaction.buyerName}</dd></div><div className="flex justify-between gap-4"><dt>Seller</dt><dd>{transaction.sellerName}</dd></div><div className="flex justify-between gap-4"><dt>Transaction state</dt><dd className="font-semibold">{transaction.status}</dd></div><div className="flex justify-between gap-4"><dt>Escrow workflow</dt><dd>{transaction.escrowStatus}</dd></div><div className="flex justify-between gap-4"><dt>Dispute state</dt><dd>{dispute?.status ?? "No local case record"}</dd></div></dl><p className="mt-5 rounded-lg bg-warning/10 p-3 text-xs text-textSecondary">Evidence filenames shown in the demo are not uploaded documents. Review authorized production evidence in the backend before a real decision.</p></Card>
      <Card className="p-5"><div className="flex items-center gap-2"><Scale className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold">Resolution panel</h2></div><div className="mt-4 space-y-4"><label className="block text-sm font-medium" htmlFor="audit-reason">Audit context / reason<textarea id="audit-reason" required minLength={10} maxLength={2000} value={reason} onChange={(event) => setReason(event.target.value)} className="mt-1 min-h-24 w-full rounded-xl border border-border bg-white p-3" placeholder="Record why this case outcome is appropriate." /></label><div className="grid gap-3 sm:grid-cols-2">{outcomes.map((outcome) => <Button key={outcome.status} type="button" variant={outcome.status === "REFUNDED" ? "secondary" : "primary"} disabled={busy || !["DISPUTED", "UNDER_REVIEW"].includes(transaction.status) || (role !== "DISPUTE_AGENT" && role !== "SUPER_ADMIN")} onClick={() => act(outcome.status, outcome.label)}>{outcome.label}</Button>)}</div><Button type="button" variant="secondary" className="w-full" disabled={busy || transaction.status !== "DISPUTED" || (role !== "DISPUTE_AGENT" && role !== "SUPER_ADMIN")} onClick={() => act("UNDER_REVIEW", "Move to under review")}>Move to under review</Button></div>{message && <p role="status" className="mt-4 rounded-xl bg-softGreen p-3 text-sm text-textSecondary">{message}</p>}<div className="mt-5 flex gap-2 rounded-xl bg-slate-50 p-3 text-xs text-textSecondary"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />Demo actions follow the backend state machine and require a reason; real authorization, decision policy, and audit persistence must be enforced server-side.</div></Card>
    </div>}
  </div></DashboardLayout>;
}
