import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-concrete-500",
        className,
      )}
    >
      <span className="h-px w-6 bg-concrete-400" />
      {children}
    </span>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-clay-500">
      <span className="h-1.5 w-1.5 rotate-45 bg-clay-500" />
      {children}
    </span>
  );
}

export function ConcreteSurface({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "concrete-grain surface-concrete panel-edge",
        className,
      )}
    >
      {children}
    </div>
  );
}
