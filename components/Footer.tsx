import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerColumns, siteConfig } from "@/lib/site";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  const year = 2026;

  return (
    <footer className="mt-24 border-t border-line bg-sand">
      <div className="site-container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-3xl tracking-[0.3em]">LUMI</p>
            <p className="mt-3 max-w-xs font-display text-xl italic text-muted">
              {siteConfig.tagline}
            </p>

            <div className="mt-8 max-w-sm">
              <NewsletterForm
                variant="footer"
                heading="Join the ritual"
                note="Notes on skin, restocks and 10% off your first order. Demo form — nothing is sent."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="eyebrow">{column.title}</h2>
                <ul className="mt-5 space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}-${link.href}`}>
                      <Link href={link.href} className="link-underline text-muted hover:text-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. A fictional brand created as a design portfolio demo — no real
            products are sold.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="link-underline">
              Privacy
            </Link>
            <Link href="/terms" className="link-underline">
              Terms
            </Link>
            <a
              href="https://example.com"
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-1"
            >
              Portfolio case study
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
