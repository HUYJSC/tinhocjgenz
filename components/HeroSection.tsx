import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-white pt-16 pb-24 md:pt-24 md:pb-36 tech-grid-pattern">
      {/* Background Decorative Tech Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Subtle bottom glowing line decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 animate-slide-up">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-xs font-black text-blue-700 shadow-[0_2px_10px_-4px_rgba(37,99,235,0.1)]">
              <Sparkles size={14} className="text-cyan-500 animate-pulse" />
              <span>Phương Pháp Đào Tạo Mới Nhất 2026</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] max-w-2xl">
              Học Tin học văn phòng <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
                theo phong cách GenZ
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-medium text-slate-500 leading-relaxed max-w-2xl">
              Dễ hiểu – Thực hành – Làm được việc ngay. Loại bỏ lý thuyết suông, tập trung thực chiến 100% để bứt phá hiệu suất học tập và làm việc của bạn.
            </p>

            {/* Key Benefits Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-2">
              <div className="flex items-center gap-3 text-slate-700 font-bold text-xs sm:text-sm">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <CheckCircle size={12} className="text-blue-600" />
                </div>
                <span>Không cần kiến thức nền tảng</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 font-bold text-xs sm:text-sm">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <CheckCircle size={12} className="text-blue-600" />
                </div>
                <span>Thực hành case-study thực tế</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 font-bold text-xs sm:text-sm">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <CheckCircle size={12} className="text-blue-600" />
                </div>
                <span>Thầy giáo hỗ trợ 24/7 trọn đời</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 font-bold text-xs sm:text-sm">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <CheckCircle size={12} className="text-blue-600" />
                </div>
                <span>Tặng kho templates độc quyền</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-4 z-10">
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-extrabold uppercase tracking-wide btn-premium-primary group text-center"
              >
                Đăng ký ngay
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
              <Link
                href="/khoa-hoc"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-extrabold uppercase tracking-wide btn-premium-secondary group text-center"
              >
                <BookOpen size={16} className="text-blue-600 group-hover:scale-110 transition-transform duration-350" />
                Xem khóa học
              </Link>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center z-10 lg:mt-0 mt-12">
            <div className="relative w-full max-w-sm aspect-square rounded-[2rem] bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-[1.5px] shadow-featured shadow-premium overflow-hidden group hover:shadow-featured-hover transition-all duration-500">
              <div className="absolute inset-0 bg-slate-950 opacity-10" />
              {/* Abstract Glassmorphism Tech Visual */}
              <div className="absolute inset-3.5 rounded-[1.7rem] bg-slate-900/95 backdrop-blur-sm p-6 sm:p-7 flex flex-col justify-between border border-white/10 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[9px] tracking-widest uppercase font-bold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                    tinhocgenz.io.vn
                  </span>
                </div>

                <div className="my-auto space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest leading-none">Excel Dashboard</p>
                    <h3 className="text-lg font-black tracking-tight text-white leading-snug">Khóa học Excel Thực Chiến</h3>
                  </div>
                  
                  {/* Fake Code / Visual Interface */}
                  <div className="space-y-2 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/60 text-[11px] font-mono leading-relaxed">
                    <p className="text-slate-400"><span className="text-blue-400">const</span> course = <span className="text-emerald-400">"Excel Nâng Cao"</span>;</p>
                    <p className="text-slate-400"><span className="text-blue-400">const</span> style = <span className="text-emerald-400">"GenZ Vibe"</span>;</p>
                    <p className="text-slate-400"><span className="text-blue-400">function</span> learn() &#123;</p>
                    <p className="text-slate-300 pl-4">return <span className="text-cyan-400">{"\"Thực hành 100% -> Làm được việc!\""}</span>;</p>
                    <p className="text-slate-400">&#125;</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden shrink-0 border border-slate-700/30">
                      <img src="/logo-icon.png" alt="PH Icon" className="w-full h-full object-cover scale-[1.15]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold leading-none text-white">Thầy giáo GenZ</p>
                      <p className="text-[8px] text-slate-400 leading-none mt-1">Microsoft MOS Certified</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-slate-500 uppercase leading-none font-extrabold">Học viên hài lòng</p>
                    <p className="text-sm font-black text-cyan-400 leading-none mt-1">95%</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Small floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white p-3.5 rounded-2xl shadow-premium shadow-xl border border-slate-100/80 flex items-center gap-3 animate-bounce max-w-[190px]">
              <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl shrink-0">
                <CheckCircle size={18} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide leading-none">Cam kết</p>
                <p className="text-xs font-black text-slate-800 mt-1 leading-none">Làm được việc ngay!</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
