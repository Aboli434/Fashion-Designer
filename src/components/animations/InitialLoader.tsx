"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show once per session
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasLoaded", "true");
    }, 2500); // 2.5s luxury loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // Swift curtain reveal
          className="fixed inset-0 z-[10000] bg-brand-black flex flex-col items-center justify-center text-brand-white"
        >
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-5xl md:text-7xl uppercase tracking-widest"
            >
              Sutra
            </motion.h1>
          </div>
          
          <div className="mt-8 overflow-hidden w-48 h-[1px] bg-gray-800 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-brand-red"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
