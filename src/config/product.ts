// =============================================================
//  CENTRAL COMMERCIAL CONFIG — Hydrogen Peroxide Tricks
//  Everything you need to change price, checkout or contact
//  lives here (or in env vars: see .env.example)
// =============================================================

const precio = process.env.NEXT_PUBLIC_PRODUCT_PRICE || "47";
const precioAnterior = process.env.NEXT_PUBLIC_ORIGINAL_PRICE || "180";

export const product = {
  marcaSuperior: "HYDROGEN PEROXIDE TRICKS",
  marca: "Hydrogen Peroxide Tricks",
  nombre: "The Complete Hydrogen Peroxide Method",
  subtitulo:
    "All 3 guides together: 300+ cleaning & garden tricks + The Repairman's Secret that saves you hundreds on appliances, AC, car and drains — plus The Master Recipe Book. With the exact amounts.",

  // Price
  moneda: "USD",
  precio,
  precioAnterior,
  mostrarPrecioAnterior: Boolean(precioAnterior),

  // Commercial. Default "#": the Hotmart product/widget (checkoutMode=2)
  // for the ENGLISH channel isn't created yet — override via Vercel env.
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || "#",
  garantiaDias: 7,

  // Contact / support
  soporteEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@peroxidetricks.com",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://hydrogen-peroxide-ventas.vercel.app",

  // Hard product facts (used across sections)
  paginas: 180,
  remedios: 300,
  secciones: 18,

  portada: "/img/portada_combo.jpg",
} as const;

export function precioFormateado(valor: string | number) {
  return `$${valor}`;
}

export const checkoutConfigurado = product.checkoutUrl !== "#";

// =============================================================
//  THE 3 PLANS (two individual guides + complete method)
//  Each checkout overridable via Vercel env. Until the ENGLISH
//  Hotmart products exist, they fall back to "#".
// =============================================================
export const checkoutHogar =
  process.env.NEXT_PUBLIC_CHECKOUT_HOGAR_URL || "#"; // VOL 1 ($27)
export const checkoutReparador =
  process.env.NEXT_PUBLIC_CHECKOUT_REPARADOR_URL || "#"; // VOL 2 ($29)
export const checkoutCombo =
  process.env.NEXT_PUBLIC_CHECKOUT_COMBO_URL || "#"; // Complete Method ($47)

// The Master Recipe Book, sold standalone (optional). No product for now.
export const checkoutRecetario =
  process.env.NEXT_PUBLIC_CHECKOUT_RECETARIO_URL || "#";

export const comboConfigurado = checkoutCombo !== "#";

export const planes = [
  {
    id: "hogar",
    nombre: "Hydrogen Peroxide at Home",
    resumen: "Home, cleaning & garden: 300 tricks with a $1 bottle.",
    precio: "27",
    precioAnterior: "47",
    checkout: checkoutHogar,
    portada: "/img/portada_hogar.jpg",
    destacado: false,
    bullets: [
      "The bathroom trick that gets your toilet and grout white again — no expensive bleach",
      "How to clear mold off walls and the shower — and keep it from coming back",
      "Yellowed whites and sweat stains: the mix that lifts them out",
      "Garden: how to wake up seeds, protect roots and stop plant fungus",
      "300+ uses organized by area: kitchen, bathroom, laundry, floors and patio",
    ],
    cta: "I want this guide",
  },
  {
    id: "reparador",
    nombre: "The Repairman's Secret",
    resumen:
      "What the technician doesn't want you to know: appliances, AC, car, drains and pests.",
    precio: "29",
    precioAnterior: "59",
    checkout: checkoutReparador,
    portada: "/img/portada_reparador.jpg",
    destacado: false,
    bullets: [
      "The step that revives a smelly washing machine without a service call (skip the visit)",
      "AC: how to clean the coil so it cools like the first day",
      "Drains & clogs: the reaction that loosens what the drain cleaner can't",
      "Car: engine, upholstery and cloudy headlights — tricks the shop charges a fortune for",
      "Pests: how to cut them off at the source without poison, room by room",
    ],
    cta: "I want this guide",
  },
  {
    id: "combo",
    nombre: "The Complete Method",
    resumen:
      "All 3 guides together + The Master Recipe Book and every bonus, for less than buying them apart.",
    precio: "47",
    precioAnterior: "180",
    checkout: checkoutCombo,
    portada: "/img/portada_combo.jpg",
    destacado: true,
    etiquetaDestacado: "★ Most popular · Best value",
    ahorro: "Save $133 · the whole method for less than you'd think",
    // Flagship EXCLUSIVE guide: the exact amounts + safety.
    guiaExclusiva: {
      nombre: "The Master Recipe Book",
      subtitulo: "The EXACT amounts and dilutions for every trick",
      valor: "$29",
      detalle:
        "Combo-only. The exact measure for every use + the “never mix” chart. It's what makes it work (and keeps it safe).",
    },
    // Full guides included in the pack.
    incluidos: [
      { titulo: "Hydrogen Peroxide at Home — full guide", valor: "$27" },
      { titulo: "The Repairman's Secret — full guide", valor: "$29" },
    ],
    // Extra bonuses that raise perceived value.
    bonos: [
      { titulo: "Printable Dilution Chart (tape it inside your cabinet)", valor: "$19" },
      { titulo: "7-Day Challenge: a spotless home for $1 a day (calendar)", valor: "$17" },
      { titulo: "The Other 3 $1 Heroes that multiply the effect (baking soda, vinegar, salt)", valor: "$19" },
      { titulo: "Safety Guide: what to NEVER mix and how to store it right", valor: "$15" },
      { titulo: "Lifetime updates (new tricks, free)", valor: "$20" },
    ],
    cta: "I want the complete method",
  },
] as const;
