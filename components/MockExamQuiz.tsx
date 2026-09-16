"use client";

import { useState, useEffect } from "react";
import { Clock, ArrowRight, Check, Loader2 } from "lucide-react";
import { ExamQuestion, ExamGradingResult } from "@/lib/exam-engine";
import { INITIAL_PUBLIC_QUESTIONS } from "@/data/mockExamQuestions";
import QuizResultReport from "./QuizResultReport";

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

  // Fetch randomized question set from server API if available
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
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));
  };

  const handleNext = async () => {
    setExamError(null);
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
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
    <div className="bg-white rounded-2xl border border-[#E5EEF8] shadow-sm p-6 sm:p-10 max-w-4xl mx-auto relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[#0057B8]" />

      {!gradingResult ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-50 text-[#0057B8] border border-blue-100 mb-2">
                <Clock size={12} className="text-[#0057B8]" />
                MINI TEST • MÔ PHỎNG ĐỀ THI CERTIPORT CHUẨN QUỐC TẾ
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B2545] tracking-tight">
                Kiểm Tra Nhanh Trình Độ Tin Học & Khả Năng Đỗ
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-bold text-slate-400">Câu hỏi:</span>
              <span className="px-3 py-1 rounded-xl bg-[#0B2545] text-white font-mono font-bold text-xs">
                {currentStep + 1} / {totalQuestions}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0057B8] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="space-y-5 pt-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase bg-blue-100 text-[#003F88]">
                {currentQ.subject}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600">
                Kỹ năng: {currentQ.skill}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-[#0B2545] leading-relaxed">
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
                    className={`w-full min-h-14 text-left p-4 rounded-2xl border text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/80 border-[#0057B8] text-[#003F88] shadow-sm"
                        : "bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? "bg-[#0057B8] text-white" : "bg-white border border-slate-300 text-slate-600"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </span>
                    {isSelected && <Check size={16} className="text-[#0057B8] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          {examError && (
            <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <span>{examError}</span>
              <button type="button" onClick={() => void handleNext()} className="min-h-12 shrink-0 rounded-xl bg-red-600 px-4 font-bold text-white">Thử lại</button>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0 || isSubmitting}
              className="min-h-12 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Câu trước
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={answers[currentQ.id] === undefined || isSubmitting}
              className="min-h-12 px-5 sm:px-6 py-3 rounded-xl bg-[#0057B8] hover:bg-[#003F88] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wide uppercase shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
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
        <QuizResultReport
          gradingResult={gradingResult}
          contactName={contactName}
          setContactName={setContactName}
          contactPhone={contactPhone}
          setContactPhone={setContactPhone}
          isSubmittedLead={isSubmittedLead}
          setIsSubmittedLead={setIsSubmittedLead}
          leadError={leadError}
          setLeadError={setLeadError}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
