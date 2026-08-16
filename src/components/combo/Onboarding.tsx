"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Check, X } from "lucide-react";

const KEY = "federer_perfil";
const CERRADO = "federer_onboarding_cerrado";

const OBJETIVOS = [
  { id: "hogar", t: "Clean my home & garden", d: "bathroom, laundry, mold, plants…" },
  { id: "reparador", t: "Save on repairs", d: "appliances, AC, car…" },
  { id: "ambos", t: "Both of those", d: "the whole house with one bottle" },
];

const cap = (s: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

type Estado = "cerrado" | "invite" | "quiz";

/** Avatar de Federer que SALE del círculo hacia arriba + luz verde "en línea". */
function FedererAvatar({ size = 64 }: { size?: number }) {
  return (
    <div className="relative flex-none" style={{ width: size, height: size }}>
      {/* círculo base con halo verde */}
      <div className="glow-verde absolute inset-x-0 bottom-0 rounded-full bg-teal-noche ring-2 ring-[#22e06a]/45" style={{ height: size }} />
      {/* Wrapper que CENTRA (transform estático). La animación va en la
          imagen interna para que su transform no pise el centrado y Federer
          no se corra. Federer llena el círculo y sobresale por arriba. */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: -size * 0.04, height: size * 1.5 }}
      >
        <Image
          src="/img/presentador.png"
          alt="Mike Dalton, your guide"
          width={240}
          height={362}
          priority
          className="anim-toc max-w-none drop-shadow-[0_6px_10px_rgba(0,0,0,.35)]"
          style={{ height: size * 1.5, width: "auto" }}
        />
      </div>
      {/* punto verde en línea */}
      <span className="absolute bottom-0.5 right-0 z-10 h-3.5 w-3.5 rounded-full bg-[#22e06a] ring-2 ring-crema-50 shadow-[0_0_10px_#22e06a]" />
    </div>
  );
}

