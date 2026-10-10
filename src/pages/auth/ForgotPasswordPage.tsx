import { ArrowLeft, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <PublicLayout>
      <section className="mx-auto max-w-xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="p-6">
          <Link
            to="/login"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to login
          </Link>
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-softGreen text-primary">
              <KeyRound className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-textPrimary">
              Reset your password
            </h1>
          </div>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            <label htmlFor="reset-contact" className="block text-sm font-medium">Account email</label>
            <input
              id="reset-contact"
              type="email"
              required
              className="w-full rounded-xl border border-border bg-slate-50 px-4 py-3 outline-none focus:border-primary"
              placeholder="name@example.com"
            />
            <Button type="submit" fullWidth className="h-12">
              Preview password reset
            </Button>
            {submitted && <p role="status" className="rounded-xl bg-softGreen p-3 text-sm text-textSecondary">Demo only: no reset email was sent. In production, the backend issues and verifies a reset token.</p>}
            <p className="text-xs text-textSecondary">For a reset-token screen preview, continue to <Link to="/reset-password" className="font-semibold text-primary">set a new password</Link>.</p>
          </form>
        </Card>
      </section>
    </PublicLayout>
  );
}
