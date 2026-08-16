import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { faq } from "@content/landing";
import { product } from "@/config/product";

export default function FAQ() {
  return (
    <Section
      id="preguntas"
      tono="banda"
      etiqueta="Frequently asked questions"
      titulo="Before you start"
      centrado
    >
      <div className="mx-auto max-w-3xl">
        {faq.map((f, i) => (
          <Reveal key={f.q} delay={i * 40}>
            <details className="group border-b border-arena">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left text-[1.15rem] font-bold text-tinta marker:hidden hover:text-teal [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  className="mt-1 h-5 w-5 flex-none text-teal transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="pb-6 pr-8 text-[1.05rem] leading-relaxed text-tinta/75">
                {f.a}
              </p>
            </details>
          </Reveal>
        ))}

        <p className="mt-8 text-center text-[1.02rem] text-tinta/70">
          Still have a question? Email us at{" "}
          <a
            href={`mailto:${product.soporteEmail}`}
            className="font-bold text-teal underline decoration-arena decoration-2 underline-offset-4 hover:decoration-teal"
          >
            {product.soporteEmail}
          </a>{" "}
          and we'll get back to you.
        </p>
      </div>
    </Section>
  );
}
