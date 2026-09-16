"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Brain, Users, Award, ArrowRight, RefreshCw, X, MessageSquare } from "lucide-react";
import { AnalyticsEvents } from "@/lib/analytics";
import { SITE_CONFIG } from "@/data/siteConfig";

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
    }, 1200);
  };

  const resetAnalysis = () => {
    setStep("input");
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case "student":
        return "Học Sinh & Sinh Viên";
      case "worker":
        return "Người Đi Làm & Kế Toán";
      case "business":
        return "Doanh Nghiệp & Tổ Chức";
      default:
        return "Người Mới Bắt Đầu";
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
        summary: "Làm chủ Excel Dashboard, PivotTable động, các hàm nâng cao và ứng dụng AI tự động hóa công việc văn phòng.",
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
        summary: "Bao quát toàn diện 3 cấp độ Máy tính, Ứng dụng văn phòng và Cuộc sống trực tuyến theo chuẩn GS6 mới nhất.",
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
        summary: "Luyện thẳng trên ngân hàng đề thi thật Multi-Project của IIG, chỉ mẹo tránh bẫy đạt điểm tuyệt đối.",
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
      summary: "Gói giải pháp trọn gói nâng cao kỹ năng và sở hữu bằng quốc tế Certiport trọn đời.",
    };
  };

  const rec = getCourseRecommendation();

  const content = (
    <div className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto bg-white border border-[#E5EEF8] rounded-t-2xl sm:rounded-2xl p-5 sm:p-8 shadow-xl text-slate-800 font-sans">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[#0057B8]" />

      {/* Mobile drag indicator */}
      <div className="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto mb-3" aria-hidden="true" />

      {/* Close button if modal */}
      {!isEmbedded && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-h-10 min-w-10 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>
      )}

      {/* Header */}
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0057B8] text-xs font-bold uppercase tracking-wider">
          <Brain size={14} className="text-[#0057B8]" />
          <span>TƯ VẤN LỘ TRÌNH ĐÀO TẠO THÔNG MINH</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-display">
          Trợ Lý Phân Tích & Thiết Kế Lộ Trình Phù Hợp
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Nhập mục tiêu của bạn để hệ thống xây dựng kế hoạch đào tạo tối ưu và cấp mã ưu đãi học phí hiện hành.
        </p>
      </div>

      {/* STEP 1: INPUT CRITERIA */}
      {step === "input" && (
        <div className="space-y-5">
          {/* Select Target Role */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Users size={14} className="text-[#0057B8]" />
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
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                    userRole === u.id
                      ? "bg-[#0057B8] border-[#0057B8] text-white shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          {/* Select Target Goal */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Award size={14} className="text-[#0057B8]" />
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
                      ? "bg-blue-50 border-[#0057B8] text-[#003F88] shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-[11px] font-mono text-[#0057B8] uppercase font-bold">{c.badge}</div>
                  <div className="text-xs font-bold mt-0.5 leading-snug">{c.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Level & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Trình Độ Hiện Tại:</label>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0057B8] font-medium"
              >
                <option value="zero">Chưa biết gì / Mất gốc tin học</option>
                <option value="basic">Biết gõ văn bản & tính toán cơ bản</option>
                <option value="advanced">Đã có nền tảng, muốn học nâng cao</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Kế Hoạch Thời Gian:</label>
              <select
                value={targetTimeline}
                onChange={(e) => setTargetTimeline(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0057B8] font-medium"
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
              className="w-full py-3.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Phân Tích Lộ Trình & Nhận Ưu Đãi</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ANALYZING SIMULATION */}
      {step === "analyzing" && (
        <div className="py-12 text-center space-y-5">
          <div className="relative w-16 h-16 mx-auto">
            <div className="relative w-16 h-16 rounded-full border-4 border-t-[#0057B8] border-r-blue-200 border-b-blue-200 border-l-transparent animate-spin flex items-center justify-center">
              <Brain size={24} className="text-[#0057B8]" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-[#0B2545]">
              Đang Tính Toán Lộ Trình Tối Ưu Cho Bạn...
            </p>
            <p className="text-xs text-slate-500">
              Đang phân bổ lịch học kèm 1:1 và cấp mã học bổng ưu đãi riêng biệt.
            </p>
          </div>
        </div>
      )}

      {/* STEP 3: RESULT & ROADMAP */}
      {step === "result" && (
        <div className="space-y-5 animate-fade-in">
          {/* Diagnostic Summary Box */}
          <div className="bg-[#F4F8FD] p-5 rounded-2xl border border-[#E5EEF8] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0057B8]">
                LỘ TRÌNH DÀNH CHO: {getRoleLabel()}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                Cam Kết Bao Đỗ 100%
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-[#0B2545] leading-snug font-display">
              {rec.title}
            </h4>

            <p className="text-slate-600 text-xs leading-relaxed">{rec.summary}</p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center">
              <div className="p-2 rounded-xl bg-white border border-slate-100">
                <span className="text-xs text-slate-500">Thời lượng:</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{rec.duration}</p>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-100">
                <span className="text-xs text-slate-500">Mục tiêu:</span>
                <p className="text-xs font-bold text-[#0057B8] mt-0.5">{rec.scoreTarget}</p>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-100">
                <span className="text-xs text-slate-500">Cam kết:</span>
                <p className="text-xs font-bold text-[#0057B8] mt-0.5">{rec.passRate}</p>
              </div>
            </div>
          </div>

          {/* Voucher Card */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#003F88]">Ưu Đãi Học Viên:</p>
              <p className="text-xs text-slate-600">{rec.discount}</p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#0057B8] text-white font-mono font-bold text-xs tracking-wider">
              {rec.code}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href="/lien-he"
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>Đăng Ký Xếp Lớp Ngay</span>
              <ArrowRight size={14} />
            </Link>

            <a
              href={SITE_CONFIG.contact.zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white hover:bg-slate-50 text-[#0057B8] text-xs font-bold uppercase tracking-wider text-center border border-[#E5EEF8] transition-all flex items-center justify-center gap-1.5"
            >
              <MessageSquare size={14} />
              <span>Tư Vấn Trực Tiếp Zalo</span>
            </a>
          </div>

          {/* Reset button */}
          <div className="text-center">
            <button
              onClick={resetAnalysis}
              className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer"
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
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full sm:w-auto flex justify-center">
        {content}
      </div>
    </div>
  );
}
