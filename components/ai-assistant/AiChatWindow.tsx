"use client";

import React, { useRef, useEffect } from "react";
import { ChatMessage, MascotState, CourseRecommendation } from "@/types/ai-assistant";
import AiChatHeader from "./AiChatHeader";
import AiConversation from "./AiConversation";
import AiComposer from "./AiComposer";

interface AiChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  loading: boolean;
  botState: MascotState;
  inputVal: string;
  setInputVal: (val: string) => void;
  onSend: (text?: string) => void;
  onReset: () => void;
  onSelectCourse?: (course: CourseRecommendation) => void;
  placeholder: string;
}

export default function AiChatWindow({
  isOpen,
  onClose,
  messages,
  loading,
  botState,
  inputVal,
  setInputVal,
  onSend,
  onReset,
  onSelectCourse,
  placeholder,
}: AiChatWindowProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-label="Trợ lý học tập AI Tin Học Gen Z"
      className="fixed z-50 bg-white rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(11,37,69,0.16)] border border-[#DDE8F5] flex flex-col select-none
        /* Mobile: sits right ABOVE mascot */
        left-2.5 right-2.5 bottom-[86px] w-auto h-[min(540px,calc(100dvh-100px))]
        /* Tablet: right-24 bottom-5 w-[360px] */
        sm:left-auto sm:right-[100px] sm:bottom-5 sm:w-[360px] sm:h-[530px]
        /* Desktop: right-[114px] bottom-6 w-[380px] h-[540px] max-h-[calc(100vh-48px)] */
        lg:right-[114px] lg:bottom-6 lg:w-[380px] lg:h-[540px] lg:max-h-[calc(100vh-48px)]
        animate-in fade-in zoom-in-[0.97] slide-in-from-right-3 duration-200 ease-out origin-bottom-right"
    >
      {/* 1. Header (62px, gradient #0057B8 -> #087CF0) */}
      <AiChatHeader
        botState={botState}
        onReset={onReset}
        onClose={onClose}
        onMinimize={onClose}
      />

      {/* 2. Scrollable Conversation Area */}
      <AiConversation
        messages={messages}
        loading={loading}
        onQuickAction={(val) => onSend(val)}
        onSelectCourse={onSelectCourse}
      />

      {/* 3. Bottom Composer */}
      <AiComposer
        value={inputVal}
        onChange={setInputVal}
        onSend={(txt) => onSend(txt)}
        disabled={loading}
        placeholder={placeholder}
      />
    </div>
  );
}
