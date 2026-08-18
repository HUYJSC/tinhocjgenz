import Link from "next/link";
import { Laptop, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Intro */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="group w-max">
              <div className="bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] hover:border-white/20 rounded-2xl px-5 py-3 smooth-transition">
                <img 
                  src="/logo-wide.png" 
                  alt="TinhocGenZ Logo" 
                  className="h-16 w-auto group-hover:scale-[1.02] transition-all duration-500 ease-out" 
                />
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              Khóa học Tin học văn phòng thực chiến theo phong cách hiện đại. Học nhanh - Thực hành ngay - Làm được việc luôn. Đột phá hiệu suất công việc cùng chuyên gia GenZ.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.facebook.com/Thaygiaogenz13"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center smooth-transition"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-slate-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center smooth-transition"
                aria-label="Youtube"
              >
                <svg className="w-5 h-5 text-slate-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814a2.504 2.504 0 0 1-1.768 1.768C18.32 19 12 19 12 19s-6.32 0-7.812-.418a2.504 2.504 0 0 1-1.768-1.768C2 15.32 2 12 2 12s0-3.32.42-4.814a2.504 2.504 0 0 1 1.768-1.768C5.68 5 12 5 12 5s6.32 0 7.812.418zM9.75 15.02l5.75-3.02-5.75-3v6z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Courses Quicklinks */}
          <div>
            <h3 className="text-white text-base font-bold mb-5 tracking-wide uppercase">Khóa Học</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Tin học văn phòng Toàn diện 4.0
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Excel Master Pro thực chiến
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Combo Word & PowerPoint GenZ
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Luyện thi chứng chỉ MOS quốc tế
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Services */}
          <div>
            <h3 className="text-white text-base font-bold mb-5 tracking-wide uppercase">Dịch vụ IT</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/dich-vu" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Cài hệ điều hành Windows
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Cài bộ Microsoft Office
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Cài đặt phần mềm đồ họa
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Cài phần mềm theo yêu cầu
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-base font-bold mb-1 tracking-wide uppercase">Thông Tin Liên Hệ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 text-slate-400">
                <Phone size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <a href="tel:0397912705" className="hover:text-blue-400 smooth-transition">
                  0397.912.705
                </a>
              </li>
              <li className="flex gap-3 text-slate-400">
                <Mail size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <a href="mailto:tinhocgenz@gmail.com" className="hover:text-blue-400 smooth-transition">
                  tinhocgenz@gmail.com
                </a>
              </li>
              <li className="flex gap-3 text-slate-400">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Học trực tuyến & Hỗ trợ toàn quốc
                </span>
              </li>
            </ul>
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-xs mt-3 w-fit">
              <ShieldCheck size={16} className="text-cyan-400 shrink-0" />
              <span className="text-slate-300 font-medium">Bảo mật thông tin 100%</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Thầy giáo GenZ. All rights reserved. Bản quyền thuộc về tinhocgenz.io.vn.</p>
          <div className="flex gap-6">
            <Link href="/gioi-thieu" className="hover:text-slate-400 smooth-transition">Điều khoản dịch vụ</Link>
            <Link href="/lien-he" className="hover:text-slate-400 smooth-transition">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
