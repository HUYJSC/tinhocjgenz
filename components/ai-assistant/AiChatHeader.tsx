"use client";

import React from "react";
import { RotateCcw, Minus, X } from "lucide-react";
import AiMascot from "./AiMascot";
import { MascotState } from "@/types/ai-assistant";

interface AiChatHeaderProps {
  botState: MascotState;
  onReset: () => void;
  onClose: () => void;
  onMinimize: () => void;
}

export default function AiChatHeader({
  botState,
  onReset,
  onClose,
  onMinimize,
}: AiChatHeaderProps) {
  return (
    <div className="h-[62px] bg-gradient-to-r from-[#0057B8] to-[#087CF0] px-4 flex items-center justify-between shrink-0 text-white select-none rounded-t-[20px]">
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Mascot: 32px without white circle wrapper */}
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
          <AiMascot state={botState} size={32} priority={true} animated={false} />
        </div>
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold tracking-tight leading-none truncate">
            Trợ lý học tập AI
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-white/90 font-medium leading-none">
            <span className="w-[7px] h-[7px] rounded-full bg-emerald-400 shadow-xs shrink-0" aria-hidden="true" />
            <span className="truncate">Đang hoạt động</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={onReset}
          title="Làm mới cuộc trò chuyện"
          className="w-9 h-9 rounded-lg text-white/85 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          aria-label="Làm mới cuộc trò chuyện"
        >
          <RotateCcw size={15} />
        </button>
        <button
          type="button"
          onClick={onMinimize}
          title="Thu nhỏ"
          className="w-9 h-9 rounded-lg text-white/85 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          aria-label="Thu nhỏ trợ lý học tập AI"
        >
          <Minus size={16} />
        </button>
        <button
          type="button"
          onClick={onClose}
          title="Đóng"
          className="w-9 h-9 rounded-lg text-white/85 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          aria-label="Đóng trợ lý học tập AI"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}
