"use client";

import React from "react";
import AiMascot from "./AiMascot";

interface AiTypingIndicatorProps {
  state: "thinking" | "typing";
}

export default function AiTypingIndicator({ state }: AiTypingIndicatorProps) {
  const label = state === "thinking" ? "Đang suy nghĩ..." : "Đang trả lời...";

  return (
    <div className="flex gap-2.5 items-start animate-in fade-in duration-200">
      <div className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
        <AiMascot state={state} size={28} animated={false} />
      </div>
      <div className="p-3 rounded-2xl rounded-tl-xs bg-white border border-[#E5EEF8] text-xs text-[#54657A] flex items-center gap-2 shadow-2xs">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce" />
        </div>
        <span className="font-medium text-[11px] text-slate-500">{label}</span>
      </div>
    </div>
  );
}

