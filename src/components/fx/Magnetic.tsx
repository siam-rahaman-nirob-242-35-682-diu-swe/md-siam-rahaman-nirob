import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  strength?: number;
};

/** Button/link that gently pulls toward the cursor when it comes close. */
export function Magnetic({ children, className, strength = 0.35, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  const Tag = (rest.href ? "a" : "button") as "a";

  return (
    <Tag
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className={`magnetic ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
