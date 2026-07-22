import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Eyebrow } from "@/components/primitives";
import { cn } from "@/lib/utils";

const usage = [
  {
    n: "01",
    t: "Обери тип простору",
    d: "У верхі панелі обери «Інтер'єр», «Будинок» або «Ландшафт». Кожен режим має свій набір об'єктів і матеріалів.",
  },
  {
    n: "02",
    t: "Додай об'єкти",
    d: "Тапни на іконку в палітрі меблів чи елементів двору — об'єкт з'явиться у вільній клітині. Або завантаж готову композицію одним тапом.",
  },
  {
    n: "03",
    t: "Редагуй обране",
    d: "Тапни по об'єкту в сцені, щоб обрати його. Рухай стрілками, обертай ⟲⟳ та видаляй — без миші, зручно на телефоні.",
  },
  {
    n: "04",
    t: "Підбери матеріали",
    d: "Обирай покриття підлоги й колір стін. Вмикай/вимикай стіни та дах, щоб розглядати інтер'єр зсередини чи зовні.",
  },
  {
    n: "05",
    t: "Крутай у 3D",
    d: "Перетягуй мишею або пальцем, щоб обертати. Колесо або щипок — масштаб. Вмикай «2D» для виду плану зверху.",
  },
];

const controls = [
  { act: "Обертати сцену", pc: "ЛКМ + перетяг", mob: "1 палець" },
  { act: "Масштаб", pc: "Колесо миші", mob: "Щипок (2 пальці)" },
  { act: "Обрати об'єкт", pc: "Клік", mob: "Тап" },
  { act: "Зняти вибір", pc: "Клік мимо", mob: "Тап мимо" },
  { act: "Вид плану", pc: "Кнопка 2D/3D", mob: "Кнопка 2D/3D" },
];

const tips = [
  { icon: "▣", t: "Почни з композиції", d: "Завантаж готову композицію, а потім замінюй об'єкти — так швидше дійти до свого варіанту." },
  { icon: "◑", t: "Грай з матеріалами", d: "Той самий простір виглядає по-різному з бетоном, деревом чи теракотою. Порівнюй." },
  { icon: "↻", t: "Оглянь з усіх боків", d: "Увімкни авто-обертання, щоб спокійно оцінити проєкт з кожного ракурсу." },
  { icon: "▤", t: "Перевіряй планом", d: "Вид зверху допомагає виставити відстані йavoid тесноти між об'єктами." },
];

const materials = [
  { sw: "#b58a55", n: "Дерево", use: "Тепло інтер'єру, сходи, тераси" },
  { sw: "#c8c3ba", n: "Бетон", use: "Підлоги, стіни, основні поверхні" },
  { sw: "#9fc3d6", n: "Скло", use: "Вікна, двері, перегородки" },
  { sw: "#9a948a", n: "Камінь", use: "Двори, патіо, мощення" },
  { sw: "#b65a37", n: "Теракота", use: "Акценти, деталі, оксамит кольору" },
  { sw: "#7c8a52", n: "Зелень", use: "Газони, кущі, дерева" },
];

const faqs = [
  {
    q: "Це безкоштовно і без реєстрації?",
    a: "Так. Студія створена для особистого використання — нічого не треба встановлювати або реєструвати. Просто відкрий конструктор і проєктуй.",
  },
  {
    q: "Чи працює на телефоні?",
    a: "Так, інтерфейс адаптивний. Обертання — одним пальцем, масштаб — двома. Панель керування розгортається під сценою.",
  },
  {
    q: "Чи можна зберегти проєкт?",
    a: "Сцена живе у твоїй сесії. Для фіксації результату зроби скріншот з різних ракурсів — у тому числі з вигляду плану.",
  },
  {
    q: "Чим цей інструмент відрізняється від редакторів для компаній?",
    a: "Він фокусується на швидкій персональній прототипуванні: обери кімнату, наповни її, підбери матеріали й одразу побач у 3D. Без клубів, тарифів і довгого онбордингу.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-concrete-300">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-lg font-medium text-concrete-900 sm:text-xl">{q}</span>
        <span className={cn("grid h-8 w-8 shrink-0 place-items-center border border-concrete-400 text-lg text-concrete-700 transition-transform", open && "rotate-45 bg-concrete-900 text-concrete-50")}>
          +
        </span>
      </button>
      <div className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}>
        <p className="overflow-hidden text-sm leading-relaxed text-concrete-600">{a}</p>
      </div>
    </div>
  );
}

