"use client";

import React, { useState, useEffect } from "react";
import AiMascot from "./ai-assistant/AiMascot";

interface FloatingAiLauncherProps {
  isOpen?: boolean;
  onOpenChat: () => void;
}

export default function FloatingAiLauncher({
  isOpen = false,
  onOpenChat,
}: FloatingAiLauncherProps) {
  const [showGreetingBubble, setShowGreetingBubble] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-show a friendly greeting bubble briefly after page load (after 2.5s, lasts 4s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreetingBubble(true);
      const hideTimer = setTimeout(() => {
        setShowGreetingBubble(false);
      }, 4500);
      return () => clearTimeout(hideTimer);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const shouldShowBubble = !isOpen && (showGreetingBubble || isHovered);

  return (
    <div
      className="relative flex flex-col items-end select-none pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Speech Hint Bubble (Desktop & Tablet) */}
      <div
        aria-hidden="true"
        className={`hidden sm:flex items-center gap-2 mb-2 px-3.5 py-2 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_4px_20px_rgba(11,37,69,0.1)] text-xs text-[#0B2545] font-semibold transition-all duration-300 origin-bottom-right ${
          shouldShowBubble
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <span className="text-sm">👋</span>
        <span>Học gì hôm nay? Để mình tư vấn nhé!</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
      </div>

      {/* Floating Mascot Button */}
      <button
        type="button"
        onClick={onOpenChat}
        aria-label="Mở trợ lý học tập AI - Tin Học Gen Z"
        aria-expanded={isOpen}
        title="Trợ lý học tập AI Tin Học Gen Z"
        className="group relative flex items-center justify-center p-1 sm:p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0057B8]/25 shadow-[0_8px_24px_rgba(0,87,184,0.16)] hover:shadow-[0_12px_28px_rgba(0,87,184,0.25)] hover:border-[#0057B8]/50 hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0057B8] focus-visible:outline-offset-2"
      >
        {/* Active Online Beacon Dot */}
        <span
          className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-3 w-3 z-30 pointer-events-none"
          aria-hidden="true"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-white" />
        </span>

        {/* Mascot Character - Responsive Size (56px mobile, 68px desktop) */}
        <div className="block sm:hidden pointer-events-none">
          <AiMascot size={56} animated={true} interactive={false} priority={true} />
        </div>
        <div className="hidden sm:block pointer-events-none">
          <AiMascot size={68} animated={true} interactive={false} priority={true} />
        </div>
      </button>
    </div>
  );
}
