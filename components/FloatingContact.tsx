"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import AiChatbotModal from "./AiChatbotModal";
import SupportCenterWidget from "./SupportCenterWidget";
import MascotBot from "./MascotBot";

export default function FloatingContact() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <>
      {/* AI Learning Pathway Advisor Chatbot Modal */}
      <AiChatbotModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <aside
        ref={containerRef}
        aria-label="Kênh hỗ trợ và tư vấn nhanh"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none font-sans pb-[env(safe-area-inset-bottom,0px)]"
      >
        {/* HERO MINI CONSULTATION PANEL (AI MASCOT CENTRIC) */}
        {isExpanded && (
          <SupportCenterWidget
            onClose={() => setIsExpanded(false)}
            onStartAiChat={() => {
              setIsExpanded(false);
              setIsAiModalOpen(true);
            }}
          />
        )}

        {/* FLOATING TRIGGER BUTTON */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`min-h-12 h-12 px-4 rounded-full flex items-center justify-center gap-2.5 shadow-md transition-all duration-200 cursor-pointer border focus-visible:outline-2 focus-visible:outline-[#0057B8] ${
            isExpanded
              ? "bg-[#0B2545] text-white border-slate-700 hover:bg-[#081b33]"
              : "bg-[#0057B8] hover:bg-[#003F88] text-white border-blue-400/30 hover:shadow-lg"
          }`}
          aria-expanded={isExpanded}
          aria-haspopup="dialog"
          title={isExpanded ? "Đóng bảng tư vấn" : "Tư vấn đào tạo & AI"}
          aria-label={isExpanded ? "Đóng bảng tư vấn" : "Mở trung tâm tư vấn đào tạo và trợ lý AI"}
        >
          {isExpanded ? (
            <>
              <X size={18} aria-hidden="true" />
              <span className="text-xs font-bold">Đóng</span>
            </>
          ) : (
            <>
              {/* Mini Mascot Icon inside the pill button */}
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <MascotBot state="idle" size={24} showShadow={false} />
              </div>
              <span className="text-xs font-bold tracking-wide">Tư vấn đào tạo</span>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 ring-2 ring-white/40" />
              </span>
            </>
          )}
        </button>
      </aside>
    </>
  );
}
