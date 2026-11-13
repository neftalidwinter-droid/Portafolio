// src/data/shoesData.js
// =====================================================================
// DESAFÍO 3: el archivo ahora exporta un CATÁLOGO con varias siluetas.
// PRODUCT_DATA (XT-6) se conserva igual que en el laboratorio y se agregan Speedcross 6 y ACS Pro.
// Los datos técnicos y precios de los modelos nuevos son ilustrativos para la práctica.
// Las imágenes de los modelos nuevos reutilizan las URLs de Unsplash del laboratorio; puedes reemplazarlas por otras fotos si lo deseas.
// =====================================================================

// Fotos de Unsplash usadas en el laboratorio (reutilizadas abajo)
const IMG = {
  a: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
  b: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  c: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  d: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2",
  e: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  f: "https://images.unsplash.com/photo-1539185441755-769473a23570",
  g: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b",
  h: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9",
  i: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111",
  j: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b",
  k: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
  l: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
};

const thumb = (url) => `${url}?auto=format&fit=crop&w=300&q=80`;
const big = (url) => `${url}?auto=format&fit=crop&w=1200&q=85`;

// ---------------------------------------------------------------------
// 1) XT-6 (datos originales del laboratorio)
// ---------------------------------------------------------------------
export const PRODUCT_DATA = {
  id: "salomon-xt-6-skyline",
  name: "XT-6 EXPANSE / SKYLINE",
  subtitle: "Calzado de trail running legendario y moda técnica urbana",
  category: "Sportstyle",
  keywords: ["xt-6", "xt6", "sportstyle", "skyline", "expanse"],
  badge: "EDICIÓN LIMITADA",
  price: 195.0,
  currency: "EUR",
  rating: 4.85,
  reviewsCount: 142,
  description:
    "Lanzada originalmente en 2013, la XT-6 es la zapatilla preferida por atletas de ultra-distancia en las condiciones más duras. Hoy vuelve con colores y materiales actualizados, manteniendo el mismo nivel legendario de amortiguación, durabilidad y control cuesta abajo gracias al sistema Agile Chassis™.",
  technologies: [
    { title: "Agile Chassis™ System (ACS)", desc: "Proporciona estabilidad y amortiguación en conjunto con la entresuela EnergyCell+." },
    { title: "Mud Contagrip®", desc: "Diseñado para un agarre máximo en superficies resbaladizas, blandas y accidentadas." },
    { title: "Quicklace™", desc: "Cordones resistentes y minimalistas para atar de un tirón. Fácil de poner, fácil de quitar." },
    { title: "Malla anti-partículas", desc: "Malla ceñida que evita que quede polvo o gravilla atrapada entre el pie y la plantilla." },
  ],
  specs: {
    weight: "365 g",
    drop: "10 mm",
    cushioning: "Máxima",
    footProtection: "Alta",
    terrain: "Terreno mixto / Senderos rocosos",
  },
  variants: [
    {
      id: "v-phantom",
      colorName: "Black / Phantom / Vanilla",
      thumbnail: thumb(IMG.a),
      images: [big(IMG.a), big(IMG.b), big(IMG.c), big(IMG.d)],
    },
    {
      id: "v-white",
      colorName: "Vanilla Ice / Almond Milk / Silver",
      thumbnail: thumb(IMG.e),
      images: [big(IMG.e), big(IMG.f), big(IMG.g), big(IMG.h)],
    },
    {
      id: "v-trail",
      colorName: "Copen Blue / Fiery Red / Sulphur",
      thumbnail: thumb(IMG.i),
      images: [big(IMG.i), big(IMG.j), big(IMG.k), big(IMG.l)],
    },
  ],
  sizes: [
    { eur: "40", uk: "6.5", us: "7", stock: 4 },
    { eur: "40 2/3", uk: "7", us: "7.5", stock: 12 },
    { eur: "41 1/3", uk: "7.5", us: "8", stock: 8 },
    { eur: "42", uk: "8", us: "8.5", stock: 15 },
    { eur: "42 2/3", uk: "8.5", us: "9", stock: 0 }, // Out of stock
    { eur: "43 1/3", uk: "9", us: "9.5", stock: 6 },
    { eur: "44", uk: "9.5", us: "10", stock: 10 },
    { eur: "44 2/3", uk: "10", us: "10.5", stock: 3 },
    { eur: "45 1/3", uk: "10.5", us: "11", stock: 0 }, // Out of stock
    { eur: "46", uk: "11", us: "11.5", stock: 5 },
  ],
};

