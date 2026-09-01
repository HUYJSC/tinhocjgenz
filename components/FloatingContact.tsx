"use client";

import { useState } from "react";
import { Phone, Brain, X, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";
import AiPathwayAdvisor from "./AiPathwayAdvisor";

export default function FloatingContact() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* AI Advisor Modal */}
      <AiPathwayAdvisor
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <aside 
        aria-label="Kênh hỗ trợ nhanh" 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto select-none font-sans"
      >
        {/* EXPANDED ACTION BUTTONS (Mở ra khi bấm) */}
        {isExpanded && (
          <div className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            
            {/* 1. AI Pathway Advisor Trigger */}
            <button
              type="button"
              onClick={() => {
                setIsAiModalOpen(true);
                setIsExpanded(false);
              }}
              className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white pl-2.5 pr-4 py-2 rounded-full shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200 cursor-pointer border border-white/20"
              aria-label="AI Tư Vấn Lộ Trình"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-cyan-300 font-black text-xs shrink-0">
                <Brain size={15} className="text-cyan-300 animate-pulse" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[9px] uppercase tracking-wider text-cyan-200 font-bold block">AI Khảo Thí</span>
                <span className="text-xs font-black text-white">Tư Vấn Lộ Trình</span>
              </div>
            </button>

            {/* 2. Zalo Chat Trigger */}
            {CONTACT_INFO.zaloUrl && (
              <a
                href={CONTACT_INFO.zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 bg-[#0068ff] hover:bg-[#0052cc] text-white pl-2.5 pr-4 py-2 rounded-full shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200 cursor-pointer"
                aria-label="Chat Zalo 24/7"
              >
                <div className="w-7 h-7 rounded-full bg-white text-[#0068ff] flex items-center justify-center font-black text-xs shrink-0 shadow-inner">
                  Z
                </div>
                <div className="text-left leading-tight">
                  <span className="text-[9px] uppercase tracking-wider text-blue-100 font-bold block">Tư Vấn Zalo</span>
                  <span className="text-xs font-black text-white">Chat 24/7 Trực Tuyến</span>
                </div>
              </a>
            )}

            {/* 3. Phone Hotline Trigger */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white pl-2.5 pr-4 py-2 rounded-full shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200 cursor-pointer"
              aria-label="Gọi hotline tư vấn"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                <Phone size={13} />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[9px] uppercase tracking-wider text-cyan-100 font-bold block">Hotline Tuyển Sinh</span>
                <span className="text-xs font-black tracking-wide text-white">{CONTACT_INFO.displayPhone}</span>
              </div>
            </a>

          </div>
        )}

        {/* COMPACT FLOATING TOGGLE BUTTON (GỌN GÀNG, KHÔNG CHE CHÂN TRANG) */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`h-11 px-4 rounded-full flex items-center gap-2 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer border ${
            isExpanded 
              ? "bg-slate-900 text-white border-slate-700 hover:bg-slate-800" 
              : "bg-blue-600 hover:bg-blue-500 text-white border-blue-400/30 hover:scale-105 shadow-blue-500/25"
          }`}
          title={isExpanded ? "Đóng menu hỗ trợ" : "Tư vấn & Lịch thi 24/7"}
          aria-label={isExpanded ? "Đóng menu hỗ trợ" : "Tư vấn & Lịch thi 24/7"}
        >
          {isExpanded ? (
            <>
              <X size={16} />
              <span className="text-xs font-bold">Đóng</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
              </span>
              <MessageCircle size={16} className="text-cyan-200" />
              <span className="text-xs font-black tracking-wide">Tư Vấn 24/7</span>
            </>
          )}
        </button>

      </aside>
    </>
  );
}
