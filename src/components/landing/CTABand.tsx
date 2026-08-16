import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import Ornamento from "@/components/ui/Ornamento";
import { product } from "@/config/product";

/** Banda de cierre intermedia: recuerda la acción sin repetir toda la oferta. */
export default function CTABand({ titulo }: { titulo: string }) {
  return (
    <section className="bg-[#0c0c0f] py-14">
      <div className="contenedor text-center">
        <Reveal>
          <Ornamento color="text-oro" />
          <h2 className="titulo-serif mx-auto mt-5 max-w-2xl text-[1.7rem] text-white sm:text-[2.1rem]">
            {titulo}
          </h2>
          <div className="mt-7 flex justify-center">
            <CTAButton variant="oro">I want the guide</CTAButton>
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-crema-200/60">
            Instant access · {product.garantiaDias}-day guarantee
          </p>
        </Reveal>
      </div>
    </section>
  );
}
