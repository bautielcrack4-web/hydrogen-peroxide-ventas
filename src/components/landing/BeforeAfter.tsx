import Image from "next/image";
import { Check, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { antesDespues } from "@content/landing";

type Columna = typeof antesDespues.antes;

function Panel({ data, positiva }: { data: Columna; positiva: boolean }) {
  const Icono = positiva ? Check : X;
  return (
    <div
      className={`h-full overflow-hidden rounded-2xl border ${
        positiva
          ? "border-oro/35 bg-white/[0.06]"
          : "border-crema-200/15 bg-white/[0.02]"
      }`}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={data.img}
          alt={data.alt}
          fill
          sizes="(max-width: 768px) 92vw, 44vw"
          className={`object-cover object-top ${positiva ? "" : "saturate-[.6]"}`}
        />
      </div>
      <div className="p-6">
        <h3
          className={`font-serif text-xl font-bold ${
            positiva ? "text-white" : "text-crema-200/70"
          }`}
        >
          {data.titulo}
        </h3>
        <p className="mt-0.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-oro">
          {data.subtitulo}
        </p>
        <ul className="mt-4">
          {data.items.map((item) => (
            <li
              key={item}
              className="flex items-center justify-between gap-3 border-b border-crema-200/12 py-2.5 text-[1.02rem] text-crema-200/85"
            >
              <span>{item}</span>
              <span
                className={`flex h-6 w-6 flex-none items-center justify-center rounded-full ${
                  positiva
                    ? "bg-oro-claro text-bosque"
                    : "border border-crema-200/25 text-crema-200/45"
                }`}
              >
                <Icono className="h-3.5 w-3.5" aria-hidden />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="bg-[#0c0c0f]-dark py-16 text-crema-100 sm:py-24">
      <div className="contenedor">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="etiqueta !text-oro-claro">{antesDespues.etiqueta}</p>
            <h2 className="titulo-serif mt-3 text-[2rem] text-white sm:text-[2.5rem]">
              {antesDespues.titulo}
            </h2>
            <p className="mt-4 text-lg text-crema-200/75">
              {antesDespues.bajada}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
          <Reveal>
            <Panel data={antesDespues.antes} positiva={false} />
          </Reveal>
          <Reveal delay={90}>
            <Panel data={antesDespues.despues} positiva />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
