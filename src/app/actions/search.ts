"use server";

import { prisma } from "@/lib/prisma";

export type SearchResult = {
  id: string;
  title: string;
  slug: string;
  image: string;
  type: "collection" | "journal";
};

export async function globalSearch(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalizedQuery = query.trim().toLowerCase();

  try {
    const [collections, posts] = await Promise.all([
      prisma.collection.findMany({
        where: {
          title: { contains: normalizedQuery }
        },
        take: 3,
      }),
      prisma.blogPost.findMany({
        where: {
          OR: [
            { title: { contains: normalizedQuery } },
            { excerpt: { contains: normalizedQuery } }
          ]
        },
        take: 3,
      }),
    ]);

    const formattedCollections: SearchResult[] = collections.map((c) => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      image: c.image,
      type: "collection",
    }));

    const formattedPosts: SearchResult[] = posts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      image: p.image,
      type: "journal",
    }));

    return [...formattedCollections, ...formattedPosts];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
