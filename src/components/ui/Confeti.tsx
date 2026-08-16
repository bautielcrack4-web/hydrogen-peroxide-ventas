"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

type Parte = {
  id: number;
  left: number;
  dx: string;
  rot: string;
  delay: number;
  dur: number;
  size: number;
  color: string;
  redonda: boolean;
};

const COLORES = ["#cda24a", "#f4e0a1", "#b1832f", "#a8412f"];

/**
 * Ráfaga de monedas/confeti dorado que cae una vez, cuando la sección
 * entra en viewport. El "premio" visual del momento del precio.
 */
export default function Confeti({ cantidad = 34 }: { cantidad?: number }) {
  const [ref, enVista] = useInView<HTMLDivElement>("0px 0px -15% 0px", 0);
  const [partes, setPartes] = useState<Parte[]>([]);

  useEffect(() => {
    if (!enVista) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const arr: Parte[] = Array.from({ length: cantidad }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      dx: `${Math.random() * 180 - 90}px`,
      rot: `${Math.random() * 720 - 360}deg`,
      delay: Math.random() * 0.5,
      dur: 1.2 + Math.random() * 0.9,
      size: 6 + Math.random() * 9,
      color: COLORES[i % COLORES.length],
      redonda: Math.random() > 0.5,
    }));
    setPartes(arr);
    const t = setTimeout(() => setPartes([]), 2800);
    return () => clearTimeout(t);
  }, [enVista, cantidad]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
      aria-hidden
    >
      {partes.map((p) => (
        <span
          key={p.id}
          style={
            {
              position: "absolute",
              left: `${p.left}%`,
              top: 0,
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: p.redonda ? "50%" : "2px",
              boxShadow: "0 0 4px rgba(205,162,74,.5)",
              "--dx": p.dx,
              "--rot": p.rot,
              animation: `caer-moneda ${p.dur}s ease-in ${p.delay}s forwards`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
