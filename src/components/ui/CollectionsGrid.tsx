"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Collection } from "@prisma/client";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function CollectionsGrid({ collections }: { collections: Collection[] }) {
  if (!collections || collections.length === 0) return null;

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {collections.map((collection) => (
        <motion.div key={collection.id} variants={cardVariants} className="group cursor-pointer">
          <Link href={`/collections/${collection.slug}`} className="block w-full h-full">
            <div className="relative w-full aspect-[3/4] overflow-hidden mb-6">
              <motion.div 
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
              
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-500 z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <span className="bg-brand-white text-brand-black px-6 py-3 text-xs tracking-widest uppercase font-medium">Explore</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl uppercase tracking-wide group-hover:text-brand-red transition-colors duration-300">
                {collection.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {collection.description}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
