"use client";

import { Minus, Plus } from "lucide-react";
import { cx } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  size?: "sm" | "md";
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label,
  size = "md",
  className,
}: QuantityStepperProps) {
  const btn =
    size === "sm"
      ? "h-7 w-7"
      : "h-9 w-9";

  return (
    <div
      className={cx(
        "inline-flex items-center rounded-full border border-line bg-white",
        size === "sm" ? "gap-1 p-0.5" : "gap-2 p-1",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cx(
          btn,
          "flex items-center justify-center rounded-full transition-colors duration-300 hover:bg-sand disabled:cursor-not-allowed disabled:opacity-30"
        )}
        aria-label={`Decrease quantity of ${label}`}
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span
        className={cx("min-w-[1.5rem] text-center tabular-nums", size === "sm" ? "text-xs" : "text-sm")}
        aria-live="polite"
        aria-label={`Quantity of ${label}: ${value}`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cx(
          btn,
          "flex items-center justify-center rounded-full transition-colors duration-300 hover:bg-sand disabled:cursor-not-allowed disabled:opacity-30"
        )}
        aria-label={`Increase quantity of ${label}`}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
