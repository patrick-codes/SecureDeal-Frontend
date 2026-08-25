import { Bell, Lock, ShieldCheck, UserCog, LoaderCircle } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";

const settings = [
  {
    title: "Account security",
    detail: "Update password and manage your login methods.",
    icon: Lock,
  },
  {
    title: "Notifications",
    detail: "Control how and when you receive updates.",
    icon: Bell,
  },
  {
    title: "Privacy controls",
    detail: "Choose the visibility of your profile and transaction data.",
    icon: ShieldCheck,
  },
  {
    title: "Profile preferences",
    detail: "Update personal details and contact information.",
    icon: UserCog,
  },
];

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = () => {
    setIsSaving(true);
    setToast(null);

    window.setTimeout(() => {
      setIsSaving(false);
      setToast("Settings saved successfully.");
    }, 900);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Settings</h1>
          <p className="mt-2 text-textSecondary">
            Manage your SafeTra preferences and security controls.
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
              <span className="font-semibold text-success">Enabled</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50 p-3">
              <span>Transaction alerts</span>
              <span className="font-semibold text-primary">On</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50 p-3">
              <span>Verified contact details</span>
              <span className="font-semibold text-success">Complete</span>
            </div>
          </div>
          <Button className="mt-6" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save changes"
            )}
          </Button>
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
