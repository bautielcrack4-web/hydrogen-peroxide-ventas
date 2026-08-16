import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";
import { product } from "@/config/product";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  robots: { index: false, follow: true },
};

export default function Terminos() {
  return (
    <LegalShell titulo="Terms & Conditions">
      <h2>What you are buying</h2>
      <p>
        {product.nombre} is a digital product (PDF files) with educational
        content about household cleaning, garden and repair uses. It is delivered
        by email immediately after your payment is confirmed. No printed material
        is shipped.
      </p>

      <h2>Payment</h2>
      <p>
        Payment is processed by Hotmart, which acts as the sales platform. It is
        a one-time payment: there is no subscription and no recurring charges. We
        never have access to your card details.
      </p>

      <h2>Guarantee and refunds</h2>
      <p>
        You have {product.garantiaDias} days from the date of purchase to request
        a full refund, no questions asked. Just write to {product.soporteEmail}{" "}
        or request it through the Hotmart platform.
      </p>

      <h2>Use of the content</h2>
      <p>
        Your purchase grants you a personal, non-transferable license to read and
        print the guides for your own use. You may not resell, distribute,
        publish or share them in groups or on social networks.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The content is informational and educational, and covers external,
        household use only. It is not medical or professional advice and does not
        guarantee results — every home and situation is different. The decision
        to apply any recommendation is the reader's own responsibility, and you
        do so at your own risk.
      </p>
    </LegalShell>
  );
}
