"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/lib/products";
import { ProductArtworkFromProduct } from "@/components/ProductArtwork";
import { formatPrice } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
      return () => {
        window.clearTimeout(id);
        document.body.style.overflow = "";
      };
    }
    setQuery("");
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 4);
    return products
      .filter((p) =>
        [p.name, p.subtitle, p.category, p.shortDescription, p.concerns.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[2px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-0 max-h-[85vh] w-full max-w-3xl overflow-y-auto bg-cream shadow-[0_30px_80px_-40px_rgba(28,27,25,0.6)]"
          >
            <div className="sticky top-0 flex items-center gap-3 border-b border-line bg-cream px-5 py-4">
              <Search className="h-4 w-4 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for serums, cleansers, sets…"
                aria-label="Search products"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
              />
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-sand hover:text-ink"
                aria-label="Close search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="px-5 py-5">
              <p className="eyebrow mb-4">
                {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular right now"}
              </p>
              {results.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="font-display text-2xl">Nothing matched “{query}”.</p>
                  <p className="mt-2 text-sm text-muted">
                    Try “serum”, “hydration”, “cleanser” or browse the full shop.
                  </p>
                  <Link href="/shop" onClick={onClose} className="btn-secondary mt-6">
                    Browse all products
                  </Link>
                </div>
              ) : (
                <ul className="grid gap-2">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 rounded-sm p-2 transition-colors hover:bg-sand"
                      >
                        <span className="h-14 w-12 shrink-0 overflow-hidden rounded-sm bg-sand">
                          <ProductArtworkFromProduct product={product} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-lg">{product.name}</span>
                          <span className="block text-xs uppercase tracking-widest text-muted">
                            {product.category} · {formatPrice(product.price)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
