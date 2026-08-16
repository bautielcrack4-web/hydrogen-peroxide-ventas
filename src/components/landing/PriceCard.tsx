import { Zap, ShieldCheck } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import { product, precioFormateado } from "@/config/product";

/** Bloque precio + CTA. Se usa en el hero y donde haga falta cerrar la venta. */
export default function PriceCard({ cta }: { cta: string }) {
  return (
    <div className="rounded-2xl border border-arena bg-crema-50 p-5 shadow-tarjeta sm:p-6">
      <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="font-serif text-5xl font-extrabold leading-none text-teal">
          {precioFormateado(product.precio)}
        </span>
        {product.mostrarPrecioAnterior && (
          <span className="text-xl text-vino/70 line-through">
            {precioFormateado(product.precioAnterior)}
          </span>
        )}
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-tinta/55">
          Launch price · one-time payment
        </span>
      </div>

      <CTAButton className="mt-5 w-full">{cta}</CTAButton>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm font-semibold text-tinta/70">
        <span className="inline-flex items-center gap-1.5">
          <Zap className="h-4 w-4 text-teal" aria-hidden /> Instant access
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-teal" aria-hidden />
          {product.garantiaDias}-day guarantee
        </span>
      </div>
    </div>
  );
}
