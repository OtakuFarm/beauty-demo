"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/providers/CartProvider";
import { WishlistProvider } from "@/components/providers/WishlistProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Marks the point at which client state is live. Useful for end-to-end
    // tests that must not interact before hydration has finished.
    document.documentElement.dataset.hydrated = "true";
  }, []);

  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
