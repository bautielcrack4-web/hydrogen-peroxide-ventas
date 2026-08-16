import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { product } from "@/config/product";

// Cuerpo: Inter en pesos medios/altos — máxima legibilidad.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// Títulos: Archivo — grotesca limpia, MUY legible y con pesos fuertes
// (hasta 900) para mantener el impacto sin sacrificar lectura. Se expone
// como --font-bitter para que `font-serif`/`titulo-serif` la usen.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-bitter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
};

export const metadata: Metadata = {
  metadataBase: new URL(product.siteUrl),
  title: {
    default: product.nombre,
    template: "%s · Hydrogen Peroxide Tricks",
  },
  description: product.subtitulo,
  keywords: [
    "hydrogen peroxide",
    "hydrogen peroxide tricks",
    "hydrogen peroxide uses",
    "home cleaning",
    "cleaning tips",
    "save on repairs",
    "garden",
    "remove stains and mold",
  ],
  authors: [{ name: product.marca }],
  alternates: { canonical: product.siteUrl },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: product.siteUrl,
    siteName: product.marca,
    title: product.nombre,
    description: product.subtitulo,
    images: [
      {
        url: product.portada,
        width: 900,
        height: 1350,
        alt: product.nombre,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: product.nombre,
    description: product.subtitulo,
    images: [product.portada],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <head>
        {/* Widget de checkout de Hotmart: abre el pago como overlay (checkoutMode=2) */}
        <link
          rel="stylesheet"
          href="https://static.hotmart.com/css/hotmart-fb.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Script
          src="https://static.hotmart.com/checkout/widget.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
