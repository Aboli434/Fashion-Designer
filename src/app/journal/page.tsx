import { BlogSection } from "@/components/sections/BlogSection";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Journal | Advait Studio",
  description: "Insights, backstage stories, and the philosophy behind our atelier's creations.",
};

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const blogPosts = await prisma.blogPost.findMany();

  return (
    <main className="min-h-screen pt-24 bg-brand-white dark:bg-brand-black transition-colors duration-300">
      <BlogSection blogPosts={blogPosts} />
    </main>
  );
}
