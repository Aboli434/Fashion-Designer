import { ContactSection } from "@/components/sections/ContactSection";
import { Suspense } from "react";

export const metadata = {
  title: "Contact | Advait Studio",
  description: "Begin a conversation with Advait Studio.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 bg-brand-white dark:bg-brand-black transition-colors duration-300">
      <Suspense fallback={<div>Loading contact form...</div>}>
        <ContactSection />
      </Suspense>
    </main>
  );
}
