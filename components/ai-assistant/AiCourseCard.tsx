"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CourseRecommendation } from "@/types/ai-assistant";
import { trackEvent } from "@/lib/analytics";

interface AiCourseCardProps {
  course: CourseRecommendation;
  onSelect?: (course: CourseRecommendation) => void;
}

export default function AiCourseCard({ course, onSelect }: AiCourseCardProps) {
  const handleClick = () => {
    trackEvent("ai_course_clicked", { course_id: course.id, course_title: course.title });
    if (onSelect) onSelect(course);
  };

  return (
    <div className="w-full mt-2.5 p-3 rounded-xl bg-white border border-[#DDE8F5] shadow-2xs space-y-2 select-none">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-[#0B2545] leading-snug line-clamp-1">
            {course.title}
          </h4>
          <p className="text-[11px] font-medium text-[#0057B8] mt-0.5">
            {course.levelOrFormat} {course.price ? `• ${course.price}` : ""}
          </p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EBF3FF] text-[10px] font-bold text-[#0057B8]">
          <Sparkles size={10} />
          Gợi ý
        </span>
      </div>

      <p className="text-xs text-[#54657A] leading-relaxed line-clamp-2">
        {course.reason}
      </p>

      <div className="pt-1 flex items-center justify-between">
        <Link
          href={course.href || "/khoa-hoc"}
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs active:scale-[0.98]"
        >
          <span>Xem khóa học</span>
          <ArrowRight size={13} />
        </Link>
        {course.schedule && (
          <span className="text-[11px] text-slate-400 font-medium truncate max-w-[120px]">
            {course.schedule}
          </span>
        )}
      </div>
    </div>
  );
}
