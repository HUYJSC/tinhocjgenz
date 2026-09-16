"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, FileText, CheckCircle2, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      aria-label="Tin Học Gen Z - Học Tin Học Thực Chiến"
      className="relative w-full bg-white border-b border-[#0057B8] overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-20 lg:pb-16 text-[#0057B8]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: 7 cols desktop */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5">
            {/* Small Brand Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#0057B8] text-[#0057B8] text-xs font-bold uppercase tracking-wider bg-white">
              <Sparkles size={14} className="text-[#0057B8] shrink-0" />
              <span>TIN HỌC GEN Z • ĐÀO TẠO THỰC CHIẾN</span>
            </div>

            {/* Single Semantic H1 (Spec 4.2) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-[#0057B8] leading-[1.15] tracking-tight font-display">
              Học tin học để thi tốt và làm việc hiệu quả.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#0057B8] leading-relaxed max-w-2xl font-medium">
              Đào tạo chứng chỉ quốc tế MOS, IC3 và tin học văn phòng thực chiến. Lộ trình rõ ràng, bài tập thực hành trên máy ảo, ứng dụng ngay vào học tập và công việc.
            </p>

            {/* Action CTAs (Spec 4.2) */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* Primary CTA: Khám phá khóa học */}
              <Link
                href="/khoa-hoc"
                className="min-h-[48px] px-6 py-3 rounded-xl bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen size={16} />
                <span>Khám phá khóa học</span>
              </Link>

              {/* Secondary CTA: Học thử miễn phí */}
              <Link
                href="/khoa-hoc/mos-master-combo/bai-hoc/word-lesson-1"
                className="min-h-[48px] px-6 py-3 rounded-xl bg-white hover:bg-[#0057B8] text-[#0057B8] hover:text-white border border-[#0057B8] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Học thử miễn phí</span>
                <ArrowRight size={16} />
              </Link>

              {/* Text link: Thi thử MOS/IC3 */}
              <Link
                href="/thi-thu"
                className="min-h-[48px] px-4 py-3 text-[#0057B8] hover:underline font-bold text-sm flex items-center justify-center gap-1.5"
              >
                <FileText size={15} />
                <span>Thi thử MOS/IC3</span>
              </Link>
            </div>

            {/* Benefit Proof Line */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm font-semibold text-[#0057B8]">
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#0057B8] shrink-0" />
                <span>Giảng viên chuẩn MOS Master</span>
              </div>
              <span>•</span>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#0057B8] shrink-0" />
                <span>Máy ảo mô phỏng đề thi</span>
              </div>
              <span>•</span>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#0057B8] shrink-0" />
                <span>Hỗ trợ học lại 0đ</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 5 cols desktop, clean single-frame artwork */}
          <div className="hidden sm:flex lg:col-span-5 items-center justify-center w-full">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#0057B8] bg-white aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10]">
              <picture>
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
                <img
                  src="/banner-tin-hoc-gen-z-hoc-thuc-chien.jpg"
                  alt="Học viên Tin Học Gen Z thực hành kỹ năng tin học trên máy tính"
                  width={1920}
                  height={720}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </picture>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
