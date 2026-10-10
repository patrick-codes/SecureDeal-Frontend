import {
  Lock,
  ShieldCheck,
  CreditCard,
  FileText,
  Users,
  Eye,
} from "lucide-react";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";

const sections = [
  {
    title: "Payment Security",
    detail:
      "The backend tracks payment verification separately from transaction, escrow, and settlement states. This frontend prototype does not handle money.",
    icon: Lock,
  },
  {
    title: "Transaction Protection",
    detail:
      "An explicit transaction state machine prevents arbitrary status changes in the intended service workflow.",
    icon: ShieldCheck,
  },
  {
    title: "Dispute Resolution",
    detail:
      "Supported dispute reasons, authorized review roles, and resolution options are defined in the backend workflow.",
    icon: CreditCard,
  },
  {
    title: "Identity Verification",
    detail:
      "Users may be verified depending on transaction requirements and risk profile.",
    icon: Users,
  },
  {
    title: "Audit Trail",
    detail:
      "Important transaction events are recorded to support accountability and transparency.",
    icon: FileText,
  },
  {
    title: "Privacy",
    detail:
      "The production privacy notice must explain the data actually collected, used, shared, and retained.",
    icon: Eye,
  },
];

export default function SecurityPage() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Security
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-textPrimary">
            Built around clear and reviewable workflows.
          </h1>
        </div>

        <div className="mb-10 rounded-[28px] border border-border bg-white p-5 shadow-card lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-[24px] bg-primary p-6 text-white">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold">Secure by default</h3>
              <p className="mt-3 text-white/80">
                The backend defines explicit payment, transaction, escrow, dispute, settlement, authorization, and audit modules. The UI is a demonstration only; the backend and payment provider remain authoritative.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Transaction states", "Explicit workflow"],
                ["Payment events", "Provider-verified"],
                ["Dispute outcomes", "Role-authorized"],
                ["Audit history", "Backend-managed"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-softGreen/50 p-4"
                >
                  <div className="text-sm text-textSecondary">{label}</div>
                  <div className="mt-2 text-2xl font-bold text-textPrimary">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sections.map(({ title, detail, icon: Icon }) => (
            <Card key={title} className="p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-softGreen text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-textPrimary">
                {title}
              </h3>
              <p className="text-textSecondary">{detail}</p>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
