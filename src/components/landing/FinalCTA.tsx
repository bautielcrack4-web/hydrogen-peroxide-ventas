import Reveal from "@/components/ui/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import Ornamento from "@/components/ui/Ornamento";
import { TituloAcento } from "@/components/ui/Section";
import { ctaFinal } from "@content/landing";
import { product } from "@/config/product";

export default function FinalCTA() {
  return (
    <section className="bg-crema py-16 sm:py-24">
      <div className="contenedor text-center">
        <Reveal>
          <Ornamento className="mb-8" />
          <TituloAcento
            texto={ctaFinal.titulo}
            acento={ctaFinal.tituloAcento}
            className="mx-auto max-w-3xl text-[2rem] sm:text-[2.7rem]"
          />
          <p className="mx-auto mt-5 max-w-xl text-[1.15rem] text-tinta/75">
            {ctaFinal.bajada}
          </p>

          <div className="mt-9 flex justify-center">
            <CTAButton className="px-10 py-5 text-xl">{ctaFinal.cta}</CTAButton>
          </div>
          <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-tinta/55">
            One-time payment · Instant access · {product.garantiaDias}-day
            guarantee
          </p>

          <div className="mx-auto mt-14 max-w-2xl border-t border-arena pt-8 text-left">
            <p className="text-[1.08rem] leading-relaxed text-tinta/80">
              <strong className="font-serif font-bold text-tinta">P.S.</strong> —{" "}
              {ctaFinal.pd}
            </p>
            <p className="mt-5 font-serif text-2xl italic text-teal">
              {ctaFinal.firma}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
