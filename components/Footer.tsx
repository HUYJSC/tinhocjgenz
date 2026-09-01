"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Clock,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Accordion state for mobile (< 768px)
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    courses: true, // open by default for visibility
    resources: false,
    contact: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer 
      className="bg-slate-950 text-slate-300 relative overflow-hidden font-sans border-t border-slate-800"
      role="contentinfo"
    >
      {/* Top accent glow divider line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" 
        aria-hidden="true"
      />
      
      {/* Ambient background light */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/5 blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      {/* Main Footer Container */}
      <div className="w-[min(100%-48px,1280px)] mx-auto pt-14 pb-12 lg:pt-16 lg:pb-14 relative z-10">
        
        {/* RESPONSIVE GRID
            - Desktop (>= 1200px): 4 balanced columns (minmax)
            - Tablet (768px - 1199px): 2 balanced columns with 32px gap
            - Mobile (< 768px): 1 column with clean accordions
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(280px,1.45fr)_minmax(240px,1.15fr)_minmax(210px,0.9fr)_minmax(260px,1.1fr)] gap-8 lg:gap-12 pb-12 border-b border-slate-800/80 items-start">
          
          {/* CỘT 1 — THƯƠNG HIỆU (BRAND & ACCREDITATION) */}
          <div className="flex flex-col gap-4">
            <Link 
              href="/" 
              className="group flex items-center gap-3 w-max focus-visible:outline-2 focus-visible:outline-blue-500 rounded-lg"
              aria-label="Về trang chủ Tin Học Gen Z"
            >
              <img
                src="/logo-icon.png"
                alt="Logo Tin Học Gen Z"
                width={48}
                height={48}
                className="h-11 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-white leading-tight font-display">
                  TIN HỌC GEN Z
                </span>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-1 flex items-center gap-1.5 leading-none">
                  <span className="text-blue-400 font-black">MOS</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-cyan-400 font-black">IC3</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-300 font-medium">TIN HỌC VĂN PHÒNG</span>
                </div>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-0.5">
              Hệ sinh thái đào tạo Tin học văn phòng thực chiến và luyện thi chứng chỉ quốc tế MOS, IC3 GS6 chuẩn Certiport. Đồng hành cùng sinh viên và người đi làm làm chủ kỹ năng số trong kỷ nguyên AI.
            </p>

            {/* Accreditation Badge */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800/90 max-w-sm">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                <Award size={18} aria-hidden="true" />
              </div>
              <div className="leading-tight">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">
                  Tiêu Chuẩn Đào Tạo
                </span>
                <span className="text-xs font-bold text-slate-200">
                  Giảng Viên Certiport Master Trainer
                </span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center gap-2 transition-all border border-slate-800 text-xs font-bold focus-visible:outline-2 focus-visible:outline-blue-500"
                aria-label="Theo dõi Fanpage Tin Học Gen Z trên Facebook (mở trong tab mới)"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                <span>Fanpage</span>
                <ExternalLink size={11} className="text-slate-500" aria-hidden="true" />
              </a>

              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white flex items-center gap-2 transition-all border border-slate-800 text-xs font-bold focus-visible:outline-2 focus-visible:outline-red-500"
                aria-label="Kênh video bài giảng Tin Học Gen Z trên YouTube (mở trong tab mới)"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814a2.504 2.504 0 0 1-1.768 1.768C18.32 19 12 19 12 19s-6.32 0-7.812-.418a2.504 2.504 0 0 1-1.768-1.768C2 15.32 2 12 2 12s0-3.32.42-4.814a2.504 2.504 0 0 1 1.768-1.768C5.68 5 12 5 12 5s6.32 0 7.812.418zM9.75 15.02l5.75-3.02-5.75-3v6z" clipRule="evenodd" />
                </svg>
                <span>Bài Giảng</span>
                <ExternalLink size={11} className="text-slate-500" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* CỘT 2 — CHƯƠNG TRÌNH ĐÀO TẠO (COURSES NAV) */}
          <nav aria-label="Chương trình đào tạo tin học" className="w-full">
            {/* Mobile accordion button */}
            <button
              type="button"
              onClick={() => toggleSection("courses")}
              className="w-full flex items-center justify-between py-2 text-left font-black text-sm uppercase tracking-wider text-white md:cursor-default focus-visible:outline-2 focus-visible:outline-blue-500 rounded"
              aria-expanded={openSections.courses}
              aria-controls="footer-courses-list"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-blue-500 rounded-full" aria-hidden="true" />
                Chương Trình Đào Tạo
              </span>
              <ChevronDown 
                size={16} 
                className={`md:hidden text-slate-400 transition-transform duration-200 ${openSections.courses ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {/* Link List */}
            <ul 
              id="footer-courses-list"
              className={`mt-4 space-y-3 text-sm transition-all duration-200 ${
                openSections.courses ? "block" : "hidden md:block"
              }`}
            >
              <li>
                <Link 
                  href="/mos" 
                  className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded py-0.5"
                >
                  <span>Luyện thi MOS 2019/365</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/ic3" 
                  className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded py-0.5"
                >
                  <span>Chứng chỉ IC3 GS6</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/excel" 
                  className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded py-0.5"
                >
                  <span>Master Excel & Dashboard</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/word" 
                  className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded py-0.5"
                >
                  <span>Soạn thảo Word chuẩn NĐ 30</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/powerpoint" 
                  className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded py-0.5"
                >
                  <span>Thiết kế PowerPoint</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/python" 
                  className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded py-0.5"
                >
                  <span>Python tự động hóa dữ liệu</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/cntt-co-ban" 
                  className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded py-0.5"
                >
                  <span>Ứng dụng CNTT cơ bản</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <Link 
                  href="/khoa-hoc" 
                  className="text-blue-400 font-extrabold hover:text-blue-300 transition-colors inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-blue-400 rounded py-0.5"
                >
                  <span>Xem tất cả khóa học</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* CỘT 3 — HỌC LIỆU & THI THỬ (RESOURCES NAV) */}
          <nav aria-label="Học liệu và thi thử" className="w-full">
            {/* Mobile accordion button */}
            <button
              type="button"
              onClick={() => toggleSection("resources")}
              className="w-full flex items-center justify-between py-2 text-left font-black text-sm uppercase tracking-wider text-white md:cursor-default focus-visible:outline-2 focus-visible:outline-blue-500 rounded"
              aria-expanded={openSections.resources}
              aria-controls="footer-resources-list"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-cyan-400 rounded-full" aria-hidden="true" />
                Học Liệu & Thi Thử
              </span>
              <ChevronDown 
                size={16} 
                className={`md:hidden text-slate-400 transition-transform duration-200 ${openSections.resources ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {/* Link List */}
            <ul 
              id="footer-resources-list"
              className={`mt-4 space-y-3 text-sm transition-all duration-200 ${
                openSections.resources ? "block" : "hidden md:block"
              }`}
            >
              <li>
                <Link 
                  href="/thi-thu" 
                  className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded py-0.5"
                >
                  <span>Thi thử online</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    HOT
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/tai-lieu" 
                  className="text-slate-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-emerald-400 rounded py-0.5"
                >
                  <span>Kho đề thi thử miễn phí</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Free
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-slate-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-amber-400 rounded py-0.5"
                >
                  <span>Cẩm nang và mẹo ôn thi</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/tin-cong-nghe" 
                  className="text-slate-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-indigo-400 rounded py-0.5"
                >
                  <span>Tin học và AI văn phòng</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center gap-0.5">
                    <Sparkles size={8} aria-hidden="true" />
                    AI
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/bang-gia" 
                  className="text-slate-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-blue-400 rounded py-0.5"
                >
                  <span>Bảng giá, ưu đãi nhóm</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <a 
                  href="https://hoctructuyen.tinhocgenz.io.vn/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 font-extrabold hover:text-cyan-300 transition-colors inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded py-0.5"
                >
                  <span>Cổng học tập trực tuyến (LMS)</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>

          {/* CỘT 4 — TƯ VẤN & HỌC VỤ (CONTACT & GUARANTEE) */}
          <section aria-labelledby="footer-contact-title" className="w-full flex flex-col gap-4">
            {/* Section heading */}
            <div className="flex items-center justify-between py-2 text-left font-black text-sm uppercase tracking-wider text-white">
              <span id="footer-contact-title" className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-400 rounded-full" aria-hidden="true" />
                Tư Vấn & Học Vụ
              </span>
            </div>

            {/* Contact Details with Full Readability */}
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-300">
                <Phone size={16} className="text-emerald-400 shrink-0 mt-1" aria-hidden="true" />
                <div className="leading-snug">
                  <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                    Hotline / Zalo
                  </span>
                  <a 
                    href={`tel:${SITE_CONFIG.contact.phone}`} 
                    className="text-white font-bold hover:text-cyan-300 transition-colors whitespace-nowrap text-base"
                    aria-label={`Gọi hotline tư vấn: ${SITE_CONFIG.contact.displayPhone}`}
                  >
                    {SITE_CONFIG.contact.displayPhone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5 text-slate-300">
                <Mail size={16} className="text-blue-400 shrink-0 mt-1" aria-hidden="true" />
                <div className="leading-snug">
                  <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                    Hộp Thư Điện Tử
                  </span>
                  <a 
                    href={`mailto:${SITE_CONFIG.contact.email}`} 
                    className="text-slate-200 hover:text-blue-300 transition-colors break-all text-sm font-medium"
                    aria-label={`Gửi email đến ${SITE_CONFIG.contact.email}`}
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5 text-slate-300">
                <Clock size={16} className="text-amber-400 shrink-0 mt-1" aria-hidden="true" />
                <div className="leading-snug">
                  <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                    Thời Gian Hỗ Trợ
                  </span>
                  <span className="text-slate-300 font-medium text-xs sm:text-sm">
                    08:00 – 21:30 hàng ngày (Cả T7 & CN)
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin size={16} className="text-cyan-400 shrink-0 mt-1" aria-hidden="true" />
                <div className="leading-snug">
                  <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                    Hình Thức Đào Tạo
                  </span>
                  <span className="text-slate-300 font-medium text-xs sm:text-sm">
                    Online tương tác toàn quốc & Phòng thi liên kết
                  </span>
                </div>
              </li>
            </ul>

            {/* Action CTA Button */}
            <div className="pt-1">
              <Link
                href="/lien-he"
                className="w-full inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                <span>Đăng Ký Tư Vấn Ngay</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            {/* Horizontal Guarantee Box (Đủ chiều rộng, không bị kéo hẹp) */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-1 mt-1">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
                <ShieldCheck size={16} aria-hidden="true" />
                <span>Cam Kết Đào Tạo</span>
              </div>
              <p className="text-emerald-200/90 text-xs leading-relaxed font-medium">
                Tài trợ 100% học phí học lại miễn phí nếu chưa đạt điểm chuẩn đầu ra Certiport.
              </p>
            </div>
          </section>

        </div>

        {/* THANH CUỐI TRANG (BOTTOM BAR) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p className="text-center md:text-left leading-normal text-slate-400">
            © {currentYear} TIN HỌC GEN Z. All rights reserved. Hệ thống đào tạo Tin học Văn phòng & Chứng chỉ Quốc tế.
          </p>

          <nav 
            aria-label="Chính sách và điều khoản" 
            className="flex flex-wrap gap-x-5 gap-y-2 items-center justify-center"
          >
            <Link 
              href="/gioi-thieu#bao-mat" 
              className="text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 rounded py-1"
            >
              Chính sách bảo mật
            </Link>
            <Link 
              href="/gioi-thieu#dieu-khoan" 
              className="text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 rounded py-1"
            >
              Điều khoản sử dụng
            </Link>
            <Link 
              href="/gioi-thieu#hoan-tien" 
              className="text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 rounded py-1"
            >
              Chính sách hoàn tiền
            </Link>
            <Link 
              href="/lien-he" 
              className="text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 rounded py-1"
            >
              Liên hệ
            </Link>
            <Link 
              href="/sitemap.xml" 
              className="text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 rounded py-1"
            >
              Sitemap
            </Link>
            <a 
              href="https://hoctructuyen.tinhocgenz.io.vn/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded py-1 pl-1"
            >
              <ShieldCheck size={13} aria-hidden="true" />
              <span>Đăng Nhập LMS</span>
            </a>
          </nav>
        </div>

      </div>
    </footer>
  );
}
