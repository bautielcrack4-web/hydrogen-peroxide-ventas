import { Star, Youtube, ShieldCheck, Users } from "lucide-react";

/**
 * Puente de confianza justo después del hero: conecta el video de YouTube
 * (de donde viene el tráfico) con la página y ancla prueba social + rating.
 * Es uno de los primeros disparadores de conversión.
 */
export default function TrustBridge() {
  return (
    <section className="relative py-8 text-crema-50 sm:py-10">
      <div className="contenedor">
        <div className="mx-auto flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          {/* Bridge desde el video */}
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white/[0.04] px-5 py-4 ring-1 ring-white/10">
            <Youtube className="h-7 w-7 flex-none text-oro-claro" aria-hidden />
            <p className="text-[0.95rem] leading-snug text-crema-200/90">
              Saw the tricks on YouTube?{" "}
              <strong className="text-crema-50">They're all here</strong>, organized
              and with the exact amounts.
            </p>
          </div>

          {/* Rating + prueba social */}
          <div className="flex flex-none items-center justify-center gap-5 rounded-2xl bg-white/[0.04] px-5 py-4 ring-1 ring-white/10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5 text-oro-claro">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-oro-claro" aria-hidden />
                ))}
              </div>
              <p className="mt-0.5 text-[0.72rem] font-bold text-crema-50">4.9/5</p>
            </div>
            <span className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-1.5 text-center">
              <Users className="h-4 w-4 text-oro-claro" aria-hidden />
              <p className="text-[0.8rem] font-semibold leading-tight text-crema-200/85">
                3,000+ people
                <br className="hidden sm:block" /> already using it
              </p>
            </div>
            <span className="hidden h-8 w-px bg-white/10 sm:block" />
            <div className="hidden items-center gap-1.5 sm:flex">
              <ShieldCheck className="h-4 w-4 text-oro-claro" aria-hidden />
              <p className="text-[0.8rem] font-semibold leading-tight text-crema-200/85">
                7-day
                <br /> guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
