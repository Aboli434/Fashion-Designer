const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const collections = [
  {
    slug: "the-banarasi-edit",
    title: "The Banarasi Edit",
    description: "Exploring architectural pleats and structural silhouettes using handwoven Banarasi silks.",
    longDescription: "A study in contrasting elements. The Banarasi Edit takes one of India's most opulent handwoven textiles and subjects it to rigorous, minimalist tailoring. The result is a collection of structured jackets and pre-draped skirts that feel both incredibly regal and undeniably modern.",
    image: "/images/collection-ss.png"
  },
  {
    slug: "mitti-2026",
    title: "Mitti",
    description: "Fluid drapes and raw cottons rooted in the earthy tones of the Indian landscape.",
    longDescription: "Inspired by the raw textures of unbaked earth, 'Mitti' is an exploration of fluidity and comfort. Working directly with artisan clusters in Maheshwar, we developed sheer cotton silks that move like water. The silhouettes are unrestrictive, focusing on asymmetrical drapes and relaxed elegance.",
    image: "/images/collection-fw.png"
  },
  {
    slug: "noor-bridal",
    title: "Noor Bridal Couture",
    description: "Contemporary bridal wear defined by lightness, ivory organza, and micro-embroidery.",
    longDescription: "Redefining the Indian bridal aesthetic. Noor steps away from the heavy, restrictive garments of the past. By utilizing sheer silk organza and delicate tonal Zardozi work, we created a bridal line that feels weightless and ethereal, designed for the modern bride who values movement and subtle luxury.",
    image: "/images/collection-ag.png"
  }
];

const blogPosts = [
  {
    slug: "evolution-of-saree",
    title: "The Evolution of the Indian Saree: From Tradition to Architecture",
    category: "Design",
    date: "OCT 14, 2026",
    excerpt: "How we approach the drape not as a static garment, but as a dynamic architectural form.",
    content: "The saree is arguably the most versatile garment in human history. At Advait Studio, we don't view the drape as a tradition to be preserved under glass, but as a living design language. By experimenting with pre-pleated structures and unexpected fabrics, we are pushing the boundaries of what this six-yard canvas can achieve in a modern, global context.",
    image: "/images/blog-1.png"
  },
  {
    slug: "why-hand-embroidery-matters",
    title: "Why Hand Embroidery Still Matters in the Age of Fast Fashion",
    category: "Craft",
    date: "SEP 28, 2026",
    excerpt: "A look into our relationship with the artisan clusters of Lucknow and Bengal.",
    content: "There is an inherent soul in a garment that has passed through human hands. While machine embroidery offers speed, it lacks the subtle imperfections that give a piece its character. We spend months working with artisans, developing micro-Zardozi techniques that feel contemporary rather than historical. It's a slow process, but true luxury cannot be rushed.",
    image: "/images/blog-2.png"
  },
  {
    slug: "inside-mumbai-studio",
    title: "Inside the Mumbai Studio: The Making of the Banarasi Edit",
    category: "Atelier",
    date: "SEP 10, 2026",
    excerpt: "The 400-hour journey of turning raw handwoven silk into our signature structured jackets.",
    content: "Creating a structural garment from fluid handwoven silk requires a delicate balance of engineering and artistry. Inside our Mumbai studio, the air is thick with concentration as we test the tensile strength of Banarasi brocades. This post takes you behind the scenes, documenting the rigorous draping, cutting, and stitching processes that breathe life into our most ambitious collection yet.",
    image: "/images/blog-3.png"
  }
];

const testimonials = [
  {
    quote: "Advait Studio's pieces possess a rare balance. They respect the textile heritage without feeling weighed down by it. Their contemporary drapes are a stylist's dream for editorial spreads.",
    name: "Tanya Menon",
    role: "Independent Fashion Stylist",
    image: "/images/client-1.png",
    rating: 5,
  },
  {
    quote: "I wanted something distinct for my reception—something rooted in Indian craft but with a sharp, modern silhouette. The custom ivory organza piece they created was absolutely flawless and weightless.",
    name: "Priyanka S.",
    role: "Bridal Client",
    image: "/images/client-2.png",
    rating: 5,
  },
  {
    quote: "A fresh and necessary voice in Indian couture. Their approach to structured Banarasi silk completely changes the conversation around how traditional textiles can be worn globally.",
    name: "Arjun Rao",
    role: "Creative Director, The Fashion Edit",
    image: "/images/client-3.png",
    rating: 5,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  
  for (const c of collections) {
    const collection = await prisma.collection.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
    console.log(`Created collection with id: ${collection.id}`);
  }

  for (const b of blogPosts) {
    const post = await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
    console.log(`Created blog post with id: ${post.id}`);
  }

  // Clear existing testimonials
  await prisma.testimonial.deleteMany({});
  
  for (const t of testimonials) {
    const testimonial = await prisma.testimonial.create({
      data: t,
    });
    console.log(`Created testimonial with id: ${testimonial.id}`);
  }
  
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
