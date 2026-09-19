"use client";

import React from "react";
import AiMascot from "./AiMascot";
import { MascotState } from "@/types/ai-assistant";

interface AiLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  mascotState: MascotState;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export default function AiLauncher({
  isOpen,
  onToggle,
  mascotState,
  onHoverStart,
  onHoverEnd,
}: AiLauncherProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      aria-label={isOpen ? "Đóng trợ lý học tập AI" : "Mở trợ lý học tập AI"}
      aria-expanded={isOpen}
      title="Trợ lý học tập AI Tin Học Gen Z"
      className="group relative flex items-center justify-center p-0 bg-transparent border-none cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8] focus-visible:ring-offset-4 rounded-full transition-transform duration-180 active:scale-[0.96] hover:scale-[1.03] hover:-translate-y-[2px]"
    >
      {/* Calm Status Dot (6px steady emerald dot, no aggressive ping) */}
      <span
        className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-2.5 w-2.5 z-30 pointer-events-none"
        aria-hidden="true"
      >
        <span className="inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white shadow-xs" />
      </span>

      {/* Responsive Mascot Master (58px mobile, 76px desktop) */}
      <div className="block sm:hidden pointer-events-none">
        <AiMascot
          size={58}
          state={isOpen ? "opened" : mascotState}
          priority={true}
          animated={true}
        />
      </div>
      <div className="hidden sm:block pointer-events-none">
        <AiMascot
          size={76}
          state={isOpen ? "opened" : mascotState}
          priority={true}
          animated={true}
        />
      </div>
    </button>
  );
}
