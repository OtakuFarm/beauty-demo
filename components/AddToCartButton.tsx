"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/providers/CartProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { cx } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  label?: string;
}

export function AddToCartButton({ product, quantity = 1, className, label }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { notify } = useToast();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product, quantity);
    notify(`${product.name} added to your bag.`, { action: { label: "View bag", href: "/cart" } });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!product.inStock}
      className={cx("btn-primary", className)}
      aria-label={product.inStock ? `Add ${product.name} to bag` : `${product.name} is out of stock`}
    >
      {product.inStock ? (
        added ? (
          <>
            <Check className="h-4 w-4" aria-hidden="true" />
            Added
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {label ?? "Add to bag"}
          </>
        )
      ) : (
        "Out of stock"
      )}
    </button>
  );
}
