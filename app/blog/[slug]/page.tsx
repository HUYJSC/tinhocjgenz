import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Calendar, 
  Tag, 
  Share2, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  School,
  ChevronRight
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blogData";
import { SITE_CONFIG } from "@/data/siteConfig";
import { coursesData } from "@/data/mockData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Bài viết không tồn tại",
    };
  }

  return {
    title: `${post.title} | ${SITE_CONFIG.name}`,
    description: post.excerpt,
    keywords: [...post.tags, ...SITE_CONFIG.keywords],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))
  ).slice(0, 3);

  const relatedCourse = post.relatedCourseId
    ? coursesData.find((c) => c.id === post.relatedCourseId)
    : coursesData[0];

  // Schema.org Article Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
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
      "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  };

  return (
    <div className="flex flex-col w-full bg-slate-50/40 min-h-screen">
      
      {/* Inject Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* 1. Breadcrumbs & Top Bar */}
      <div className="bg-white border-b border-slate-200/80 pt-20 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link href="/blog" className="hover:text-blue-600">Cẩm nang & Tri thức</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-800 font-bold truncate max-w-xs sm:max-w-md">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Header */}
      <header className="bg-white py-10 sm:py-14 border-b border-slate-100 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
              {post.categoryName}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Calendar size={13} /> {post.publishedAt}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock size={13} /> {post.readTime}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Eye size={13} /> {post.views} lượt xem
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18] font-display">
            {post.title}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author Badge */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-blue-100 shadow-xs"
              />
              <div>
                <p className="text-sm font-black text-slate-900 leading-tight">
                  {post.author.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{post.author.role}</p>
              </div>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Về danh sách bài</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 3. Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Article Main Body (Col 8) */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-premium space-y-8">
            
            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden shadow-md max-h-[420px]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Mobile TOC */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="lg:hidden bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-blue-600" />
                  Mục lục bài viết
                </p>
                <ul className="space-y-2 text-xs font-bold">
                  {post.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-slate-700 hover:text-blue-600">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rich Content Area */}
            <div 
              className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-black prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:text-slate-900 prose-h2:pt-6 prose-h2:border-t prose-h2:border-slate-100 prose-p:text-slate-700 prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-li:text-sm sm:prose-li:text-base prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="pt-6 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Thẻ từ khóa liên quan:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    <Tag size={11} className="text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* In-Article Conversion Callout */}
            {relatedCourse && (
              <div className="bg-gradient-to-br from-blue-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-300">
                  <Sparkles size={14} />
                  <span>Khóa Học Đề Xuất Dành Cho Bạn</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                  {relatedCourse.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {relatedCourse.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="text-xl font-black text-amber-400">
                    {typeof relatedCourse.price === "number"
                      ? relatedCourse.price.toLocaleString("vi-VN") + "đ"
                      : relatedCourse.price}
                  </div>
                  <Link
                    href={`/khoa-hoc/${relatedCourse.id}`}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all"
                  >
                    <span>Xem Chi Tiết Khóa Học</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}

          </article>

          {/* Sidebar Area (Col 4) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Desktop Sticky Table of Contents */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="hidden lg:block bg-white rounded-3xl p-6 border border-slate-200/90 shadow-premium sticky top-[100px]">
                <p className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen size={15} className="text-blue-600" />
                  Mục Lục Bài Viết
                </p>
                <ul className="space-y-3 text-xs font-bold">
                  {post.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-slate-600 hover:text-blue-600 block transition-colors leading-relaxed"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-[11px] text-slate-400 font-medium">
                    Bạn cần tài liệu hoặc thắc mắc về đề thi?
                  </p>
                  <a
                    href="https://zalo.me/0332298065"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-black uppercase tracking-wide transition-colors"
                  >
                    <span>Nhắn Giảng Viên Hỗ Trợ</span>
                  </a>
                </div>
              </div>
            )}

            {/* Quick Test / Resource Promotion Card */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                <Award size={20} />
              </div>
              <h4 className="text-lg font-black text-white font-display">
                Thi Thử MOS & IC3 Online Miễn Phí
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Đánh giá chính xác năng lực trước khi thi thật với ngân hàng 50+ câu hỏi bám sát chuẩn Certiport.
              </p>
              <Link
                href="/thi-thu"
                className="inline-flex items-center justify-center gap-1.5 w-full py-3 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md transition-all"
              >
                <span>Bắt Đầu Thi Thử Ngay</span>
                <ArrowRight size={13} />
              </Link>
            </div>

          </aside>

        </div>

        {/* 4. Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-black text-slate-900 mb-8 font-display">
              Bài Viết Liên Quan Cùng Chủ Đề
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.slug}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {rPost.categoryName}
                    </span>
                    <Link href={`/blog/${rPost.slug}`} className="block">
                      <h4 className="text-sm font-black text-slate-900 hover:text-blue-600 transition-colors line-clamp-2">
                        {rPost.title}
                      </h4>
                    </Link>
                    <p className="text-slate-500 text-xs line-clamp-2">{rPost.excerpt}</p>
                  </div>
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-blue-600 flex items-center gap-1"
                  >
                    <span>Đọc bài</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

    </div>
  );
}
