import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart2, Users, BookOpen, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section aria-labelledby="home-hero-title" className="relative overflow-hidden bg-gradient-to-b from-[#F7FAFE] to-white border-b border-[#E5EEF8]">
      {/* Soft background blue ambient decorative blurs */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#0066FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-[#00AEEF]/5 blur-2xl pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          
          {/* LEFT CONTENT (~55% on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Tag Pill with Authentic Brand Slogan */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3FF] border border-[#D0E2FF] text-[#0057B8] text-xs font-bold tracking-wide shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
              <span>HỌC THIỆT • THI THẬT • GIÁ TRỊ THẬT</span>
            </div>

            {/* Headline */}
            <h1
              id="home-hero-title"
              className="text-4xl font-extrabold tracking-tight text-[#0B2545] sm:text-5xl lg:text-[54px] xl:text-[60px] leading-[1.12]"
            >
              Trang bị kỹ năng số<br />
              cho thế hệ <span className="bg-gradient-to-r from-[#0057B8] via-[#0080FF] to-[#00A3FF] bg-clip-text text-transparent">Gen Z</span>
            </h1>

            {/* Description */}
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[#54657A] font-normal">
              Tin Học Gen Z đồng hành cùng bạn trên hành trình chinh phục tin học văn phòng quốc tế, thực chiến Excel & kỹ năng số – cam kết chuẩn đầu ra, chất lượng đào tạo hàng đầu.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/khoa-hoc"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0057B8] px-6 text-sm font-bold text-white transition-all hover:bg-[#003F88] shadow-sm hover:shadow-md cursor-pointer active:scale-[0.99]"
              >
                <span>Khám phá khóa học</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="#khoa-hoc-trong-tam"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#EBF3FF] border border-[#D0E2FF] px-6 text-sm font-bold text-[#0057B8] transition-all hover:bg-[#DCEBFF] cursor-pointer"
              >
                <BarChart2 size={16} className="text-[#0057B8]" aria-hidden="true" />
                <span>Xem lộ trình học</span>
              </a>
            </div>

            {/* Horizontal Trust Metrics */}
            <div className="pt-6 border-t border-[#E5EEF8] flex flex-wrap items-center gap-6 sm:gap-10">
              {/* Metric 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#0057B8] shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-[#0B2545] leading-none">50.000+</div>
                  <div className="text-xs text-[#54657A] mt-1 font-medium">Học viên tin tưởng</div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#0057B8] shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-[#0B2545] leading-none">200+</div>
                  <div className="text-xs text-[#54657A] mt-1 font-medium">Khóa học & chuyên đề</div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#0057B8] shrink-0">
                  <Star size={18} className="fill-[#0057B8] text-[#0057B8]" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-[#0B2545] leading-none">4.9/5</div>
                  <div className="text-xs text-[#54657A] mt-1 font-medium">Đánh giá từ học viên</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT VISUAL (~45% on desktop) - Arched Student Reference Artwork */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Soft decorative background shapes */}
            <div className="absolute -top-3 -left-3 -z-10 w-28 h-28 rounded-3xl bg-[#6AA8FF]/30 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 -z-10 w-36 h-36 rounded-full bg-[#0066FF]/10 pointer-events-none" />

            {/* Main Arched Student Card */}
            <div className="relative w-full max-w-[460px] overflow-hidden rounded-[32px] sm:rounded-[36px] border border-[#E5EEF8] bg-white shadow-[0_16px_40px_rgba(0,102,255,0.08)]">
              <div className="relative aspect-[315/296] w-full overflow-hidden">
                <Image
                  src="/brand/hero-student-clean@2x.png"
                  alt="Học viên Gen Z học công nghệ, kiến tạo tương lai cùng Tin Học Gen Z"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
