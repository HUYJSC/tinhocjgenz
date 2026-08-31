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

      {/* 4. Strategic Bottom CTA Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cyan-300">
            <School size={14} />
            <span>Tự Tin Đạt Chuẩn Đầu Ra Xét Tốt Nghiệp Sớm</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug max-w-2xl mx-auto font-display">
            Sẵn Sàng Nhận Bằng MOS & IC3 Với Điểm Tuyệt Đối?
          </h2>
          
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Đăng ký ngay hôm nay để nhận quyền truy cập phần mềm thi thử bản quyền Certiport và ưu đãi nhóm giảm tới 30% học phí!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-black tracking-wide uppercase bg-blue-600 hover:bg-blue-500 text-white shadow-xl transition-all duration-300 group hover:-translate-y-0.5"
            >
              <span>Đăng Ký Tư Vấn & Xếp Lớp</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            
            <a
              href={SITE_CONFIG.contact.zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-black tracking-wide uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
            >
              Chat Trực Tiếp Qua Zalo
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
