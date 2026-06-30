"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClasses = "w-full bg-transparent border-b border-gray-600 focus:border-brand-white dark:border-gray-800 dark:focus:border-brand-white text-brand-black dark:text-brand-white py-3 outline-none transition-colors rounded-none appearance-none";
const labelClasses = "block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1";

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // If using the placeholder IDs, simulate a network request for the demo
      const serviceId = "YOUR_SERVICE_ID";
      
      if (serviceId === "YOUR_SERVICE_ID") {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        return;
      }

      await emailjs.sendForm(
        serviceId,
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      );
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="py-24 px-6 sm:px-12 md:px-24 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-24">
        
        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-tight mb-8">
              Book the <br/><span className="text-brand-red italic">Atelier</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-serif max-w-md leading-relaxed mb-12">
              Whether you are looking for a bespoke red-carpet creation, a commercial collaboration, or an editorial pull, our atelier is ready to bring your vision to life.
            </p>
            
            <div className="space-y-6 text-sm tracking-widest uppercase font-bold text-gray-500">
              <div>
                <span className="block text-brand-black dark:text-brand-white mb-1">Paris HQ</span>
                45 Avenue Montaigne, 75008 Paris
              </div>
              <div>
                <span className="block text-brand-black dark:text-brand-white mb-1">Inquiries</span>
                atelier@maison.com
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Form */}
        <div className="lg:w-1/2">
          <div className="relative min-h-[500px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center h-full p-8 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <CheckCircle className="w-16 h-16 text-brand-red mb-6" strokeWidth={1.5} />
                  <h3 className="font-serif text-3xl uppercase tracking-widest mb-4">Request Sent</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-sans max-w-sm">
                    Thank you for your inquiry. Our atelier director will review your request and contact you within 48 hours.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-8"
                    onClick={() => setStatus("idle")}
                    type="button"
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  className="space-y-8"
                >
                  {status === "error" && (
                    <div className="flex items-center gap-3 text-brand-red p-4 border border-brand-red/30 bg-brand-red/5">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span className="text-sm font-medium">{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="user_name" className={labelClasses}>Full Name</label>
                      <input type="text" name="user_name" id="user_name" required className={inputClasses} placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor="user_email" className={labelClasses}>Email Address</label>
                      <input type="email" name="user_email" id="user_email" required className={inputClasses} placeholder="jane@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="project_type" className={labelClasses}>Project Type</label>
                      <select name="project_type" id="project_type" required className={inputClasses} defaultValue="">
                        <option value="" disabled>Select an option</option>
                        <option value="Bespoke Design">Bespoke Design</option>
                        <option value="Editorial Pull">Editorial Pull</option>
                        <option value="Brand Collaboration">Brand Collaboration</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className={labelClasses}>Budget Range</label>
                      <select name="budget" id="budget" required className={inputClasses} defaultValue="">
                        <option value="" disabled>Select a range</option>
                        <option value="$10k - $25k">$10k - $25k</option>
                        <option value="$25k - $50k">$25k - $50k</option>
                        <option value="$50k+">$50k+</option>
                        <option value="Undisclosed">Undisclosed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>Project Details</label>
                    <textarea 
                      name="message" 
                      id="message" 
                      required 
                      rows={4} 
                      className={cn(inputClasses, "resize-none")} 
                      placeholder="Tell us about your vision..." 
                    />
                  </div>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
