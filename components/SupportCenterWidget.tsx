"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import MascotBot, { MascotState } from "./MascotBot";
import ChatPreviewBubble from "./ChatPreviewBubble";
import SupportActions from "./SupportActions";

interface SupportCenterWidgetProps {
  onClose: () => void;
  onStartAiChat: () => void;
}

export default function SupportCenterWidget({
  onClose,
  onStartAiChat,
}: SupportCenterWidgetProps) {
  const [mascotState, setMascotState] = useState<MascotState>("idle");

  const handleMascotClick = () => {
    setMascotState("greeting");
    setTimeout(() => {
      onStartAiChat();
    }, 350);
  };

  const handleStartAi = () => {
    setMascotState("greeting");
    setTimeout(() => {
      onStartAiChat();
    }, 200);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="support-widget-title"
      className="w-[320px] sm:w-[350px] bg-white border border-[#E5EEF8] rounded-3xl shadow-[0_12px_40px_rgba(11,37,69,0.12)] p-5 text-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-250 relative overflow-hidden font-sans"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[#0057B8]" />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-4 pt-1">
        <div>
          <h3
            id="support-widget-title"
            className="text-sm font-bold text-[#0B2545] tracking-tight"
          >
            Trung Tâm Hỗ Trợ Đào Tạo
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Chuyên viên & AI hỗ trợ trực tuyến (8:00 - 21:30)</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          aria-label="Đóng bảng hỗ trợ"
        >
          <X size={16} />
        </button>
      </div>

      {/* Hero Interactive Area: Mascot & Chat Speech Bubble */}
      <div className="flex flex-col items-center text-center my-3">
        {/* Mascot Assistant with floating and interaction */}
        <div
          title="Nhấp để bắt đầu trò chuyện cùng AI"
          className="cursor-pointer group flex flex-col items-center"
        >
          <MascotBot
            state={mascotState}
            size={86}
            interactive={true}
            showShadow={true}
            onClick={handleMascotClick}
            priority={true}
          />
        </div>

        {/* Conversation Preview Bubble */}
        <div className="mt-3.5 w-full">
          <ChatPreviewBubble
            message="Chào bạn! Mình có thể giúp bạn chọn lộ trình học phù hợp."
          />
        </div>
      </div>

      {/* Primary & Secondary Actions */}
      <div className="mt-4">
        <SupportActions
          onStartAi={handleStartAi}
          onConsultHuman={onClose}
        />
      </div>

      {/* Subtitle / Trust Indicator */}
      <div className="mt-3 text-center">
        <p className="text-[10px] text-slate-400 font-medium">
          Tin Học Gen Z • Chuẩn Khảo Thí Quốc Tế Certiport
        </p>
      </div>
    </div>
  );
}
