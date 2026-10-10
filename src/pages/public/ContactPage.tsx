import { MessageCircle, LoaderCircle } from "lucide-react";
import { useState } from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Toast from "../../components/ui/Toast";

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setToast(null);

    window.setTimeout(() => {
      setIsSending(false);
      setToast("Demo only: your message was not sent. Contact details will be added before launch.");
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
            <div className="mt-8 rounded-2xl border border-border bg-white p-5">
              <MessageCircle className="h-6 w-6 text-primary" />
              <p className="mt-3 text-sm leading-6 text-textSecondary">Contact channels are not configured in this prototype. Use the form to preview its layout; submissions are not transmitted or saved.</p>
            </div>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-textPrimary">
              Send a message
            </h2>
            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSend}>
              <label className="text-sm font-medium">Full name<input required className="mt-1 w-full rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none focus:border-primary" placeholder="Full name" /></label>
              <label className="text-sm font-medium">Email<input type="email" required className="mt-1 w-full rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none focus:border-primary" placeholder="name@example.com" /></label>
              <label className="text-sm font-medium sm:col-span-2">Subject<input required className="mt-1 w-full rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none focus:border-primary" placeholder="Subject" /></label>
              <label className="text-sm font-medium sm:col-span-2">Message<textarea required className="mt-1 min-h-[140px] w-full rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none focus:border-primary" placeholder="How can we help?" /></label>
              <Button type="submit" className="sm:col-span-2" disabled={isSending}>
                {isSending ? <span className="inline-flex items-center gap-2"><LoaderCircle className="h-4 w-4 animate-spin" />Preparing demo…</span> : "Preview message"}
              </Button>
            </form>
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
