import type { Config } from "tailwindcss";

/**
 * Identidad "Agua Oxigenada / Trucos" — EDITORIAL OSCURO PREMIUM.
 *
 * Regla de oro del rediseño: UN SOLO color saturado en toda la página.
 * El rojo existe para el botón de compra y nada más. Todo el resto es una
 * escala neutra fría (casi negro → blanco) con un blanco cálido para los
 * micro-acentos. El contraste se gana con TIPOGRAFÍA y AIRE, no con brillo.
 *
 * NOTA: se conservan los NOMBRES de tokens del andamiaje (teal/oro/crema/…)
 * y solo se cambian sus VALORES, para no reescribir cada componente:
 *   - crema      = blancos / grises claros (texto sobre oscuro)
 *   - tinta      = casi negro (texto sobre claro)
 *   - teal       = familia de SUPERFICIES oscuras
 *   - oro        = ROJO de acción (SOLO botones y badges de compra)
 *   - oro.claro  = blanco cálido de micro-acento (iconos, estrellas, reglas)
 *   - bosque     = texto sobre el botón rojo (blanco)
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        crema: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#F1F2F4", // superficie clara secundaria
          200: "#A9ADB5", // texto secundario sobre oscuro
        },
        arena: "#2A2D33", // bordes sobre oscuro
        tinta: "#0F1012", // texto sobre claro
        teal: {
          DEFAULT: "#16181C", // superficie oscura elevada
          dark: "#101114",
          light: "#F1F2F4",
          noche: "#141519",
          abismo: "#0B0C0E", // base del lienzo
        },
        bosque: {
          DEFAULT: "#FFFFFF", // texto sobre el botón rojo
          dark: "#0B0C0E",
        },
        oro: {
          DEFAULT: "#D0342A", // ROJO de acción — el ÚNICO color saturado
          claro: "#D9D5CE", // blanco cálido: micro-acentos e iconos
        },
        vino: "#A0231B",
        // EXCEPCION deliberada a la regla de "un solo color saturado":
        // las estrellas de rating en gris se leen como "sin puntuar", que es
        // peor que un segundo acento. El oro se usa SOLO en estrellas.
        estrella: "#F2A72C",
        // Rojo de urgencia/alertas (descuentos, ahorro). Misma familia: no
        // se abren dos rojos distintos.
        alerta: {
          DEFAULT: "#D0342A",
          claro: "#E05A4E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-bitter)", "Georgia", "serif"],
      },
      maxWidth: {
        prosa: "62ch",
      },
      // Sombras de ELEVACIÓN real (luz cenital), no halos de neón.
      boxShadow: {
        suave: "0 1px 2px rgba(0,0,0,.45), 0 8px 24px -16px rgba(0,0,0,.7)",
        tarjeta: "0 1px 2px rgba(0,0,0,.4), 0 12px 32px -20px rgba(0,0,0,.65)",
        libro: "0 2px 4px rgba(0,0,0,.45), 0 32px 64px -32px rgba(0,0,0,.8)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      letterSpacing: {
        display: "-0.035em",
      },
    },
  },
  plugins: [],
};

export default config;
