import { Link } from "react-router-dom";
import { Container, Eyebrow, Kicker } from "@/components/primitives";
import { interiors, exteriors, landscapes } from "@/data/gallery";

const HERO_IMG =
  "https://images.pexels.com/photos/3939978/pexels-photo-3939978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1600";

const whatWeDo = [
  {
    to: "/interiors",
    tag: "01 — Інтер'єр",
    title: "Інтер'єри",
    desc: "Квартири, студії, кімнати. Розставляй меблі, обирай підлогу та стіни, дивись з кожного боку.",
    img: interiors[0].img,
  },
  {
    to: "/exteriors",
    tag: "02 — Екстер'єр",
    title: "Екстер'єри",
    desc: "Об'єми будинків, фасади, входи. Бетон, скло, цегла та камінь у твоїх пропорціях.",
    img: exteriors[3].img,
  },
  {
    to: "/landscapes",
    tag: "03 — Ландшафт",
    title: "Ландшафти",
    desc: "Двір, сад, патіо. Дерева, водойми, доріжки й перголи — твоя зелена сцена.",
    img: landscapes[5].img,
  },
];

const features = [
  {
    icon: "⟲",
    title: "Обертай у 3D",
    desc: "Гортай, крутай і розглядай проєкт з усіх боків — або вмикай вид зверху як план.",
  },
  {
    icon: "▣",
    title: "Будуй сам",
    desc: "Додавай меблі й елементи, рухай, обертай та змінюй матеріали кількома тапами.",
  },
  {
    icon: "▢",
    title: "Бетонна естетика",
    desc: "Текстура бетону, тепле дерево та теракотовий акцент — спокійна архітектурна палітра.",
  },
  {
    icon: "☍",
    title: "Телефон і ПК",
    desc: "Працює плавно на телефоні: один палець — обертання, два — масштаб.",
  },
];

const steps = [
  { n: "01", t: "Обери тип", d: "Інтер'єр, будинок або ландшафт — відправна точка твого проєкту." },
  { n: "02", t: "Наповни простір", d: "Додавай готові об'єкти або завантаж композицію одним тапом." },
  { n: "03", t: "Підбери матеріали", d: "Підлога, стіни й фактури — міняй миттєво та порівнюй." },
  { n: "04", t: "Розглянь у 3D", d: "Крутай, наближай, вмикай вид плану й фіксуй рішення." },
];

const featured = [interiors[7], exteriors[0], landscapes[0], interiors[4], exteriors[6], landscapes[3]];

