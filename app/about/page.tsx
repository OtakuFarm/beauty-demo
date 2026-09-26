import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Why LUMI makes twelve products and no more. The entirely fictional story of a skincare brand built around a routine you can keep.",
  openGraph: {
    title: "Our story | LUMI",
    description: "A fictional skincare brand built on one idea: a routine you can actually keep.",
    url: "https://lumi-demo.example.com/about",
  },
};

const values = [
  { title: "Fewer, better formulas", body: "Each product does one job properly. If a formula cannot be justified against the eleven others, it does not get made." },
  { title: "Plain-language labels", body: "Every ingredient explained in a sentence, and every claim traceable to why it is in the formula at all." },
  { title: "Designed for sensitive skin", body: "No drying alcohols, minimal fragrance, and formulas tested on the skin types the label names." },
  { title: "Refill, then recycle", body: "Glass and aluminium where possible, with a take-back scheme for empties, because packaging outlives the formula." },
];

const timeline = [
  { year: "2019", text: "A spreadsheet, one column per skin concern, one formula per row." },
  { year: "2021", text: "First eleven prototypes, of which four were quietly retired." },
  { year: "2023", text: "The method is formalised: four steps, split across morning and evening." },
  { year: "2026", text: "Twelve products, one shelf, and this portfolio demo of the storefront." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="A brand built from a spreadsheet, not a mood board"
        description="LUMI is fictional and this page is part of a design portfolio project, but the thinking behind the demo is real: fewer products, clearer claims, and a routine that fits on one page."
      />

      <div className="site-container py-16 lg:py-20">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="space-y-5 text-[15px] leading-relaxed text-muted">
              <p>
                Most people do not fail at skincare because they are not trying hard enough. They
                fail because the shelf asks for too much: ten-step routines, conflicting actives and
                products that were never designed to be used together.
              </p>
              <p>
                LUMI started from the opposite end. One formula per job. One job per formula. Twelve
                products in total, arranged so that steps one to four are the same whichever
                direction you approach the routine from.
              </p>
              <p>
                The rest of the work is unglamorous: stability testing, packaging that does not
                photograph badly after two weeks of sunlight, and copy that tells you how to use a
                product without making you feel stupid.
              </p>
            </div>

            <div className="rounded-sm bg-sand p-8">
              <p className="eyebrow">The method in one line</p>
              <p className="mt-4 font-display text-3xl leading-snug">
                Hydrate, treat once, seal. Every morning, every night.
              </p>
              <p className="mt-6 text-sm text-muted">
                The LUMI Complete Glow Set exists entirely to prove that four steps are enough.
              </p>
              <Link href="/product/complete-glow-set" className="btn-primary mt-6">
                See the set
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <section className="mt-20" aria-labelledby="values-heading">
            <h2 id="values-heading" className="display-2">
              What we hold to
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {values.map((value, i) => (
                <li key={value.title} className="border-t border-line pt-6">
                  <p className="text-[11px] uppercase tracking-widest text-gold">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{value.body}</p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section className="mt-20" aria-labelledby="timeline-heading">
            <h2 id="timeline-heading" className="display-2">
              How we got here
            </h2>
            <ol className="mt-10 border-t border-line">
              {timeline.map((entry) => (
                <li key={entry.year} className="flex flex-col gap-2 border-b border-line py-6 sm:flex-row sm:gap-10">
                  <span className="font-display text-2xl sm:w-24">{entry.year}</span>
                  <span className="max-w-xl text-sm leading-relaxed text-muted">{entry.text}</span>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section className="mt-20 rounded-sm border border-line p-8 lg:p-14" aria-labelledby="demo-heading">
            <h2 id="demo-heading" className="display-3">
              About this website
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
              LUMI is not a real company. This site is a front-end portfolio project: a fictional
              storefront built to demonstrate product storytelling, discovery, filtering and
              conversion-focused layout. No payments are processed, no orders are fulfilled, and all
              products, reviews, policies and results shown here are invented sample content.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">
                Browse the collection
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact page
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}