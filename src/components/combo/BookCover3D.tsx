"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

type Props = {
  src: string;
  alt: string;
  /** Ancho intrínseco de la imagen en px (calidad) */
  width?: number;
  /** Ancho MOSTRADO como CSS (ej. clamp(...) para responsive). Default: `${width}px` */
  displayWidth?: string;
  priority?: boolean;
  flotar?: boolean;
  /** ms de desfase para que no floten todas iguales */
  delay?: number;
  className?: string;
};

const RY_BASE = -17; // rotación base: deja ver el canto del libro

/**
 * Portada como LIBRO 3D: lomo, grosor de páginas, sombra proyectada,
 * flotación suave y giro que sigue al cursor (parallax al deslizar).
 */
export default function BookCover3D({
  src,
  alt,
  width = 200,
  displayWidth,
  priority = false,
  flotar = true,
  delay = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ rx: 0, ry: RY_BASE });
  const raf = useRef<number | null>(null);
  const height = Math.round(width * 1.333);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() =>
      setRot({ rx: -py * 12, ry: RY_BASE + px * 26 })
    );
  }, []);

  const onLeave = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setRot({ rx: 0, ry: RY_BASE });
  }, []);

  // En móvil: el libro se inclina siguiendo el giroscopio del teléfono.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onOrient = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 0;
      setRot({
        rx: Math.max(-10, Math.min(10, (beta - 45) / 5)),
        ry: RY_BASE + Math.max(-20, Math.min(20, gamma / 3)),
      });
    };
    window.addEventListener("deviceorientation", onOrient, true);
    return () => window.removeEventListener("deviceorientation", onOrient, true);
  }, []);

  return (
    <div className={`escena-3d ${className}`} style={{ width: displayWidth ?? width }}>
      <div
        className={flotar ? "anim-flotar" : undefined}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative transition-transform duration-500 ease-out will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`,
          }}
        >
          {/* Tapa con grosor de páginas (box-shadow escalonado a la derecha)
              y sombra proyectada abajo. */}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={`${width}px`}
            priority={priority}
            className="saturar relative block h-auto w-full rounded-l-[3px] rounded-r-md"
            style={{
              boxShadow:
                "2px 0 0 #efe7d3, 4px 0 0 #e9e0c9, 6px 0 0 #e2d8bd, 8px 0 0 #dbd0b0, 10px 0 0 #d3c7a3, 24px 30px 50px -12px rgba(4,20,18,.55)",
            }}
          />
          {/* Lomo: banda oscura en el canto izquierdo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[9px] rounded-l-[3px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,.38), rgba(0,0,0,.10) 55%, rgba(255,255,255,.14))",
            }}
          />
          {/* Brillo diagonal sutil sobre la tapa */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-l-[3px] rounded-r-md"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,0) 32%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
