"use client";

import React from "react";
import Image from "next/image";

export type MascotSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

export type MascotState =
  | "idle"
  | "online"
  | "thinking"
  | "listening"
  | "speaking"
  | "greeting"
  | "success"
  | "error"
  | "attention"
  | "near"
  | "hover";

export interface AiMascotProps {
  size?: MascotSize;
  state?: MascotState;
  showStateIndicator?: boolean;
  interactive?: boolean;
  animated?: boolean;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
  alt?: string;
  tooltipText?: string;
}

const SIZE_MAP: Record<string, number> = {
  xs: 28,
  sm: 34,
  md: 48,
  lg: 68,
  xl: 80,
};

export default function AiMascot({
  size = "md",
  state = "idle",
  showStateIndicator = false,
  interactive = false,
  animated = true,
  priority = false,
  className = "",
  onClick,
  alt = "Trợ lý học tập AI Tin Học Gen Z",
}: AiMascotProps) {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size] || 48;

  const isThinking = state === "thinking";
  const isOnline = state === "online" || state === "greeting" || state === "idle";

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
      className={`relative inline-flex items-center justify-center select-none ${
        interactive ? "cursor-pointer group" : ""
      } ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
      }}
    >
      {/* Floating animation container */}
      <div
        className={`w-full h-full relative flex items-center justify-center transition-transform duration-200 will-change-transform ${
          animated ? "animate-mascot-idle" : ""
        } ${interactive ? "group-hover:scale-105 group-active:scale-95" : ""}`}
      >
        {/* Master Asset Image */}
        <Image
          src="/brand/chatbot/chatbot-ai-master.png"
          alt={alt}
          width={pixelSize}
          height={pixelSize}
          priority={priority}
          unoptimized
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_14px_rgba(0,87,184,0.16)]"
          style={{ background: "transparent" }}
        />

        {/* Status Indicator Overlays */}
        {showStateIndicator && (
          <>
            {isThinking ? (
              /* Thinking animated dots badge */
              <span
                className="absolute -bottom-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#0B2545] border border-white/60 shadow-xs text-white"
                aria-label="Đang suy nghĩ"
              >
                <span className="w-1 h-1 rounded-full bg-[#00AEEF] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 rounded-full bg-[#00AEEF] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 rounded-full bg-[#00AEEF] animate-bounce" />
              </span>
            ) : isOnline ? (
              /* Online green beacon dot */
              <span
                className="absolute top-0 right-0 flex h-2.5 w-2.5"
                aria-label="Đang hoạt động"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-1.5 ring-white" />
              </span>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

