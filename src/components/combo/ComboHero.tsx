import { Lock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BookCover3D from "@/components/combo/BookCover3D";
import CountUp from "@/components/ui/CountUp";
import TitularHero from "@/components/combo/TitularHero";
import { checkoutCombo, planes } from "@/config/product";
import { comboHero } from "@content/combo";

/** Cuenta el número inicial de un stat tipo "300+", "7 days". */
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
const hogar = planes.find((p) => p.id === "hogar")!;
const reparador = planes.find((p) => p.id === "reparador")!;

const [tituloAntes, tituloDespues] = comboHero.titulo.split(
  comboHero.tituloAcento
);

/**
 * HERO — cinco elementos y nada más.
 *
 * Titular · una línea · el producto · un botón · la línea de garantía.
 * Todo lo demás (la historia larga, los stats) vive DEBAJO del pliegue:
 * apilar diez cosas antes del primer scroll es lo que hacía que la página
 * se leyera como un embudo y no como un producto.
 */
export default function ComboHero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-14 text-crema-50 sm:pb-28 sm:pt-24">
      <div className="contenedor relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="etiqueta">{comboHero.etiqueta}</p>

          <h1 className="display-hero mx-auto mt-6 max-w-[16ch]">
            <TitularHero
              base={{
                antes: tituloAntes,
                acento: comboHero.tituloAcento,
                despues: tituloDespues,
              }}
            />
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-crema-200 sm:text-[1.15rem]">
            300+ cleaning, garden &amp; repair tricks — with the exact amounts.
            One $1 bottle.
          </p>
        </div>

        {/* El producto. Sin flotar: quieto, con su sombra proyectada. */}
        <div className="mt-14 flex items-end justify-center gap-5 sm:mt-20 sm:gap-12">
          <a
            href={reparador.checkout}
            aria-label="Buy The Repairman's Secret"
            className="hotmart-fb block"
          >
            <BookCover3D
              src={reparador.portada}
              alt="The Repairman's Secret"
              width={132}
              displayWidth="clamp(78px, 23vw, 132px)"
            />
          </a>
          <a
            href={combo.checkout}
            aria-label="Buy the complete method"
            className="hotmart-fb block"
          >
            <BookCover3D
              src={combo.portada}
              alt="The Complete Hydrogen Peroxide Method"
              width={224}
              displayWidth="clamp(126px, 38vw, 224px)"
              priority
            />
          </a>
          <a
            href={hogar.checkout}
            aria-label="Buy Hydrogen Peroxide at Home"
            className="hotmart-fb block"
          >
            <BookCover3D
              src={hogar.portada}
              alt="Hydrogen Peroxide at Home"
              width={132}
              displayWidth="clamp(78px, 23vw, 132px)"
            />
          </a>
        </div>

        {/* Una sola acción. */}
        <div className="mx-auto mt-14 flex max-w-md flex-col items-center sm:mt-16">
          <a
            href={checkoutCombo}
            className="hotmart-fb boton-oro inline-flex w-full items-center justify-center rounded-[10px] px-8 py-4 text-[1.0625rem] font-semibold tracking-[-0.01em]"
          >
            <span>
              {comboHero.cta} — <s className="opacity-45">${combo.precioAnterior}</s>{" "}
              ${combo.precio}
            </span>
          </a>
          <p className="mt-4 flex items-center gap-2 text-[0.82rem] text-crema-200">
            <Lock className="h-3.5 w-3.5 flex-none" strokeWidth={2} aria-hidden />
            Encrypted checkout · instant access · 7-day refund
          </p>
        </div>
      </div>

      {/* ---- Debajo del pliegue: la historia y los datos ---- */}
      <div className="contenedor relative z-10">
        <Reveal>
          <p className="mx-auto mt-24 max-w-prosa text-center text-[1.0625rem] leading-[1.7] text-crema-200 sm:mt-32">
            {comboHero.subtitulo}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-10 text-center sm:grid-cols-4">
            {comboHero.stats.map((st) => (
              <li key={st.etiqueta} className="flex flex-col items-center gap-1.5">
                <span className="font-serif text-[2rem] font-extrabold leading-none tracking-display text-crema-50">
                  <StatValor valor={st.valor} />
                </span>
                <span className="text-[0.78rem] uppercase tracking-[0.12em] text-crema-200">
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
