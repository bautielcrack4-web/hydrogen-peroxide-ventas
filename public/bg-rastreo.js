/* Bagasy · rastreo de ventas por VIDEO.
 * Guarda el código con el que llegó el visitante (?src=fa-cafe, el que va en la descripción de
 * cada video de YouTube) y se lo agrega a TODO link o checkout incrustado de Hotmart como `sck`.
 * Hotmart lo devuelve en cada venta (purchase.tracking.source_sck) y Bagasy → Mis ingresos →
 * Hotmart muestra qué video trajo cada venta. NO toca el `src` (lo usan las puertas de la landing).
 * El código dura 30 días en el navegador (alguien que vuelve a comprar después sigue contando).
 */
(function () {
  try {
    var q = new URLSearchParams(location.search);
    var nuevo = q.get("sck") || q.get("src") || q.get("utm_content");
    if (nuevo && /^[\w.-]{1,60}$/.test(nuevo)) localStorage.setItem("bg_sck", JSON.stringify({ v: nuevo, t: Date.now() }));
    var g = JSON.parse(localStorage.getItem("bg_sck") || "null");
    if (!g || Date.now() - g.t > 30 * 864e5) return;
    var code = g.v;
    var tag = function (el, attr) {
      var u = el.getAttribute(attr);
      if (!u || u.indexOf("hotmart") < 0) return;
      try {
        var x = new URL(u, location.href);
        if (x.searchParams.get("sck") === code) return;
        x.searchParams.set("sck", code);
        el.setAttribute(attr, x.toString());
      } catch (e) {}
    };
    var barrer = function (root) {
      if (!root || !root.querySelectorAll) return;
      root.querySelectorAll('a[href*="hotmart"]').forEach(function (a) { tag(a, "href"); });
      root.querySelectorAll('iframe[src*="hotmart"]').forEach(function (f) { tag(f, "src"); });
    };
    barrer(document);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === "attributes") { tag(m.target, m.attributeName); return; }
        m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.matches && n.matches('a[href*="hotmart"]')) tag(n, "href");
          if (n.matches && n.matches('iframe[src*="hotmart"]')) tag(n, "src");
          barrer(n);
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "src"] });
  } catch (e) {}
})();
