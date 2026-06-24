"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delayStart?: number;
}

export function SplitText({ text, className = "", delayStart = 0 }: SplitTextProps) {
  const chars = text.split("");

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1], // Cinematic ease
            delay: delayStart + index * 0.05,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
