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
  // Determine state-based animation / transform classes according to Sections 16 & 17
  let stateClass = "";
  if (animated) {
    switch (state) {
      case "idle":
        stateClass = "animate-mascot-idle";
        break;
      case "hover":
        stateClass = "scale-[1.03] -translate-y-[2px] transition-transform duration-[170ms]";
        break;
      case "active":
        stateClass = "scale-[0.96] transition-transform duration-[180ms]";
        break;
      case "thinking":
      case "typing":
      case "speaking":
        stateClass = "animate-mascot-thinking";
        break;
      case "success":
        stateClass = "scale-[1.02] transition-transform duration-200";
        break;
      case "error":
        stateClass = "animate-mascot-error";
        break;
      case "sleeping":
        stateClass = "opacity-80 scale-[0.98]";
        break;
      case "greeting":
        stateClass = "scale-[1.02] -translate-y-0.5";
        break;
      case "opened":
        stateClass = "scale-[1.01]";
        break;
      default:
        stateClass = "animate-mascot-idle";
    }
  }

  const content = (
    <div
      className={`w-full h-full relative flex items-center justify-center transition-all duration-180 will-change-transform ${stateClass}`}
    >
      {/* Single Master Transparent Mascot Asset */}
      <Image
        src="/brand/chatbot/chatbot-ai-mascot.png"
        alt={alt}
        width={size}
        height={size}
        priority={priority}
        unoptimized
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_8px_18px_rgba(0,87,184,0.18)]"
      />

      {/* Online indicator dot if requested */}
      {showStateIndicator && (
        <span
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-2xs pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={alt}
        className={`relative inline-flex items-center justify-center select-none bg-transparent border-none p-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0057B8] focus-visible:ring-offset-2 rounded-full ${className}`}
        style={{ width: size, height: size }}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none bg-transparent ${
        interactive ? "cursor-pointer group" : ""
      } ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {content}
    </div>
  );
}
