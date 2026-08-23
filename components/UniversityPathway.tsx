"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  AlertCircle,
  School
} from "lucide-react";
import { universityStandards, UniversityRequirement } from "@/data/mockData";

export default function UniversityPathway() {
  const [selectedUniId, setSelectedUniId] = useState<string>("dntu");

  const selectedUni = universityStandards.find((u) => u.id === selectedUniId) || universityStandards[0];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-900 via-[#0b1329] to-slate-900 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 font-extrabold text-xs tracking-wider uppercase backdrop-blur-md">
            <GraduationCap size={15} className="text-blue-400" />
            <span>Chuyên Đề Chuẩn Đầu Ra Đại Học</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Tra Cứu Lộ Trình Chứng Chỉ <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Xét Tốt Nghiệp</span>
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            PH Digital Education đồng hành cùng sinh viên <strong className="text-white">ĐH Công Nghệ Đồng Nai (DNTU)</strong> và các trường đại học hàng đầu, cam kết 100% đạt chuẩn đầu ra MOS / IC3 cấp tốc chỉ từ 3 - 5 buổi ôn luyện.
          </p>
        </div>

        {/* University Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {universityStandards.map((uni) => {
            const isSelected = uni.id === selectedUniId;
            return (
              <button
                key={uni.id}
                onClick={() => setSelectedUniId(uni.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border-blue-400 scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                }`}
              >
                <School size={16} className={isSelected ? "text-white" : "text-slate-400"} />
                <span>{uni.shortName}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${uni.badgeColor}`}>
                  {uni.logoText}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Content Box for Selected University */}
        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Requirements & Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {selectedUni.universityCode} Standard
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {selectedUni.universityName}
                </h3>
              </div>

              {/* Alert notice */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm">
                <AlertCircle size={18} className="shrink-0 text-amber-400 mt-0.5" />
                <p><strong>Lưu ý đợt xét tốt nghiệp:</strong> {selectedUni.urgencyNote}</p>
              </div>

              {/* Certificate Cards */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-wider font-extrabold text-slate-400">
                  Quy Định Chuẩn Đầu Ra Bắt Buộc:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedUni.requiredCertificates.map((cert, idx) => (
                    <div key={idx} className="bg-slate-900/80 border border-slate-700 rounded-2xl p-5 space-y-2.5 hover:border-blue-500/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                          {cert.standard}
                        </span>
                        <Award size={16} className="text-yellow-400" />
                      </div>
                      <h4 className="font-extrabold text-white text-sm sm:text-base leading-snug">
                        {cert.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400">
                        <CheckCircle2 size={14} />
                        <span>Mục tiêu: {cert.targetScore}</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {cert.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: PH Digital Education Solution */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-900/40 via-indigo-950/60 to-slate-900/90 border border-blue-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-cyan-400">
                  <Sparkles size={12} />
                  Giải Pháp Cấp Tốc Từ PH Digital Education
                </span>
                <h4 className="text-xl font-black text-white leading-tight">
                  Lộ Trình Bao Đỗ 100% Dành Riêng Cho Bạn
                </h4>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-center gap-2.5">
                  <Clock size={16} className="text-cyan-400 shrink-0" />
                  <span>Thời lượng: <strong>Chỉ 3 - 5 buổi thực chiến</strong> bám sát đề thi</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>Cam kết: <strong>Bao đỗ 100%</strong> - Học lại miễn phí nếu không đạt</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Award size={16} className="text-yellow-400 shrink-0" />
                  <span>Cung cấp <strong>phần mềm thi thử bản quyền Certiport</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <HelpCircle size={16} className="text-blue-400 shrink-0" />
                  <span>Hỗ trợ 1:1 giải đáp thắc mắc 24/7 đến khi có bằng</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-slate-700/60 flex flex-col gap-3">
                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full font-black text-xs uppercase tracking-wider bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02]"
                >
                  Nhận Tư Vấn Lộ Trình Cấp Tốc
                  <ArrowRight size={15} />
                </Link>
                <p className="text-center text-[11px] text-slate-400">
                  Hỗ trợ tư vấn miễn phí qua Zalo: <a href="https://zalo.me/0332298065" target="_blank" rel="noreferrer" className="text-cyan-400 font-bold underline">033.229.8065</a>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
