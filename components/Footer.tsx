import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Target,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-10 border-t border-slate-800/80 relative overflow-hidden font-sans">
      {/* Top accent glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
      {/* Subtle background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP: 4-COLUMN EDTECH GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800/80">
          
          {/* CỘT 1: THƯƠNG HIỆU & TIÊU CHUẨN ĐÀO TẠO (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="group flex items-center gap-3 w-max">
              <img
                src="/logo-icon.png"
                alt="Tin Học Gen Z"
                className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-none font-display">
                  TIN HỌC GEN Z
                </span>
                <div className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1.5 leading-none">
                  <span className="text-blue-500 font-black">MOS</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-cyan-400 font-black">IC3</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-300">TIN HỌC VĂN PHÒNG</span>
                </div>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed pr-2">
              Hệ thống đào tạo Tin học văn phòng thực chiến và luyện thi chứng chỉ quốc tế MOS, IC3 GS6 chuẩn Certiport. Đồng hành cùng sinh viên và người đi làm làm chủ kỹ năng số trong thời đại AI.
            </p>

            {/* Certiport Training Badge */}
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs mt-1">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 shrink-0">
                <Award size={18} />
              </div>
              <div className="leading-tight">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">Tiêu Chuẩn Đào Tạo</span>
                <span className="text-xs font-bold text-slate-200">Giảng Viên Certiport Master Trainer</span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2.5 mt-2">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white flex items-center gap-2 transition-all border border-slate-800 text-xs font-bold text-slate-400"
                aria-label="Facebook Tin Học Gen Z"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                <span>Fanpage</span>
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-red-600 hover:text-white flex items-center gap-2 transition-all border border-slate-800 text-xs font-bold text-slate-400"
                aria-label="YouTube Tin Học Gen Z"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814a2.504 2.504 0 0 1-1.768 1.768C18.32 19 12 19 12 19s-6.32 0-7.812-.418a2.504 2.504 0 0 1-1.768-1.768C2 15.32 2 12 2 12s0-3.32.42-4.814a2.504 2.504 0 0 1 1.768-1.768C5.68 5 12 5 12 5s6.32 0 7.812.418zM9.75 15.02l5.75-3.02-5.75-3v6z" clipRule="evenodd" />
                </svg>
                <span>Bài Giảng</span>
              </a>
            </div>
          </div>

          {/* CỘT 2: CÁC KHÓA ĐÀO TẠO TIN HỌC (3 cols) */}
          <div className="lg:col-span-3">
            <span className="text-white text-xs font-black mb-4 tracking-wider uppercase flex items-center gap-1.5 block">
              <GraduationCap size={15} className="text-blue-500" />
              <span>Chương Trình Đào Tạo</span>
            </span>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/mos" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group py-0.5">
                  <span>Luyện Thi MOS 2019 / 365</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </Link>
              </li>
              <li>
                <Link href="/ic3" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group py-0.5">
                  <span>Chứng Chỉ IC3 GS6 Chuẩn ĐH</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </Link>
              </li>
              <li>
                <Link href="/excel" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group py-0.5">
                  <span>Master Excel & Dashboard</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </Link>
              </li>
              <li>
                <Link href="/word" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group py-0.5">
                  <span>Soạn Thảo Word Chuẩn NĐ 30</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </Link>
              </li>
              <li>
                <Link href="/powerpoint" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group py-0.5">
                  <span>Thiết Kế Slide PowerPoint 3D</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </Link>
              </li>
              <li>
                <Link href="/python" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group py-0.5">
                  <span>Python Tự Động Hóa Dữ Liệu</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </Link>
              </li>
              <li>
                <Link href="/cntt-co-ban" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group py-0.5">
                  <span>Ứng Dụng CNTT Cơ Bản (TT03)</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <Link href="/khoa-hoc" className="text-blue-400 font-extrabold hover:text-blue-300 flex items-center gap-1">
                  <span>Xem tất cả khóa học →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 3: HỌC LIỆU & TIỆN ÍCH LUYỆN THI (2.5 cols) */}
          <div className="lg:col-span-2.5">
            <span className="text-white text-xs font-black mb-4 tracking-wider uppercase flex items-center gap-1.5 block">
              <BookOpen size={15} className="text-cyan-400" />
              <span>Học Liệu & Thi Thử</span>
            </span>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/thi-thu" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 py-0.5">
                  <Target size={14} className="text-cyan-400 shrink-0" />
                  <span>Thi Thử Online 1000đ</span>
                </Link>
              </li>
              <li>
                <Link href="/tai-lieu" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 py-0.5">
                  <BookOpen size={14} className="text-emerald-400 shrink-0" />
                  <span>Kho 50+ Đề Thi Thử Free</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 py-0.5">
                  <Sparkles size={14} className="text-amber-400 shrink-0" />
                  <span>Cẩm Nang & Mẹo Ôn Thi</span>
                </Link>
              </li>
              <li>
                <Link href="/tin-cong-nghe" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 py-0.5">
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.2 bg-indigo-500/20 text-indigo-400 rounded">AI</span>
                  <span>Tin Học & AI Văn Phòng</span>
                </Link>
              </li>
              <li>
                <Link href="/bang-gia" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 py-0.5">
                  <span>💰 Bảng Giá Ưu Đãi Nhóm</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <Link href="/portal/student" className="text-cyan-400 font-extrabold hover:text-cyan-300 flex items-center gap-1">
                  <span>Cổng học tập học viên →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 4: THÔNG TIN HỌC VỤ & CAM KẾT (2.5 cols) */}
          <div className="lg:col-span-2.5 flex flex-col gap-4">
            <span className="text-white text-xs font-black mb-0 tracking-wider uppercase flex items-center gap-1.5 block">
              <Phone size={15} className="text-emerald-400" />
              <span>Tư Vấn & Học Vụ</span>
            </span>
            <ul className="space-y-3 text-xs">
              <li className="flex gap-2.5 text-slate-400">
                <Phone size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Hotline / Zalo Tư Vấn</span>
                  <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-slate-200 font-bold hover:text-blue-400 transition-colors">
                    {SITE_CONFIG.contact.displayPhone}
                  </a>
                </div>
              </li>
              <li className="flex gap-2.5 text-slate-400">
                <Mail size={15} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Hộp Thư Học Vụ</span>
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-slate-200 hover:text-blue-400 transition-colors font-medium">
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-2.5 text-slate-400">
                <MapPin size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Hình Thức Đào Tạo</span>
                  <span className="text-slate-300 font-medium">Online tương tác toàn quốc & Cơ sở khảo thí liên kết</span>
                </div>
              </li>
            </ul>

            {/* Guarantee Policy Box */}
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs mt-1 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-black text-[11px] uppercase tracking-wider">
                <ShieldCheck size={14} />
                <span>Cam Kết Đào Tạo</span>
              </div>
              <p className="text-[11px] text-emerald-200/80 leading-relaxed font-medium">
                Tài trợ 100% học phí học lại miễn phí nếu chưa đạt điểm chuẩn đầu ra.
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM: COPYRIGHT & PORTAL QUICK ACCESS */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="text-center sm:text-left">
            © {currentYear} TIN HỌC GEN Z. Bản quyền thuộc về Hệ thống Đào tạo Tin học & Chứng chỉ Quốc tế.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center">
            <Link href="/gioi-thieu" className="hover:text-slate-300 transition-colors">
              Chính Sách Đào Tạo
            </Link>
            <Link href="/lien-he" className="hover:text-slate-300 transition-colors">
              Hỗ Trợ Học Viên
            </Link>
            <Link href="/portal/student" className="hover:text-cyan-400 transition-colors">
              Cổng Học Viên
            </Link>
            <Link href="/admin" className="hover:text-purple-400 text-slate-400 transition-colors flex items-center gap-1 font-bold">
              <ShieldCheck size={13} className="text-purple-400" />
              <span>Quản Trị (/admin)</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
