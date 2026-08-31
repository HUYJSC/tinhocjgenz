import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/siteConfig";
import { coursesData } from "@/data/mockData";
import { BLOG_POSTS } from "@/data/blogData";
import { ContentDb } from "@/lib/content-engine/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url || "https://tinhocgenz.io.vn";

  // 1. Static core & Topic Pillar pages (High priority SEO Silos)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Topic Cluster Pillars
    {
      url: `${baseUrl}/mos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ic3`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tin-hoc-van-phong`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/excel`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/word`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/powerpoint`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/python`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cntt-co-ban`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Core Hubs
    {
      url: `${baseUrl}/khoa-hoc`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tin-cong-nghe`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/thi-thu`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tai-lieu`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dich-vu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 2. Dynamic course pages
  const courseRoutes: MetadataRoute.Sitemap = coursesData.map((course) => ({
    url: `${baseUrl}/khoa-hoc/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Dynamic blog article pages
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Dynamic tech news articles from Content Engine
  let techNewsRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedTechArticles = ContentDb.getPublishedArticles();
    techNewsRoutes = publishedTechArticles.map((art) => ({
      url: `${baseUrl}/tin-cong-nghe/${art.slug}`,
      lastModified: new Date(art.updatedAt || art.publishedAt || art.createdAt),
      changeFrequency: "daily",
      priority: 0.85,
    }));
  } catch (err) {
    console.warn("[Sitemap] Could not load tech news routes for sitemap:", err);
  }

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...techNewsRoutes];
}
