"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, ArrowRight, Sparkles, BookOpen, Award, 
  FileText, HelpCircle, ShieldCheck, Phone, ChevronDown, 
  Clock, School, ExternalLink, Grid 
} from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection
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

  // Close mega menu on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
  }, [pathname]);

  const mainNavItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Khóa học MOS/IC3", href: "/khoa-hoc" },
    { label: "Thi Thử Online", href: "/thi-thu", isHot: true },
    { label: "Tài Liệu Free", href: "/tai-lieu" },
    { label: "Bảng Giá", href: "/bang-gia" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-2.5 sm:py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. LEFT ZONE: 3-LINE MENU TRIGGER + LOGO & BRAND */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* 3-Line Hamburger Button on the LEFT */}
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={`px-3 py-2 rounded-2xl transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs border ${
                isMegaMenuOpen
                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
              }`}
              aria-label="Danh mục tiện ích & khóa học"
              title="Mở danh mục tiện ích"
            >
              {isMegaMenuOpen ? <X size={18} className="text-cyan-400" /> : <Menu size={18} className="text-slate-900" />}
              <span className="hidden sm:inline text-xs font-black uppercase tracking-wider">Danh Mục</span>
              <ChevronDown size={14} className={`hidden sm:inline transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180 text-cyan-400" : "text-slate-400"}`} />
            </button>

            {/* Seamless Brand Logo */}
            <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 py-1">
              <img 
                src="/logo-icon.png" 
                alt="PH Digital Education Logo" 
                className="h-10 sm:h-11 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" 
              />
              <div className="flex flex-col justify-center">
                <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 leading-tight group-hover:text-blue-600 transition-colors font-display">
                  PH DIGITAL EDUCATION
                </span>
                <div className="text-[9px] sm:text-[10.5px] font-bold tracking-wider mt-0.5 flex items-center gap-1 sm:gap-1.5 leading-none">
                  <span className="hidden md:inline text-slate-500">Information Technology</span>
                  <span className="inline md:hidden text-slate-500">IT</span>
                  <span className="text-amber-500 font-black">•</span>
                  <span className="text-blue-600 font-black">IC3</span>
                  <span className="text-amber-500 font-black">•</span>
                  <span className="text-indigo-600 font-black">MOS</span>
                </div>
              </div>
            </Link>

          </div>

          {/* 2. CENTER ZONE: Clean Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1.5 px-0.5 text-xs font-black tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? "text-blue-600 nav-link-active"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.isHot && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-cyan-50 text-cyan-700 border border-cyan-200">
                      HOT
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT ZONE: Direct CTA & Hotline */}
          <div className="flex items-center gap-3 shrink-0">
            
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-black transition-all"
            >
              <Phone size={13} className="text-blue-600" />
              <span>{CONTACT_INFO.displayPhone}</span>
            </a>

            {/* Direct Booking CTA Button */}
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-full text-xs font-black tracking-wide uppercase btn-premium-primary group shadow-md"
            >
              <span>Đăng Ký Học</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>

          </div>

        </div>
      </div>

      {/* 4. MEGA MENU SLIDE-DOWN DRAWER */}
      {isMegaMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl animate-fade-in z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Col 1: Khóa Học Chủ Lực */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-wider">
                  <Award size={16} />
                  <span>Khóa Học & Chuẩn Đầu Ra</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm font-bold">
                  <li>
                    <Link href="/khoa-hoc/mos-master-combo" className="text-slate-700 hover:text-blue-600 flex items-center justify-between group">
                      <span>Combo MOS 3 Môn (Word/Excel/PPT)</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/khoa-hoc/mos-2019" className="text-slate-700 hover:text-blue-600 flex items-center justify-between group">
                      <span>Luyện Thi MOS Từng Môn (Cấp Tốc)</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/khoa-hoc/ic3-gs6" className="text-slate-700 hover:text-blue-600 flex items-center justify-between group">
                      <span>Chứng Chỉ Kỹ Năng Số IC3 GS6</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/khoa-hoc/combo-survival-office" className="text-slate-700 hover:text-blue-600 flex items-center justify-between group">
                      <span>Combo Thực Chiến Văn Phòng</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/khoa-hoc" className="text-blue-600 font-black flex items-center gap-1 pt-1">
                      <span>Xem tất cả khóa học →</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 2: Tiện Ích Sinh Viên */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-600 font-black text-xs uppercase tracking-wider">
                  <Sparkles size={16} />
                  <span>Tiện Ích & Thi Thử</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm font-bold">
                  <li>
                    <Link href="/thi-thu" className="text-slate-700 hover:text-cyan-600 flex items-center justify-between group">
                      <span>🎯 Thi thử MOS / IC3 Online Free</span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-cyan-50 text-cyan-700">Miễn phí</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tai-lieu" className="text-slate-700 hover:text-cyan-600 flex items-center justify-between group">
                      <span>📚 Tải trọn bộ 50 đề thi Certiport</span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-50 text-emerald-700">PDF/ZIP</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/bang-gia" className="text-slate-700 hover:text-cyan-600 flex items-center justify-between group">
                      <span>💰 Bảng học phí & Ưu đãi nhóm 30%</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gioi-thieu" className="text-slate-700 hover:text-cyan-600 flex items-center justify-between group">
                      <span>🏛️ Giới thiệu trung tâm PH Digital</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Chuẩn Đầu Ra Các Trường ĐH */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-wider">
                  <School size={16} />
                  <span>Chuẩn Đầu Ra Đại Học</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 font-medium">
                  <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <div className="font-bold text-slate-900">ĐH Công Nghệ Đồng Nai (DNTU)</div>
                    <div className="text-[11px] text-blue-600 font-semibold">MOS Word/Excel/PPT ≥ 700đ hoặc IC3</div>
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <div className="font-bold text-slate-900">ĐH Lạc Hồng (LHU) & UEH</div>
                    <div className="text-[11px] text-blue-600 font-semibold">MOS Specialist & IC3 GS6 Quốc tế</div>
                  </li>
                </ul>
              </div>

              {/* Col 4: Liên Hệ & Hỗ Trợ Nhanh */}
              <div className="space-y-4 bg-slate-900 text-white p-5 rounded-3xl">
                <div className="text-xs font-black text-cyan-400 uppercase tracking-wider">
                  Tư Vấn & Hỗ Trợ 24/7
                </div>
                <div className="space-y-2 text-xs">
                  <p className="text-slate-300">Hotline / Zalo hỗ trợ giải đáp xếp lớp:</p>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="block text-base font-black text-cyan-300 hover:underline"
                  >
                    {CONTACT_INFO.displayPhone}
                  </a>
                </div>
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <Link
                    href="/lien-he"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <span>Gửi Yêu Cầu Tư Vấn</span>
                    <ArrowRight size={13} />
                  </Link>
                  <Link
                    href="/admin"
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1"
                  >
                    <span>Trang Quản Trị (Admin)</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </header>
  );
}
