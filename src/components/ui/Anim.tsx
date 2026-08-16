"use client";

import { createElement } from "react";
import { useInView } from "./useInView";

type Variante = "up" | "down" | "left" | "right" | "scale" | "blur";

const inicial: Record<Variante, React.CSSProperties> = {
  up: { opacity: 0, transform: "translateY(28px)" },
  down: { opacity: 0, transform: "translateY(-28px)" },
  left: { opacity: 0, transform: "translateX(-34px)" },
  right: { opacity: 0, transform: "translateX(34px)" },
  scale: { opacity: 0, transform: "scale(.9)" },
  blur: { opacity: 0, filter: "blur(10px)", transform: "translateY(16px)" },
};

/**
 * Aparición al entrar en viewport, con variantes y delay para escalonar.
 * Curva con "overshoot" suave para que se sienta con vida, no plano.
 */
export default function Anim({
  children,
  variant = "up",
  delay = 0,
  duration = 700,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  variant?: Variante;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const [ref, enVista] = useInView<HTMLDivElement>();

  const estilo: React.CSSProperties = enVista
    ? {
        opacity: 1,
        transform: "none",
        filter: "none",
        transition: `opacity ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms, filter ${duration}ms ease ${delay}ms`,
      }
    : inicial[variant];

  return createElement(Tag, { ref, className, style: estilo }, children);
}
