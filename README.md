# Archivos Federer — página de ventas

Landing de **La Guía Completa de la Salud Después de los 60** (Dr. Federer, USD 27,
checkout en Hotmart).

Next.js 15 (App Router) + TypeScript + Tailwind v3. Deploy en Vercel.

## Correr en local

```bash
npm install
npm run dev
```

## Dónde se edita cada cosa

| Qué | Dónde |
| --- | --- |
| Precio, checkout, correo de soporte, dominio | `src/config/product.ts` (o variables de entorno, ver `.env.example`) |
| **Todo el copy** de la página | `content/landing.ts` |
| Reseñas | `content/reviews.json` |
| Imágenes | `public/img/` |
| Colores y tipografías | `tailwind.config.ts` + `src/app/globals.css` |
| Orden de las secciones | `src/app/page.tsx` |

En el copy se pueden usar `**negritas**`: las renderiza `src/components/ui/Marcado.tsx`.

## Cargar reseñas

`content/reviews.json` es un array. Mientras esté vacío, la sección de reseñas
**no se renderiza** y no se declara `aggregateRating` en los datos estructurados
— a propósito: no se inventa prueba social.

```json
[
  {
    "texto": "Empecé por la sección de piernas y a la semana ya subía la escalera sin pararme.",
    "nombre": "María Elena",
    "pais": "México",
    "foto": "review-01.jpg",
    "origen": "compra"
  }
]
```

- `foto` (opcional): nombre del archivo dentro de `public/images/reviews/`.
  Proporción recomendada 3:4.
- `origen`: `"compra"` muestra el sello «Compra verificada»; `"youtube"` muestra
  «Comentario en YouTube». Si se omite, se asume `"compra"`.

## Decisiones que conviene no revertir

- **Sin contador regresivo.** La versión anterior tenía uno de 15 minutos que se
  reiniciaba en cada visita. En un público de 60+ la urgencia falsa quema la
  confianza, que es justamente lo que vende una guía firmada por un médico.
- **Sin promesas médicas.** Todo el copy habla de acompañar y cuidar, nunca de
  curar. Las páginas legales (`/aviso-medico`) están enlazadas en el pie.
- **Tipografía grande** (base 17px, cuerpo en peso 500). El lector tiene 60+.

## Deploy

Push a `main` → Vercel. El `vercel.json` fija el framework en `nextjs` para que
el proyecto (que antes era un HTML estático) se construya bien.
