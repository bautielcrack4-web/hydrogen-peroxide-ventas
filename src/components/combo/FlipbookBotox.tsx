"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Lock, BookOpen, ArrowRight, Star, Gift } from "lucide-react";
import CheckoutLink from "@/components/ui/CheckoutLink";
import { usePerfil } from "@/components/ui/usePerfil";
import { checkoutCombo } from "@/config/product";

// Se muestran COMPLETAS (con marca de agua "Muestra" en la página): la idea
// es que la gente VEA el valor real. El candado no tapa el contenido.
const PAGES = [
  { src: "/img/recetario-preview/p1.jpg", lock: false },
  { src: "/img/recetario-preview/p2.jpg", lock: false },
  { src: "/img/recetario-preview/p3.jpg", lock: false },
  { src: "/img/recetario-preview/p4.jpg", lock: false },
  { src: "/img/recetario-preview/p5.jpg", lock: false },
  { src: "/img/recetario-preview/p6.jpg", lock: false },
  { src: "/img/recetario-preview/p7.jpg", lock: false },
  { src: "/img/recetario-preview/p8.jpg", lock: false },
  { src: "/img/recetario-preview/p9.jpg", lock: false },
  { src: "/img/recetario-preview/p10.jpg", lock: false },
];
const TOTAL = PAGES.length + 1; // + slide de CTA

