import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hay otros package-lock.json más arriba en el árbol (C:\Users\bauti):
  // sin esto Next infiere mal la raíz del workspace.
  outputFileTracingRoot: raiz,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // El dominio corto drfederermetodo.vercel.app muestra el combo en su home.
  // DEBE ir en `beforeFiles`: los rewrites default (afterFiles) no se aplican
  // porque `/` ya matchea la página home (Salud) antes de evaluarse.
  async rewrites() {
    // Los dominios cortos muestran el COMBO en su home (rewrite por host).
    const combo = (value) => ({
      source: "/",
      has: [{ type: "host", value }],
      destination: "/metodo-completo",
    });
    return {
      beforeFiles: [
        combo("drfederermetodo.vercel.app"),
        combo("drfederer.com"),
        combo("www.drfederer.com"),
      ],
    };
  },
};

export default nextConfig;
