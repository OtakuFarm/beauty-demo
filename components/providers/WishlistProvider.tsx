"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface WishlistContextValue {
  ids: string[];
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string, name?: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  isHydrated: boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "lumi.wishlist.v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setIds(JSON.parse(stored) as string[]);
    } catch {
      // Start empty when storage is unavailable.
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Storage may be unavailable in private mode; the UI still works in memory.
    }
  }, [ids, isHydrated]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, count: ids.length, has, toggle, remove, clear, isHydrated }),
    [ids, has, toggle, remove, clear, isHydrated]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
