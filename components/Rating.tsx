import { Star } from "lucide-react";
import { cx } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md";
  showValue?: boolean;
  className?: string;
}

export function Rating({ value, count, size = "sm", showValue = true, className }: RatingProps) {
  const px = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className={cx("flex items-center gap-2", className)}>
      <span
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Rated ${value} out of 5`}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = rounded >= i + 1;
          const half = !filled && rounded >= i + 0.5;
          return (
            <span key={i} className="relative">
              <Star className={cx(px, "text-line")} aria-hidden="true" />
              {(filled || half) && (
                <span className="absolute inset-0 overflow-hidden" style={{ width: half ? "50%" : "100%" }}>
                  <Star className={cx(px, "fill-gold text-gold")} aria-hidden="true" />
                </span>
              )}
            </span>
          );
        })}
      </span>
      {showValue ? (
        <span className="text-xs text-muted">
          {value.toFixed(1)}
          {typeof count === "number" ? ` (${count})` : ""}
        </span>
      ) : typeof count === "number" ? (
        <span className="text-xs text-muted">({count})</span>
      ) : null}
    </div>
  );
}
