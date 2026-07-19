import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Головна", end: true },
  { to: "/designer", label: "3D Дизайнер" },
  { to: "/interiors", label: "Інтер'єр" },
  { to: "/exteriors", label: "Екстер'єр" },
  { to: "/landscapes", label: "Ландшафт" },
  { to: "/guide", label: "Гід" },
];

function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)}>
      <span className="relative grid h-9 w-9 place-items-center">
        <span className="absolute inset-0 rotate-45 bg-concrete-900 transition-transform duration-300 group-hover:rotate-[135deg]" />
        <span className="absolute inset-[7px] rotate-45 bg-clay-500" />
        <span className="absolute inset-[11px] rotate-45 bg-concrete-50" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-tight text-concrete-900">
          BÉTON
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-concrete-500">
          arch.studio
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-concrete-300/70 bg-concrete-100/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "relative px-3 py-2 font-display text-sm font-medium tracking-tight transition-colors",
                  isActive
                    ? "text-concrete-900"
                    : "text-concrete-500 hover:text-concrete-900",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-clay-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/designer"
            className="hidden items-center gap-2 bg-concrete-900 px-4 py-2.5 font-display text-sm font-medium text-concrete-50 transition-colors hover:bg-clay-500 sm:inline-flex"
          >
            Запустити
            <span aria-hidden>→</span>
          </Link>

          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-concrete-300 bg-concrete-50 lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-5 bg-concrete-900 transition-all",
                  open && "top-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 bg-concrete-900 transition-all",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-0.5 w-5 bg-concrete-900 transition-all",
                  open && "top-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={cn(
          "overflow-hidden border-t border-concrete-300/70 bg-concrete-100/95 backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between border-b border-concrete-200 py-3.5 font-display text-lg font-medium tracking-tight",
                  isActive ? "text-clay-600" : "text-concrete-800",
                )
              }
            >
              {l.label}
              <span className="text-concrete-400">↗</span>
            </NavLink>
          ))}
          <Link
            to="/designer"
            onClick={() => setOpen(false)}
            className="mt-3 grid place-items-center bg-concrete-900 px-4 py-3.5 font-display font-medium text-concrete-50"
          >
            Запустити 3D Дизайнер →
          </Link>
        </nav>
      </div>
    </header>
  );
}
