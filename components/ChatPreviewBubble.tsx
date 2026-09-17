"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface ChatPreviewBubbleProps {
  message?: string;
  className?: string;
}

export default function ChatPreviewBubble({
  message = "Chào bạn! Mình có thể giúp bạn chọn lộ trình học phù hợp.",
  className = "",
}: ChatPreviewBubbleProps) {
  return (
    <div
      className={`relative bg-gradient-to-br from-white to-[#F4F8FD] border border-[#E5EEF8] rounded-2xl rounded-bl-sm p-3.5 shadow-[0_4px_20px_rgba(0,87,184,0.06)] text-left ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0057B8] mb-1">
        <Sparkles size={13} className="text-[#0057B8]" />
        <span>Trợ lý học tập AI</span>
      </div>
      <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
        {message}
      </p>

      {/* Speech bubble tail pointer pointing to mascot */}
      <span
        className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#F4F8FD] border-b border-l border-[#E5EEF8] rotate-45"
        aria-hidden="true"
      />
    </div>
  );
}

