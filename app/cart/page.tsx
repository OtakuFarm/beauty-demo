import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your bag",
  description:
    "Review the items in your LUMI bag, adjust quantities and see your order summary. Demo cart — no payment is processed.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartView />;
}
