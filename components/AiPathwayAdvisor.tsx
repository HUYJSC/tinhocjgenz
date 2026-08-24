"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Brain, 
  Users, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Zap, 
  ShieldCheck, 
  X,
  MessageSquare,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { AnalyticsEvents } from "@/lib/analytics";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  isEmbedded?: boolean;
}

export default function AiPathwayAdvisor({ isOpen = true, onClose, isEmbedded = false }: Props) {
  const [step, setStep] = useState<"input" | "analyzing" | "result">("input");
  const [userRole, setUserRole] = useState<string>("worker");
  const [certificateTarget, setCertificateTarget] = useState<string>("mos-combo");
  const [currentLevel, setCurrentLevel] = useState<string>("basic");
  const [targetTimeline, setTargetTimeline] = useState<string>("urgent");

  const startAnalysis = () => {
    setStep("analyzing");
    AnalyticsEvents.VIEW_ARTICLE("ai-advisor-used", `AI Advisor: ${userRole} - ${certificateTarget}`);
    setTimeout(() => {
      setStep("result");
    }, 1600);
  };

  const resetAnalysis = () => {
    setStep("input");
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case "student": return "Học Sinh & Sinh Viên";
      case "worker": return "Người Đi Làm & Kế Toán";
      case "business": return "Doanh Nghiệp & Tổ Chức";
      default: return "Người Mới Bắt Đầu";
    }
  };

  const getCourseRecommendation = () => {
    if (userRole === "worker" && certificateTarget === "excel-ai") {
      return {
        title: "Combo Thực Chiến Excel & Ứng Dụng AI Đột Phá 10X",
        link: "/khoa-hoc/combo-survival-office",
        duration: "4 - 6 buổi thực chiến",
        passRate: "100% ứng dụng ngay",
        scoreTarget: "Tối ưu 80% thời gian làm việc",
        discount: "Giảm 30% khi đăng ký hôm nay",
        code: "AI-PRO-30",
        summary: "Làm chủ Excel Dashboard, PivotTable động, các hàm nâng cao và ứng dụng AI tự động hóa công việc văn phòng."
      };
    }
    if (certificateTarget === "ic3") {
      return {
        title: "Khóa Luyện Thi Chứng Chỉ Kỹ Năng Số IC3 GS6",
        link: "/khoa-hoc/ic3-gs6",
        duration: "3 - 5 buổi trọng tâm",
        passRate: "100% bao đỗ",
        scoreTarget: "950+ / 1000",
        discount: "Giảm 30% khi đăng ký nhóm",
        code: "AI-IC3-30",
        summary: "Bao quát toàn diện 3 cấp độ Máy tính, Ứng dụng văn phòng và Cuộc sống trực tuyến theo chuẩn GS6 mới nhất."
      };
    }
    if (certificateTarget === "mos-single") {
      return {
        title: "Luyện Thi MOS 2019 / 365 Từng Môn Cấp Tốc (Word / Excel)",
        link: "/khoa-hoc/mos-2019",
        duration: "3 buổi thực chiến",
        passRate: "100% bao đỗ",
        scoreTarget: "980+ / 1000",
        discount: "Tặng tài khoản thi thử Certiport",
        code: "AI-MOS-FAST",
        summary: "Luyện thẳng trên ngân hàng đề thi thật Multi-Project của IIG, chỉ mẹo tránh bẫy đạt điểm tuyệt đối."
      };
    }
    return {
      title: "Combo MOS Master 3 Môn (Word + Excel + PowerPoint)",
      link: "/khoa-hoc/mos-master-combo",
      duration: "6 - 9 buổi toàn diện",
      passRate: "100% bao đỗ",
      scoreTarget: "1000 / 1000 Điểm",
      discount: "Tiết kiệm 50% học phí trọn gói",
      code: "AI-COMBO-HOT",
      summary: "Gói giải pháp trọn gói nâng cao kỹ năng và sở hữu bằng quốc tế Certiport trọn đời."
    };
  };

  const rec = getCourseRecommendation();

  const content = (
    <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
      
      {/* Background Tech Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Close button if modal */}
      {!isEmbedded && onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>
      )}

      {/* Header */}
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-black uppercase tracking-wider">
          <Brain size={14} className="text-cyan-400 animate-pulse" />
          <span>PH DIGITAL AI ADVISOR • TƯ VẤN LỘ TRÌNH THÔNG MINH</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white font-display">
          Trợ Lý AI Chuẩn Đoán & Thiết Kế Lộ Trình Phù Hợp Nhất
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Nhập mục tiêu của bạn để thuật toán AI xây dựng kế hoạch đào tạo tối ưu và cấp mã ưu đãi học phí.
        </p>
      </div>

      {/* STEP 1: INPUT CRITERIA */}
      {step === "input" && (
        <div className="space-y-5">
          
          {/* Select Target Role */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Users size={14} className="text-blue-400" />
              <span>Đối Tượng / Nhu Cầu Của Bạn:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "worker", label: "Người Đi Làm" },
                { id: "student", label: "Học Sinh / Sinh Viên" },
                { id: "beginner", label: "Mất Gốc / Số 0" },
                { id: "business", label: "Doanh Nghiệp" },
              ].map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUserRole(u.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all border text-center cursor-pointer ${
                    userRole === u.id
                      ? "bg-blue-600 border-blue-400 text-white shadow-md scale-[1.02]"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          {/* Select Target Goal */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Award size={14} className="text-amber-400" />
              <span>Mục Tiêu Đào Tạo Bạn Hướng Đến:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: "mos-combo", label: "Combo MOS 3 Môn Quốc Tế", badge: "Khuyên Dùng" },
                { id: "excel-ai", label: "Thực Chiến Excel & AI", badge: "Đi Làm" },
                { id: "ic3", label: "Kỹ Năng Số IC3 GS6", badge: "Chuẩn Quốc Tế" },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCertificateTarget(c.id)}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                    certificateTarget === c.id
                      ? "bg-blue-600 border-blue-400 text-white shadow-md"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-300 uppercase font-black">{c.badge}</div>
                  <div className="text-xs font-black mt-0.5 leading-snug">{c.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Level & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Trình Độ Hiện Tại:</label>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
              >
                <option value="zero">Chưa biết gì / Mất gốc tin học</option>
                <option value="basic">Biết gõ văn bản & tính toán cơ bản</option>
                <option value="advanced">Đã có nền tảng, muốn học nâng cao</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Kế Hoạch Thời Gian:</label>
              <select
                value={targetTimeline}
                onChange={(e) => setTargetTimeline(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
              >
                <option value="urgent">Cấp tốc trong 3 - 7 ngày tới</option>
                <option value="month">Trong tháng này</option>
                <option value="flexible">Linh hoạt trong 1 - 2 tháng</option>
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={startAnalysis}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
            >
              <Sparkles size={16} />
              <span>Kích Hoạt AI Phân Tích Lộ Trình & Nhận Ưu Đãi</span>
            </button>
          </div>

        </div>
      )}

      {/* STEP 2: ANALYZING SIMULATION */}
      {step === "analyzing" && (
        <div className="py-12 text-center space-y-5">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping" />
            <div className="relative w-16 h-16 rounded-full border-4 border-t-cyan-400 border-r-blue-500 border-b-indigo-500 border-l-transparent animate-spin flex items-center justify-center">
              <Brain size={24} className="text-cyan-400" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-black text-white">
              AI Đang Tính Toán Lộ Trình Tối Ưu Cho Bạn...
            </p>
            <p className="text-xs text-slate-400">
              Đang phân bổ lịch học kèm 1:1 và tạo mã học bổng ưu đãi riêng biệt.
            </p>
          </div>
        </div>
      )}

      {/* STEP 3: RESULT & ROADMAP */}
      {step === "result" && (
        <div className="space-y-5 animate-fade-in">
          
          {/* Diagnostic Summary Box */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                KẾT QUẢ PHÂN TÍCH DÀNH CHO: {getRoleLabel()}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Cam Kết Bao Đỗ 100%
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-black text-white leading-snug font-display">
              {rec.title}
            </h4>

            <p className="text-slate-300 text-xs leading-relaxed">
              {rec.summary}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
              <div className="p-2 rounded-xl bg-slate-900">
                <span className="text-[10px] text-slate-400">Thời lượng:</span>
                <p className="text-xs font-black text-white mt-0.5">{rec.duration}</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-900">
                <span className="text-[10px] text-slate-400">Mục tiêu:</span>
                <p className="text-xs font-black text-amber-400 mt-0.5">{rec.scoreTarget}</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-900">
                <span className="text-[10px] text-slate-400">Cam kết:</span>
                <p className="text-xs font-black text-emerald-400 mt-0.5">{rec.passRate}</p>
              </div>
            </div>
          </div>

          {/* AI Voucher Card */}
          <div className="bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-cyan-500/10 border border-amber-400/30 p-4 rounded-2xl flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black text-amber-300">Ưu Đãi Học Viên:</p>
              <p className="text-[11px] text-slate-300">{rec.discount}</p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-mono font-black text-xs tracking-wider">
              {rec.code}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href="/lien-he"
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-lg transition-all"
            >
              <span>Đăng Ký Xếp Lớp Ngay</span>
              <ArrowRight size={14} />
            </Link>

            <a
              href="https://zalo.me/0332298065"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-black uppercase tracking-wider text-center border border-slate-700 transition-all flex items-center justify-center gap-1.5"
            >
              <MessageSquare size={14} />
              <span>Tư Vấn Trực Tiếp Zalo</span>
            </a>
          </div>

          {/* Reset button */}
          <div className="text-center">
            <button
              onClick={resetAnalysis}
              className="text-[11px] text-slate-400 hover:text-slate-200 inline-flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={11} />
              <span>Thử phân tích với mục tiêu khác</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );

  if (isEmbedded) {
    return content;
  }

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
}
