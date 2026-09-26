import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getBestsellers } from "@/lib/products";

export default function NotFound() {
  const suggestions = getBestsellers().slice(0, 3);

  return (
    <div className="site-container py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display-2 mt-4">This page has quietly left the routine</h1>
      <p className="mx-auto mt-4 max-w-md text-[15px] text-muted">
        The link may be out of date, or the page may have been renamed. The collection is still
        exactly where you left it.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn-primary">
          Shop the collection
        </Link>
        <Link href="/" className="btn-secondary">
          Back to home
        </Link>
      </div>

      <ul className="mt-20 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
        {suggestions.map((product, i) => (
          <li key={product.id}>
            <ProductCard product={product} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
