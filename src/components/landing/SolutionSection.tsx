import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { TituloAcento } from "@/components/ui/Section";
import { solucion } from "@content/landing";

export default function SolutionSection() {
  return (
    <section className="bg-crema py-16 sm:py-24">
      <div className="contenedor grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="etiqueta regla-corta">{solucion.etiqueta}</p>
          <TituloAcento
            texto={solucion.titulo}
            acento={solucion.tituloAcento}
            className="mt-3 text-[2.1rem] sm:text-[2.8rem]"
          />
          <div className="mt-6 space-y-5">
            {solucion.parrafos.map((p) => (
              <p key={p.slice(0, 24)} className="prosa">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <figure className="rounded-2xl border border-arena bg-crema-50 p-3 shadow-tarjeta">
            <Image
              src="/img/s1_mec.jpg"
              alt={solucion.imagenAlt}
              width={860}
              height={860}
              sizes="(max-width: 1024px) 90vw, 32rem"
              className="h-auto w-full rounded-xl"
            />
            <figcaption className="px-2 pb-1 pt-3 text-center text-sm font-semibold text-tinta/60">
              Page 12 · “What 3% hydrogen peroxide actually is — and why the brown drugstore bottle matters”
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
