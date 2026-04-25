import { MetadataRoute } from "next";

const BASE_URL = "https://www.irontowervrw.com.ar";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const { supabase } = await import("@/lib/supabase");
    const { data: posts } = await supabase()
      .from("posts")
      .select("slug, updated_at")
      .eq("published", true);

    const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
