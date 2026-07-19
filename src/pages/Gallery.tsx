import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Eyebrow } from "@/components/primitives";
import { interiors, exteriors, landscapes, type Category, type Project } from "@/data/gallery";
import { cn } from "@/lib/utils";

const CFG: Record<
  Category,
  {
    data: Project[];
    eyebrow: string;
    title: string;
    lead: string;
    accent: string;
    next: { to: string; label: string };
  }
> = {
  interior: {
    data: interiors,
    eyebrow: "Напрямок 01",
    title: "Інтер'єри",
    lead: "Квартири, студії та кімнати — від бетону й дерева до тепла теракоти. Натхнення для твоєї наступної кімнати в конструкторі.",
    accent: "кожен квадратний метр",
    next: { to: "/exteriors", label: "Екстер'єри" },
  },
  exterior: {
    data: exteriors,
    eyebrow: "Напрямок 02",
    title: "Екстер'єри",
    lead: "Об'єми будинків, фасади та входи. Бетон, скло, цегла й камінь у відшліфованих пропорціях.",
    accent: "об'єкт під відкритим небом",
    next: { to: "/landscapes", label: "Ландшафти" },
  },
  landscape: {
    data: landscapes,
    eyebrow: "Напрямок 03",
    title: "Ландшафти",
    lead: "Двори, сади й патіо — там, де архітектура зустрічається з природою. Вода, камінь і зелені куліси.",
    accent: "простір довкола",
    next: { to: "/interiors", label: "Інтер'єри" },
  },
};

function catFromPath(path: string): Category {
  if (path.includes("exterior")) return "exterior";
  if (path.includes("landscape")) return "landscape";
  return "interior";
}

function Card({ p, big }: { p: Project; big?: boolean }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden border border-concrete-300 bg-concrete-200",
        big && "lg:col-span-2",
      )}
    >
      <div className={cn("relative overflow-hidden", big ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <img
          src={p.img}
          alt={p.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-concrete-950/85 via-concrete-950/5 to-transparent opacity-90" />
        <span className="absolute right-4 top-4 bg-concrete-50/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-concrete-800">
          {p.year}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-concrete-200">
            <span className="text-clay-300">{p.style}</span>
            <span className="text-concrete-400">/</span>
            <span>{p.area}</span>
          </div>
          <h3 className={cn("mt-1.5 font-display font-bold text-concrete-50", big ? "text-2xl sm:text-3xl" : "text-xl")}>
            {p.title}
          </h3>
          <p className={cn("mt-2 text-sm leading-relaxed text-concrete-200 transition-all", big ? "max-w-lg" : "max-w-xs")}>
            {p.blurb}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="border border-concrete-300/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-concrete-100">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Gallery() {
  const { pathname } = useLocation();
  const cat = catFromPath(pathname);
  const cfg = CFG[cat];
  const [active, setActive] = useState<string>("Усі");

  const tags = useMemo(() => {
    const s = new Set<string>();
    cfg.data.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return ["Усі", ...Array.from(s)];
  }, [cat]);

  const list = useMemo(
    () => (active === "Усі" ? cfg.data : cfg.data.filter((p) => p.tags.includes(active))),
    [active, cat],
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-concrete-300 bg-concrete-900 pt-28 pb-14 text-concrete-50">
        <div className="bp-grid absolute inset-0 opacity-40" />
        <Container className="relative">
          <Eyebrow className="text-concrete-400">{cfg.eyebrow}</Eyebrow>
          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h1 className="font-display text-6xl font-bold leading-none tracking-tight sm:text-8xl">
              {cfg.title}
            </h1>
            <div className="max-w-md">
              <p className="text-base leading-relaxed text-concrete-300">{cfg.lead}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-clay-400">
                — {cfg.accent}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FILTER + GRID */}
      <Container className="py-12 sm:py-16">
        <div className="mb-8 flex flex-col gap-4 border-b border-concrete-300 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={cn(
                  "border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors",
                  active === t
                    ? "border-concrete-900 bg-concrete-900 text-concrete-50"
                    : "border-concrete-400 text-concrete-600 hover:border-concrete-700",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-concrete-500">
            {list.length} проєктів
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Card key={p.id} p={p} big={i === 0 && active === "Усі"} />
          ))}
        </div>
      </Container>

      {/* NAV + CTA */}
      <Container className="pb-20">
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <Link
            to="/designer"
            className="concrete-grain surface-concrete panel-edge group flex flex-col justify-between gap-6 p-8 sm:p-10"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay-600">
              Спробуй сам
            </span>
            <div>
              <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-concrete-900 sm:text-4xl">
                Від galleries до власного проєкту
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-concrete-700">
                Збери атмосферу з цих робіт у конструкторі — і покрути у 3D.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-concrete-900">
                Відкрити конструктор
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>

          <Link
            to={cfg.next.to}
            className="group flex flex-col justify-between border border-concrete-300 bg-concrete-900 p-8 text-concrete-50 transition-colors hover:bg-concrete-800"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay-400">
              Далі
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-concrete-400">
                Переглянь напрямок
              </p>
              <h3 className="mt-1 font-display text-3xl font-bold tracking-tight">
                {cfg.next.label} →
              </h3>
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
}
