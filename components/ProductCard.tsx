"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductArtworkFromProduct } from "@/components/ProductArtwork";
import { Rating } from "@/components/Rating";
import { AddToCartButton } from "@/components/AddToCartButton";
import { WishlistButton } from "@/components/WishlistButton";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  index?: number;
}

export function ProductCard({ product, priority = false, index = 0 }: ProductCardProps) {
  const href = `/product/${product.slug}`;

  return (
    <article
      className="group relative flex h-full animate-card flex-col"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="relative overflow-hidden rounded-sm bg-sand">
        <Link
          href={href}
          className="block aspect-[4/5] w-full"
          aria-label={`View ${product.name}`}
        >
          <div className="h-full w-full transition-transform duration-700 ease-silk group-hover:scale-[1.04] motion-reduce:transition-none">
            <ProductArtworkFromProduct product={product} />
          </div>
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.isBestseller ? (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] uppercase tracking-widest text-cream">
              Bestseller
            </span>
          ) : null}
          {product.isNew ? (
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] uppercase tracking-widest text-ink">
              New
            </span>
          ) : null}
          {!product.inStock ? (
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] uppercase tracking-widest text-ink">
              Back soon
            </span>
          ) : null}
        </div>

        <div className="absolute right-3 top-3">
          <WishlistButton productId={product.id} productName={product.name} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-4">
        <p className="text-[11px] uppercase tracking-widest text-muted">{product.category}</p>
        <h3 className="font-display text-xl leading-snug">
          <Link href={href} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <Rating value={product.rating} count={product.reviewCount} />
        <p className="mt-1 line-clamp-2 text-sm text-muted">{product.shortDescription}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <p className="flex items-baseline gap-2">
            <span className="text-sm font-medium">{formatPrice(product.price)}</span>
            {product.compareAtPrice ? (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
          </p>
          <AddToCartButton
            product={product}
            label="Add"
            className="h-9 px-4 text-[10px]"
          />
        </div>
      </div>
    </article>
  );
}
