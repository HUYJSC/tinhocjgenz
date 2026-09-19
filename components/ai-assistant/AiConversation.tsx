"use client";

import React, { useRef, useEffect } from "react";
import { ChatMessage, CourseRecommendation } from "@/types/ai-assistant";
import AiMessage from "./AiMessage";
import AiTypingIndicator from "./AiTypingIndicator";

interface AiConversationProps {
  messages: ChatMessage[];
  loading: boolean;
  onQuickAction: (value: string, label: string) => void;
  onSelectCourse?: (course: CourseRecommendation) => void;
}

export default function AiConversation({
  messages,
  loading,
  onQuickAction,
  onSelectCourse,
}: AiConversationProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when messages or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div
      role="log"
      aria-live="polite"
      className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-[#F7FAFE] scroll-smooth"
    >
      {messages.map((msg, idx) => (
        <AiMessage
          key={msg.id || idx}
          message={msg}
          onQuickAction={onQuickAction}
          onSelectCourse={onSelectCourse}
          isLast={idx === messages.length - 1}
        />
      ))}

      {/* Thinking / Typing state */}
      {loading && (
        <div className="pt-1">
          <AiTypingIndicator state="thinking" />
        </div>
      )}

      <div ref={bottomRef} className="h-px shrink-0" />
    </div>
  );
}
