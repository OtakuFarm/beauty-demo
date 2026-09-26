import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/shop",
  "/skincare",
  "/skin-guide",
  "/about",
  "/contact",
  "/faq",
  "/shipping-returns",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-09-01");

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...products.map((product) => ({
      url: `${siteConfig.url}/product/${product.slug}`,
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