const marqueeWords = [
  "бетон",
  "дерево",
  "скло",
  "камінь",
  "метал",
  "штукатурка",
  "теракота",
  "ціегла",
  "світло",
  "пропорції",
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Бетонна архітектура присмерком"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-concrete-950 via-concrete-950/55 to-concrete-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-concrete-950/70 to-transparent" />
        </div>

        {/* vertical marker */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] uppercase tracking-[0.5em] text-concrete-300/70 lg:block">
          arch.studio — est. 2026
        </div>

        <Container className="relative z-10 pb-16 pt-32 sm:pb-24">
          <Kicker>Особиста архітектурна студія</Kicker>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[0.92] tracking-tight text-concrete-50 sm:text-7xl lg:text-[7.5rem]">
            Проєктуй простір.
            <br />
            <span className="text-clay-400">Кожен куб</span> бетону.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-concrete-200 sm:text-lg">
            Створюй власні інтер'єри, будинки та ландшафти у браузері. Розставляй
            меблі, обирай матеріали та розглядай результат у 3D — з будь-якого
            боку.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/designer"
              className="group inline-flex items-center gap-3 bg-clay-500 px-7 py-4 font-display text-sm font-semibold text-concrete-50 transition-colors hover:bg-clay-600"
            >
              Запустити 3D-конструктор
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/interiors"
              className="inline-flex items-center gap-3 border border-concrete-300/50 bg-concrete-50/5 px-7 py-4 font-display text-sm font-semibold text-concrete-50 backdrop-blur-sm transition-colors hover:bg-concrete-50/10"
            >
              Переглянути роботи
            </Link>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-concrete-300/30 pt-7">
            {[
              ["20+", "типів об'єктів"],
              ["3D", "обертання довкола"],
              ["∞", "власних планувань"],
            ].map(([a, b]) => (
              <div key={b}>
                <p className="font-display text-3xl font-bold text-concrete-50 sm:text-4xl">
                  {a}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-concrete-300">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-concrete-900 bg-concrete-900 py-4">
        <div className="flex w-max animate-marquee">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className="mx-6 flex items-center gap-6 font-display text-lg font-medium uppercase tracking-wide text-concrete-400"
            >
              {w}
              <span className="text-clay-500">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* WHAT WE DESIGN */}
      <Container className="py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Напрямки</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-concrete-900 sm:text-5xl">
              Один інструмент — три всесвіти простору
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-concrete-600">
            Від кав'ярні-студії до власного будинку з садом. Обирай, що
            проєктуєш, і переходь у конструктор.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {whatWeDo.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group relative block overflow-hidden border border-concrete-300 bg-concrete-200"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-concrete-950/85 via-concrete-950/10 to-transparent" />
                <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete-100">
                  {c.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl font-bold text-concrete-50">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete-200">
                    {c.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-clay-300">
                    Відкрити <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* CONSTRUCTOR FEATURE */}
      <section className="border-y border-concrete-300 bg-concrete-200/60">
        <Container className="py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>3D-конструктор</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-concrete-900 sm:text-5xl">
                Не малюнок — простір, який можна крутити
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-concrete-600">
                Це не каталог для компаній. Це особиста студія: ти обираєш
                кімнату, наповнюєш її своїми меблями, міняєш бетон на дерево — і
                одразу бачиш результат у трьох вимірах.
              </p>

              <div className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {features.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-concrete-400 bg-concrete-100 font-display text-lg text-clay-600">
                      {f.icon}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-concrete-900">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-concrete-600">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/designer"
                className="mt-9 inline-flex items-center gap-3 bg-concrete-900 px-7 py-4 font-display text-sm font-semibold text-concrete-50 transition-colors hover:bg-clay-500"
              >
                Спробувати зараз →
              </Link>
            </div>

            {/* Mock planner card */}
            <div className="relative">
              <div className="concrete-grain surface-concrete panel-edge relative aspect-[5/6] overflow-hidden p-5 sm:aspect-square">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete-600">
                    studio.plan / 3d
                  </span>
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rotate-45 bg-clay-500" />
                    <span className="h-2.5 w-2.5 rotate-45 bg-concrete-500" />
                    <span className="h-2.5 w-2.5 rotate-45 bg-concrete-800" />
                  </div>
                </div>

                <div className="relative mt-4 h-[calc(100%-3rem)] overflow-hidden border border-concrete-300 bg-concrete-100">
                  <div className="bp-grid absolute inset-0 opacity-60" />
                  {/* isometric room mock */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="relative h-44 w-56 -rotate-[18deg] sm:h-52 sm:w-72">
                      <div className="absolute left-0 top-8 h-32 w-40 bg-concrete-300 shadow-lg" />
                      <div className="absolute right-0 top-16 h-20 w-36 bg-concrete-400 shadow" />
                      <div className="absolute -bottom-2 left-10 h-7 w-24 bg-clay-500" />
                      <div className="absolute bottom-6 right-6 h-10 w-10 rounded-full" style={{ background: "#6f8550" }} />
                      <div className="animate-float absolute left-6 top-2 h-16 w-3 bg-concrete-700" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {["2D", "3D", "↻"].map((b, i) => (
                      <span
                        key={b}
                        className={`grid h-7 w-7 place-items-center font-mono text-[10px] ${
                          i === 1 ? "bg-concrete-900 text-concrete-50" : "border border-concrete-400 bg-concrete-50 text-concrete-600"
                        }`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <span className="absolute right-3 top-3 bg-concrete-900/80 px-2 py-0.5 font-mono text-[9px] tracking-wider text-concrete-200">
                    6 ОБ'ЄКТІВ
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden bg-concrete-900 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-concrete-300 sm:block">
                real-time · 3d
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <Container className="py-20 sm:py-28">
        <div className="max-w-2xl">
          <Eyebrow>Процес</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-concrete-900 sm:text-5xl">
            Чотири кроки до твого проєкту
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden border border-concrete-300 bg-concrete-300 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-concrete-100 p-7 transition-colors hover:bg-concrete-200/70">
              <span className="font-display text-5xl font-bold text-clay-500/80">{s.n}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-concrete-900">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-concrete-600">{s.d}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* FEATURED WORKS */}
      <section className="border-y border-concrete-300 bg-concrete-200/60">
        <Container className="py-20 sm:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Вітрина</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-concrete-900 sm:text-5xl">
                Обрані проєкти
              </h2>
            </div>
            <div className="flex gap-2">
              <Link to="/interiors" className="border border-concrete-400 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-concrete-700 hover:bg-concrete-900 hover:text-concrete-50">
                Інтер'єри
              </Link>
              <Link to="/exteriors" className="border border-concrete-400 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-concrete-700 hover:bg-concrete-900 hover:text-concrete-50">
                Екстер'єри
              </Link>
              <Link to="/landscapes" className="border border-concrete-400 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-concrete-700 hover:bg-concrete-900 hover:text-concrete-50">
                Ландшафти
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <div key={p.id} className="group overflow-hidden border border-concrete-300 bg-concrete-100">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-concrete-900">{p.title}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-concrete-500">{p.style} · {p.area}</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-clay-600">{p.category}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Container className="py-20 sm:py-28">
        <div className="concrete-grain surface-concrete panel-edge relative overflow-hidden px-8 py-16 text-center sm:px-16 sm:py-24">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-concrete-900 sm:text-6xl">
            Готовий побудувати свій простір?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-concrete-700">
            Жодних реєстрацій і компаній. Просто відкрий конструктор і почни
            проєктувати — бетон зачищає все зайве.
          </p>
          <Link
            to="/designer"
            className="mt-9 inline-flex items-center gap-3 bg-concrete-900 px-8 py-4 font-display text-sm font-semibold text-concrete-50 transition-colors hover:bg-clay-500"
          >
            Відкрити 3D-конструктор →
          </Link>
        </div>
      </Container>
    </div>
  );
}
