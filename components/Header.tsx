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
            className={`relative inline-flex h-11 items-center px-3.5 text-sm font-semibold transition-colors ${
              pathname === "/"
                ? "text-[#0057B8] after:content-[''] after:absolute after:bottom-1.5 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#0057B8]"
                : "text-[#54657A] hover:text-[#0057B8]"
            }`}
          >
            Trang chủ
          </Link>

          {/* Courses Dropdown */}
          <div className="group relative">
            <Link
              href="/khoa-hoc"
              aria-haspopup="true"
              className={`relative inline-flex h-11 items-center gap-1 px-3.5 text-sm font-semibold transition-colors ${
                pathname.startsWith("/khoa-hoc") || pathname === "/mos" || pathname === "/ic3" || pathname === "/excel"
                  ? "text-[#0057B8] after:content-[''] after:absolute after:bottom-1.5 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#0057B8]"
                  : "text-[#54657A] hover:text-[#0057B8]"
              }`}
            >
              Khóa học
              <ChevronDown size={14} aria-hidden="true" className="group-hover:rotate-180 transition-transform duration-200 text-slate-400" />
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

        {/* RIGHT: Search Box + Login CTA Button */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <form
            action="/khoa-hoc"
            method="GET"
            className="relative hidden md:block w-[240px] lg:w-[280px] xl:w-[300px]"
            role="search"
          >
            <label htmlFor="header-search" className="sr-only">Tìm kiếm khóa học, bài viết, chủ đề</label>
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" aria-hidden="true" />
            <input
              id="header-search"
              name="q"
              type="search"
              placeholder="Tìm kiếm khóa học, bài viết, chủ đề..."
              className="w-full h-11 pl-10 pr-4 text-xs font-medium bg-[#F4F8FD] border border-[#DDE8F5] rounded-xl text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#0057B8] focus:bg-white focus:ring-2 focus:ring-[#0057B8]/10 transition-all"
            />
          </form>

          {/* Login Button */}
          <a
            href="https://hoctructuyen.tinhocgenz.io.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0057B8] px-6 sm:px-7 text-sm font-bold text-white transition-colors hover:bg-[#003F88] shadow-sm cursor-pointer active:scale-[0.99]"
          >
            Đăng nhập
          </a>
        </div>

      </div>
    </header>
  );
}
