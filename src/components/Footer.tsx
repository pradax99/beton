import { Link } from "react-router-dom";
import { Container } from "./primitives";

const cols = [
  {
    title: "Студія",
    links: [
      { to: "/", label: "Головна" },
      { to: "/guide", label: "Як це працює" },
      { to: "/designer", label: "3D Дизайнер" },
    ],
  },
  {
    title: "Проєкти",
    links: [
      { to: "/interiors", label: "Інтер'єри" },
      { to: "/exteriors", label: "Екстер'єри" },
      { to: "/landscapes", label: "Ландшафти" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-concrete-300/70 bg-concrete-200/60">
      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid h-9 w-9 place-items-center">
                <span className="absolute inset-0 rotate-45 bg-concrete-900" />
                <span className="absolute inset-[7px] rotate-45 bg-clay-500" />
                <span className="absolute inset-[11px] rotate-45 bg-concrete-50" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-concrete-900">
                BÉTON
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-concrete-600">
              Особиста архітектурна студія для проєктування інтер'єрів,
              екстер'єрів та ландшафтів — прямо у твоєму браузері.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-concrete-500">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-concrete-700 transition-colors hover:text-clay-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-concrete-500">
              Матеріали
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-concrete-700">
              <li>Бетон, камінь, дерево</li>
              <li>Скло та метал</li>
              <li>Штукатурка, цегла</li>
              <li>Розрахунок площ та освітлення</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-concrete-300/70 pt-6 text-xs text-concrete-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono uppercase tracking-[0.18em]">
            © {new Date().getFullYear()} BÉTON arch.studio
          </p>
          <p className="font-mono uppercase tracking-[0.18em]">
            Спроєктовано з бетоном · кожен куточок
          </p>
        </div>
      </Container>
    </footer>
  );
}
