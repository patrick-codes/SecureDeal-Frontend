import { Link, useLocation } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";

const policies: Record<string, { title: string; sections: [string, string][] }> = {
  "/terms": {
    title: "Terms and Conditions",
    sections: [
      ["Draft for review", "This page is draft prototype content, not approved legal wording or legal advice. Have qualified Ghanaian counsel review and replace it before publication."],
      ["Using the service", "Users should provide accurate account and transaction information, review all trade terms before proceeding, and use the platform only for lawful transactions."],
      ["Transactions and payments", "The production service terms must explain transaction creation, seller acceptance, payment verification, escrow workflow, fees, cancellations, disputes, and settlement timing. The backend and provider records—not this prototype—will be authoritative."],
      ["Questions", "Contact the SafeTra support team for assistance with account or transaction questions."],
    ],
  },
  "/privacy": {
    title: "Privacy Policy",
    sections: [
      ["Draft for review", "This page is draft prototype content, not approved legal wording or legal advice. Confirm actual data practices and have qualified Ghanaian counsel review it before publication."],
      ["Information and use", "A final policy must describe the personal, identity, contact, transaction, payment-reference, device, and support information actually collected and how it is used."],
      ["Sharing and retention", "A final policy must state which service providers and authorized personnel may receive data, retention periods, security controls, and applicable user rights."],
      ["Prototype notice", "This frontend stores demonstration transactions and role selections in browser local storage. Do not enter real personal, financial, or identity information."],
    ],
  },
  "/dispute-policy": {
    title: "Dispute and Refund Policy",
    sections: [
      ["Draft for review", "This page is draft prototype content, not approved legal wording or legal advice. Outcomes depend on backend policy and case review; refunds are not guaranteed."],
      ["Raising a concern", "Users should report issues promptly, identify the affected transaction, describe the issue, and preserve relevant delivery or communication evidence."],
      ["Review and outcomes", "The production workflow may support release to seller, full refund, partial settlement, or cancellation, subject to the actual state machine, evidence, authorization, and applicable policy."],
      ["No automatic refund", "Opening a dispute interrupts normal release actions in the prototype but does not itself authorize or guarantee a refund."],
    ],
  },
};

export default function PolicyPage() {
  const { pathname } = useLocation();
  const policy = policies[pathname] ?? policies["/terms"];
  return <PublicLayout><section className="mx-auto max-w-4xl px-4 py-12 sm:px-6"><p className="text-sm font-semibold uppercase tracking-wider text-primary">SafeTra policies</p><h1 className="mt-2 text-3xl font-bold">{policy.title}</h1><div className="mt-6 space-y-4">{policy.sections.map(([heading, text]) => <Card key={heading} className="p-5"><h2 className="font-semibold">{heading}</h2><p className="mt-2 text-sm leading-6 text-textSecondary">{text}</p></Card>)}</div><Link to="/contact" className="mt-6 inline-block font-semibold text-primary">Contact support</Link></section></PublicLayout>;
}
