import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ProductArtworkFromProduct } from "@/components/ProductArtwork";
import { products } from "@/lib/products";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skincare collection",
  description:
    "Cleansers, essences, serums, moisturisers, treatments, sun care and sets — the full LUMI skincare collection, organised by step and skin goal.",
  openGraph: {
    title: "Skincare collection | LUMI",
    description: "The complete LUMI routine, organised by step.",
    url: "https://lumi-demo.example.com/skincare",
  },
};

const steps = [
  {
    number: "01",
    title: "Cleanse",
    copy: "Twice a day, always lukewarm water. The balm for makeup nights, the gel for everything else.",
    slugs: ["cleansing-balm", "daily-glow-cleanser"],
  },
  {
    number: "02",
    title: "Prepare",
    copy: "A milky essence pressed into damp skin. This is the layer everything else builds on.",
    slugs: ["hydrating-essence"],
  },
  {
    number: "03",
    title: "Treat",
    copy: "One brightening serum in the morning, one repair serum at night. Never both at once.",
    slugs: ["vitamin-c-serum", "night-recovery-serum", "gentle-exfoliant"],
  },
  {
    number: "04",
    title: "Seal & protect",
    copy: "Ceramide cream to hold hydration in, SPF 50 to hold the results. Moisturiser at night, protection every morning.",
    slugs: ["barrier-repair-cream", "daily-spf", "facial-oil"],
  },
];

export default function SkincarePage() {
  const find = (slug: string) => products.find((p) => p.slug === slug)!;

  return (
    <>
      <PageHeader
        eyebrow="Skincare collection"
        title="Four steps, in order"
        description="The LUMI collection is organised by the order things go on your face, not by marketing category. Start at step one and work down — the rest takes care of itself."
      />

      <div className="site-container py-16 lg:py-20">
        <ol className="space-y-20 lg:space-y-28">
          {steps.map((step, index) => (
            <li key={step.number}>
              <Reveal>
                <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                  <div>
                    <p className="font-display text-5xl text-line" aria-hidden="true">
                      {step.number}
                    </p>
                    <h2 className="display-3 mt-4">{step.title}</h2>
                    <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">{step.copy}</p>
                    <Link
                      href="/skin-guide"
                      className="mt-6 inline-block text-[11px] uppercase tracking-widest text-muted"
                    >
                      <span className="link-underline">Not sure which one? Take the skin guide</span>
                    </Link>
                  </div>

                  <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
                    {step.slugs.map((slug, i) => (
                      <li key={slug}>
                        <ProductCard product={find(slug)} index={index * 3 + i} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <section className="mt-24 grid items-center gap-10 rounded-sm bg-sand p-8 lg:grid-cols-2 lg:p-14" aria-labelledby="skincare-set-heading">
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <ProductArtworkFromProduct product={find("complete-glow-set")} />
            </div>
            <div>
              <p className="eyebrow">Sets &amp; extras</p>
              <h2 id="skincare-set-heading" className="display-3 mt-3">
                The routine, already assembled
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                Masks, the eye contour and the overnight water mask fit around the core four. The
                Complete Glow Set is the fastest way to try the whole method.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/product/complete-glow-set" className="btn-primary">
                  View the set
                </Link>
                <Link href="/shop" className="btn-secondary">
                  Shop everything
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
