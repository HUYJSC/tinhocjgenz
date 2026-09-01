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
  Target, 
  Tag, 
  PhoneCall,
  Bot,
  Layers
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsMobileMenuOpen(false);
  }

  // Scroll detection for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200" 
        : "bg-white border-b border-slate-200/80"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* 1. LEFT: SLEEK BRAND LOGO (NGAY HÀNG THẲNG LỐI) */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 py-1 group">
          <img 
            src="/logo-icon.png" 
            alt="Tin Học Gen Z Logo" 
            className="h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-200" 
          />
          <div className="flex flex-col justify-center">
            <span className="text-[15px] font-black tracking-tight text-slate-900 leading-tight group-hover:text-blue-600 transition-colors font-display whitespace-nowrap">
              TIN HỌC GEN Z
            </span>
            <div className="text-[10px] text-slate-500 font-bold tracking-wider flex items-center gap-1.5 leading-tight whitespace-nowrap mt-0.5">
              <span className="text-blue-600 font-black">MOS</span>
              <span className="text-slate-300">•</span>
              <span className="text-cyan-600 font-black">IC3</span>
              <span className="text-slate-300">•</span>
              <span>VĂN PHÒNG</span>
            </div>
          </div>
        </Link>

        {/* 2. CENTER: GỘP GỌN 4 DROPDOWN NGAY HÀNG THẲNG LỐI */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
          
          {/* Item 1: KHÓA HỌC (Dropdown 2 Cột Gọn Nhất) */}
          <div className="relative group">
            <button
              type="button"
              className={`h-9 px-3 rounded-xl text-[13px] font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                pathname.startsWith("/khoa-hoc") || pathname === "/mos" || pathname === "/ic3" || pathname === "/excel" || pathname === "/tin-hoc-van-phong"
                  ? "text-blue-600 bg-blue-50 font-extrabold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <span>Khóa Học & Lộ Trình</span>
              <ChevronDown size={13} className="text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute top-full left-0 hidden group-hover:block pt-1.5 z-50">
              <div className="w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Cột 1: Chứng chỉ Quốc tế */}
                  <div className="space-y-1">
                    <span className="px-2.5 text-[10px] font-black uppercase text-blue-600 tracking-wider flex items-center gap-1.5 mb-1.5">
                      <Award size={13} />
                      <span>Chứng Chỉ Quốc Tế</span>
                    </span>
                    <Link
                      href="/mos"
                      className="flex flex-col px-2.5 py-1.5 rounded-xl hover:bg-blue-50 text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-xs font-bold">Luyện Thi MOS 2019 / 365</span>
                      <span className="text-[10px] text-slate-400 font-medium">Word, Excel, PPT cấp tốc</span>
                    </Link>
                    <Link
                      href="/ic3"
                      className="flex flex-col px-2.5 py-1.5 rounded-xl hover:bg-blue-50 text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-xs font-bold">Chứng Chỉ IC3 GS6 Chuẩn ĐH</span>
                      <span className="text-[10px] text-slate-400 font-medium">Nền tảng kỹ năng số quốc tế</span>
                    </Link>
                    <Link
                      href="/cntt-co-ban"
                      className="flex flex-col px-2.5 py-1.5 rounded-xl hover:bg-blue-50 text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-xs font-bold">Ứng Dụng CNTT Cơ Bản</span>
                      <span className="text-[10px] text-slate-400 font-medium">Chuẩn Bộ TT&TT Thông tư 03</span>
                    </Link>
                  </div>

                  {/* Cột 2: Thực chiến & Kỹ năng số */}
                  <div className="space-y-1">
                    <span className="px-2.5 text-[10px] font-black uppercase text-indigo-600 tracking-wider flex items-center gap-1.5 mb-1.5">
                      <Layers size={13} />
                      <span>Tin Học Thực Chiến</span>
                    </span>
                    <Link
                      href="/excel"
                      className="flex flex-col px-2.5 py-1.5 rounded-xl hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 transition-colors"
                    >
                      <span className="text-xs font-bold">Master Excel & Dashboard</span>
                      <span className="text-[10px] text-slate-400 font-medium">XLOOKUP, Pivot Table, Báo cáo</span>
                    </Link>
                    <Link
                      href="/word"
                      className="flex flex-col px-2.5 py-1.5 rounded-xl hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 transition-colors"
                    >
                      <span className="text-xs font-bold">Master Word Chuẩn Nghị Định 30</span>
                      <span className="text-[10px] text-slate-400 font-medium">Soạn thảo văn bản, Mail Merge</span>
                    </Link>
                    <Link
                      href="/powerpoint"
                      className="flex flex-col px-2.5 py-1.5 rounded-xl hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 transition-colors"
                    >
                      <span className="text-xs font-bold">Master PowerPoint & Morph 3D</span>
                      <span className="text-[10px] text-slate-400 font-medium">Thiết kế Slide thuyết trình dự án</span>
                    </Link>
                  </div>

                </div>

                {/* Bottom link */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between px-2">
                  <span className="text-[11px] text-slate-500 font-medium">Cam kết tài trợ học lại 100% miễn phí</span>
                  <Link
                    href="/khoa-hoc"
                    className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Xem tất cả khóa học</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2: HỌC LIỆU & THI THỬ (Gộp Thi Thử, Tài Liệu, Blog, AI) */}
          <div className="relative group">
            <button
              type="button"
              className={`h-9 px-3 rounded-xl text-[13px] font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                pathname === "/thi-thu" || pathname === "/tai-lieu" || pathname.startsWith("/blog") || pathname.startsWith("/tin-cong-nghe")
                  ? "text-blue-600 bg-blue-50 font-extrabold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <span>Học Liệu & Thi Thử</span>
              <ChevronDown size={13} className="text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute top-full left-0 hidden group-hover:block pt-1.5 z-50">
              <div className="w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                
                <Link
                  href="/thi-thu"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50 group/item transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Target size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600">Thi Thử Online</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-cyan-100 text-cyan-800">HOT</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                      Test 5 phút dự đoán điểm Certiport 1000đ
                    </p>
                  </div>
                </Link>

                <Link
                  href="/tai-lieu"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50 group/item transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 group-hover/item:text-emerald-600">Kho Tài Liệu & Đề Thi</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-100 text-emerald-800">Free</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                      50+ đề thi thật, phím tắt & file mẫu miễn phí
                    </p>
                  </div>
                </Link>

                <Link
                  href="/blog"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50 group/item transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600 block">
                      Cẩm Nang & Mẹo Thi 1000đ
                    </span>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                      Bí quyết làm bài và hướng dẫn thực hành
                    </p>
                  </div>
                </Link>

                <Link
                  href="/tin-cong-nghe"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 group/item transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 group-hover/item:text-indigo-600">Tin Công Nghệ & AI</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-indigo-100 text-indigo-800 flex items-center gap-0.5">
                        <Sparkles size={8} /> AI
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                      Tự động hóa tác vụ văn phòng với trí tuệ nhân tạo
                    </p>
                  </div>
                </Link>

              </div>
            </div>
          </div>

          {/* Item 3: HỌC PHÍ & GIỚI THIỆU (Gộp Bảng Giá, Giới Thiệu, Liên Hệ) */}
          <div className="relative group">
            <button
              type="button"
              className={`h-9 px-3 rounded-xl text-[13px] font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                pathname === "/bang-gia" || pathname === "/gioi-thieu" || pathname === "/lien-he"
                  ? "text-blue-600 bg-blue-50 font-extrabold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <span>Học Phí & Giới Thiệu</span>
              <ChevronDown size={13} className="text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute top-full left-0 hidden group-hover:block pt-1.5 z-50">
              <div className="w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                
                <Link
                  href="/bang-gia"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50 group/item transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Tag size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover/item:text-amber-600 block">
                      Bảng Giá & Ưu Đãi Nhóm
                    </span>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                      Học phí công khai, giảm tới 40% sinh viên
                    </p>
                  </div>
                </Link>

                <Link
                  href="/gioi-thieu"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50 group/item transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Users size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600 block">
                      Giới Thiệu Trung Tâm
                    </span>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                      Đội ngũ giảng viên MOS Master Trainer
                    </p>
                  </div>
                </Link>

                <Link
                  href="/lien-he"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cyan-50 group/item transition-colors border-t border-slate-100 pt-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                    <PhoneCall size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover/item:text-cyan-600 block">
                      Liên Hệ & Lịch Thi
                    </span>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
                      Hotline/Zalo hỗ trợ 24/7: 033.229.8065
                    </p>
                  </div>
                </Link>

              </div>
            </div>
          </div>

          {/* Item 4: CỔNG ĐÀO TẠO (Cổng Phân Quyền) */}
          <div className="relative group">
            <button
              type="button"
              className={`h-9 px-3 rounded-xl text-[13px] font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                pathname.startsWith("/portal") || pathname.startsWith("/admin")
                  ? "text-blue-600 bg-blue-50 font-extrabold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <GraduationCap size={15} className="text-blue-600" />
              <span>Cổng Đào Tạo</span>
              <ChevronDown size={13} className="text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            
            <div className="absolute top-full right-0 hidden group-hover:block pt-1.5 z-50">
              <div className="w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
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
                    <div className="text-[10px] text-slate-400 font-normal">Xếp lớp & Duyệt bằng QR</div>
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
                    <div className="text-[10px] text-slate-400 font-normal">Control Hub & CRM</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </nav>

        {/* 3. RIGHT: DIRECT ACTION BUTTON & MOBILE TOGGLE (NGAY HÀNG THẲNG LỐI) */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Action CTA Button (Chiều cao khớp h-10 ngay hàng) */}
          <Link
            href="/lien-he"
            className="hidden sm:inline-flex items-center gap-1.5 h-10 px-5 rounded-xl text-xs font-black tracking-wide uppercase bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-sm hover:shadow transition-all hover:scale-[1.02] whitespace-nowrap"
          >
            <span>Đăng Ký Học</span>
            <ArrowRight size={13} />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </div>

      {/* 4. MOBILE ACCORDION DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="px-5 py-6 space-y-2 max-h-[85vh] overflow-y-auto font-sans">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              Trang chủ
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100">
              <span className="px-4 text-[10px] font-black uppercase text-blue-600 tracking-wider">Khóa Học & Lộ Trình</span>
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
              <span className="px-4 text-[10px] font-black uppercase text-cyan-600 tracking-wider">Học Liệu & Thi Thử</span>
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
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              💡 Cẩm Nang & Mẹo Thi 1000đ
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
              <span className="px-4 text-[10px] font-black uppercase text-amber-600 tracking-wider">Học Phí & Giới Thiệu</span>
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
            <Link
              href="/lien-he"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              Liên Hệ & Lịch Thi 24/7
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
                className="w-full h-11 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg text-center"
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
