import Image from "next/image";
import { Check, Play } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Estrellas from "@/components/ui/Estrellas";
import PriceCard from "./PriceCard";
import { hero } from "@content/landing";
import { product } from "@/config/product";
import resenas from "@content/reviews.json";

export default function Hero() {
  const [antes, despues] = hero.titulo.split(hero.tituloAcento);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-crema-100 to-crema">
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-teal/10 blur-3xl"
        aria-hidden
      />
      <div className="contenedor relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* --- Columna de texto --- */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal-light px-3.5 py-1.5 text-sm font-bold text-teal-dark">
            <Play className="h-3.5 w-3.5 fill-teal-dark" aria-hidden />
            {hero.badge}
          </span>

          <p className="etiqueta regla-corta mt-5">{hero.etiqueta}</p>

          <h1 className="titulo-serif mt-3 text-[2.5rem] sm:text-[3.2rem] lg:text-[3.5rem]">
            {antes}
            <span className="acento">{hero.tituloAcento}</span>
            {despues}
          </h1>

          <p className="prosa mt-5">{hero.subtitulo}</p>

          <ul className="mt-7 space-y-3">
            {hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal/15">
                  <Check className="h-4 w-4 text-teal-dark" aria-hidden />
                </span>
                <span className="text-[1.06rem] font-medium leading-snug text-tinta/90">
                  {b}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-md">
            <PriceCard cta={hero.cta} />
          </div>

          {resenas.length > 0 && (
            <a
              href="#resenas"
              className="mt-4 inline-flex items-center gap-2.5 text-[0.95rem] font-semibold text-tinta/75 hover:text-teal"
            >
              <Estrellas size="h-4 w-4" />
              {resenas.length} reviews from real readers
            </a>
          )}

          <p className="mt-4">
            <a
              href="#adentro"
              className="text-base font-bold text-teal underline decoration-arena decoration-2 underline-offset-4 hover:decoration-teal"
            >
              {hero.ctaSecundario} ↓
            </a>
          </p>
        </Reveal>

        {/* --- Columna del libro --- */}
        <Reveal delay={120} className="order-first lg:order-last">
          <div className="relative mx-auto w-full max-w-[24rem]">
            <div
              className="absolute -inset-3 -rotate-2 rounded-3xl bg-teal/10"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-arena bg-white p-2.5 shadow-libro">
              <Image
                src={product.portada}
                alt={`${product.nombre} cover`}
                width={900}
                height={1350}
                priority
                sizes="(max-width: 1024px) 80vw, 24rem"
                className="h-auto w-full rounded-lg"
              />
            </div>
            <figure className="relative -mt-10 ml-2 mr-6 rounded-xl border-l-4 border-teal bg-crema-50 p-5 shadow-tarjeta">
              <blockquote className="font-serif text-lg italic leading-snug text-tinta">
                “{hero.cita.texto}”
              </blockquote>
              <figcaption className="mt-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-tinta/55">
                {hero.cita.autor}
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>

      {/* --- Cifras --- */}
      <div className="contenedor relative pb-14">
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-6 border-t border-arena pt-8 sm:grid-cols-4">
            {hero.stats.map((s, i) => (
              <div
                key={s.etiqueta}
                className={`px-2 text-center ${
                  i > 0 ? "sm:border-l sm:border-arena" : ""
                }`}
              >
                <dt className="font-serif text-3xl font-extrabold leading-none text-teal">
                  {s.valor}
                </dt>
                <dd className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-tinta/60">
                  {s.etiqueta}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
