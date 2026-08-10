"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

const InstagramIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const TwitterIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const FacebookIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-brand-black text-brand-white pt-24 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl uppercase tracking-widest mb-6">Advait Studio</h3>
            <p className="text-gray-400 font-sans max-w-sm mb-8 leading-relaxed">
              Join our private clientele to receive early access to new collections, exclusive editorials, and atelier updates.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative max-w-md">
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 focus:border-brand-white text-brand-white py-3 pr-12 outline-none transition-colors rounded-none placeholder:text-gray-600"
              />
              <button 
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-white transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5 stroke-[1.5]" />
              </button>
              {status === "success" && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-0 text-brand-red text-sm font-medium tracking-wide"
                >
                  Welcome to the Atelier.
                </motion.p>
              )}
            </form>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-6">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: "Collections", href: "/collections" },
                { name: "Studio", href: "/about" },
                { name: "Journal", href: "/journal" },
                { name: "Contact", href: "/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-brand-white hover:pl-2 transition-all duration-300 inline-block font-serif text-lg"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Socials */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-6">Connect</h4>
            <div className="flex gap-4 mb-12">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-brand-white hover:text-brand-black hover:border-brand-white transition-all duration-300">
                <InstagramIcon className="w-4 h-4" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-brand-white hover:text-brand-black hover:border-brand-white transition-all duration-300">
                <TwitterIcon className="w-4 h-4" />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-brand-white hover:text-brand-black hover:border-brand-white transition-all duration-300">
                <FacebookIcon className="w-4 h-4" />
              </Link>
            </div>
            
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-6">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-brand-white text-sm transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Massive Logo Bottom */}
        <div className="pt-12 border-t border-gray-800 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full overflow-hidden flex justify-center items-center py-8"
          >
            <h2 
              className="font-serif text-[15vw] sm:text-[18vw] leading-none tracking-tighter uppercase text-transparent select-none" 
              style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.8)" }}
            >
              Advait
            </h2>
          </motion.div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest mt-8">
            <p>© {new Date().getFullYear()} Advait Studio. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Designed in Mumbai</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
