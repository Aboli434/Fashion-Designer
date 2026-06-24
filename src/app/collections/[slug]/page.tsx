import { getCollectionBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  // Await the params object in Next.js 15
  const slug = (await params).slug;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-white dark:bg-brand-black pt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24 py-12 md:py-24 flex flex-col lg:flex-row gap-16">
        
        {/* Left: Sticky Image */}
        <div className="lg:w-1/2">
          <FadeIn duration={0.8} className="sticky top-32">
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>

        {/* Right: Content Content */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <FadeIn delay={0.2} duration={0.8}>
            <div className="uppercase tracking-widest text-brand-red text-sm font-medium mb-4">
              Collection Archive
            </div>
            <h1 className="font-serif text-5xl md:text-7xl uppercase tracking-tight text-brand-black dark:text-brand-white mb-8">
              {collection.title}
            </h1>
            
            <div className="prose prose-lg dark:prose-invert prose-brand mb-12">
              <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-serif leading-relaxed mb-6">
                {collection.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                {collection.longDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary">Shop Collection</Button>
              <Button variant="outline">View Lookbook</Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
