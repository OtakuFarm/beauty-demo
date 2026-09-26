"use client";

import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { concerns } from "@/lib/site";
import { getProductsByConcern } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export function SkinGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concerns.find((c) => c.id === selected) ?? null;
  const recommended = selected ? getProductsByConcern(selected) : [];

  return (
    <div className="site-container py-16 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Skin guide</p>
        <h2 className="display-2 mt-4">What&rsquo;s your skin goal?</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Choose the one that sounds most like you. We&rsquo;ll suggest a short fictional routine from
          the LUMI line. This is a design demonstration — it is not medical or dermatological advice.
        </p>
      </div>

      <div className="mt-12">
        {active ? (
          <motion.section
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
          >
            <div className="rounded-sm border border-line bg-sand p-8">
              <p className="eyebrow">Your goal</p>
              <h3 className="display-3 mt-3">{active.label}</h3>
              <p className="mt-3 max-w-xl text-sm text-muted">{active.blurb}</p>

              <ol className="mt-6 space-y-2 text-sm">
                {active.routine.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/20 text-xs"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Change goal
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Start over
                </button>
              </div>
            </div>

            <div className="mt-14">
              <h3 className="flex items-center gap-2 font-display text-2xl">
                <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
                Recommended for {active.label.toLowerCase()}
              </h3>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
                {recommended.map((product, i) => (
                  <li key={product.id}>
                    <ProductCard product={product} index={i} />
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        ) : (
          <fieldset>
            <legend className="sr-only">Select your primary skin goal</legend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {concerns.map((concern, i) => (
                <motion.button
                  key={concern.id}
                  type="button"
                  onClick={() => setSelected(concern.id)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col items-start gap-3 rounded-sm border border-line bg-white p-7 text-left transition-all duration-500 ease-silk hover:border-ink hover:shadow-[0_24px_50px_-40px_rgba(28,27,25,0.6)]"
                >
                  <span className="font-display text-2xl">{concern.label}</span>
                  <span className="text-sm leading-relaxed text-muted">{concern.blurb}</span>
                  <span className="mt-2 text-[11px] uppercase tracking-widest text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    See the routine →
                  </span>
                </motion.button>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      <p className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-muted">
        <strong className="text-ink">Please note:</strong> LUMI is a fictional brand and this
        questionnaire is an interactive demo. It does not diagnose conditions, and nothing here is
        medical advice. For persistent or severe skin concerns, speak to a qualified healthcare
        professional.
      </p>
    </div>
  );
}
