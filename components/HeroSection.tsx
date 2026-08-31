"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Star,
  Brain,
  FileSpreadsheet,
  Clock,
  ChevronRight,
  Laptop
} from "lucide-react";

export default function HeroSection() {
  const [selectedGoal, setSelectedGoal] = useState<"mos" | "excel" | "ic3" | "ai">("mos");

  const GOAL_DATA = {
    mos: {
      badge: "Luyện Thi Cấp Tốc 3 - 5 Buổi",
      title: "Chứng Chỉ Quốc Tế MOS 2019 / 365",
      subtitle: "Bao đỗ 100% ngay lần thi đầu tiên tại IIG Việt Nam",
      duration: "3 - 5 buổi trọng tâm",
      passRate: "100% Bao Đỗ",
      gift: "Tặng phần mềm thi thử Certiport sát 99% đề thật",
      discount: "Giảm 30% khi đăng ký nhóm",
      targetCourseLink: "/khoa-hoc/mos-master-combo",
      targetCourseName: "Combo MOS 3 Môn Master"
    },
    excel: {
      badge: "Thực Chiến Văn Phòng & Kế Toán",
      title: "Excel Nâng Cao, Dashboard & Báo Cáo Động",
      subtitle: "Làm chủ XLOOKUP, PivotTable, Macro tự động hóa 80% thời gian",
      duration: "4 - 6 buổi thực tế",
      passRate: "Ứng Dụng Ngay 100%",
      gift: "Tặng 50+ Bộ Template Báo Cáo & Quản Trị Doanh Nghiệp",
      discount: "Ưu đãi học viên mới",
      targetCourseLink: "/khoa-hoc/combo-survival-office",
      targetCourseName: "Khóa Excel & Word Chuyên Sâu"
    },
    ic3: {
      badge: "Chuẩn Kỹ Năng Số Toàn Cầu",
      title: "Chứng Chỉ IC3 GS6 Digital Literacy",
      subtitle: "Làm chủ máy tính, mạng Internet và an toàn dữ liệu số",
      duration: "3 - 5 buổi cấp tốc",
      passRate: "100% Đạt Chuẩn",
      gift: "Bộ ngân hàng 200 câu hỏi mô phỏng bản quyền Certiport",
      discount: "Hỗ trợ học phí sinh viên",
      targetCourseLink: "/khoa-hoc/ic3-gs6",
      targetCourseName: "Khóa Luyện Thi IC3 GS6"
    },
    ai: {
      badge: "Công Nghệ Đột Phá 2026",
      title: "Ứng Dụng AI (ChatGPT, Copilot, Gamma) Vào Office",
      subtitle: "Tạo slide thuyết trình và xử lý báo cáo chỉ trong 5 phút",
      duration: "2 - 4 buổi thực hành",
      passRate: "Tăng 10X Tốc Độ",
      gift: "Tặng kho 500+ Prompt AI chuyên dụng cho dân văn phòng",
      discount: "Tặng kèm khóa học Office",
      targetCourseLink: "/khoa-hoc/ai-office-breakthrough",
      targetCourseName: "Khóa AI Office Breakthrough"
    }
  };

  const currentGoal = GOAL_DATA[selectedGoal];

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-22 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50">
      
      {/* Decorative Subtle Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-gradient-to-r from-blue-500/10 via-sky-400/10 to-indigo-500/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BRAND & TRUST TICKER BADGE */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 shadow-2xs text-blue-900 text-xs font-black uppercase tracking-wider">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
            <Award size={14} className="text-blue-600" />
            <span>PH DIGITAL EDUCATION • ĐÀO TẠO TIN HỌC THỰC CHIẾN & CHỨNG CHỈ QUỐC TẾ</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Cam Kết Bao Đỗ 100% Bằng Văn Bản</span>
          </div>
        </div>

        {/* MAIN HERO GRID: 2 COLUMNS BALANCED BENTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: SEO Headings, Value Props & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Primary SEO H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-black text-slate-900 tracking-tight leading-[1.12] font-display">
              Đào Tạo Tin Học <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Luyện Thi MOS & IC3 Cấp Tốc
              </span>
              <br />
              Thực Chiến Văn Phòng 10X
            </h1>

            {/* Sub-headline with rich keywords */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Hệ sinh thái đào tạo Tin học Văn phòng Thực chiến & Luyện thi chứng chỉ quốc tế <strong>Certiport Microsoft MOS, IC3 GS6</strong> hàng đầu cho Học sinh, Sinh viên, Người đi làm và Doanh nghiệp trên toàn quốc.
            </p>

            {/* Keyword Quick Tags Bar (Optimizes Crawl & Topical Authority) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {[
                { label: "MOS Excel 2019 / 365", link: "/khoa-hoc/mos-2019" },
                { label: "Combo MOS 3 Môn", link: "/khoa-hoc/mos-master-combo" },
                { label: "Kỹ Năng Số IC3 GS6", link: "/khoa-hoc/ic3-gs6" },
                { label: "Excel Dashboard Động", link: "/khoa-hoc/combo-survival-office" },
                { label: "AI Office 10X", link: "/khoa-hoc/ai-office-breakthrough" },
              ].map((tag, i) => (
                <Link
                  key={i}
                  href={tag.link}
                  className="px-2.5 py-1 rounded-lg bg-slate-100/80 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-colors border border-slate-200/60"
                >
                  #{tag.label}
                </Link>
              ))}
            </div>

            {/* Action Buttons & Proof Metric */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/lien-he"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
              >
                <span>Đăng Ký Tư Vấn & Xếp Lớp</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/khoa-hoc"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 shadow-xs transition-all"
              >
                <span>Xem Tất Cả Khóa Học</span>
                <ChevronRight size={15} />
              </Link>
            </div>

            {/* Google Verified Review & Guarantee Trust Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-3 border-t border-slate-200/80 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="font-extrabold text-slate-800">4.9/5.0</span>
                <span>(5.200+ học viên tốt nghiệp)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Tặng phần mềm thi thử IIG 2026</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Course Goal Selector & Live Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-premium p-6 sm:p-7 space-y-5 relative overflow-hidden">
              
              {/* Card Header & Goal Selector Pills */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    CHỌN MỤC TIÊU CỦA BẠN
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Tỷ lệ đỗ 100%
                  </span>
                </div>

                {/* 4 Goal Tabs */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/70">
                  {[
                    { id: "mos", label: "Luyện Thi MOS", icon: <Award size={13} /> },
                    { id: "excel", label: "Excel Đi Làm", icon: <FileSpreadsheet size={13} /> },
                    { id: "ic3", label: "Chuẩn IC3 GS6", icon: <Laptop size={13} /> },
                    { id: "ai", label: "AI Văn Phòng", icon: <Brain size={13} /> },
                  ].map((tab) => {
                    const isSelected = selectedGoal === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedGoal(tab.id as "mos" | "excel" | "ic3" | "ai")}
                        className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-white text-blue-700 shadow-xs border border-slate-200/60"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Goal Showcase Content */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white space-y-4 shadow-inner">
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cyan-300 font-mono text-[10px] font-black uppercase tracking-wider">
                      {currentGoal.badge}
                    </span>
                    <span className="text-amber-400 font-extrabold flex items-center gap-1 text-[11px]">
                      <Sparkles size={12} /> {currentGoal.passRate}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-snug font-display">
                    {currentGoal.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentGoal.subtitle}
                  </p>
                </div>

                {/* Key Benefits Matrix */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-cyan-400 shrink-0" />
                    <span>Thời lượng: <strong className="text-white">{currentGoal.duration}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{currentGoal.gift}</span>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href={currentGoal.targetCourseLink}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md transition-all"
                  >
                    <span>Xem Chi Tiết Khóa Học</span>
                    <ArrowRight size={13} />
                  </Link>
                  
                  <Link
                    href="/lien-he"
                    className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition-colors border border-slate-700"
                  >
                    Tư Vấn
                  </Link>
                </div>

              </div>

              {/* Bottom Quick Test Banner */}
              <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <p className="font-black text-slate-900">Chưa rõ trình độ hiện tại?</p>
                  <p className="text-[11px] text-slate-500">Test online 5 phút biết ngay kết quả</p>
                </div>
                <Link
                  href="/thi-thu"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] shrink-0 uppercase tracking-wider"
                >
                  Thi Thử Free
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