export default function Onboarding() {
  const [estado, setEstado] = useState<Estado>("cerrado");
  const [paso, setPaso] = useState(0); // 0 nombre, 1 objetivo
  const [nombre, setNombre] = useState("");
  const [typed, setTyped] = useState("");

  // Invitación suave: tras el hero (scroll o ~7s), 1ª visita.
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) || localStorage.getItem(CERRADO)) return;
    } catch {}
    let disparado = false;
    const abrir = () => {
      if (disparado) return;
      disparado = true;
      setEstado("invite");
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => window.scrollY > 450 && abrir();
    const t = setTimeout(abrir, 7000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = estado === "quiz" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [estado]);

  const nom = cap(nombre.trim());
  const pregunta =
    paso === 0
      ? "Hi 👋 Before we start, what's your name?"
      : `Nice to meet you, ${nom}. What do you want to tackle first?`;
  useEffect(() => {
    if (estado !== "quiz") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(pregunta);
      return;
    }
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(pregunta.slice(0, i));
      try {
        navigator.vibrate?.(3);
      } catch {}
      if (i >= pregunta.length) clearInterval(id);
    }, 34);
    return () => clearInterval(id);
    // Solo re-tipear al cambiar de pregunta (paso), no en cada tecla.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado, paso]);

  const cerrarInvite = () => {
    try {
      localStorage.setItem(CERRADO, "1");
    } catch {}
    setEstado("cerrado");
  };

  // Al elegir objetivo: guardar, cerrar y LLEVAR directo al combo.
  const elegirObjetivo = (obj: string) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ nombre: nom, obj }));
      window.dispatchEvent(new Event("perfil"));
    } catch {}
    setEstado("cerrado");
    setTimeout(() => {
      document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const listo = typed.length >= pregunta.length;

  // ---------- INVITACIÓN (no bloquea la página) ----------
  if (estado === "invite") {
    return (
      <div className="anim-entra-pop fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-sm sm:left-6 sm:right-auto">
        <div className="relative rounded-2xl bg-crema-50 py-4 pl-24 pr-9 shadow-libro ring-1 ring-oro/25">
          <div className="absolute -top-7 left-3">
            <FedererAvatar size={68} />
          </div>
          <p className="text-[0.95rem] leading-snug text-tinta">
            Hi 👋 Can I ask you <strong className="text-teal">2 quick questions</strong> and tell you
            which guide is <em>right for you</em>?
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={() => {
                setPaso(0);
                setEstado("quiz");
              }}
              className="boton-oro animate-latido rounded-full px-4 py-2 text-[0.85rem] font-bold text-bosque shadow-tarjeta"
            >
              Yes, go ahead
            </button>
            <button
              onClick={cerrarInvite}
              className="rounded-full px-3 py-2 text-[0.85rem] font-semibold text-tinta/55 hover:text-tinta"
            >
              Not now
            </button>
          </div>
          <button
            onClick={cerrarInvite}
            aria-label="Close"
            className="absolute right-2 top-2 text-tinta/35 hover:text-tinta/70"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    );
  }

  if (estado !== "quiz") return null;

  // ---------- QUIZ: card centrada sobre la página BLURREADA ----------
  return (
    <div
      className="anim-fade-in fixed inset-0 z-[80] flex items-center justify-center bg-teal-abismo/55 p-4 backdrop-blur-lg"
      onClick={cerrarInvite}
    >
      <div className="anim-entra-pop relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={cerrarInvite}
          className="absolute -top-9 right-0 text-[0.82rem] text-crema-50/80 underline decoration-crema-50/30 underline-offset-4 transition hover:text-crema-50"
        >
          I'd rather browse the page →
        </button>

        <div className="relative rounded-2xl bg-crema-50 p-6 pt-10 shadow-libro">
          {/* Federer sale por arriba de la tarjeta */}
          <div className="absolute -top-9 left-6">
            <FedererAvatar size={74} />
          </div>

          <div className="flex items-center justify-between">
            <div className="pl-[4.7rem]">
              <p className="font-serif text-[0.98rem] font-bold text-teal">Hydrogen Peroxide Tricks</p>
              <p className="flex items-center gap-1.5 text-[0.72rem] text-[#1a9e52]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22e06a]" /> online
              </p>
            </div>
            <div className="flex gap-1.5">
              {[0, 1].map((k) => (
                <span
                  key={k}
                  className={`h-1.5 rounded-full transition-all ${
                    k === paso ? "w-5 bg-oro" : k < paso ? "w-1.5 bg-teal" : "w-1.5 bg-arena"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="mt-4 min-h-[3.2rem] font-serif text-[1.15rem] leading-snug text-tinta sm:text-[1.28rem]">
            {typed}
            {!listo && (
              <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-teal align-middle" style={{ height: "1.1em" }} />
            )}
          </p>

          {paso === 0 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (nombre.trim()) setPaso(1);
              }}
              className={`mt-4 transition-opacity duration-300 ${listo ? "opacity-100" : "opacity-40"}`}
            >
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Type your name…"
                maxLength={24}
                className="w-full rounded-xl border-2 border-arena bg-white px-4 py-3 text-[1.05rem] text-tinta outline-none transition focus:border-teal"
              />
              <button
                type="submit"
                disabled={!nombre.trim()}
                className="boton-oro mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[1rem] font-bold text-bosque shadow-libro transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98] disabled:opacity-40"
              >
                Continue <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </form>
          ) : (
            <div className={`mt-4 space-y-2.5 transition-opacity duration-300 ${listo ? "opacity-100" : "opacity-40"}`}>
              {OBJETIVOS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => elegirObjetivo(o.id)}
                  className="group flex w-full items-center gap-3 rounded-xl border-2 border-arena bg-white px-4 py-3 text-left transition hover:border-teal hover:bg-teal-light"
                >
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-teal/10 text-teal transition group-hover:bg-teal group-hover:text-crema-50">
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-bold text-tinta">{o.t}</span>
                    <span className="block text-[0.82rem] text-tinta/60">{o.d}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
