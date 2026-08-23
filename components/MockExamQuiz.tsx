"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Sparkles, Clock, Award, ArrowRight, RefreshCw, Send, Check } from "lucide-react";

interface Question {
  id: number;
  subject: "MOS Word" | "MOS Excel" | "MOS PowerPoint" | "IC3 GS6";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: "MOS Excel",
    question: "Trong Excel 2019/365, hàm nào được khuyến nghị thay thế cho sự kết hợp giữa INDEX và MATCH để tìm kiếm linh hoạt cả 2 chiều?",
    options: [
      "Hàm VLOOKUP",
      "Hàm XLOOKUP",
      "Hàm HLOOKUP",
      "Hàm SEARCH"
    ],
    correctIndex: 1,
    explanation: "XLOOKUP là hàm tìm kiếm thế hệ mới trong Excel, hỗ trợ tìm kiếm cả chiều ngang/dọc, không yêu cầu cột tìm kiếm phải nằm đầu tiên và tích hợp sẵn xử lý lỗi #N/A."
  },
  {
    id: 2,
    subject: "MOS Word",
    question: "Trong đề thi MOS Word 2019, để tạo mục lục tự động đúng chuẩn bài thi Certiport, bạn cần định dạng các tiêu đề trước bằng công cụ nào?",
    options: [
      "Bôi đậm và tăng kích cỡ chữ thủ công",
      "Sử dụng các Heading Styles (Heading 1, 2, 3) trong thẻ Home",
      "Sử dụng Bookmark và Hyperlink",
      "Tạo bảng Table 2 cột để gõ số trang"
    ],
    correctIndex: 1,
    explanation: "Bài thi Certiport chấm điểm tự động dựa trên thẻ Heading Styles. Nếu không gán Heading 1, 2, hệ thống chấm thi sẽ không nhận diện được cấu trúc tài liệu."
  },
  {
    id: 3,
    subject: "MOS PowerPoint",
    question: "Để đồng bộ logo trường/công ty xuất hiện trên tất cả các Slide mà không phải chèn thủ công từng trang, bạn phải thao tác ở đâu?",
    options: [
      "Chèn vào Slide 1 rồi sao chép dán lần lượt",
      "Thẻ View -> Chọn Slide Master",
      "Thẻ Design -> Chọn Format Background",
      "Thẻ Transitions -> Chọn Apply To All"
    ],
    correctIndex: 1,
    explanation: "Slide Master là tính năng quản lý bố cục mẹ. Chèn logo hoặc định dạng trên Master Slide sẽ tự động áp dụng cho toàn bộ slide bài thuyết trình."
  },
  {
    id: 4,
    subject: "IC3 GS6",
    question: "Giao thức nào dưới đây đảm bảo dữ liệu truyền tải giữa trình duyệt web và máy chủ được mã hóa bảo mật SSL/TLS an toàn?",
    options: [
      "HTTP",
      "FTP",
      "HTTPS",
      "SMTP"
    ],
    correctIndex: 2,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) sử dụng mã hóa SSL/TLS để bảo vệ thông tin mật khẩu, thẻ tín dụng và dữ liệu người dùng khỏi bị đánh cắp."
  },
  {
    id: 5,
    subject: "MOS Excel",
    question: "Khi muốn cố định cả cột A và dòng 1 trong Excel để khi cuộn trang dữ liệu không bị trôi, bạn đặt con trỏ tại ô nào trước khi chọn Freeze Panes?",
    options: [
      "Ô A1",
      "Ô B1",
      "Ô A2",
      "Ô B2"
    ],
    correctIndex: 3,
    explanation: "Freeze Panes cố định phía trên và bên trái của ô được chọn. Do đó muốn cố định hàng 1 và cột A, bạn phải chọn ô B2."
  }
];

