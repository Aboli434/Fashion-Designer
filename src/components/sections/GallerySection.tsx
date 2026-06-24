"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { id: 1, src: "/images/gallery-1.png", alt: "Editorial portrait", aspect: "aspect-[3/4]" },
  { id: 2, src: "/images/gallery-2.png", alt: "Runway model in black", aspect: "aspect-[4/5]" },
  { id: 3, src: "/images/gallery-3.png", alt: "Macro luxury fabric", aspect: "aspect-square" },
  { id: 4, src: "/images/gallery-4.png", alt: "Streetwear in motion", aspect: "aspect-[4/5]" },
  { id: 5, src: "/images/gallery-5.png", alt: "Luxury leather bag", aspect: "aspect-[3/4]" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const imageWrapperVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
};

const curtainVariants: Variants = {
  hidden: { top: "0%" },
  visible: {
    top: "100%",
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const innerImageVariants: Variants = {
  hidden: { scale: 1.2 },
  visible: {
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export function GallerySection() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-24 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-4xl md:text-6xl tracking-tight uppercase mb-4"
          >
            The Lookbook
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto"
          >
            A curated visual diary of our latest campaigns, runway highlights, and atelier craftsmanship.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={imageWrapperVariants}
              className="break-inside-avoid relative w-full group cursor-pointer"
            >
              <div className={`relative w-full ${image.aspect} overflow-hidden`}>
                {/* Curtain Reveal */}
                <motion.div
                  variants={curtainVariants}
                  className="absolute left-0 w-full h-full bg-brand-red z-20"
                />
                
                {/* Inner Image with Parallax Scale */}
                <motion.div
                  variants={innerImageVariants}
                  className="w-full h-full relative z-10"
                >
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Subtle dark gradient overlay for luxury feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
