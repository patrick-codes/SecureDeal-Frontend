import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function OtpPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 900);
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
              A 6-digit code was sent to +233 20 123 4567
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex justify-center gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  maxLength={1}
                  defaultValue={index === 0 ? "1" : ""}
                  className="h-12 w-11 rounded-xl border border-border bg-slate-50 text-center text-lg font-semibold text-textPrimary outline-none focus:border-primary"
                />
              ))}
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
            Didn&apos;t receive code?{" "}
            <button className="font-semibold text-primary" type="button">
              Resend
            </button>
          </div>
        </Card>
      </section>
    </PublicLayout>
  );
}
