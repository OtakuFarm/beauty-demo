"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { SearchDialog } from "@/components/SearchDialog";
import { MobileMenu } from "@/components/MobileMenu";
import { cx } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cx(
          "sticky top-0 z-50 border-b transition-all duration-500 ease-silk",
          scrolled ? "border-line bg-cream/90 backdrop-blur-md" : "border-transparent bg-cream"
        )}
      >
        <div className="site-container">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-sand lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <Link
              href="/"
              className="font-display text-2xl tracking-[0.35em] lg:absolute lg:left-1/2 lg:-translate-x-1/2"
              aria-label={`${siteConfig.name} home`}
            >
              LUMI
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cx(
                          "link-underline text-[12px] uppercase tracking-widest transition-colors",
                          active ? "text-ink" : "text-muted hover:text-ink"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-sand"
                aria-label="Search products"
              >
                <Search className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
              <Link
                href="/wishlist"
                className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-sand"
                aria-label={`Wishlist, ${wishlistCount} saved item${wishlistCount === 1 ? "" : "s"}`}
              >
                <Heart className="h-[18px] w-[18px]" aria-hidden="true" />
                {wishlistCount > 0 ? <Badge>{wishlistCount}</Badge> : null}
              </Link>
              <Link
                href="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-sand"
                aria-label={`Shopping bag, ${count} item${count === 1 ? "" : "s"}`}
              >
                <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
                {count > 0 ? <Badge>{count}</Badge> : null}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}</AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-medium text-cream">
      {children}
    </span>
  );
}
