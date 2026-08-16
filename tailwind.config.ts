import type { Config } from "tailwindcss";

/**
 * Identidad "Agua Oxigenada / Trucos" — editorial callejera de alto impacto.
 * NEGRO cinematográfico + BLANCO + acento ROJO (pega con las miniaturas
 * "EXCLUSIVE · HYDROGEN PEROXIDE TRICKS!"). Contraste altísimo, urgencia.
 *
 * NOTA: se conservan los NOMBRES de tokens del andamiaje (teal/oro/crema/…)
 * y solo se cambian sus VALORES, para no reescribir cada componente:
 *   - crema  = blancos / grises muy claros
 *   - tinta  = casi negro (texto sobre claro)
 *   - teal   = familia NEGRO/GRAFITO (fondos oscuros + acento serio en claro)
 *   - oro    = ROJO (el "pop": botones, badges, resaltados)
 *   - bosque = texto sobre botón rojo (blanco)
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        crema: {
          DEFAULT: "#F4F4F3",
          50: "#FFFFFF",
          100: "#EFEEEC",
          200: "#DEDEDB",
        },
        arena: "#CFCFCB",
        tinta: "#131313",
        teal: {
          DEFAULT: "#1F2126", // acento "serio" (casi negro) sobre claro
          dark: "#14151A",
          light: "#ECECEE",
          // Fondos oscuros cinematográficos.
          noche: "#17181C",
          abismo: "#0A0B0D",
        },
        bosque: {
          DEFAULT: "#FFFFFF", // texto sobre el botón rojo
          dark: "#0E0F11",
        },
        oro: {
          DEFAULT: "#E11D0F", // ROJO acento
          claro: "#FF3B2E", // rojo brillante
        },
        vino: "#B0110A",
        // Rojo de urgencia/alertas (descuentos, escasez, ahorro).
        alerta: {
          DEFAULT: "#E5372B",
          claro: "#FF5A47",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-bitter)", "Georgia", "serif"],
      },
      maxWidth: {
        prosa: "66ch",
      },
      boxShadow: {
        suave: "0 14px 44px -20px rgba(0, 0, 0, 0.5)",
        tarjeta: "0 6px 26px -14px rgba(0, 0, 0, 0.4)",
        libro: "0 34px 70px -28px rgba(0, 0, 0, 0.7)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
