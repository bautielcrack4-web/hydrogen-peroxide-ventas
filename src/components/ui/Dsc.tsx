/**
 * Descuento que se aplica solo en la primera visita (kit dsc, D:/rtmp/dsc/kit).
 * React dibuja la caja, la barra y los precios; public/dsc/dsc.js los ADOPTA y sólo
 * cambia textos, clases y el off= de los links (no mueve nodos de React).
 * Escalera real de Hotmart: P (24 h) → medio (24 h) → normal. Precio mostrado = precio cobrado.
 */
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Script from "next/script";

export const DSC = { key: "hpx_dsc_t0", lang: "en", cur: "$", sp: false as boolean, ref: 180 as number | null, name: "The Complete Method",
  off: ["rjbt4ncv", "qpoguer5", "wexn2km4"], prc: [47, 62.99, 77.99], pat: null,
  more: [{ sub: 180 }, { pct: 180 }], // k=1 "Save $X" against the $180 value · k=2 % off
  ck: 'a[href*="pay.hotmart.com/H107184004X"]', hero: "#dsc-hero", cta: "#dsc-cta", heroImg: ".dsc-heroimg img", tb: true, txt: { tbUm: "You have a discount" } };

const EN = DSC.lang === "en";
const P = DSC.prc;
const NORMAL = P[2];
const dec = EN ? "." : ",";
const num = (n: number) => (Math.round(n * 100) % 100 ? n.toFixed(2) : String(Math.round(n))).replace(".", dec);
export const money = (n: number) => DSC.cur + (DSC.sp === false ? "" : " ") + num(n);
const T = EN
  ? { ends: "Ends in", claim: "Apply my discount", saved: "You have a discount saved for today.", save: (x: string) => "With your discount you save " + x + " today.",
      tbU: (n: string, a: string, b: string) => "You have a discount saved: " + n + " from " + a + " to " + b, tbUm: (DSC as { txt?: { tbUm?: string } }).txt?.tbUm || "You have a discount saved", aria: (s: string) => "Price " + s }
  : { ends: "Termina en", claim: "Aplicar mi descuento", saved: "Tienes un descuento guardado para hoy.", save: (x: string) => "Con tu descuento ahorras " + x + " hoy.",
      tbU: (n: string, a: string, b: string) => "Tienes un descuento guardado: " + n + " de " + a + " a " + b, tbUm: (DSC as { txt?: { tbUm?: string } }).txt?.tbUm || "Tienes un descuento guardado", aria: (s: string) => "Precio " + s };

/** Link de checkout con la oferta vigente (sin JS = precio normal, que es lo que muestra la página sin JS). */
export function conOferta(href: string) {
  try {
    const u = new URL(href, "https://pay.hotmart.com");
    const w = typeof window !== "undefined" ? (window as unknown as { __dsc?: { off: () => string } }).__dsc : undefined;
    u.searchParams.set("off", w ? w.off() : DSC.off[2]);
    return u.toString();
  } catch {
    return href;
  }
}

// C.more sin patrón: k=1.. → {sub: ref} (ref − precio), {add: n} (n + precio), {pct: ref} (% entero), {div: n} (precio ÷ n)
type More = { sub?: number; pct?: number; div?: number; add?: number };
const MORE: More[] = (DSC as { more?: More[] }).more || [];
function fmtK(k: number, v: number) {
  if (!k) return num(v);
  const x = MORE[k - 1];
  if (x.pct) return String(Math.round(((x.pct - v) / x.pct) * 100));
  if (x.sub) return num(Math.round((x.sub - v) * 100) / 100);
  if (x.add) return num(Math.round((x.add + v) * 100) / 100);
  return (v / (x.div || 1)).toFixed(2).replace(".", dec);
}

/** Precio vigente del escalón (lo avisa el kit con el evento dsc:apply). Sin JS = precio normal. */
export function usePrecio() {
  const [p, setP] = useState(NORMAL);
  useEffect(() => {
    const w = (window as unknown as { __dsc?: { p: () => number } }).__dsc;
    if (w) setP(w.p());
    const on = (e: Event) => setP((e as CustomEvent<number>).detail);
    document.addEventListener("dsc:apply", on);
    return () => document.removeEventListener("dsc:apply", on);
  }, []);
  return p;
}

