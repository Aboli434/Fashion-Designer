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
    slug: "vasant-2027",
    title: "SS27 Vasant",
    description: "Bright, elegant silhouettes redefining modern Indian summer wear with handwoven textiles.",
    longDescription: "The Spring/Summer 2027 'Vasant' collection captures the essence of a modern Indian awakening. Using ultra-lightweight Chanderi silks, stark whites, and flashes of our signature Sutra crimson, it delivers an airy yet striking aesthetic. Tailoring is relaxed but precise, designed for the individual who moves seamlessly through global metropolises while staying rooted in heritage.",
    image: "/images/collection-ss.png"
  },
  {
    id: "2",
    slug: "sharad-2027",
    title: "FW27 Sharad",
    description: "Moody, high-contrast Indian tailoring in deep hues, rich silks and structured lines.",
    longDescription: "Embracing the elemental shadows, 'Sharad' is our Fall/Winter 2027 statement. This collection focuses on heavy, textured materials like raw Ahimsa silk and structured velvet. Deep, monolithic blacks and royal indigos dominate, complemented by sharp, architectural silhouettes that provide both armor and elegance, adorned with subtle Zardozi accents.",
    image: "/images/collection-fw.png"
  },
  {
    id: "3",
    slug: "viraasat-capsule",
    title: "Viraasat Capsule",
    description: "Experimental, avant-garde cuts showcasing our royal Indian design philosophy.",
    longDescription: "Viraasat is where our atelier's imagination runs wild. A limited capsule collection blending experimental contemporary geometry with visceral Indian emotion. Dominated by aggressive crimsons, regal golds, and void blacks, these pieces aren't just garments—they are wearable manifestos challenging the boundaries of conventional Indian luxury.",
    image: "/images/collection-ag.png"
  }
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug);
}
