"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLessonById,
  getAllLessons,
} from "@/data/lessonsData";
import { coursesData } from "@/data/mockData";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Menu,
  X,
  RotateCcw,
  Check,
  Lightbulb,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { AnalyticsEvents } from "@/lib/analytics";

interface LessonPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export default function InteractiveLessonPage(props: LessonPageProps) {
  const params = use(props.params);
  const { id: courseId, lessonId } = params;

  const course = coursesData.find((c) => c.id === courseId);
  const lessonData = getLessonById(courseId, lessonId);

  if (!course || !lessonData) {
    notFound();
  }

  const { lesson, chapter, curriculum } = lessonData;
  const allLessons = getAllLessons(courseId);
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Local & Server state for completed lessons
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Exercise interaction state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Load progress on mount
  useEffect(() => {
    AnalyticsEvents.LESSON_START(courseId, lesson.id);

    try {
      const stored = localStorage.getItem(`tinhocgenz_progress_${courseId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompletedLessons(parsed);
        }
      }
    } catch {}

    fetch(`/api/learning/progress?courseId=${encodeURIComponent(courseId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.completedLessonIds)) {
          setCompletedLessons((prev) => Array.from(new Set([...prev, ...data.completedLessonIds])));
        }
      })
      .catch(() => {});

    try {
      localStorage.setItem(
        "tinhocgenz_recent_learning",
        JSON.stringify({
          courseId,
          courseTitle: course.title,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          accessedAt: new Date().toISOString(),
        })
      );
    } catch {}
  }, [courseId, lesson.id, course.title, lesson.title]);

  const isCurrentCompleted = completedLessons.includes(lesson.id);

  // Handle Exercise Submit
  const handleSubmitAnswer = async () => {
    if (selectedOption === null) return;

    setIsSubmitting(true);
    AnalyticsEvents.EXERCISE_SUBMIT(courseId, lesson.id, lesson.exercise.id);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const correct = selectedOption === lesson.exercise.correctIndex;
    setIsCorrect(correct);
    setIsSubmitted(true);
    setIsSubmitting(false);

    AnalyticsEvents.EXERCISE_RESULT(courseId, lesson.exercise.id, correct);

    if (correct) {
      markLessonComplete();
    }
  };

