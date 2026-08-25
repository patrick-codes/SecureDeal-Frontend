import { CheckCircle, Mail, Phone, ShieldCheck, Star } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Profile</h1>
          <p className="mt-2 text-textSecondary">
            Your identity, verification status, and trust profile.
          </p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
              K
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-textPrimary">
                Kofi Mensah
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-textSecondary">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> kofi@safetra.app
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> +233 20 123 4567
                </span>
              </div>
            </div>
            <div className="rounded-full bg-success/10 px-3 py-2 text-sm font-semibold text-success">
              Identity verified
            </div>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Identity", value: "Verified ✓", icon: ShieldCheck },
            { label: "Phone", value: "Verified ✓", icon: Phone },
            { label: "Email", value: "Verified ✓", icon: Mail },
            { label: "Seller reputation", value: "98%", icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <Card key={label} className="p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-softGreen text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-sm text-textSecondary">{label}</div>
              <div className="mt-2 text-xl font-bold text-textPrimary">
                {value}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm text-textSecondary">
                Completed transactions
              </div>
              <div className="mt-2 text-3xl font-bold text-textPrimary">42</div>
            </div>
            <div>
              <div className="text-sm text-textSecondary">Disputes</div>
              <div className="mt-2 text-3xl font-bold text-textPrimary">1</div>
            </div>
            <div>
              <div className="text-sm text-textSecondary">Trust score</div>
              <div className="mt-2 flex items-center gap-2 text-3xl font-bold text-textPrimary">
                <CheckCircle className="h-6 w-6 text-success" /> 98%
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
