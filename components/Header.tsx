"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronDown, 
  GraduationCap, 
  ExternalLink,
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#0057B8] text-[#0057B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        
        {/* 1. BRAND LOGO */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 py-1">
          <img 
            src="/logo-icon.png" 
            alt="Tin Học Gen Z Logo" 
            className="h-9 w-auto object-contain" 
          />
          <div className="flex flex-col justify-center">
            <span className="text-base font-black tracking-tight text-[#0057B8] leading-tight font-display whitespace-nowrap">
              TIN HỌC GEN Z
            </span>
            <div className="text-[10px] text-[#0057B8] font-bold tracking-wider flex items-center gap-1 leading-tight whitespace-nowrap mt-0.5">
              <span>MOS</span>
              <span>•</span>
              <span>IC3</span>
              <span>•</span>
              <span>VĂN PHÒNG</span>
            </div>
          </div>
        </Link>

        {/* 2. CENTER NAVIGATION: Khóa học, Thi thử, Học liệu, Học phí (Spec 4.2) */}
        <nav className="hidden lg:flex items-center gap-2 shrink-0">
          
          {/* Nav Item: Khóa học */}
          <div className="relative group">
            <Link
              href="/khoa-hoc"
              className={`h-10 px-3.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap border ${
                pathname.startsWith("/khoa-hoc")
                  ? "bg-[#0057B8] text-white border-[#0057B8]"
                  : "bg-white text-[#0057B8] border-transparent hover:border-[#0057B8]"
              }`}
            >
              <span>Khóa học</span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            </Link>

            <div className="absolute top-full left-0 hidden group-hover:block pt-1.5 z-50">
              <div className="w-80 bg-white rounded-xl border border-[#0057B8] p-3 space-y-1">
                <Link
                  href="/khoa-hoc/mos-master-combo"
                  className="block px-3 py-2 rounded-lg text-xs font-bold text-[#0057B8] hover:bg-[#0057B8] hover:text-white transition-colors"
                >
                  Combo Luyện Thi MOS 3 Môn (Word, Excel, PPT)
                </Link>
                <Link
                  href="/khoa-hoc/ic3-gs6"
                  className="block px-3 py-2 rounded-lg text-xs font-bold text-[#0057B8] hover:bg-[#0057B8] hover:text-white transition-colors"
                >
                  Chứng Chỉ IC3 GS6 Chuẩn ĐH
                </Link>
                <Link
                  href="/khoa-hoc/excel-master"
                  className="block px-3 py-2 rounded-lg text-xs font-bold text-[#0057B8] hover:bg-[#0057B8] hover:text-white transition-colors"
                >
                  Master Excel & Dashboard Báo Cáo
                </Link>
                <div className="pt-2 mt-1 border-t border-[#0057B8]">
                  <Link
                    href="/khoa-hoc"
                    className="block px-3 py-1.5 text-xs font-black text-[#0057B8] hover:underline"
                  >
                    Xem tất cả 7 khóa học &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Item: Thi thử */}
          <Link
            href="/thi-thu"
            className={`h-10 px-3.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 whitespace-nowrap border ${
              pathname === "/thi-thu"
                ? "bg-[#0057B8] text-white border-[#0057B8]"
                : "bg-white text-[#0057B8] border-transparent hover:border-[#0057B8]"
            }`}
          >
            <span>Thi thử</span>
          </Link>

          {/* Nav Item: Học liệu */}
          <div className="relative group">
            <Link
              href="/tai-lieu"
              className={`h-10 px-3.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap border ${
                pathname === "/tai-lieu" || pathname.startsWith("/blog")
                  ? "bg-[#0057B8] text-white border-[#0057B8]"
                  : "bg-white text-[#0057B8] border-transparent hover:border-[#0057B8]"
              }`}
            >
              <span>Học liệu</span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            </Link>

            <div className="absolute top-full left-0 hidden group-hover:block pt-1.5 z-50">
              <div className="w-64 bg-white rounded-xl border border-[#0057B8] p-3 space-y-1">
                <Link
                  href="/tai-lieu"
                  className="block px-3 py-2 rounded-lg text-xs font-bold text-[#0057B8] hover:bg-[#0057B8] hover:text-white transition-colors"
                >
                  Kho Tài Liệu & Đề Thi Mẫu
                </Link>
                <Link
                  href="/blog"
                  className="block px-3 py-2 rounded-lg text-xs font-bold text-[#0057B8] hover:bg-[#0057B8] hover:text-white transition-colors"
                >
                  Cẩm Nang & Mẹo Thi 1000đ
                </Link>
              </div>
            </div>
          </div>

          {/* Nav Item: Học phí */}
          <Link
            href="/bang-gia"
            className={`h-10 px-3.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 whitespace-nowrap border ${
              pathname === "/bang-gia"
                ? "bg-[#0057B8] text-white border-[#0057B8]"
                : "bg-white text-[#0057B8] border-transparent hover:border-[#0057B8]"
            }`}
          >
            <span>Học phí</span>
          </Link>

          {/* Utility: Vào học LMS */}
          <a
            href="https://hoctructuyen.tinhocgenz.io.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-lg text-xs font-semibold text-[#0057B8] hover:underline flex items-center gap-1 whitespace-nowrap"
            title="Đăng nhập hệ thống học trực tuyến LMS"
          >
            <GraduationCap size={15} />
            <span>Vào học (LMS)</span>
            <ExternalLink size={11} />
          </a>

        </nav>

        {/* 3. RIGHT: CTA TƯ VẤN LỘ TRÌNH (Spec 4.2) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/lien-he"
            className="hidden sm:inline-flex items-center gap-1.5 h-10 px-5 rounded-xl text-xs font-black tracking-wide uppercase bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Tư Vấn Lộ Trình</span>
            <ArrowRight size={13} />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-[#0057B8] text-[#0057B8] hover:bg-[#0057B8] hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* 4. MOBILE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-b border-[#0057B8] z-50 text-[#0057B8]">
          <div className="px-5 py-6 space-y-3 font-sans">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-bold border border-[#0057B8] bg-white text-[#0057B8]"
            >
              Trang chủ
            </Link>

            <Link
              href="/khoa-hoc"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-bold border border-[#0057B8] bg-white text-[#0057B8]"
            >
              Khóa học & Lộ trình
            </Link>

            <Link
              href="/thi-thu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-bold border border-[#0057B8] bg-white text-[#0057B8]"
            >
              Thi thử MOS & IC3 Online
            </Link>

            <Link
              href="/tai-lieu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-bold border border-[#0057B8] bg-white text-[#0057B8]"
            >
              Kho tài liệu & Đề thi mẫu
            </Link>

            <Link
              href="/bang-gia"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-bold border border-[#0057B8] bg-white text-[#0057B8]"
            >
              Học phí công khai
            </Link>

            <a
              href="https://hoctructuyen.tinhocgenz.io.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold border border-[#0057B8] bg-white text-[#0057B8]"
            >
              <span>Cổng học viên LMS</span>
              <ExternalLink size={14} />
            </a>

            <div className="pt-2">
              <Link
                href="/lien-he"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-[#0057B8] text-white font-bold text-xs uppercase tracking-wide border border-[#0057B8]"
              >
                <span>Tư Vấn Lộ Trình Ngay</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
