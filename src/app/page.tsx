import { redirect } from "next/navigation";

// Toda la venta vive en /metodo-completo (el combo). La raíz redirige ahí.
export default function Home() {
  redirect("/metodo-completo");
}
