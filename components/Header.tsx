"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import { ChevronDown, Search } from "lucide-react";

const courseLinks = [
  { href: "/khoa-hoc", label: "Tất cả khóa học", description: "Xem toàn bộ chương trình đào tạo" },
  { href: "/mos", label: "Luyện thi MOS", description: "Word, Excel, PowerPoint chuẩn quốc tế" },
  { href: "/ic3", label: "Chứng chỉ IC3 GS6", description: "Nền tảng kỹ năng số chuẩn đầu ra" },
  { href: "/excel", label: "Excel thực chiến", description: "Hàm, PivotTable & Dashboard báo cáo" },
  { href: "/word", label: "Word thực chiến", description: "Soạn thảo văn bản chuyên nghiệp" },
  { href: "/powerpoint", label: "PowerPoint", description: "Thiết kế slide và thuyết trình hiện đại" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-[74px] border-b border-[#DDE8F5] bg-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* LEFT: Logo Master */}
        <div className="flex shrink-0 items-center">
          <BrandLogo variant="horizontal" size="lg" priority />
        </div>

        {/* CENTER: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5" aria-label="Điều hướng chính">
          <Link
            href="/"
            className={`relative inline-flex items-center px-3 text-sm font-semibold transition-colors h-11 ${
              pathname === "/"
                ? "text-[#0066FF]"
                : "text-[#54657A] hover:text-[#0066FF]"
            }`}
          >
            <span>Trang chủ</span>
            {pathname === "/" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[#0057B8] rounded-full" />
            )}
          </Link>

          {/* Courses Dropdown */}
          <div className="group relative">
            <Link
              href="/khoa-hoc"
              aria-haspopup="true"
              className={`relative inline-flex items-center gap-1 px-3 text-sm font-semibold transition-colors h-11 ${
                pathname.startsWith("/khoa-hoc") || pathname === "/mos" || pathname === "/ic3" || pathname === "/excel"
                  ? "text-[#0057B8]"
                  : "text-[#54657A] hover:text-[#0057B8]"
              }`}
            >
              <span>Khóa học</span>
              <ChevronDown size={14} aria-hidden="true" className="group-hover:rotate-180 transition-transform duration-200 text-slate-400" />
              {(pathname.startsWith("/khoa-hoc") || pathname === "/mos" || pathname === "/ic3" || pathname === "/excel") && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[#0057B8] rounded-full" />
              )}
            </Link>

            <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-[440px] rounded-2xl border border-[#DDE8F5] bg-white p-3 shadow-[0_12px_36px_rgba(11,37,69,0.08)]">
                <div className="grid grid-cols-2 gap-1.5">
                  {courseLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl p-3 transition-colors hover:bg-[#F4F8FD] group/sub"
                    >
                      <span className="block text-sm font-bold text-[#0B2545] group-hover/sub:text-[#0057B8] transition-colors">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/#khoa-hoc-trong-tam"
            className="relative inline-flex h-11 items-center px-3.5 text-sm font-semibold text-[#54657A] hover:text-[#0057B8] transition-colors"
          >
            Lộ trình học
          </Link>

          <Link
            href="/tai-lieu"
            className={`relative inline-flex h-11 items-center px-3.5 text-sm font-semibold transition-colors ${
              pathname === "/tai-lieu"
                ? "text-[#0057B8] after:content-[''] after:absolute after:bottom-1.5 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#0057B8]"
                : "text-[#54657A] hover:text-[#0057B8]"
            }`}
          >
            Tài liệu
          </Link>

          <Link
            href="/blog"
            className={`relative inline-flex h-11 items-center px-3.5 text-sm font-semibold transition-colors ${
              pathname.startsWith("/blog")
                ? "text-[#0057B8] after:content-[''] after:absolute after:bottom-1.5 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#0057B8]"
                : "text-[#54657A] hover:text-[#0057B8]"
            }`}
          >
            Cộng đồng
          </Link>

          <Link
            href="/gioi-thieu"
            className={`relative inline-flex h-11 items-center px-3.5 text-sm font-semibold transition-colors ${
              pathname === "/gioi-thieu"
                ? "text-[#0057B8] after:content-[''] after:absolute after:bottom-1.5 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#0057B8]"
                : "text-[#54657A] hover:text-[#0057B8]"
            }`}
          >
            Về chúng tôi
          </Link>
        </nav>

        {/* RIGHT: Search Box + Consultation CTA Button (No Login) */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <form
            action="/khoa-hoc"
            method="GET"
            className="relative hidden md:block w-[240px] lg:w-[280px] xl:w-[320px]"
            role="search"
          >
            <label htmlFor="header-search" className="sr-only">Tìm kiếm khóa học, bài viết, chủ đề</label>
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" aria-hidden="true" />
            <input
              id="header-search"
              name="q"
              type="search"
              placeholder="Tìm kiếm khóa học, bài viết, chủ đề..."
              className="w-full h-10 pl-11 pr-4 text-xs font-medium bg-[#F1F5F9]/80 border border-slate-200/80 rounded-full text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#0057B8] focus:bg-white focus:ring-2 focus:ring-[#0057B8]/10 transition-all"
            />
          </form>

          {/* High-Conversion Consultation CTA (Replaced Login) */}
          <Link
            href="/lien-he"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#0057B8] px-5 text-sm font-bold text-white transition-all hover:bg-[#003F88] shadow-xs cursor-pointer active:scale-[0.99]"
          >
            Nhận tư vấn
          </Link>
        </div>

      </div>
    </header>
  );
}
