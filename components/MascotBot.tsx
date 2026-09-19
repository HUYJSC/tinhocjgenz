"use client";

import React from "react";
import AiMascot, { MascotState } from "./ai-assistant/AiMascot";

export type { MascotState };

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
  size = 48,
  interactive = false,
  onClick,
  className = "",
  priority = false,
}: MascotBotProps) {
  return (
    <AiMascot
      state={state}
      size={size}
      interactive={interactive}
      onClick={onClick}
      className={className}
      priority={priority}
      showStateIndicator={state === "thinking"}
    />
  );
}
