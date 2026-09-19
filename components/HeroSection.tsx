import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Users, Award, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section aria-labelledby="home-hero-title" className="relative overflow-hidden bg-[#F7FAFE] border-b border-[#DDE8F5]">
      {/* Subtle background ambient blur decorations */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#0057B8]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-cyan-400/5 blur-2xl pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* LEFT CONTENT (~54% on desktop) */}
          <div className="lg:col-span-7 space-y-7">
            {/* Top Subtle Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DDE8F5] text-[#0057B8] text-xs font-semibold tracking-wide shadow-[0_2px_8px_rgba(11,37,69,0.04)]">
              <Sparkles size={14} className="text-[#0057B8]" />
              <span>Kỹ năng hôm nay. Cơ hội ngày mai</span>
            </div>

            {/* Headline */}
            <h1
              id="home-hero-title"
              className="text-4xl font-extrabold tracking-tight text-[#0B2545] sm:text-5xl lg:text-[56px] xl:text-[62px] leading-[1.08]"
            >
              Trang bị kỹ năng số<br className="hidden sm:inline" /> cho thế hệ{" "}
              <span className="text-[#0057B8]">Gen Z</span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#54657A] font-normal">
              Tin Học Gen Z đồng hành cùng bạn trên hành trình chinh phục tin học, công nghệ và kỹ năng số – đơn giản, thực tiễn, dễ áp dụng cho học tập và tương lai.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                href="/khoa-hoc"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0057B8] px-7 text-sm font-bold text-white transition-colors hover:bg-[#003F88] shadow-sm hover:shadow-md cursor-pointer active:scale-[0.99]"
              >
                <span>Khám phá khóa học</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="#khoa-hoc-trong-tam"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#DDE8F5] bg-white px-6 text-sm font-bold text-[#0057B8] transition-colors hover:bg-[#F4F8FD] hover:border-[#0057B8]/40 shadow-2xs cursor-pointer"
              >
                <BookOpen size={16} className="text-[#0057B8]" aria-hidden="true" />
                <span>Xem lộ trình học</span>
              </a>
            </div>

            {/* Horizontal Trust Metrics */}
            <div className="pt-6 border-t border-[#DDE8F5] grid grid-cols-3 gap-4 sm:gap-8 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE8F5] flex items-center justify-center text-[#0057B8] shrink-0 shadow-2xs">
                  <Users size={18} />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#0B2545] leading-none">50.000+</div>
                  <div className="text-xs text-[#54657A] mt-1 font-medium">Học viên tin tưởng</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE8F5] flex items-center justify-center text-[#0057B8] shrink-0 shadow-2xs">
                  <Award size={18} />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#0B2545] leading-none">200+</div>
                  <div className="text-xs text-[#54657A] mt-1 font-medium">Khóa học chất lượng</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE8F5] flex items-center justify-center text-[#0057B8] shrink-0 shadow-2xs">
                  <Star size={18} className="fill-[#0057B8]" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#0B2545] leading-none">4.9/5</div>
                  <div className="text-xs text-[#54657A] mt-1 font-medium">Đánh giá học viên</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT VISUAL (~46% on desktop) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Soft decorative background shapes */}
            <div className="absolute -top-4 -right-4 -bottom-4 -left-4 -z-10 rounded-[36px] bg-gradient-to-tr from-[#0057B8]/10 via-transparent to-[#00AEEF]/10 pointer-events-none" />

            {/* Main Visual Image Card */}
            <div className="relative w-full max-w-[480px] overflow-hidden rounded-[28px] sm:rounded-[32px] border border-[#DDE8F5] bg-white p-2 shadow-[0_12px_40px_rgba(11,37,69,0.08)]">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-[22px] sm:rounded-[26px]">
                <Image
                  src="/banner-tin-hoc-gen-z-hoc-thuc-chien.jpg"
                  alt="Học viên Gen Z thực hành kỹ năng tin học và công nghệ trên laptop"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Badge (Bottom-Left) */}
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DDE8F5] p-3.5 shadow-[0_8px_24px_rgba(11,37,69,0.12)] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F4F8FD] border border-[#DDE8F5] text-[#0057B8] flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B2545] leading-tight">Học hôm nay</div>
                  <div className="text-[11px] text-[#0057B8] font-semibold mt-0.5">Tạo ngày mai tốt hơn</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
