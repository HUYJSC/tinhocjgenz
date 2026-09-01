import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Award, School, BookOpen, Clock, ChevronRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import HomeTabbedHub from "@/components/HomeTabbedHub";
import { BLOG_POSTS } from "@/data/blogData";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function Home() {
  const latestGuides = BLOG_POSTS.slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. Hero Section & Brand Value */}
      <HeroSection />

      {/* 2. Key Trust Metrics */}
      <StatsSection />

      {/* 3. Interactive Anti-Long-Scroll Tabbed Hub (Chuẩn Đầu Ra | Khóa Học | Bảng Vàng | Cam Kết) */}
      <HomeTabbedHub />

      {/* 4. Latest Educational Guides & SEO Hub */}
      <section className="py-16 sm:py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-[10px] uppercase tracking-wider mb-2">
                <BookOpen size={12} className="text-blue-600" />
                CẨM NANG & KHO TRI THỨC
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                Bí Quyết Luyện Thi & Thủ Thuật Mới Nhất
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider group"
            >
              <span>Xem Tất Cả Bài Viết</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {latestGuides.map((guide) => (
              <article
                key={guide.slug}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-500/40 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <Link href={`/blog/${guide.slug}`} className="block relative h-44 overflow-hidden">
                    <img
                      src={guide.coverImage}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white">
                      {guide.categoryName}
                    </span>
                  </Link>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                      <Clock size={11} />
                      <span>{guide.readTime}</span>
                    </div>

                    <Link href={`/blog/${guide.slug}`} className="block group/title">
                      <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover/title:text-blue-600 transition-colors line-clamp-2 leading-snug font-display">
                        {guide.title}
                      </h3>
                    </Link>

                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                      {guide.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/40 text-xs">
                  <span className="text-[11px] font-bold text-slate-600">{guide.author.name}</span>
                  <Link
                    href={`/blog/${guide.slug}`}
                    className="font-black text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Chi tiết</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Strategic Bottom CTA Floating Banner */}
      <section className="py-16 sm:py-20 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white p-8 sm:p-14 text-center shadow-2xl shadow-blue-900/20 border border-blue-500/20">
            {/* Ambient glows */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-cyan-200">
                <School size={14} className="text-cyan-300" />
                <span>CHỨNG CHỈ QUỐC TẾ • TÀI TRỢ HỌC LẠI 0Đ</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight font-display">
                Sẵn Sàng Làm Chủ Tin Học & Nhận Bằng MOS / IC3 Quốc Tế?
              </h2>

              <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Đăng ký ngay hôm nay để nhận tài khoản phần mềm thi thử bản quyền Certiport và ưu đãi nhóm giảm tới 30% - 40% học phí trọn gói!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <Link
                  href="/lien-he"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-black tracking-wide uppercase bg-white text-blue-700 hover:bg-cyan-50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
                >
                  <span>Đăng Ký Tư Vấn & Xếp Lớp</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <a
                  href={SITE_CONFIG.contact.zaloUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-black tracking-wide uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 backdrop-blur-md"
                >
                  Chat Trực Tiếp Qua Zalo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
