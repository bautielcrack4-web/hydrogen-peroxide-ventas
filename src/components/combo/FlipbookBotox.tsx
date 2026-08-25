"use client";

import Image from "next/image";
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
  { src: "/img/recetario-preview/p11.jpg", lock: false },
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
      <section className="relative overflow-hidden py-24 text-crema-50 sm:py-32">
        <div className="contenedor relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-crema-200 ring-1 ring-white/12">
            <Gift className="h-3.5 w-3.5" aria-hidden />
            Combo exclusive
          </span>
          <h2 className="display-seccion mx-auto mt-4 max-w-2xl">
            The book that makes every trick actually work.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-crema-200/85 sm:text-[1.12rem]">
            The Master Recipe Book gives you the{" "}
            <strong className="text-crema-50">exact amount, ratio and time</strong>{" "}
            for every single use — the difference between “it kind of worked” and{" "}
            <em>“wow.”</em> See it for yourself:
          </p>

          {/* El libro ABIERTO, fotografiado. Reemplaza al abanico de
              miniaturas recortadas: una foto real del objeto prueba más que
              cinco thumbnails en object-cover. */}
          <button
            onClick={abrir}
            aria-label="Open the book"
            className="group relative mx-auto mt-10 block w-full max-w-3xl sm:mt-14"
          >
            <span className="relative block overflow-hidden rounded-xl border border-white/[0.07]">
              <Image
                src="/img/recetario-preview/spread_1.jpg"
                alt="The Master Recipe Book open at the dilution chart"
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 100vw, 768px"
                quality={86}
                className="block h-auto w-full"
              />
            </span>
            <span className="absolute -left-2 -top-3 z-40 rounded-md bg-oro px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-white shadow-tarjeta sm:-left-4 sm:px-3.5 sm:text-[0.68rem]">
              150 exact recipes
            </span>
            <span className="absolute -bottom-3 -right-2 z-40 rounded-md bg-teal-abismo/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-crema-200 ring-1 ring-white/15 backdrop-blur sm:-right-4 sm:px-3.5 sm:text-[0.68rem]">
              the &ldquo;never-mix&rdquo; chart
            </span>
            <span className="pointer-events-none absolute bottom-4 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-teal-abismo/80 px-4 py-2 text-[0.82rem] font-medium text-crema-50 ring-1 ring-white/15 backdrop-blur transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
              <BookOpen className="h-4 w-4" aria-hidden />
              Tap to flip through it
            </span>
          </button>

          {/* Dos spreads más: la prueba de que el libro existe de verdad */}
          <div className="mx-auto mt-5 grid max-w-3xl gap-5 sm:grid-cols-2">
            {[
              { src: "spread_2", alt: "Open at why 3% works and the appliance rescue map" },
              { src: "spread_3", alt: "Open at the garden guide and the never-mix chart" },
            ].map((sp) => (
              <div
                key={sp.src}
                className="overflow-hidden rounded-xl border border-white/[0.07]"
              >
                <Image
                  src={`/img/recetario-preview/${sp.src}.jpg`}
                  alt={sp.alt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 640px) 100vw, 374px"
                  quality={82}
                  className="block h-auto w-full"
                />
              </div>
            ))}
          </div>

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
                className="inline-flex items-baseline gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-2 text-crema-200"
              >
                <b className="font-serif text-lg tracking-display text-crema-50">{n}</b>
                <span className="text-[0.8rem] text-crema-200/80">{l}</span>
              </span>
            ))}
          </div>

          <button
            onClick={abrir}
            className="boton-oro mt-10 inline-flex items-center gap-2.5 rounded-[10px] px-8 py-4 text-[1.0625rem] font-semibold tracking-[-0.01em]"
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
            <span className="text-[0.8rem] font-medium text-crema-200">
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
                        <div className="flex h-full items-center justify-center rounded-lg bg-crema-50 p-6 text-tinta shadow-libro">
                          <div className="text-center text-tinta">
                            <div className="mb-2 flex justify-center gap-1 text-oro">
                              {[...Array(5)].map((_, s) => (
                                <Star key={s} className="h-4 w-4 fill-estrella text-estrella" aria-hidden />
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
                              className="boton-oro mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[9px] px-5 py-3.5 text-[0.98rem] font-semibold"
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
                                  <Lock className="h-5 w-5 text-crema-200" aria-hidden />
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
                className="absolute right-2 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-oro p-2.5 text-white shadow-tarjeta transition hover:brightness-110"
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
                  k === i ? "w-6 bg-crema-50" : "w-2 bg-crema-50/25 hover:bg-crema-50/45"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
