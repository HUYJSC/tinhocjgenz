"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  getLessonById,
  getAllLessons,
  getCurriculumByCourseId,
  Lesson,
  Chapter,
} from "@/data/lessonsData";
import { coursesData } from "@/data/mockData";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Sparkles,
  Menu,
  X,
  RotateCcw,
  Check,
  Lightbulb,
  AlertCircle,
  HelpCircle,
  Laptop,
} from "lucide-react";
import { AnalyticsEvents } from "@/lib/analytics";

interface LessonPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export default function InteractiveLessonPage(props: LessonPageProps) {
  const params = use(props.params);
  const router = useRouter();
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
    // 1. Fire lesson start analytics
    AnalyticsEvents.LESSON_START(courseId, lesson.id);

    // 2. Load completed lessons from localStorage
    try {
      const stored = localStorage.getItem(`tinhocgenz_progress_${courseId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompletedLessons(parsed);
        }
      }
    } catch {}

    // 3. Sync from server API
    fetch(`/api/learning/progress?courseId=${encodeURIComponent(courseId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.completedLessonIds)) {
          setCompletedLessons((prev) => Array.from(new Set([...prev, ...data.completedLessonIds])));
        }
      })
      .catch(() => {});

    // Save recent activity to localStorage for Resume Learning block
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

    // Simulate small latency for realistic evaluation feedback
    await new Promise((resolve) => setTimeout(resolve, 350));

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

