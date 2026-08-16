import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BookCover3D from "@/components/combo/BookCover3D";
import Sparkles from "@/components/combo/Sparkles";
import AuroraFondo from "@/components/ui/AuroraFondo";
import CountUp from "@/components/ui/CountUp";
import TitularHero from "@/components/combo/TitularHero";
import CtaLabel from "@/components/ui/CtaLabel";
import { checkoutCombo, planes } from "@/config/product";
import { comboHero } from "@content/combo";

/** Cuenta el número inicial de un stat tipo "190+", "5.000+", "7 días". */
function StatValor({ valor }: { valor: string }) {
  const m = valor.match(/^([\d.]+)/);
  if (!m) return <>{valor}</>;
  const n = parseInt(m[1].replace(/\./g, ""), 10);
  return (
    <>
      <CountUp value={n} />
      {valor.slice(m[1].length)}
    </>
  );
}

const combo = planes.find((p) => p.id === "combo")!;
const piel = planes.find((p) => p.id === "hogar")!;
const salud = planes.find((p) => p.id === "reparador")!;

// Parte el título para resaltar el acento en dorado cursivo (toque premium).
const [tituloAntes, tituloDespues] = comboHero.titulo.split(
  comboHero.tituloAcento
);

export default function ComboHero() {
  return (
    <section
      className="grade-joya relative overflow-hidden py-8 text-crema-50 sm:py-24"
      style={{
        background:
          "radial-gradient(125% 85% at 30% 0%, #1A1B20 0%, #121317 45%, #0A0B0D 100%)",
      }}
    >
      <AuroraFondo intensidad={0.6} />
      {/* Halo de luz cálido detrás de los libros: da vida y profundidad */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="anim-flotar-lento absolute left-1/2 top-[46%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[2px] sm:h-[34rem] sm:w-[34rem]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,59,46,.30) 0%, rgba(130,20,11,.14) 42%, transparent 70%)",
          }}
        />
      </div>
      {/* Chispitas doradas suaves */}
      <Sparkles />

      <div className="contenedor relative z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-oro-claro sm:text-[0.78rem] sm:tracking-[0.22em]">
              {comboHero.etiqueta}
            </p>
            <h1 className="titulo-serif mx-auto mt-3 max-w-2xl text-[1.75rem] leading-[1.12] text-crema-50 sm:mt-4 sm:text-[3rem]">
              <TitularHero
                base={{
                  antes: tituloAntes,
                  acento: comboHero.tituloAcento,
                  despues: tituloDespues,
                }}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-crema-200/85 sm:mt-5 sm:max-w-2xl sm:text-[1.1rem]">
              {comboHero.subtitulo}
            </p>
          </div>
        </Reveal>

        {/* Los tres libros flotando en 3D: combo grande al centro */}
        <Reveal delay={120}>
          <div className="mt-6 flex items-end justify-center gap-4 sm:mt-14 sm:gap-10">
            <a
              href={salud.checkout}
              aria-label="Buy The Repairman's Secret"
              className="hotmart-fb block cursor-pointer"
            >
              <BookCover3D
                src={salud.portada}
                alt="The Repairman's Secret"
                width={128}
                displayWidth="clamp(76px, 23vw, 128px)"
                delay={0}
              />
            </a>
            <div className="relative">
              <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-oro px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-bosque shadow-tarjeta">
                The complete method
              </span>
              <a
                href={combo.checkout}
                aria-label="Buy the complete method"
                className="hotmart-fb block cursor-pointer"
              >
                <BookCover3D
                  src={combo.portada}
                  alt="The Complete Hydrogen Peroxide Method"
                  width={210}
                  displayWidth="clamp(118px, 37vw, 210px)"
                  priority
                  delay={600}
                />
              </a>
            </div>
            <a
              href={piel.checkout}
              aria-label="Buy Hydrogen Peroxide at Home"
              className="hotmart-fb block cursor-pointer"
            >
              <BookCover3D
                src={piel.portada}
                alt="Hydrogen Peroxide at Home"
                width={128}
                displayWidth="clamp(76px, 23vw, 128px)"
                delay={1200}
              />
            </a>
          </div>
        </Reveal>

        {/* CTA principal al combo (arriba de los stats: se ve antes en móvil) */}
        <Reveal delay={180}>
          <div className="mx-auto mt-7 flex max-w-md flex-col items-center">
            <div className="mb-3 flex items-center gap-1 text-oro-claro">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-oro-claro" aria-hidden />
              ))}
            </div>
            <a
              href={checkoutCombo}
              className="hotmart-fb boton-oro group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-4 text-lg font-bold text-bosque shadow-libro hover:-translate-y-0.5 active:scale-[.98]"
            >
              <span>
                <CtaLabel base={comboHero.cta} /> —{" "}
                <s className="opacity-50">${combo.precioAnterior}</s> $
                {combo.precio}
              </span>
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <p className="mt-3 flex items-center gap-1.5 text-[0.82rem] text-crema-200/70">
              <ShieldCheck className="h-4 w-4 text-oro-claro" aria-hidden />
              One-time payment · instant access · 7-day guarantee
            </p>
            <p className="mt-4 max-w-sm text-center font-serif text-[1.02rem] italic text-oro-claro">
              {comboHero.anclaValor}
            </p>
          </div>
        </Reveal>

        {/* Stats (debajo del CTA) */}
        <Reveal delay={240}>
          <ul className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-2.5 text-center sm:mt-10 sm:flex sm:max-w-2xl sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3">
            {comboHero.stats.map((st) => (
              <li
                key={st.etiqueta}
                className="neo neo-press flex flex-col items-center justify-center rounded-xl px-2 py-3 sm:bg-transparent sm:p-0 sm:shadow-none"
              >
                <span className="font-serif text-2xl font-extrabold text-oro-claro">
                  <StatValor valor={st.valor} />
                </span>
                <span className="text-[0.72rem] text-crema-200/70 sm:text-[0.78rem]">
                  {st.etiqueta}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
