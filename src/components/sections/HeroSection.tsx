"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/animations/SplitText";
import Link from "next/link";

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

interface HeroData {
  word1: string;
  word2: string;
  word3: string;
  subtitle: string;
  image: string;
  buttons: Array<{ text: string; variant: "primary" | "outline"; link: string }>;
}

export function HeroSection({ data }: { data: HeroData }) {
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
      className="relative w-full min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-hidden bg-brand-white dark:bg-brand-black"
    >
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 pt-32 pb-16 lg:pt-0 lg:pb-0 z-10">
        <div className="max-w-xl">
          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[1.1] tracking-tight text-brand-black dark:text-brand-white uppercase mb-8">
            <div className="pb-2 overflow-hidden flex flex-wrap">
              <SplitText text={data.word1} delayStart={0.3} />
            </div>
            <div className="pb-2 overflow-hidden flex flex-wrap">
              <SplitText text={data.word2} delayStart={0.7} className="text-brand-red italic pr-4" />
            </div>
            <div className="pb-2 overflow-hidden flex flex-wrap">
              <SplitText text={data.word3} delayStart={1.1} />
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-md mb-12 font-sans tracking-wide leading-relaxed"
          >
            {data.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-6"
          >
            {data.buttons.map((btn, idx) => (
              <Link key={idx} href={btn.link}>
                <Button variant={btn.variant} className="w-full sm:w-auto">{btn.text}</Button>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 relative min-h-[50vh] lg:h-screen w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: imageY, scale: imageScale }}
        >
          <div className="absolute inset-0 bg-brand-black/20 z-10" /> {/* Subtle overlay for contrast */}
          <Image
            src={data.image}
            alt="Contemporary Indian couture drape in handwoven Banarasi silk"
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
