import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { TituloAcento } from "@/components/ui/Section";
import { problema } from "@content/landing";

export default function ProblemSection() {
  return (
    <section className="bg-crema-100 py-16 sm:py-24">
      <div className="contenedor grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="order-last lg:order-first">
          <div className="relative mx-auto max-w-sm">
            <div
              className="absolute -inset-2.5 rotate-1 rounded-2xl bg-arena/40"
              aria-hidden
            />
            <Image
              src="/img/det_portada.jpg"
              alt={problema.imagenAlt}
              width={856}
              height={1520}
              sizes="(max-width: 1024px) 80vw, 22rem"
              className="relative h-auto w-full rounded-2xl border border-arena object-cover shadow-tarjeta"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="etiqueta regla-corta">{problema.etiqueta}</p>
          <TituloAcento
            texto={problema.titulo}
            className="mt-3 text-[2.1rem] sm:text-[2.8rem]"
          />
          <div className="mt-6 space-y-5">
            {problema.parrafos.map((p) => (
              <p key={p.slice(0, 24)} className="prosa">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-7 border-l-4 border-teal bg-crema-50 py-4 pl-5 pr-4 font-serif text-xl italic leading-snug text-tinta">
            It's not the house. It's the upkeep nobody ever taught you to do.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
