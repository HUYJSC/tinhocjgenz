"use client";

import { useState, useEffect } from "react";
import { Phone, Brain, X, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";
import AiPathwayAdvisor from "./AiPathwayAdvisor";

export default function FloatingContact() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <>
      {/* AI Advisor Modal */}
      <AiPathwayAdvisor
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <aside 
        aria-label="Kênh hỗ trợ và tư vấn nhanh" 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex flex-col items-end gap-2.5 pointer-events-auto select-none font-sans pb-[env(safe-area-inset-bottom,0px)]"
      >
        {/* EXPANDED ACTION BUTTONS */}
        {isExpanded && (
          <div 
            role="menu"
            aria-orientation="vertical"
            className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            {/* 1. AI Pathway Advisor Trigger */}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsAiModalOpen(true);
                setIsExpanded(false);
              }}
              className="min-h-12 flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white pl-2.5 pr-4 py-2 rounded-full shadow-sm transition-colors duration-150 cursor-pointer border border-white/20 focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Mở trợ lý AI tư vấn lộ trình học tin học"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-blue-300 font-bold text-xs shrink-0">
                <Brain size={16} className="text-blue-300" aria-hidden="true" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-xs uppercase tracking-wider text-blue-200 font-bold block">AI Khảo Thí</span>
                <span className="text-xs font-bold text-white">Tư Vấn Lộ Trình</span>
              </div>
            </button>

            {/* 2. Zalo Chat Trigger */}
            {CONTACT_INFO.zaloUrl && (
              <a
                href={CONTACT_INFO.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                className="min-h-12 flex items-center gap-2.5 bg-[#0068ff] hover:bg-[#0052cc] text-white pl-2.5 pr-4 py-2 rounded-full shadow-sm transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Chat trực tuyến qua Zalo với giảng viên 24/7 (mở tab mới)"
              >
                <div className="w-8 h-8 rounded-full bg-white text-[#0068ff] flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                  Z
                </div>
                <div className="text-left leading-tight">
                  <span className="text-xs uppercase tracking-wider text-blue-100 font-bold block">Tư Vấn Zalo</span>
                  <span className="text-xs font-bold text-white">Chat 24/7 Trực Tuyến</span>
                </div>
              </a>
            )}

            {/* 3. Phone Hotline Trigger */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              role="menuitem"
              className="min-h-12 flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white pl-2.5 pr-4 py-2 rounded-full shadow-sm transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              aria-label={`Gọi hotline tư vấn tuyển sinh: ${CONTACT_INFO.displayPhone}`}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                <Phone size={14} aria-hidden="true" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-xs uppercase tracking-wider text-blue-100 font-bold block">Hotline Tuyển Sinh</span>
                <span className="text-xs font-bold tracking-wide text-white">{CONTACT_INFO.displayPhone}</span>
              </div>
            </a>
          </div>
        )}

        {/* FLOATING TOGGLE BUTTON */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`min-h-12 min-w-12 h-12 px-4 rounded-full flex items-center justify-center gap-2 shadow-sm transition-colors duration-150 cursor-pointer border focus-visible:outline-2 focus-visible:outline-blue-400 ${
            isExpanded 
              ? "bg-slate-900 text-white border-slate-700 hover:bg-slate-800" 
              : "bg-blue-600 hover:bg-blue-700 text-white border-blue-400/30"
          }`}
          aria-expanded={isExpanded}
          aria-haspopup="true"
          title={isExpanded ? "Đóng menu hỗ trợ" : "Tư vấn & Lịch thi 24/7"}
          aria-label={isExpanded ? "Đóng menu hỗ trợ" : "Mở menu tư vấn và lịch thi 24/7"}
        >
          {isExpanded ? (
            <>
              <X size={16} aria-hidden="true" />
              <span className="text-xs font-bold hidden sm:inline">Đóng</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400" />
              </span>
              <MessageCircle size={16} className="text-blue-200" aria-hidden="true" />
              <span className="text-xs font-bold tracking-wide hidden sm:inline">Tư Vấn 24/7</span>
            </>
          )}
        </button>

      </aside>
    </>
  );
}
