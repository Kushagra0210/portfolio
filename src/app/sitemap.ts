import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kushagra-saxena.vercel.app";
  return [{ url: baseUrl, changeFrequency: "monthly", priority: 1 }, ...projects.map((project) => ({ url: `${baseUrl}/work/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.8 }))];
}
