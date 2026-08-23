"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  Award,
  Zap,
  Star
} from "lucide-react";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"student" | "worker">("student");

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-indigo-500/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Badges, Tabs, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Top Partner Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 shadow-sm backdrop-blur-sm text-blue-800 text-[11px] font-black uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
              <Award size={14} className="text-blue-600" />
              <span>PH DIGITAL EDUCATION • CHUẨN QUỐC TẾ MOS & IC3</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Luyện Thi Chứng Chỉ <br />
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                MOS & IC3 Cấp Tốc
              </span>
              <br />
              Chuẩn Đầu Ra Đại Học
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
              Hệ sinh thái đào tạo Tin học Văn phòng Thực chiến & Luyện thi chứng chỉ quốc tế Certiport hàng đầu. Đồng hành cùng sinh viên <strong className="text-slate-900 font-extrabold">ĐH Công Nghệ Đồng Nai (DNTU)</strong>, Lạc Hồng, UEH... cam kết bao đỗ 100%.
            </p>

            {/* Audience Segment Switcher */}
            <div className="w-full max-w-md p-1.5 bg-slate-100/90 rounded-2xl flex items-center border border-slate-200/80">
              <button
                onClick={() => setActiveTab("student")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all duration-300 ${
                  activeTab === "student"
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <GraduationCap size={15} />
                <span>Sinh Viên (Chuẩn Đầu Ra)</span>
              </button>
              <button
                onClick={() => setActiveTab("worker")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all duration-300 ${
                  activeTab === "worker"
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Briefcase size={15} />
                <span>Người Đi Làm (Thực Chiến)</span>
              </button>
            </div>

            {/* Dynamic Value Propositions based on Active Tab */}
            <div className="w-full bg-blue-50/50 border border-blue-100/80 rounded-2xl p-4 text-left space-y-2">
              {activeTab === "student" ? (
                <>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>Lộ trình cấp tốc 3 - 5 buổi, cam kết đỗ 100% (Học lại miễn phí nếu chưa đạt)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>Tặng phần mềm thi thử giống 99% đề thi Certiport thật tại phòng thi IIG</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>Ưu đãi nhóm từ 3 bạn: Giảm 15% - 30% học phí</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                    <span>Excel Dashboard chuyên sâu, Pivot Table động, tự động hóa xử lý báo cáo</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                    <span>Ứng dụng AI (ChatGPT, Copilot, Gamma) tăng tốc hiệu suất làm việc 10X</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                    <span>Học 1-1 trực tiếp trên file dữ liệu công việc thực tế của công ty bạn</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
              <Link
                href="/lien-he"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105"
              >
                Đăng Ký Tư Vấn Lộ Trình
                <ArrowRight size={15} />
              </Link>
              
              <Link
                href="/khoa-hoc"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm transition-all"
              >
                Xem Danh Sách Khóa Học
              </Link>
            </div>

            {/* Quick Proof Metrics */}
            <div className="flex items-center gap-6 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <span className="font-extrabold text-slate-700">4.9/5.0</span>
                <span>(5.200+ đánh giá)</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-emerald-600 font-extrabold">
                <ShieldCheck size={14} />
                <span>Cam kết chuẩn đầu ra 100%</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-6 sm:p-8 rounded-[32px] shadow-2xl border border-slate-800/80 text-white overflow-hidden">
              
              {/* Top Accent */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md overflow-hidden">
                    <img src="/logo-icon.png" alt="PH Digital Education" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white leading-none">PH DIGITAL EDUCATION</h3>
                    <p className="text-[10px] text-cyan-400 font-bold mt-1">Certiport Authorized Training</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Tỷ lệ đỗ 99.4%
                </span>
              </div>

              {/* Central Certificate Badge Box */}
              <div className="space-y-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 uppercase font-black tracking-wider text-[10px]">Học viên tiêu biểu</span>
                  <span className="text-amber-400 font-extrabold flex items-center gap-1">
                    <Award size={13} /> 980 / 1000 Điểm
                  </span>
                </div>

                <div className="space-y-1.5">
                  <p className="text-sm font-extrabold text-white">
                    Chứng Chỉ MOS Excel 2019 Specialist
                  </p>
                  <p className="text-xs text-slate-300">
                    Sinh viên ĐH Công Nghệ Đồng Nai (DNTU) - Hoàn thành xét tốt nghiệp sớm
                  </p>
                </div>

                {/* Score progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Điểm thi Certiport</span>
                    <span className="text-cyan-400">98% (Xuất Sắc)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[98%] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Quick Feature List */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <p className="font-bold text-white">Ôn thi cấp tốc</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">3 - 5 buổi trọng tâm</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <p className="font-bold text-white">Kèm 1:1 trực tiếp</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Sửa lỗi bài tập 24/7</p>
                </div>
              </div>

              {/* Floating Action Hint */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <p className="text-xs text-slate-400">
                  Bạn đang cần chứng chỉ gấp?{" "}
                  <Link href="/lien-he" className="text-cyan-400 font-extrabold underline hover:text-cyan-300">
                    Nhận lịch học & thi ngay
                  </Link>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
