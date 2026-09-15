"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, CheckCircle2, Play } from "lucide-react";
import { AnalyticsEvents } from "@/lib/analytics";

interface RecentLearningInfo {
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  accessedAt: string;
}

export default function ContinueLearningWidget() {
  const [recent, setRecent] = useState<RecentLearningInfo | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tinhocgenz_recent_learning");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.courseId && parsed?.lessonId) {
          setRecent(parsed);
        }
      }
    } catch {}
  }, []);

  if (!recent) {
    return null;
  }

  const handleResumeClick = () => {
    AnalyticsEvents.RESUME_LEARNING(recent.courseId, recent.lessonId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-8 z-20 relative animate-slide-up">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-xl border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 text-cyan-300 flex items-center justify-center shrink-0">
            <Play size={18} className="fill-cyan-300 translate-x-0.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-800">
                Tiếp tục học
              </span>
              <span className="text-xs text-slate-300 font-bold truncate">
                {recent.courseTitle}
              </span>
            </div>
            <h4 className="text-sm font-black text-white truncate mt-0.5">
              {recent.lessonTitle}
            </h4>
          </div>
        </div>

        <Link
          href={`/khoa-hoc/${recent.courseId}/bai-hoc/${recent.lessonId}`}
          onClick={handleResumeClick}
          className="self-start sm:self-center shrink-0 min-h-[42px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <span>Học tiếp ngay</span>
          <ArrowRight size={14} />
        </Link>

      </div>
    </div>
  );
}
