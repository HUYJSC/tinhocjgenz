import { SITE_CONFIG } from "@/data/siteConfig";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CourseSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: string | number;
  currency?: string;
  educationalLevel?: string;
  courseCode?: string;
  ratingValue?: number;
  reviewCount?: number;
}

export interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  category?: string;
}

/**
 * Generates EducationalOrganization JSON-LD schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    alternateName: "Tin Học GenZ",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo-icon.png`,
    image: `${SITE_CONFIG.url}/og-cover.png`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address,
      addressLocality: "Đồng Nai",
      addressRegion: "Đồng Nai",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+84${SITE_CONFIG.contact.phone.replace(/^0/, "")}`,
      contactType: "customer support",
      areaServed: "VN",
      availableLanguage: ["Vietnamese"],
    },
    sameAs: [
      SITE_CONFIG.socials.facebook,
      SITE_CONFIG.socials.youtube,
      SITE_CONFIG.socials.tiktok,
      SITE_CONFIG.contact.zaloUrl,
    ].filter(Boolean),
  };
}

/**
 * Generates WebSite JSON-LD with Sitelinks Searchbox
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generates Course JSON-LD schema
 */
export function generateCourseSchema(course: CourseSchemaProps) {
  const numericPrice = typeof course.price === "string" 
    ? parseFloat(course.price.replace(/[^0-9]/g, "")) || 490000 
    : (course.price || 490000);

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      sameAs: SITE_CONFIG.url,
    },
    url: course.url,
    image: course.image || `${SITE_CONFIG.url}/og-cover.png`,
    educationalLevel: course.educationalLevel || "Beginner to Advanced",
    courseCode: course.courseCode || "THGZ",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["Online", "Blended", "Onsite"],
      inLanguage: "vi",
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      price: numericPrice,
      priceCurrency: course.currency || "VND",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      url: course.url,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: course.ratingValue || 4.9,
      reviewCount: course.reviewCount || 128,
      bestRating: "5",
      worstRating: "1",
    },
  };
}

/**
 * Generates Article JSON-LD schema
 */
export function generateArticleSchema(article: ArticleSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [article.image],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.authorName,
      jobTitle: article.authorRole || "Chuyên Gia Tin Học & MOS Master",
      image: article.authorAvatar,
      url: `${SITE_CONFIG.url}/gioi-thieu`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo-icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    articleSection: article.category || "Tin Học Văn Phòng",
    inLanguage: "vi-VN",
  };
}

/**
 * Generates BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url.startsWith("/") ? item.url : `/${item.url}`}`,
    })),
  };
}

/**
 * Generates FAQPage JSON-LD schema
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
