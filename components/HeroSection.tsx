import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Laptop } from "lucide-react";

export default function HeroSection() {
  return (
    <section aria-labelledby="home-hero-title" className="border-b border-blue-100 bg-blue-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-7">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Tin Học Gen Z · Học thực chiến
          </p>
          <h1 id="home-hero-title" className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
            Nâng kỹ năng số, mở rộng cơ hội học tập và công việc
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Học tin học văn phòng, luyện thi MOS/IC3 và kỹ năng số theo lộ trình rõ ràng, tập trung vào thực hành và khả năng áp dụng thực tế.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/khoa-hoc" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              Xem khóa học <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/thi-thu" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">
              <BookOpen size={17} aria-hidden="true" /> Thi thử miễn phí
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate-600" aria-label="Lợi ích nổi bật">
            <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" aria-hidden="true" />Lộ trình rõ ràng</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" aria-hidden="true" />Bài tập thực hành</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" aria-hidden="true" />Hỗ trợ học viên</li>
          </ul>
        </div>

        <div className="hidden sm:block lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
            <picture>
              <source media="(max-width: 639px)" type="image/avif" srcSet="/banner-tin-hoc-gen-z-mobile.avif" />
              <source media="(max-width: 639px)" type="image/webp" srcSet="/banner-tin-hoc-gen-z-mobile.webp" />
              <source media="(min-width: 640px)" type="image/avif" srcSet="/banner-tin-hoc-gen-z-hoc-thuc-chien.avif" />
              <source media="(min-width: 640px)" type="image/webp" srcSet="/banner-tin-hoc-gen-z-hoc-thuc-chien.webp" />
              <img
                src="/banner-tin-hoc-gen-z-hoc-thuc-chien.jpg"
                alt="Học viên Tin Học Gen Z thực hành kỹ năng tin học trên máy tính"
                width={1920}
                height={720}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[16/10] h-full w-full object-cover"
              />
            </picture>
            <div className="flex items-center gap-3 border-t border-blue-100 px-4 py-3 text-sm text-slate-700">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700"><Laptop size={18} aria-hidden="true" /></span>
              <span><strong className="block font-semibold text-slate-900">Luyện thi & kỹ năng thực hành</strong><span className="text-xs text-slate-500">MOS · IC3 · Tin học văn phòng</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
