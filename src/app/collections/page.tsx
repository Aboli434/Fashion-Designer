import { prisma } from "@/lib/prisma";
import { CollectionsGrid } from "@/components/ui/CollectionsGrid";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany();

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 sm:px-12 md:px-24 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight uppercase mb-6">All Collections</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl text-lg">
            Explore our complete archive of defining curations, blending modern silhouettes with uncompromising luxury.
          </p>
        </div>

        <CollectionsGrid collections={collections} />
      </div>
    </main>
  );
}
