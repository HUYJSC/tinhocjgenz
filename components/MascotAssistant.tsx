"use client";

import React from "react";
import AiMascot, { MascotState } from "./ai-assistant/AiMascot";

export type { MascotState };

export interface MascotAssistantProps {
  state?: MascotState;
  size?: number;
  enableProximity?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  tooltipText?: string;
  showShadow?: boolean;
  priority?: boolean;
}

export default function MascotAssistant({
  state = "idle",
  size = 80,
  interactive = false,
  onClick,
  className = "",
  priority = false,
}: MascotAssistantProps) {
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
