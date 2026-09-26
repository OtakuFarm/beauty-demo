"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lock, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { ProductArtworkFromProduct } from "@/components/ProductArtwork";
import { QuantityStepper } from "@/components/QuantityStepper";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 75;
const SHIPPING_FLAT = 6;

export function CartView() {
  const { items, subtotal, setQuantity, removeItem, isHydrated } = useCart();
  const { notify } = useToast();

  if (!isHydrated) {
    return (
      <div className="site-container py-24">
        <div className="h-8 w-40 animate-pulse rounded bg-sand" />
        <div className="mt-8 h-40 w-full animate-pulse rounded bg-sand" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="site-container py-24 text-center">
        <ShoppingBag className="mx-auto h-8 w-8 text-muted" aria-hidden="true" />
        <h2 className="display-3 mt-6">Your bag is empty</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          Nothing here yet. Start with the best sellers, or take the skin guide if you are not sure
          where to begin.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn-primary">
            Browse the collection
          </Link>
          <Link href="/skin-guide" className="btn-secondary">
            Take the skin guide
          </Link>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;

  return (
    <div className="site-container py-12 lg:py-16">
      <h1 className="display-2">Your bag</h1>
      <p className="mt-2 text-sm text-muted">
        {items.length} {items.length === 1 ? "line" : "lines"} · prices shown in USD
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
        <section aria-label="Bag items">
          <ul className="border-t border-line">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-5 border-b border-line py-6"
                >
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="h-28 w-24 shrink-0 overflow-hidden rounded-sm bg-sand sm:h-36 sm:w-28"
                    aria-label={`View ${item.product.name}`}
                  >
                    <ProductArtworkFromProduct product={item.product} />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-widest text-muted">
                          {item.product.category}
                        </p>
                        <h2 className="mt-1 font-display text-xl">
                          <Link href={`/product/${item.product.slug}`} className="link-underline">
                            {item.product.name}
                          </Link>
                        </h2>
                        <p className="mt-1 text-xs text-muted">{item.product.size}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.lineTotal)}</p>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(next) => setQuantity(item.id, next)}
                        min={1}
                        max={10}
                        size="sm"
                        label={item.product.name}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(item.id);
                          notify(`${item.product.name} removed from your bag.`, { variant: "info" });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <Link
            href="/shop"
            className="mt-8 inline-block text-xs uppercase tracking-widest text-muted"
          >
            <span className="link-underline">← Continue shopping</span>
          </Link>
        </section>


        <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Order summary">
          <div className="rounded-sm border border-line bg-sand p-7">
            <h2 className="font-display text-2xl">Summary</h2>

            <div className="mt-5">
              <p className="text-xs text-muted">
                {remaining > 0
                  ? `You're ${formatPrice(remaining)} away from free shipping.`
                  : "You've unlocked free shipping."}
              </p>
              <div
                className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progress toward free shipping"
              >
                <motion.div
                  className="h-full bg-gold"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-base">
                <dt>Total</dt>
                <dd>{formatPrice(subtotal + shipping)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() =>
                notify("Checkout is disabled in this portfolio demo — no payment is processed.", {
                  variant: "info",
                })
              }
              className="btn-primary mt-6 w-full"
            >
              Checkout
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
              <Lock className="h-3 w-3" aria-hidden="true" />
              Demo only — no payment is taken
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
