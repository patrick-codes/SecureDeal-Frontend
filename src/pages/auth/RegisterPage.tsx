import { FormEvent, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { setPendingDemoProfile } from "../../services/mockSafetra";

const inputClass = "mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10";
const validPassword = (password: string) => password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password);

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim().toLowerCase();
    const phone = String(data.get("phone")).replace(/[\s-]/g, "");
    const userType = String(data.get("userType")) === "SELLER" ? "SELLER" : "BUYER";
    const password = String(data.get("password"));
    const confirmation = String(data.get("confirmation"));
    if (name.length < 2) { setError("Enter your full name (at least 2 characters)."); return; }
    if (!/^\+?[\d\s-()]+$/.test(phone)) { setError("Enter a valid phone number."); return; }
    if (!validPassword(password)) { setError("Use 8+ characters with uppercase, lowercase, a digit, and one of !@#$%^&*."); return; }
    if (password !== confirmation) { setError("Passwords do not match."); return; }
    setBusy(true);
    setPendingDemoProfile({ email, name, phone, userType });
    window.setTimeout(() => {
      setBusy(false);
      const returnTo = searchParams.get("returnTo");
      navigate(returnTo?.startsWith("/") && !returnTo.startsWith("//") ? `/otp?returnTo=${encodeURIComponent(returnTo)}` : "/otp");
    }, 350);
  };
  return <PublicLayout><section className="mx-auto max-w-3xl px-4 py-10 sm:py-14"><Card className="p-5 sm:p-8"><p className="text-sm font-semibold uppercase tracking-wider text-primary">Create a mock account</p><h1 className="mt-2 text-3xl font-bold">Join SafeTra</h1><p className="mt-2 text-sm text-textSecondary">Backend-aligned fields, local-only experience. No password is stored and no OTP is sent.</p><form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
    <label className="text-sm font-medium sm:col-span-2">Full name<input name="name" required minLength={2} maxLength={100} className={inputClass} autoComplete="name" /></label>
    <label className="text-sm font-medium">Email<input name="email" type="email" required className={inputClass} autoComplete="email" /></label>
    <label className="text-sm font-medium">Phone number<input name="phone" type="tel" required className={inputClass} placeholder="+233 24 123 4567" autoComplete="tel" /></label>
    <label className="text-sm font-medium">Account use<select name="userType" className={inputClass}><option value="BUYER">I’m buying</option><option value="SELLER">I’m selling</option></select></label>
    <span className="self-end pb-3 text-xs text-textSecondary">The backend assigns account role and verification status.</span>
    <label className="text-sm font-medium">Password<input name="password" type="password" required className={inputClass} autoComplete="new-password" /></label>
    <label className="text-sm font-medium">Confirm password<input name="confirmation" type="password" required className={inputClass} autoComplete="new-password" /></label>
    {error && <p role="alert" className="rounded-xl bg-danger/10 p-3 text-sm text-danger sm:col-span-2">{error}</p>}
    <p className="rounded-xl bg-softGreen/50 p-3 text-xs text-textSecondary sm:col-span-2">Demo only: these details stay in this browser for the verification preview. Do not enter real credentials or sensitive information.</p>
    <Button type="submit" className="sm:col-span-2" disabled={busy}>{busy ? "Preparing demo verification…" : "Continue to verification preview"}</Button>
  </form><p className="mt-5 text-center text-sm text-textSecondary">Already signed up? <Link to={`/login${searchParams.get("returnTo") ? `?returnTo=${encodeURIComponent(searchParams.get("returnTo") ?? "")}` : ""}`} className="font-semibold text-primary">Log in to demo</Link></p></Card></section></PublicLayout>;
}
