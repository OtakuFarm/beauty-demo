"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useId, useState } from "react";
import { useToast } from "@/components/providers/ToastProvider";
import { cx } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const TOPICS = ["Order help", "Product advice", "Returns", "Press", "Something else"];

interface Fields {
  name: string;
  email: string;
  topic: string;
  order: string;
  message: string;
}

const EMPTY: Fields = { name: "", email: "", topic: TOPICS[0], order: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);
  const { notify } = useToast();
  const ids = { name: useId(), email: useId(), topic: useId(), order: useId(), message: useId() };

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};

    if (!fields.name.trim()) next.name = "Please tell us your name.";
    if (!fields.email.trim()) next.email = "An email address is required.";
    else if (!EMAIL_PATTERN.test(fields.email.trim())) next.email = "That email address doesn't look right.";
    if (fields.message.trim().length < 10)
      next.message = "A little more detail helps us help you — 10 characters minimum.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      notify("Please check the highlighted fields.", { variant: "error" });
      return;
    }

    setSent(true);
    setFields(EMPTY);
    notify("Message sent. (Demo — nothing was actually delivered.)");
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-sm border border-line bg-sand p-8"
        >
          <Check className="h-6 w-6 text-gold" aria-hidden="true" />
          <h2 className="display-3 mt-4">Thank you — that came through.</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            In a live store you would hear back within one working day. On this demo, your message went
            nowhere at all, which is exactly what the badge on this site promises.
          </p>
          <button type="button" onClick={() => setSent(false)} className="btn-secondary mt-6">
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id={ids.name}
              label="Your name"
              error={errors.name}
              value={fields.name}
              onChange={(v) => update("name", v)}
              autoComplete="name"
            />
            <Field
              id={ids.email}
              label="Email address"
              type="email"
              error={errors.email}
              value={fields.email}
              onChange={(v) => update("email", v)}
              autoComplete="email"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor={ids.topic} className="eyebrow mb-2 block">
                Topic
              </label>
              <select
                id={ids.topic}
                value={fields.topic}
                onChange={(e) => update("topic", e.target.value)}
                className="field appearance-none"
              >
                {TOPICS.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={ids.order} className="eyebrow mb-2 block">
                Order number <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id={ids.order}
                type="text"
                value={fields.order}
                onChange={(e) => update("order", e.target.value)}
                placeholder="LUM-000000"
                className="field"
              />
            </div>
          </div>

          <div>
            <label htmlFor={ids.message} className="eyebrow mb-2 block">
              Message
            </label>
            <textarea
              id={ids.message}
              rows={6}
              value={fields.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? `${ids.message}-error` : undefined}
              placeholder="Tell us what you need help with…"
              className={cx(
                "w-full rounded-sm border bg-white px-5 py-3 text-sm outline-none transition-colors focus:ring-1",
                errors.message
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-line focus:border-ink focus:ring-ink"
              )}
            />
            {errors.message ? (
              <p id={`${ids.message}-error`} role="alert" className="mt-2 text-xs text-red-700">
                {errors.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-primary">
              Send message
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="text-xs text-muted">Demo form — submissions are validated but never sent.</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx("field", error && "border-red-400 focus:border-red-500 focus:ring-red-500")}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

