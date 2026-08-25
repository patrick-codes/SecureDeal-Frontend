import { Mail, MapPin, PhoneCall, LoaderCircle } from "lucide-react";
import { useState } from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Toast from "../../components/ui/Toast";

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSend = () => {
    setIsSending(true);
    setToast(null);

    window.setTimeout(() => {
      setIsSending(false);
      setToast("Your message was sent. Our team will reply within 24 hours.");
    }, 900);
  };

  return (
    <PublicLayout>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Contact
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-textPrimary">
              Talk to the SafeTra team
            </h1>
            <div className="mt-8 space-y-4">
              {[
                { icon: Mail, label: "Email", value: "hello@safetra.app" },
                { icon: PhoneCall, label: "Phone", value: "+233 20 000 0000" },
                { icon: MapPin, label: "Office", value: "Accra, Ghana" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-softGreen text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-textSecondary">{label}</div>
                    <div className="font-semibold text-textPrimary">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-textPrimary">
              Send a message
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input
                className="rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none ring-0 focus:border-primary"
                placeholder="Full name"
              />
              <input
                className="rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none ring-0 focus:border-primary"
                placeholder="Email"
              />
              <input
                className="sm:col-span-2 rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none ring-0 focus:border-primary"
                placeholder="Subject"
              />
              <textarea
                className="sm:col-span-2 min-h-[140px] rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none ring-0 focus:border-primary"
                placeholder="How can we help?"
              />
            </div>
            <Button className="mt-6" onClick={handleSend} disabled={isSending}>
              {isSending ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send message"
              )}
            </Button>
          </Card>
        </div>
      </section>
      <Toast
        show={Boolean(toast)}
        message={toast ?? ""}
        onClose={() => setToast(null)}
        tone="success"
      />
    </PublicLayout>
  );
}
