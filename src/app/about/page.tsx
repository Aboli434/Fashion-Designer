import { AboutSection } from "@/components/sections/AboutSection";

export const metadata = {
  title: "Studio | Advait Studio",
  description: "About Advait Studio - A modern Indian couture house.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 bg-brand-white dark:bg-brand-black transition-colors duration-300">
      <AboutSection />
    </main>
  );
}
