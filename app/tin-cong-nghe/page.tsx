import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Clock,
  ArrowRight,
  TrendingUp,
  Eye,
  Search,
  Brain,
  FileSpreadsheet,
  Layers,
  ShieldAlert,
  Code2,
  Zap,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { ContentDb } from "@/lib/content-engine/db";
import { DEFAULT_CATEGORIES } from "@/lib/content-engine/default-sources";
import { Article } from "@/lib/content-engine/types";

export const metadata: Metadata = {
  title: "Tin Công Nghệ & AI - Cập Nhật Kỹ Năng Số | Tin học GenZ",
  description:
    "Chuyên trang tin tức công nghệ, ứng dụng AI, cập nhật mới nhất về Microsoft 365, Excel, Google Workspace và bảo mật số cho học sinh, sinh viên và dân văn phòng.",
  keywords: [
    "Tin công nghệ",
    "Tin học văn phòng",
    "Microsoft 365",
    "Excel AI",
    "Google Gemini",
    "MOS",
    "IC3",
    "Kỹ năng số",
    "Tin học GenZ",
  ],
  openGraph: {
    title: "Tin Công Nghệ & AI - Cập Nhật Kỹ Năng Số | Tin học GenZ",
    description:
      "Tổng hợp tin tức công nghệ mới nhất về AI, Office, Google Workspace và an toàn thông tin.",
    url: "https://tinhocgenz.io.vn/tin-cong-nghe",
    siteName: "Tin học GenZ",
    type: "website",
  },
};

export default function TechNewsHubPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const publishedArticles = ContentDb.getPublishedArticles();
  const categories = DEFAULT_CATEGORIES;

  const featured = publishedArticles[0];
  const listArticles = publishedArticles.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* 1. Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-black tracking-wide">
            <Sparkles size={14} className="text-cyan-400" />
            <span>TÒA SOẠN TIN CÔNG NGHỆ & KỸ NĂNG SỐ</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Cập Nhật Xu Hướng Công Nghệ, AI & Tin Học Văn Phòng
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Tổng hợp phân tích chuyên sâu từ các nguồn công nghệ uy tín quốc tế, được biên tập dễ hiểu dành riêng cho cộng đồng học sinh, sinh viên và nhân viên văn phòng Việt Nam.
            </p>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs border border-white/10">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>Nội dung độc lập chuẩn SEO</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs border border-white/10">
              <Brain size={14} className="text-cyan-400" />
              <span>Ứng dụng thực chiến MOS & IC3</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs border border-white/10">
              <Clock size={14} className="text-amber-400" />
              <span>Cập nhật liên tục 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Categories Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-md flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Link
            href="/tin-cong-nghe"
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-blue-600 text-white shadow-xs whitespace-nowrap"
          >
            Tất Cả Tin Tức
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/tin-cong-nghe#${cat.slug}`}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* 3. Featured Article Card */}
        {featured && (
          <div className="mt-8">
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
              <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-100 text-blue-800">
                      {featured.categoryName}
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> ~{featured.readingTimeMinutes || 3} phút đọc
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Calendar size={12} /> {new Date(featured.publishedAt || featured.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  <Link
                    href={`/tin-cong-nghe/${featured.slug}`}
                    className="block text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight"
                  >
                    {featured.title}
                  </Link>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      GZ
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-none">Ban Biên Tập Tin học GenZ</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Theo {featured.sourceName}</p>
                    </div>
                  </div>

                  <Link
                    href={`/tin-cong-nghe/${featured.slug}`}
                    className="flex items-center gap-1.5 text-xs font-black text-blue-600 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Đọc Bài Viết</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Featured Image */}
              <div className="lg:col-span-5 relative h-56 sm:h-72 lg:h-auto rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={featured.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. Article Grid */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <TrendingUp size={22} className="text-blue-600" />
              <span>Tin Tức & Phân Tích Mới Nhất</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listArticles.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col justify-between bg-white rounded-3xl border border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={art.imageUrl || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black uppercase text-blue-700 shadow-xs">
                    {art.categoryName}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                      <span>{new Date(art.publishedAt || art.createdAt).toLocaleDateString("vi-VN")}</span>
                      <span>•</span>
                      <span>~{art.readingTimeMinutes || 3} phút đọc</span>
                    </div>

                    <Link
                      href={`/tin-cong-nghe/${art.slug}`}
                      className="block text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
                    >
                      {art.title}
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-slate-400 truncate max-w-[140px]">
                      Nguồn: {art.sourceName}
                    </span>
                    <Link
                      href={`/tin-cong-nghe/${art.slug}`}
                      className="font-extrabold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Chi tiết</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 5. CTA Community & Courses Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-200 bg-white/10 px-3 py-1 rounded-full">
              HỌC TẬP & NÂNG CẤP KỸ NĂNG SỐ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Luyện Thi Chứng Chỉ Quốc Tế MOS & IC3 Thực Chiến
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Trang bị kỹ năng làm chủ Excel, Word, PowerPoint, Google Workspace và AI ứng dụng giúp bạn bứt phá học tập và sự nghiệp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/khoa-hoc"
              className="px-6 py-3 bg-white text-blue-700 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg hover:bg-blue-50 transition-all active:scale-95"
            >
              Khám Phá Khóa Học
            </Link>
            <Link
              href="/thi-thu"
              className="px-6 py-3 bg-blue-800/60 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl border border-white/20 backdrop-blur-xs transition-all"
            >
              Thi Thử Miễn Phí
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
