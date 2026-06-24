"use client";

import { motion, Variants } from "framer-motion";
import { BlogCard } from "@/components/ui/BlogCard";
import { blogPosts } from "@/lib/blogData";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export function BlogSection() {
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <section className="py-24 px-6 sm:px-12 md:px-24 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight uppercase mb-4">Editorial</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Insights, backstage stories, and the philosophy behind our atelier's creations.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16 md:space-y-24"
        >
          {/* Featured Post */}
          <motion.div variants={fadeUpVariants}>
            <BlogCard post={featuredPost} featured={true} />
          </motion.div>

          {/* Grid Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {regularPosts.map((post) => (
              <motion.div key={post.id} variants={fadeUpVariants}>
                <BlogCard post={post} featured={false} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
