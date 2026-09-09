"use client";

import Link from "next/link";
import { ArrowRight, Laptop, CheckCircle2, Sparkles, BookOpen, FileText } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      aria-label="Tin Học Gen Z - Học Thực Chiến"
      className="relative w-full bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-36 lg:pb-20"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-blue-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-100/50 blur-2xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: BRAND LABEL, H1, DESCRIPTION, CTAS, PROOF LINE */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Brand Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-xs font-extrabold uppercase tracking-wider mb-5 shadow-xs">
              <Sparkles size={14} className="text-blue-600 shrink-0" />
              <span>TIN HỌC GEN Z • HỌC THỰC CHIẾN</span>
            </div>

            {/* Single Semantic H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-slate-900 leading-[1.12] tracking-tight mb-5">
              Nâng kỹ năng số –{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent inline-block">
                Mở lối tương lai
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
              Học Tin học văn phòng, thiết kế và AI theo lộ trình rõ ràng, ứng dụng ngay vào học tập và công việc.
            </p>

            {/* Two Action CTAs */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-7">
              {/* Primary CTA */}
              <Link
                href="/khoa-hoc"
                className="min-h-[48px] px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:outline-3 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
              >
                <span className="lg:hidden">Xem khóa học</span>
                <span className="hidden lg:inline">Khám phá khóa học</span>
                <ArrowRight size={16} />
              </Link>

              {/* Mobile prioritizes the free exam; desktop keeps the existing LMS CTA. */}
              <Link
                href="/thi-thu"
                className="lg:hidden min-h-[48px] px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs active:translate-y-0 transition-all focus-visible:outline-3 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
              >
                <FileText size={16} className="text-blue-600" />
                <span>Thi thử miễn phí</span>
              </Link>
              <a
                href="https://hoctructuyen.tinhocgenz.io.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex min-h-[48px] px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-semibold text-sm sm:text-base items-center justify-center gap-2 shadow-xs hover:border-slate-400 active:translate-y-0 transition-all focus-visible:outline-3 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
              >
                <Laptop size={16} className="text-blue-600" />
                <span>Vào hệ thống học tập</span>
              </a>
            </div>

            {/* Benefit Proof Line */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-600">
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Lộ trình rõ ràng</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="inline-flex items-center gap-1.5">
                <BookOpen size={15} className="text-blue-600 shrink-0" />
                <span>Bài tập thực hành</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-amber-600 shrink-0" />
                <span>Hỗ trợ tận tâm</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ARTWORK PICTURE (AVIF/WEBP ART DIRECTION) */}
          <div className="hidden sm:flex lg:col-span-5 items-center justify-center w-full">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/80 bg-blue-50 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10]">
              <picture>
                {/* Mobile: 1080x1350 portrait AVIF/WebP */}
                <source
                  media="(max-width: 639px)"
                  type="image/avif"
                  srcSet="/banner-tin-hoc-gen-z-mobile.avif"
                />
                <source
                  media="(max-width: 639px)"
                  type="image/webp"
                  srcSet="/banner-tin-hoc-gen-z-mobile.webp"
                />

                {/* Desktop/Tablet: 1920x720 landscape AVIF/WebP */}
                <source
                  media="(min-width: 640px)"
                  type="image/avif"
                  srcSet="/banner-tin-hoc-gen-z-hoc-thuc-chien.avif"
                />
                <source
                  media="(min-width: 640px)"
                  type="image/webp"
                  srcSet="/banner-tin-hoc-gen-z-hoc-thuc-chien.webp"
                />

                {/* Eager fallback image */}
                <img
                  src="/banner-tin-hoc-gen-z-hoc-thuc-chien.jpg"
                  alt="Học viên Tin Học Gen Z thực hành kỹ năng tin học, thiết kế và AI trên máy tính"
                  width={1920}
                  height={720}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </picture>

              {/* Floating Credibility Card */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-lg border border-slate-200/80 flex items-center gap-2.5 max-w-[calc(100%-24px)]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-700 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Laptop size={17} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    Chứng chỉ Quốc tế Certiport & CNTT
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold truncate">
                    ✓ Đề thi sát 99% đề thi thật
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
