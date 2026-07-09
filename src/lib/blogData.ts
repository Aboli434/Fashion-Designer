export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "behind-the-scenes-fw27",
    title: "The making of FW27: Chaos and Control",
    category: "Atelier",
    date: "OCT 14, 2026",
    excerpt: "Step behind the curtain and witness the intense creative process leading up to our Lakme Fashion Week debut for Sharad.",
    content: "The FW27 collection, Eclipse, was born from a desire to master the chaotic elements of winter styling. Behind the scenes, the atelier was a storm of raw wool, structured leather, and endless fittings. Every sharp angle and deep monolith of black was meticulously crafted to ensure the garments didn't just drape, but commanded the space they occupied. This post takes you through the grueling, yet beautiful, 72 hours before the models stepped onto the concrete runway.",
    image: "/images/blog-1.png"
  },
  {
    id: "2",
    slug: "sustainable-luxury",
    title: "Weaving the Future: Sustainable Haute Couture",
    category: "Sustainability",
    date: "SEP 28, 2026",
    excerpt: "How we source ethically produced materials without compromising our signature avant-garde texture.",
    content: "Luxury fashion is at a crossroads, and our brand is committed to leading the charge toward sustainability without sacrificing an ounce of our avant-garde edge. Our latest sourcing initiative focuses on deadstock fabrics and ethically produced organic threads. The challenge of weaving our iconic red into these raw, sustainable materials required reinventing our dying process, resulting in a deeper, more resonant crimson that you'll see featured in our upcoming capsule collections.",
    image: "/images/blog-2.png"
  },
  {
    id: "3",
    slug: "runway-industrial-chic",
    title: "Industrial Chic: The Intersection of Concrete and Couture",
    category: "Runway",
    date: "SEP 10, 2026",
    excerpt: "Exploring the thematic decisions behind hosting our latest runway in an abandoned Mumbai warehouse.",
    content: "Fashion does not exist in a vacuum; it interacts with its environment. For our latest showing, we abandoned the pristine white halls of traditional venues for the stark, unforgiving concrete of an industrial warehouse in the outskirts of Mumbai. The contrast between our flowing garments and the brutalist architecture highlighted the inherent strength of the collection. The natural, harsh lighting cast dramatic shadows, turning the runway into a living, breathing editorial.",
    image: "/images/blog-3.png"
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}
