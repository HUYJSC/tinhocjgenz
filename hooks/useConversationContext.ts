"use client";

import { useCallback, useSyncExternalStore } from "react";
import { ConversationContext, UserIntent } from "@/types/ai-assistant";
import { usePageContext } from "./usePageContext";

const SESSION_STORAGE_KEY = "tinhocgenz_ai_context_v1";

const INITIAL_CONTEXT: ConversationContext = {
  interestedTopics: [],
  recommendedCourses: [],
  turnCount: 0,
};

// External in-memory store synchronized with sessionStorage & React
let currentConvId = "";
let currentContext = INITIAL_CONTEXT;
let initialized = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function ensureInitialized() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  try {
    let storedId = sessionStorage.getItem("tinhocgenz_ai_conv_id");
    if (!storedId) {
      storedId = `conv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      sessionStorage.setItem("tinhocgenz_ai_conv_id", storedId);
    }
    currentConvId = storedId;

    const storedCtx = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (storedCtx) {
      currentContext = JSON.parse(storedCtx) as ConversationContext;
    }
  } catch {
    // Ignore storage issues
  }
}

function getConvIdSnapshot() {
  ensureInitialized();
  return currentConvId;
}

function getConvIdServerSnapshot() {
  return "";
}

function getContextSnapshot() {
  ensureInitialized();
  return currentContext;
}

function getContextServerSnapshot() {
  return INITIAL_CONTEXT;
}

export function useConversationContext() {
  const pageContext = usePageContext();

  const conversationId = useSyncExternalStore(
    subscribe,
    getConvIdSnapshot,
    getConvIdServerSnapshot
  );

  const context = useSyncExternalStore(
    subscribe,
    getContextSnapshot,
    getContextServerSnapshot
  );

  // 1. Persist context updates
  const updateContext = useCallback((updater: (prev: ConversationContext) => ConversationContext) => {
    ensureInitialized();
    const updated = updater(currentContext);
    currentContext = updated;
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage quotas
      }
    }
    notify();
  }, []);

  // 2. Context mutators
  const recordTurn = useCallback(
    (
      intent?: UserIntent,
      topic?: string,
      level?: ConversationContext["currentLevel"],
      currentCourse?: string
    ) => {
      updateContext((prev) => {
        const topics = prev.interestedTopics ? [...prev.interestedTopics] : [];
        if (topic && !topics.includes(topic)) {
          topics.push(topic);
        }

        return {
          ...prev,
          lastIntent: intent || prev.lastIntent,
          lastTopic: topic || prev.lastTopic,
          currentLevel: level || prev.currentLevel,
          currentCourse: currentCourse || prev.currentCourse,
          interestedTopics: topics,
          turnCount: prev.turnCount + 1,
        };
      });
    },
    [updateContext]
  );

  const resetConversation = useCallback(() => {
    const newConvId = `conv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    currentConvId = newConvId;
    currentContext = INITIAL_CONTEXT;
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("tinhocgenz_ai_conv_id", newConvId);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } catch {
        // Ignore
      }
    }
    notify();
    return newConvId;
  }, []);

  return {
    conversationId,
    context,
    pageContext,
    recordTurn,
    updateContext,
    resetConversation,
  };
}
