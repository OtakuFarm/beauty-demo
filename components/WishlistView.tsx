"use client";

import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export function WishlistView() {
  const { ids, remove, clear, isHydrated } = useWishlist();
  const { notify } = useToast();
  const saved = products.filter((p) => ids.includes(p.id));

  if (!isHydrated) {
    return (
      <div className="site-container py-24">
        <div className="h-8 w-48 animate-pulse rounded bg-sand" />
        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded bg-sand" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="site-container py-12 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display-2">Your wishlist</h1>
          <p className="mt-2 text-sm text-muted">
            {saved.length} saved {saved.length === 1 ? "item" : "items"} — stored on this device only.
          </p>
        </div>
        {saved.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              clear();
              notify("Wishlist cleared.", { variant: "info" });
            }}
            className="text-[11px] uppercase tracking-widest text-muted underline underline-offset-4 transition-colors hover:text-ink"
          >
            Clear wishlist
          </button>
        ) : null}
      </div>

      {saved.length === 0 ? (
        <div className="mt-16 text-center">
          <Heart className="mx-auto h-8 w-8 text-muted" aria-hidden="true" />
          <p className="display-3 mt-6">Nothing saved yet</p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
            Tap the heart on any product to keep it here while you decide. Your wishlist lives in this
            browser — no account needed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn-primary">
              Browse the collection
            </Link>
            <Link href="/cart" className="btn-secondary">
              View your bag
            </Link>
          </div>
        </div>
      ) : (
        <>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {saved.map((product, i) => (
              <li key={product.id} className="group/saved relative">
                <ProductCard product={product} index={i} />
                <button
                  type="button"
                  onClick={() => {
                    remove(product.id);
                    notify(`${product.name} removed from your wishlist.`, { variant: "info" });
                  }}
                  className="mt-3 text-[11px] uppercase tracking-widest text-muted underline underline-offset-4 transition-colors hover:text-ink"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-16 rounded-sm bg-sand p-8 text-center lg:p-12">
            <ShoppingBag className="mx-auto h-6 w-6 text-muted" aria-hidden="true" />
            <h2 className="display-3 mt-4">Ready when you are</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
              Add everything you have been considering to the bag in one go — the summary updates as
              you go.
            </p>
            <Link href="/cart" className="btn-primary mt-6">
              Go to your bag
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
