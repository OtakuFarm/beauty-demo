import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Prose, PolicySection } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Sample terms of service for the fictional LUMI demo storefront. Placeholder copy for a portfolio project — no contract is formed by using this site.",
  openGraph: {
    title: "Terms of service | LUMI",
    description: "Terms for using the LUMI demo storefront.",
    url: "https://lumi-demo.example.com/terms",
  },
};

const UPDATED = "1 September 2026";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Policies"
        title="Terms of service"
        description="Placeholder terms written to demonstrate a storefront policy page. Using this demo site does not create a contract, an order or an obligation of any kind."
      />

      <div className="site-container py-16 lg:py-20">
        <Prose>
          <p className="text-ink">
            LUMI is a fictional brand created for a design portfolio project. No real company sells
            these products, and no agreement is formed between you and anyone by using this site.
          </p>
        </Prose>

        <div className="mt-12 max-w-2xl">
          <PolicySection id="nature" title="Nature of this site" updated={UPDATED}>
            <p className="mt-3">
              This is a demonstration storefront. Product information, prices, reviews, results and
              policies are sample content. Items cannot be purchased, and the checkout button is
              intentionally inactive.
            </p>
          </PolicySection>

          <PolicySection id="use" title="Acceptable use">
            <p className="mt-3">
              You are welcome to browse, test the cart and wishlist, and use the site for portfolio
              evaluation. Please do not attempt to disrupt the site, scrape it at volume, or
              misrepresent it as a real retailer.
            </p>
          </PolicySection>

          <PolicySection id="no-advice" title="No medical or professional advice">
            <p className="mt-3">
              The skin guide, ingredient notes and before/after panels on this site are illustrative
              only. Nothing here is medical, dermatological or therapeutic advice, and no
              professional relationship is created by reading it. For any skin concern, consult a
              qualified healthcare professional.
            </p>
          </PolicySection>

          <PolicySection id="ip" title="Intellectual property">
            <p className="mt-3">
              The LUMI name, product names, copy, illustrations and layout on this site were created
              for this demo. They are not real trademarks, and no third-party brand assets are used
              anywhere on the site.
            </p>
          </PolicySection>

          <PolicySection id="liability" title="Liability">
            <p className="mt-3">
              The site is provided as-is for demonstration. Because no transaction can occur, there is
              no contract, no purchase, and nothing to claim a refund against. Sample pricing and
              policies shown here carry no obligation.
            </p>
          </PolicySection>

          <PolicySection id="changes" title="Changes">
            <p className="mt-3">
              A live site would post any change to these terms on this page with an updated date. For
              the demo, the page simply reflects whatever copy is in the project at the time.
            </p>
          </PolicySection>
        </div>

        <div className="mt-12 flex flex-wrap gap-6">
          <Link href="/privacy" className="link-underline text-[11px] uppercase tracking-widest text-muted">
            Privacy policy
          </Link>
          <Link href="/shipping-returns" className="link-underline text-[11px] uppercase tracking-widest text-muted">
            Shipping &amp; returns
          </Link>
          <Link href="/about" className="link-underline text-[11px] uppercase tracking-widest text-muted">
            About this demo
          </Link>
        </div>
      </div>
    </>
  );
}
