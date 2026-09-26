"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/lib/types";
import { products } from "@/lib/products";

export interface CartLine {
  id: string;
  quantity: number;
}

export interface CartItem extends CartLine {
  product: Product;
  lineTotal: number;
}

interface CartContextValue {
  lines: CartLine[];
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "lumi.cart.v1";
const MAX_QTY = 10;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setLines(JSON.parse(stored) as CartLine[]);
    } catch {
      // Ignore malformed storage and start with an empty bag.
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage may be unavailable in private mode; the UI still works in memory.
    }
  }, [lines, isHydrated]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.id === product.id ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_QTY) } : l
        );
      }
      return [...prev, { id: product.id, quantity: Math.min(quantity, MAX_QTY) }];
    });
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, quantity: Math.min(quantity, MAX_QTY) } : l))
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines.flatMap((line) => {
      const product = products.find((p) => p.id === line.id);
      return product ? [{ ...line, product, lineTotal: product.price * line.quantity }] : [];
    });
    return {
      lines,
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.lineTotal, 0),
      addItem,
      setQuantity,
      removeItem,
      clear,
      isHydrated,
    };
  }, [lines, addItem, setQuantity, removeItem, clear, isHydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
