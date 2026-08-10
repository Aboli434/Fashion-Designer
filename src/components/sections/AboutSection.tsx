"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variants, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";

// Reusable Animated Counter
function AnimatedCounter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.floor(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{from}</span>;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export function AboutSection() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-24 bg-brand-black text-brand-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          {/* Left: Designer Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:w-5/12 relative aspect-[4/5] w-full"
          >
            <div className="absolute inset-0 bg-brand-red -ml-4 -mt-4 hidden md:block" />
            <div className="relative w-full h-full z-10">
              <Image 
                src="/images/designer.png"
                alt="Contemporary Indian fashion designer working in Mumbai studio"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right: Bio & Counters */}
          <div className="lg:w-7/12">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <motion.h2 variants={fadeUpVariants} className="font-serif text-5xl md:text-7xl uppercase tracking-tight">
                The <span className="text-brand-red italic">Visionary</span>
              </motion.h2>
              
              <motion.div variants={fadeUpVariants} className="w-16 h-1 bg-brand-red" />
              
              <motion.p variants={fadeUpVariants} className="text-gray-400 text-lg md:text-xl font-serif leading-relaxed max-w-2xl">
                Founded on the principles of unapologetic elegance and avant-garde structure, our atelier has spent over a decade redefining modern luxury. We believe in the power of silhouette, the necessity of impeccable tailoring, and the bold statement of stark contrast.
              </motion.p>

              {/* Animated Counters */}
              <motion.div variants={fadeUpVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-800">
                <div>
                  <div className="text-4xl md:text-5xl font-serif text-brand-red mb-2">
                    <AnimatedCounter from={0} to={12} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Years Active</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-serif text-brand-white mb-2">
                    <AnimatedCounter from={0} to={24} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Collections</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-serif text-brand-white mb-2">
                    <AnimatedCounter from={0} to={150} />+
                  </div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Retailers</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-serif text-brand-white mb-2">
                    <AnimatedCounter from={0} to={14} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Global Awards</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Timeline / Experience */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 variants={fadeUpVariants} className="font-serif text-3xl uppercase tracking-widest mb-10">
              The Journey
            </motion.h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
              {/* Timeline Item 1 */}
              <motion.div variants={fadeUpVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-brand-black bg-brand-red shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" />
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-brand-white text-brand-black p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-serif text-xl font-bold uppercase">Atelier Foundation</h4>
                    <span className="text-sm font-medium text-brand-red">2014</span>
                  </div>
                  <p className="text-sm text-gray-600">The brand was born in a small studio in Mumbai, focusing entirely on bespoke tailoring and contemporary Indian silhouettes.</p>
                </div>
              </motion.div>
              {/* Timeline Item 2 */}
              <motion.div variants={fadeUpVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-brand-black bg-gray-600 group-hover:bg-brand-red transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" />
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] border border-gray-800 p-6 hover:-translate-y-1 hover:border-brand-red transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-serif text-xl font-bold uppercase">First Runway</h4>
                    <span className="text-sm font-medium text-gray-400">2016</span>
                  </div>
                  <p className="text-sm text-gray-400">Debuted the first full collection at Lakme Fashion Week, gaining international recognition for the stark black & crimson palette.</p>
                </div>
              </motion.div>
              {/* Timeline Item 3 */}
              <motion.div variants={fadeUpVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-brand-black bg-gray-600 group-hover:bg-brand-red transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" />
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] border border-gray-800 p-6 hover:-translate-y-1 hover:border-brand-red transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-serif text-xl font-bold uppercase">Global Expansion</h4>
                    <span className="text-sm font-medium text-gray-400">2022</span>
                  </div>
                  <p className="text-sm text-gray-400">Opened flagship stores in Tokyo, New York, and Milan. Expanding into luxury accessories.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Awards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center"
          >
            <motion.h3 variants={fadeUpVariants} className="font-serif text-3xl uppercase tracking-widest mb-10">
              Recognition
            </motion.h3>
            <div className="grid grid-cols-1 gap-6">
              {[
                { year: "2023", title: "Designer of the Year", org: "International Fashion Council" },
                { year: "2021", title: "Best Avant-Garde Collection", org: "Vogue India" },
                { year: "2019", title: "Excellence in Tailoring", org: "CFDA Awards" },
                { year: "2017", title: "Emerging Talent", org: "LVMH Prize Nominee" }
              ].map((award, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUpVariants}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-gray-800 hover:bg-gray-900 transition-colors group"
                >
                  <div>
                    <h4 className="font-serif text-xl uppercase group-hover:text-brand-red transition-colors">{award.title}</h4>
                    <p className="text-gray-500 text-sm">{award.org}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-brand-white font-serif italic text-lg">
                    {award.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
