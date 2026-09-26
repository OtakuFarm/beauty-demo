import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { getBestsellers, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductArtworkFromProduct } from "@/components/ProductArtwork";
import { Rating } from "@/components/Rating";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  description:
    "LUMI is a fictional premium skincare brand created for a design portfolio demo. A considered twelve-product ritual built on simple layering.",
};

const concerns = [
  { id: "hydration", label: "Hydration", blurb: "Water first - everything else works better.", tone: "bg-sand" },
  { id: "brightening", label: "Brightening", blurb: "Dull, uneven skin that has lost its light.", tone: "bg-blush/40" },
  { id: "texture", label: "Texture", blurb: "Rough patches, pores and lingering lines.", tone: "bg-clay/50" },
  { id: "oil-control", label: "Oil control", blurb: "Shine by noon, without the tight skin.", tone: "bg-sage/30" },
  { id: "sensitive", label: "Sensitive skin", blurb: "Reactive skin that needs a lighter touch.", tone: "bg-blush/25" },
];

const routineSteps = [
  { time: "Morning", title: "Cleanse, layer, treat", body: "Gel cleanse, essence, vitamin C, barrier cream, SPF." },
  { time: "Evening", title: "Melt, reset, treat", body: "Cleansing balm, essence, night serum, barrier cream." },
  { time: "Twice a week", title: "Resurface", body: "Exfoliant on two or three evenings, never stacked with the night serum." },
  { time: "Always", title: "Protect", body: "Two finger-lengths of SPF every morning, whatever else you skip." },
];

const reviews = [
  { name: "Amara O.", rating: 5, quote: "The first brand that made my routine feel calm rather than complicated. Four products, in order, and my skin finally behaves." },
  { name: "Farah I.", rating: 5, quote: "I bought the set expecting to like one thing. Two months later I have reordered the serum three times." },
  { name: "Nadia H.", rating: 4, quote: "Everything feels considered, down to the packaging. The only thing I would change is the tube sizes - I go through them fast." },
];

const socialCaptions = [
  "Morning routine, kept simple",
  "The essence layer",
  "Barrier, rebuilt",
  "Night reset",
  "Texture work",
  "The full ritual",
];

const results = [
  { days: "Week 2", title: "Hydration", caption: "Less midday tightness - demo subject, week two." },
  { days: "Week 6", title: "Brightness", caption: "More even-looking tone - demo subject, week six." },
  { days: "Week 12", title: "Texture", caption: "Smoother surface - demo subject, week twelve." },
];

