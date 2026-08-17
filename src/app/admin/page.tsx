import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen pt-12 pb-24 px-6 sm:px-12 md:px-24 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-tight">
            Admin Dashboard
          </h1>
          <a 
            href="/admin/newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black text-sm uppercase tracking-widest font-bold rounded hover:opacity-80 transition-opacity"
          >
            Manage Journal Subscribers
          </a>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
          <h2 className="font-serif text-3xl uppercase tracking-widest mb-12">Recent Inquiries</h2>
          
          {submissions.length === 0 ? (
            <p className="text-gray-500">No submissions yet.</p>
          ) : (
            <div className="flex flex-col space-y-12">
              {submissions.map((sub: any) => {
                const messageParts = sub.message.split('\n\nMessage:\n');
                let metadata = [];
                let actualMessage = sub.message;
                
                if (messageParts.length === 2) {
                  metadata = messageParts[0].split('\n').map((line: string) => line.split(': '));
                  actualMessage = messageParts[1];
                }

                return (
                  <div key={sub.id} className="pb-12 border-b border-gray-200 dark:border-gray-800 last:border-0 group flex flex-col relative">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-8">
                      <div>
                        <h3 className="font-serif text-3xl mb-1 text-brand-black dark:text-brand-white">{sub.name}</h3>
                        <a href={`mailto:${sub.email}`} className="text-gray-500 text-xs tracking-widest uppercase hover:text-brand-red transition-colors font-bold">{sub.email}</a>
                      </div>
                      <div className="mt-4 sm:mt-0 text-[10px] text-brand-red font-bold tracking-widest uppercase text-right">
                        <div>{new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        <div className="text-gray-400 mt-0.5">{new Date(sub.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</div>
                      </div>
                    </div>
                    
                    {metadata.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                        {metadata.map((item: string[], i: number) => (
                          <div key={i}>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{item[0]}</p>
                            <p className="text-sm font-medium text-brand-black dark:text-brand-white">{item[1]}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      {metadata.length > 0 && <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Message</p>}
                      <div className="text-base leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-serif italic border-l-2 border-gray-200 dark:border-gray-800 pl-4 py-1">
                        "{actualMessage}"
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
