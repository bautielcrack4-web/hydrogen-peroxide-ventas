"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

/**
 * Cuenta un número desde `from` hasta `value` cuando entra en viewport.
 * Con easing de desaceleración. Respeta reduced-motion (salta al valor).
 */
export default function CountUp({
  value,
  from = 0,
  duration = 1400,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [ref, enVista] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(from);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!enVista) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(Math.round(from + (value - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [enVista, value, from, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toLocaleString("es")}
      {suffix}
    </span>
  );
}
