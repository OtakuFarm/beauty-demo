"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export interface Toast {
  id: number;
  message: string;
  variant: "success" | "info" | "error";
  action?: { label: string; href: string };
}

interface ToastContextValue {
  toasts: Toast[];
  notify: (message: string, options?: { variant?: Toast["variant"]; action?: Toast["action"] }) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);
const DURATION = 3600;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback<ToastContextValue["notify"]>(
    (message, options) => {
      counter.current += 1;
      const id = counter.current;
      const toast: Toast = { id, message, variant: options?.variant ?? "success", action: options?.action };
      setToasts((prev) => [...prev.slice(-2), toast]);
      timers.current.push(setTimeout(() => dismiss(id), DURATION));
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
        role="region"
        aria-label="Notifications"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={cx(
                "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-sm border px-4 py-3 shadow-[0_18px_40px_-24px_rgba(28,27,25,0.45)]",
                toast.variant === "success" && "border-ink/10 bg-ink text-cream",
                toast.variant === "info" && "border-line bg-white text-ink",
                toast.variant === "error" && "border-red-200 bg-red-50 text-red-900"
              )}
            >
              <span className="mt-0.5 shrink-0" aria-hidden="true">
                {toast.variant === "success" ? (
                  <Check className="h-4 w-4" />
                ) : toast.variant === "error" ? (
                  <X className="h-4 w-4" />
                ) : (
                  <span className="block h-2 w-2 rounded-full bg-current" />
                )}
              </span>
              <p className="flex-1 text-sm leading-snug">{toast.message}</p>
              {toast.action ? (
                <a
                  href={toast.action.href}
                  className="shrink-0 text-[11px] uppercase tracking-widest underline underline-offset-4"
                >
                  {toast.action.label}
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
                aria-label="Dismiss notification"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
