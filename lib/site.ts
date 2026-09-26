export const siteConfig = {
  name: "LUMI",
  tagline: "Simple Rituals. Radiant Skin.",
  description:
    "LUMI is a fictional premium skincare brand created as a design portfolio demo — a considered routine of twelve essentials for calm, radiant skin.",
  url: "https://lumi-demo.example.com",
  email: "hello@lumi-demo.example.com",
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Skincare", href: "/skincare" },
  { label: "Skin Guide", href: "/skin-guide" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Skincare collection", href: "/skincare" },
      { label: "Best sellers", href: "/shop?sort=rating" },
      { label: "Sets", href: "/shop?category=Sets" },
      { label: "Gift cards", href: "/shop?category=Sets" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Skin guide", href: "/skin-guide" },
      { label: "Our story", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & returns", href: "/shipping-returns" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Your wishlist", href: "/wishlist" },
      { label: "Your bag", href: "/cart" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export interface ConcernOption {
  id: string;
  label: string;
  blurb: string;
  routine: string[];
}

export const concerns: ConcernOption[] = [
  {
    id: "hydration",
    label: "Hydration",
    blurb: "Skin that feels tight, flaky or dull by midday.",
    routine: ["Cleanse gently", "Layer essence twice", "Seal with ceramide cream"],
  },
  {
    id: "brightening",
    label: "Brightening",
    blurb: "Uneven tone, lingering marks or a tired-looking complexion.",
    routine: ["Vitamin C each morning", "Chemical exfoliation 2–3× weekly", "Daily SPF without fail"],
  },
  {
    id: "texture",
    label: "Texture",
    blurb: "Rough patches, clogged pores or lingering fine lines.",
    routine: ["Slow-release exfoliant", "Peptide night serum", "Lightweight moisturiser"],
  },
  {
    id: "oil-control",
    label: "Oil control",
    blurb: "Shine by lunchtime, without stripping skin dry.",
    routine: ["Gentle gel cleanse", "Niacinamide serum", "SPF with a soft matte finish"],
  },
  {
    id: "sensitive",
    label: "Sensitive skin",
    blurb: "Reactive, easily-reddened skin that needs a lighter touch.",
    routine: ["Cream cleanser only", "Barrier-first moisturiser", "Introduce actives slowly"],
  },
];
