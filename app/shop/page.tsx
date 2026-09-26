import type { Metadata } from "next";
import { categories, products } from "@/lib/products";
import { ShopGrid } from "@/components/ShopGrid";
import type { SortKey } from "@/components/ShopGrid";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Shop all products",
  description:
    "Browse the full LUMI collection — twelve fictional skincare essentials for cleansing, hydrating, treating and protecting. Filter by category, skin goal or price.",
  openGraph: {
    title: "Shop all products | LUMI",
    description: "Twelve fictional skincare essentials. Filter by category, skin goal or price.",
    url: "https://lumi-demo.example.com/shop",
  },
};

type SearchParams = Promise<{ category?: string; sort?: string; concern?: string }>;

const SORT_KEYS: SortKey[] = ["featured", "price-asc", "price-desc", "rating", "newest"];

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const initialCategory = params.category;
  const initialConcern = params.concern;
  const sortParam = params.sort as SortKey | undefined;
  const initialSort = sortParam && SORT_KEYS.includes(sortParam) ? sortParam : "featured";

  return (
    <>
      <PageHeader
        eyebrow="The collection"
        title="Everything your ritual needs"
        description="Twelve considered formulas, in the order you would use them. Nothing extra, nothing missing — this is a fictional product line created for a design portfolio demo."
      />
      <ShopGrid
        products={products}
        categories={categories}
        initialCategory={initialCategory}
        initialConcern={initialConcern}
        initialSort={initialSort}
      />
    </>
  );
}
