import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = posts.map((post) => ({
    url: `https://ashaexperiences.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://ashaexperiences.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://ashaexperiences.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://ashaexperiences.com/retreats/mexico",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://ashaexperiences.com/retreats/morocco",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://ashaexperiences.com/retreats/kenya",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://ashaexperiences.com/find-your-retreat",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://ashaexperiences.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://ashaexperiences.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...blogPosts,
  ];
}
