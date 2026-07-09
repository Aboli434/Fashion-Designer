"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { name: "Collections", href: "#" },
  { name: "Runway", href: "#" },
  { name: "Atelier", href: "#" },
  { name: "Campaigns", href: "#" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
          isScrolled
            ? "bg-brand-white/90 dark:bg-brand-black/90 backdrop-blur-md py-4 border-gray-200 dark:border-gray-800 shadow-sm"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-brand-black dark:text-brand-white hover:text-brand-red transition-colors"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link href="/" className="inline-block group">
              <motion.h1 
                className="font-serif text-2xl md:text-3xl font-medium tracking-widest uppercase text-brand-black dark:text-brand-white group-hover:text-brand-red transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sutra
              </motion.h1>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-sm uppercase tracking-widest text-brand-black dark:text-brand-white hover:text-brand-red transition-colors duration-300"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex-1 flex justify-end items-center space-x-6">
            <ThemeToggle />
            <button className="hidden md:block text-brand-black dark:text-brand-white hover:text-brand-red transition-colors">
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button className="text-brand-black dark:text-brand-white hover:text-brand-red transition-colors">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-white dark:bg-brand-black flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
              <span className="font-serif text-2xl tracking-widest uppercase text-brand-black dark:text-brand-white">
                Sutra
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 text-brand-black dark:text-brand-white hover:text-brand-red transition-colors"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl md:text-4xl font-serif tracking-widest uppercase text-brand-black dark:text-brand-white hover:text-brand-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-8 flex justify-center items-center space-x-8 border-t border-gray-200 dark:border-gray-800"
            >
              <ThemeToggle />
              <button className="text-brand-black dark:text-brand-white hover:text-brand-red transition-colors flex flex-col items-center gap-2 text-xs uppercase tracking-widest">
                <Search className="w-5 h-5 stroke-[1.5]" />
                Search
              </button>
              <button className="text-brand-black dark:text-brand-white hover:text-brand-red transition-colors flex flex-col items-center gap-2 text-xs uppercase tracking-widest">
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
