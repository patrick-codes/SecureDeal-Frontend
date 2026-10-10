import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function ResetPasswordPage() {
  const [notice, setNotice] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password"));
    const confirmation = String(data.get("confirmation"));
    if (password !== confirmation) { setNotice("Passwords do not match."); return; }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setNotice("Use at least 8 characters with uppercase, lowercase, a number, and one of !@#$%^&*.");
      return;
    }
    setNotice("Demo only: password was not changed. A real reset token and backend verification are required.");
  };
  return <PublicLayout><section className="mx-auto max-w-xl px-4 py-16"><Card className="p-6"><h1 className="text-3xl font-bold">Choose a new password</h1><p className="mt-2 text-sm text-textSecondary">This screen previews backend password rules; no password is stored or changed.</p><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-medium">Reset token<input name="token" required className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3" placeholder="Demo token" /></label><label className="block text-sm font-medium">New password<input name="password" type="password" required minLength={8} className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3" /></label><label className="block text-sm font-medium">Confirm new password<input name="confirmation" type="password" required minLength={8} className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3" /></label><p className="text-xs text-textSecondary">At least 8 characters, uppercase, lowercase, number, and one of !@#$%^&*.</p><Button type="submit" className="w-full">Preview password update</Button>{notice && <p role="status" className="rounded-xl bg-softGreen p-3 text-sm text-textSecondary">{notice}</p>}</form><Link to="/login" className="mt-5 inline-block text-sm font-semibold text-primary">Back to login</Link></Card></section></PublicLayout>;
}