export default function MockExamQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [isSubmittedLead, setIsSubmittedLead] = useState<boolean>(false);

  const totalQuestions = SAMPLE_QUESTIONS.length;
  const currentQ = SAMPLE_QUESTIONS[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionIndex }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    SAMPLE_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const scaledScore = Math.round((correctCount / totalQuestions) * 1000);
    return { correctCount, scaledScore };
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
    setIsSubmittedLead(false);
  };

  const { correctCount, scaledScore } = calculateScore();
  const isPassedStandard = scaledScore >= 700;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-10 max-w-4xl mx-auto relative overflow-hidden">
      {/* Decorative gradient bar */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600" />

      {!showResult ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-blue-50 text-blue-700 border border-blue-100 mb-2">
                <Clock size={12} className="text-blue-600" />
                MINI TEST • MÔ PHỎNG ĐỀ THI CERTIPORT
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
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-slate-100 text-slate-700">
                {currentQ.subject}
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
              disabled={currentStep === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Câu trước
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={answers[currentQ.id] === undefined}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black tracking-wide uppercase shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>{currentStep === totalQuestions - 1 ? "Nộp bài & Xem kết quả" : "Câu tiếp theo"}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="space-y-8 animate-fade-in text-center">
          
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-blue-50 border border-blue-100 text-blue-600 shadow-md">
              <Award size={32} className="text-amber-500" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Kết Quả Bài Thi Thử Của Bạn
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
              Đánh giá dựa trên thang điểm 1000 theo chuẩn khảo thí quốc tế Certiport.
            </p>
          </div>

          {/* Score Box */}
          <div className={`p-6 sm:p-8 rounded-3xl border max-w-md mx-auto ${
            isPassedStandard
              ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
              : "bg-amber-50/70 border-amber-200 text-amber-900"
          }`}>
            <div className="text-4xl sm:text-5xl font-black mb-1">
              {scaledScore} <span className="text-base font-bold text-slate-500">/ 1000 Điểm</span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold mt-2">
              Đúng {correctCount} / {totalQuestions} câu hỏi
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white shadow-sm">
              {isPassedStandard ? (
                <>
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>ĐỦ ĐIỀU KIỆN XÉT CHUẨN ĐẦU RA ĐẠI HỌC (≥ 700đ)</span>
                </>
              ) : (
                <>
                  <XCircle size={14} className="text-amber-600" />
                  <span>CHƯA ĐẠT CHUẨN ĐẦU RA ĐẠI HỌC (Cần tối thiểu 700đ)</span>
                </>
              )}
            </div>
          </div>

          {/* Detailed Question Review Accordion */}
          <div className="text-left space-y-3 max-w-2xl mx-auto">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Giải thích đáp án chi tiết:</h4>
            {SAMPLE_QUESTIONS.map((q, idx) => {
              const isCorrect = answers[q.id] === q.correctIndex;
              return (
                <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-slate-800">Câu {idx + 1}: {q.subject}</span>
                    <span className={isCorrect ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>
                      {isCorrect ? "✓ Chính xác" : "✗ Chưa đúng"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{q.explanation}</p>
                </div>
              );
            })}
          </div>

          {/* Lead Capture Box */}
          {!isSubmittedLead ? (
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl max-w-xl mx-auto space-y-4 shadow-xl text-left">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 justify-center sm:justify-start">
                  <Sparkles size={14} /> TƯ VẤN LỘ TRÌNH BÙ ĐIỂM CẤP TỐC 3 BUỔI
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  Nhận Trọn Bộ 50 Đề Thi Thử + Phân Tích Lỗi Sai Qua Zalo
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
                <span>Gửi Đáp Án Chi Tiết & Tư Vấn Bao Đỗ</span>
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold max-w-md mx-auto space-y-1">
              <p className="flex items-center justify-center gap-1.5 text-base font-black">
                <CheckCircle2 size={18} className="text-emerald-600" />
                Đã Nhận Yêu Cầu Thành Công!
              </p>
              <p className="text-slate-600 text-xs font-normal">
                Giảng viên PH Digital Education sẽ gửi bộ đề thi thử và liên hệ hỗ trợ bạn qua Zalo <strong>{contactPhone}</strong> sớm nhất!
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
