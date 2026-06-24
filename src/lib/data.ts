export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
}

export const collections: Collection[] = [
  {
    id: "1",
    slug: "spring-summer-2027",
    title: "SS27 Horizon",
    description: "Bright, minimalist silhouettes redefining modern daytime luxury.",
    longDescription: "The Spring/Summer 2027 'Horizon' collection captures the essence of a modern awakening. Using ultra-lightweight fabrics, stark whites, and flashes of our signature Maison red, it delivers an airy yet striking aesthetic. Tailoring is relaxed but precise, designed for the individual who moves seamlessly through the global metropolis.",
    image: "/images/collection-ss.png"
  },
  {
    id: "2",
    slug: "fall-winter-2027",
    title: "FW27 Eclipse",
    description: "Moody, high-contrast tailoring in deep blacks and structured lines.",
    longDescription: "Embracing the shadows, 'Eclipse' is our Fall/Winter 2027 statement. This collection focuses on heavy, textured materials like raw wool and structured leather. Deep, monolithic blacks dominate, complemented by sharp, architectural silhouettes that provide both armor and elegance against the cold.",
    image: "/images/collection-fw.png"
  },
  {
    id: "3",
    slug: "avant-garde-capsule",
    title: "L'Avant-Garde",
    description: "Experimental, futuristic cuts showcasing our design philosophy.",
    longDescription: "L'Avant-Garde is where our atelier's imagination runs wild. A limited capsule collection blending experimental geometry with visceral emotion. Dominated by aggressive crimsons and void blacks, these pieces aren't just garments—they are wearable manifestos challenging the boundaries of conventional luxury.",
    image: "/images/collection-ag.png"
  }
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug);
}
