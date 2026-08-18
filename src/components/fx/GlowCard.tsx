import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card wrapper with a mouse-following "flashlight" glow on border + surface. */
export function GlowCard({
  children,
  className,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--glow", "1");
      }}
      onMouseLeave={() => ref.current?.style.setProperty("--glow", "0")}
      className={cn("glow-card card-surface", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
