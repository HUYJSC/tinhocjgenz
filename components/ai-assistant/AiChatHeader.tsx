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
    <div className="bg-[#0066FF] px-4 py-3 flex items-center justify-between shrink-0 text-white select-none rounded-t-[28px]">
      <div className="flex items-center gap-2.5">
        {/* Mascot: 34px without white circle wrapper */}
        <div className="w-9 h-9 flex items-center justify-center shrink-0">
          <AiMascot state={botState} size={34} priority={true} animated={false} />
        </div>
        <div>
          <h3 className="text-sm font-bold flex items-center gap-1.5 leading-none">
            <span>Trợ lý học tập AI</span>
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-white/90 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Đang hoạt động</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onReset}
          title="Bắt đầu cuộc trò chuyện mới"
          className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          aria-label="Làm mới cuộc trò chuyện"
        >
          <RotateCcw size={15} />
        </button>
        <button
          type="button"
          onClick={onMinimize}
          title="Thu nhỏ"
          className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          aria-label="Thu nhỏ bảng chat"
        >
          <Minus size={16} />
        </button>
        <button
          type="button"
          onClick={onClose}
          title="Đóng bảng chat"
          className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          aria-label="Đóng bảng chat"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}

