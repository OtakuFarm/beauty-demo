# LUMI — premium skincare storefront (portfolio demo)

A fictional luxury skincare brand built to demonstrate a high-end, Shopify-style
storefront: product storytelling, discovery, filtering, and conversion-focused
layout. **LUMI is not a real company.** No products are sold, no payment is
processed, and every product, price, review, policy and result on the site is
invented sample content.

## Stack

- Next.js 16 (App Router) + TypeScript (strict)
- Tailwind CSS
- Framer Motion
- lucide-react
- Mock product data in `lib/`, structured so it can be swapped for a Shopify
  Storefront API / Admin API feed later

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (28 routes) |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Browser interaction tests (see below) |

## Testing

The end-to-end suite drives a real headless Chrome via Puppeteer and covers the
cart, wishlist, filters, sorting, search, skin guide, form validation, mobile
navigation and responsive overflow.

```bash
npm run build
npm start -- -p 3111
npm run test:e2e   # BASE=http://localhost:3111 by default
```

## Pages

Home, Shop (filter + sort), Skincare collection, Product page (12 static
products), About, Skin Guide, Contact, Cart, Wishlist, FAQ, Shipping & Returns,
Privacy, Terms, plus a 404 page, `sitemap.xml` and `robots.txt`.

## Architecture

```
app/                     routes, metadata, sitemap, robots, icon
  layout.tsx             header/footer shell, SEO + Open Graph metadata
components/              reusable UI (cards, gallery, forms, providers)
  providers/             cart, wishlist and toast state (localStorage-backed)
lib/
  products.ts            12 fictional products + selector helpers
  site.ts                brand, navigation, skin-concern data
  content.ts             FAQ content
  types.ts               shared types
scripts/e2e.mjs          interaction test suite
```

## Notes

- Cart and wishlist persist to `localStorage`; no account or backend is used.
- All product imagery is original SVG generated in `components/ProductArtwork.tsx`
  — no third-party or copyrighted assets are used anywhere.
- Reduced-motion preferences are respected, and every interactive control has an
  accessible name.