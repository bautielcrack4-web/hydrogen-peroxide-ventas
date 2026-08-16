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
      {/* Sección disparadora */}
      <section className="grade-joya relative overflow-hidden py-14 text-crema-50 sm:py-16">
        <div className="contenedor relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
          <button
            onClick={abrir}
            aria-label="Look inside the guide"
            className="group relative w-[9.5rem] flex-none [perspective:1200px]"
          >
            <img
              src="/img/recetario-preview/p1.jpg"
              alt="The Master Recipe Book cover"
              className="saturar w-full rounded-lg shadow-libro ring-1 ring-oro/30 transition-transform duration-500 [transform:rotateY(-16deg)] group-hover:[transform:rotateY(-6deg)]"
            />
            <span className="animate-latido absolute -right-2 -top-2 rounded-full bg-oro px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-bosque shadow-tarjeta">
              Preview
            </span>
            {/* Sello: deja claro que es del combo */}
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-md border-2 border-oro-claro/90 bg-teal-abismo/85 px-2.5 py-1 text-[0.56rem] font-black uppercase tracking-[0.14em] text-oro-claro shadow-tarjeta backdrop-blur">
              Combo exclusive
            </span>
          </button>

          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-oro/15 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-oro-claro ring-1 ring-oro-claro/30">
              <Gift className="h-3.5 w-3.5" aria-hidden />
              Included in The Complete Method
            </span>
            <h2 className="titulo-serif texto-oro-vivo mt-2 text-[1.7rem] sm:text-[2.2rem]">
              Look inside The Master Recipe Book
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[1rem] text-crema-200/85 sm:mx-0">
              Open it and flip the pages like a real book: real photos,
              step-by-step recipes and the exact-amount charts. And this is
              just a <strong className="text-oro-claro">sample</strong> of the 217.
            </p>
            <button
              onClick={abrir}
              className="boton-oro mt-5 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[1rem] font-bold text-bosque shadow-libro transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98]"
            >
              <BookOpen className="h-5 w-5" aria-hidden />
              Open the book
            </button>
          </div>
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
