import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Calendar,
  Eye,
  Share2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import { ContentDb } from "@/lib/content-engine/db";
import { SITE_CONFIG } from "@/data/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ContentDb.getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Bài Viết Không Tồn Tại | Tin học GenZ",
    };
  }

  const siteUrl = SITE_CONFIG.url || "https://tinhocgenz.io.vn";
  const articleUrl = `${siteUrl}/tin-cong-nghe/${article.slug}`;

  return {
    title: `${article.metaTitle || article.title} | Tin học GenZ`,
    description: article.metaDescription || article.excerpt,
    keywords: article.keywords,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      url: articleUrl,
      siteName: "Tin học GenZ",
      type: "article",
      publishedTime: article.publishedAt || article.createdAt,
      images: [
        {
          url: article.imageUrl || `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      images: [article.imageUrl || `${siteUrl}/og-image.png`],
    },
  };
}

export default async function TechArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ContentDb.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Increment views
  article.views = (article.views || 0) + 1;
  ContentDb.saveArticle(article);

  // Related articles (same category or newest, excluding current)
  const allPublished = ContentDb.getPublishedArticles();
  const relatedArticles = allPublished
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const siteUrl = SITE_CONFIG.url || "https://tinhocgenz.io.vn";
  const articleUrl = `${siteUrl}/tin-cong-nghe/${article.slug}`;

  // Structured Data Schema JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.imageUrl || `${siteUrl}/og-image.png`],
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: {
      "@type": "Organization",
      name: "Tin học GenZ",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Tin học GenZ",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo-icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tin công nghệ",
        item: `${siteUrl}/tin-cong-nghe`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  // Helper: Format Markdown Content into clean HTML sections
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ");
        elements.push(
          <p key={key} className="text-slate-700 text-sm sm:text-base leading-relaxed my-3 font-normal">
            {text}
          </p>
        );
        currentParagraph = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushParagraph(`p-${index}`);
        return;
      }

      if (trimmed.startsWith("## ")) {
        flushParagraph(`p-before-h2-${index}`);
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 mt-8 mb-3 pb-1 border-b border-slate-100 flex items-center gap-2"
          >
            <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block" />
            <span>{trimmed.replace("## ", "")}</span>
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushParagraph(`p-before-h3-${index}`);
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-base sm:text-lg font-extrabold text-slate-900 mt-6 mb-2 text-blue-950"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        flushParagraph(`p-before-li-${index}`);
        elements.push(
          <li
            key={`li-${index}`}
            className="text-slate-700 text-sm sm:text-base leading-relaxed ml-4 list-disc my-1.5"
          >
            {trimmed.replace(/^[-*]\s+/, "")}
          </li>
        );
      } else if (trimmed.match(/^\d+\.\s/)) {
        flushParagraph(`p-before-ol-${index}`);
        elements.push(
          <li
            key={`ol-${index}`}
            className="text-slate-700 text-sm sm:text-base leading-relaxed ml-4 list-decimal my-1.5"
          >
            {trimmed.replace(/^\d+\.\s+/, "")}
          </li>
        );
      } else {
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph("p-final");
    return elements;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Schema.org Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Trang chủ
            </Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/tin-cong-nghe" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Tin công nghệ
            </Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-slate-900 truncate max-w-[200px] sm:max-w-none">
              {article.categoryName}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Article Header & Hero */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {/* Category Badge & Meta */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-800">
            {article.categoryName}
          </span>
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Clock size={13} /> ~{article.readingTimeMinutes || 3} phút đọc
          </span>
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Calendar size={13} /> {new Date(article.publishedAt || article.createdAt).toLocaleDateString("vi-VN")}
          </span>
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Eye size={13} /> {article.views || 1} lượt xem
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight sm:leading-snug">
          {article.title}
        </h1>

        {/* Excerpt Lead */}
        <p className="text-sm sm:text-base md:text-lg font-medium text-slate-600 leading-relaxed border-l-4 border-blue-600 pl-4 py-1 bg-blue-50/50 rounded-r-2xl">
          {article.excerpt}
        </p>

        {/* Cover Image */}
        {article.imageUrl && (
          <div className="relative w-full h-64 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 my-6">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 3. Main Content Container */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="prose prose-slate max-w-none">
            {renderFormattedContent(article.content)}
          </div>

          {/* 4. REFERENCE CITATION BOX (Nguyên tắc bản quyền) */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-medium text-slate-600">
            <div>
              <span className="font-bold text-slate-900">Nguồn tham khảo gốc:</span>{" "}
              <span>{article.sourceName}</span>
            </div>
            {article.originalUrl && (
              <a
                href={article.originalUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 font-extrabold hover:underline"
              >
                <span>Xem bài viết gốc</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* 5. CONTEXTUAL COURSE CTA BANNER */}
          {article.ctaText && (
            <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-cyan-200 font-bold text-xs">
                <GraduationCap size={18} />
                <span>LỘ TRÌNH ĐÀO TẠO CHUẨN QUỐC TẾ TẠI TIN HỌC GENZ</span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
                {article.ctaText}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/khoa-hoc"
                  className="px-5 py-2.5 bg-white text-blue-700 font-black text-xs rounded-xl shadow-md hover:bg-blue-50 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>Xem Khóa Học Ngay</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/thi-thu"
                  className="px-5 py-2.5 bg-blue-800/80 hover:bg-blue-800 text-white font-bold text-xs rounded-xl border border-white/20 transition-all"
                >
                  Thi Thử MOS / IC3
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 6. Tags List */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs font-bold text-slate-400">Từ khóa:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 7. Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="pt-12 space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles size={20} className="text-blue-600" />
              <span>Bài Viết Liên Quan Khác</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="group bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {rel.categoryName}
                    </span>
                    <Link
                      href={`/tin-cong-nghe/${rel.slug}`}
                      className="block text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
                    >
                      {rel.title}
                    </Link>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 mt-3 font-semibold">
                    <span>{new Date(rel.publishedAt || rel.createdAt).toLocaleDateString("vi-VN")}</span>
                    <Link
                      href={`/tin-cong-nghe/${rel.slug}`}
                      className="text-blue-600 font-extrabold flex items-center gap-1"
                    >
                      <span>Đọc tiếp</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