export default function FlipbookBotox() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const startX = useRef(0);
  const perfil = usePerfil();

  const next = () => setI((v) => Math.min(TOTAL - 1, v + 1));
  const prev = () => setI((v) => Math.max(0, v - 1));

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const abrir = () => {
    setI(0);
    setOpen(true);
  };

  return (
    <>
      {/* Sección disparadora — showcase de páginas en abanico (momento WOW) */}
      <section className="grade-joya relative overflow-hidden py-16 text-crema-50 sm:py-24">
        {/* halo cálido detrás del abanico */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="anim-flotar-lento absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[6px] sm:h-[34rem] sm:w-[34rem]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,59,46,.28) 0%, rgba(130,20,11,.12) 45%, transparent 72%)",
            }}
          />
        </div>

        <div className="contenedor relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-oro/15 px-3.5 py-1 text-[0.72rem] font-black uppercase tracking-[0.16em] text-oro-claro ring-1 ring-oro-claro/40">
            <Gift className="h-3.5 w-3.5" aria-hidden />
            Combo exclusive
          </span>
          <h2 className="titulo-serif texto-oro-vivo mx-auto mt-3 max-w-2xl text-[1.9rem] leading-[1.1] sm:text-[2.6rem]">
            The book that makes every trick actually work.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-crema-200/85 sm:text-[1.12rem]">
            The Master Recipe Book gives you the{" "}
            <strong className="text-oro-claro">exact amount, ratio and time</strong>{" "}
            for every single use — the difference between “it kind of worked” and{" "}
            <em>“wow.”</em> See it for yourself:
          </p>

          {/* ABANICO de páginas reales — clickeable */}
          <button
            onClick={abrir}
            aria-label="Open the book"
            className="group relative mx-auto mt-6 flex h-[230px] w-full items-center justify-center overflow-visible sm:mt-12 sm:h-[380px]"
          >
            {/* wrapper de tamaño EXPLÍCITO = página central (evita que el fan colapse) */}
            <span className="relative block h-[212px] w-[150px] sm:h-[300px] sm:w-[212px]">
              {[
                { src: "p6", x: -178, r: -14, z: 10 },
                { src: "p4", x: -92, r: -7, z: 20 },
                { src: "p5", x: 0, r: 0, z: 30, center: true },
                { src: "p3", x: 92, r: 7, z: 20 },
                { src: "p2", x: 178, r: 14, z: 10 },
              ].map((pg) => (
                <img
                  key={pg.src}
                  src={`/img/recetario-preview/${pg.src}.jpg`}
                  alt="Master Recipe Book page"
                  className={`absolute inset-0 h-full w-full rounded-xl object-cover ring-1 transition-transform duration-500 ${
                    pg.center
                      ? "shadow-[0_40px_80px_-24px_rgba(0,0,0,.8)] ring-oro-claro/60 group-hover:-translate-y-1"
                      : "shadow-[0_30px_60px_-24px_rgba(0,0,0,.75)] ring-oro/25"
                  }`}
                  style={{
                    transform: `translateX(${pg.x}px) rotate(${pg.r}deg) scale(${pg.center ? 1.1 : 1})`,
                    zIndex: pg.z,
                  }}
                />
              ))}
              {/* badges flotantes */}
              <span className="animate-latido absolute -left-9 -top-4 z-40 rotate-[-7deg] rounded-full bg-oro px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-wide text-bosque shadow-tarjeta sm:px-3.5 sm:text-[0.72rem]">
                150 exact recipes
              </span>
              <span className="absolute -bottom-3 -right-9 z-40 rotate-[6deg] rounded-full bg-teal-abismo/90 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-wide text-oro-claro ring-1 ring-oro-claro/50 backdrop-blur sm:px-3.5 sm:text-[0.72rem]">
                the “never-mix” chart
              </span>
            </span>
            {/* hint de abrir (aparece en hover / siempre visible en móvil) */}
            <span className="pointer-events-none absolute bottom-0 left-1/2 z-50 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-crema-50/10 px-4 py-2 text-[0.82rem] font-semibold text-crema-50 ring-1 ring-crema-50/20 backdrop-blur transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
              <BookOpen className="h-4 w-4 text-oro-claro" aria-hidden />
              Tap to flip through it
            </span>
          </button>

          {/* stat chips */}
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2.5 sm:mt-9 sm:gap-3">
            {[
              ["150", "exact-amount recipes"],
              ["96", "pages"],
              ["15", "chapters"],
              ["3%", "one cheap bottle"],
            ].map(([n, l]) => (
              <span
                key={l}
                className="neo inline-flex items-baseline gap-1.5 rounded-full px-4 py-2 text-crema-100"
              >
                <b className="font-serif text-lg text-oro-claro">{n}</b>
                <span className="text-[0.8rem] text-crema-200/80">{l}</span>
              </span>
            ))}
          </div>

          <button
            onClick={abrir}
            className="boton-oro mt-8 inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[1.05rem] font-bold text-bosque shadow-libro transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98]"
          >
            <BookOpen className="h-5 w-5" aria-hidden />
            Flip through it — free
          </button>
          <p className="mt-3 text-[0.9rem] italic text-crema-200/70">
            Yours free inside the Complete Method. Not sold separately.
          </p>
        </div>
      </section>

      {/* Modal libro */}
      {open && (
        <div
          className="anim-fade-in fixed inset-0 z-[70] flex flex-col bg-teal-abismo/85 backdrop-blur-lg"
          onClick={() => setOpen(false)}
        >
          {/* barra superior */}
          <div className="flex flex-none items-center justify-between px-4 py-3 text-crema-50">
            <span className="text-[0.8rem] font-semibold text-oro-claro">
              The Master Recipe Book · preview
            </span>
            <span className="text-[0.8rem] tabular-nums text-crema-200/70">
              {Math.min(i + 1, PAGES.length)} / {PAGES.length}
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-full bg-crema-50/10 p-2 text-crema-50 transition hover:bg-crema-50/20"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          {/* visor con page-flip */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-2"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - startX.current;
              if (dx < -40) next();
              else if (dx > 40) prev();
            }}
          >
            <div
              className="anim-abrir-libro relative mx-auto"
              style={{
                // El ancho se deriva de la altura disponible (100dvh menos la
                // barra y los puntitos) para que la hoja entre COMPLETA y con
                // el aspecto A4 exacto → sin recorte de los lados. Lo más
                // grande posible para que el cuadro se lea bien.
                width: "min(94vw, 27rem, calc((100dvh - 118px) * 0.7071))",
                aspectRatio: "794 / 1123",
                perspective: "2200px",
              }}
            >
              <div className="relative h-full w-full [transform-style:preserve-3d]">
                {/* páginas + slide CTA, apiladas y girando sobre el lomo */}
                {Array.from({ length: TOTAL }).map((_, k) => {
                  const flipped = k < i;
                  const style: React.CSSProperties = {
                    transformOrigin: "left center",
                    transform: flipped ? "rotateY(-168deg)" : "rotateY(0deg)",
                    opacity: flipped ? 0 : 1,
                    zIndex: flipped ? k : 100 - (k - i),
                    transition:
                      "transform 0.65s cubic-bezier(.3,.9,.3,1), opacity 0.65s ease",
                    pointerEvents: k === i ? "auto" : "none",
                  };
                  const isCTA = k === PAGES.length;
                  return (
                    <div
                      key={k}
                      className="absolute inset-0 [transform-style:preserve-3d]"
                      style={style}
                    >
                      {isCTA ? (
                        <div className="flex h-full items-center justify-center rounded-lg bg-crema-50 p-6 shadow-libro">
                          <div className="text-center text-tinta">
                            <div className="mb-2 flex justify-center gap-1 text-oro">
                              {[...Array(5)].map((_, s) => (
                                <Star key={s} className="h-4 w-4 fill-oro" aria-hidden />
                              ))}
                            </div>
                            <h3 className="titulo-serif text-[1.4rem] text-teal">
                              {perfil?.nombre
                                ? `${perfil.nombre}, this is what makes the difference.`
                                : "This is what makes the difference."}
                            </h3>
                            <p className="mt-2 text-[0.95rem] text-tinta/75">
                              The Master Recipe Book —with the{" "}
                              <strong className="text-teal">exact amounts</strong> for
                              every trick— comes <strong className="text-teal">only in the combo</strong>.
                            </p>
                            <CheckoutLink
                              href={checkoutCombo}
                              className="boton-oro mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[0.98rem] font-bold text-bosque shadow-libro"
                            >
                              Unlock it with the combo · $47
                              <ArrowRight className="h-4 w-4" aria-hidden />
                            </CheckoutLink>
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-full w-full overflow-hidden rounded-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] ring-1 ring-oro/15">
                          <img
                            src={PAGES[k].src}
                            alt={`Page ${k + 1}`}
                            className="saturar h-full w-full object-contain"
                          />
                          {/* sombra del lomo (izquierda) para sensación de libro */}
                          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/25 to-transparent" />
                          {/* brillo de la página al girar */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/10 to-transparent" />
                          {PAGES[k].lock && (
                            <>
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-teal-abismo via-teal-abismo/85 to-transparent">
                                <div className="absolute inset-x-0 bottom-5 flex flex-col items-center gap-1.5 text-center text-crema-50">
                                  <Lock className="h-5 w-5 text-oro-claro" aria-hidden />
                                  <span className="text-[0.82rem] font-semibold">
                                    The full step-by-step is in the guide
                                  </span>
                                </div>
                              </div>
                              <span className="absolute right-2 top-2 rounded-full bg-tinta/70 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-wide text-crema-50">
                                Sample
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* flechas */}
            {i > 0 && (
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-2 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-crema-50/12 p-2.5 text-crema-50 transition hover:bg-crema-50/25"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden />
              </button>
            )}
            {i < TOTAL - 1 && (
              <button
                onClick={next}
                aria-label="Next"
                className="animate-latido absolute right-2 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-oro p-2.5 text-bosque shadow-tarjeta transition hover:bg-oro-claro"
              >
                <ChevronRight className="h-6 w-6" aria-hidden />
              </button>
            )}
          </div>

          {/* puntitos */}
          <div
            className="flex flex-none items-center justify-center gap-2 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {Array.from({ length: TOTAL }).map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Go to ${k + 1}`}
                className={`h-2 rounded-full transition-all ${
                  k === i ? "w-6 bg-oro-claro" : "w-2 bg-crema-50/30 hover:bg-crema-50/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
