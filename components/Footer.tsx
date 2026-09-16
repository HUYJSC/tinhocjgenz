"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Award, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-[#0057B8] text-white relative font-sans border-t border-[#0057B8]"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        
        {/* RESPONSIVE GRID: 4 columns desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/30 items-start">
          
          {/* CỘT 1: THƯƠNG HIỆU */}
          <div className="flex flex-col gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2.5 w-max focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Về trang chủ Tin Học Gen Z"
            >
              <img
                src="/logo-icon.png"
                alt="Logo Tin Học Gen Z"
                width={40}
                height={40}
                className="h-10 w-auto object-contain bg-white rounded-lg p-0.5"
              />
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-white leading-tight font-display">
                  TIN HỌC GEN Z
                </span>
                <span className="text-[10px] font-bold text-white tracking-wider mt-0.5">
                  MOS • IC3 • TIN HỌC VĂN PHÒNG
                </span>
              </div>
            </Link>

            <p className="text-white text-xs leading-relaxed max-w-sm mt-1">
              Đào tạo tin học văn phòng thực chiến và luyện thi chứng chỉ quốc tế MOS, IC3 GS6 chuẩn Certiport. Hỗ trợ học lại miễn phí cho đến khi thi đạt chuẩn.
            </p>

            <div className="flex items-center gap-2 p-2.5 rounded-xl border border-white max-w-sm mt-2">
              <Award size={18} className="text-white shrink-0" />
              <div className="text-xs font-bold leading-tight">
                <span>Giảng viên đạt chuẩn Certiport Master</span>
              </div>
            </div>

            {/* Social Channels: Verified Fanpage only (LINK-01: generic youtube link removed) */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-3 rounded-lg border border-white text-white hover:bg-white hover:text-[#0057B8] flex items-center gap-1.5 transition-colors text-xs font-bold"
                aria-label="Theo dõi Fanpage Tin Học Gen Z trên Facebook"
              >
                <span>Fanpage Facebook</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={SITE_CONFIG.contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-3 rounded-lg border border-white text-white hover:bg-white hover:text-[#0057B8] flex items-center gap-1.5 transition-colors text-xs font-bold"
                aria-label="Liên hệ Zalo Tin Học Gen Z"
              >
                <span>Zalo Tư Vấn</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* CỘT 2: CHƯƠNG TRÌNH ĐÀO TẠO */}
          <nav aria-label="Chương trình đào tạo" className="w-full space-y-3">
            <h3 className="font-black text-xs uppercase tracking-wider text-white border-b border-white/40 pb-2">
              Chương trình đào tạo
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/khoa-hoc/mos-master-combo" className="hover:underline">
                  Combo Luyện Thi MOS 3 Môn (Word, Excel, PPT)
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc/mos-2019" className="hover:underline">
                  Luyện Thi MOS Từng Môn Cấp Tốc
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc/ic3-gs6" className="hover:underline">
                  Chứng Chỉ IC3 GS6 Chuẩn Đại Học
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc/excel-master" className="hover:underline">
                  Master Excel & Dashboard Báo Cáo
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc/cntt-co-ban" className="hover:underline">
                  Ứng Dụng CNTT Cơ Bản (Thông Tư 03)
                </Link>
              </li>
            </ul>
          </nav>

          {/* CỘT 3: HỌC LIỆU & HỆ THỐNG */}
          <nav aria-label="Học liệu và hệ thống" className="w-full space-y-3">
            <h3 className="font-black text-xs uppercase tracking-wider text-white border-b border-white/40 pb-2">
              Học liệu & Hệ thống
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/thi-thu" className="hover:underline">
                  Thi thử MOS / IC3 Online
                </Link>
              </li>
              <li>
                <Link href="/tai-lieu" className="hover:underline">
                  Kho đề thi mẫu & Phím tắt
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Cẩm nang & Mẹo thi 1000 điểm
                </Link>
              </li>
              <li>
                <Link href="/bang-gia" className="hover:underline">
                  Bảng giá & Chính sách học phí
                </Link>
              </li>
              <li>
                <a
                  href="https://hoctructuyen.tinhocgenz.io.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Cổng học viên LMS</span>
                  <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </nav>

          {/* CỘT 4: THÔNG TIN LIÊN HỆ */}
          <div className="space-y-3 text-xs">
            <h3 className="font-black uppercase tracking-wider text-white border-b border-white/40 pb-2">
              Liên hệ tư vấn
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <Phone size={14} className="shrink-0 mt-0.5" />
                <span>Hotline / Zalo: <strong>033.229.8065</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="shrink-0 mt-0.5" />
                <span>Email: tinhocgenz@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5" />
                <span>Đào tạo Online Toàn quốc & Trực tiếp tại cơ sở đào tạo liên kết</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/lien-he"
                className="w-full h-9 flex items-center justify-center rounded-lg bg-white text-[#0057B8] font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-colors"
              >
                Gửi yêu cầu tư vấn
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: COPYRIGHT & POLICY */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white">
          <p>© {currentYear} Tin Học Gen Z. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-4">
            <Link href="/chinh-sach-bao-mat" className="hover:underline">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan-dich-vu" className="hover:underline">
              Điều khoản dịch vụ
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
