"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { cx } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  variant?: "icon" | "full";
  className?: string;
}

export function WishlistButton({
  productId,
  productName,
  variant = "icon",
  className,
}: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const { notify } = useToast();
  const saved = has(productId);

  const handleClick = () => {
    toggle(productId);
    notify(
      saved ? `${productName} removed from your wishlist.` : `${productName} saved to your wishlist.`,
      { variant: "info" }
    );
  };

  if (variant === "full") {
    return (
      <button type="button" onClick={handleClick} className={cx("btn-secondary", className)}>
        <Heart
          className={cx("h-4 w-4", saved && "fill-ink")}
          aria-hidden="true"
        />
        {saved ? "Saved" : "Add to wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      className={cx(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink shadow-[0_2px_10px_-6px_rgba(28,27,25,0.6)] backdrop-blur transition-all duration-300 hover:bg-white hover:shadow-[0_6px_18px_-10px_rgba(28,27,25,0.7)]",
        className
      )}
    >
      <Heart className={cx("h-4 w-4 transition-colors", saved && "fill-ink")} aria-hidden="true" />
    </button>
  );
}
