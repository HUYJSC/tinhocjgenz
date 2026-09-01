"use client";

import { useState } from "react";
import { Phone, Brain, MessageSquare, X, ChevronUp, Sparkles, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";
import AiPathwayAdvisor from "./AiPathwayAdvisor";

export default function FloatingContact() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      {/* AI Advisor Modal */}
      <AiPathwayAdvisor
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <aside aria-label="Kênh hỗ trợ nhanh" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto select-none">
        
        {/* EXPANDED ACTION BUTTONS */}
        {isExpanded && (
          <div className="flex flex-col items-end gap-2 animate-slide-up">
            
            {/* 1. AI Pathway Advisor Trigger */}
            <button
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white pl-2.5 pr-3.5 py-2 rounded-full shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 group cursor-pointer border border-white/20"
              aria-label="AI Tư Vấn Lộ Trình"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-cyan-300 font-black text-xs shrink-0 group-hover:rotate-12 transition-transform">
                <Brain size={15} className="text-cyan-300 animate-pulse" />
              </div>
              <div className="text-left leading-none">
                <span className="text-[9px] uppercase tracking-wider text-cyan-200 font-bold block">AI Khảo Thí</span>
                <span className="text-xs font-black text-white">Lộ Trình Tối Ưu</span>
              </div>
            </button>

            {/* 2. Zalo Chat Trigger */}
            {CONTACT_INFO.zaloUrl && (
              <a
                href={CONTACT_INFO.zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#0068ff] hover:bg-[#0052cc] text-white pl-2.5 pr-3.5 py-2 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 group"
                aria-label="Chat Zalo 24/7"
              >
                <div className="w-7 h-7 rounded-full bg-white text-[#0068ff] flex items-center justify-center font-black text-xs shrink-0 shadow-inner">
                  Z
                </div>
                <div className="text-left leading-none">
                  <span className="text-[9px] uppercase tracking-wider text-blue-100 font-bold block">Tư vấn Zalo</span>
                  <span className="text-xs font-black text-white">Chat 24/7</span>
                </div>
              </a>
            )}

            {/* 3. Phone Hotline Trigger */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white pl-2.5 pr-4 py-2 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 group relative"
              aria-label="Gọi hotline tư vấn"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                <Phone size={14} className="animate-bounce" />
              </div>
              <div className="text-left leading-none">
                <span className="text-[9px] uppercase tracking-wider text-cyan-100 font-bold block">Hotline Tư Vấn</span>
                <span className="text-xs font-black tracking-wide text-white">{CONTACT_INFO.displayPhone}</span>
              </div>
            </a>

          </div>
        )}

        {/* MINIMIZE / EXPAND TOGGLE BUTTON */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full bg-slate-900/85 hover:bg-slate-900 text-slate-300 hover:text-white backdrop-blur-md shadow-md border border-slate-700/60 transition-all hover:scale-110 cursor-pointer flex items-center justify-center"
          title={isExpanded ? "Thu gọn menu hỗ trợ" : "Mở menu hỗ trợ"}
          aria-label={isExpanded ? "Thu gọn menu hỗ trợ" : "Mở menu hỗ trợ"}
        >
          {isExpanded ? (
            <X size={14} />
          ) : (
            <div className="flex items-center gap-1 px-1 text-xs font-bold text-cyan-400">
              <MessageCircle size={15} />
              <span className="text-[11px] font-black text-white">Hỗ Trợ 24/7</span>
            </div>
          )}
        </button>

      </aside>
    </>
  );
}
