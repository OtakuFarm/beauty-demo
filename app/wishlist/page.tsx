import type { Metadata } from "next";
import { WishlistView } from "@/components/WishlistView";

export const metadata: Metadata = {
  title: "Your wishlist",
  description: "The LUMI products you have saved for later. Stored on this device only.",
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistView />;
}