// ---------------------------------------------------------------------
// 2) Speedcross 6 (nuevo)
// ---------------------------------------------------------------------
export const SPEEDCROSS_6_DATA = {
  id: "salomon-speedcross-6",
  name: "SPEEDCROSS 6",
  subtitle: "Agarre agresivo para senderos blandos y lodosos",
  category: "Trail Running",
  keywords: ["speedcross", "speed cross", "trail", "lodo", "barro", "mud"],
  badge: "MÁS VENDIDO",
  price: 140.0,
  currency: "EUR",
  rating: 4.7,
  reviewsCount: 318,
  description:
    "La Speedcross 6 conserva sus icónicos tacos en forma de chevron para morder el terreno blando, ahora con un ajuste más preciso y una entresuela más cómoda para tiradas largas en montaña.",
  technologies: [
    { title: "Mud Contagrip® con tacos de 5 mm", desc: "Tacos profundos en forma de chevron para tracción en lodo y terreno suelto." },
    { title: "SensiFit™", desc: "Sistema que envuelve el pie desde la entresuela hasta los cordones para un ajuste seguro." },
    { title: "Quicklace™", desc: "Cordones de ajuste rápido con bolsillo para guardarlos." },
    { title: "Energy Foam", desc: "Espuma ligera que equilibra amortiguación y respuesta." },
  ],
  specs: {
    weight: "298 g",
    drop: "10 mm",
    cushioning: "Media",
    footProtection: "Alta",
    terrain: "Lodo / Terreno blando",
  },
  variants: [
    {
      id: "sc6-black",
      colorName: "Black / Black / Phantom",
      thumbnail: thumb(IMG.b),
      images: [big(IMG.b), big(IMG.a), big(IMG.k), big(IMG.d)],
    },
    {
      id: "sc6-blue",
      colorName: "Blue Ashes / Scarlet Ibis",
      thumbnail: thumb(IMG.j),
      images: [big(IMG.j), big(IMG.i), big(IMG.l), big(IMG.c)],
    },
  ],
  sizes: [
    { eur: "40", uk: "6.5", us: "7", stock: 7 },
    { eur: "40 2/3", uk: "7", us: "7.5", stock: 0 },
    { eur: "41 1/3", uk: "7.5", us: "8", stock: 9 },
    { eur: "42", uk: "8", us: "8.5", stock: 11 },
    { eur: "42 2/3", uk: "8.5", us: "9", stock: 2 },
    { eur: "43 1/3", uk: "9", us: "9.5", stock: 14 },
    { eur: "44", uk: "9.5", us: "10", stock: 0 },
    { eur: "44 2/3", uk: "10", us: "10.5", stock: 6 },
    { eur: "45 1/3", uk: "10.5", us: "11", stock: 4 },
    { eur: "46", uk: "11", us: "11.5", stock: 3 },
  ],
};

// ---------------------------------------------------------------------
// 3) ACS Pro (nuevo)
// ---------------------------------------------------------------------
export const ACS_PRO_DATA = {
  id: "salomon-acs-pro",
  name: "ACS PRO",
  subtitle: "Estética técnica de archivo Salomon para uso diario",
  category: "Sportstyle",
  keywords: ["acs", "acs pro", "sportstyle", "urbano", "advanced"],
  badge: "NUEVA TEMPORADA",
  price: 160.0,
  currency: "EUR",
  rating: 4.6,
  reviewsCount: 87,
  description:
    "La ACS Pro reinterpreta el chasis técnico de las zapatillas de trail de los 2000 con una parte superior en capas, protecciones termoselladas y una suela pensada tanto para la ciudad como para el sendero.",
  technologies: [
    { title: "Advanced Chassis System", desc: "Chasis que guía el pie y aporta estabilidad en terreno irregular." },
    { title: "Contagrip® MA", desc: "Compuesto de suela versátil para asfalto y senderos secos." },
    { title: "Quicklace™", desc: "Ajuste rápido con un solo tirón." },
    { title: "Protección termosellada", desc: "Refuerzos sin costuras en puntera y laterales." },
  ],
  specs: {
    weight: "340 g",
    drop: "9 mm",
    cushioning: "Media",
    footProtection: "Media",
    terrain: "Urbano / Senderos ligeros",
  },
  variants: [
    {
      id: "acs-silver",
      colorName: "Lunar Rock / Silver Metallic",
      thumbnail: thumb(IMG.f),
      images: [big(IMG.f), big(IMG.e), big(IMG.g), big(IMG.h)],
    },
    {
      id: "acs-green",
      colorName: "Olive Night / Black / Glacier",
      thumbnail: thumb(IMG.c),
      images: [big(IMG.c), big(IMG.d), big(IMG.a), big(IMG.l)],
    },
  ],
  sizes: [
    { eur: "40", uk: "6.5", us: "7", stock: 0 },
    { eur: "40 2/3", uk: "7", us: "7.5", stock: 5 },
    { eur: "41 1/3", uk: "7.5", us: "8", stock: 8 },
    { eur: "42", uk: "8", us: "8.5", stock: 3 },
    { eur: "42 2/3", uk: "8.5", us: "9", stock: 10 },
    { eur: "43 1/3", uk: "9", us: "9.5", stock: 0 },
    { eur: "44", uk: "9.5", us: "10", stock: 7 },
    { eur: "44 2/3", uk: "10", us: "10.5", stock: 4 },
    { eur: "45 1/3", uk: "10.5", us: "11", stock: 2 },
    { eur: "46", uk: "11", us: "11.5", stock: 1 },
  ],
};

// Catálogo completo que consume la barra de búsqueda
export const PRODUCTS_CATALOG = [PRODUCT_DATA, SPEEDCROSS_6_DATA, ACS_PRO_DATA];
