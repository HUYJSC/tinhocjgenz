"use client";

import { useState } from "react";
import AiChatbotModal from "./AiChatbotModal";
import FloatingAiLauncher from "./FloatingAiLauncher";

export default function FloatingContact() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <>
      {/* AI Learning Pathway Advisor Chatbot Modal */}
      <AiChatbotModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Floating AI Mascot Chat Bubble Launcher */}
      <aside
        aria-label="Kênh hỗ trợ và tư vấn nhanh"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-auto select-none font-sans pb-[env(safe-area-inset-bottom,0px)]"
      >
        <FloatingAiLauncher
          isOpen={isAiModalOpen}
          onOpenChat={() => setIsAiModalOpen(true)}
        />
      </aside>
    </>
  );
}
