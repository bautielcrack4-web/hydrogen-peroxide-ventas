import { Lock, Zap, ShieldCheck, Type } from "lucide-react";
import { confianza } from "@content/landing";

const iconos = [Lock, Zap, ShieldCheck, Type];

export default function TrustBar() {
  return (
    <div className="border-y border-arena bg-crema-100">
      <div className="contenedor grid grid-cols-2 gap-x-6 gap-y-5 py-6 lg:grid-cols-4">
        {confianza.map((c, i) => {
          const Icono = iconos[i] ?? ShieldCheck;
          return (
            <div key={c.titulo} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-teal/12 ring-1 ring-teal/20">
                <Icono className="h-[1.05rem] w-[1.05rem] text-teal-dark" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[0.95rem] font-bold leading-tight text-tinta">
                  {c.titulo}
                </p>
                <p className="text-sm leading-snug text-tinta/65">{c.detalle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
