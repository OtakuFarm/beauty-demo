import { Reveal } from "@/components/Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function PageHeader({ eyebrow, title, description, align = "left" }: PageHeaderProps) {
  return (
    <section className="border-b border-line bg-sand/60">
      <div
        className={`site-container py-16 lg:py-20 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-2 mt-4 max-w-3xl">{title}</h1>
          {description ? (
            <p
              className={`mt-5 max-w-2xl text-[15px] leading-relaxed text-muted ${
                align === "center" ? "mx-auto" : ""
              }`}
            >
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
