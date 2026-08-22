"use client";

import { useState, useTransition } from "react";
import { Search, MoreVertical, CheckCircle2, XCircle } from "lucide-react";
import { unsubscribeUser, resubscribeUser } from "@/app/actions/adminNewsletter";

export default function SubscriberTable({ initialSubscribers }: { initialSubscribers: any[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [isPending, startTransition] = useTransition();
  const [subscriberToUnsubscribe, setSubscriberToUnsubscribe] = useState<string | null>(null);

  const filteredSubscribers = initialSubscribers.filter((sub) => {
    const matchesSearch = sub.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "ALL" || sub.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleToggleStatus = (id: string, currentStatus: string) => {
    if (currentStatus === "ACTIVE") {
      setSubscriberToUnsubscribe(id);
    } else {
      startTransition(() => {
        resubscribeUser(id);
      });
    }
  };

  const confirmUnsubscribe = () => {
    if (subscriberToUnsubscribe) {
      startTransition(() => {
        unsubscribeUser(subscriberToUnsubscribe);
        setSubscriberToUnsubscribe(null);
      });
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-black dark:focus:border-brand-white transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-auto bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md py-2 px-4 text-sm outline-none focus:border-brand-black dark:focus:border-brand-white transition-colors appearance-none cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="UNSUBSCRIBED">Unsubscribed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 uppercase tracking-wider text-xs border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Joined On</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredSubscribers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  {search ? "No subscribers match your search." : "No one has joined the Journal yet."}
                </td>
              </tr>
            ) : (
              filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-black dark:text-brand-white">
                    {sub.email}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(sub.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      timeZone: "Asia/Kolkata"
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${
                      sub.status === "ACTIVE" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                    }`}>
                      {sub.status === "ACTIVE" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {sub.source}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(sub.id, sub.status)}
                      disabled={isPending}
                      className="text-xs font-bold uppercase tracking-widest text-brand-red hover:text-brand-black dark:hover:text-brand-white transition-colors disabled:opacity-50"
                    >
                      {sub.status === "ACTIVE" ? "Unsubscribe" : "Resubscribe"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
      
      {/* Custom Confirm Modal */}
      {subscriberToUnsubscribe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
          <div className="bg-brand-white dark:bg-brand-black border border-gray-200 dark:border-gray-800 p-8 w-full max-w-sm shadow-2xl">
            <h3 className="font-serif text-2xl mb-4">Unsubscribe User</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">
              Are you sure you want to unsubscribe this user from the Journal? They will no longer receive updates.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setSubscriberToUnsubscribe(null)}
                disabled={isPending}
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-brand-black dark:hover:text-brand-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmUnsubscribe}
                disabled={isPending}
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest bg-brand-red text-white hover:bg-red-700 transition-colors"
              >
                {isPending ? "Updating..." : "Unsubscribe"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
