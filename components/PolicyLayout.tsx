import type { ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-lumi max-w-2xl text-[15px] leading-relaxed text-muted">
      {children}
    </div>
  );
}

export function PolicySection({
  id,
  title,
  children,
  updated,
}: {
  id?: string;
  title: string;
  children: ReactNode;
  updated?: string;
}) {
  return (
    <section aria-labelledby={id ? `${id}-heading` : undefined} className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 id={id ? `${id}-heading` : undefined} className="font-display text-2xl">
        {title}
      </h2>
      {children}
      {updated ? <p className="mt-4 text-xs text-muted">Last updated: {updated}</p> : null}
    </section>
  );
}
