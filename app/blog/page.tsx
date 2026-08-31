"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Award, 
  School, 
  Zap, 
  ArrowRight, 
  Clock, 
  Eye, 
  Tag, 
  ChevronRight,
  TrendingUp,
  GraduationCap,
  ShieldCheck
} from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from "@/data/blogData";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "mos-ic3":
        return <Award size={15} />;
      case "chuan-quoc-te":
        return <ShieldCheck size={15} />;
      case "excel-office":
        return <BookOpen size={15} />;
      case "ai-technology":
        return <Zap size={15} />;
      default:
        return <Sparkles size={15} />;
    }
  };

  return (
    <div className="flex flex-col w-full bg-slate-50/50 min-h-screen">
      
      {/* 1. Header Banner with Search */}
      <section className="bg-white pt-24 pb-14 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-[11px] font-black uppercase tracking-wider">
            <Sparkles size={14} className="text-blue-600" />
            <span>KHO TRI THỨC TIN HỌC THỰC CHIẾN & CHỨNG CHỈ QUỐC TẾ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-display max-w-3xl mx-auto">
            Bí Quyết Ôn Thi MOS, IC3 & Thủ Thuật Tin Học Thực Chiến
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Tổng hợp các bài viết hướng dẫn chuyên sâu từ đội ngũ giảng viên MOS Master: mẹo thi 1000 điểm Certiport, cẩm nang phím tắt văn phòng và thủ thuật Excel tự động hóa.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl shadow-premium border border-slate-200/90 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Search className="absolute left-4 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết, mẹo thi MOS 1000đ, chứng chỉ IC3, hàm Excel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 text-xs sm:text-sm text-slate-800 bg-transparent rounded-2xl focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mr-3 px-2 py-1 text-xs text-slate-400 hover:text-slate-700 bg-slate-100 rounded-md font-bold"
                >
                  Xóa
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Category Filter Bar */}
      <section className="bg-white/80 backdrop-blur-md sticky top-[60px] z-20 border-b border-slate-200/80 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">

        {/* Featured Post Highlight (Only show when viewing all categories and no search) */}
        {selectedCategory === "all" && !searchQuery && featuredPost && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-premium overflow-hidden hover:border-blue-500/40 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] overflow-hidden group">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white shadow-md">
                    <TrendingUp size={12} />
                    Bài Viết Nổi Bật Nhất
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold">
                      {featuredPost.categoryName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={13} /> {featuredPost.views} lượt đọc
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`} className="group block">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug font-display">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-xs font-extrabold text-slate-900 leading-tight">
                        {featuredPost.author.name}
                      </p>
                      <p className="text-[10px] text-slate-500">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md group"
                  >
                    <span>Đọc Tiếp</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {searchQuery
                ? `Kết quả tìm kiếm cho "${searchQuery}" (${filteredPosts.length})`
                : selectedCategory === "all"
                ? "Tất Cả Bài Viết & Cẩm Nang"
                : `Chuyên Mục: ${BLOG_CATEGORIES.find((c) => c.id === selectedCategory)?.label}`}
            </h3>
            <span className="text-xs font-bold text-slate-500">
              {filteredPosts.length} bài viết
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-4">
              <BookOpen size={40} className="mx-auto text-slate-300" />
              <p className="text-base font-bold text-slate-700">
                Không tìm thấy bài viết nào phù hợp với từ khóa của bạn.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-wider"
              >
                Xem lại tất cả bài viết
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-500/40 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Cover image */}
                    <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                        {post.categoryName}
                      </span>
                    </Link>

                    {/* Content area */}
                    <div className="p-6 space-y-3.5">
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-semibold">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> {post.views}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="block group/link">
                        <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover/link:text-blue-600 transition-colors leading-snug font-display line-clamp-2">
                          {post.title}
                        </h4>
                      </Link>

                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                          >
                            <Tag size={9} /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-bold text-slate-700 truncate max-w-[120px]">
                        {post.author.name}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Xem bài</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* 4. Strategic Bottom Lead Magnet Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              <Sparkles size={12} />
              HỖ TRỢ GIẢI ĐÁP & TƯ VẤN LỘ TRÌNH 24/7
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-display">
              Bạn Cần Tư Vấn Chuẩn Đầu Ra Xét Tốt Nghiệp Gấp?
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Nhắn tin trực tiếp với giảng viên MOS Master để được kiểm tra trình độ miễn phí và nhận lộ trình kèm 1:1 bao đỗ 100% chỉ từ 3 - 5 buổi ôn luyện.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                href="/lien-he"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all"
              >
                <span>Nhận Tư Vấn Miễn Phí</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={SITE_CONFIG.contact.zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
              >
                Chat Zalo ({SITE_CONFIG.contact.displayPhone})
              </a>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}
