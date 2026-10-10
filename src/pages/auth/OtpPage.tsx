import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { completeDemoRegistration } from "../../services/mockSafetra";

export default function OtpPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    setError("");
    window.setTimeout(() => {
      try {
        completeDemoRegistration();
        setIsSubmitting(false);
        setMessage("Demo verification complete. No OTP was sent or verified.");
        const returnTo = searchParams.get("returnTo");
        navigate(returnTo?.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/dashboard");
      } catch (cause) {
        setIsSubmitting(false);
        setError(cause instanceof Error ? cause.message : "Could not complete mock verification.");
      }
    }, 450);
  };

  return (
    <PublicLayout>
      <section className="mx-auto max-w-xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="p-6">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Verification
            </p>
            <h1 className="mt-3 text-3xl font-bold text-textPrimary">
              Enter OTP
            </h1>
            <p className="mt-3 text-textSecondary">
              Enter any 6 digits to preview the flow. No OTP is sent or verified.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex justify-center gap-3">
              <label className="sr-only" htmlFor="demo-otp">Six digit demo code</label>
              <input id="demo-otp" required inputMode="numeric" pattern="[0-9]{6}" minLength={6} maxLength={6} placeholder="000000" className="h-12 w-44 rounded-xl border border-border bg-slate-50 text-center text-lg font-semibold tracking-[0.4em] text-textPrimary outline-none focus:border-primary" />
            </div>
            <Button
              type="submit"
              fullWidth
              className="h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify account"
              )}
            </Button>
          </form>
          <div className="mt-5 text-center text-sm text-textSecondary">
            Need a code?{" "}
            <button className="font-semibold text-primary" type="button" onClick={() => setMessage("Demo only: no text message or email was sent.")}>
            Preview resend
            </button>
          </div>
          {error && <p role="alert" className="mt-3 text-center text-sm text-danger">{error}</p>}
          {message && <p role="status" className="mt-3 text-center text-sm text-textSecondary">{message}</p>}
        </Card>
      </section>
    </PublicLayout>
  );
}
