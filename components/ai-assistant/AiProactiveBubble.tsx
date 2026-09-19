"use client";

import React from "react";
import { X } from "lucide-react";

interface AiProactiveBubbleProps {
  text: string;
  visible: boolean;
  onOpen: () => void;
  onDismiss: () => void;
}

export default function AiProactiveBubble({
  text,
  visible,
  onOpen,
  onDismiss,
}: AiProactiveBubbleProps) {
  if (!visible || !text) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={onOpen}
      className="fixed bottom-[30px] right-[106px] sm:right-[114px] z-40 max-w-[210px] p-3 rounded-[14px] bg-white border border-[#DDE8F5] shadow-[0_8px_24px_rgba(11,37,69,0.1)] text-xs text-[#0B2545] font-medium leading-relaxed select-none cursor-pointer transition-all duration-200 hover:border-[#0057B8] hover:-translate-y-0.5 group animate-in fade-in slide-in-from-right-3"
    >
      <div className="flex items-start justify-between gap-1.5">
        <p className="whitespace-pre-line group-hover:text-[#0057B8] transition-colors">
          {text}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          aria-label="Đóng gợi ý"
          className="text-slate-400 hover:text-slate-600 p-0.5 rounded -mr-1 -mt-1 cursor-pointer shrink-0 transition-colors"
        >
          <X size={13} />
        </button>
      </div>

      {/* Subtle Tail pointing to mascot */}
      <div className="hidden sm:block absolute -right-1.5 bottom-4 w-3 h-3 bg-white border-r border-t border-[#DDE8F5] rotate-45 pointer-events-none" />
    </div>
  );
}

