import { FormEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AlertTriangle, FileText } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getMockDisputes, getMockTransactions, openMockDispute } from "../../services/mockSafetra";

const reasons = [
  ["ITEM_NOT_RECEIVED", "Item not received"],
  ["WRONG_ITEM", "Wrong item"],
  ["DAMAGED_ITEM", "Damaged item"],
  ["ITEM_NOT_AS_DESCRIBED", "Item not as described"],
  ["SELLER_DID_NOT_SHIP", "Seller did not ship"],
  ["PAYMENT_ISSUE", "Payment issue"],
  ["OTHER", "Other"],
];
const eligible = ["FUNDED", "ACCEPTED", "SELLER_PREPARING", "SHIPPED", "DELIVERED", "INSPECTION"];

export default function DisputesPage() {
  const [searchParams] = useSearchParams();
  const transactions = getMockTransactions();
  const disputes = getMockDisputes();
  const available = transactions.filter((transaction) => eligible.includes(transaction.status));
  const [transactionId, setTransactionId] = useState(searchParams.get("transactionId") ?? available[0]?.id ?? "");
  const [reason, setReason] = useState(reasons[0][0]);
  const [description, setDescription] = useState("");
  const [evidenceNames, setEvidenceNames] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setFeedback("");
    if (description.trim().length < 1 || description.length > 2000) { setFeedback("Describe the issue (up to 2,000 characters)."); return; }
    setSubmitting(true);
    try {
      const dispute = await openMockDispute({ transactionId, reason, description: description.trim(), evidenceNames });
      setFeedback(`Demo dispute ${dispute.id} opened. The trade's normal release path is interrupted. No evidence was uploaded.`);
      setDescription("");
      setEvidenceNames([]);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not open a demo dispute.");
    } finally {
      setSubmitting(false);
    }
  };
  return <DashboardLayout><div className="space-y-6">
    <header><h1 className="text-3xl font-bold">Dispute center</h1><p className="mt-2 text-textSecondary">Report an issue and review demonstration cases. A dispute does not automatically authorize or guarantee a refund.</p></header>
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="p-5 sm:p-6"><h2 className="text-xl font-semibold">Your demo cases</h2><div className="mt-4 space-y-3">{disputes.length ? disputes.map((dispute) => <Link key={dispute.id} to={`/dashboard/transactions/${dispute.transactionId}`} className="block rounded-xl border border-border p-4 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-primary">{dispute.id} · {dispute.transactionId}</p><p className="mt-1 font-semibold">{reasons.find(([value]) => value === dispute.reason)?.[1] ?? dispute.reason}</p></div><span className="rounded-full bg-warning/10 px-2 py-1 text-xs font-semibold">{dispute.status}</span></div><p className="mt-2 text-sm text-textSecondary">{dispute.description}</p><p className="mt-2 text-xs text-textSecondary">{dispute.evidenceNames.length} evidence filename(s) · local only</p></Link>) : <p className="text-sm text-textSecondary">No demo disputes yet.</p>}</div><p className="mt-4 rounded-xl bg-softGreen/50 p-3 text-xs text-textSecondary">Resolution outcomes available in the backend include release to seller, full refund, partial settlement, or cancellation. Authorized staff and backend policy determine outcomes.</p></Card>
      <Card className="p-5 sm:p-6"><div className="flex items-center gap-3"><AlertTriangle className="h-6 w-6 text-warning" /><div><h2 className="text-xl font-semibold">Open a dispute</h2><p className="text-sm text-textSecondary">Choose an eligible transaction and explain the issue.</p></div></div>
        <form onSubmit={submit} className="mt-5 space-y-4">
          <div><label htmlFor="dispute-transaction" className="mb-1 block text-sm font-medium">Transaction</label><select id="dispute-transaction" required value={transactionId} onChange={(event) => setTransactionId(event.target.value)} className="w-full rounded-xl border border-border bg-white px-3 py-3 text-sm">{available.map((transaction) => <option key={transaction.id} value={transaction.id}>{transaction.id} · {transaction.productName} · {transaction.status}</option>)}</select>{available.length === 0 && <p className="mt-1 text-xs text-textSecondary">No currently eligible demo trades.</p>}</div>
          <div><label htmlFor="dispute-reason" className="mb-1 block text-sm font-medium">Reason</label><select id="dispute-reason" value={reason} onChange={(event) => setReason(event.target.value)} className="w-full rounded-xl border border-border bg-white px-3 py-3 text-sm">{reasons.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
          <div><label htmlFor="dispute-description" className="mb-1 block text-sm font-medium">What happened?</label><textarea id="dispute-description" required minLength={1} maxLength={2000} value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-32 w-full rounded-xl border border-border bg-white px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Describe what was agreed and what went wrong." /><p className="mt-1 text-right text-xs text-textSecondary">{description.length}/2000</p></div>
          <div><label htmlFor="evidence" className="mb-1 block text-sm font-medium">Evidence filenames (demo only)</label><input id="evidence" type="file" multiple accept="image/*,.pdf" onChange={(event) => setEvidenceNames(Array.from(event.target.files ?? []).map((file) => file.name))} className="w-full rounded-xl border border-dashed border-border p-3 text-sm" /><div className="mt-2 space-y-1">{evidenceNames.map((name) => <p key={name} className="flex items-center gap-2 text-xs text-textSecondary"><FileText className="h-3 w-3" />{name} · not uploaded</p>)}</div></div>
          <p className="rounded-xl bg-warning/10 p-3 text-xs text-textSecondary">Submitting moves the selected demo transaction to DISPUTED and freezes its mock escrow status. No evidence file leaves your device.</p>
          {feedback && <p role="status" className="text-sm text-textSecondary">{feedback}</p>}
          <Button type="submit" className="w-full" disabled={submitting || available.length === 0}>{submitting ? "Opening demo dispute…" : "Review and submit dispute"}</Button>
        </form>
      </Card>
    </div>
  </div></DashboardLayout>;
}
