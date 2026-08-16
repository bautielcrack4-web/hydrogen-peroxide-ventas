import { CreditCard, MailCheck, BookOpen } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { comoFunciona } from "@content/landing";

const iconos = [CreditCard, MailCheck, BookOpen];

export default function HowItWorks() {
  return (
    <Section
      tono="banda"
      etiqueta={comoFunciona.etiqueta}
      titulo={comoFunciona.titulo}
      centrado
    >
      <ol className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {comoFunciona.pasos.map((paso, i) => {
          const Icono = iconos[i] ?? BookOpen;
          return (
            <Reveal key={paso.numero} delay={i * 80}>
              <li className="relative h-full rounded-2xl border border-arena bg-crema-50 p-7 text-center shadow-tarjeta">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal text-crema-50">
                  <Icono className="h-6 w-6" aria-hidden />
                </span>
                <span className="mt-4 block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-oro">
                  Step {paso.numero}
                </span>
                <h3 className="mt-1.5 font-serif text-xl font-bold text-tinta">
                  {paso.titulo}
                </h3>
                <p className="mt-2.5 leading-relaxed text-tinta/75">
                  {paso.detalle}
                </p>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
