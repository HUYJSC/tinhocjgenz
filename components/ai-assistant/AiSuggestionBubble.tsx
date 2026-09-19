"use client";

import React from "react";

interface AiSuggestionBubbleProps {
  text: string;
  visible: boolean;
  onDismiss?: () => void;
}

export default function AiSuggestionBubble({
  text,
  visible,
  onDismiss,
}: AiSuggestionBubbleProps) {
  if (!visible || !text) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative mb-2.5 px-3.5 py-2 rounded-2xl bg-white border border-[#0066FF] shadow-[0_4px_16px_rgba(0,102,255,0.12)] text-xs text-[#0066FF] font-bold select-none pointer-events-auto transition-all duration-300 origin-bottom-right animate-in fade-in slide-in-from-bottom-2 flex items-center gap-1.5 whitespace-nowrap z-30"
    >
      <span>{text}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="ml-1 text-slate-400 hover:text-slate-600 text-xs p-0.5 cursor-pointer"
          aria-label="Đóng thông báo"
        >
          ✕
        </button>
      )}
      {/* Speech bubble tail */}
      <div className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-white border-r border-b border-[#0066FF] rotate-45 pointer-events-none" />
    </div>
  );
}

