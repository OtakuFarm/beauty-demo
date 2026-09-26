import type { Product, ProductShape } from "@/lib/types";
import { cx } from "@/lib/utils";

interface ProductArtworkProps {
  shape: ProductShape;
  tones: [string, string];
  label: string;
  className?: string;
  backdrop?: string;
}

/** Stable, deterministic id so server and client markup always match. */
const artworkId = (shape: ProductShape, label: string): string =>
  `lumi-${shape}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

/**
 * Original vector artwork for the fictional LUMI line. Each product is drawn
 * from primitives so the demo ships with no third-party or copyrighted imagery.
 */
export function ProductArtwork({
  shape,
  tones,
  label,
  className,
  backdrop = "#f1ece4",
}: ProductArtworkProps) {
  const id = artworkId(shape, label);
  const [light, dark] = tones;
  const short = label.replace("LUMI ", "").toUpperCase();
  const lines = short.length > 11 ? [short.slice(0, 11), short.slice(11)] : [short];

  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label={`Illustration of ${label}`}
      className={cx("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor={backdrop} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`bd-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={light} />
          <stop offset="45%" stopColor={dark} />
          <stop offset="100%" stopColor={light} />
        </linearGradient>
        <linearGradient id={`gl-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id={`sh-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#1c1b19" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#1c1b19" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#bg-${id})`} />
      <ellipse cx="200" cy="452" rx="150" ry="18" fill={`url(#sh-${id})`} />
      <path d="M40 452 H360" stroke={dark} strokeOpacity="0.25" strokeWidth="1" />

      <g>
        {shape === "dropper" && (
          <>
            <rect x="176" y="96" width="48" height="52" rx="6" fill={dark} />
            <rect x="168" y="86" width="64" height="18" rx="9" fill={light} />
            <rect x="182" y="140" width="36" height="70" rx="4" fill="#ffffff" fillOpacity="0.35" />
            <path d="M156 210 h88 q14 0 14 16 v186 q0 26 -26 26 h-64 q-26 0 -26 -26 v-186 q0 -16 14 -16 z" fill={`url(#bd-${id})`} />
            <path d="M156 210 h88 q14 0 14 16 v186 q0 26 -26 26 h-64 q-26 0 -26 -26 v-186 q0 -16 14 -16 z" fill={`url(#gl-${id})`} />
            <rect x="156" y="210" width="88" height="8" fill="#ffffff" fillOpacity="0.25" />
          </>
        )}

        {shape === "bottle" && (
          <>
            <rect x="182" y="104" width="36" height="34" rx="4" fill={dark} />
            <path d="M150 138 h100 q12 0 12 14 v244 q0 24 -24 24 h-76 q-24 0 -24 -24 v-244 q0 -14 12 -14 z" fill={`url(#bd-${id})`} />
            <path d="M150 138 h100 q12 0 12 14 v244 q0 24 -24 24 h-76 q-24 0 -24 -24 v-244 q0 -14 12 -14 z" fill={`url(#gl-${id})`} />
            <rect x="150" y="138" width="100" height="7" fill="#ffffff" fillOpacity="0.28" />
          </>
        )}


        {shape === "jar" && (
          <>
            <rect x="122" y="196" width="156" height="34" rx="12" fill={dark} />
            <path d="M136 226 h128 q10 0 10 12 v168 q0 22 -22 22 h-104 q-22 0 -22 -22 v-168 q0 -12 10 -12 z" fill={`url(#bd-${id})`} />
            <path d="M136 226 h128 q10 0 10 12 v168 q0 22 -22 22 h-104 q-22 0 -22 -22 v-168 q0 -12 10 -12 z" fill={`url(#gl-${id})`} />
            <rect x="122" y="196" width="156" height="10" fill="#ffffff" fillOpacity="0.3" />
          </>
        )}

        {shape === "tube" && (
          <>
            <rect x="166" y="118" width="68" height="30" rx="8" fill={dark} />
            <path d="M170 148 h60 l16 258 q1 14 -14 14 h-64 q-15 0 -14 -14 z" fill={`url(#bd-${id})`} />
            <path d="M170 148 h60 l16 258 q1 14 -14 14 h-64 q-15 0 -14 -14 z" fill={`url(#gl-${id})`} />
            <rect x="166" y="118" width="68" height="9" fill="#ffffff" fillOpacity="0.3" />
          </>
        )}

        {shape === "pump" && (
          <>
            <path d="M188 74 h44 v14 h-14 v18 h-30 v-18 h-14 v-14 z" fill={dark} />
            <rect x="168" y="102" width="64" height="16" rx="8" fill={light} />
            <path d="M150 118 h100 q12 0 12 14 v260 q0 24 -24 24 h-76 q-24 0 -24 -24 v-260 q0 -14 12 -14 z" fill={`url(#bd-${id})`} />
            <path d="M150 118 h100 q12 0 12 14 v260 q0 24 -24 24 h-76 q-24 0 -24 -24 v-260 q0 -14 12 -14 z" fill={`url(#gl-${id})`} />
            <rect x="150" y="118" width="100" height="7" fill="#ffffff" fillOpacity="0.28" />
          </>
        )}

        {shape === "set" && (
          <>
            <rect x="92" y="212" width="70" height="164" rx="10" fill={light} />
            <rect x="92" y="212" width="70" height="164" rx="10" fill={`url(#gl-${id})`} />
            <rect x="104" y="186" width="46" height="30" rx="5" fill={dark} />
            <path d="M186 172 h60 q10 0 10 12 v172 q0 20 -20 20 h-40 q-20 0 -20 -20 v-172 q0 -12 10 -12 z" fill={dark} />
            <path d="M186 172 h60 q10 0 10 12 v172 q0 20 -20 20 h-40 q-20 0 -20 -20 v-172 q0 -12 10 -12 z" fill={`url(#gl-${id})`} />
            <rect x="200" y="146" width="32" height="30" rx="4" fill={light} />
            <rect x="264" y="248" width="76" height="128" rx="8" fill={light} />
            <rect x="264" y="248" width="76" height="128" rx="8" fill={`url(#gl-${id})`} />
            <rect x="278" y="226" width="48" height="26" rx="5" fill={dark} />
          </>
        )}
      </g>

      <text
        x="200"
        y="352"
        textAnchor="middle"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="21"
        letterSpacing="6"
        fill="#1c1b19"
        fillOpacity="0.82"
      >
        LUMI
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x="200"
          y={376 + i * 13}
          textAnchor="middle"
          fontFamily="var(--font-sans), sans-serif"
          fontSize="7"
          letterSpacing="2.4"
          fill="#1c1b19"
          fillOpacity="0.55"
        >
          {line}
        </text>
      ))}
    </svg>
  );
}

export function ProductArtworkFromProduct({
  product,
  className,
  backdrop,
}: {
  product: Product;
  className?: string;
  backdrop?: string;
}) {
  return (
    <ProductArtwork
      shape={product.shape}
      tones={product.tones}
      label={product.name}
      className={className}
      backdrop={backdrop}
    />
  );
}
