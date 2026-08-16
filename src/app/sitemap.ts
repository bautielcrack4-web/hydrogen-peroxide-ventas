import type { MetadataRoute } from "next";
import { product } from "@/config/product";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["", "/terminos", "/privacidad", "/aviso-medico"];
  return rutas.map((ruta) => ({
    url: `${product.siteUrl}${ruta}`,
    lastModified: new Date(),
    changeFrequency: ruta === "" ? "weekly" : "yearly",
    priority: ruta === "" ? 1 : 0.3,
  }));
}
