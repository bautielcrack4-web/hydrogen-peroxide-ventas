/* dsc.js — descuento que se aplica solo + escalera REAL de Hotmart (paquete Rosa, oct-2026).
   Config en window.DSC antes de cargar este archivo:
   { key, lang:'es'|'en', cur:'US$', dec:',', ref:null|97, name:'el Manual',
     off:[o0,o1,o2], prc:[P,mid,normal], ck:'selector de los links de checkout que controla la escalera',
     hero:'#dsc-hero' (donde se arma la caja de precio), cta:'selector del botón de compra del hero (se mueve a la caja)',
     heroImg:'selector de la imagen principal', pat:/regex de P en el texto/, skip:'selectores donde no reemplazar',
     tb:true|'selector antes del cual va la barra', tbSticky:false }
   Reglas: precio mostrado = precio del checkout (cambia el off= de los links con URL.searchParams),
   el reloj NO se reinicia (momento guardado en localStorage), sólo transform/opacity, reduced-motion = instantáneo. */
(function () {
  var C = window.DSC; if (!C || !C.off || !C.prc) return;
  var D = document, H = D.documentElement, EN = C.lang === "en", HRS = 24, MEM = 0;
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var P = C.prc, NORMAL = P[2], REF = C.ref || null;
  var t = EN ? {
    look: "Finding your price…", apply: "Applying discount…", ok: "Discount applied!", claim: "Apply my discount",
    ends: "Ends in", saved: "You have a discount saved for today.", save: function (x) { return "With your discount you save " + x + " today."; },
    tbU: function (n, a, b) { return "You have a discount saved: " + n + " from " + a + " to " + b; }, tbUm: "You have a discount saved",
    tbA: function (n, p, x) { return "Discount applied: " + n + " for " + p + " · goes up to " + x + " in"; }, tbAm: function (x) { return "Goes up to " + x + " in"; },
    tbE: function (n, p) { return n + " · " + p; }, off: function (p) { return "−" + p + "% applied"; },
    tabU: "You have an unused discount", tabA: function (h) { return "Your price goes up in " + h + (h > 1 ? " hours" : " hour"); },
    aria: function (s) { return "Price " + s; }, day: function (d) { return d + (d > 1 ? " days " : " day "); }
  } : {
    look: "Buscando tu precio…", apply: "Aplicando descuento…", ok: "¡Descuento aplicado!", claim: "Aplicar mi descuento",
    ends: "Termina en", saved: "Tienes un descuento guardado para hoy.", save: function (x) { return "Con tu descuento ahorras " + x + " hoy."; },
    tbU: function (n, a, b) { return "Tienes un descuento guardado: " + n + " de " + a + " a " + b; }, tbUm: "Tienes un descuento guardado",
    tbA: function (n, p, x) { return "Descuento aplicado: " + n + " por " + p + " · sube a " + x + " en"; }, tbAm: function (x) { return "Sube a " + x + " en"; },
    tbE: function (n, p) { return n + " · " + p; }, off: function (p) { return "−" + p + " % aplicado"; },
    tabU: "Tienes un descuento sin usar", tabA: function (h) { return "Tu precio sube en " + h + (h > 1 ? " horas" : " hora"); },
    aria: function (s) { return "Precio " + s; }, day: function (d) { return d + (d > 1 ? " días " : " día "); }
  };
  if (C.txt) for (var tk in C.txt) t[tk] = C.txt[tk]; // textos propios de una landing (p. ej. barra más corta)
  var dec = C.dec || (EN ? "." : ","), cur = C.cur || "US$";
  function num(n) { return (Math.round(n * 100) % 100 ? n.toFixed(2) : String(Math.round(n))).replace(".", dec); }
  function money(n) { return cur + (C.sp === false ? "" : " ") + num(n); }
  function getT0() { var v = 0; try { v = +localStorage.getItem(C.key) || 0; } catch (e) {} v = v || MEM; return v && v <= Date.now() ? v : 0; }
  function stage() { var v = getT0(); return v ? Math.min(2, Math.floor((Date.now() - v) / (HRS * 36e5))) : -1; }
  var S = { st: -1, dl: 0 };

  // ---- 1) marcar en el texto de la página cada aparición del precio actual (para mostrar siempre lo que cobra el checkout)
  var CURP = null, skip = ".dsc-box,.dsc-tb,.dsc-p,script,style,noscript,s,del" + (C.skip ? "," + C.skip : "");
  // C.pat = precio principal; C.more = [{pat, div}] para "por receta / por arreglo" (precio ÷ div, siempre con 2 decimales)
  //          o [{pat, pct: precioDeReferencia}] para "Ahorras 53 %" (porcentaje entero contra esa referencia)
  var PATS = [{ re: C.pat, f: null }].concat((C.more || []).map(function (x) {
    //      o [{pat, sub: referencia}] para "SAVE $40" (referencia − precio)
    return x.pct ? { re: x.pat, i: 1, f: function (v) { return (x.pct - v) / x.pct * 100; } } : x.sub ? { re: x.pat, n: 1, f: function (v) { return Math.round((x.sub - v) * 100) / 100; } } : { re: x.pat, f: function (v) { return v / x.div; } }; }));
  function fmt(k, v) { var Q = PATS[k], f = Q.f; return !f ? num(v) : Q.i ? String(Math.round(f(v))) : Q.n ? num(f(v)) : f(v).toFixed(2).replace(".", dec); }
  function WIDE(k, pre) { return [P[0], P[1], NORMAL].map(function (x) { return pre + fmt(k, x); }).sort(function (a, b) { return b.length - a.length; })[0]; }
  function wrap(root) {
    PATS.forEach(function (Q, k) {
      if (!Q.re || !root) return;
      var nodes = [], n, w;
      if (root.nodeType === 3) { if (root.parentNode) nodes = [root]; }
      else { w = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, null); while ((n = w.nextNode())) nodes.push(n); }
      nodes.forEach(function (tn) {
        var s = tn.nodeValue, pe = tn.parentNode, re0 = new RegExp(Q.re.source);
        if (!pe || !re0.test(s) || (pe.closest && pe.closest(skip))) return;
        var frag = D.createDocumentFragment(), last = 0, m, re = new RegExp(Q.re.source, "g");
        while ((m = re.exec(s))) {
          frag.appendChild(D.createTextNode(s.slice(last, m.index)));
          // el precio reserva el ancho del más largo (data-w): cambiar de precio no reacomoda renglones ni botones
          var sp = D.createElement("span"), iv = D.createElement("span"); sp.className = "dsc-p"; sp.setAttribute("data-pre", m[1] || ""); sp.setAttribute("data-k", k); sp.setAttribute("data-w", WIDE(k, m[1] || ""));
          iv.textContent = CURP === null ? m[0] : (m[1] || "") + fmt(k, CURP); sp.appendChild(iv);
          frag.appendChild(sp); last = m.index + m[0].length;
        }
        frag.appendChild(D.createTextNode(s.slice(last))); pe.replaceChild(frag, tn);
        if (root === tn) root = null;
      });
    });
  }
  wrap(D.body);
  // lo que la página agregue después (respuestas, carruseles…) también muestra el precio vigente
  if ((C.pat || C.more) && C.watch !== false && "MutationObserver" in window) new MutationObserver(function (ms) {
    ms.forEach(function (m) { m.addedNodes.forEach(function (x) { if (x.nodeType === 1 || x.nodeType === 3) wrap(x); }); });
  }).observe(D.body, { childList: true, subtree: true });

  // ---- 2) barra superior de alto contraste (alto reservado: no salta cuando aparece el reloj)
  var tb = null;
  if (C.tb !== false && (tb = D.querySelector(".dsc-tb"))) { /* ya la dibujó la página (Next.js): se adopta */ }
  else if (C.tb !== false) {
    tb = D.createElement("div"); tb.className = "dsc-tb" + (C.tbSticky ? " dsc-sticky" : ""); tb.setAttribute("role", "note");
    tb.innerHTML = '<span class="dsc-dk"></span><span class="dsc-mb"></span><b class="dsc-cd" aria-hidden="true">23:59:59</b>';
    var before = typeof C.tb === "string" ? D.querySelector(C.tb) : null;
    if (before) before.parentNode.insertBefore(tb, before); else D.body.insertBefore(tb, D.body.firstChild);
  }

  // ---- 3) caja de precio del hero: tachado · precio (odómetro) · reloj al lado · botón que se funde en el de compra
  var box = D.querySelector(C.hero), cta = C.cta ? D.querySelector(C.cta) : null, odo = null, hb = null, HL = null, note = null, wasEl = null, tag = null;
  if (box && box.querySelector(".dsc-pline")) {
    // caja ya dibujada por la página (Next.js): sólo se toman las referencias, no se mueve nada del DOM de React
    box.classList.add("dsc-box");
    odo = box.querySelector(".dsc-odo"); hb = box.querySelector(".dsc-claim"); HL = hb.querySelector(".dsc-lbl"); note = box.querySelector(".dsc-note");
    wasEl = box.querySelector(".dsc-was"); tag = box.querySelector(".dsc-tag");
  } else if (box) {
    box.classList.add("dsc-box");
    box.innerHTML = '<div class="dsc-pline"><s class="dsc-was"></s><span class="dsc-pr" role="text"><span class="dsc-odo" aria-hidden="true"><span class="dsc-o1"></span><span class="dsc-o2"></span><span class="dsc-o3"></span></span></span>' +
      '<span class="dsc-clock" aria-hidden="true"><small>' + t.ends + '</small><b class="dsc-cd">24:00:00</b></span><span class="dsc-tag"></span></div>' +
      '<div class="dsc-swap"><button type="button" class="dsc-claim"><span class="dsc-okbg"></span><svg class="dsc-okck" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" stroke="currentColor" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="dsc-lbl">' + t.claim + '</span></button></div>' +
      '<p class="dsc-note"><span class="dsc-n0"></span><span class="dsc-n1"></span></p>';
    if (cta) box.querySelector(".dsc-swap").appendChild(cta);
    odo = box.querySelector(".dsc-odo"); hb = box.querySelector(".dsc-claim"); HL = hb.querySelector(".dsc-lbl"); note = box.querySelector(".dsc-note");
    wasEl = box.querySelector(".dsc-was"); tag = box.querySelector(".dsc-tag");
    // el odómetro tiene SIEMPRE las 3 capas: el ancho no cambia nunca (cero saltos)
    box.querySelector(".dsc-o1").textContent = num(NORMAL); box.querySelector(".dsc-o2").textContent = num(P[1]); box.querySelector(".dsc-o3").textContent = num(P[0]);
    box.querySelector(".dsc-pr").insertAdjacentHTML("afterbegin", '<span class="dsc-c">' + cur + "</span>");
  }

  function setOdo(v) { if (!odo) return; odo.setAttribute("data-v", v); box.querySelector(".dsc-pr").setAttribute("aria-label", t.aria(money([P[2], P[1], P[0]][v]))); }
  function txt(sel, s) { if (!tb) return; var e = tb.querySelector(sel); if (e) e.textContent = s; }

  // ---- 4) aplicar el estado de la escalera a TODO (textos, links de checkout, barra, caja)
  function apply() {
    var st = stage(), v0 = getT0(), pz = st < 0 ? NORMAL : P[st], nx = st >= 0 && st < 2 ? P[st + 1] : 0;
    S.st = st; S.dl = st >= 0 && st < 2 ? v0 + (st + 1) * HRS * 36e5 : 0;
    H.classList.toggle("dsc-unc", st < 0); H.classList.toggle("dsc-applied", st >= 0 && st < 2); H.classList.toggle("dsc-end", st === 2);
    var was = REF || (st === 2 ? 0 : NORMAL);
    CURP = pz;
    D.querySelectorAll(".dsc-p:not([data-r])").forEach(function (e) { (e.firstChild || e).textContent = e.getAttribute("data-pre") + fmt(+e.getAttribute("data-k") || 0, pz); });
    if (C.ck) D.querySelectorAll(C.ck).forEach(function (a) { try { var u = new URL(a.href); u.searchParams.set("off", C.off[st < 0 ? 2 : st]); a.href = u.toString(); } catch (e) {} });
    if (box) {
      setOdo(st < 0 ? 0 : st === 2 ? 0 : st === 1 ? 1 : 2);
      wasEl.textContent = money(REF || NORMAL); wasEl.classList.toggle("dsc-wh", !(was && was > pz));
      tag.textContent = st >= 0 && st < 2 && was > pz ? t.off(Math.round((was - pz) / was * 100)) : "";
      // las 2 frases ocupan siempre su lugar (una invisible): la nota mide lo mismo antes y después de aplicar
      var p0 = st < 0 ? P[0] : pz, w0 = REF || NORMAL;
      note.firstChild.textContent = t.saved; note.lastChild.textContent = st < 2 && w0 > p0 ? t.save(money(Math.round((w0 - p0) * 100) / 100)) : "";
      note.classList.toggle("dsc-n-on", st >= 0);
    }
    // la página puede recalcular lo suyo (calculadoras) con el precio vigente
    try { D.dispatchEvent(new CustomEvent("dsc:apply", { detail: pz })); } catch (e) {}
    if (tb) {
      if (st < 0) { txt(".dsc-dk", t.tbU(C.name, money(NORMAL), money(P[0]))); txt(".dsc-mb", t.tbUm); }
      else if (st < 2) { txt(".dsc-dk", t.tbA(C.name, money(pz), money(nx))); txt(".dsc-mb", t.tbAm(money(nx))); }
      else { txt(".dsc-dk", t.tbE(C.name, money(pz))); txt(".dsc-mb", t.tbE(C.name, money(pz))); }
    }
  }

  // ---- 5) reloj: cuenta hasta el próximo escalón REAL (no se reinicia: depende del momento guardado)
  function pad(x) { return (x < 10 ? "0" : "") + x; }
  function tick() {
    if (!S.dl) return;
    var s = Math.floor((S.dl - Date.now()) / 1000);
    if (s <= 0) { apply(); tick(); return; }
    H.classList.toggle("dsc-urge", s < 3 * 3600);
    var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    var str = (d ? t.day(d) : "") + pad(h) + ":" + pad(m) + ":" + pad(x);
    D.querySelectorAll(".dsc-cd").forEach(function (c) { c.textContent = str; });
  }

  // ---- 6) aplicar el descuento (la 1ª vez) con la secuencia del hero
  function claim(quiet) {
    if (stage() >= 0) return;
    MEM = Date.now(); try { localStorage.setItem(C.key, String(MEM)); } catch (e) {}
    var anim = box && !RM && H.classList.contains("dsc-fx") && !quiet;
    if (anim) { setOdo(0); }
    apply(); tick();
    if (!anim) return;
    var sw = box.querySelector(".dsc-swap"), pl = box.querySelector(".dsc-pline"), pr = box.querySelector(".dsc-pr"), junk = [];
    sw.classList.add("dsc-hold"); hb.classList.remove("dsc-auto"); hb.classList.add("dsc-ok"); HL.textContent = t.ok;
    odo.setAttribute("data-v", "0"); void odo.offsetWidth; odo.classList.add("dsc-roll");
    var cx = pr.offsetLeft + pr.offsetWidth / 2, cy = pr.offsetTop + pr.offsetHeight / 2;
    var gl = D.createElement("i"); gl.className = "dsc-glow"; gl.style.left = cx + "px"; gl.style.top = cy + "px"; pl.appendChild(gl); junk.push(gl);
    for (var i = 0; i < 8; i++) {
      var k = D.createElement("i"), a = i / 8 * 6.283 + .4, r = (pr.offsetWidth / 2 + 18) * (i % 2 ? 1.05 : .85); k.className = "dsc-spk";
      k.style.cssText = "left:" + Math.round(cx + Math.cos(a) * r - 8) + "px;top:" + Math.round(cy + Math.sin(a) * r * .55 - 8) + "px;--d:" + (2 + i * .08).toFixed(2) + "s;--s:" + (i % 3 ? 12 : 18) + "px";
      pl.appendChild(k); junk.push(k);
    }
    box.classList.add("dsc-show"); if (tb) tb.classList.add("dsc-tbin");
    setTimeout(function () { sw.classList.add("dsc-done"); }, 3000);
    setTimeout(function () {
      sw.classList.remove("dsc-hold", "dsc-done"); hb.classList.remove("dsc-ok"); odo.classList.remove("dsc-roll"); setOdo(2);
      junk.forEach(function (x) { x.remove(); }); box.classList.remove("dsc-show"); if (tb) tb.classList.remove("dsc-tbin");
    }, 4000);
  }

  // el botón "aplicar" mide lo mismo que el de compra (el cambio de uno por otro no mueve nada)
  function fit() { if (hb && cta) { hb.style.width = ""; var w2 = parseFloat(getComputedStyle(cta).width); if (w2) hb.style.width = w2 + "px"; } }
  fit(); addEventListener("resize", fit); if (D.fonts && D.fonts.ready) D.fonts.ready.then(fit);
  if (!RM && "IntersectionObserver" in window) H.classList.add("dsc-fx");
  apply(); tick(); setInterval(tick, 1000);
  if (hb) hb.addEventListener("click", function () { claim(false); });

  // ---- 7) 1ª visita: se aplica solo (barra de carga 3,4 s tras la imagen del hero, pestaña visible); scroll > 60 px lo adelanta
  if (stage() < 0) {
    if (!box || RM || !H.classList.contains("dsc-fx")) claim(true);
    else {
      var lab = function (s) { HL.classList.add("dsc-out"); setTimeout(function () { HL.textContent = s; HL.classList.remove("dsc-out"); }, 260); };
      HL.textContent = t.look;
      var go2 = function () { hb.classList.add("dsc-auto"); setTimeout(function () { if (stage() < 0) lab(t.apply); }, 1500); setTimeout(function () { if (stage() < 0) claim(false); }, 3400); };
      var started = false, ready = function () {
        if (started) return; started = true;
        if (D.hidden) D.addEventListener("visibilitychange", function v() { if (!D.hidden) { D.removeEventListener("visibilitychange", v); go2(); } }); else go2();
      };
      var im = C.heroImg ? D.querySelector(C.heroImg) : null;
      if (!im || (im.complete && im.naturalWidth)) ready(); else { im.addEventListener("load", ready); im.addEventListener("error", ready); setTimeout(ready, 4000); }
      addEventListener("scroll", function sc() { if (scrollY < 60) return; removeEventListener("scroll", sc); if (stage() < 0) claim(false); }, { passive: true });
    }
  }

  // ---- 8) un clic de compra ANTES de aplicar: se aplica en el acto y el link ya sale con el precio con descuento
  D.addEventListener("click", function (e) {
    var a = e.target.closest && C.ck && e.target.closest(C.ck); if (!a) return;
    if (stage() < 0) claim(true);
    try { var u = new URL(a.href); var st = stage(); u.searchParams.set("off", C.off[st < 0 ? 2 : st]); a.href = u.toString(); } catch (er) {}
  }, true);

  // ---- 9) pestaña oculta: el título recuerda cuánto queda
  var TT = D.title;
  D.addEventListener("visibilitychange", function () {
    if (!D.hidden) { D.title = TT; return; }
    if (S.st < 0) D.title = t.tabU;
    else if (S.st < 2) { var h = Math.max(1, Math.ceil((S.dl - Date.now()) / 36e5)); D.title = t.tabA(h); }
  });
  window.__dsc = { stage: stage, apply: apply, off: function () { var st = stage(); return C.off[st < 0 ? 2 : st]; }, p: function () { return CURP === null ? NORMAL : CURP; }, price: function () { return money(CURP === null ? NORMAL : CURP); } };
})();
