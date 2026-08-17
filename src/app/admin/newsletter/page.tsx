import { prisma } from "@/lib/prisma";
import SubscriberTable from "./SubscriberTable";
import Link from "next/link";
import { ArrowLeft, Users, UserCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewsletterAdminPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" }
  });

  const totalSubscribers = subscribers.length;
  const activeSubscribers = subscribers.filter(s => s.status === "ACTIVE").length;

  return (
    <main className="min-h-screen pt-12 pb-24 px-6 sm:px-12 md:px-24 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-gray-500 hover:text-brand-black dark:hover:text-brand-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-tight mb-12">
          Journal Subscribers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          <div className="p-8 border border-gray-200 dark:border-gray-800 flex items-center justify-between group hover:border-brand-black dark:hover:border-brand-white transition-colors">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Total Subscribers</p>
              <p className="text-4xl font-serif">{totalSubscribers}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center text-brand-black dark:text-brand-white group-hover:text-brand-red transition-colors">
              <Users className="w-8 h-8 stroke-[1.5]" />
            </div>
          </div>
          
          <div className="p-8 border border-gray-200 dark:border-gray-800 flex items-center justify-between group hover:border-brand-black dark:hover:border-brand-white transition-colors">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Active Subscribers</p>
              <p className="text-4xl font-serif">{activeSubscribers}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center text-brand-black dark:text-brand-white group-hover:text-brand-red transition-colors">
              <UserCheck className="w-8 h-8 stroke-[1.5]" />
            </div>
          </div>
        </div>

        <SubscriberTable initialSubscribers={subscribers} />
      </div>
    </main>
  );
}
