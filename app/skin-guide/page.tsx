import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SkinGuide } from "@/components/SkinGuide";

export const metadata: Metadata = {
  title: "Skin guide",
  description:
    "Answer one question about your skin goal and get a short suggested routine from the fictional LUMI collection. A demo quiz — not medical advice.",
  openGraph: {
    title: "Skin guide | LUMI",
    description: "Find your skin goal and a suggested fictional LUMI routine.",
    url: "https://lumi-demo.example.com/skin-guide",
  },
};

export default function SkinGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Find your ritual"
        title="A routine that starts with your skin, not a trend"
        description="Five goals, five short paths through the collection. Take ten seconds and we will point you at the right fictional formulas."
      />
      <SkinGuide />
    </>
  );
}
