import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Prose, PolicySection } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Shipping & returns",
  description:
    "Illustrative shipping and returns policy for the fictional LUMI demo storefront. Delivery windows, return windows and faulty-item steps.",
  openGraph: {
    title: "Shipping & returns | LUMI",
    description: "Delivery windows, return windows and faulty-item steps.",
    url: "https://lumi-demo.example.com/shipping-returns",
  },
};

const UPDATED = "1 September 2026";

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Policies"
        title="Shipping & returns"
        description="This policy is placeholder copy written to demonstrate a storefront policy page. LUMI is fictional and nothing here can be ordered, shipped or returned."
      />

      <div className="site-container py-16 lg:py-20">
        <Prose>
          <p className="text-ink">
            The windows and thresholds below are invented sample figures for a design demonstration.
            No orders exist, no parcels are dispatched and no refunds can be issued.
          </p>
        </Prose>

        <div className="mt-12 max-w-2xl">
          <PolicySection id="dispatch" title="Dispatch times" updated={UPDATED}>
            <p className="mt-3">
              Orders placed before 2pm on a working day would leave our warehouse the same day. Orders
              placed at the weekend would be dispatched on the next working day. During a promotional
              period, dispatch may take an additional day.
            </p>
          </PolicySection>

          <PolicySection id="delivery" title="Delivery estimates">
            <ul className="mt-3 space-y-2">
              {[
                ["Standard (3–5 working days)", "Free over $75, otherwise $6"],
                ["Express (next working day)", "$18"],
                ["International (5–10 working days)", "$24, duties calculated at checkout"],
              ].map(([label, detail]) => (
                <li key={label} className="flex flex-wrap justify-between gap-2 border-b border-line pb-2">
                  <span className="text-ink">{label}</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </PolicySection>

          <PolicySection id="returns" title="Returns">
            <p className="mt-3">
              Unopened products could be returned within 30 days of delivery. Start a return from your
              account, choose a reason, and print the prepaid label. Refunds would be issued to the
              original payment method within five working days of the parcel being scanned.
            </p>
            <p className="mt-3">
              For hygiene reasons, opened skincare products cannot be returned unless they are faulty.
              If a product arrives damaged or incorrect, contact us within 14 days with a photograph
              and we would replace it.
            </p>
          </PolicySection>

          <PolicySection id="exchanges" title="Exchanges">
            <p className="mt-3">
              Rather than an exchange, the fastest route is a refund followed by a new order — this
              keeps the parcel in one direction and usually means you receive the replacement sooner.
              Our team can place the new order for you at the original price.
            </p>
          </PolicySection>

          <PolicySection id="samples" title="Samples and gifts">
            <p className="mt-3">
              Two samples are included with every order. Samples are final sale, but we would always
              replace a damaged sample on request.
            </p>
          </PolicySection>
        </div>

        <div className="mt-12 max-w-2xl rounded-sm bg-sand p-7 text-sm">
          <p className="text-ink">Questions about an order?</p>
          <p className="mt-1">The contact page form is fully interactive in this demo, but nothing is sent.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/contact" className="link-underline text-[11px] uppercase tracking-widest">
              Contact us
            </Link>
            <Link href="/faq" className="link-underline text-[11px] uppercase tracking-widest">
              Read the FAQ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
