import Marca from "@/components/ui/Marca";
import { checkoutCombo, planes } from "@/config/product";
import { comboBarra } from "@content/combo";
import { Precio } from "@/components/ui/Dsc";

const combo = planes.find((p) => p.id === "combo")!;

/**
 * Barra superior: marca + precio + una acción.
 *
 * Se retiraron el countdown de 6 h (se reiniciaba por visitante vía
 * localStorage: escasez falsa) y el contador de "N viewing now" (era una
 * onda seno). Un producto de $47 no necesita presión inventada, y este
 * público la detecta al instante.
 */
export default function ComboTopBar() {
  return (
    <div className="glass-dark sticky top-0 z-50 border-b border-white/[0.07] text-crema-50">
      <div className="contenedor flex h-14 items-center justify-between gap-4">
        <Marca size={26} compacto />

        <div className="flex items-center gap-4">
          <span className="hidden items-baseline gap-2 text-[0.85rem] sm:flex">
            <s className="text-crema-200/50">${combo.precioAnterior}</s>
            <span className="font-semibold text-crema-50"><Precio /></span>
          </span>
          <a
            href={checkoutCombo}
            className="hotmart-fb boton-oro whitespace-nowrap rounded-[8px] px-4 py-2 text-[0.85rem] font-semibold"
          >
            Get the method · <Precio />
          </a>
        </div>
      </div>
    </div>
  );
}
