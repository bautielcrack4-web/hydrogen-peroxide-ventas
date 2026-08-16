import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Disclaimer",
  robots: { index: false, follow: true },
};

export default function AvisoMedico() {
  return (
    <LegalShell titulo="Disclaimer">
      <p>
        The content of this page and of the guides is for general informational
        and educational purposes only. The tips describe household cleaning,
        garden and repair uses for standard 3% hydrogen peroxide — the kind sold
        in the brown drugstore bottle.
      </p>

      <h2>What these guides are not</h2>
      <ul>
        <li>This is not medical, health or professional advice.</li>
        <li>
          Hydrogen peroxide is presented here strictly for external, household
          use — never for ingesting, inhaling or applying to the body.
        </li>
        <li>
          Nothing here claims to treat, cure or prevent any illness or condition.
        </li>
        <li>We do not guarantee any specific result.</li>
      </ul>

      <h2>Results vary</h2>
      <p>
        Homes, surfaces, materials, stains and conditions are all different, so
        your results may differ from the examples shown. Always test on a small,
        hidden area first, and follow the directions and warnings on the product
        label.
      </p>

      <h2>Use it safely</h2>
      <ul>
        <li>
          For external, household use only. Keep out of reach of children and
          pets.
        </li>
        <li>
          Never mix hydrogen peroxide with bleach, ammonia, vinegar or other
          cleaners unless a trusted source specifically says it is safe.
        </li>
        <li>
          Wear gloves and work in a well-ventilated area; avoid contact with
          eyes and skin.
        </li>
        <li>
          Store it in its original container, away from heat and direct light.
        </li>
      </ul>

      <p>
        In case of accidental swallowing, eye contact or any emergency, call your
        local poison control center or emergency services right away. You use any
        recommendation in these guides at your own risk.
      </p>
    </LegalShell>
  );
}
