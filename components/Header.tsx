import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { ArrowRight, ChevronDown, GraduationCap } from "lucide-react";

const courseLinks = [
  { href: "/khoa-hoc", label: "Tất cả khóa học", description: "Xem toàn bộ lộ trình đào tạo" },
  { href: "/mos", label: "Luyện thi MOS", description: "Word, Excel, PowerPoint chuẩn IIG" },
  { href: "/ic3", label: "Chứng chỉ IC3 GS6", description: "Nền tảng kỹ năng số quốc tế" },
  { href: "/excel", label: "Excel thực chiến", description: "Hàm, PivotTable và Dashboard báo cáo" },
  { href: "/word", label: "Word thực chiến", description: "Soạn thảo văn bản chuyên nghiệp" },
  { href: "/powerpoint", label: "PowerPoint", description: "Thiết kế slide và thuyết trình hiện đại" },
];

const primaryLinks = [
  { href: "/tai-lieu", label: "Tài liệu" },
  { href: "/thi-thu", label: "Chứng chỉ" },
  { href: "/blog", label: "Blog" },
  { href: "/bang-gia", label: "Bảng giá" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center py-1">
          <BrandLogo variant="horizontal" size="lg" priority />
        </div>

        <nav className="ml-auto flex items-center gap-1.5" aria-label="Điều hướng chính">
          <Link
            href="/"
            className="relative inline-flex h-10 items-center px-3 text-sm font-semibold text-slate-800 hover:text-[#0057B8] transition-colors after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-[#0057B8] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Trang chủ
          </Link>

          <div className="group relative">
            <Link
              href="/khoa-hoc"
              aria-haspopup="true"
              className="relative inline-flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-semibold text-slate-700 transition-colors hover:text-[#0057B8] focus-visible:text-[#0057B8]"
            >
              Khóa học
              <ChevronDown size={14} aria-hidden="true" className="group-hover:rotate-180 transition-transform duration-200 text-slate-500" />
            </Link>

            <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-[440px] rounded-2xl border border-[#E5EEF8] bg-white p-2.5 shadow-[0_12px_36px_rgba(0,87,184,0.08)]">
                <div className="grid grid-cols-2 gap-1.5">
                  {courseLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl p-3 transition-colors hover:bg-[#F4F8FD] focus-visible:bg-[#F4F8FD] group/sub"
                    >
                      <span className="block text-sm font-bold text-[#0B2545] group-hover/sub:text-[#0057B8] transition-colors">{item.label}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative inline-flex h-10 items-center px-3 text-sm font-semibold text-slate-700 transition-colors hover:text-[#0057B8] after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-[#0057B8] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://hoctructuyen.tinhocgenz.io.vn/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-10 shrink-0 items-center gap-2 rounded-xl border border-[#E5EEF8] bg-[#F4F8FD] px-3.5 text-sm font-semibold text-[#0057B8] transition-colors hover:bg-white hover:border-[#0057B8]/30 xl:inline-flex"
        >
          <GraduationCap size={16} aria-hidden="true" />
          Hệ thống học tập
        </a>

        <Link
          href="/lien-he"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#0057B8] px-4.5 text-sm font-bold text-white transition-colors hover:bg-[#003F88] shadow-sm"
        >
          <span>Tư vấn ngay</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
