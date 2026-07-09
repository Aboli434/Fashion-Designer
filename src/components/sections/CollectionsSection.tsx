import { Collection } from "@prisma/client";
import Link from "next/link";
import { CollectionsGrid } from "@/components/ui/CollectionsGrid";

export function CollectionsSection({ collections }: { collections: Collection[] }) {
  if (!collections || collections.length === 0) return null;

  return (
    <section className="py-32 px-6 sm:px-12 md:px-24 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight uppercase mb-4">Latest Archives</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">Explore our defining curations, blending modern silhouettes with uncompromising luxury.</p>
          </div>
          <Link href="/collections" className="text-sm tracking-widest uppercase hover:text-brand-red transition-colors border-b border-brand-black dark:border-brand-white hover:border-brand-red pb-1">
            View All
          </Link>
        </div>

        <CollectionsGrid collections={collections} />
      </div>
    </section>
  );
}
