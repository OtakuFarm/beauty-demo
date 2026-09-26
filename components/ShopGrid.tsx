"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { cx } from "@/lib/utils";

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
  newest: "Newest",
};

export const CONCERN_LABELS: Record<string, string> = {
  hydration: "Hydration",
  brightening: "Brightening",
  texture: "Texture",
  "oil-control": "Oil control",
  sensitive: "Sensitive skin",
};

interface ShopGridProps {
  products: Product[];
  categories: string[];
  initialCategory?: string;
  initialConcern?: string;
  initialSort?: SortKey;
}

export function ShopGrid({
  products,
  categories,
  initialCategory,
  initialConcern,
  initialSort = "featured",
}: ShopGridProps) {
  const [category, setCategory] = useState<string | null>(
    initialCategory && categories.includes(initialCategory) ? initialCategory : null
  );
  const [concern, setConcern] = useState<string | null>(
    initialConcern && initialConcern in CONCERN_LABELS ? initialConcern : null
  );
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visible = useMemo(() => {
    const filtered = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (concern && !p.concerns.includes(concern as never)) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case "newest":
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.isBestseller) - Number(a.isBestseller) || b.rating - a.rating
        );
    }
    return sorted;
  }, [products, category, concern, sort, inStockOnly]);

  const activeCount = (category ? 1 : 0) + (concern ? 1 : 0) + (inStockOnly ? 1 : 0);
  const reset = () => {
    setCategory(null);
    setConcern(null);
    setInStockOnly(false);
    setSort("featured");
  };

  return (
    <div className="site-container pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            aria-controls="shop-filters"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[11px] uppercase tracking-widest transition-colors hover:border-ink lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            Filters
            {activeCount > 0 ? (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] text-cream">
                {activeCount}
              </span>
            ) : null}
          </button>

          <p className="text-xs text-muted" aria-live="polite">
            Showing <span className="text-ink">{visible.length}</span> of {products.length} products
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-[11px] uppercase tracking-widest text-muted">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-line bg-white px-4 py-2 text-xs outline-none transition-colors focus:border-ink"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div className="grid gap-10 pt-8 lg:grid-cols-[220px_1fr] lg:gap-14">
        <aside
          id="shop-filters"
          className={cx("lg:block", filtersOpen ? "block" : "hidden")}
          aria-label="Product filters"
        >
          <div className="space-y-8 lg:sticky lg:top-28">
            <fieldset>
              <legend className="eyebrow mb-3">Category</legend>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => setCategory(null)}
                    aria-pressed={category === null}
                    className={cx(
                      "transition-colors hover:text-ink",
                      category === null ? "text-ink underline underline-offset-4" : "text-muted"
                    )}
                  >
                    All products
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => setCategory(c === category ? null : c)}
                      aria-pressed={category === c}
                      className={cx(
                        "transition-colors hover:text-ink",
                        category === c ? "text-ink underline underline-offset-4" : "text-muted"
                      )}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset>
              <legend className="eyebrow mb-3">Skin goal</legend>
              <ul className="space-y-2 text-sm">
                {Object.entries(CONCERN_LABELS).map(([value, label]) => (
                  <li key={value}>
                    <button
                      type="button"
                      onClick={() => setConcern(concern === value ? null : value)}
                      aria-pressed={concern === value}
                      className={cx(
                        "transition-colors hover:text-ink",
                        concern === value ? "text-ink underline underline-offset-4" : "text-muted"
                      )}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>

            <label className="flex items-center gap-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 rounded border-line accent-ink"
              />
              In stock only
            </label>

            {activeCount > 0 ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted underline underline-offset-4 transition-colors hover:text-ink"
              >
                <X className="h-3 w-3" aria-hidden="true" />
                Clear filters
              </button>
            ) : null}
          </div>
        </aside>

        <div>
          {visible.length === 0 ? (
            <div className="rounded-sm border border-dashed border-line px-6 py-20 text-center">
              <p className="font-display text-2xl">No products match those filters.</p>
              <p className="mt-2 text-sm text-muted">Try widening your search — the shelf is not that long.</p>
              <button type="button" onClick={reset} className="btn-secondary mt-6">
                Clear all filters
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              <AnimatePresence mode="popLayout">
                {visible.map((product, i) => (
                  <motion.li
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(i, 8) * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProductCard product={product} index={i} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
