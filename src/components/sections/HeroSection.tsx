"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/animations/SplitText";

const textRevealVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.15 + 0.3,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const fadeUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col lg:flex-row overflow-hidden bg-brand-white dark:bg-brand-black"
    >
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 pt-32 lg:pt-0 z-10">
        <div className="max-w-xl">
          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[1.1] tracking-tight text-brand-black dark:text-brand-white uppercase mb-8">
            <div className="pb-2 overflow-hidden flex flex-wrap">
              <SplitText text="Redefine" delayStart={0.3} />
            </div>
            <div className="pb-2 overflow-hidden flex flex-wrap">
              <SplitText text="Elegance" delayStart={0.7} className="text-brand-red italic pr-4" />
            </div>
            <div className="pb-2 overflow-hidden flex flex-wrap">
              <SplitText text="Today." delayStart={1.1} />
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-md mb-12 font-sans tracking-wide leading-relaxed"
          >
            Discover the new avant-garde collection where bold streetwear meets timeless luxury tailoring.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-6"
          >
            <Button variant="primary">Explore Collection</Button>
            <Button variant="outline">Discover Atelier</Button>
          </motion.div>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 relative h-[50vh] lg:h-screen w-full overflow-hidden mt-12 lg:mt-0">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: imageY, scale: imageScale }}
        >
          <div className="absolute inset-0 bg-brand-black/20 z-10" /> {/* Subtle overlay for contrast */}
          <Image
            src="/images/hero.png"
            alt="Luxury Fashion Model"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
