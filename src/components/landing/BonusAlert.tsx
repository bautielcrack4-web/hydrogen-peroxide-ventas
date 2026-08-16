import Image from "next/image";
import { Gift } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Marcado from "@/components/ui/Marcado";
import { TituloAcento } from "@/components/ui/Section";
import { bono } from "@content/landing";

export default function BonusAlert() {
  return (
    <section className="bg-[#0c0c0f] py-16 text-crema-100 sm:py-24">
      <div className="contenedor grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-oro/40 bg-oro/10 px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-oro-claro">
            <Gift className="h-3.5 w-3.5" aria-hidden />
            {bono.etiqueta}
          </span>

          <TituloAcento
            texto={bono.titulo}
            acento={bono.tituloAcento}
            oscuro
            className="mt-4 text-[2rem] sm:text-[2.5rem]"
          />

          <div className="mt-5 space-y-4">
            {bono.parrafos.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="max-w-prosa text-[1.12rem] leading-relaxed text-crema-200/85"
              >
                <Marcado texto={p} claseFuerte="font-bold text-white" />
              </p>
            ))}
          </div>

          <ul className="mt-7 space-y-0">
            {bono.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-crema-200/15 py-3.5 text-[1.05rem] text-crema-200/85"
              >
                <span className="mt-2 text-[0.5rem] text-oro" aria-hidden>
                  ◆
                </span>
                <span>
                  <Marcado texto={item} claseFuerte="font-bold text-white" />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mx-auto max-w-sm">
            <div
              className="absolute -inset-2.5 rotate-2 rounded-2xl bg-oro/15"
              aria-hidden
            />
            <Image
              src="/img/alerta_div.jpg"
              alt={bono.imagenAlt}
              width={856}
              height={1520}
              sizes="(max-width: 1024px) 80vw, 22rem"
              className="relative h-auto w-full rounded-2xl border border-oro/30 object-cover shadow-libro"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
