import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/siteConfig";
import { coursesData } from "@/data/mockData";
import { BLOG_POSTS } from "@/data/blogData";
import { ContentDb } from "@/lib/content-engine/db";

// Stable site-wide last modified timestamp for static pages (Updated per major release)
const SITE_RELEASE_DATE = new Date("2026-08-31T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (SITE_CONFIG.url || "https://tinhocgenz.io.vn").replace(/\/$/, "");

  // 1. Static core & Topic Pillar pages (High priority SEO Silos)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: SITE_RELEASE_DATE,
      priority: 1.0,
    },
    // Topic Cluster Pillars
    {
      url: `${baseUrl}/mos`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ic3`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tin-hoc-van-phong`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/excel`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/word`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/powerpoint`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/python`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cntt-co-ban`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.8,
    },
    // Core Hubs
    {
      url: `${baseUrl}/khoa-hoc`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/thi-thu`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tai-lieu`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tin-cong-nghe`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: SITE_RELEASE_DATE,
      priority: 0.7,
    },
  ];

  // 2. Dynamic course pages
  const courseRoutes: MetadataRoute.Sitemap = coursesData.map((course) => ({
    url: `${baseUrl}/khoa-hoc/${course.id}`,
    lastModified: SITE_RELEASE_DATE,
    priority: 0.85,
  }));

  // 3. Dynamic blog article pages with real publishedAt dates
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || "2026-08-01"),
    priority: 0.75,
  }));

  // 4. Dynamic tech news articles from Content Engine
  let techNewsRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedTechArticles = ContentDb.getPublishedArticles();
    techNewsRoutes = publishedTechArticles.map((art) => ({
      url: `${baseUrl}/tin-cong-nghe/${art.slug}`,
      lastModified: new Date(art.updatedAt || art.publishedAt || art.createdAt || SITE_RELEASE_DATE),
      priority: 0.75,
    }));
  } catch (err) {
    console.warn("[Sitemap] Could not load tech news routes for sitemap:", err);
  }

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...techNewsRoutes];
}
