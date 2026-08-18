import { useEffect, useState } from "react";

/** Thin reading-progress bar pinned under the header. Purely decorative. */
export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-50 h-px bg-transparent" aria-hidden>
      <div
        className="h-px transition-[width] duration-150 ease-out"
        style={{ width: `${p}%`, background: "var(--gradient-signal)" }}
      />
    </div>
  );
}

/** Vertical section rail (desktop only) showing where you are in the page. */
export function SectionRail({
  items,
  active,
  onJump,
}: {
  items: { id: string; label: string }[];
  active: string;
  onJump: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Section progress"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
    >
      {items.map((i) => (
        <button
          key={i.id}
          onClick={() => onJump(i.id)}
          className="group flex items-center gap-3"
          aria-label={`Jump to ${i.label}`}
          aria-current={active === i.id ? "true" : undefined}
        >
          <span
            className={`h-px transition-all duration-300 ${
              active === i.id ? "w-8 bg-primary" : "w-4 bg-border group-hover:w-6 group-hover:bg-primary/60"
            }`}
          />
          <span
            className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
              active === i.id ? "text-primary" : "text-muted-foreground/50 group-hover:text-muted-foreground"
            }`}
          >
            {i.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
