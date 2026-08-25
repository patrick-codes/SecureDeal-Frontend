import { Link } from "react-router-dom";
import logoImage from "../../images/logo.png";
import appStoreImage from "../../images/App-Store.jpg";
import playStoreImage from "../../images/Play-Store.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                SafeTra
              </p>
              <h3 className="mt-3 text-2xl font-bold text-textPrimary sm:text-3xl">
                Safer deals. Better trust.
              </h3>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0e2d74]"
            >
              Start a secure deal
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xl font-bold text-textPrimary">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <img
                  src={logoImage}
                  alt="SafeTra logo"
                  className="h-6 w-6 rounded-md object-cover"
                />
              </div>
              <span>SafeTra</span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-slate-600">
              Escrow protection for modern transactions, built to keep every
              deal fair, secure, and transparent.
            </p>

            <div className="mt-5 flex flex-row items-center gap-3">
              <a
                href="#"
                className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-primary/30 hover:shadow-md"
                aria-label="Download on the App Store"
              >
                <img
                  src={appStoreImage}
                  alt="App Store"
                  className="h-11 w-auto object-cover"
                />
              </a>

              <a
                href="#"
                className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-primary/30 hover:shadow-md"
                aria-label="Get it on Google Play"
              >
                <img
                  src={playStoreImage}
                  alt="Google Play"
                  className="h-11 w-auto object-cover"
                />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link to="/how-it-works" className="hover:text-primary">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-primary">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              For users
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link to="/for-buyers" className="hover:text-primary">
                  For buyers
                </Link>
              </li>
              <li>
                <Link to="/for-sellers" className="hover:text-primary">
                  For sellers
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact us
                </Link>
              </li>
              <li>hello@safetra.app</li>
              <li>+233 20 000 0000</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <span>© 2026 SafeTra</span>
          <span>Protected transactions. Peace of mind.</span>
        </div>
      </div>
    </footer>
  );
}
