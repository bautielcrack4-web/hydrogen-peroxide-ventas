"use client";

import { ArrowRight, Check, Star, Lock, Flame } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BookCover3D from "@/components/combo/BookCover3D";
import Sparkles from "@/components/combo/Sparkles";
import Chispas from "@/components/ui/Chispas";
import CheckoutLink from "@/components/ui/CheckoutLink";
import { usePerfil } from "@/components/ui/usePerfil";
import { planes, comboConfigurado } from "@/config/product";
import { comboEleccion } from "@content/combo";

/**
 * Encabezado de la sección de precios, personalizado según lo que el
 * usuario respondió en el onboarding (objetivo + nombre). Sin perfil,
 * devuelve el texto genérico de content/combo.ts.
 */
function textosEleccion(perfil: { nombre?: string; obj?: string } | null) {
  const n = perfil?.nombre?.trim();
  if (!perfil?.obj) return comboEleccion;

  if (perfil.obj === "hogar")
    return {
      etiqueta: n ? `${n}, your home plan` : "Your plan for the home and garden",
      titulo:
        "Start with “Hydrogen Peroxide at Home”… or grab everything for almost the same price.",
      bajada:
        "With the home guide you'll already get your bathroom, laundry and garden spotless. But the Complete Method adds “The Repairman's Secret,” The Master Recipe Book and every bonus — for less than the two guides bought separately. 8 out of 10 people take the full method.",
    };

  if (perfil.obj === "reparador")
    return {
      etiqueta: n ? `${n}, your money-saving plan` : "Your plan to stop overpaying",
      titulo:
        "Start with “The Repairman's Secret”… or take the whole method.",
      bajada:
        "With the repairman's guide you stop calling a technician for things you can fix yourself. The Complete Method adds “Hydrogen Peroxide at Home,” The Master Recipe Book and the bonuses — for less than the two bought separately. Almost everyone ends up choosing the combo.",
    };

  // both
  return {
    etiqueta: n ? `${n}, you want it all` : "You want to handle the whole house",
    titulo:
      "Home, garden and repairs, all together: the Complete Method is exactly what you were looking for.",
    bajada:
      "Buying the two guides separately costs more. Together — plus The Master Recipe Book with the exact amounts and every bonus — they come out to less than the two on their own. It's what 8 out of 10 people choose.",
  };
}

/**
 * "Elegí tu nivel" — las dos guías individuales + el combo al centro.
 * Estilo líder de industria: bundle destacado, anclaje agresivo,
 * la 3ª guía exclusiva bajo llave y escasez suave.
 */
export default function ComboPricing({ id = "planes" }: { id?: string }) {
  // Orden visual: individual · COMBO (centro) · individual
  const orden = ["hogar", "combo", "reparador"];
  const cards = orden
    .map((k) => planes.find((p) => p.id === k))
    .filter(Boolean) as (typeof planes)[number][];

  // Personalización: resaltar la guía individual del objetivo del usuario.
  const perfil = usePerfil();
  const recoId =
    perfil?.obj === "hogar"
      ? "hogar"
      : perfil?.obj === "reparador"
        ? "reparador"
        : null;
  const txt = textosEleccion(perfil);

  return (
    <section
      id={id}
      className="relative overflow-hidden py-16 text-crema-50 sm:py-24"
    >
      <Sparkles />
      <div className="contenedor relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-oro-claro">
              {txt.etiqueta}
            </p>
            <h2 className="titulo-serif mt-3 text-[2rem] text-crema-50 sm:text-[2.6rem]">
              {txt.titulo}
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-crema-200/80">
              {txt.bajada}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl items-start gap-6 lg:grid-cols-3">
          {cards.map((plan, i) => (
            // En móvil el combo va PRIMERO (order-first); en desktop vuelve al centro.
            <div
              key={plan.id}
              className={plan.destacado ? "order-first lg:order-none" : ""}
            >
              <Reveal delay={i * 80}>
                <PlanCard plan={plan} recomendado={plan.id === recoId} />
              </Reveal>
            </div>
          ))}
        </div>

        {process.env.NODE_ENV === "development" && !comboConfigurado && (
          <p className="mx-auto mt-6 max-w-xl text-center text-[0.8rem] text-crema-200/45">
            (Internal note: the combo button points to “#”. You still need to
            create the product in Hotmart and load its link into NEXT_PUBLIC_CHECKOUT_COMBO_URL.)
          </p>
        )}
      </div>
    </section>
  );
}

