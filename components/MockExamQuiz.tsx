"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Clock,
  Award,
  ArrowRight,
  RefreshCw,
  Send,
  Check,
  Loader2,
  ShieldCheck,
  BarChart3
} from "lucide-react";
import { ExamQuestion, ExamGradingResult } from "@/lib/exam-engine";

// Default public questions without answers for instant rendering
const INITIAL_PUBLIC_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    subject: "MOS Excel",
    skill: "Hàm & Công thức Tìm kiếm",
    question: "Trong Excel 2019/365, hàm nào được khuyến nghị thay thế cho sự kết hợp giữa INDEX và MATCH để tìm kiếm linh hoạt cả 2 chiều?",
    options: [
      "Hàm VLOOKUP",
      "Hàm XLOOKUP",
      "Hàm HLOOKUP",
      "Hàm SEARCH"
    ]
  },
  {
    id: 2,
    subject: "MOS Word",
    skill: "Cấu trúc Văn bản & Heading",
    question: "Trong đề thi MOS Word 2019, để tạo mục lục tự động đúng chuẩn bài thi Certiport, bạn cần định dạng các tiêu đề trước bằng công cụ nào?",
    options: [
      "Bôi đậm và tăng kích cỡ chữ thủ công",
      "Sử dụng các Heading Styles (Heading 1, 2, 3) trong thẻ Home",
      "Sử dụng Bookmark và Hyperlink",
      "Tạo bảng Table 2 cột để gõ số trang"
    ]
  },
  {
    id: 3,
    subject: "MOS PowerPoint",
    skill: "Slide Master & Định dạng Mẹ",
    question: "Để đồng bộ logo trường/công ty xuất hiện trên tất cả các Slide mà không phải chèn thủ công từng trang, bạn phải thao tác ở đâu?",
    options: [
      "Chèn vào Slide 1 rồi sao chép dán lần lượt",
      "Thẻ View -> Chọn Slide Master",
      "Thẻ Design -> Chọn Format Background",
      "Thẻ Transitions -> Chọn Apply To All"
    ]
  },
  {
    id: 4,
    subject: "IC3 GS6",
    skill: "An toàn Không gian mạng",
    question: "Giao thức nào dưới đây đảm bảo dữ liệu truyền tải giữa trình duyệt web và máy chủ được mã hóa bảo mật SSL/TLS an toàn?",
    options: [
      "HTTP",
      "FTP",
      "HTTPS",
      "SMTP"
    ]
  },
  {
    id: 5,
    subject: "MOS Excel",
    skill: "Quản lý Bảng tính & View",
    question: "Khi muốn cố định cả cột A và dòng 1 trong Excel để khi cuộn trang dữ liệu không bị trôi, bạn đặt con trỏ tại ô nào trước khi chọn Freeze Panes?",
    options: [
      "Ô A1",
      "Ô B1",
      "Ô A2",
      "Ô B2"
    ]
  }
];

