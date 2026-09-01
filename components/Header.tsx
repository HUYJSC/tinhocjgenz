"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Award, 
  ChevronDown, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  FileText, 
  FileSpreadsheet,
  Target, 
  Tag, 
  PhoneCall,
  Flame,
  Bot
} from "lucide-react";

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close menus on route change
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }

  // Scroll detection for glassmorphism
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
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* 1. LEFT: SLEEK BRAND LOGO */}
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

          {/* 2. CENTER: COMPACT & ELEGANT DROPDOWN NAVIGATION (NO WRAPPING) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 shrink-0">
            
            {/* Nav 1: Trang Chủ */}
            <Link
              href="/"
              className={`text-[13px] font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                pathname === "/" 
                  ? "text-blue-600 bg-blue-50/80 font-extrabold" 
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              Trang Chủ
            </Link>

            {/* Nav 2: Khóa Học (Mega Menu Dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`text-[13px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  isMegaMenuOpen || pathname.startsWith("/khoa-hoc") || pathname === "/mos" || pathname === "/ic3" || pathname === "/excel"
                    ? "text-blue-600 bg-blue-50/80 font-extrabold"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <span>Khóa Học</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180 text-blue-600" : "text-slate-400"}`}
                />
              </button>
            </div>

            {/* Nav 3: Luyện Thi & Học Liệu (Dropdown Box) */}
            <div className="relative group">
              <button
                type="button"
                className={`text-[13px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  pathname === "/thi-thu" || pathname === "/tai-lieu"
                    ? "text-blue-600 bg-blue-50/80 font-extrabold"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <span>Luyện Thi & Học Liệu</span>
                <ChevronDown size={12} className="text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-50">
                <div className="w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/thi-thu"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50 group/item transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                      <Target size={17} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600">Thi Thử Online</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-cyan-100 text-cyan-800 border border-cyan-200">
                          HOT
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                        Làm bài test 5 phút dự đoán điểm thi Certiport 1000đ
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/tai-lieu"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50 group/item transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                      <BookOpen size={17} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 group-hover/item:text-emerald-600">Kho Tài Liệu Mở</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-100 text-emerald-800">
                          Free
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                        50+ bộ đề thi thật, cẩm nang phím tắt & file mẫu
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Nav 4: Tin Tức & Cẩm Nang (Dropdown Box) */}
            <div className="relative group">
              <button
                type="button"
                className={`text-[13px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  pathname.startsWith("/blog") || pathname.startsWith("/tin-cong-nghe")
                    ? "text-blue-600 bg-blue-50/80 font-extrabold"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <span>Tin Tức & Cẩm Nang</span>
                <ChevronDown size={12} className="text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-50">
                <div className="w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/blog"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50 group/item transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                      <FileText size={17} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600 block">
                        Cẩm Nang & Kinh Nghiệm
                      </span>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                        Bí quyết đạt 1000 điểm MOS, mẹo thi và giải đề
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/tin-cong-nghe"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 group/item transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                      <Bot size={17} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 group-hover/item:text-indigo-600">Tin Công Nghệ & AI</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-indigo-100 text-indigo-800 flex items-center gap-0.5">
                          <Sparkles size={9} /> AI
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                        Xu hướng tự động hóa văn phòng & công cụ AI
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Nav 5: Thông Tin & Học Phí (Dropdown Box) */}
            <div className="relative group">
              <button
                type="button"
                className={`text-[13px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  pathname === "/bang-gia" || pathname === "/gioi-thieu" || pathname === "/lien-he"
                    ? "text-blue-600 bg-blue-50/80 font-extrabold"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <span>Thông Tin & Biểu Phí</span>
                <ChevronDown size={12} className="text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-50">
                <div className="w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/bang-gia"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50 group/item transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                      <Tag size={16} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600 block">
                        Bảng Giá & Ưu Đãi
                      </span>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                        Học phí công khai, giảm tới 40% nhóm
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/gioi-thieu"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50 group/item transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                      <Users size={16} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600 block">
                        Giới Thiệu Trung Tâm
                      </span>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                        Đội ngũ giảng viên Certiport Master Trainer
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/lien-he"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50 group/item transition-colors border-t border-slate-100 pt-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                      <PhoneCall size={16} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600 block">
                        Liên Hệ & Địa Điểm
                      </span>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                        Hotline/Zalo 24/7: 033.229.8065
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Nav 6: Cổng Đào Tạo (Dropdown Box) */}
            <div className="relative group">
              <button
                type="button"
                className={`text-[13px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  pathname.startsWith("/portal") || pathname.startsWith("/admin")
                    ? "text-blue-600 bg-blue-50/80 font-extrabold"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <GraduationCap size={15} className="text-blue-600" />
                <span>Cổng Đào Tạo</span>
                <ChevronDown size={12} className="text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute top-full right-0 hidden group-hover:block pt-2 z-50">
                <div className="w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/portal/student"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                      <GraduationCap size={15} />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold">Cổng Học Viên</div>
                      <div className="text-[10px] text-slate-400 font-normal">Lộ trình & Nộp bài</div>
                    </div>
                  </Link>

                  <Link
                    href="/portal/teacher"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Users size={15} />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold">Cổng Giảng Viên</div>
                      <div className="text-[10px] text-slate-400 font-normal">Điểm danh & Chấm bài</div>
                    </div>
                  </Link>

                  <Link
                    href="/portal/academic"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <BookOpen size={15} />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold">Cổng Giáo Vụ</div>
                      <div className="text-[10px] text-slate-400 font-normal">Xếp lớp & Chứng nhận QR</div>
                    </div>
                  </Link>

                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors border-t border-slate-100 pt-2"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <ShieldCheck size={15} />
                    </div>
                    <div>
                      <div className="text-purple-700 font-bold">Quản Trị Hệ Thống</div>
                      <div className="text-[10px] text-slate-400 font-normal">Control Hub & Leads CRM</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </nav>

          {/* 3. RIGHT: DIRECT ACTION BUTTON & MOBILE TOGGLE */}
          <div className="flex items-center gap-3 shrink-0">
            
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
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>
      </div>

      {/* 4. DESKTOP MEGA MENU DROPDOWN (FOR KHÓA HỌC) */}
      {isMegaMenuOpen && (
        <div className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-in fade-in slide-in-from-top-1 duration-200 z-50">
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
                      <span>📚 Thư viện tài liệu & đề thi</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/bang-gia" className="text-slate-200 hover:text-cyan-300 flex items-center gap-1.5 py-0.5">
                      <span>💰 Bảng giá học phí ưu đãi nhóm</span>
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

      {/* 5. MOBILE ACCORDION DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="px-5 py-6 space-y-2 max-h-[85vh] overflow-y-auto">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              Trang chủ
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100">
              <span className="px-4 text-[10px] font-black uppercase text-blue-600 tracking-wider">Chương Trình Đào Tạo</span>
            </div>
            <Link
              href="/khoa-hoc"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              Tất Cả Khóa Học & Lộ Trình
            </Link>
            <Link
              href="/mos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              Luyện Thi MOS 2019 / 365 (Bao Đậu)
            </Link>
            <Link
              href="/ic3"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              Chứng Chỉ IC3 GS6 Chuẩn ĐH
            </Link>
            <Link
              href="/excel"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              Master Excel & Dashboard
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100">
              <span className="px-4 text-[10px] font-black uppercase text-cyan-600 tracking-wider">Luyện Thi & Học Liệu</span>
            </div>
            <Link
              href="/thi-thu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold text-blue-600 bg-blue-50/60"
            >
              <span>🎯 Thi Thử MOS / IC3 Online</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">HOT</span>
            </Link>
            <Link
              href="/tai-lieu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              📚 Kho Tài Liệu & Đề Thi Mẫu Free
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100">
              <span className="px-4 text-[10px] font-black uppercase text-indigo-600 tracking-wider">Tin Tức & Cẩm Nang</span>
            </div>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              💡 Cẩm Nang & Bí Quyết Luyện Thi
            </Link>
            <Link
              href="/tin-cong-nghe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50/60"
            >
              <span>⚡️ Tin Công Nghệ & AI Engine</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">Mới</span>
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100">
              <span className="px-4 text-[10px] font-black uppercase text-amber-600 tracking-wider">Thông Tin & Học Phí</span>
            </div>
            <Link
              href="/bang-gia"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              💰 Bảng Giá Học Phí & Ưu Đãi
            </Link>
            <Link
              href="/gioi-thieu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              Giới Thiệu Trung Tâm
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100">
              <span className="px-4 text-[10px] font-black uppercase text-purple-600 tracking-wider">Cổng Đào Tạo & Học Vụ</span>
            </div>
            <Link
              href="/portal/student"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <GraduationCap size={15} className="text-cyan-500" />
              <span>Cổng Học Viên (Lộ trình & Nộp bài)</span>
            </Link>
            <Link
              href="/portal/teacher"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <Users size={15} className="text-emerald-500" />
              <span>Cổng Giảng Viên (Điểm danh & Chấm bài)</span>
            </Link>
            <Link
              href="/portal/academic"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <BookOpen size={15} className="text-amber-500" />
              <span>Cổng Giáo Vụ (Xếp lớp & Cảnh báo)</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-purple-600 hover:bg-purple-50"
            >
              <ShieldCheck size={15} className="text-purple-500" />
              <span>Cổng Quản Trị Hệ Thống (Admin)</span>
            </Link>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/lien-he"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-blue-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg text-center"
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
