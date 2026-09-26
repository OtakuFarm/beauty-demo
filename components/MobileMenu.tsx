"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/lib/site";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const links = [{ label: "Home", href: "/" }, ...navLinks];

  return (
    <motion.div
      className="fixed inset-0 z-[80] lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-full flex-col bg-cream">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <span className="font-display text-xl tracking-[0.35em]">LUMI</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-sand"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-8">
          <ul>
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between border-b border-line py-4 font-display text-3xl"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-xs text-muted">
                    0{i + 1}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 space-y-3 text-sm">
            <p className="eyebrow">Need help?</p>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/faq" onClick={onClose} className="link-underline">
                  Frequently asked questions
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" onClick={onClose} className="link-underline">
                  Shipping &amp; returns
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={onClose} className="link-underline">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="border-t border-line px-5 py-5 text-center text-[11px] uppercase tracking-widest text-muted">
          Portfolio demo — no real products
        </div>
      </div>
    </motion.div>
  );
}
