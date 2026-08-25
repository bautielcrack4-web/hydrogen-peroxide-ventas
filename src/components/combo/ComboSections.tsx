import Image from "next/image";
import {
  Lock,
  Check,
  Star,
  ShieldCheck,
  Zap,
  ShowerHead,
  Utensils,
  Shirt,
  Sprout,
  PaintRoller,
  WashingMachine,
  AirVent,
  Beaker,
  TriangleAlert,
  Car,
  Wrench,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ReviewsCarousel from "@/components/combo/ReviewsCarousel";
import { checkoutCombo, planes } from "@/config/product";
import {
  comboCapitulos,
  comboAutor,
  comboValueStack,
  comboPago,
} from "@content/combo";
import comboWall from "@content/combo-reviews.json";

const combo = planes.find((p) => p.id === "combo")!;

type Reseña = { texto: string; nombre: string; pais: string; foto: string };
const RESENAS = comboWall as Reseña[];

/** Un icono por capítulo, en el mismo orden que `comboCapitulos.items`. */
const ICONOS_CAPITULO = [
  ShowerHead,   // baño
  Utensils,     // cocina
  Shirt,        // lavado
  Sprout,       // jardín
  PaintRoller,  // pisos, alfombras y vidrios
  WashingMachine, // el reparador
  AirVent,      // aire acondicionado
];

/** Y uno por capítulo bloqueado, en el orden de `bloqueados`. */
const ICONOS_BLOQUEADO = [
  Beaker,        // recetario: las medidas exactas
  TriangleAlert, // qué NUNCA mezclar
  Car,           // auto
  Wrench,        // cañerías y plagas
];

function CtaOro({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={checkoutCombo}
      className="hotmart-fb boton-oro inline-flex items-center justify-center rounded-[10px] px-8 py-4 text-[1.0625rem] font-semibold tracking-[-0.01em]"
    >
      {children}
    </a>
  );
}

const PAGO_ICONS: Record<string, typeof ShieldCheck> = {
  lock: Lock,
  refund: RotateCcw,
  instant: Zap,
  once: BadgeCheck,
};

/**
 * Fila de confianza bajo los CTA: candado, reembolso, entrega y pago único.
 * Son las cuatro objeciones que frenan la compra justo en el botón, así que
 * van SIEMPRE pegadas a él y no en una sección aparte.
 */
export function PagoBadges({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`mx-auto grid max-w-3xl grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 ${
        className || "mt-10"
      }`}
    >
      {comboPago.map((it) => {
        const Icono = PAGO_ICONS[it.icono] ?? ShieldCheck;
        return (
          <li
            key={it.t}
            className="flex flex-col items-center gap-2 px-2 text-center"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03]">
              <Icono
                className="h-[1.05rem] w-[1.05rem] text-crema-200"
                strokeWidth={1.7}
                aria-hidden
              />
            </span>
            <span className="text-[0.8rem] font-semibold leading-tight text-crema-50">
              {it.t}
            </span>
            <span className="-mt-1 text-[0.74rem] leading-tight text-crema-200/70">
              {it.d}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Mirá adentro: capítulos ---------- */
export function ComboCapitulos() {
  return (
    <section className="relative py-24 text-crema-50 sm:py-32">
      <div className="contenedor relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="etiqueta">
              Look inside
            </p>
            <h2 className="display-seccion mt-4">
              {comboCapitulos.titulo}
            </h2>
            <p className="mx-auto mt-5 max-w-prosa text-[1.0625rem] leading-relaxed text-crema-200">
              {comboCapitulos.bajada}
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ol className="mx-auto mt-12 max-w-2xl space-y-2">
            {comboCapitulos.items.map((c, i) => (
              <li
                key={c}
                className="flex items-start gap-4 rounded-xl bg-white/[0.03] px-5 py-4 ring-1 ring-white/[0.07]"
              >
                <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/[0.05] ring-1 ring-white/[0.09]">
                  {(() => {
                    const Icono = ICONOS_CAPITULO[i] ?? Check;
                    return (
                      <Icono
                        className="h-[1.05rem] w-[1.05rem] text-crema-200"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                    );
                  })()}
                </span>
                <span className="text-[0.98rem] text-crema-100">
                  <span className="mr-2 font-serif text-[0.72rem] tabular-nums text-crema-200/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {c}
                </span>
                <Check className="ml-auto mt-1 h-4 w-4 flex-none text-crema-200" aria-hidden />
              </li>
            ))}
            {comboCapitulos.bloqueados.map((c, bi) => (
              <li
                key={c}
                className="flex items-start gap-4 rounded-xl border border-dashed border-white/12 px-5 py-4"
              >
                <span className="relative mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-dashed border-white/[0.14] bg-white/[0.02]">
                  {(() => {
                    const Icono = ICONOS_BLOQUEADO[bi] ?? Lock;
                    return (
                      <Icono
                        className="h-[1.05rem] w-[1.05rem] text-crema-200/65"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                    );
                  })()}
                  <Lock
                    className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-teal-abismo p-[3px] text-oro"
                    aria-hidden
                  />
                </span>
                <span className="text-[0.98rem] italic text-crema-200/70">{c}</span>
                <span className="ml-auto text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-crema-200">
                  Combo
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
        <div className="mt-12 text-center">
          <CtaOro>
            {comboCapitulos.cta} — ${combo.precio}
          </CtaOro>
        </div>
      </div>
    </section>
  );
}

/* ---------- Muro de testimonios (todos los reales, con fotos) ---------- */
export function ComboReviews() {
  return (
    <section className="py-24 text-crema-50 sm:py-32">
      <div className="contenedor">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="etiqueta">
              Real customer reviews
            </p>
            <h2 className="display-seccion mt-4">
              What people who already own it say
            </h2>
            <div className="mt-5 flex items-center justify-center gap-2 text-estrella">
              {[...Array(5)].map((_, s) => (
                <Star key={s} className="h-5 w-5 fill-estrella" aria-hidden />
              ))}
              <span className="ml-1 text-[0.9rem] text-crema-200">
                {RESENAS.length} verified reviews
              </span>
            </div>
          </div>
        </Reveal>

        {/* Carrusel de fotos reales de clientas con la guía */}
        <div className="mt-10">
          <ReviewsCarousel />
        </div>

        <div className="mt-14 text-center">
          <CtaOro>Get the complete method — ${combo.precio}</CtaOro>
        </div>
      </div>
    </section>
  );
}

/* ---------- Autor ---------- */
export function ComboAutor() {
  return (
    <section className="relative py-24 text-crema-50 sm:py-32">
      <div className="contenedor relative">
        <Reveal>
          <div className="mx-auto grid max-w-4xl items-center gap-10 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 sm:p-12 md:grid-cols-[auto,1fr]">
            {/* Retrato */}
            <div className="mx-auto md:mx-0">
              <div className="relative h-44 w-44 overflow-hidden rounded-2xl ring-1 ring-white/12 sm:h-52 sm:w-52">
                <Image
                  src="/img/presentador_raw.png"
                  alt="Mike Dalton"
                  width={440}
                  height={660}
                  sizes="208px"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
            {/* Texto */}
            <div className="text-center md:text-left">
              <p className="etiqueta">
                {comboAutor.titulo}
              </p>
              <h2 className="titulo-serif mt-2 text-[1.75rem]">
                {comboAutor.nombre}
              </h2>
              <p className="text-[0.85rem] uppercase tracking-wide text-crema-200/60">
                {comboAutor.rol}
              </p>
              <div className="mt-4 space-y-3">
                {comboAutor.parrafos.map((p) => (
                  <p key={p} className="text-[1rem] leading-relaxed text-crema-200/85">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-6 font-serif text-lg tracking-display text-crema-50">
                Real tricks, tested at home.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Value stack ---------- */
export function ComboValueStack() {
  return (
    <section className="py-24 text-crema-50 sm:py-32">
      <div className="contenedor">
        <Reveal>
          <h2 className="display-seccion text-center">
            {comboValueStack.titulo}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-crema-50 p-6 text-tinta shadow-libro sm:p-8">
            <ul>
              {comboValueStack.items.map((it) => (
                <li
                  key={it.t}
                  className="flex items-baseline justify-between gap-4 border-b border-dotted border-arena py-3"
                >
                  <span className="flex items-baseline gap-2 text-[0.96rem]">
                    <Check className="h-4 w-4 flex-none translate-y-0.5 text-teal" aria-hidden />
                    {it.t}
                  </span>
                  <span className="whitespace-nowrap font-serif text-tinta/45 line-through">
                    {it.v}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-serif text-lg font-bold text-tinta">
                Total value
              </span>
              <span className="font-serif text-2xl font-bold text-alerta line-through decoration-2">
                {comboValueStack.totalTachado}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-teal/10 px-5 py-4">
              <span className="font-serif text-xl italic text-teal">
                Today you pay
              </span>
              <span className="font-serif text-5xl font-extrabold text-teal">
                {comboValueStack.hoy}
              </span>
            </div>
            <div className="mt-6 text-center">
              <CtaOro>Get the complete method — {comboValueStack.hoy}</CtaOro>
            </div>
          </div>
        </Reveal>
        <PagoBadges />
      </div>
    </section>
  );
}
