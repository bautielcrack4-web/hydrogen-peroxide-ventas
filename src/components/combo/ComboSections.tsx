import Image from "next/image";
import { Lock, Check, Star, ShieldCheck, Zap, FileText, Infinity as InfinityIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Sparkles from "@/components/combo/Sparkles";
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

function CtaOro({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={checkoutCombo}
      className="hotmart-fb boton-oro group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-lg font-bold text-bosque shadow-libro transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98]"
    >
      {children}
    </a>
  );
}

const PAGO_ICONS = [ShieldCheck, Zap, FileText, InfinityIcon];

export function PagoBadges() {
  return (
    <ul className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
      {comboPago.map((t, i) => {
        const Icono = PAGO_ICONS[i] ?? ShieldCheck;
        return (
          <li key={t} className="flex flex-col items-center gap-1.5 text-center">
            <Icono className="h-5 w-5 text-oro-claro" aria-hidden />
            <span className="text-[0.78rem] font-semibold leading-tight text-crema-200/75">
              {t}
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
    <section className="relative overflow-hidden py-16 text-crema-50 sm:py-20">
      <Sparkles />
      <div className="contenedor relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-oro-claro">
              Look inside
            </p>
            <h2 className="titulo-serif mt-3 text-[1.9rem] text-crema-50 sm:text-[2.4rem]">
              {comboCapitulos.titulo}
            </h2>
            <p className="mt-3 text-[1.02rem] text-crema-200/80">
              {comboCapitulos.bajada}
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ol className="mx-auto mt-8 max-w-2xl space-y-2.5">
            {comboCapitulos.items.map((c, i) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-xl bg-crema-50/[0.05] px-4 py-3 ring-1 ring-crema-50/10"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal text-[0.72rem] font-bold text-crema-50">
                  {i + 1}
                </span>
                <span className="text-[0.98rem] text-crema-100">{c}</span>
                <Check className="ml-auto mt-1 h-4 w-4 flex-none text-oro-claro" aria-hidden />
              </li>
            ))}
            {comboCapitulos.bloqueados.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-xl border border-dashed border-oro/30 bg-oro-claro/5 px-4 py-3"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-oro/20">
                  <Lock className="h-3.5 w-3.5 text-oro-claro" aria-hidden />
                </span>
                <span className="text-[0.98rem] italic text-crema-200/70">{c}</span>
                <span className="ml-auto text-[0.68rem] font-bold uppercase tracking-wide text-oro-claro">
                  Combo
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
        <div className="mt-8 text-center">
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
    <section className="py-16 text-crema-50 sm:py-20">
      <div className="contenedor">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-oro-claro">
              Real customer reviews
            </p>
            <h2 className="titulo-serif mt-3 text-[1.9rem] text-crema-50 sm:text-[2.4rem]">
              What people who already own it say
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2 text-oro-claro">
              {[...Array(5)].map((_, s) => (
                <Star key={s} className="h-5 w-5 fill-oro-claro" aria-hidden />
              ))}
              <span className="ml-1 text-[0.9rem] text-crema-200/75">
                {RESENAS.length}+ people · verified purchase
              </span>
            </div>
          </div>
        </Reveal>

        {/* Carrusel de fotos reales de clientas con la guía */}
        <div className="mt-10">
          <ReviewsCarousel />
        </div>

        <div className="mt-10 text-center">
          <CtaOro>I want the complete method — ${combo.precio}</CtaOro>
        </div>
      </div>
    </section>
  );
}

/* ---------- Autor ---------- */
export function ComboAutor() {
  return (
    <section className="relative overflow-hidden py-16 text-crema-50 sm:py-20">
      <Sparkles />
      <div className="contenedor relative">
        <Reveal>
          <div className="mx-auto grid max-w-4xl items-center gap-8 rounded-2xl border border-oro/20 bg-crema-50/[0.05] p-7 sm:p-10 md:grid-cols-[auto,1fr]">
            {/* Retrato */}
            <div className="mx-auto md:mx-0">
              <div className="relative h-44 w-44 overflow-hidden rounded-2xl shadow-libro ring-1 ring-oro/40 sm:h-52 sm:w-52">
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
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-oro-claro">
                {comboAutor.titulo}
              </p>
              <h2 className="titulo-serif mt-2 text-[1.8rem] text-crema-50">
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
              <p className="mt-4 font-serif text-xl text-oro-claro">
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
    <section className="py-16 text-crema-50 sm:py-20">
      <div className="contenedor">
        <Reveal>
          <h2 className="titulo-serif text-center text-[1.9rem] text-crema-50 sm:text-[2.4rem]">
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
              <CtaOro>I want the complete method — {comboValueStack.hoy}</CtaOro>
            </div>
          </div>
        </Reveal>
        <PagoBadges />
      </div>
    </section>
  );
}
