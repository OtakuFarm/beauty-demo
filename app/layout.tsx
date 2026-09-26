import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { PageTransition } from "@/components/PageTransition";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "LUMI — Simple Rituals. Radiant Skin.",
    template: "%s | LUMI",
  },
  description: siteConfig.description,
  applicationName: "LUMI",
  keywords: [
    "skincare",
    "luxury skincare",
    "serum",
    "cleanser",
    "moisturiser",
    "skincare routine",
    "skin care guide",
    "LUMI",
  ],
  authors: [{ name: "LUMI Portfolio Demo" }],
  creator: "LUMI Portfolio Demo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "LUMI",
    title: "LUMI — Simple Rituals. Radiant Skin.",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMI — Simple Rituals. Radiant Skin.",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteConfig.url },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500&display=swap"
        />
      </head>
      <body className="min-h-screen bg-cream">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>
        <Providers>
          <AnnouncementBar />
          <Header />
          <PageTransition>
            <main id="main" tabIndex={-1} className="min-h-[60vh] outline-none">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