/** Precio vigente dentro de un texto (k=0 precio; k≥1 = DSC.more). Reserva el ancho del más largo: no mueve el renglón. */
export function Precio({ k = 0, pre = DSC.cur }: { k?: number; pre?: string }) {
  const p = usePrecio();
  const w = [P[0], P[1], NORMAL].map((x) => pre + fmtK(k, x)).sort((a, b) => b.length - a.length)[0];
  return (
    <span className="dsc-p" data-r="" data-w={w}>
      <span>{pre + fmtK(k, p)}</span>
    </span>
  );
}

/** En el <head>: marca el escalón ANTES de pintar, así la caja ya tiene su forma final (cero saltos al volver). */
export function DscHead() {
  const js = 'try{var v=+localStorage.getItem("' + DSC.key + '")||0;if(v&&v<=Date.now()){var s=Math.floor((Date.now()-v)/864e5);document.documentElement.classList.add(s>=2?"dsc-end":"dsc-applied")}}catch(e){}';
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}

/** Config + script del kit (en el layout). Corre DESPUÉS de hidratar: si tocara el DOM antes, React lo re-dibujaría. */
export function DscScript() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "window.DSC=" + JSON.stringify(DSC) + ";" }} />
      <Script src="/dsc/dsc.js" strategy="afterInteractive" />
    </>
  );
}

/** Barra superior de alto contraste (el reloj aparece al aplicar el descuento; alto reservado). */
export function DscBarra({ className = "" }: { className?: string }) {
  return (
    <div className={"dsc-tb " + className} role="note" suppressHydrationWarning>
      <span className="dsc-dk" suppressHydrationWarning>{T.tbU(DSC.name, money(NORMAL), money(P[0]))}</span>
      <span className="dsc-mb" suppressHydrationWarning>{T.tbUm}</span>
      <b className="dsc-cd" aria-hidden="true" suppressHydrationWarning>23:59:59</b>
    </div>
  );
}

/** Caja del hero: tachado · precio (odómetro) · reloj · botón "Aplicar" que se funde en el de compra (children). */
export function DscCaja({ children, narrow }: { children: ReactNode; narrow?: boolean }) {
  const was = DSC.ref || NORMAL;
  return (
    <div id="dsc-hero" className={"dsc-box" + (narrow ? " dsc-narrow" : "")} suppressHydrationWarning>
      <div className="dsc-pline" suppressHydrationWarning>
        <s className={"dsc-was" + (DSC.ref ? "" : " dsc-wh")} suppressHydrationWarning>{money(was)}</s>
        <span className="dsc-pr" role="text" aria-label={T.aria(money(NORMAL))} suppressHydrationWarning>
          <span className="dsc-c">{DSC.cur}</span>
          <span className="dsc-odo" aria-hidden="true" data-v="0" suppressHydrationWarning>
            <span className="dsc-o1">{num(NORMAL)}</span>
            <span className="dsc-o2">{num(P[1])}</span>
            <span className="dsc-o3">{num(P[0])}</span>
          </span>
        </span>
        <span className="dsc-clock" aria-hidden="true">
          <small>{T.ends}</small>
          <b className="dsc-cd" suppressHydrationWarning>24:00:00</b>
        </span>
        <span className="dsc-tag" suppressHydrationWarning></span>
      </div>
      <div className="dsc-swap" suppressHydrationWarning>
        <button type="button" className="dsc-claim" suppressHydrationWarning>
          <span className="dsc-okbg"></span>
          <svg className="dsc-okck" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="dsc-lbl" suppressHydrationWarning>{T.claim}</span>
        </button>
        {children}
      </div>
      <p className="dsc-note" suppressHydrationWarning>
        <span className="dsc-n0" suppressHydrationWarning>{T.saved}</span>
        <span className="dsc-n1" suppressHydrationWarning>{T.save(money(Math.round((was - P[0]) * 100) / 100))}</span>
      </p>
    </div>
  );
}
