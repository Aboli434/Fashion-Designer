import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Page Not Found | Advait Studio",
};

export default function NotFoundPage() {
  return (
    <main className="min-h-screen pt-40 pb-24 px-6 sm:px-12 md:px-24 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white flex flex-col items-center justify-center text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="font-serif text-8xl md:text-9xl uppercase tracking-tighter mb-6 text-brand-red">404</h1>
        <h2 className="font-serif text-3xl md:text-4xl tracking-tight uppercase mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
          The collection or editorial piece you are looking for has been archived or does not exist.
        </p>
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    </main>
  );
}
