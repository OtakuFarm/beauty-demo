import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about a product, an order or your routine? Reach the fictional LUMI team. Demo contact page — the form validates but sends nothing.",
  openGraph: {
    title: "Contact | LUMI",
    description: "Questions about a product, an order or your routine?",
    url: "https://lumi-demo.example.com/contact",
  },
};

const details = [
  { icon: Mail, title: "Email", lines: [siteConfig.email, "Replies within one working day"] },
  { icon: Clock, title: "Hours", lines: ["Monday–Friday, 9am–5pm", "Support is closed on weekends"] },
  { icon: MapPin, title: "Studio", lines: ["Second Floor, 14 Rosewood Lane", "By appointment only"] },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a human, not a chatbot"
        description="Routines, orders, ingredients or a formula that is not working for you — send a note and the team will get back to you. On this demo the form is fully interactive but delivers nothing anywhere."
      />

      <div className="site-container grid gap-12 py-16 lg:grid-cols-[1fr_320px] lg:gap-16 lg:py-20">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="space-y-8" aria-label="Contact details">
            {details.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="border-t border-line pt-5">
                <h2 className="flex items-center gap-2 font-display text-xl">
                  <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
                  {title}
                </h2>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-sm bg-sand p-6 text-sm leading-relaxed text-muted">
              <p className="eyebrow">Before you write</p>
              <p className="mt-3">
                The most common questions — returns windows, ingredient lists, how to layer the
                routine — are answered on the FAQ page.
              </p>
              <Link href="/faq" className="mt-4 inline-block text-[11px] uppercase tracking-widest text-ink">
                <span className="link-underline">Read the FAQ</span>
              </Link>
            </div>
          </aside>
        </Reveal>
      </div>
    </>
  );
}
