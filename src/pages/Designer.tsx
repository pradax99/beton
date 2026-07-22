import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DesignerScene, { type Mode, type View } from "@/three/DesignerScene";
import {
  CATALOG,
  defOf,
  type ItemType,
  type PlacedItem,
} from "@/three/furniture";
import { cn } from "@/lib/utils";

const SIZES: Record<Mode, number> = { interior: 8, house: 8, landscape: 13 };

const MODES: { key: Mode; label: string; sub: string }[] = [
  { key: "interior", label: "Інтер'єр", sub: "Кімната / квартира" },
  { key: "house", label: "Будинок", sub: "Екстер'єр" },
  { key: "landscape", label: "Ландшафт", sub: "Двір / сад" },
];

const FLOOR_INTERIOR = [
  { key: "wood", label: "Дерево" },
  { key: "concrete", label: "Бетон" },
  { key: "tile", label: "Плитка" },
  { key: "dark", label: "Графіт" },
];
const FLOOR_OUTDOOR = [
  { key: "grass", label: "Газон" },
  { key: "stone", label: "Камінь" },
  { key: "concrete", label: "Бетон" },
  { key: "gravel", label: "Гравій" },
  { key: "sand", label: "Пісок" },
];
const WALL_OPTS = [
  { key: "plaster", label: "Штукатурка" },
  { key: "concrete", label: "Бетон" },
  { key: "clay", label: "Теракота" },
  { key: "dark", label: "Графіт" },
  { key: "brick", label: "Цегла" },
];

type PresetItem = { type: ItemType; x: number; z: number; rot?: number };
const PRESETS: Record<Mode, { name: string; items: PresetItem[] }[]> = {
  interior: [
    {
      name: "Студія",
      items: [
        { type: "rug", x: 0, z: 0.4 },
        { type: "sofa", x: 0, z: 1.8, rot: Math.PI },
        { type: "coffeeTable", x: 0, z: 0.2 },
        { type: "tv", x: 0, z: -2.7 },
        { type: "plant", x: 2.7, z: -2.4 },
        { type: "lamp", x: -2.8, z: 1.9 },
      ],
    },
    {
      name: "Вітальня",
      items: [
        { type: "rug", x: 0, z: 0 },
        { type: "sofa", x: 0, z: 2, rot: Math.PI },
        { type: "armchair", x: -2.5, z: 0.4, rot: Math.PI / 2 },
        { type: "armchair", x: 2.5, z: 0.4, rot: -Math.PI / 2 },
        { type: "coffeeTable", x: 0, z: 0.4 },
        { type: "plant", x: 2.9, z: -2.6 },
      ],
    },
    {
      name: "Спальня",
      items: [
        { type: "bed", x: 0, z: -0.5 },
        { type: "wardrobe", x: 0, z: 2.7, rot: Math.PI },
        { type: "lamp", x: -2.7, z: -1.8 },
        { type: "plant", x: 2.8, z: 2.4 },
      ],
    },
    {
      name: "Кухня",
      items: [
        { type: "kitchen", x: 0, z: -2.7, rot: Math.PI },
        { type: "diningSet", x: 0, z: 1 },
        { type: "plant", x: 3, z: 2.8 },
      ],
    },
  ],
  house: [
    {
      name: "Вілла",
      items: [
        { type: "tree", x: -3.4, z: -3 },
        { type: "tree", x: 3.4, z: 3 },
        { type: "path", x: 0, z: 4.8 },
        { type: "shrub", x: -2.6, z: 2.6 },
        { type: "shrub", x: 2.6, z: -2.6 },
        { type: "fence", x: 0, z: -4.3 },
      ],
    },
    {
      name: "Мінімал",
      items: [
        { type: "path", x: 0, z: 4.8 },
        { type: "planter", x: -3, z: 3.4 },
        { type: "planter", x: 3, z: 3.4 },
        { type: "tree", x: -3.6, z: -2 },
      ],
    },
  ],
  landscape: [
    {
      name: "Зона відпочинку",
      items: [
        { type: "pergola", x: 0, z: 0 },
        { type: "bench", x: 0, z: -2.6 },
        { type: "tree", x: -4, z: -3.5 },
        { type: "tree", x: 4, z: 3.5 },
        { type: "flowerbed", x: 0, z: 3, rot: Math.PI / 2 },
        { type: "shrub", x: -3, z: 2 },
      ],
    },
    {
      name: "Дзен-двір",
      items: [
        { type: "pond", x: 0, z: 0 },
        { type: "path", x: 0, z: -2.8 },
        { type: "path", x: 0, z: 2.8 },
        { type: "shrub", x: -3, z: -1 },
        { type: "shrub", x: 3, z: 1 },
        { type: "planter", x: -3.6, z: 3 },
      ],
    },
    {
      name: "Зелений газон",
      items: [
        { type: "tree", x: -4.5, z: -4 },
        { type: "tree", x: 4.5, z: -4 },
        { type: "tree", x: 0, z: 5 },
        { type: "fence", x: -5.8, z: 0, rot: Math.PI / 2 },
        { type: "fence", x: 5.8, z: 0, rot: Math.PI / 2 },
        { type: "flowerbed", x: 0, z: 0, rot: Math.PI / 2 },
      ],
    },
  ],
};

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

