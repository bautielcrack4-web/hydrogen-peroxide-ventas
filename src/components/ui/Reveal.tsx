"use client";

import { useEffect, useRef, useState } from "react";

type Estado = "idle" | "hidden" | "shown";

/**
 * Aparición sutil (fade + slide) al entrar en viewport.
 * Por defecto el contenido está VISIBLE (SSR / sin JS): el hero nunca
 * aparece en blanco. Solo se animan los bloques bajo el pliegue.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<Estado>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // ya visible: no animar

    setEstado("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setEstado("shown");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: React.CSSProperties =
    estado === "hidden"
      ? { opacity: 0, transform: "translateY(18px)" }
      : estado === "shown"
        ? {
            opacity: 1,
            transform: "translateY(0)",
            transition: `opacity .7s ease-out ${delay}ms, transform .7s ease-out ${delay}ms`,
          }
        : {};

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
