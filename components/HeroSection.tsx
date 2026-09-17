import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Award, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section aria-labelledby="home-hero-title" className="border-b border-[#E5EEF8] bg-[#F4F8FD]/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5EEF8] text-[#0057B8] text-xs font-bold tracking-wider uppercase shadow-[0_2px_8px_rgba(0,87,184,0.06)]">
            <Award size={14} className="text-[#0057B8]" />
            <span>ĐÀO TẠO CNTT & CHỨNG CHỈ QUỐC TẾ</span>
          </div>

          <h1 id="home-hero-title" className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#0B2545] sm:text-5xl lg:text-6xl">
            Học công nghệ.<br className="hidden sm:inline" /> Làm chủ tương lai.
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg font-normal">
            Khóa học CNTT thực tế, chứng chỉ quốc tế, kỹ năng đáp ứng doanh nghiệp. Lộ trình đào tạo tinh gọn, thực hành trên máy ảo thi thử chuẩn Certiport.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row pt-2">
            <Link
              href="/khoa-hoc"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0057B8] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#003F88] shadow-sm cursor-pointer"
            >
              <span>Bắt đầu học ngay</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/thi-thu"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#E5EEF8] bg-white px-6 py-3.5 text-sm font-semibold text-[#0B2545] transition-colors hover:bg-[#F4F8FD] hover:text-[#0057B8] shadow-xs cursor-pointer"
            >
              <BookOpen size={16} className="text-[#0057B8]" aria-hidden="true" />
              <span>Thi thử miễn phí</span>
            </Link>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-600 pt-2" aria-label="Cam kết chất lượng">
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#0057B8] shrink-0" aria-hidden="true" />
              <span>Chuẩn khảo thí Certiport & Bộ TT&TT</span>
            </li>
            <li className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#0057B8] shrink-0" aria-hidden="true" />
              <span>Cam kết bao đỗ 100% (Học lại 0đ)</span>
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#0057B8] shrink-0" aria-hidden="true" />
              <span>Giảng viên kèm 1:1 sát sao</span>
            </li>
          </ul>
        </div>

        <div className="hidden sm:block lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-[#E5EEF8] bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src="/banner-tin-hoc-gen-z-hoc-thuc-chien.jpg"
                alt="Học viên Tin Học Gen Z thực hành kỹ năng tin học trên máy tính"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-3 px-3 py-3 text-sm text-slate-700 bg-white">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F8FD] border border-[#E5EEF8] text-[#0057B8]">
                <Award size={20} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <strong className="block font-bold text-sm text-[#0B2545]">Chứng chỉ Tin học Quốc tế</strong>
                <span className="text-xs text-slate-500 font-medium">MOS · IC3 GS6 · Tin học Doanh nghiệp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
