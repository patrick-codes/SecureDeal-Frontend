import {
  Mail,
  LockKeyhole,
  User,
  Smartphone,
  LoaderCircle,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate("/otp");
    }, 900);
  };

  return (
    <PublicLayout>
      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[32px] border border-white/20 bg-cover bg-center shadow-card"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(7,18,38,0.87), rgba(7,18,38,0.62)), url('https://plus.unsplash.com/premium_photo-1661637996976-030cc7b87891?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="grid gap-5 px-5 py-8 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-12 lg:py-12">
            <div className="text-white">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Create your SafeTra account
              </h1>
              <p className="mt-3 max-w-md text-base text-slate-200">
                Set up your secure profile and start protecting your next
                transaction.
              </p>
            </div>

            <Card className="p-6 shadow-2xl">
              <div className="mb-6 text-center text-2xl font-bold text-textPrimary">
                Sign up
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="rounded-xl border border-border bg-slate-50 px-3 py-2.5 focus-within:border-primary">
                  <div className="flex items-center gap-2 text-textSecondary">
                    <User className="h-4 w-4" />
                    <input
                      className="w-full border-0 bg-transparent px-1 py-1 text-sm outline-none"
                      placeholder="Full name"
                      defaultValue="Kofi Mensah"
                    />
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-slate-50 px-3 py-2.5 focus-within:border-primary">
                  <div className="flex items-center gap-2 text-textSecondary">
                    <Smartphone className="h-4 w-4" />
                    <input
                      className="w-full border-0 bg-transparent px-1 py-1 text-sm outline-none"
                      placeholder="Phone number"
                      defaultValue="+233 20 123 4567"
                    />
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-slate-50 px-3 py-2.5 focus-within:border-primary">
                  <div className="flex items-center gap-2 text-textSecondary">
                    <Mail className="h-4 w-4" />
                    <input
                      className="w-full border-0 bg-transparent px-1 py-1 text-sm outline-none"
                      placeholder="Email"
                      defaultValue="kofi@safetra.app"
                    />
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-slate-50 px-3 py-2.5 focus-within:border-primary">
                  <div className="flex items-center gap-2 text-textSecondary">
                    <LockKeyhole className="h-4 w-4" />
                    <input
                      type="password"
                      className="w-full border-0 bg-transparent px-1 py-1 text-sm outline-none"
                      placeholder="Password"
                      defaultValue="safetra123"
                    />
                  </div>
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
                      Creating account...
                    </span>
                  ) : (
                    "Create account"
                  )}
                </Button>
                <div className="text-center text-sm text-textSecondary">
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-primary">
                    Log in
                  </Link>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