export default function Guide() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-concrete-300 bg-concrete-900 pt-28 pb-16 text-concrete-50">
        <div className="bp-grid absolute inset-0 opacity-40" />
        <Container className="relative">
          <Eyebrow className="text-concrete-400">Гід студії</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            Як проєктувати
            <br />
            <span className="text-clay-400">у бетоні</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-concrete-300">
            Коротка інструкція до 3D-конструктора: від першого об'єкта до фінального
            ракурсу. Все інтуїтивно — тут лише підказки.
          </p>
        </Container>
      </section>

      {/* USAGE STEPS */}
      <Container className="py-16 sm:py-24">
        <div className="grid gap-px overflow-hidden border border-concrete-300 bg-concrete-300 sm:grid-cols-2 lg:grid-cols-3">
          {usage.map((s) => (
            <div key={s.n} className="bg-concrete-100 p-7">
              <span className="font-display text-4xl font-bold text-clay-500/80">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-concrete-900">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-concrete-600">{s.d}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* CONTROLS + TIPS */}
      <section className="border-y border-concrete-300 bg-concrete-200/60">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Керування</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-concrete-900 sm:text-4xl">
                ПК і телефон
              </h2>
              <div className="mt-7 overflow-hidden border border-concrete-300">
                <div className="grid grid-cols-3 bg-concrete-900 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-concrete-400">
                  <span>Дія</span>
                  <span>ПК</span>
                  <span>Телефон</span>
                </div>
                {controls.map((c, i) => (
                  <div
                    key={c.act}
                    className={cn(
                      "grid grid-cols-3 px-4 py-3.5 text-sm",
                      i % 2 ? "bg-concrete-100" : "bg-concrete-50",
                    )}
                  >
                    <span className="font-medium text-concrete-900">{c.act}</span>
                    <span className="text-concrete-600">{c.pc}</span>
                    <span className="text-concrete-600">{c.mob}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow>Поради</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-concrete-900 sm:text-4xl">
                Проєктуй смачніше
              </h2>
              <div className="mt-7 space-y-4">
                {tips.map((t) => (
                  <div key={t.t} className="flex gap-4 border border-concrete-300 bg-concrete-100 p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-concrete-400 bg-concrete-50 font-display text-clay-600">
                      {t.icon}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-concrete-900">{t.t}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-concrete-600">{t.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* MATERIALS */}
      <Container className="py-16 sm:py-24">
        <Eyebrow>Палітра</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-concrete-900 sm:text-4xl">
          Матеріали студії
        </h2>
        <div className="mt-9 grid gap-px overflow-hidden border border-concrete-300 bg-concrete-300 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((m) => (
            <div key={m.n} className="flex items-center gap-4 bg-concrete-100 p-5">
              <span className="h-14 w-14 shrink-0 border border-concrete-400 panel-edge" style={{ background: m.sw }} />
              <div>
                <h3 className="font-display text-base font-semibold text-concrete-900">{m.n}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-concrete-600">{m.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* FAQ */}
      <section className="border-t border-concrete-300 bg-concrete-200/60">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-concrete-900 sm:text-4xl">
                Часті питання
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-concrete-600">
                Не знайшов відповідь? Просто почни проєктувати — інтерфейс підкаже сам.
              </p>
              <Link
                to="/designer"
                className="mt-7 inline-flex items-center gap-3 bg-concrete-900 px-6 py-3.5 font-display text-sm font-semibold text-concrete-50 transition-colors hover:bg-clay-500"
              >
                У конструктор →
              </Link>
            </div>
            <div>
              {faqs.map((f) => (
                <FaqItem key={f.q} {...f} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
