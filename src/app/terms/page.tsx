export const metadata = {
  title: "Terms of Service | Advait Studio",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-40 pb-24 px-6 sm:px-12 md:px-24 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl tracking-tight uppercase mb-12">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
          <p className="mb-6">Effective Date: [Insert Date]</p>
          <p className="mb-6">Welcome to Advait Studio. By accessing our website, you agree to these terms of service. Please read them carefully.</p>
          <h2 className="text-2xl font-serif text-brand-black dark:text-brand-white mt-12 mb-4">Intellectual Property</h2>
          <p className="mb-6">All content on this website, including imagery, designs, text, and branding, is the exclusive property of Advait Studio. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>
          <h2 className="text-2xl font-serif text-brand-black dark:text-brand-white mt-12 mb-4">Appointments & Commissions</h2>
          <p className="mb-6">All bridal and custom commissions are subject to our studio's specific terms and conditions, which will be provided during your initial consultation.</p>
        </div>
      </div>
    </main>
  );
}
