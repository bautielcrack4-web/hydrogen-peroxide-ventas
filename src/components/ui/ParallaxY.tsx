"use client";

import { useEffect, useRef } from "react";

/**
 * Parallax vertical suave ligado al scroll: el hijo se mueve a distinta
 * velocidad que el resto → sensación de profundidad. rAF-throttled.
 * Se desactiva con prefers-reduced-motion.
 */
export default function ParallaxY({
  children,
  factor = 0.08,
  max = 60,
  className = "",
}: {
  children: React.ReactNode;
  factor?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // En móvil (touch) NO hacemos parallax de scroll: el scroll nativo queda
    // 100% fluido. El giroscopio y el resto de efectos siguen activos.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const centro = r.top + r.height / 2 - window.innerHeight / 2;
      const off = Math.max(-max, Math.min(max, -centro * factor));
      el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor, max]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
