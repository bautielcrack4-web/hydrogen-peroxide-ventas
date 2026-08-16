"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import CheckoutLink from "@/components/ui/CheckoutLink";
import CtaLabel from "@/components/ui/CtaLabel";
import { usePerfil, objetivoTexto } from "@/components/ui/usePerfil";
import { checkoutCombo, planes } from "@/config/product";

const combo = planes.find((p) => p.id === "combo")!;

/**
 * Cierre personalizado: una carta corta del Dr. Federer que llama al
 * usuario por su nombre y le recuerda su objetivo, justo antes del último
 * botón. Solo aparece si el usuario dejó su nombre en el onboarding.
 */
export default function CierrePersonal() {
  const perfil = usePerfil();
  if (!perfil?.nombre) return null;

  return (
    <section className="grade-joya relative overflow-hidden py-16 text-crema-50 sm:py-20">
      <div className="contenedor">
        <div className="mx-auto max-w-2xl rounded-3xl border border-oro/25 bg-crema-50/[0.05] p-8 text-center shadow-libro sm:p-10">
          <div className="mx-auto mb-5 h-16 w-16 overflow-hidden rounded-full bg-teal-noche ring-2 ring-oro-claro/40">
            <Image
              src="/img/presentador.png"
              alt="Mike Dalton, your guide"
              width={120}
              height={181}
              className="mx-auto h-[5.5rem] w-auto max-w-none"
            />
          </div>
          <h2 className="titulo-serif text-[1.7rem] leading-tight text-crema-50 sm:text-[2.1rem]">
            {perfil.nombre}, one last thing.
          </h2>
          <p className="mx-auto mt-4 max-w-prosa text-[1.06rem] leading-relaxed text-crema-200/85">
            You told me you wanted to{" "}
            <strong className="text-oro-claro">{objetivoTexto(perfil.obj)}</strong>.
            Everything you need to get there is bundled into The Complete
            Method — today for <strong className="text-oro-claro">${combo.precio}</strong>,
            one payment, yours forever. Start this very week; a few weeks
            from now you'll be glad you did.
          </p>
          <p className="mt-4 font-serif text-[1.05rem] italic text-oro-claro">
            — The Hydrogen Peroxide Tricks team
          </p>
          <CheckoutLink
            href={checkoutCombo}
            className="boton-oro mt-7 inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-lg font-bold text-bosque shadow-libro transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98]"
          >
            <CtaLabel base="I want the complete method" /> — ${combo.precio}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </CheckoutLink>
        </div>
      </div>
    </section>
  );
}
