import { BellRing } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import Toast from "../../components/ui/Toast";
import { notifications } from "../../mock/data";

export default function NotificationsPage() {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-softGreen text-primary">
            <BellRing className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">
              Notifications
            </h1>
            <p className="text-textSecondary">
              Latest updates on your transactions and account.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.title}
              className="cursor-pointer p-5 transition hover:border-primary/30"
              onClick={() => setToast(notification.detail)}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-lg font-semibold text-textPrimary">
                    {notification.title}
                  </div>
                  <div className="mt-2 text-sm text-textSecondary">
                    {notification.detail}
                  </div>
                </div>
                <div className="text-xs font-medium text-textSecondary">
                  {notification.time}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Toast
        show={Boolean(toast)}
        message={toast ?? ""}
        onClose={() => setToast(null)}
        tone="info"
      />
    </DashboardLayout>
  );
}