type Plan = (typeof planes)[number];

function ahorroEnDolares(plan: Plan) {
  const a = Number(plan.precioAnterior) - Number(plan.precio);
  return Number.isFinite(a) && a > 0 ? a : null;
}

function PlanCard({
  plan,
  recomendado,
}: {
  plan: Plan;
  recomendado?: boolean;
}) {
  const destacado = plan.destacado;
  const ahorro = ahorroEnDolares(plan);

  const inner = (
    <div
      className={`relative flex h-full flex-col rounded-2xl p-6 sm:p-7 ${
        destacado
          ? "bg-crema-50 text-tinta shadow-libro lg:pb-9"
          : recomendado
            ? "bg-[#23242B] text-crema-50 ring-2 ring-oro-claro shadow-libro"
            : "bg-[#23242B] text-crema-50 ring-1 ring-white/10 shadow-libro"
      }`}
    >
      {destacado && <Chispas />}
      {recomendado && !destacado && (
        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-oro px-3 py-1 text-[0.64rem] font-bold uppercase tracking-wide text-bosque shadow-tarjeta">
          ★ For your goal
        </span>
      )}
      {/* Badge de ahorro en la esquina (estilo "$X OFF") */}
      {ahorro && (
        <span className="absolute right-4 top-4 rounded-md bg-alerta px-2.5 py-1 text-[0.72rem] font-bold text-crema-50 shadow-tarjeta">
          ${ahorro} OFF
        </span>
      )}

      {destacado && "etiquetaDestacado" in plan && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-oro px-4 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-bosque shadow-tarjeta">
          {plan.etiquetaDestacado}
        </span>
      )}

      {/* Portada como libro 3D (gira al pasar el cursor) */}
      <div className="flex items-end justify-center pt-2">
        <BookCover3D
          src={plan.portada}
          alt={plan.nombre}
          width={destacado ? 150 : 120}
          flotar={false}
        />
      </div>

      <h3
        className={`mt-5 text-center font-serif text-2xl font-extrabold ${
          destacado ? "text-teal" : "text-crema-50"
        }`}
      >
        {plan.nombre}
      </h3>
      <p
        className={`mx-auto mt-2 max-w-[22rem] text-center text-[0.95rem] italic leading-snug ${
          destacado ? "text-tinta/65" : "text-crema-200/70"
        }`}
      >
        {plan.resumen}
      </p>

      {/* Precio */}
      <div className="mt-5 text-center">
        <span
          className={`mr-2 align-middle font-serif text-lg line-through ${
            destacado ? "text-alerta/70" : "text-crema-200/40"
          }`}
        >
          USD {plan.precioAnterior}
        </span>
        <span
          className={`align-middle font-serif text-5xl font-extrabold ${
            destacado ? "text-teal" : "text-crema-50"
          }`}
        >
          USD {plan.precio}
        </span>
        {"ahorro" in plan && plan.ahorro && (
          <p className="mt-1.5 text-[0.85rem] font-bold text-alerta">
            {plan.ahorro}
          </p>
        )}
      </div>

      {/* Gancho estrella: la 3ª guía exclusiva bajo llave */}
      {"guiaExclusiva" in plan && plan.guiaExclusiva && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-oro/40 bg-oro-claro/15 p-4">
          <Lock className="mt-0.5 h-5 w-5 flex-none text-oro" aria-hidden />
          <div>
            <p className="text-[0.95rem] font-bold text-tinta">
              {plan.guiaExclusiva.nombre}{" "}
              <span className="font-serif text-tinta/40 line-through">
                {plan.guiaExclusiva.valor}
              </span>
            </p>
            {"subtitulo" in plan.guiaExclusiva && (
              <p className="text-[0.82rem] font-semibold italic text-teal">
                {plan.guiaExclusiva.subtitulo}
              </p>
            )}
            <p className="mt-1 text-[0.82rem] leading-snug text-tinta/65">
              {plan.guiaExclusiva.detalle}
            </p>
          </div>
        </div>
      )}

      {/* Las 2 guías que incluye */}
      {"incluidos" in plan && plan.incluidos && (
        <div className="mt-4 rounded-xl bg-crema-100 p-4">
          <p className="text-[0.72rem] font-bold uppercase tracking-wide text-teal">
            Includes both full guides
          </p>
          <ul className="mt-2 space-y-1.5">
            {plan.incluidos.map((b) => (
              <li
                key={b.titulo}
                className="flex items-baseline justify-between gap-3 text-[0.85rem] text-tinta/80"
              >
                <span className="flex items-baseline gap-1.5">
                  <Check className="h-3.5 w-3.5 flex-none translate-y-0.5 text-teal" aria-hidden />
                  {b.titulo}
                </span>
                <span className="whitespace-nowrap font-semibold text-tinta/45 line-through">
                  {b.valor}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bonos extra que suben la percepción de valor */}
      {"bonos" in plan && plan.bonos && (
        <div className="mt-3 rounded-xl border border-oro/25 bg-crema-100 p-4">
          <p className="text-[0.72rem] font-bold uppercase tracking-wide text-oro">
            + Combo-only bonuses
          </p>
          <ul className="mt-2 space-y-1.5">
            {plan.bonos.map((b) => (
              <li
                key={b.titulo}
                className="flex items-baseline justify-between gap-3 text-[0.85rem] text-tinta/80"
              >
                <span className="flex items-baseline gap-1.5">
                  <Star className="h-3.5 w-3.5 flex-none translate-y-0.5 fill-oro text-oro" aria-hidden />
                  {b.titulo}
                </span>
                <span className="whitespace-nowrap font-semibold text-tinta/45 line-through">
                  {b.valor}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bullets (guías individuales) */}
      {!("bonos" in plan) && (
        <ul className="mt-5 space-y-2.5">
          {plan.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-[0.92rem]">
              <Check className="mt-0.5 h-4 w-4 flex-none text-oro-claro" aria-hidden />
              <span className="text-crema-200/85">{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Prueba social + escasez solo en el combo */}
      {destacado && (
        <div className="mt-5 space-y-3">
          <div>
            <div className="mb-1 flex items-center justify-between text-[0.74rem] font-bold text-tinta/70">
              <span>8 out of 10 choose the complete method</span>
              <span className="text-teal">80%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-tinta/[0.08]">
              <div className="h-full w-[80%] rounded-full bg-[linear-gradient(90deg,#C41306,#FF3B2E)]" />
            </div>
          </div>
          <div className="rounded-lg bg-alerta/10 px-4 py-2.5 text-center text-[0.82rem] font-semibold text-alerta">
            <Flame className="mr-1.5 inline h-4 w-4" aria-hidden />
            Only {comboEleccion.copiasRestantes} left at the launch price
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto pt-6">
        <CheckoutLink
          href={plan.checkout}
          className={`barrido group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-4 text-center text-[1.05rem] font-bold leading-tight transition-all duration-200 active:scale-[.98] ${
            destacado
              ? "boton-oro text-bosque shadow-libro hover:-translate-y-0.5"
              : "bg-teal text-crema-50 shadow-suave hover:bg-teal-dark hover:-translate-y-0.5"
          }`}
        >
          <span>
            {plan.cta} · ${plan.precio}
          </span>
          <ArrowRight
            className="h-5 w-5 flex-none transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </CheckoutLink>
        <p
          className={`mt-3 text-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${
            destacado ? "text-tinta/50" : "text-crema-200/50"
          }`}
        >
          One-time payment · instant access · 7-day guarantee
        </p>
      </div>
    </div>
  );

  return destacado ? (
    <div className="card-legendaria h-full lg:-mt-6">{inner}</div>
  ) : (
    inner
  );
}
