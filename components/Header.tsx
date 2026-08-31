"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, ArrowRight, Sparkles, BookOpen, Award, ChevronDown 
} from "lucide-react";

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close menus on route change during render
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }

  // Scroll detection for enhanced glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2 sm:py-2.5" 
        : "bg-white border-b border-slate-200/60 py-2.5 sm:py-3"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          
          {/* 1. LEFT: REFINED SLEEK BRAND LOGO */}
          <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 shrink-0 py-0.5">
            <img 
              src="/logo-icon.png" 
              alt="Tin Học Gen Z Logo" 
              className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="flex flex-col justify-center">
              <span className="text-sm sm:text-[15px] font-black tracking-tight text-slate-900 leading-none group-hover:text-blue-600 transition-colors font-display whitespace-nowrap">
                TIN HỌC GEN Z
              </span>
              <div className="text-[10px] text-slate-500 font-bold tracking-wider mt-1 flex items-center gap-1.5 leading-none whitespace-nowrap">
                <span className="text-blue-600 font-black">MOS</span>
                <span className="text-amber-500">•</span>
                <span className="text-cyan-600 font-black">IC3</span>
                <span className="text-amber-500">•</span>
                <span>TIN HỌC VĂN PHÒNG</span>
              </div>
            </div>
          </Link>

          {/* 2. CENTER: CLEAN SINGLE-LINE DESKTOP NAVIGATION (NO WRAPPING) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
            
            <Link
              href="/"
              className={`text-[13px] font-bold tracking-normal transition-colors py-1.5 whitespace-nowrap ${
                pathname === "/" ? "text-blue-600 font-extrabold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Trang Chủ
            </Link>

            {/* Interactive Mega Menu Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`text-[13px] font-bold tracking-normal transition-colors flex items-center gap-1 cursor-pointer py-1.5 whitespace-nowrap ${
                  isMegaMenuOpen || pathname.startsWith("/khoa-hoc")
                    ? "text-blue-600 font-extrabold"
                    : "text-slate-700 hover:text-blue-600"
                }`}
              >
                <span>Khóa Học</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180 text-blue-600" : "text-slate-400"}`}
                />
              </button>
            </div>

            <Link
              href="/thi-thu"
              className={`text-[13px] font-bold tracking-normal transition-colors flex items-center gap-1.5 py-1.5 whitespace-nowrap ${
                pathname === "/thi-thu" ? "text-blue-600 font-extrabold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              <span>Thi Thử Online</span>
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-cyan-50 text-cyan-700 border border-cyan-200">
                HOT
              </span>
            </Link>

            <Link
              href="/tai-lieu"
              className={`text-[13px] font-bold tracking-normal transition-colors py-1.5 whitespace-nowrap ${
                pathname === "/tai-lieu" ? "text-blue-600 font-extrabold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Tài Liệu Free
            </Link>

            <Link
              href="/blog"
              className={`text-[13px] font-bold tracking-normal transition-colors py-1.5 whitespace-nowrap ${
                pathname.startsWith("/blog") ? "text-blue-600 font-extrabold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Cẩm Nang & Blog
            </Link>

            <Link
              href="/tin-cong-nghe"
              className={`text-[13px] font-bold tracking-normal transition-colors flex items-center gap-1.5 py-1.5 whitespace-nowrap ${
                pathname.startsWith("/tin-cong-nghe") ? "text-blue-600 font-extrabold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              <span>Tin Công Nghệ</span>
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-0.5">
                <Sparkles size={9} /> AI
              </span>
            </Link>

            <Link
              href="/bang-gia"
              className={`text-[13px] font-bold tracking-normal transition-colors py-1.5 whitespace-nowrap ${
                pathname === "/bang-gia" ? "text-blue-600 font-extrabold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Bảng Giá
            </Link>

            <Link
              href="/gioi-thieu"
              className={`text-[13px] font-bold tracking-normal transition-colors py-1.5 whitespace-nowrap ${
                pathname === "/gioi-thieu" ? "text-blue-600 font-extrabold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Giới Thiệu
            </Link>

          </nav>

          {/* 3. RIGHT: DIRECT ACTION BUTTON & MOBILE TOGGLE */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Direct CTA Button */}
            <Link
              href="/lien-he"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black tracking-wide uppercase bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-sm hover:shadow-md transition-all hover:scale-[1.02] whitespace-nowrap"
            >
              <span>Đăng Ký Học</span>
              <ArrowRight size={13} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>
      </div>

      {/* 4. DESKTOP MEGA MENU DROPDOWN (COMPACT 3-COLUMN LAYOUT) */}
      {isMegaMenuOpen && (
        <div className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-fade-in z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
            
            <div className="grid grid-cols-3 gap-8">
              
              {/* Col 1: Khóa Học Quốc Tế */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-wider">
                  <Award size={15} />
                  <span>Chứng Chỉ Quốc Tế MOS & IC3</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-[13px] font-bold">
                  <li>
                    <Link href="/mos" className="text-slate-700 hover:text-blue-600 flex items-center justify-between group py-0.5">
                      <span>Luyện Thi MOS 2019 / 365 (Bao Đậu)</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/ic3" className="text-slate-700 hover:text-blue-600 flex items-center justify-between group py-0.5">
                      <span>Chứng Chỉ Kỹ Năng Số IC3 GS6 Chuẩn ĐH</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/cntt-co-ban" className="text-slate-700 hover:text-blue-600 flex items-center justify-between group py-0.5">
                      <span>Ứng Dụng CNTT Cơ Bản (Thông Tư 03)</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li className="pt-1">
                    <Link href="/khoa-hoc" className="text-blue-600 font-extrabold flex items-center gap-1">
                      <span>Xem toàn bộ khóa học →</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 2: Tin Học Văn Phòng Thực Chiến & AI */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-wider">
                  <BookOpen size={15} />
                  <span>Thực Chiến & Chuyên Đề</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-[13px] font-bold">
                  <li>
                    <Link href="/excel" className="text-slate-700 hover:text-indigo-600 flex items-center justify-between group py-0.5">
                      <span>Master Excel (Hàm, Pivot, Dashboard)</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/word" className="text-slate-700 hover:text-indigo-600 flex items-center justify-between group py-0.5">
                      <span>Master Word (Soạn Thảo Chuẩn NĐ 30)</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/powerpoint" className="text-slate-700 hover:text-indigo-600 flex items-center justify-between group py-0.5">
                      <span>Master PowerPoint (Thiết Kế Slide 3D)</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/python" className="text-slate-700 hover:text-indigo-600 flex items-center justify-between group py-0.5">
                      <span>Python Tự Động Hóa Dữ Liệu Excel</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li className="pt-1">
                    <Link href="/tin-hoc-van-phong" className="text-indigo-600 font-extrabold flex items-center gap-1">
                      <span>Tin học văn phòng toàn diện →</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Học Liệu & Hỗ Trợ */}
              <div className="space-y-3.5 bg-slate-900 text-white p-5 rounded-2xl">
                <div className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>Học Liệu & Tiện Ích Mở</span>
                </div>
                <ul className="space-y-2 text-xs font-bold">
                  <li>
                    <Link href="/thi-thu" className="text-slate-200 hover:text-cyan-300 flex items-center gap-1.5 py-0.5">
                      <span>🎯 Thi thử MOS & IC3 Online Free</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tai-lieu" className="text-slate-200 hover:text-cyan-300 flex items-center gap-1.5 py-0.5">
                      <span>📚 Tải trọn bộ 50 đề thi Certiport</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-slate-200 hover:text-cyan-300 flex items-center gap-1.5 py-0.5">
                      <span>💡 Cẩm nang & Bí quyết thi 1000 điểm</span>
                    </Link>
                  </li>
                </ul>
                <div className="pt-2 border-t border-slate-800">
                  <Link
                    href="/lien-he"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 text-center transition-colors"
                  >
                    <span>Nhận Tư Vấn Xếp Lớp</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 5. MOBILE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl animate-fade-in z-50">
          <div className="px-5 py-6 space-y-2 max-h-[85vh] overflow-y-auto">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              Trang chủ
            </Link>
            <Link
              href="/khoa-hoc"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              Khóa học MOS & IC3
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              💡 Cẩm Nang & Bí Quyết Luyện Thi
            </Link>
            <Link
              href="/tin-cong-nghe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-indigo-700 bg-indigo-50/60"
            >
              <span>⚡️ Tin Công Nghệ & AI Engine</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">Mới</span>
            </Link>
            <Link
              href="/thi-thu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-blue-600 bg-blue-50/60"
            >
              <span>🎯 Thi Thử MOS / IC3 Online</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">Free</span>
            </Link>
            <Link
              href="/tai-lieu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              📚 Kho Tài Liệu & Đề Thi Mẫu
            </Link>
            <Link
              href="/bang-gia"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              Bảng Giá Học Phí
            </Link>
            <Link
              href="/gioi-thieu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              Giới Thiệu Trung Tâm
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50"
            >
              Trang Quản Trị (Admin)
            </Link>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/lien-he"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-blue-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Đăng Ký Khóa Học Ngay</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
