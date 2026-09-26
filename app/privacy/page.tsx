import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Prose, PolicySection } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How the fictional LUMI demo storefront handles data. Sample privacy copy for a portfolio project — no data is collected, stored or sold.",
  openGraph: {
    title: "Privacy policy | LUMI",
    description: "How the LUMI demo storefront handles data.",
    url: "https://lumi-demo.example.com/privacy",
  },
};

const UPDATED = "1 September 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Policies"
        title="Privacy policy"
        description="Sample privacy copy written for a design demonstration. LUMI is a fictional brand and this site collects no personal data."
      />

      <div className="site-container py-16 lg:py-20">
        <Prose>
          <p className="text-ink">
            There are no analytics scripts, advertising pixels, third-party trackers or payment
            processors on this site. Nothing you type here leaves your browser.
          </p>
        </Prose>

        <div className="mt-12 max-w-2xl">
          <PolicySection id="what-we-store" title="What is stored in your browser" updated={UPDATED}>
            <p className="mt-3">
              Three things, all optional and all removable by clearing site data: your bag, your
              wishlist, and whether you have dismissed the announcement bar. They are stored in your
              browser&rsquo;s localStorage so the shop behaves like a shop between visits.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Bag contents — the product IDs and quantities you have added</li>
              <li>Wishlist — the product IDs you have saved</li>
              <li>No identifiers, no email addresses, no analytics identifiers</li>
            </ul>
          </PolicySection>

          <PolicySection id="forms" title="Forms">
            <p className="mt-3">
              The newsletter and contact forms validate your input in the browser and then show a
              success state. No network request is made and nothing is stored or transmitted. In a
              live store, a submission would be used only to fulfil your request.
            </p>
          </PolicySection>

          <PolicySection id="cookies" title="Cookies and advertising">
            <p className="mt-3">
              This site sets no cookies. A live storefront would use a first-party cookie to remember
              your bag, and would never sell personal data or share it with advertising networks.
            </p>
          </PolicySection>

          <PolicySection id="rights" title="Your rights">
            <p className="mt-3">
              Because no personal data is collected, there is nothing to access, correct or erase.
              In a live store, you would be able to request a copy of your data or its deletion by
              contacting the team.
            </p>
          </PolicySection>

          <PolicySection id="children" title="Children">
            <p className="mt-3">
              This site is not directed at children under 16, and it collects no information from
              anyone, of any age.
            </p>
          </PolicySection>

          <PolicySection id="contact-privacy" title="Questions">
            <p className="mt-3">
              If you have a question about how a real store would handle your data, the contact page
              is where a conversation would start.
            </p>
          </PolicySection>
        </div>
      </div>
    </>
  );
}
