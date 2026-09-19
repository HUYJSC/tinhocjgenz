"use client";

import React from "react";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import AiLauncher from "./AiLauncher";
import AiChatWindow from "./AiChatWindow";
import AiProactiveBubble from "./AiProactiveBubble";

export default function AiAssistant() {
  const {
    isOpen,
    toggleChat,
    handleOpenChat,
    handleCloseChat,
    messages,
    loading,
    inputVal,
    setInputVal,
    placeholder,
    mascotState,
    proactiveBubbleVisible,
    proactiveBubbleText,
    handleDismissBubble,
    handleSendMessage,
    handleReset,
    handleHoverStart,
    handleHoverEnd,
  } = useAiAssistant();

  return (
    <>
      {/* 1. Proactive Speech Bubble (appears 7-10s after visit when closed, auto hides, left of mascot) */}
      {!isOpen && (
        <AiProactiveBubble
          text={proactiveBubbleText}
          visible={proactiveBubbleVisible}
          onOpen={handleOpenChat}
          onDismiss={handleDismissBubble}
        />
      )}

      {/* 2. Anchored Floating Chat Window (Desktop: left of mascot, Mobile: above mascot) */}
      <AiChatWindow
        isOpen={isOpen}
        onClose={handleCloseChat}
        messages={messages}
        loading={loading}
        botState={mascotState}
        inputVal={inputVal}
        setInputVal={setInputVal}
        onSend={handleSendMessage}
        onReset={handleReset}
        placeholder={placeholder}
      />

      {/* 3. Floating Mascot Launcher - Visual Anchor (Always present in bottom-right corner) */}
      <aside
        aria-label="Kênh hỗ trợ và tư vấn AI Tin Học Gen Z"
        className="fixed z-40 flex items-center justify-center pointer-events-auto select-none
          /* Mobile position */
          right-3.5 bottom-[calc(14px+env(safe-area-inset-bottom,0px))]
          /* Tablet position */
          sm:right-5 sm:bottom-5
          /* Desktop position */
          lg:right-6 lg:bottom-6"
      >
        <AiLauncher
          isOpen={isOpen}
          onToggle={toggleChat}
          mascotState={mascotState}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        />
      </aside>
    </>
  );
}
