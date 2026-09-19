"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ChatMessage } from "@/types/ai-assistant";
import AiMascot from "./AiMascot";
import AiQuickActions from "./AiQuickActions";

interface AiMessageProps {
  message: ChatMessage;
  onQuickAction: (val: string) => void;
  isLast: boolean;
  onOpenLeadModal?: () => void;
}

export default function AiMessage({
  message,
  onQuickAction,
  isLast,
  onOpenLeadModal,
}: AiMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2.5 items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && (
        <div className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
          <AiMascot state="idle" size={28} animated={false} />
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
          isUser
            ? "bg-[#0066FF] text-white rounded-tr-xs shadow-xs"
            : "bg-white text-[#0B2545] border border-[#E5EEF8] rounded-tl-xs shadow-[0_2px_10px_rgba(11,37,69,0.04)]"
        }`}
      >
        {/* Message Content */}
        <div className="whitespace-pre-line font-normal">{message.content}</div>

        {/* Timestamp */}
        <div
          className={`text-[10px] mt-1.5 font-medium ${
            isUser ? "text-white/75 text-right" : "text-slate-400 text-left"
          }`}
        >
          {message.timestamp}
        </div>

        {/* Course Card Recommendation if present */}
        {message.recommendedCourse && (
          <div className="mt-3 p-3 bg-[#F7FAFE] rounded-xl border border-[#E5EEF8] space-y-2 text-xs">
            <div className="font-bold text-[#0066FF] text-sm flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#0066FF] shrink-0" />
              <span>{message.recommendedCourse.title}</span>
            </div>
            {message.recommendedCourse.tagline && (
              <p className="text-[#54657A]">{message.recommendedCourse.tagline}</p>
            )}
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600 pt-1">
              <div><strong>Trình độ:</strong> {message.recommendedCourse.level}</div>
              <div><strong>Thời lượng:</strong> {message.recommendedCourse.duration}</div>
              {message.recommendedCourse.price && (
                <div><strong>Học phí:</strong> {message.recommendedCourse.price}</div>
              )}
              {message.recommendedCourse.schedule && (
                <div><strong>Lịch:</strong> {message.recommendedCourse.schedule}</div>
              )}
            </div>
            <div className="pt-2">
              <Link
                href={message.recommendedCourse.url}
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-center transition-colors"
              >
                <span>Xem chi tiết khóa học</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {/* Structured Roadmap Card if present */}
        {message.roadmap && (
          <div className="mt-3 p-3 bg-[#F7FAFE] rounded-xl border border-[#E5EEF8] space-y-2 text-xs">
            <div className="font-bold text-[#0066FF] flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#0066FF]" />
              <span>{message.roadmap.assessment || "Lộ trình đào tạo đề xuất"}</span>
            </div>
            {message.roadmap.primaryCourse && (
              <div className="text-slate-700">
                <strong>Khóa học trọng tâm:</strong> {message.roadmap.primaryCourse.title}
                {message.roadmap.totalEstimatedWeeks ? ` (${message.roadmap.totalEstimatedWeeks} tuần)` : ""}
              </div>
            )}
            {message.roadmap.phases && message.roadmap.phases.length > 0 && (
              <ul className="space-y-1 text-slate-600">
                {message.roadmap.phases.map((ph, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#0066FF] font-bold">•</span>
                    <span><strong>{ph.title}:</strong> {ph.focus} ({ph.duration})</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="pt-2 flex flex-col gap-1.5">
              {onOpenLeadModal && (
                <button
                  type="button"
                  onClick={onOpenLeadModal}
                  className="w-full py-2 rounded-lg bg-[#0066FF] text-white font-bold text-center hover:bg-[#0052CC] transition-colors cursor-pointer"
                >
                  Đăng ký xếp lớp theo lộ trình này
                </button>
              )}
              <Link
                href={message.roadmap.primaryCourse?.enrollmentUrl || "/khoa-hoc"}
                className="text-center font-semibold text-[#0066FF] hover:underline text-[11px] py-0.5"
              >
                Xem chi tiết khóa học →
              </Link>
            </div>
          </div>
        )}

        {/* Quick actions for this message if last or error */}
        {message.quickReplies && (isLast || message.isError) && (
          <div className="mt-2.5 pt-2 border-t border-[#E5EEF8]">
            <AiQuickActions
              actions={message.quickReplies}
              onSelect={onQuickAction}
            />
          </div>
        )}
      </div>
    </div>
  );
}

