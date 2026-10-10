import { Bell, Lock, ShieldCheck, UserCog, LoaderCircle } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";

const settings = [
  {
    title: "Account security",
    detail: "Password changes and session management require the real authentication service.",
    icon: Lock,
  },
  {
    title: "Notifications",
    detail: "Select mock notification preferences below; no messages are sent.",
    icon: Bell,
  },
  {
    title: "Privacy controls",
    detail: "Privacy and data access controls must be enforced by the backend.",
    icon: ShieldCheck,
  },
  {
    title: "Profile preferences",
    detail: "Profile edits and email/phone verification are not connected in this prototype.",
    icon: UserCog,
  },
];

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setToast(null);

    window.setTimeout(() => {
      setIsSaving(false);
      localStorage.setItem("safetra.demo.preferences.v1", JSON.stringify({ transactionAlerts, securityAlerts }));
      setToast("Demo preferences saved in this browser only. No notification settings were changed on a server.");
    }, 900);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Settings</h1>
          <p className="mt-2 text-textSecondary">
            Manage local demonstration preferences. These controls do not change production account settings.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {settings.map(({ title, detail, icon: Icon }) => (
            <Card key={title} className="p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-softGreen text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-xl font-bold text-textPrimary">{title}</div>
              <p className="mt-3 text-textSecondary">{detail}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="mb-4 text-xl font-bold text-textPrimary">
            Security checklist
          </div>
          <div className="space-y-3 text-sm text-textSecondary">
            <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50 p-3">
              <span>Two-factor authentication</span>
              <span className="font-semibold text-textSecondary">Not configured</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50 p-3">
              <span>Transaction alerts</span>
              <span className="font-semibold text-textSecondary">Demo preference</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50 p-3">
              <span>Verified contact details</span>
              <span className="font-semibold text-textSecondary">Unverified in demo</span>
            </div>
          </div>
          <form className="mt-5 space-y-3" onSubmit={handleSave}>
            <label className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm"><input type="checkbox" checked={transactionAlerts} onChange={(event) => setTransactionAlerts(event.target.checked)} /> Transaction status alert preference (local only)</label>
            <label className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm"><input type="checkbox" checked={securityAlerts} onChange={(event) => setSecurityAlerts(event.target.checked)} /> Account security alert preference (local only)</label>
          <Button type="submit" className="mt-2" disabled={isSaving}>
            {isSaving ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Saving demo preferences...
              </span>
            ) : (
              "Save local preferences"
            )}
          </Button>
          </form>
        </Card>
      </div>
      <Toast
        show={Boolean(toast)}
        message={toast ?? ""}
        onClose={() => setToast(null)}
        tone="success"
      />
    </DashboardLayout>
  );
}
