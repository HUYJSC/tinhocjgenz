"use client";

import React, { useState } from "react";
import MascotAssistant from "./MascotAssistant";

interface FloatingAiLauncherProps {
  onOpenChat: () => void;
}

export default function FloatingAiLauncher({ onOpenChat }: FloatingAiLauncherProps) {
  const [isElastic, setIsElastic] = useState(false);

  const handleClick = () => {
    setIsElastic(true);
    setTimeout(() => {
      setIsElastic(false);
      onOpenChat();
    }, 280);
  };

  return (
    <div
      className="relative flex items-center justify-center pointer-events-auto select-none"
      style={{ width: 68, height: 68 }}
    >
      {/* Circular Breakout Launcher Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="Mở Trợ lý học tập AI - Tin Học Gen Z"
        title="Trợ lý học tập AI"
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 backdrop-blur-md border border-[#0057B8]/20 shadow-[0_8px_26px_rgba(0,87,184,0.18)] hover:shadow-[0_12px_32px_rgba(0,87,184,0.28)] hover:border-[#0057B8]/40 active:scale-95 transition-all duration-300 flex items-center justify-center relative overflow-visible cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0057B8] ${
          isElastic ? "animate-elastic-pop" : ""
        }`}
      >
        {/* Soft inner ambient glow */}
        <span
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0057B8]/10 via-transparent to-cyan-400/15 pointer-events-none"
          aria-hidden="true"
        />

        {/* Small Active Green Indicator Dot */}
        <span
          className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3 z-30"
          aria-hidden="true"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500 ring-2 ring-white" />
        </span>

        {/* Breakout Mascot (Protrudes 25-30% out of circular launcher) */}
        <div
          className="absolute -top-3 sm:-top-3.5 w-18 h-18 sm:w-20 sm:h-20 pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          <MascotAssistant
            size={76}
            enableProximity={true}
            interactive={false}
            priority={true}
          />
        </div>
      </button>
    </div>
  );
}

