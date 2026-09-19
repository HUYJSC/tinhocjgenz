"use client";

import React from "react";
import Image from "next/image";
import { ChatMessage, CourseRecommendation } from "@/types/ai-assistant";
import AiCourseCard from "./AiCourseCard";
import AiQuickActions from "./AiQuickActions";

interface AiMessageProps {
  message: ChatMessage;
  onQuickAction?: (value: string, label: string) => void;
  onSelectCourse?: (course: CourseRecommendation) => void;
  isLast?: boolean;
}

export default function AiMessage({
  message,
  onQuickAction,
  onSelectCourse,
  isLast = false,
}: AiMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex flex-col items-end w-full animate-in fade-in slide-in-from-bottom-1 duration-150">
        <div className="max-w-[80%] rounded-[16px_6px_16px_16px] bg-[#0057B8] text-white px-3 py-2.5 text-sm leading-[1.55] shadow-2xs font-normal break-words">
          {message.content}
        </div>
        {message.timestamp && (
          <span className="text-[10px] text-slate-400 mt-1 mr-1">
            {message.timestamp}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 w-full animate-in fade-in slide-in-from-bottom-1 duration-150">
      {/* 28-30px Master Mascot Avatar */}
      <div className="w-[30px] h-[30px] rounded-full shrink-0 relative mt-0.5 overflow-hidden select-none bg-transparent">
        <Image
          src="/brand/chatbot/chatbot-ai-mascot.png"
          alt="Trợ lý AI"
          width={30}
          height={30}
          className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
        />
      </div>

      {/* Bubble container */}
      <div className="max-w-[84%] flex flex-col items-start min-w-0">
        <div className="rounded-[6px_16px_16px_16px] bg-white border border-[#E3EDF8] text-[#0B2545] px-3 py-2.5 text-sm leading-[1.55] shadow-2xs font-normal break-words whitespace-pre-line w-full">
          {message.content}
        </div>

        {/* Compact Course Recommendation Card */}
        {message.recommendedCourse && (
          <AiCourseCard
            course={message.recommendedCourse}
            onSelect={onSelectCourse}
          />
        )}

        {/* Dynamic Quick Actions Cards (only active on latest message) */}
        {message.quickReplies && message.quickReplies.length > 0 && isLast && onQuickAction && (
          <AiQuickActions
            actions={message.quickReplies}
            onActionClick={onQuickAction}
          />
        )}

        {message.timestamp && (
          <span className="text-[10px] text-slate-400 mt-1 ml-1">
            {message.timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
