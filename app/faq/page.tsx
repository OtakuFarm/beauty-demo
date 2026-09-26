import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about LUMI products, ingredients, routines, shipping and returns. Fictional demo content written for a portfolio storefront.",
  openGraph: {
    title: "FAQ | LUMI",
    description: "Answers about products, ingredients, routines, shipping and returns.",
    url: "https://lumi-demo.example.com/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Frequently asked questions"
        description="The things people ask most often — how to layer the routine, when to introduce an active, and what the shipping windows look like."
      />

      <div className="site-container py-16 lg:py-20">
        <FaqAccordion />

        <Reveal>
          <div className="mt-20 rounded-sm bg-sand p-8 text-center lg:p-12">
            <h2 className="display-3">Still have a question?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
              Send us a note and the team will get back to you. The contact form on this demo is
              fully interactive, but nothing is actually delivered.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Contact us
              </Link>
              <Link href="/skin-guide" className="btn-secondary">
                Take the skin guide
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
