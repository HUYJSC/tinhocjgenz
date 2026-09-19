"use client";

import React from "react";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import AiLauncher from "./AiLauncher";
import AiChatWindow from "./AiChatWindow";

export default function AiAssistant() {
  const {
    isOpen,
    setIsOpen,
    toggleChat,
    messages,
    loading,
    inputVal,
    setInputVal,
    mascotState,
    placeholder,
    greetingBubbleText,
    showGreetingBubble,
    setShowGreetingBubble,
    handleSendMessage,
    handleReset,
    handleHoverStart,
    handleHoverEnd,
  } = useAiAssistant();

  return (
    <>
      {/* Floating AI Assistant Chat Window Panel */}
      <AiChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        loading={loading}
        botState={mascotState}
        inputVal={inputVal}
        setInputVal={setInputVal}
        onSend={handleSendMessage}
        onReset={handleReset}
        placeholder={placeholder}
      />

      {/* Floating Mascot Launcher (Positioned at bottom-right, respecting safe areas) */}
      <aside
        aria-label="Trợ lý học tập AI Tin Học Gen Z"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-auto select-none font-sans pb-[env(safe-area-inset-bottom,0px)]"
      >
        <AiLauncher
          isOpen={isOpen}
          onToggle={toggleChat}
          mascotState={mascotState}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          greetingBubbleText={greetingBubbleText}
          showGreetingBubble={showGreetingBubble}
          onDismissGreetingBubble={() => setShowGreetingBubble(false)}
        />
      </aside>
    </>
  );
}

