"use client";

import { useState, useRef, useCallback, useSyncExternalStore } from "react";
import { MascotState } from "@/types/ai-assistant";

interface UseMascotAnimationOptions {
  initialState?: MascotState;
  isChatOpen?: boolean;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function useMascotAnimation({
  initialState = "idle",
  isChatOpen = false,
}: UseMascotAnimationOptions = {}) {
  const [mascotState, setMascotState] = useState<MascotState>(initialState);
  const [isClicking, setIsClicking] = useState(false);
  const [prevChatOpen, setPrevChatOpen] = useState(isChatOpen);
  const stateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Synchronize state when isChatOpen prop changes (pure render-time state adjustment)
  if (prevChatOpen !== isChatOpen) {
    setPrevChatOpen(isChatOpen);
    if (isChatOpen) {
      if (mascotState !== "thinking" && mascotState !== "typing") {
        setMascotState("opened");
      }
    } else {
      if (mascotState === "opened") {
        setMascotState("idle");
      }
    }
  }

  // Click burst animation: scale(1) -> scale(.94) -> scale(1.03) -> scale(1) (240ms)
  const triggerClick = useCallback((onComplete?: () => void) => {
    if (reducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    setIsClicking(true);
    setTimeout(() => {
      setIsClicking(false);
      if (onComplete) onComplete();
    }, 240);
  }, [reducedMotion]);

  // Temporary state transition helper (e.g. success, error)
  const transitionTemporarily = useCallback((tempState: MascotState, durationMs = 2400) => {
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
    setMascotState(tempState);
    stateTimeoutRef.current = setTimeout(() => {
      setMascotState(isChatOpen ? "opened" : "idle");
    }, durationMs);
  }, [isChatOpen]);

  // Hover handlers
  const handleHoverStart = useCallback(() => {
    if (mascotState === "idle") {
      setMascotState("hover");
    }
  }, [mascotState]);

  const handleHoverEnd = useCallback(() => {
    if (mascotState === "hover") {
      setMascotState("idle");
    }
  }, [mascotState]);

  return {
    mascotState,
    setMascotState,
    isClicking,
    reducedMotion,
    triggerClick,
    transitionTemporarily,
    handleHoverStart,
    handleHoverEnd,
  };
}
