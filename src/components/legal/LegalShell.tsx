import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Ornamento from "@/components/ui/Ornamento";
import { product } from "@/config/product";

export default function LegalShell({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-crema">
      <header className="border-b border-arena bg-crema-100">
        <div className="contenedor flex items-center justify-between py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-teal hover:text-teal-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Volver
          </Link>
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-tinta/50">
            {product.marca}
          </span>
        </div>
      </header>

      <main className="contenedor py-14">
        <div className="mx-auto max-w-prosa">
          <h1 className="titulo-serif text-[2rem] sm:text-[2.5rem]">{titulo}</h1>
          <Ornamento className="my-8 !justify-start" />
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-tinta/85 [&_h2]:pt-4 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-tinta [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
          <p className="mt-12 border-t border-arena pt-6 text-sm text-tinta/55">
            Última actualización: julio de 2026. Ante cualquier duda, escríbanos
            a{" "}
            <a
              href={`mailto:${product.soporteEmail}`}
              className="font-semibold text-teal underline underline-offset-4"
            >
              {product.soporteEmail}
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
