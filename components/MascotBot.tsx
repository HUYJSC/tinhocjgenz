"use client";

import React from "react";
import Image from "next/image";
import styles from "./MascotBot.module.css";

export type MascotState = "idle" | "greeting" | "listening" | "thinking" | "speaking";

export interface MascotBotProps {
  state?: MascotState;
  size?: number;
  interactive?: boolean;
  showShadow?: boolean;
  onClick?: () => void;
  className?: string;
  priority?: boolean;
}

export default function MascotBot({
  state = "idle",
  size = 56,
  interactive = false,
  showShadow = true,
  onClick,
  className = "",
  priority = false,
}: MascotBotProps) {
  // Map emotional state to corresponding CSS module class
  const stateClassMap: Record<MascotState, string> = {
    idle: styles.stateIdle,
    greeting: styles.stateGreeting,
    listening: styles.stateListening,
    thinking: styles.stateThinking,
    speaking: styles.stateSpeaking,
  };

  const activeStateClass = stateClassMap[state] || styles.stateIdle;

  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label="Trợ lý AI Mascot Tin Học Gen Z"
      className={`${styles.mascotContainer} ${activeStateClass} ${
        interactive ? styles.interactive : ""
      } ${className}`}
      style={{ width: size }}
    >
      {/* Bobbing & Tilting Body Wrapper */}
      <div
        className={styles.bobbingWrapper}
        style={{ width: size, height: size }}
      >
        {/* Base Mascot Image */}
        <div className="relative w-full h-full">
          <Image
            src="/ai-bot-avatar.png"
            alt="Mascot Tin Học Gen Z - PH Digital Education"
            width={size * 2}
            height={size * 2}
            priority={priority}
            className="w-full h-full object-contain pointer-events-none drop-shadow-sm select-none"
          />

          {/* Layer 1: Antenna Orange Glow Dot */}
          <span className={styles.antennaDot} aria-hidden="true" />

          {/* Layer 2: Microphone Glowing Tip */}
          <span className={styles.micTip} aria-hidden="true" />

          {/* Layer 3: Visor Expressions & Scan Overlays */}
          <div className={styles.visorArea} aria-hidden="true">
            {/* Natural Blinking Overlay */}
            <span className={styles.blinkOverlay} />

            {/* Thinking Visor Scan Light */}
            <span className={styles.visorScanner} />

            {/* 3-Dots Processing Indicator */}
            <div className={styles.typingDotsOverlay}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>

          {/* Layer 4: Waving arm motion ticks for Greeting */}
          <div className={styles.wavingTicks} aria-hidden="true">
            <span className={styles.tick} />
            <span className={styles.tick} />
          </div>
        </div>
      </div>

      {/* Synchronized Ground Shadow */}
      {showShadow && (
        <div
          className={styles.groundShadow}
          style={{ width: size * 0.72 }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

