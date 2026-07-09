import { HeroSection } from "@/components/sections/HeroSection";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";

// Import local data
import homeData from "@/data/home.json";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const collections = await prisma.collection.findMany();
  const blogPosts = await prisma.blogPost.findMany();
  const testimonials = await prisma.testimonial.findMany();

  return (
    <main className="min-h-screen bg-brand-white dark:bg-brand-black transition-colors duration-300">
      <HeroSection data={homeData.hero as any} />
      <AboutSection />
      <CollectionsSection collections={collections} />
      <GallerySection />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection blogPosts={blogPosts} />
      <ContactSection />
    </main>
  );
}
