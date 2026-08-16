// Prepara assets del combo: foto del autor + muro de testimonios combinado.
import sharp from "sharp";
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";

const D = "C:/Users/bauti/Downloads";
const ROOT = `${D}/archivos-federer-ventas`;
const REV_DIR = `${ROOT}/public/images/reviews`;
mkdirSync(REV_DIR, { recursive: true });

// 1) Foto del Dr. Federer para la bio (cuadrada, centrada arriba)
await sharp(`${D}/federer.png`)
  .resize(640, 640, { fit: "cover", position: "top" })
  .jpeg({ quality: 86 })
  .toFile(`${ROOT}/public/img/dr-federer.jpg`);
console.log("✓ dr-federer.jpg");

// 2) Copiar fotos de reseñas de Piel con prefijo piel- (evita choque con las .jpg de salud)
const pielFotosDir = `${D}/metodo-piel-joven/public/images/reviews`;
const salud = JSON.parse(readFileSync(`${ROOT}/content/reviews.json`, "utf8"));
const piel = JSON.parse(readFileSync(`${D}/metodo-piel-joven/content/reviews.json`, "utf8"));

// Salud (fotos review-XX.jpg ya están en el repo)
const saludItems = salud.map((r) => ({
  texto: r.texto,
  nombre: r.nombre,
  pais: r.pais || "",
  foto: r.foto ? `/images/reviews/${r.foto}` : "",
  origen: "salud",
}));
// Piel (copiar sus fotos con prefijo)
const pielItems = [];
for (const r of piel) {
  let foto = "";
  if (r.foto) {
    const src = `${pielFotosDir}/${r.foto}`;
    if (existsSync(src)) {
      const dst = `piel-${r.foto}`;
      copyFileSync(src, `${REV_DIR}/${dst}`);
      foto = `/images/reviews/${dst}`;
    }
  }
  pielItems.push({
    texto: r.texto,
    nombre: r.nombre,
    pais: r.pais || "",
    foto,
    origen: "piel",
  });
}

// Intercalar piel/salud para que el muro se vea variado desde el arranque
// (empieza por piel: es lo que engancha al público de belleza).
const out = [];
const n = Math.max(saludItems.length, pielItems.length);
for (let i = 0; i < n; i++) {
  if (pielItems[i]) out.push(pielItems[i]);
  if (saludItems[i]) out.push(saludItems[i]);
}
// Con foto primero (sort estable => mantiene el intercalado piel/salud)
out.sort((a, b) => (b.foto ? 1 : 0) - (a.foto ? 1 : 0));
writeFileSync(`${ROOT}/content/combo-reviews.json`, JSON.stringify(out, null, 2));
console.log(`✓ combo-reviews.json — ${out.length} testimonios (${out.filter((x) => x.foto).length} con foto)`);
