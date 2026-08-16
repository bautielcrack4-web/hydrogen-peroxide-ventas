import Link from "next/link";
import Ornamento from "@/components/ui/Ornamento";
import { product } from "@/config/product";

const enlaces = [
  { href: "/terminos", texto: "Terms & Conditions" },
  { href: "/privacidad", texto: "Privacy Policy" },
  { href: "/aviso-medico", texto: "Legal Notice" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c0c0f] pb-24 pt-14 text-crema-200/70 sm:pb-14">
      <div className="contenedor text-center">
        <Ornamento color="text-oro" />
        <p className="mt-6 font-serif text-lg font-bold uppercase tracking-[0.22em] text-crema-100">
          {product.marca}
        </p>
        <p className="mt-1 text-sm">Home · Garden · Repairs</p>

        <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm font-semibold">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="underline decoration-crema-200/30 underline-offset-4 transition hover:text-crema-100 hover:decoration-oro"
            >
              {e.texto}
            </Link>
          ))}
          <a
            href={`mailto:${product.soporteEmail}`}
            className="underline decoration-crema-200/30 underline-offset-4 transition hover:text-crema-100 hover:decoration-oro"
          >
            {product.soporteEmail}
          </a>
        </nav>

        <p className="mx-auto mt-8 max-w-2xl border-t border-crema-200/12 pt-7 text-xs leading-relaxed text-crema-200/50">
          Hydrogen peroxide (3%, the brown drugstore bottle) is a household
          product. These guides cover cleaning, home, garden and maintenance
          uses only: they do not include or recommend any internal or medical
          use. Always follow the safety instructions, test first in an
          inconspicuous spot, and keep the area ventilated. Results vary from
          one surface to another.
        </p>
        <p className="mt-4 text-xs text-crema-200/40">
          © {new Date().getFullYear()} {product.marca}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
