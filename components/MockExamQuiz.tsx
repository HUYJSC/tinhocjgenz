"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  RefreshCw,
  Send,
  Check,
  Loader2,
  BarChart3,
  AlertCircle,
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
  const [examError, setExamError] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);

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
    setExamError(null);
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (!window.confirm("Bạn đã hoàn thành bài thi. Gửi đáp án để xem kết quả?")) return;
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
          setExamError("Không thể chấm điểm lúc này. Vui lòng thử lại.");
        }
      } catch (error: unknown) {
        console.error("Exam submission failed", error);
        setExamError("Không thể kết nối hệ thống khảo thí. Kiểm tra mạng và thử lại.");
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
    setExamError(null);
    setLeadError(null);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#0057B8] p-6 sm:p-10 max-w-4xl mx-auto relative overflow-hidden font-sans text-[#0057B8]">
      {!gradingResult ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0057B8] pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-black uppercase border border-[#0057B8] mb-2">
                <Clock size={12} className="text-[#0057B8]" />
                BÀI THI THỬ TRỰC TUYẾN
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0057B8] tracking-tight">
                Kiểm tra nhanh năng lực tin học
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-bold text-[#0057B8]">Câu hỏi:</span>
              <span className="px-3 py-1 rounded-md bg-[#0057B8] text-white font-mono font-black text-xs">
                {currentStep + 1} / {totalQuestions}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white border border-[#0057B8] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0057B8] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="space-y-5 pt-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase border border-[#0057B8]">
                {currentQ.subject}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold border border-[#0057B8]">
                Kỹ năng: {currentQ.skill}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-[#0057B8] leading-relaxed">
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
                    className={`w-full min-h-14 text-left p-4 rounded-xl border-2 text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#0057B8] text-white border-[#0057B8]"
                        : "bg-white text-[#0057B8] border-[#0057B8] hover:bg-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 border ${
                        isSelected
                          ? "bg-white text-[#0057B8] border-white"
                          : "bg-white text-[#0057B8] border-[#0057B8]"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </span>
                    {isSelected && <Check size={16} className="text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          {examError && (
            <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border-2 border-dashed border-[#0057B8] bg-white p-3 text-sm text-[#0057B8]">
              <span>{examError}</span>
              <button type="button" onClick={() => void handleNext()} className="min-h-11 shrink-0 rounded-lg bg-[#0057B8] text-white px-4 font-bold">Thử lại</button>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-6 border-t border-[#0057B8]">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0 || isSubmitting}
              className="min-h-11 px-4 py-2 rounded-xl border border-[#0057B8] text-sm font-bold text-[#0057B8] hover:bg-[#0057B8] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Câu trước
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={answers[currentQ.id] === undefined || isSubmitting}
              className="min-h-11 px-5 sm:px-6 py-2.5 rounded-xl bg-[#0057B8] hover:bg-white disabled:bg-white text-white hover:text-[#0057B8] disabled:text-[#0057B8] disabled:opacity-40 border border-[#0057B8] text-xs font-bold tracking-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>ĐANG CHẤM ĐIỂM...</span>
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
        /* Result Screen: Strict Blue & White */
        <div className="space-y-8 text-center text-[#0057B8]">
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-white border-2 border-[#0057B8] text-[#0057B8]">
              <Award size={32} className="text-[#0057B8]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight">
              Kết quả bài thi thử
            </h3>
            <p className="text-xs sm:text-sm max-w-md mx-auto">
              Chấm điểm tự động theo thang điểm quy đổi chuẩn Certiport (1000 điểm).
            </p>
          </div>

          {/* Score Box */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#0057B8] max-w-md mx-auto bg-white text-[#0057B8]">
            <div className="text-4xl sm:text-5xl font-black mb-1">
              {gradingResult.scaledScore} <span className="text-base font-bold">/ 1000 Điểm</span>
            </div>
            <p className="text-xs sm:text-sm font-bold mt-2">
              Chính xác {gradingResult.correctCount} / {gradingResult.totalQuestions} câu hỏi ({gradingResult.percentage}%)
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold border border-[#0057B8]">
              {gradingResult.passed ? (
                <>
                  <CheckCircle2 size={14} className="text-[#0057B8]" />
                  <span>ĐỦ ĐIỀU KIỆN ĐẠT CHUẨN ĐẦU RA (≥ 700đ)</span>
                </>
              ) : (
                <>
                  <AlertCircle size={14} className="text-[#0057B8]" />
                  <span>CẦN ÔN TẬP THÊM (Mục tiêu tối thiểu 700/1000đ)</span>
                </>
              )}
            </div>
          </div>

          {/* Skill Radar / Analysis Breakdown */}
          {gradingResult.skillAnalysis && gradingResult.skillAnalysis.length > 0 && (
            <div className="text-left max-w-2xl mx-auto space-y-3 bg-white p-5 rounded-2xl border border-[#0057B8]">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={16} className="text-[#0057B8]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0057B8]">
                  Phân tích kỹ năng chi tiết
                </h4>
              </div>
              <div className="space-y-2.5">
                {gradingResult.skillAnalysis.map((sk, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-[#0057B8]">
                      <span>{sk.skill} ({sk.subject})</span>
                      <span>{sk.percent}% — {sk.status}</span>
                    </div>
                    <div className="w-full bg-white border border-[#0057B8] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0057B8] transition-all"
                        style={{ width: `${sk.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Question Review */}
          <div className="text-left space-y-3 max-w-2xl mx-auto">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#0057B8]">
              Giải thích chi tiết câu hỏi:
            </h4>
            {gradingResult.reviewItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-[#0057B8] bg-white space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-black">
                  <span>
                    Câu {idx + 1}: {item.subject} • {item.skill}
                  </span>
                  <span className="font-bold">
                    {item.isCorrect ? "✓ Chính xác" : "✗ Chưa đúng"}
                  </span>
                </div>
                <p className="text-xs font-semibold">{item.question}</p>
                <div className="text-[11px] space-y-1 pt-1 border-t border-[#0057B8]">
                  <p>
                    <span className="font-bold">Bạn đã chọn: </span>
                    {item.userAnswerIndex !== null ? item.options[item.userAnswerIndex] : "Chưa chọn"}
                  </p>
                  {!item.isCorrect && (
                    <p className="font-bold">
                      <span>Đáp án đúng: </span>
                      {item.options[item.correctIndex]}
                    </p>
                  )}
                  <p className="italic mt-1 p-2 rounded-md border border-[#0057B8] bg-white">
                    <strong>Giải thích:</strong> {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Lead Capture Box */}
          {!isSubmittedLead ? (
            <div className="bg-white text-[#0057B8] p-6 sm:p-8 rounded-2xl max-w-xl mx-auto space-y-4 border-2 border-[#0057B8] text-left">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider block">
                  TƯ VẤN LỘ TRÌNH LẤY BẰNG CẤP TỐC
                </span>
                <h4 className="text-base sm:text-lg font-black text-[#0057B8]">
                  Nhận bộ đề thi mẫu và tư vấn điểm số
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="exam-contact-name"
                  placeholder="Họ và tên"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white border border-[#0057B8] text-sm text-[#0057B8] placeholder:text-[#0057B8]/60 focus:outline-none focus:ring-2 focus:ring-[#0057B8]"
                />
                <input
                  type="tel"
                  name="exam-contact-phone"
                  placeholder="Số điện thoại / Zalo *"
                  value={contactPhone}
                  onChange={(e) => { setContactPhone(e.target.value); setLeadError(null); }}
                  className="px-4 py-3 rounded-lg bg-white border border-[#0057B8] text-sm text-[#0057B8] placeholder:text-[#0057B8]/60 focus:outline-none focus:ring-2 focus:ring-[#0057B8]"
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
                className="w-full min-h-[48px] py-3 rounded-xl bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] font-bold text-xs uppercase tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={14} />
                <span>Gửi đăng ký tư vấn</span>
              </button>
              {leadError && <p role="alert" className="text-sm font-semibold text-[#0057B8]">{leadError}</p>}
            </div>
          ) : (
            <div className="p-6 rounded-2xl border-2 border-[#0057B8] bg-white text-[#0057B8] text-xs sm:text-sm font-bold max-w-md mx-auto space-y-1">
              <p className="flex items-center justify-center gap-1.5 text-base font-black">
                <CheckCircle2 size={18} className="text-[#0057B8]" />
                Đã tiếp nhận thông tin thành công!
              </p>
              <p className="font-normal">
                Giảng viên Tin Học Gen Z sẽ liên hệ tư vấn bạn qua Zalo <strong>{contactPhone}</strong> trong thời gian sớm nhất.
              </p>
            </div>
          )}

          <div className="pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="min-h-12 inline-flex items-center gap-1.5 text-sm font-bold text-[#0057B8] hover:underline cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Làm lại bài thi thử</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
