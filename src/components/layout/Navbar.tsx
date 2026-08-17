"use client";

import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { globalSearch, SearchResult } from "@/app/actions/search";

const NAV_LINKS = [
  { name: "Collections", href: "/collections" },
  { name: "Studio", href: "/about" },
  { name: "Journal", href: "/journal" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, startTransition] = useTransition();
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        startTransition(async () => {
          const results = await globalSearch(searchQuery);
          setSearchResults(results);
        });
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  if (pathname?.startsWith("/admin")) {
    return null;
  }

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
                Advait Studio
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
          <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-6">
            <ThemeToggle />
            
            <div className="relative hidden md:flex items-center">
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 250, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-visible relative"
                  >
                    <input
                      type="text"
                      placeholder="Search collections & journal..."
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 text-sm py-1 outline-none mr-2 text-brand-black dark:text-brand-white"
                    />
                    
                    {/* Search Dropdown Desktop */}
                    {searchQuery.trim().length >= 2 && (
                      <div className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-brand-black border border-gray-200 dark:border-gray-800 shadow-xl max-h-96 overflow-y-auto w-[300px] right-0 left-auto z-50">
                        {isSearching ? (
                          <div className="p-4 flex justify-center text-gray-500">
                            <Loader2 className="w-5 h-5 animate-spin" />
                          </div>
                        ) : searchResults.length > 0 ? (
                          <div className="flex flex-col">
                            {searchResults.map((result) => (
                              <Link
                                key={result.id}
                                href={`/${result.type === 'collection' ? 'collections' : 'journal'}/${result.slug}`}
                                onClick={() => {
                                  setIsSearchExpanded(false);
                                  setSearchQuery("");
                                }}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border-b border-gray-100 dark:border-gray-900 last:border-0"
                              >
                                <div className="relative w-12 h-12 bg-gray-100 dark:bg-gray-800 shrink-0">
                                  <Image src={result.image} alt={result.title} fill className="object-cover" sizes="48px" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">{result.type}</div>
                                  <div className="text-sm font-medium text-brand-black dark:text-brand-white line-clamp-1">{result.title}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-sm text-gray-500">
                            No results found.
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <button 
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="text-brand-black dark:text-brand-white hover:text-brand-red transition-colors ml-2"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
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
                Advait Studio
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
              className="p-8 flex flex-col justify-center items-center gap-6 border-t border-gray-200 dark:border-gray-800"
            >
              <ThemeToggle />
              <div className="flex items-center w-full max-w-xs border-b border-gray-300 dark:border-gray-700 pb-2 relative">
                <Search className="w-5 h-5 stroke-[1.5] text-gray-500 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-lg outline-none text-brand-black dark:text-brand-white"
                />
              </div>

              {/* Search Dropdown Mobile */}
              {searchQuery.trim().length >= 2 && (
                <div className="w-full max-w-xs bg-white dark:bg-brand-black border border-gray-200 dark:border-gray-800 shadow-xl max-h-64 overflow-y-auto text-left">
                  {isSearching ? (
                    <div className="p-4 flex justify-center text-gray-500">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="flex flex-col">
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={`/${result.type === 'collection' ? 'collections' : 'journal'}/${result.slug}`}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border-b border-gray-100 dark:border-gray-900 last:border-0"
                        >
                          <div className="relative w-10 h-10 bg-gray-100 dark:bg-gray-800 shrink-0">
                            <Image src={result.image} alt={result.title} fill className="object-cover" sizes="40px" />
                          </div>
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{result.type}</div>
                            <div className="text-sm font-medium text-brand-black dark:text-brand-white line-clamp-1">{result.title}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
