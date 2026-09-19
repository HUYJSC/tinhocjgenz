"use client";

import React from "react";
import Image from "next/image";
import { MascotState } from "@/types/ai-assistant";

export type { MascotState };

export interface AiMascotProps {
  size?: number;
  state?: MascotState;
  showStateIndicator?: boolean;
  interactive?: boolean;
  animated?: boolean;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
  alt?: string;
}

export default function AiMascot({
  size = 48,
  state = "idle",
  showStateIndicator = false,
  interactive = false,
  animated = true,
  priority = false,
  className = "",
  onClick,
  alt = "Trợ lý học tập AI Tin Học Gen Z",
}: AiMascotProps) {
  // Determine state-based animation / transform classes
  let stateClass = "";
  if (animated) {
    switch (state) {
      case "idle":
        stateClass = "animate-mascot-idle";
        break;
      case "hover":
        stateClass = "scale-[1.06] -translate-y-0.5 -rotate-1";
        break;
      case "thinking":
        stateClass = "animate-mascot-thinking";
        break;
      case "typing":
      case "speaking":
        stateClass = "animate-mascot-thinking";
        break;
      case "success":
        stateClass = "animate-mascot-success";
        break;
      case "error":
        stateClass = "animate-mascot-error";
        break;
      case "sleeping":
        stateClass = "opacity-75 scale-[0.98]";
        break;
      case "greeting":
        stateClass = "rotate-2 scale-[1.03]";
        break;
      case "opened":
        stateClass = "scale-[1.02]";
        break;
      default:
        stateClass = "animate-mascot-idle";
    }
  }

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative inline-flex items-center justify-center select-none bg-transparent ${
        interactive ? "cursor-pointer group" : ""
      } ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Animated container */}
      <div
        className={`w-full h-full relative flex items-center justify-center transition-all duration-200 will-change-transform ${stateClass}`}
      >
        {/* Single Master Transparent Mascot Asset */}
        <Image
          src="/brand/chatbot/chatbot-ai-mascot.png"
          alt={alt}
          width={size}
          height={size}
          priority={priority}
          unoptimized
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_8px_14px_rgba(0,87,184,0.16)]"
          style={{ background: "transparent" }}
        />

        {/* State Indicators */}
        {showStateIndicator && (
          <>
            {state === "thinking" || state === "typing" ? (
              /* Thinking / Typing mini stagger dots */
              <span
                className="absolute -bottom-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#0B2545] border border-white/60 shadow-xs text-white pointer-events-none"
                aria-label={state === "thinking" ? "Đang suy nghĩ..." : "Đang trả lời..."}
              >
                <span className="w-1 h-1 rounded-full bg-[#00AEEF] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 rounded-full bg-[#00AEEF] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 rounded-full bg-[#00AEEF] animate-bounce" />
              </span>
            ) : state === "success" ? (
              /* Success check beacon */
              <span
                className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-xs pointer-events-none animate-in zoom-in-50 duration-200"
                aria-label="Thành công"
              >
                ✓
              </span>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
