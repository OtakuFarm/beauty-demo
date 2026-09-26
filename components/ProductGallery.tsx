"use client";

import { useState } from "react";
import { ProductArtwork } from "@/components/ProductArtwork";
import { cx } from "@/lib/utils";
import type { ProductShape } from "@/lib/types";

interface ProductGalleryProps {
  shape: ProductShape;
  tones: [string, string];
  name: string;
}

const BACKDROPS = ["#f1ece4", "#ece7e0", "#f2ece4", "#e9e7e2"];

export function ProductGallery({ shape, tones, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const views = [
    { label: "Front", backdrop: BACKDROPS[0] },
    { label: "In use", backdrop: BACKDROPS[1] },
    { label: "Texture", backdrop: BACKDROPS[2] },
    { label: "Detail", backdrop: BACKDROPS[3] },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
        <ProductArtwork
          shape={shape}
          tones={tones}
          label={name}
          backdrop={views[active].backdrop}
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-[10px] uppercase tracking-widest text-muted backdrop-blur">
          Demo illustration · {views[active].label}
        </span>
      </div>

      <ul className="grid grid-cols-4 gap-3">
        {views.map((view, i) => (
          <li key={view.label}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${view.label.toLowerCase()} view of ${name}`}
              aria-pressed={active === i}
              className={cx(
                "block w-full overflow-hidden rounded-sm border transition-all duration-300",
                active === i ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <span className="block aspect-[4/5] w-full">
                <ProductArtwork
                  shape={shape}
                  tones={tones}
                  label={name}
                  backdrop={view.backdrop}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
