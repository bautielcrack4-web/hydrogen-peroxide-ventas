import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";
import { product } from "@/config/product";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: true },
};

export default function Privacidad() {
  return (
    <LegalShell titulo="Privacy Policy">
      <h2>What data we collect</h2>
      <p>
        This page has no forms and does not ask you for personal information. The
        only data about you that exists is what you provide at the time of
        purchase (name and email address), and that is handled by Hotmart as our
        payment processor.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To send you the guides and their updates.</li>
        <li>To answer your support questions.</li>
        <li>To process a refund if you request one.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        No one, except the providers required to make the service work: Hotmart
        (payment and delivery) and Vercel (hosting for this page). We do not sell
        or share your data with third parties for advertising.
      </p>

      <h2>Browsing data</h2>
      <p>
        Our host records aggregated, anonymous visit metrics (number of page
        views, approximate country). These cannot identify you and are not used
        for personalized advertising.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us at any time to access, correct or delete your data by
        writing to {product.soporteEmail}. We respond to your request within 30
        days.
      </p>
    </LegalShell>
  );
}
