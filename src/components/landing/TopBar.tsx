import { ShieldCheck, Mail } from "lucide-react";
import { product } from "@/config/product";

/**
 * Cinta superior editorial. Antes había acá un contador regresivo falso
 * que se reiniciaba en cada visita: se quitó a propósito — en un público
 * de 60+ la urgencia inventada destruye la confianza que vende la guía.
 */
export default function TopBar() {
  return (
    <div className="bg-[#0c0c0f] text-crema-200">
      <div className="contenedor flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em]">
        <span>{product.marcaSuperior}</span>
        <span className="hidden items-center gap-2 text-oro-claro sm:inline-flex">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          {product.garantiaDias}-day guarantee
        </span>
        <span className="inline-flex items-center gap-2 normal-case tracking-normal text-crema-200/70">
          <Mail className="h-3.5 w-3.5" aria-hidden />
          {product.soporteEmail}
        </span>
      </div>
    </div>
  );
}
