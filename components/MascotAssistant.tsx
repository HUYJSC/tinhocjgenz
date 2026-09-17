"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import Image from "next/image";

export type MascotState =
  | "idle"
  | "near"
  | "hover"
  | "greeting"
  | "listening"
  | "thinking"
  | "speaking"
  | "success"
  | "error"
  | "attention";

export interface MascotAssistantProps {
  state?: MascotState;
  size?: number; // Size in px (width & height of mascot, default 80)
  enableProximity?: boolean; // Enable cursor distance detection (<140px)
  interactive?: boolean; // Enable hover / click styles
  onClick?: () => void;
  className?: string;
  tooltipText?: string;
  showShadow?: boolean;
  priority?: boolean;
}

export default function MascotAssistant({
  state: externalState,
  size = 80,
  enableProximity = false,
  interactive = false,
  onClick,
  className = "",
  tooltipText,
  priority = false,
}: MascotAssistantProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [internalState, setInternalState] = useState<MascotState>("idle");
  const [tiltAngle, setTiltAngle] = useState(0);
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [attentionCue, setAttentionCue] = useState(false);
  const uniqueId = useId();

  // Effective state: external state takes priority, otherwise internal (idle/near/hover/attention)
  const currentState: MascotState =
    externalState ||
    (isClicking
      ? "hover"
      : isHovered
      ? "hover"
      : attentionCue
      ? "attention"
      : internalState);

  // 1. Natural random eye blink (every 4-7 seconds, lasts 160ms)
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    let cycleTimeout: NodeJS.Timeout;

    const scheduleNextBlink = () => {
      const delay = Math.random() * 3000 + 4000; // 4000 - 7000ms
      cycleTimeout = setTimeout(() => {
        setIsBlinking(true);
        blinkTimeout = setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 160);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(cycleTimeout);
    };
  }, []);

  // 2. Attention cue timer: if user is idle for ~24s without interaction
  useEffect(() => {
    if (!enableProximity) return;

    let hideTimer: NodeJS.Timeout;

    const triggerAttention = () => {
      setAttentionCue(true);
      hideTimer = setTimeout(() => {
        setAttentionCue(false);
      }, 4500);
    };

    const attentionTimer = setTimeout(triggerAttention, 24000);

    return () => {
      clearTimeout(attentionTimer);
      clearTimeout(hideTimer);
    };
  }, [enableProximity]);

  // 3. Proximity sensor: detect mouse position within 100-140px on desktop
  useEffect(() => {
    if (!enableProximity || typeof window === "undefined") return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      rafId = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.hypot(dx, dy);

        // Proximity threshold ~140px
        if (distance < 140 && distance > 10) {
          // Subtly tilt towards cursor clamped to ±5 deg
          const tilt = Math.max(-5, Math.min(5, (dx / 140) * 5));
          setTiltAngle(tilt);

          // Eye pupil tracking offset (1-2px)
          const normX = Math.max(-2, Math.min(2, (dx / distance) * 2));
          const normY = Math.max(-1.5, Math.min(1.5, (dy / distance) * 1.5));
          setCursorOffset({ x: normX, y: normY });

          if (!externalState && !isHovered) {
            setInternalState("near");
          }
        } else {
          setTiltAngle(0);
          setCursorOffset({ x: 0, y: 0 });
          if (!externalState && !isHovered) {
            setInternalState("idle");
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [enableProximity, externalState, isHovered]);

  // Handle click with elastic squish bounce
  const handleClick = () => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 380);
    onClick?.();
  };

  // Expression classes & transform computations
  const isHappy =
    currentState === "hover" ||
    currentState === "greeting" ||
    currentState === "success";
  const isListening = currentState === "listening";
  const isThinking = currentState === "thinking";
  const isSpeaking = currentState === "speaking";
  const isNear = currentState === "near";

  // Dynamic CSS variables for high-performance GPU transforms
  const dynamicTransform = isClicking
    ? "scale(0.92) translateY(2px)"
    : isHappy
    ? "scale(1.04) translateY(-3px)"
    : isNear
    ? `rotate(${tiltAngle}deg) translateY(-2px)`
    : undefined;

  return (
    <div
      ref={containerRef}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTiltAngle(0);
      }}
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label="Trợ lý học tập AI - Tin Học Gen Z"
      className={`relative inline-flex items-center justify-center select-none ${
        interactive ? "cursor-pointer" : ""
      } ${className}`}
      style={{
        width: size,
        height: size,
        background: "transparent",
      }}
    >
      {/* 1. Floating Animation Wrapper */}
      <div
        className={`w-full h-full relative transition-transform duration-300 ease-out will-change-transform ${
          !isClicking ? "animate-mascot-idle" : ""
        }`}
        style={{
          transform: dynamicTransform,
          background: "transparent",
        }}
      >
        {/* 2. Base High-Res Transparent Robot Image */}
        <Image
          src="/mascot-ai.png"
          alt="Trợ lý AI Mascot Tin Học Gen Z"
          width={size}
          height={size}
          priority={priority}
          unoptimized
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_6px_16px_rgba(0,87,184,0.18)]"
          style={{ background: "transparent" }}
        />

        {/* 3. Dynamic Emotional Vector Overlay (Visor, Eyes, Mic, Antenna, Thruster) */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          aria-hidden="true"
        >
          <defs>
            {/* Cyan Eye & Shimmer Glow Filter */}
            <filter id={`glow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Antenna Orange Pulse Glow Filter */}
            <filter id={`orange-glow-${uniqueId}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Visor Linear Dark Shimmer */}
            <linearGradient id={`visor-scan-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* A. ORANGE ANTENNA AURA (Top-Right: ~77.8%, 15.0%) */}
          <circle
            cx="77.8"
            cy="15.0"
            r={isHappy || isThinking ? "9" : "7.5"}
            fill="#FF7A00"
            opacity={isHappy || isThinking ? 0.45 : 0.22}
            filter={`url(#orange-glow-${uniqueId})`}
            className={
              isThinking
                ? "animate-ping [animation-duration:1.4s]"
                : isHappy
                ? "animate-pulse"
                : ""
            }
          />

          {/* B. MICROPHONE GLOW & SOUND WAVES (Tip: ~61.5%, 44.5%) */}
          {(isListening || isSpeaking) && (
            <g className="animate-pulse">
              <circle
                cx="61.5"
                cy="44.5"
                r="4.5"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="1.2"
                opacity="0.8"
              >
                <animate
                  attributeName="r"
                  values="4.5;7.5;4.5"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;0;0.8"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx="61.5"
                cy="44.5"
                r="3"
                fill="#00E5FF"
                opacity="0.6"
                filter={`url(#glow-${uniqueId})`}
              />
            </g>
          )}

          {/* C. VISOR SCANLINE SHIMMER (When Thinking) */}
          {isThinking && (
            <g clipPath="url(#visor-clip)">
              <rect
                x="30"
                y="24"
                width="40"
                height="22"
                rx="8"
                fill={`url(#visor-scan-${uniqueId})`}
                opacity="0.5"
                className="animate-scanline"
              />
            </g>
          )}

          {/* D. DYNAMIC BLINKING & EYE EXPRESSIONS */}
          {/* If Blinking: Draw eyelid cover + digital slit */}
          {isBlinking && (
            <g filter={`url(#glow-${uniqueId})`}>
              {/* Left Eye Blink Line */}
              <path
                d="M 36 33.5 Q 40.5 35 45 33.5"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              {/* Right Eye Blink Line */}
              <path
                d="M 57 34.5 Q 61.5 36 66 34.5"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* E. EYES WHEN THINKING (Looking upward + subtle concentration) */}
          {!isBlinking && isThinking && (
            <g filter={`url(#glow-${uniqueId})`}>
              {/* Left pupil looking up */}
              <ellipse
                cx="40.5"
                cy="30.5"
                rx="4.2"
                ry="3.8"
                fill="#00E5FF"
              />
              {/* Right pupil looking up */}
              <ellipse
                cx="61.0"
                cy="31.5"
                rx="4.2"
                ry="3.8"
                fill="#00E5FF"
              />
              {/* Thinking dots above head */}
              <circle cx="46" cy="18" r="1.2" fill="#00E5FF" opacity="0.8" />
              <circle cx="50" cy="16" r="1.5" fill="#00E5FF" opacity="0.9" />
              <circle cx="54" cy="18" r="1.2" fill="#00E5FF" opacity="0.8" />
            </g>
          )}

          {/* F. EYES WHEN NEAR (Follow cursor slightly) */}
          {!isBlinking && isNear && (
            <g
              filter={`url(#glow-${uniqueId})`}
              style={{
                transform: `translate(${cursorOffset.x}px, ${cursorOffset.y}px)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              <ellipse
                cx="40.5"
                cy="33.2"
                rx="4.8"
                ry="4.2"
                fill="#00E5FF"
                opacity="0.3"
              />
              <ellipse
                cx="61.0"
                cy="34.2"
                rx="4.8"
                ry="4.2"
                fill="#00E5FF"
                opacity="0.3"
              />
            </g>
          )}

          {/* G. SPEAKING MOUTH PULSE (Voice modulation) */}
          {isSpeaking && (
            <g filter={`url(#glow-${uniqueId})`}>
              <ellipse
                cx="49.8"
                cy="39.2"
                rx="3.5"
                ry="2.6"
                fill="#00E5FF"
                opacity="0.75"
              >
                <animate
                  attributeName="ry"
                  values="1.8;3.4;2.0;3.6;1.8"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </ellipse>
            </g>
          )}

          {/* H. CELEBRATION SPARKLES (When Success) */}
          {currentState === "success" && (
            <g filter={`url(#glow-${uniqueId})`}>
              <path
                d="M 28 20 L 30 24 L 34 26 L 30 28 L 28 32 L 26 28 L 22 26 L 26 24 Z"
                fill="#FFD700"
                opacity="0.85"
                className="animate-spin [animation-duration:3s]"
              />
              <path
                d="M 72 22 L 73.5 25 L 76.5 26.5 L 73.5 28 L 72 31 L 70.5 28 L 67.5 26.5 L 70.5 25 Z"
                fill="#00E5FF"
                opacity="0.85"
                className="animate-spin [animation-duration:2.5s]"
              />
            </g>
          )}

          {/* I. THRUSTER GLOW PULSE AT BOTTOM (Center ~50%, 86%) */}
          <ellipse
            cx="50"
            cy="86"
            rx="12"
            ry="4.5"
            fill="#00E5FF"
            opacity="0.3"
            filter={`url(#glow-${uniqueId})`}
          >
            <animate
              attributeName="opacity"
              values="0.25;0.5;0.25"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>
      </div>

      {/* 4. Mini Floating Tooltip (Hover & Attention states) */}
      {(isHovered || attentionCue) && (
        <div
          role="tooltip"
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-[#0B2545]/95 text-white text-[11px] font-semibold tracking-wide shadow-lg border border-blue-400/30 animate-in fade-in zoom-in-95 duration-200 pointer-events-none z-50 flex items-center gap-1.5"
        >
          <span>{tooltipText || (attentionCue ? "Cần tìm lộ trình học? 💡" : "Xin chào 👋")}</span>
          {/* Tooltip triangle tail */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0B2545]/95" />
        </div>
      )}
    </div>
  );
}
