"use client";

import React, { useState, useRef, useEffect } from "react";
import AiMascot from "./AiMascot";
import AiSuggestionBubble from "./AiSuggestionBubble";
import { MascotState } from "@/types/ai-assistant";

interface AiLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  mascotState: MascotState;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  greetingBubbleText: string | null;
  showGreetingBubble: boolean;
  onDismissGreetingBubble: () => void;
}

export default function AiLauncher({
  isOpen,
  onToggle,
  mascotState,
  onHoverStart,
  onHoverEnd,
  greetingBubbleText,
  showGreetingBubble,
  onDismissGreetingBubble,
}: AiLauncherProps) {
  const [hoverBubbleText, setHoverBubbleText] = useState<string | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Desktop hover delay: bubble only appears after 600ms hover
  const handleMouseEnter = () => {
    onHoverStart();
    if (!isOpen && !showGreetingBubble) {
      hoverTimerRef.current = setTimeout(() => {
        setHoverBubbleText("Chào bạn 👋 Mình giúp gì cho bạn?");
      }, 600);
    }
  };

  const handleMouseLeave = () => {
    onHoverEnd();
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setHoverBubbleText(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const activeBubbleText = showGreetingBubble ? greetingBubbleText : hoverBubbleText;
  const isBubbleVisible = !isOpen && Boolean(activeBubbleText);

  return (
    <div
      className="relative flex flex-col items-end select-none pointer-events-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Speech Hint Bubble */}
      <AiSuggestionBubble
        text={activeBubbleText || ""}
        visible={isBubbleVisible}
        onDismiss={() => {
          onDismissGreetingBubble();
          setHoverBubbleText(null);
        }}
      />

      {/* Floating Mascot Button (Pure transparent, NO white circle wrapper) */}
      <button
        type="button"
        onClick={onToggle}
        aria-label="Mở trợ lý học tập AI - Tin Học Gen Z"
        aria-expanded={isOpen}
        title="Trợ lý học tập AI Tin Học Gen Z"
        className="group relative flex items-center justify-center p-0 bg-transparent border-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0066FF] focus-visible:outline-offset-4 active:scale-95 transition-transform"
      >
        {/* Active Online Beacon Dot */}
        <span
          className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-3 w-3 z-30 pointer-events-none"
          aria-hidden="true"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-white" />
        </span>

        {/* Mascot Character - Responsive Size (58px mobile, 76px desktop) */}
        <div className="block sm:hidden pointer-events-none">
          <AiMascot size={58} state={mascotState} priority={true} animated={true} />
        </div>
        <div className="hidden sm:block pointer-events-none">
          <AiMascot size={76} state={mascotState} priority={true} animated={true} />
        </div>
      </button>
    </div>
  );
}

