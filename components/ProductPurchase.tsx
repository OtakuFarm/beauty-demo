"use client";

import { useState } from "react";
import { Truck, RotateCcw, Leaf, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/types";
import { QuantityStepper } from "@/components/QuantityStepper";
import { AddToCartButton } from "@/components/AddToCartButton";
import { WishlistButton } from "@/components/WishlistButton";
import { formatPrice } from "@/lib/utils";

const PERKS = [
  { icon: Truck, label: "Free shipping over $75", detail: "3–5 working days (demo figures)" },
  { icon: RotateCcw, label: "30-day returns", detail: "Unopened products, no questions" },
  { icon: Leaf, label: "Vegan & cruelty free", detail: "Illustrative claims for this demo" },
  { icon: ShieldCheck, label: "Secure checkout", detail: "No real payments are processed" },
];

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline gap-3">
        <p className="font-display text-3xl">{formatPrice(product.price)}</p>
        {product.compareAtPrice ? (
          <p className="text-sm text-muted line-through">{formatPrice(product.compareAtPrice)}</p>
        ) : null}
        {product.compareAtPrice ? (
          <span className="rounded-full bg-sand px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted">
            Save {formatPrice(product.compareAtPrice - product.price)}
          </span>
        ) : null}
      </div>

      <p className="text-sm text-muted">{product.size}</p>

      <div className="flex flex-wrap items-center gap-4">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={product.inStock ? Math.min(10, Math.max(product.stock, 1)) : 1}
          label={product.name}
        />
        <p className="text-xs text-muted">
          {product.inStock
            ? product.stock <= 5
              ? `Only ${product.stock} left in this batch`
              : "In stock · ships within 1 business day"
            : "Currently unavailable — join the restock list"}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <AddToCartButton product={product} quantity={quantity} className="flex-1" />
        <WishlistButton productId={product.id} productName={product.name} variant="full" />
      </div>

      <ul className="mt-2 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
        {PERKS.map(({ icon: Icon, label, detail }) => (
          <li key={label} className="flex items-start gap-3 text-xs">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span>
              <span className="block text-ink">{label}</span>
              <span className="text-muted">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