  // Mark lesson complete and persist
  const markLessonComplete = () => {
    const updated = Array.from(new Set([...completedLessons, lesson.id]));
    setCompletedLessons(updated);

    try {
      localStorage.setItem(`tinhocgenz_progress_${courseId}`, JSON.stringify(updated));
    } catch {}

    fetch("/api/learning/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        lessonId: lesson.id,
        completed: true,
        score: lesson.exercise.points,
      }),
    }).catch(() => {});

    AnalyticsEvents.LESSON_COMPLETE(courseId, lesson.id);
  };

  const handleResetExercise = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  const completionPercent = Math.round(
    (completedLessons.length / Math.max(allLessons.length, 1)) * 100
  );

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#0057B8]">
      
      {/* 1. Header Toolbar (Single H1 per page, concise header) */}
      <header className="sticky top-0 z-30 bg-white text-[#0057B8] border-b border-[#0057B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Back Link & Lesson Title */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/khoa-hoc/${courseId}`}
              className="p-2 rounded-lg bg-white border border-[#0057B8] text-[#0057B8] hover:bg-[#0057B8] hover:text-white transition-colors shrink-0"
              title="Về trang chi tiết khóa học"
            >
              <ArrowLeft size={16} />
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-[#0057B8] font-mono tracking-wider truncate">
                  {course.title}
                </span>
                <span className="hidden sm:inline text-[#0057B8]">•</span>
                <span className="hidden sm:inline text-[11px] text-[#0057B8] font-semibold truncate">
                  {chapter.title}
                </span>
              </div>
              <h1 className="text-xs sm:text-sm font-black text-[#0057B8] truncate">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Right: Progress & Mobile Menu Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Progress indicator */}
            <div className="hidden md:flex items-center gap-2.5 bg-white border border-[#0057B8] px-3.5 py-1.5 rounded-lg">
              <span className="text-xs font-bold text-[#0057B8]">
                {completedLessons.length}/{allLessons.length} bài
              </span>
              <div className="w-20 h-2 bg-white border border-[#0057B8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0057B8] transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-black text-[#0057B8] font-mono">
                {completionPercent}%
              </span>
            </div>

            {/* Mobile Syllabus Toggle */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-white border border-[#0057B8] text-[#0057B8] hover:bg-[#0057B8] hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <Menu size={16} />
              <span className="sr-only sm:not-sr-only">Mục lục</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Workspace Layout (A11Y-01: Outer layout is main landmark, inner is a div) */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR: Table of Contents (260-280px desktop) */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-80 bg-white text-[#0057B8] p-6 transition-transform duration-200 border-r border-[#0057B8] lg:static lg:block lg:w-auto lg:col-span-4 lg:bg-white lg:p-6 lg:rounded-2xl lg:border lg:border-[#0057B8] ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#0057B8] lg:hidden mb-4">
            <span className="font-black text-sm uppercase text-[#0057B8]">
              Nội dung giáo trình
            </span>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 text-[#0057B8]"
            >
              <X size={20} />
            </button>
          </div>

          <div className="hidden lg:block pb-4 mb-4 border-b border-[#0057B8]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#0057B8] tracking-wider">
                Mục lục bài học
              </span>
              <span className="text-[11px] font-bold text-[#0057B8]">
                {completedLessons.length}/{allLessons.length} hoàn thành
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-white border border-[#0057B8] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#0057B8] transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          {/* Chapters & Lessons Tree */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-220px)] pr-1">
            {curriculum.chapters.map((ch) => (
              <div key={ch.id} className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0057B8] block px-2">
                  Chương {ch.order}: {ch.title.replace(/^Chương \d+:\s*/, "")}
                </span>

                <div className="space-y-1">
                  {ch.lessons.map((l) => {
                    const isActive = l.id === lesson.id;
                    const isDone = completedLessons.includes(l.id);

                    return (
                      <Link
                        key={l.id}
                        href={`/khoa-hoc/${courseId}/bai-hoc/${l.id}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-start gap-2.5 p-3 rounded-lg text-xs transition-colors ${
                          isActive
                            ? "bg-[#0057B8] text-white border border-[#0057B8] font-bold"
                            : isDone
                            ? "bg-white text-[#0057B8] border border-[#0057B8] font-semibold"
                            : "bg-white hover:bg-white text-[#0057B8] border border-transparent hover:border-[#0057B8]"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2
                              size={15}
                              className={isActive ? "text-white" : "text-[#0057B8]"}
                            />
                          ) : (
                            <div
                              className={`w-3.5 h-3.5 rounded-full border-2 ${
                                isActive ? "border-white" : "border-[#0057B8]"
                              }`}
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="line-clamp-2 leading-snug">
                            {l.order}. {l.title.replace(/^Bài \d+:\s*/, "")}
                          </span>
                          <span
                            className={`text-[10px] block mt-0.5 ${
                              isActive ? "text-white opacity-90" : "text-[#0057B8] opacity-80"
                            }`}
                          >
                            {l.duration}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-[#0057B8]/40 z-30 lg:hidden"
          />
        )}

        {/* CONTENT AREA (Max ~760px, A11Y-01: regular div, not nested main) */}
        <div className="lg:col-span-8 space-y-8 max-w-[760px]">
          
          {/* A. Lesson Overview Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#0057B8] space-y-4 text-[#0057B8]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md border border-[#0057B8] text-[#0057B8] text-xs font-bold font-mono">
                {chapter.title}
              </span>
              <span className="px-3 py-1 rounded-md border border-[#0057B8] text-[#0057B8] text-xs font-bold flex items-center gap-1">
                <Clock size={12} />
                {lesson.duration}
              </span>
              {isCurrentCompleted && (
                <span className="px-3 py-1 rounded-md bg-[#0057B8] text-white text-xs font-black flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  Đã hoàn thành
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight font-display">
              {lesson.title}
            </h2>

            <p className="text-[#0057B8] text-sm sm:text-base leading-relaxed">
              {lesson.summary}
            </p>

            {/* Objectives */}
            <div className="pt-4 border-t border-[#0057B8] space-y-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-[#0057B8] block">
                Mục tiêu bài học:
              </span>
              <ul className="space-y-1.5">
                {lesson.content.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#0057B8] font-medium">
                    <Check size={15} className="text-[#0057B8] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* B. Theory & Step-by-Step Instructions */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#0057B8] space-y-6 text-[#0057B8]">
            <h3 className="text-lg font-black text-[#0057B8] flex items-center gap-2 border-b border-[#0057B8] pb-3">
              <BookOpen size={18} className="text-[#0057B8]" />
              <span>Kiến Thức Trọng Tâm & Thao Tác</span>
            </h3>

            {/* Theory paragraphs */}
            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#0057B8]">
              {lesson.content.theory.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Step by step cards */}
            <div className="space-y-4 pt-2">
              {lesson.content.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-5 rounded-xl border border-[#0057B8] bg-white space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#0057B8] text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <h4 className="font-black text-[#0057B8] text-sm sm:text-base">
                      {step.title}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-[#0057B8] leading-relaxed pl-8.5">
                    {step.description}
                  </p>

                  {step.shortcut && (
                    <div className="pl-8.5 flex items-center gap-1.5 text-xs text-[#0057B8] font-medium pt-1">
                      <span className="font-bold">Phím tắt:</span>
                      <kbd className="px-2 py-0.5 rounded bg-white border border-[#0057B8] font-mono text-[11px] text-[#0057B8] font-bold">
                        {step.shortcut}
                      </kbd>
                    </div>
                  )}

                  {step.tip && (
                    <div className="pl-8.5 text-xs border border-[#0057B8] p-2.5 rounded-lg flex items-start gap-2 mt-1 bg-white text-[#0057B8]">
                      <Lightbulb size={14} className="text-[#0057B8] shrink-0 mt-0.5" />
                      <span><strong>Lưu ý:</strong> {step.tip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Exam Tips Box */}
            {lesson.content.examTips && lesson.content.examTips.length > 0 && (
              <div className="p-5 rounded-xl border-2 border-[#0057B8] bg-white text-[#0057B8] space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#0057B8] flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#0057B8]" />
                  Mẹo Làm Bài Thi Chuẩn Khảo Thí:
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm font-medium">
                  {lesson.content.examTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-2 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* C. INTERACTIVE EXERCISE / QUIZ (Accessible keyboard, Blue/White states) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#0057B8] space-y-6 text-[#0057B8]">
            <div className="flex items-center justify-between border-b border-[#0057B8] pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg border border-[#0057B8] text-[#0057B8]">
                  <Award size={20} />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0057B8]">
                    Bài tập thực hành đo lường kiến thức
                  </h3>
                  <span className="text-xs font-semibold text-[#0057B8]">
                    Điểm thưởng: +{lesson.exercise.points} XP
                  </span>
                </div>
              </div>

              {lesson.exercise.hint && (
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs font-bold text-[#0057B8] hover:underline flex items-center gap-1 p-2 rounded-lg border border-[#0057B8]"
                >
                  <HelpCircle size={15} />
                  <span>{showHint ? "Ẩn gợi ý" : "Xem gợi ý"}</span>
                </button>
              )}
            </div>

            {/* Hint alert */}
            {showHint && lesson.exercise.hint && (
              <div className="p-3.5 rounded-lg border border-[#0057B8] bg-white text-xs text-[#0057B8] flex items-center gap-2">
                <Lightbulb size={15} className="text-[#0057B8] shrink-0" />
                <span><strong>Gợi ý:</strong> {lesson.exercise.hint}</span>
              </div>
            )}

            {/* Practical Scenario */}
            <div className="p-4 rounded-lg border border-[#0057B8] bg-white text-xs sm:text-sm text-[#0057B8] space-y-1">
              <span className="font-bold uppercase text-[10px] tracking-wider block">
                Tình huống thực tế:
              </span>
              <p>{lesson.exercise.scenario}</p>
            </div>

            {/* Question */}
            <div className="space-y-3">
              <h4 className="text-sm sm:text-base font-black text-[#0057B8] leading-snug">
                {lesson.exercise.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5" role="radiogroup">
                {lesson.exercise.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = idx === lesson.exercise.correctIndex;

                  let optionClass = "border border-[#0057B8] bg-white text-[#0057B8]";
                  if (isSelected) {
                    optionClass = "border-2 border-[#0057B8] bg-[#0057B8] text-white font-bold";
                  }
                  if (isSubmitted) {
                    if (isCorrectAnswer) {
                      optionClass = "border-2 border-[#0057B8] bg-[#0057B8] text-white font-bold";
                    } else if (isSelected && !isCorrectAnswer) {
                      optionClass = "border-2 border-dashed border-[#0057B8] bg-white text-[#0057B8] line-through";
                    }
                  }

                  return (
                    <label
                      key={idx}
                      onClick={() => !isSubmitted && setSelectedOption(idx)}
                      className={`flex items-start gap-3 p-4 rounded-xl transition-colors cursor-pointer text-xs sm:text-sm ${optionClass}`}
                    >
                      <input
                        type="radio"
                        name="exercise-option"
                        checked={isSelected}
                        onChange={() => !isSubmitted && setSelectedOption(idx)}
                        disabled={isSubmitted}
                        className="mt-0.5 text-[#0057B8] focus:ring-[#0057B8] shrink-0"
                      />
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Action & Feedback Box */}
            <div className="pt-3 border-t border-[#0057B8] flex flex-col sm:flex-row items-center justify-between gap-4">
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null || isSubmitting}
                  className="w-full sm:w-auto min-h-12 px-8 py-3 rounded-xl bg-[#0057B8] hover:bg-white disabled:bg-white text-white hover:text-[#0057B8] disabled:text-[#0057B8] disabled:opacity-50 border border-[#0057B8] font-bold text-xs uppercase tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Đang chấm điểm...</span>
                  ) : (
                    <>
                      <span>Kiểm tra kết quả</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              ) : (
                <div className="w-full space-y-4" role="status" aria-live="polite">
                  {isCorrect ? (
                    <div className="p-4 rounded-xl border-2 border-[#0057B8] bg-white text-[#0057B8] space-y-2">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <CheckCircle2 size={18} />
                        <span>Chính xác tuyệt đối! (+{lesson.exercise.points} XP)</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        {lesson.exercise.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border-2 border-dashed border-[#0057B8] bg-white text-[#0057B8] space-y-2">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <AlertCircle size={18} />
                        <span>Chưa chính xác! Hãy đọc kỹ giải thích:</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        {lesson.exercise.explanation}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleResetExercise}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#0057B8] border border-[#0057B8] text-[#0057B8] hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw size={13} />
                      <span>Thử lại câu hỏi</span>
                    </button>

                    {nextLesson && (
                      <Link
                        href={`/khoa-hoc/${courseId}/bai-hoc/${nextLesson.id}`}
                        className="px-6 py-2.5 rounded-xl bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Sang bài tiếp theo</span>
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* D. Bottom Navigation Controls (Previous / Next) */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#0057B8]">
            {prevLesson ? (
              <Link
                href={`/khoa-hoc/${courseId}/bai-hoc/${prevLesson.id}`}
                className="px-5 py-3 rounded-xl bg-white hover:bg-[#0057B8] border border-[#0057B8] text-[#0057B8] hover:text-white font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={15} />
                <span className="hidden sm:inline">Bài trước:</span>
                <span className="truncate max-w-[120px] sm:max-w-[180px]">{prevLesson.title.replace(/^Bài \d+:\s*/, "")}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/khoa-hoc/${courseId}/bai-hoc/${nextLesson.id}`}
                className="px-5 py-3 rounded-xl bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] font-bold text-xs flex items-center gap-2 transition-colors ml-auto"
              >
                <span className="hidden sm:inline">Bài tiếp theo:</span>
                <span className="truncate max-w-[120px] sm:max-w-[180px]">{nextLesson.title.replace(/^Bài \d+:\s*/, "")}</span>
                <ArrowRight size={15} />
              </Link>
            ) : (
              <Link
                href={`/khoa-hoc/${courseId}`}
                className="px-5 py-3 rounded-xl bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] font-bold text-xs flex items-center gap-2 transition-colors ml-auto"
              >
                <span>Hoàn thành giáo trình!</span>
                <CheckCircle2 size={15} />
              </Link>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
