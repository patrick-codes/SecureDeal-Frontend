import { ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function ShareableTransactionPage() {
  const { transactionId } = useParams();

  return (
    <div
      className="min-h-screen px-4 py-8 sm:px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(7, 18, 40, 0.68), rgba(7, 18, 40, 0.68)), url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-md animate-fade-up overflow-hidden rounded-[30px] border border-white/20 bg-white shadow-[0_25px_80px_rgba(10,31,77,0.25)] backdrop-blur-sm">
        <div className="bg-gradient-to-r from-softGreen via-white to-softBlue px-5 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              <ShieldCheck className="h-4 w-4" /> SafeTra
            </div>
            <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary shadow-sm">
              Protected
            </span>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm text-textSecondary">
            Kwame wants to complete a secure transaction with you.
          </p>
          <div className="mt-5 rounded-2xl border border-border bg-slate-50 p-4">
            <div className="text-sm text-textSecondary">Transaction</div>
            <div className="mt-2 text-2xl font-bold text-textPrimary">
              iPhone 15 Pro Max
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-sm text-textSecondary">Seller</div>
                <div className="mt-1 text-lg font-semibold text-textPrimary">
                  Kwame Mensah
                </div>
              </div>
              <div className="text-xl font-bold text-primary">GH₵ 12,000</div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-border bg-softGreen/40 p-3 text-sm text-textPrimary">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Payment protected until successful delivery.
          </div>

          <div className="mt-6 space-y-3 text-sm text-textSecondary">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Verified Seller
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" /> Clear inspection
              period
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" /> Dispute support
              if needed
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button asChild className="h-12 w-full">
              <Link to={`/pay/${transactionId ?? "SD-83K29"}`}>
                Accept & Pay Securely
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-12 w-full">
              <Link to="/login">Review deal details</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
