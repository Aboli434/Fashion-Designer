"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blogData";
import { motion, useScroll, useTransform } from "framer-motion";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax subtle text movement
  const contentY = useTransform(scrollYProgress, [0, 1], [featured ? 50 : 30, featured ? -50 : -30]);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div ref={ref} className={`flex ${featured ? 'flex-col md:flex-row gap-8 lg:gap-16 items-center' : 'flex-col gap-6'} w-full`}>
        {/* Image Container */}
        <div className={`relative overflow-hidden w-full ${featured ? 'md:w-1/2 aspect-[4/3] md:aspect-square' : 'aspect-[4/3]'}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        </div>

        {/* Content Container with Parallax */}
        <motion.div style={{ y: contentY }} className={`flex flex-col justify-center ${featured ? 'md:w-1/2' : ''}`}>
          <div className="flex items-center gap-4 mb-4 text-xs font-bold tracking-widest uppercase">
            <span className="text-brand-red">{post.category}</span>
            <span className="text-gray-500">{post.date}</span>
          </div>
          
          <h3 className={`font-serif uppercase tracking-wide group-hover:text-brand-red transition-colors duration-300 ${featured ? 'text-3xl md:text-5xl mb-6' : 'text-2xl mb-3'}`}>
            {post.title}
          </h3>
          
          <p className={`text-gray-600 dark:text-gray-400 ${featured ? 'text-lg max-w-lg mb-8' : 'text-sm mb-4'}`}>
            {post.excerpt}
          </p>

          <div className="inline-flex items-center text-xs tracking-widest uppercase font-bold text-brand-black dark:text-brand-white group-hover:text-brand-red transition-colors">
            Read Editorial <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
