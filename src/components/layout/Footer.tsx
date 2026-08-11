"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { subscribeNewsletter } from "@/app/actions/newsletter";
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    const result = await subscribeNewsletter(email);

    if (result.error) {
      setStatus("idle");
      setErrorMsg(result.error);
    } else if (result.success === false) {
      setStatus("duplicate");
    } else {
      setStatus("success");
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
            
            <AnimatePresence mode="wait">
              {status === "success" || status === "duplicate" ? (
                <motion.div 
                  key="success-state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="max-w-md py-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-white text-brand-black">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <h4 className="font-serif text-xl tracking-wide text-brand-white">
                      {status === "success" ? "You're on the list." : "You're already on the list."}
                    </h4>
                  </div>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed">
                    Expect occasional notes from the Advait Studio — new collections, studio stories and the craft behind the work.
                  </p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe} 
                  className="relative max-w-md"
                  noValidate
                >
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg("");
                      }}
                      disabled={status === "loading"}
                      className={cn(
                        "w-full bg-transparent border-b py-4 pr-32 outline-none transition-all duration-300 rounded-none placeholder:text-gray-600 font-sans text-brand-white",
                        errorMsg 
                          ? "border-brand-red focus:border-brand-red" 
                          : "border-gray-700 focus:border-brand-white group-hover:border-gray-400",
                        "[&:-webkit-autofill]:shadow-[0_0_0_30px_#0a0a0a_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                      )}
                    />
                    <button 
                      type="submit"
                      disabled={status === "loading" || !email}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-brand-white transition-colors disabled:opacity-50 disabled:hover:text-gray-400 flex items-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Joining</span>
                        </>
                      ) : (
                        "Join the Journal"
                      )}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute -bottom-6 left-0 flex items-center gap-1.5 text-brand-red text-xs font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
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
