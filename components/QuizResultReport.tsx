"use client";

import { CheckCircle2, XCircle, Sparkles, Award, RefreshCw, Send, BarChart3 } from "lucide-react";
import { ExamGradingResult } from "@/lib/exam-engine";

interface QuizResultReportProps {
  gradingResult: ExamGradingResult;
  contactName: string;
  setContactName: (val: string) => void;
  contactPhone: string;
  setContactPhone: (val: string) => void;
  isSubmittedLead: boolean;
  setIsSubmittedLead: (val: boolean) => void;
  leadError: string | null;
  setLeadError: (val: string | null) => void;
  onReset: () => void;
}

export default function QuizResultReport({
  gradingResult,
  contactName,
  setContactName,
  contactPhone,
  setContactPhone,
  isSubmittedLead,
  setIsSubmittedLead,
  leadError,
  setLeadError,
  onReset,
}: QuizResultReportProps) {
  return (
    <div className="space-y-8 animate-fade-in text-center">
      <div className="space-y-3">
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-blue-50 border border-blue-100 text-blue-600 shadow-sm">
          <Award size={32} className="text-blue-600" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Bảng Điểm Khảo Thí Chính Thức
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
          Chấm điểm tự động trên hệ thống máy chủ Tin Học Gen Z theo thang chuẩn Certiport Hoa Kỳ (1000 điểm).
        </p>
      </div>

      {/* Score Box */}
      <div className="p-6 sm:p-8 rounded-2xl border border-blue-200 bg-blue-50/70 text-blue-900 max-w-md mx-auto">
        <div className="text-4xl sm:text-5xl font-bold mb-1">
          {gradingResult.scaledScore} <span className="text-base font-bold text-slate-500">/ 1000 Điểm</span>
        </div>
        <p className="text-xs sm:text-sm font-extrabold mt-2">
          Chính xác {gradingResult.correctCount} / {gradingResult.totalQuestions} câu hỏi ({gradingResult.percentage}%)
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white shadow-sm border border-blue-100">
          {gradingResult.passed ? (
            <>
              <CheckCircle2 size={14} className="text-blue-600" />
              <span>ĐỦ ĐIỀU KIỆN XÉT CHUẨN ĐẦU RA ĐẠI HỌC (≥ 700đ)</span>
            </>
          ) : (
            <>
              <XCircle size={14} className="text-amber-600" />
              <span>CHƯA ĐẠT CHUẨN ĐẦU RA (Cần tối thiểu 700/1000đ)</span>
            </>
          )}
        </div>
      </div>

      {/* Skill Radar / Analysis Breakdown */}
      {gradingResult.skillAnalysis && gradingResult.skillAnalysis.length > 0 && (
        <div className="text-left max-w-2xl mx-auto space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} className="text-blue-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Phân Tích Năng Lực & Kỹ Năng Chuyên Sâu
            </h4>
          </div>
          <div className="space-y-2.5">
            {gradingResult.skillAnalysis.map((sk, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{sk.skill} ({sk.subject})</span>
                  <span className={sk.percent >= 80 ? "text-blue-600" : sk.percent >= 50 ? "text-blue-600" : "text-amber-600"}>
                    {sk.percent}% — {sk.status}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      sk.percent >= 80 ? "bg-blue-600" : sk.percent >= 50 ? "bg-blue-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${sk.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Question Review returned from Server */}
      <div className="text-left space-y-3 max-w-2xl mx-auto">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Giải thích đáp án & phân tích bẫy đề thi:
        </h4>
        {gradingResult.reviewItems.map((item, idx) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border space-y-2 ${
              item.isCorrect
                ? "bg-blue-50/40 border-blue-200"
                : "bg-red-50/40 border-red-200"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-800">
                Câu {idx + 1}: {item.subject} • {item.skill}
              </span>
              <span className={item.isCorrect ? "text-blue-600 font-bold" : "text-red-600 font-bold"}>
                {item.isCorrect ? "✓ Chính xác" : "✗ Chưa đúng"}
              </span>
            </div>
            <p className="text-xs text-slate-700 font-semibold">{item.question}</p>
            <div className="text-xs space-y-1 pt-1 border-t border-slate-200/60">
              <p className="text-slate-600">
                <span className="font-bold">Bạn đã chọn: </span>
                {item.userAnswerIndex !== null ? item.options[item.userAnswerIndex] : "Chưa chọn"}
              </p>
              {!item.isCorrect && (
                <p className="text-blue-700 font-bold">
                  <span>Đáp án chuẩn: </span>
                  {item.options[item.correctIndex]}
                </p>
              )}
              <p className="text-slate-600 italic mt-1 bg-white/80 p-2 rounded-lg border border-slate-100">
                💡 <strong>Giải thích chuyên gia:</strong> {item.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lead Capture Box */}
      {!isSubmittedLead ? (
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl max-w-xl mx-auto space-y-4 shadow-md text-left">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles size={14} /> TƯ VẤN LỘ TRÌNH BÙ ĐIỂM CẤP TỐC 3 BUỔI
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Nhận Trọn Bộ Đề Thi Thử + Kèm 1:1 Sát Đề Certiport
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              name="exam-contact-name"
              autoComplete="name"
              placeholder="Họ và tên của bạn"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
            />
            <input
              type="tel"
              name="exam-contact-phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Số điện thoại / Zalo *"
              value={contactPhone}
              onChange={(e) => { setContactPhone(e.target.value); setLeadError(null); }}
              aria-invalid={Boolean(leadError)}
              aria-describedby={leadError ? "exam-lead-error" : undefined}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              if (contactPhone.trim().length >= 9) {
                setIsSubmittedLead(true);
              } else {
                setLeadError("Vui lòng nhập số điện thoại hoặc Zalo hợp lệ.");
              }
            }}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wide shadow-sm hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send size={14} />
            <span>Gửi Đăng Ký Ôn Luyện & Cam Kết Đầu Ra</span>
          </button>
          {leadError && <p id="exam-lead-error" role="alert" className="text-sm font-semibold text-red-300">{leadError}</p>}
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold max-w-md mx-auto space-y-1">
          <p className="flex items-center justify-center gap-1.5 text-base font-bold">
            <CheckCircle2 size={18} className="text-blue-600" />
            Đã Tiếp Nhận Thông Tin Thành Công!
          </p>
          <p className="text-slate-600 text-xs font-normal">
            Giảng viên Tin Học Gen Z sẽ gửi bộ đề thi thử và liên hệ tư vấn bạn qua Zalo <strong>{contactPhone}</strong> trong vòng 15 phút.
          </p>
        </div>
      )}

      <div className="pt-4">
        <button
          type="button"
          onClick={onReset}
          className="min-h-12 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-blue-600 underline cursor-pointer"
        >
          <RefreshCw size={12} />
          Làm lại bài thi thử
        </button>
      </div>
    </div>
  );
}

