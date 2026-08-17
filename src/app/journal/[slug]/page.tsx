import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const slug = (await params).slug;
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-white dark:bg-brand-black pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <header className="text-center mb-16">
          <FadeIn duration={0.8}>
            <div className="flex items-center justify-center gap-4 mb-6 text-sm font-bold tracking-widest uppercase">
              <span className="text-brand-red">{post.category}</span>
              <span className="text-gray-500">{post.date}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl uppercase tracking-tight text-brand-black dark:text-brand-white mb-8 leading-tight">
              {post.title}
            </h1>
          </FadeIn>
        </header>

        {/* Hero Image */}
        <FadeIn delay={0.2} duration={0.8}>
          <div className="relative w-full aspect-[16/9] mb-16">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.4} duration={0.8}>
          <div className="prose prose-lg md:prose-xl dark:prose-invert prose-brand mx-auto font-serif text-gray-800 dark:text-gray-200 leading-relaxed">
            <p className="text-xl md:text-2xl font-bold mb-8 italic text-brand-black dark:text-brand-white">
              {post.excerpt}
            </p>
            <p>
              {post.content}
            </p>
          </div>

          {/* Footer Back Link */}
          <div className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <Link 
              href="/journal"
              className="inline-flex items-center text-sm tracking-widest uppercase font-bold text-brand-black dark:text-brand-white hover:text-brand-red transition-colors group"
            >
              <span className="mr-2 group-hover:-translate-x-2 transition-transform duration-300">←</span> Back to Journal
            </Link>
          </div>
        </FadeIn>
      </article>
    </main>
  );
}
