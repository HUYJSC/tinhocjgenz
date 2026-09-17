"use client";

import React from "react";
import MascotAssistant, { MascotState } from "./MascotAssistant";

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
  size = 120,
  interactive = false,
  showShadow = true,
  onClick,
  className = "",
  priority = false,
}: MascotBotProps) {
  return (
    <MascotAssistant
      state={state}
      size={size}
      interactive={interactive}
      showShadow={showShadow}
      onClick={onClick}
      className={className}
      priority={priority}
    />
  );
}
