import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PublicLayout from "../../components/layout/PublicLayout";
import { faqItems } from "../../mock/data";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PublicLayout>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            FAQ
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-textPrimary">
            Everything you need to know
          </h1>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-border bg-white shadow-card"
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-lg font-semibold text-textPrimary">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-textSecondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-border px-5 py-4 text-textSecondary">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