function findSlot(items: PlacedItem[], size: number) {
  const half = Math.floor(size / 2 - 0.6);
  const cands: [number, number][] = [];
  for (let x = -half; x <= half; x++)
    for (let z = -half; z <= half; z++) cands.push([x, z]);
  cands.sort((a, b) => a[0] ** 2 + a[1] ** 2 - (b[0] ** 2 + b[1] ** 2));
  for (const [x, z] of cands)
    if (items.every((it) => Math.hypot(it.x - x, it.z - z) > 1.2))
      return { x, z };
  return { x: 0, z: 0 };
}

/* ----------------------------- small UI ----------------------------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[10px] uppercase tracking-[0.26em] text-concrete-500">
      {children}
    </h3>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-3 py-2 text-left font-display text-sm transition-all",
        active
          ? "border-concrete-900 bg-concrete-900 text-concrete-50"
          : "border-concrete-300 bg-concrete-50 text-concrete-700 hover:border-concrete-500",
      )}
    >
      {children}
    </button>
  );
}

function PanelBlock({ children }: { children: React.ReactNode }) {
  return <div className="border-b border-concrete-200 px-5 py-5">{children}</div>;
}

/* ----------------------------- Page ----------------------------- */

export default function Designer() {
  const [mode, setMode] = useState<Mode>("interior");
  const [items, setItems] = useState<PlacedItem[]>(() =>
    PRESETS.interior[0].items.map((it) => ({
      uid: uid(),
      type: it.type,
      x: it.x,
      z: it.z,
      rot: it.rot ?? 0,
    })),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [floorMat, setFloorMat] = useState("wood");
  const [wallMat, setWallMat] = useState("plaster");
  const [showWalls, setShowWalls] = useState(true);
  const [showRoof, setShowRoof] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [view, setView] = useState<View>("orbit");

  const size = SIZES[mode];
  const isOutdoor = mode !== "interior";

  const palette = useMemo(
    () => CATALOG.filter((c) => c.category === (isOutdoor ? "outdoor" : "interior")),
    [isOutdoor],
  );

  const selected = items.find((i) => i.uid === selectedId) ?? null;

  const changeMode = (m: Mode) => {
    setMode(m);
    setItems([]);
    setSelectedId(null);
    setFloorMat(m === "interior" ? "wood" : m === "house" ? "concrete" : "grass");
    setWallMat(m === "house" ? "concrete" : "plaster");
    setShowWalls(true);
    setShowRoof(m === "house");
  };

  const addItem = (type: ItemType) => {
    const slot = findSlot(items, size);
    const it: PlacedItem = { uid: uid(), type, ...slot, rot: 0 };
    setItems((prev) => [...prev, it]);
    setSelectedId(it.uid);
  };

  const nudge = (dx: number, dz: number) =>
    setItems((prev) =>
      prev.map((it) =>
        it.uid === selectedId
          ? {
              ...it,
              x: Math.max(-size / 2 + 0.4, Math.min(size / 2 - 0.4, it.x + dx)),
              z: Math.max(-size / 2 + 0.4, Math.min(size / 2 - 0.4, it.z + dz)),
            }
          : it,
      ),
    );

  const rotate = (dir: number) =>
    setItems((prev) =>
      prev.map((it) =>
        it.uid === selectedId ? { ...it, rot: it.rot + (dir * Math.PI) / 8 } : it,
      ),
    );

  const remove = () => {
    setItems((prev) => prev.filter((i) => i.uid !== selectedId));
    setSelectedId(null);
  };

  const loadPreset = (p: { items: PresetItem[] }) => {
    setItems(p.items.map((it) => ({ uid: uid(), type: it.type, x: it.x, z: it.z, rot: it.rot ?? 0 })));
    setSelectedId(null);
  };

  return (
    <section className="relative mt-16 h-[calc(100dvh-4rem)] w-full overflow-hidden bg-concrete-200/60">
      <div className="flex h-full flex-col lg:grid lg:grid-cols-[1fr_minmax(330px,380px)]">
        {/* Canvas */}
        <div className="relative min-h-0 h-[52dvh] lg:h-full">
          <div className="absolute inset-0 surface-concrete" />
          <div className="absolute inset-0">
            <DesignerScene
              mode={mode}
              floorMat={floorMat}
              wallMat={wallMat}
              showWalls={showWalls}
              showRoof={showRoof}
              items={items}
              selectedId={selectedId}
              onSelect={setSelectedId}
              autoRotate={autoRotate}
              view={view}
            />
          </div>

          {/* overlays */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex items-start justify-between">
              <div className="pointer-events-auto bg-concrete-900/85 px-3 py-2 backdrop-blur">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete-400">
                  Режим
                </p>
                <p className="font-display text-sm font-semibold text-concrete-50">
                  {MODES.find((m) => m.key === mode)?.label}
                </p>
              </div>
              <div className="pointer-events-auto flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setView((v) => (v === "orbit" ? "top" : "orbit"))}
                  className="grid h-10 w-10 place-items-center border border-concrete-300 bg-concrete-50/90 font-mono text-xs backdrop-blur transition-colors hover:bg-concrete-100"
                  title="Перемкнути 3D / план"
                >
                  {view === "orbit" ? "2D" : "3D"}
                </button>
                <button
                  type="button"
                  onClick={() => setAutoRotate((v) => !v)}
                  className={cn(
                    "grid h-10 w-10 place-items-center border backdrop-blur",
                    autoRotate
                      ? "border-clay-500 bg-clay-500 text-concrete-50"
                      : "border-concrete-300 bg-concrete-50/90 hover:bg-concrete-100",
                  )}
                  title="Авто-обертання"
                >
                  ↻
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setView("orbit");
                    setAutoRotate(false);
                  }}
                  className="grid h-10 w-10 place-items-center border border-concrete-300 bg-concrete-50/90 backdrop-blur hover:bg-concrete-100"
                  title="Скинути камеру"
                >
                  ⤢
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between gap-3">
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-concrete-600 sm:block">
                Перетягніть — обертання · колесо — масштаб
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete-600 sm:hidden">
                Палець — обертання · 2 пальці — масштаб
              </p>
              <div className="bg-concrete-900/85 px-2.5 py-1 font-mono text-[10px] tracking-wider text-concrete-300 backdrop-blur">
                {items.length} ОБ'ЄКТІВ
              </div>
            </div>
          </div>
        </div>

        {/* Panel */}
        <aside className="flex min-h-0 flex-1 flex-col overflow-y-auto border-t border-concrete-300 bg-concrete-100 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-clay-500">
                Конструктор
              </p>
              <h2 className="font-display text-lg font-bold tracking-tight text-concrete-900">
                Твій проєкт
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setItems([]);
                setSelectedId(null);
              }}
              className="border border-concrete-300 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-concrete-600 hover:border-clay-500 hover:text-clay-600"
            >
              Очистити
            </button>
          </div>

          {/* Mode */}
          <PanelBlock>
            <SectionTitle>Тип проєкту</SectionTitle>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {MODES.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => changeMode(m.key)}
                  className={cn(
                    "flex flex-col items-start gap-1 border p-3 text-left transition-all",
                    mode === m.key
                      ? "border-concrete-900 bg-concrete-900 text-concrete-50"
                      : "border-concrete-300 bg-concrete-50 hover:border-concrete-500",
                  )}
                >
                  <span className="font-display text-sm font-semibold">{m.label}</span>
                  <span
                    className={cn(
                      "font-mono text-[9px] uppercase tracking-wider",
                      mode === m.key ? "text-concrete-400" : "text-concrete-400",
                    )}
                  >
                    {m.sub}
                  </span>
                </button>
              ))}
            </div>
          </PanelBlock>

          {/* Palette */}
          <PanelBlock>
            <SectionTitle>
              {isOutdoor ? "Елементи двору" : "Меблі"}
            </SectionTitle>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {palette.map((d) => (
                <button
                  key={d.type}
                  type="button"
                  onClick={() => addItem(d.type)}
                  className="group flex flex-col items-center gap-1.5 border border-concrete-300 bg-concrete-50 p-2.5 text-center transition-all hover:-translate-y-0.5 hover:border-clay-500 hover:bg-concrete-50"
                >
                  <span className="text-2xl leading-none">{d.icon}</span>
                  <span className="font-display text-[11px] font-medium leading-tight text-concrete-700">
                    {d.name}
                  </span>
                  <span className="font-mono text-[14px] leading-none text-clay-500 opacity-0 transition-opacity group-hover:opacity-100">
                    +
                  </span>
                </button>
              ))}
            </div>
          </PanelBlock>

          {/* Selected editor */}
          {selected && (
            <PanelBlock>
              <div className="flex items-center justify-between">
                <SectionTitle>Обрано</SectionTitle>
                <span className="flex items-center gap-1.5 font-display text-sm font-semibold text-concrete-900">
                  <span className="text-lg">{defOf(selected.type).icon}</span>
                  {defOf(selected.type).name}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <div className="grid grid-cols-3 grid-rows-2 gap-1">
                  <span />
                  <button
                    type="button"
                    onClick={() => nudge(0, -0.5)}
                    className="grid h-9 w-9 place-items-center border border-concrete-300 bg-concrete-50 hover:bg-concrete-200"
                  >
                    ↑
                  </button>
                  <span />
                  <button
                    type="button"
                    onClick={() => nudge(-0.5, 0)}
                    className="grid h-9 w-9 place-items-center border border-concrete-300 bg-concrete-50 hover:bg-concrete-200"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => nudge(0, 0.5)}
                    className="grid h-9 w-9 place-items-center border border-concrete-300 bg-concrete-50 hover:bg-concrete-200"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => nudge(0.5, 0)}
                    className="grid h-9 w-9 place-items-center border border-concrete-300 bg-concrete-50 hover:bg-concrete-200"
                  >
                    →
                  </button>
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => rotate(-1)}
                      className="flex-1 border border-concrete-300 bg-concrete-50 py-2 font-mono text-xs hover:bg-concrete-200"
                    >
                      ⟲
                    </button>
                    <button
                      type="button"
                      onClick={() => rotate(1)}
                      className="flex-1 border border-concrete-300 bg-concrete-50 py-2 font-mono text-xs hover:bg-concrete-200"
                    >
                      ⟳
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={remove}
                    className="border border-clay-500/40 bg-clay-500/10 py-2 font-mono text-[10px] uppercase tracking-wider text-clay-600 hover:bg-clay-500 hover:text-concrete-50"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            </PanelBlock>
          )}

          {/* Presets */}
          <PanelBlock>
            <SectionTitle>Готові композиції</SectionTitle>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRESETS[mode].map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => loadPreset(p)}
                  className="border border-concrete-300 bg-concrete-50 px-3 py-2 font-display text-sm text-concrete-700 transition-colors hover:border-concrete-900 hover:text-concrete-900"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </PanelBlock>

          {/* Materials */}
          <PanelBlock>
            <SectionTitle>Покриття підлоги</SectionTitle>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(isOutdoor ? FLOOR_OUTDOOR : FLOOR_INTERIOR).map((o) => (
                <Chip key={o.key} active={floorMat === o.key} onClick={() => setFloorMat(o.key)}>
                  {o.label}
                </Chip>
              ))}
            </div>
          </PanelBlock>

          {mode !== "landscape" && (
            <PanelBlock>
              <SectionTitle>Стіни</SectionTitle>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {WALL_OPTS.map((o) => (
                  <Chip key={o.key} active={wallMat === o.key} onClick={() => setWallMat(o.key)}>
                    {o.label}
                  </Chip>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <Chip active={showWalls} onClick={() => setShowWalls((v) => !v)}>
                  Стіни {showWalls ? "✓" : "—"}
                </Chip>
                <Chip active={showRoof} onClick={() => setShowRoof((v) => !v)}>
                  Дах {showRoof ? "✓" : "—"}
                </Chip>
              </div>
            </PanelBlock>
          )}

          <div className="mt-auto px-5 py-5">
            <Link
              to="/interiors"
              className="block bg-concrete-900 px-4 py-3 text-center font-display text-sm font-medium text-concrete-50 transition-colors hover:bg-clay-500"
            >
              Потрібно натхнення? → Галерея
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
