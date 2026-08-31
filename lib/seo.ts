import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/siteConfig";

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

/**
 * Standardized SEO Metadata Generator for TinHocGenZ
 * Enforces 50-60 char title guidelines, 140-160 char description, canonical URLs, OG and Twitter tags
 */
export function buildMetadata({
  title,
  description,
  path = "",
  ogImage,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: SEOProps): Metadata {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = `${baseUrl}${cleanPath}`;
  const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} | ${SITE_CONFIG.name}`;
  const image = ogImage || `${baseUrl}/og-cover.png`;

  const allKeywords = Array.from(
    new Set([
      ...keywords,
      "Tin Học Gen Z",
      "tinhocgenz",
      "luyện thi MOS",
      "chứng chỉ IC3",
      "tin học văn phòng",
      "học excel thực hành",
    ])
  );

  return {
    title: fullTitle,
    description: description || SITE_CONFIG.description,
    keywords: allKeywords,
    authors: authors ? authors.map((name) => ({ name })) : [{ name: SITE_CONFIG.author }],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: description || SITE_CONFIG.description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "vi_VN",
      type: type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || SITE_CONFIG.description,
      images: [image],
      creator: "@tinhocgenz",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
  };
}