export default function HomePage() {
  const bestsellers = getBestsellers();
  const featured = products.slice(0, 4);
  const hero = products[2];
  const set = products[11];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-sand/70">
        <div className="site-container grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <Reveal>
            <p className="eyebrow">{siteConfig.tagline}</p>
            <h1 className="display-1 mt-5">
              The quiet approach
              <br />
              to <em className="font-normal italic text-muted">radiant</em> skin.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
              LUMI is a fictional skincare line built on one idea: a routine you can actually keep.
              Layer hydration, treat with purpose, protect every morning. That is the whole method.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">
                Shop the collection
              </Link>
              <Link href="/skin-guide" className="btn-secondary">
                Find your ritual
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted">
              Portfolio demo - LUMI is not a real company and nothing here is for sale.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-sand">
              <ProductArtworkFromProduct product={hero} />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-sm border border-line bg-cream px-5 py-4 shadow-[0_24px_60px_-40px_rgba(28,27,25,0.5)] sm:block">
              <Rating value={4.7} count={528} />
              <p className="mt-1 text-xs text-muted">Most reviewed formula</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="site-container py-16 lg:py-24" aria-labelledby="featured-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 id="featured-heading" className="display-2 mt-3">
              Where most people begin
            </h2>
          </div>
          <Link href="/shop" className="link-underline text-xs uppercase tracking-widest text-muted">
            Shop all products
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {featured.map((product, i) => (
            <li key={product.id}>
              <ProductCard product={product} index={i} />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-sand/50 py-16 lg:py-24" aria-labelledby="concern-heading">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow">Shop by concern</p>
            <h2 id="concern-heading" className="display-2 mt-3 max-w-2xl">
              Start from your skin, not from the shelf
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-muted">
              Every LUMI formula is mapped to what it is actually good at. Pick the one that sounds
              like you and we will point you at a short routine.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {concerns.map((concern, i) => (
              <li key={concern.id}>
                <Reveal delay={i * 0.06}>
                  <Link
                    href={`/shop?concern=${concern.id}`}
                    className={`group flex h-full flex-col justify-between rounded-sm border border-line p-7 transition-all duration-500 ease-silk hover:border-ink ${concern.tone}`}
                  >
                    <span>
                      <span className="block font-display text-2xl">{concern.label}</span>
                      <span className="mt-2 block text-sm text-muted">{concern.blurb}</span>
                    </span>
                    <span className="mt-8 text-[11px] uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Shop this goal
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-container py-16 lg:py-24" aria-labelledby="bestsellers-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Best sellers</p>
            <h2 id="bestsellers-heading" className="display-2 mt-3">
              Reordered more than once
            </h2>
          </div>
          <Link href="/shop?sort=rating" className="link-underline text-xs uppercase tracking-widest text-muted">
            See what is rated highest
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
          {bestsellers.map((product, i) => (
            <li key={product.id}>
              <ProductCard product={product} index={i} />
            </li>
          ))}
        </ul>
      </section>
      <section className="border-y border-line bg-ink py-16 text-cream lg:py-24" aria-labelledby="ingredient-heading">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[11px] uppercase tracking-widest text-cream/60">Ingredient spotlight</p>
            <h2 id="ingredient-heading" className="display-2 mt-4">
              Niacinamide, at four per cent
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-cream/70">
              The most researched skincare ingredient in the world, and the most often used at a
              dose too high to be comfortable. LUMI uses four per cent, the concentration where the
              refining and calming benefits are visible and the sting is not.
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { term: "Refines", desc: "Softens the look of pores and uneven texture." },
                { term: "Calms", desc: "Helps reduce the look of redness over time." },
                { term: "Supports", desc: "Works with ceramides to reinforce the barrier." },
              ].map((item) => (
                <div key={item.term}>
                  <dt className="font-display text-xl">{item.term}</dt>
                  <dd className="mt-1 text-sm text-cream/60">{item.desc}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/product/night-recovery-serum"
                className="btn-secondary border-cream/30 text-cream hover:bg-cream hover:text-ink"
              >
                See it in the night serum
              </Link>
              <Link href="/product/daily-spf" className="link-underline text-xs uppercase tracking-widest text-cream/70">
                And in Daily SPF
              </Link>
            </div>
            <p className="mt-6 text-xs text-cream/50">
              Ingredient copy on this site is illustrative demo content, not a clinical claim.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <ProductArtworkFromProduct product={products[4]} backdrop="#232220" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-container py-16 lg:py-24" aria-labelledby="routine-heading">
        <Reveal>
          <p className="eyebrow">The LUMI method</p>
          <h2 id="routine-heading" className="display-2 mt-3 max-w-2xl">
            One routine, split across the day
          </h2>
          <p className="mt-4 max-w-xl text-[15px] text-muted">
            Actives never stack on the same evening. Morning handles brightness, night handles
            repair, and both finish with the same barrier cream.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {routineSteps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.07}>
                <div className="border-t border-line pt-5">
                  <p className="text-[11px] uppercase tracking-widest text-gold">{step.time}</p>
                  <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-6 rounded-sm bg-sand p-8 lg:p-10">
            <div className="min-w-[16rem] flex-1">
              <h3 className="display-3">Not sure where to start?</h3>
              <p className="mt-2 max-w-lg text-sm text-muted">
                The Complete Glow Set contains the four steps the method is built on, in full sizes.
              </p>
            </div>
            <Link href="/product/complete-glow-set" className="btn-primary">
              View the set
            </Link>
          </div>
        </Reveal>
      </section>
      <section className="border-y border-line bg-sand/50 py-16 lg:py-24" aria-labelledby="story-heading">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 id="story-heading" className="display-2 mt-3">
              Built after a decade of overcomplicated shelves
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              LUMI began as a spreadsheet. One formula per job, one job per formula, and nothing on
              the shelf without a reason to exist. Twelve products later, the routine still fits on
              one page, which was the entire point.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Every formula is fragrance-light, alcohol-free and matched to the skin types the label
              names. Ingredients are listed in full, in plain language, because a routine you cannot
              understand is a routine you will not keep.
            </p>
            <Link href="/about" className="btn-secondary mt-8">
              Read the full story
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 gap-6">
              {[
                { value: "12", label: "Products, and no more" },
                { value: "4", label: "Steps in the core method" },
                { value: "0", label: "Drying alcohols in any formula" },
                { value: "100%", label: "Fictional, this is a demo" },
              ].map((stat) => (
                <li key={stat.label} className="rounded-sm border border-line bg-cream p-6">
                  <p className="font-display text-4xl">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-muted">{stat.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="site-container py-16 lg:py-24" aria-labelledby="reviews-heading">
        <Reveal>
          <p className="eyebrow">What people say</p>
          <h2 id="reviews-heading" className="display-2 mt-3">
            Reviews from the fictional world of LUMI
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <li key={review.name}>
              <Reveal delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-sm border border-line bg-white p-7">
                  <Rating value={review.rating} showValue={false} />
                  <blockquote className="mt-4 flex-1 font-display text-xl leading-snug">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-xs uppercase tracking-widest text-muted">
                    {review.name}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">
          Every review on this site is fictional demo content written to demonstrate a storefront
          layout.
        </p>
      </section>

      <section className="border-y border-line bg-sand/50 py-16 lg:py-24" aria-labelledby="results-heading">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow">Results</p>
            <h2 id="results-heading" className="display-2 mt-3 max-w-2xl">
              Illustrative before &amp; after
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-muted">
              The panels below are generated graphics, not photographs of real people. They exist to
              show how a results section can be laid out, and the timestamps, participants and
              outcomes are all invented for this demo.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {results.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 0.08}>
                  <figure className="overflow-hidden rounded-sm border border-line bg-cream">
                    <div className="grid grid-cols-2">
                      <div className="relative aspect-square border-r border-line bg-clay/40">
                        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-2.5 py-1 text-[10px] uppercase tracking-widest">
                          Before
                        </span>
                      </div>
                      <div className="relative aspect-square bg-sage/30">
                        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-2.5 py-1 text-[10px] uppercase tracking-widest">
                          After
                        </span>
                      </div>
                    </div>
                    <figcaption className="p-5">
                      <p className="text-[11px] uppercase tracking-widest text-gold">{item.days}</p>
                      <p className="mt-2 font-display text-xl">{item.title}</p>
                      <p className="mt-1 text-xs text-muted">{item.caption}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-muted">
            Not medical advice, and not evidence of any real product result. Individual skin responds
            differently.
          </p>
        </div>
      </section>
      <section className="site-container py-16 lg:py-24" aria-labelledby="newsletter-heading">
        <Reveal>
          <div className="grid items-center gap-10 rounded-sm border border-line p-8 lg:grid-cols-2 lg:p-14">
            <div>
              <p className="eyebrow">Newsletter</p>
              <h2 id="newsletter-heading" className="display-2 mt-3">
                Notes on skin, once a month
              </h2>
              <p className="mt-4 max-w-md text-[15px] text-muted">
                One email a month: an ingredient explained, a restock, and 10% off when you are
                ready. No noise, and unsubscribe whenever you like.
              </p>
            </div>
            <NewsletterForm
              variant="hero"
              note="This is a demo form. Your address is validated but never stored or sent anywhere."
            />
          </div>
        </Reveal>
      </section>

      <section className="site-container pb-24" aria-labelledby="gallery-heading">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">@lumi.ritual</p>
              <h2 id="gallery-heading" className="display-2 mt-3">
                The ritual, in pictures
              </h2>
            </div>
            <span className="text-xs uppercase tracking-widest text-muted">
              Demo gallery, not a real social feed
            </span>
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {socialCaptions.map((caption, i) => (
            <li key={caption}>
              <Reveal delay={i * 0.05}>
                <figure className="group">
                  <div className="aspect-square overflow-hidden rounded-sm bg-sand">
                    <div className="h-full w-full transition-transform duration-700 ease-silk group-hover:scale-105 motion-reduce:transition-none">
                      <ProductArtworkFromProduct
                        product={products[i]}
                        backdrop={i % 2 === 0 ? "#f1ece4" : "#ece7e0"}
                      />
                    </div>
                  </div>
                  <figcaption className="mt-2 text-[11px] leading-snug text-muted">{caption}</figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-sand py-16 lg:py-20">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <ProductArtworkFromProduct product={set} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">The gift set</p>
            <h2 className="display-2 mt-3">Four steps, one box, a third off</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              The Complete Glow Set gathers the Cleansing Balm, Hydrating Essence, Vitamin C Serum
              and Barrier Repair Cream into the routine the method is built on, in full sizes, in a
              linen pouch, with a printed ritual card.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/product/complete-glow-set" className="btn-primary">
                View the set
              </Link>
              <Link href="/shop?category=Sets" className="btn-secondary">
                All sets
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}