    // Sync to server API
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
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. Header Toolbar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Back Link & Course Name */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/khoa-hoc/${courseId}`}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
              title="Về trang giới thiệu khóa học"
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-cyan-400 font-mono tracking-wider truncate">
                  {course.title}
                </span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="hidden sm:inline text-[11px] text-slate-400 font-semibold truncate">
                  {chapter.title}
                </span>
              </div>
              <h1 className="text-xs sm:text-sm font-black text-white truncate">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Right: Progress & Mobile Menu Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Progress indicator */}
            <div className="hidden md:flex items-center gap-2.5 bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-full">
              <span className="text-xs font-bold text-slate-300">
                {completedLessons.length}/{allLessons.length} bài
              </span>
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-black text-cyan-400 font-mono">
                {completionPercent}%
              </span>
            </div>

            {/* Mobile Syllabus Toggle */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <Menu size={18} />
              <span className="sr-only sm:not-sr-only">Mục lục</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Workspace Layout (Sidebar + Content) */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR: Table of Contents (Desktop sticky, Mobile drawer) */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-80 bg-slate-900 text-white p-6 shadow-2xl transition-transform duration-300 lg:static lg:block lg:w-auto lg:col-span-4 lg:bg-white lg:text-slate-900 lg:p-6 lg:rounded-3xl lg:border lg:border-slate-200 lg:shadow-sm ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 lg:hidden mb-4">
            <span className="font-black text-sm uppercase text-cyan-400">
              Nội dung khóa học
            </span>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="hidden lg:block pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-blue-600 tracking-wider">
                Mục lục khóa học
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                {completedLessons.length}/{allLessons.length} hoàn thành
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          {/* Chapters & Lessons Tree */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-220px)] pr-1">
            {curriculum.chapters.map((ch) => (
              <div key={ch.id} className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 lg:text-slate-400 block px-2">
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
                        className={`flex items-start gap-2.5 p-3 rounded-2xl text-xs transition-all ${
                          isActive
                            ? "bg-blue-600 text-white font-black shadow-md shadow-blue-500/20"
                            : isDone
                            ? "bg-emerald-50 text-emerald-900 hover:bg-emerald-100/70 font-semibold"
                            : "hover:bg-slate-100 text-slate-700 font-medium"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2
                              size={15}
                              className={isActive ? "text-white" : "text-emerald-600"}
                            />
                          ) : (
                            <div
                              className={`w-3.5 h-3.5 rounded-full border-2 ${
                                isActive ? "border-white" : "border-slate-300"
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
                              isActive ? "text-blue-100" : "text-slate-400"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
          />
        )}

        {/* MAIN CONTENT AREA */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* A. Lesson Overview Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black font-mono">
                {chapter.title}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1">
                <Clock size={12} />
                {lesson.duration}
              </span>
              {isCurrentCompleted && (
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  Đã hoàn thành
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              {lesson.title}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {lesson.summary}
            </p>

            {/* Objectives */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                Mục tiêu cần đạt được:
              </span>
              <ul className="space-y-1.5">
                {lesson.content.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <Check size={15} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* B. Theory & Detailed Step-by-Step Instructions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen size={18} className="text-blue-600" />
              <span>Kiến Thức Trọng Tâm & Quy Trình Thao Tác</span>
            </h3>

            {/* Theory paragraphs */}
            <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
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
                  className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      {step.title}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8.5">
                    {step.description}
                  </p>

                  {step.shortcut && (
                    <div className="pl-8.5 flex items-center gap-1.5 text-xs text-slate-500 font-medium pt-1">
                      <span className="font-bold text-slate-700">Phím tắt:</span>
                      <kbd className="px-2 py-0.5 rounded bg-white border border-slate-300 font-mono text-[11px] text-blue-700 font-bold shadow-xs">
                        {step.shortcut}
                      </kbd>
                    </div>
                  )}

                  {step.tip && (
                    <div className="pl-8.5 text-xs text-amber-700 bg-amber-50/70 border border-amber-200/80 p-2.5 rounded-xl flex items-start gap-2 mt-1">
                      <Lightbulb size={14} className="text-amber-600 shrink-0 mt-0.5" />
                      <span>{step.tip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Exam Tips Box */}
            {lesson.content.examTips && lesson.content.examTips.length > 0 && (
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 text-blue-950 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-blue-600" />
                  Mẹo Làm Bài Thi Certiport / IIG Tuyệt Đối:
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm font-medium">
                  {lesson.content.examTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* C. INTERACTIVE EXERCISE / CHALLENGE SECTION (CodeLearn Style) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-600/30 shadow-md space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Award size={20} />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    Bài Tập Thực Hành Đo Lường Kiến Thức
                  </h3>
                  <span className="text-xs text-slate-400">
                    Điểm thưởng: +{lesson.exercise.points} XP
                  </span>
                </div>
              </div>

              {lesson.exercise.hint && (
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 p-2 rounded-xl hover:bg-amber-50 transition-colors"
                >
                  <HelpCircle size={15} />
                  <span>{showHint ? "Ẩn gợi ý" : "Xem gợi ý"}</span>
                </button>
              )}
            </div>

            {/* Hint alert */}
            {showHint && lesson.exercise.hint && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2 animate-fade-in">
                <Lightbulb size={15} className="text-amber-600 shrink-0" />
                <span><strong>Gợi ý:</strong> {lesson.exercise.hint}</span>
              </div>
            )}

            {/* Practical Scenario */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block text-blue-600">
                Tình huống thực tế:
              </span>
              <p>{lesson.exercise.scenario}</p>
            </div>

            {/* Question */}
            <div className="space-y-3">
              <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                {lesson.exercise.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5" role="radiogroup">
                {lesson.exercise.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = idx === lesson.exercise.correctIndex;

                  let borderClass = "border-slate-200 hover:border-blue-400 hover:bg-blue-50/30";
                  if (isSelected) {
                    borderClass = "border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-xs";
                  }
                  if (isSubmitted) {
                    if (isCorrectAnswer) {
                      borderClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold";
                    } else if (isSelected && !isCorrectAnswer) {
                      borderClass = "border-rose-500 bg-rose-50 text-rose-950 line-through";
                    }
                  }

                  return (
                    <label
                      key={idx}
                      onClick={() => !isSubmitted && setSelectedOption(idx)}
                      className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer text-xs sm:text-sm ${borderClass}`}
                    >
                      <input
                        type="radio"
                        name="exercise-option"
                        checked={isSelected}
                        onChange={() => !isSubmitted && setSelectedOption(idx)}
                        disabled={isSubmitted}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500 shrink-0"
                      />
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Action & Feedback Box */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null || isSubmitting}
                  className="w-full sm:w-auto min-h-12 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-xs uppercase tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang chấm điểm...</span>
                    </>
                  ) : (
                    <>
                      <span>Kiểm tra kết quả</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              ) : (
                <div className="w-full space-y-4 animate-fade-in">
                  {isCorrect ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
                      <div className="flex items-center gap-2 font-black text-sm text-emerald-700">
                        <CheckCircle2 size={18} />
                        <span>Chính xác tuyệt đối! (+{lesson.exercise.points} XP)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                        {lesson.exercise.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
                      <div className="flex items-center gap-2 font-black text-sm text-rose-700">
                        <AlertCircle size={18} />
                        <span>Chưa chính xác! Hãy đọc kỹ giải thích dưới đây:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
                        {lesson.exercise.explanation}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleResetExercise}
                      className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw size={13} />
                      <span>Thử lại câu hỏi</span>
                    </button>

                    {nextLesson && (
                      <Link
                        href={`/khoa-hoc/${courseId}/bai-hoc/${nextLesson.id}`}
                        className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wide shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
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
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
            {prevLesson ? (
              <Link
                href={`/khoa-hoc/${courseId}/bai-hoc/${prevLesson.id}`}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
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
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-2 shadow-md transition-all ml-auto"
              >
                <span className="hidden sm:inline">Bài tiếp theo:</span>
                <span className="truncate max-w-[120px] sm:max-w-[180px]">{nextLesson.title.replace(/^Bài \d+:\s*/, "")}</span>
                <ArrowRight size={15} />
              </Link>
            ) : (
              <Link
                href={`/khoa-hoc/${courseId}`}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 shadow-md transition-all ml-auto"
              >
                <span>Hoàn thành khóa học!</span>
                <CheckCircle2 size={15} />
              </Link>
            )}
          </div>

        </main>

      </div>

    </div>
  );
}