export default function MockExamQuiz() {
  const [questions, setQuestions] = useState<ExamQuestion[]>(INITIAL_PUBLIC_QUESTIONS);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [gradingResult, setGradingResult] = useState<ExamGradingResult | null>(null);
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [isSubmittedLead, setIsSubmittedLead] = useState<boolean>(false);

  // Fetch newest randomized question set from server API
  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch("/api/exam/questions");
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setQuestions(json.data);
          }
        }
      } catch (err) {
        console.warn("Dùng bộ câu hỏi dự phòng:", err);
      }
    }
    loadQuestions();
  }, []);

  const totalQuestions = questions.length;
  const currentQ = questions[currentStep] || questions[0];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionIndex }));
  };

  const handleNext = async () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final question reached: Submit answers to server for authentic grading
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/exam/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });
        const json = await res.json();
        if (json.success && json.data) {
          setGradingResult(json.data);
        } else {
          alert("Có lỗi khi chấm điểm từ máy chủ: " + (json.error || "Thử lại sau"));
        }
      } catch (err: any) {
        alert("Không thể kết nối đến máy chủ khảo thí: " + err.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setGradingResult(null);
    setIsSubmittedLead(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-10 max-w-4xl mx-auto relative overflow-hidden font-sans">
      {/* Decorative gradient bar */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600" />

      {!gradingResult ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-blue-50 text-blue-700 border border-blue-100 mb-2">
                <Clock size={12} className="text-blue-600" />
                MINI TEST • MÔ PHỎNG ĐỀ THI CERTIPORT CHUẨN QUỐC TẾ
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Kiểm Tra Nhanh Trình Độ Tin Học & Khả Năng Đỗ
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-black text-slate-400">Câu hỏi:</span>
              <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono font-black text-xs">
                {currentStep + 1} / {totalQuestions}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="space-y-5 pt-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-blue-100 text-blue-800">
                {currentQ.subject}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-600">
                Kỹ năng: {currentQ.skill}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h4>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/80 border-blue-600 text-blue-900 shadow-sm"
                        : "bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected ? "bg-blue-600 text-white" : "bg-white border border-slate-300 text-slate-600"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </span>
                    {isSelected && <Check size={16} className="text-blue-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0 || isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Câu trước
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={answers[currentQ.id] === undefined || isSubmitting}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black tracking-wide uppercase shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>ĐANG CHẤM ĐIỂM SERVER...</span>
                </>
              ) : (
                <>
                  <span>{currentStep === totalQuestions - 1 ? "Nộp bài & Chấm điểm" : "Câu tiếp theo"}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Server Graded Result Screen */
        <div className="space-y-8 animate-fade-in text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-blue-50 border border-blue-100 text-blue-600 shadow-md">
              <Award size={32} className="text-amber-500" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bảng Điểm Khảo Thí Chính Thức
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
              Chấm điểm tự động trên hệ thống máy chủ PH Digital Education theo thang chuẩn Certiport Hoa Kỳ (1000 điểm).
            </p>
          </div>

          {/* Score Box */}
          <div className={`p-6 sm:p-8 rounded-3xl border max-w-md mx-auto ${
            gradingResult.passed
              ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
              : "bg-amber-50/70 border-amber-200 text-amber-900"
          }`}>
            <div className="text-4xl sm:text-5xl font-black mb-1">
              {gradingResult.scaledScore} <span className="text-base font-bold text-slate-500">/ 1000 Điểm</span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold mt-2">
              Chính xác {gradingResult.correctCount} / {gradingResult.totalQuestions} câu hỏi ({gradingResult.percentage}%)
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white shadow-sm">
              {gradingResult.passed ? (
                <>
                  <CheckCircle2 size={14} className="text-emerald-600" />
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
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Phân Tích Năng Lực & Kỹ Năng Chuyên Sâu
                </h4>
              </div>
              <div className="space-y-2.5">
                {gradingResult.skillAnalysis.map((sk, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{sk.skill} ({sk.subject})</span>
                      <span className={sk.percent >= 80 ? "text-emerald-600" : sk.percent >= 50 ? "text-amber-600" : "text-red-600"}>
                        {sk.percent}% — {sk.status}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          sk.percent >= 80 ? "bg-emerald-500" : sk.percent >= 50 ? "bg-amber-500" : "bg-red-500"
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
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Giải thích đáp án & phân tích bẫy đề thi:
            </h4>
            {gradingResult.reviewItems.map((item, idx) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border space-y-2 ${
                  item.isCorrect
                    ? "bg-emerald-50/40 border-emerald-200"
                    : "bg-red-50/40 border-red-200"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="text-slate-800">
                    Câu {idx + 1}: {item.subject} • {item.skill}
                  </span>
                  <span className={item.isCorrect ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>
                    {item.isCorrect ? "✓ Chính xác" : "✗ Chưa đúng"}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-semibold">{item.question}</p>
                <div className="text-[11px] space-y-1 pt-1 border-t border-slate-200/60">
                  <p className="text-slate-600">
                    <span className="font-bold">Bạn đã chọn: </span>
                    {item.userAnswerIndex !== null ? item.options[item.userAnswerIndex] : "Chưa chọn"}
                  </p>
                  {!item.isCorrect && (
                    <p className="text-emerald-700 font-bold">
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
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl max-w-xl mx-auto space-y-4 shadow-xl text-left">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 justify-center sm:justify-start">
                  <Sparkles size={14} /> TƯ VẤN LỘ TRÌNH BÙ ĐIỂM CẤP TỐC 3 BUỔI
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  Nhận Trọn Bộ Đề Thi Thử + Kèm 1:1 Sát Đề Certiport
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Họ và tên của bạn"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại / Zalo *"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (contactPhone.trim().length >= 9) {
                    setIsSubmittedLead(true);
                  } else {
                    alert("Vui lòng nhập số điện thoại hoặc Zalo hợp lệ!");
                  }
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={14} />
                <span>Gửi Đăng Ký Ôn Luyện & Cam Kết Đầu Ra</span>
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold max-w-md mx-auto space-y-1">
              <p className="flex items-center justify-center gap-1.5 text-base font-black">
                <CheckCircle2 size={18} className="text-emerald-600" />
                Đã Tiếp Nhận Thông Tin Thành Công!
              </p>
              <p className="text-slate-600 text-xs font-normal">
                Giảng viên PH Digital Education sẽ gửi bộ đề thi thử và liên hệ tư vấn bạn qua Zalo <strong>{contactPhone}</strong> trong vòng 15 phút.
              </p>
            </div>
          )}

          <div className="pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 underline cursor-pointer"
            >
              <RefreshCw size={12} />
              Làm lại bài thi thử
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
