import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Lock,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { trustIndicators } from "../../mock/data";

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden py-2 sm:py-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(10,31,77,0.12),_transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-6 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-10">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-white px-3 py-2 text-sm font-medium text-primary shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Trusted transaction protection
            </div>

            <h1 className="max-w-xl text-4xl font-extrabold tracking-[-0.06em] text-textPrimary sm:text-5xl lg:text-6xl">
              Don&apos;t trust the person.
              <br />
              <span className="text-primary">Trust the transaction.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-textSecondary">
              SafeTra helps buyers and sellers complete high-value deals with
              confidence by holding funds safely until the transaction is fully
              verified and delivered.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register">
                <Button className="h-12 px-6">
                  Start a Secure Transaction
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="secondary" className="h-12 px-6">
                  See How It Works
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-textSecondary">
              <span className="font-semibold text-textPrimary">
                Trusted by:
              </span>
              {trustIndicators.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-white px-3 py-1.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute -left-8 top-14 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -right-10 bottom-10 h-36 w-36 rounded-full bg-sky-200 blur-3xl" />

            <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-border bg-white shadow-card">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="African business partners finalizing a secure deal"
                className="h-[430px] w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08152F] via-[#08152F]/80 to-transparent p-5 text-white">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-blue-200">
                      Secure transaction
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">GH₵ 12,500 deal</h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-blue-100">
                    Protected
                  </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between text-sm text-blue-100">
                    <span>Buyer payment</span>
                    <span className="font-semibold text-white">Secured</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span className="text-blue-100">Seller</span>
                      <span className="font-medium text-white">
                        Ready to deliver
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span className="text-blue-100">Status</span>
                      <span className="font-semibold text-blue-200">
                        Funds held securely
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Why people choose SafeTra
          </p>
          <h2 className="mt-3 text-3xl font-bold text-textPrimary">
            A safer way to transact online
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Protected payments",
              detail:
                "Funds stay secure until both sides finish the deal and confirm completion.",
              icon: Lock,
              image:
                "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Neutral dispute support",
              detail:
                "SafeTra steps in when delivery, quality, or trust breaks down.",
              icon: ShieldCheck,
              image:
                "https://plus.unsplash.com/premium_photo-1707155465527-c5a2935b21cc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Simple flow",
              detail:
                "From deal creation to release, the process stays clear and easy to track.",
              icon: CheckCircle,
              image:
                "https://images.unsplash.com/photo-1644043350898-2f4ff1e17912?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ].map(({ title, detail, icon: Icon, image }) => (
            <Card key={title} className="overflow-hidden p-0">
              <img
                src={image}
                alt={title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-softBlue text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-textPrimary">
                  {title}
                </h3>
                <p className="text-textSecondary">{detail}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#08152F] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1714646184758-ab3d875b863b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="African customer support team"
              className="h-[420px] w-full rounded-[28px] object-cover shadow-2xl"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Built for trust
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Faster settlements, clearer accountability, safer deals.
            </h2>
            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Lock,
                  text: "Escrow protection for every step of the deal",
                },
                {
                  icon: BadgeCheck,
                  text: "Verified profiles and transparent milestones",
                },
                {
                  icon: Sparkles,
                  text: "Real-time updates that keep both parties aligned",
                },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-base text-blue-50">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register">
                <Button className="h-12 px-6">
                  Open a Secure Deal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button
                  variant="ghost"
                  className="h-12 border-white/20 bg-white/5 px-6 text-white hover:bg-white/10"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
