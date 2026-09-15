"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Play } from "lucide-react";
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
          queueMicrotask(() => {
            setRecent(parsed);
          });
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
      <div className="bg-white text-[#172B4D] rounded-2xl p-4 sm:p-5 shadow-card border border-[#D8E4F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#E8F1FC] border border-[#D8E4F2] text-[#0057B8] flex items-center justify-center shrink-0">
            <Play size={18} className="fill-[#0057B8] text-[#0057B8] translate-x-0.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0057B8] bg-[#E8F1FC] px-2 py-0.5 rounded border border-[#D8E4F2]">
                Tiếp tục học
              </span>
              <span className="text-xs text-[#526581] font-bold truncate">
                {recent.courseTitle}
              </span>
            </div>
            <h4 className="text-sm font-black text-[#0B2545] truncate mt-0.5">
              {recent.lessonTitle}
            </h4>
          </div>
        </div>

        <Link
          href={`/khoa-hoc/${recent.courseId}/bai-hoc/${recent.lessonId}`}
          onClick={handleResumeClick}
          className="self-start sm:self-center shrink-0 min-h-[42px] px-5 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] active:bg-[#00336F] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#0057B8]"
        >
          <span>Học tiếp ngay</span>
          <ArrowRight size={14} />
        </Link>

      </div>
    </div>
  );
}

