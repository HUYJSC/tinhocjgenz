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
  size = 120,
  interactive = false,
  onClick,
  className = "",
  priority = false,
}: MascotBotProps) {
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
      className={`${styles.mascotContainer} ${
        interactive ? styles.interactive : ""
      } ${className}`}
      style={{ width: size, background: "transparent" }}
    >
      <div
        className={styles.mascotImageWrapper}
        style={{ width: size, height: size, background: "transparent" }}
      >
        <Image
          src="/mascot-ai.png"
          alt="Mascot AI Tin Học Gen Z - PH Digital Education"
          width={size}
          height={size}
          priority={priority}
          unoptimized
          className={styles.mascotImage}
        />
      </div>
    </div>
  );
}
