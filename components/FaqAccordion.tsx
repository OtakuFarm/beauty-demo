"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { faqs } from "@/lib/content";
import { cx } from "@/lib/utils";

export function FaqAccordion() {
  const categories = useMemo(() => Array.from(new Set(faqs.map((f) => f.category))), []);
  const [active, setActive] = useState<string>(categories[0] ?? "Orders");
  const [open, setOpen] = useState<string | null>(faqs[0]?.q ?? null);

  return (
    <div className="grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
      <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow mb-3">Categories</p>
        <ul className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:gap-1">
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                onClick={() => {
                  setActive(category);
                  const first = faqs.find((f) => f.category === category);
                  setOpen(first?.q ?? null);
                }}
                aria-pressed={active === category}
                className={cx(
                  "whitespace-nowrap rounded-full px-4 py-2 text-xs transition-colors lg:rounded-none lg:px-0 lg:py-1.5 lg:text-sm",
                  active === category
                    ? "bg-ink text-cream lg:bg-transparent lg:text-ink lg:underline lg:underline-offset-4"
                    : "text-muted hover:text-ink"
                )}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <ul className="border-t border-line">
          {faqs
            .filter((faq) => faq.category === active)
            .map((faq) => {
              const isOpen = open === faq.q;
              return (
                <li key={faq.q} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : faq.q)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.q.replace(/\s+/g, "-")}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-xl sm:text-2xl">{faq.q}</span>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line"
                        aria-hidden="true"
                      >
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${faq.q.replace(/\s+/g, "-")}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted">{faq.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
