export const metadata = {
  title: "Privacy Policy | Advait Studio",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-40 pb-24 px-6 sm:px-12 md:px-24 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl tracking-tight uppercase mb-12">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
          <p className="mb-6">Effective Date: [Insert Date]</p>
          <p className="mb-6">At Advait Studio, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website and services.</p>
          <h2 className="text-2xl font-serif text-brand-black dark:text-brand-white mt-12 mb-4">Information We Collect</h2>
          <p className="mb-6">We collect information that you provide directly to us, such as when you submit an inquiry, subscribe to our newsletter, or book an appointment. This may include your name, email address, phone number, and any other details you choose to share.</p>
          <h2 className="text-2xl font-serif text-brand-black dark:text-brand-white mt-12 mb-4">How We Use Your Information</h2>
          <p className="mb-6">We use the information we collect to communicate with you, process your requests, and improve our services. We do not sell your personal data to third parties.</p>
        </div>
      </div>
    </main>
  );
}
