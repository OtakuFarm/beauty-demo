import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProductBySlug, getRelated, products } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { Rating } from "@/components/Rating";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: `${product.shortDescription} ${product.size}. Fictional product from the LUMI portfolio demo.`,
    openGraph: {
      title: `${product.name} | LUMI`,
      description: product.shortDescription,
      type: "website",
      url: `https://lumi-demo.example.com/product/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product, 4);

  return (
    <div className="site-container py-10 lg:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="link-underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <Link href="/shop" className="link-underline">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <Link href={`/shop?category=${product.category}`} className="link-underline">
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3" />
          </li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery shape={product.shape} tones={product.tones} name={product.name} />

        <div>
          <p className="eyebrow">{product.subtitle}</p>
          <h1 className="display-2 mt-3">{product.name}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Rating value={product.rating} count={product.reviewCount} size="md" />
            <a href="#reviews" className="link-underline text-xs text-muted">
              Read reviews
            </a>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8">
            <ProductPurchase product={product} />
          </div>

          <div className="mt-10 space-y-3">
            {[
              { title: "Suits", body: product.skinTypes.join(" · ") },
              { title: "Size", body: product.size },
              {
                title: "Availability",
                body: product.inStock ? "In stock" : "Temporarily out of stock",
              },
            ].map((row) => (
              <div key={row.title} className="flex gap-6 border-b border-line pb-3 text-sm">
                <span className="w-28 shrink-0 text-muted">{row.title}</span>
                <span>{row.body}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <section aria-labelledby="story-heading">
            <h2 id="story-heading" className="display-3">
              The story
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{product.story}</p>
            <p className="mt-4 text-sm text-muted">{product.shortDescription}</p>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section aria-labelledby="ingredients-heading">
            <h2 id="ingredients-heading" className="display-3">
              Key ingredients
            </h2>
            <dl className="mt-6 space-y-5">
              {product.ingredients.map((ingredient) => (
                <div key={ingredient.name} className="border-b border-line pb-4">
                  <dt className="font-display text-lg">{ingredient.name}</dt>
                  <dd className="mt-1 text-sm text-muted">{ingredient.benefit}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted">
              Full ingredient lists would appear here. All ingredient names on this demo site are
              illustrative.
            </p>
          </section>
        </Reveal>
      </div>

      <Reveal>
        <section className="mt-20" aria-labelledby="how-to-use-heading">
          <div className="rounded-sm bg-sand p-8 lg:p-12">
            <h2 id="how-to-use-heading" className="display-3">
              How to use
            </h2>
            <ol className="mt-6 grid gap-6 sm:grid-cols-3">
              {product.howToUse.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 font-display text-sm"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="reviews" className="mt-20 scroll-mt-28" aria-labelledby="reviews-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="reviews-heading" className="display-3">
                Customer reviews
              </h2>
              <p className="mt-2 text-sm text-muted">
                {product.reviewCount} fictional reviews · average {product.rating.toFixed(1)} out of 5
              </p>
            </div>
            <Rating value={product.rating} size="md" showValue={false} />
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {product.reviews.map((review) => (
              <li key={review.id} className="rounded-sm border border-line bg-white p-6">
                <Rating value={review.rating} showValue={false} />
                <h3 className="mt-3 font-display text-xl">{review.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{review.body}</p>
                <p className="mt-4 text-xs text-muted">
                  {review.author} · {review.skinType} skin · {review.date}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-muted">
            Reviews on this site are fictional demo content written to show a storefront layout.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-24" aria-labelledby="related-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="related-heading" className="display-3">
              Pairs well with
            </h2>
            <Link href="/shop" className="link-underline text-xs uppercase tracking-widest text-muted">
              View all
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {related.map((item, i) => (
              <li key={item.id}>
                <ProductCard product={item} index={i} />
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </div>
  );
}
