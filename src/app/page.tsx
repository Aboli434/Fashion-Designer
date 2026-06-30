import { HeroSection } from "@/components/sections/HeroSection";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";

// Import local data
import homeData from "@/data/home.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-white dark:bg-brand-black transition-colors duration-300">
      <HeroSection data={homeData.hero as any} />
      <AboutSection />
      <CollectionsSection />
      <GallerySection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
