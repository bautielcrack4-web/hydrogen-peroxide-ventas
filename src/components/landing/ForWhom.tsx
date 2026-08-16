import { Check, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Marcado from "@/components/ui/Marcado";
import { paraQuien } from "@content/landing";

function Lista({
  titulo,
  items,
  positiva,
}: {
  titulo: string;
  items: string[];
  positiva: boolean;
}) {
  const Icono = positiva ? Check : X;
  return (
    <div
      className={`h-full rounded-2xl border p-7 ${
        positiva
          ? "border-teal/25 bg-crema-50 shadow-suave"
          : "border-arena bg-crema-100"
      }`}
    >
      <h3
        className={`font-serif text-2xl font-bold ${
          positiva ? "text-teal" : "text-tinta/55"
        }`}
      >
        {titulo}
      </h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full ${
                positiva ? "bg-teal text-white" : "bg-arena/60 text-tinta/50"
              }`}
            >
              <Icono className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="text-[1.05rem] leading-snug text-tinta/85">
              <Marcado texto={item} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ForWhom() {
  return (
    <Section
      tono="banda"
      etiqueta={paraQuien.etiqueta}
      titulo={paraQuien.titulo}
      centrado
    >
      <div className="mx-auto grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
        <Reveal>
          <Lista
            titulo={paraQuien.si.titulo}
            items={paraQuien.si.items}
            positiva
          />
        </Reveal>
        <Reveal delay={90}>
          <Lista
            titulo={paraQuien.no.titulo}
            items={paraQuien.no.items}
            positiva={false}
          />
        </Reveal>
      </div>
    </Section>
  );
}
