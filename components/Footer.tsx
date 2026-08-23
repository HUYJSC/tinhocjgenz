import Link from "next/link";
import { Laptop, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Intro */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="group flex items-center gap-3.5 w-max">
              <img
                src="/logo-icon.png"
                alt="PH Digital Education"
                className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-white leading-tight font-display">
                  PH DIGITAL EDUCATION
                </span>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-1 flex items-center gap-1.5 leading-none">
                  <span>IT</span>
                  <span className="text-amber-400 font-bold">•</span>
                  <span className="text-cyan-400 font-black">IC3</span>
                  <span className="text-amber-400 font-bold">•</span>
                  <span className="text-blue-400 font-black">MOS</span>
                </div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mt-1">
              Hệ sinh thái đào tạo Tin học Văn phòng Thực chiến & Luyện thi Chứng chỉ Quốc tế MOS, IC3 chuẩn Certiport. Cam kết chuẩn đầu ra Đại học bao đỗ 100%.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <a
                href={CONTACT_INFO.facebookUrl || "https://www.facebook.com/Thaygiaogenz13"}
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
                href={CONTACT_INFO.youtubeUrl || "https://youtube.com"}
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
                  Luyện thi MOS 3 môn chuẩn đầu ra
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Chứng chỉ kỹ năng số IC3 GS6
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Excel Dashboard chuyên sâu doanh nghiệp
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Ứng dụng AI văn phòng 10X hiệu suất
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: University Standards */}
          <div>
            <h3 className="text-white text-base font-bold mb-5 tracking-wide uppercase">Chuẩn Đầu Ra ĐH</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Chuẩn đầu ra ĐH Công Nghệ Đồng Nai (DNTU)
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Chuẩn đầu ra ĐH Lạc Hồng (LHU)
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Chuẩn đầu ra ĐH Kinh Tế TP.HCM (UEH)
                </Link>
              </li>
              <li>
                <Link href="/khoa-hoc" className="hover:text-blue-400 smooth-transition text-slate-400 hover:translate-x-1 inline-block">
                  Hội đồng khảo thí Certiport Hoa Kỳ
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
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-blue-400 smooth-transition font-medium">
                  {CONTACT_INFO.displayPhone}
                </a>
              </li>
              <li className="flex gap-3 text-slate-400">
                <Mail size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-blue-400 smooth-transition">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex gap-3 text-slate-400">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {CONTACT_INFO.address}
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
          <p>© {currentYear} PH DIGITAL EDUCATION. All rights reserved. Hệ thống đào tạo CNTT & Chứng chỉ Quốc tế.</p>
          <div className="flex gap-6">
            <Link href="/gioi-thieu" className="hover:text-slate-400 smooth-transition">Điều khoản đào tạo</Link>
            <Link href="/lien-he" className="hover:text-slate-400 smooth-transition">Cam kết chuẩn đầu ra</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
