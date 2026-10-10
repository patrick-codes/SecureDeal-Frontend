import { LockKeyhole, Mail, LoaderCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { demoAccounts, setDemoSession } from "../../services/mockSafetra";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState(demoAccounts[0].email);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    window.setTimeout(() => {
      try {
        const session = setDemoSession(email);
        const returnTo = searchParams.get("returnTo");
        navigate(returnTo?.startsWith("/") && !returnTo.startsWith("//") ? returnTo : session.role === "USER" ? "/dashboard" : "/admin");
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Could not open this mock account.");
      } finally {
        setIsSubmitting(false);
      }
    }, 900);
  };

  return (
    <PublicLayout>
      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[32px] border border-white/20 bg-cover bg-center shadow-card"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(7,18,38,0.86), rgba(7,18,38,0.58)), url('https://images.unsplash.com/photo-1554672408-17407e0322ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="grid gap-5 px-5 py-8 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-12 lg:py-12">
            <div className="text-white">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-3 max-w-md text-base text-slate-200">
                Access your secure transactions and keep your deals protected.
              </p>
            </div>

            <Card className="p-6 shadow-2xl">
              <div className="mb-6 text-center">
                <div className="text-2xl font-bold text-textPrimary">
                  Log in
                </div>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <label htmlFor="login-email" className="block text-sm font-medium">Demo account email</label>
                <div className="rounded-xl border border-border bg-slate-50 px-3 py-2.5 focus-within:border-primary">
                  <div className="flex items-center gap-2 text-textSecondary">
                    <Mail className="h-4 w-4" />
                    <input
                      id="login-email"
                      type="email"
                      required
                      className="w-full border-0 bg-transparent px-1 py-1 text-sm outline-none"
                      aria-label="Demo account email"
                      value={email}
                      readOnly
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </div>
                <label htmlFor="login-password" className="block text-sm font-medium">Password</label>
                <div className="rounded-xl border border-border bg-slate-50 px-3 py-2.5 focus-within:border-primary">
                  <div className="flex items-center gap-2 text-textSecondary">
                    <LockKeyhole className="h-4 w-4" />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full border-0 bg-transparent px-1 py-1 text-sm outline-none"
                      placeholder="Any value · demo only"
                      aria-label="Password (not checked in demo)"
                    />
                    <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="rounded p-1 text-textSecondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                  </div>
                </div>
                <div className="rounded-xl border border-primary/15 bg-softGreen/40 p-3">
                  <label htmlFor="demo-role" className="mb-2 block text-xs font-semibold text-textSecondary">Choose a mock role</label>
                  <select id="demo-role" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
                    {demoAccounts.map((account) => <option key={account.role} value={account.email}>{account.name} · {account.role}</option>)}
                  </select>
                  <p className="mt-2 text-xs text-textSecondary">Demo only: this does not authenticate with the backend.</p>
                </div>
                {error && <p role="alert" className="text-sm text-danger">{error}</p>}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-textSecondary">
                    <input type="checkbox" defaultChecked /> Remember me
                  </label>
                  <Link
                    to="/forgot-password"
                    className="font-medium text-primary"
                  >
                    Forgot password?
                  </Link>
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
                      Signing in...
                    </span>
                  ) : (
                    "Log in"
                  )}
                </Button>
                <div className="text-center text-sm text-textSecondary">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="font-semibold text-primary">
                    Sign up
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
