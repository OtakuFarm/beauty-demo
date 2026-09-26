"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState } from "react";
import { useToast } from "@/components/providers/ToastProvider";
import { cx } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

interface NewsletterFormProps {
  variant?: "footer" | "hero" | "inline";
  heading?: string;
  note?: string;
  className?: string;
}

export function NewsletterForm({
  variant = "inline",
  heading,
  note,
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const { notify } = useToast();
  const inputId = useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError("That email address doesn't look quite right.");
      return;
    }

    setError(null);
    setDone(true);
    setEmail("");
    notify("Welcome to LUMI. Check your inbox for 10% off.");
  };

  if (done) {
    return (
      <div className={cx("flex items-center gap-3 rounded-sm border border-line bg-white px-5 py-4", className)}>
        <Check className="h-4 w-4 text-gold" aria-hidden="true" />
        <p className="text-sm">
          Thank you — your <span className="font-medium">demo</span> subscription is confirmed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={className}>
      {heading ? (
        <h2 className="font-display text-2xl lg:text-3xl">{heading}</h2>
      ) : null}

      <div className={cx("mt-4", variant === "hero" ? "max-w-md" : "max-w-sm")}>
        <label htmlFor={inputId} className="eyebrow mb-2 block">
          Email address
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id={inputId}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="you@example.com"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : `${inputId}-note`}
            className={cx("field flex-1", error && "border-red-400 focus:border-red-500 focus:ring-red-500")}
          />
          <button type="submit" className="btn-primary shrink-0">
            Subscribe
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {error ? (
          <p id={`${inputId}-error`} role="alert" className="mt-2 text-xs text-red-700">
            {error}
          </p>
        ) : (
          <p id={`${inputId}-note`} className="mt-2 text-xs text-muted">
            {note ?? "Occasional emails only. Unsubscribe any time."}
          </p>
        )}
      </div>
    </form>
  );
}
