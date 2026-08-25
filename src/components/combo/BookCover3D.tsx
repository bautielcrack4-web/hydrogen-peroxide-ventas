"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";

type Props = {
  src: string;
  alt: string;
  /** Ancho MOSTRADO de referencia en px (usado para el alto y el `sizes`) */
  width?: number;
  /** Ancho MOSTRADO como CSS (ej. clamp(...) para responsive). Default: `${width}px` */
  displayWidth?: string;
  priority?: boolean;
  /** Conservado por compatibilidad: la flotación perpetua se retiró. */
  flotar?: boolean;
  delay?: number;
  className?: string;
};

const RY_BASE = -13; // rotación base: deja ver el canto sin exagerar
/** Multiplicador de resolución: el archivo fuente es de 1024–2000px, así que
 *  pedimos 3× el tamaño mostrado y la tapa deja de verse borrosa en retina.
 *  Antes se pedía 1× (210px) y en un teléfono DPR3 se veía a un tercio. */
const DPR = 3;

/**
 * Portada como libro: canto de páginas, lomo y sombra proyectada.
 * QUIETO por defecto — solo un giro sutil que sigue al cursor en desktop.
 * (Se retiraron la flotación infinita y el giroscopio: el movimiento
 * perpetuo es lo que hacía leer el hero como una plantilla.)
 */
export default function BookCover3D({
  src,
  alt,
  width = 200,
  displayWidth,
  priority = false,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ rx: 0, ry: RY_BASE });
  const raf = useRef<number | null>(null);
  const height = Math.round(width * 1.5);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() =>
      setRot({ rx: -py * 6, ry: RY_BASE + px * 14 })
    );
  }, []);

  const onLeave = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setRot({ rx: 0, ry: RY_BASE });
  }, []);

  return (
    <div
      className={`escena-3d ${className}`}
      style={{ width: displayWidth ?? width }}
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
        <Image
          src={src}
          alt={alt}
          width={width * DPR}
          height={height * DPR}
          sizes={`${width * DPR}px`}
          quality={88}
          priority={priority}
          className="relative block h-auto w-full rounded-l-[2px] rounded-r-[4px]"
          style={{
            boxShadow:
              // canto de páginas (fino, desaturado) + sombra proyectada real
              "1px 0 0 #d8d5ce, 2px 0 0 #cdc9c1, 3px 0 0 #c2beb5, 4px 0 0 #b7b3a9, 5px 0 0 #aca79d, 18px 26px 44px -16px rgba(0,0,0,.75)",
          }}
        />
        {/* Lomo: banda oscura en el canto izquierdo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[7px] rounded-l-[2px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,.42), rgba(0,0,0,.10) 60%, rgba(255,255,255,.08))",
          }}
        />
      </div>
    </div>
  );
}
