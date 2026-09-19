"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { ActionCard, QuickReplyAction } from "@/types/ai-assistant";
import { trackEvent } from "@/lib/analytics";

interface AiQuickActionsProps {
  actions?: (ActionCard | QuickReplyAction | string)[];
  onActionClick: (value: string, label: string) => void;
  disabled?: boolean;
}

const DEFAULT_ACTION_CARDS: ActionCard[] = [
  {
    id: "roadmap",
    icon: "🧭",
    title: "Tư vấn lộ trình",
    subtitle: "Chọn hướng học phù hợp với mục tiêu",
    value: "Tư vấn lộ trình học phù hợp cho mình",
  },
  {
    id: "courses",
    icon: "🎓",
    title: "Chọn khóa học",
    subtitle: "Tìm khóa phù hợp với trình độ hiện tại",
    value: "Giới thiệu các khóa học tin học hiện có",
  },
  {
    id: "schedule",
    icon: "📅",
    title: "Hỏi lịch học",
    subtitle: "Xem lịch khai giảng các lớp mới nhất",
    value: "Cho mình xem lịch khai giảng gần nhất",
  },
];

export default function AiQuickActions({
  actions,
  onActionClick,
  disabled = false,
}: AiQuickActionsProps) {
  // If actions are provided as simple pills / strings from AI, render them cleanly
  // If no dynamic actions provided or at start, render compact action cards
  const normalizedActions = actions && actions.length > 0 ? actions : DEFAULT_ACTION_CARDS;

  const handleClick = (value: string, label: string) => {
    if (disabled) return;
    trackEvent("ai_quick_action_clicked", { action_value: value, action_label: label });
    onActionClick(value, label);
  };

  return (
    <div className="w-full pt-2 space-y-2 select-none" aria-label="Gợi ý câu hỏi nhanh">
      {normalizedActions.map((item, idx) => {
        // Case 1: ActionCard (rich card with title, subtitle, icon)
        if (typeof item === "object" && "subtitle" in item && item.subtitle) {
          const card = item as ActionCard;
          return (
            <button
              key={card.id || idx}
              type="button"
              disabled={disabled}
              onClick={() => handleClick(card.value, card.title)}
              className="w-full min-h-[52px] px-[11px] py-[9px] rounded-xl bg-white border border-[#DDE8F5] hover:border-[#0057B8] hover:bg-[#F4F8FD] hover:-translate-y-[1px] transition-all duration-160 flex items-center justify-between text-left cursor-pointer shadow-2xs group focus-visible:outline-2 focus-visible:outline-[#0057B8] disabled:opacity-50 disabled:pointer-events-none"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="text-base shrink-0 select-none" aria-hidden="true">
                  {card.icon || "👉"}
                </span>
                <div className="min-w-0">
                  <div className="text-xs sm:text-[13px] font-bold text-[#0B2545] group-hover:text-[#0057B8] transition-colors truncate">
                    {card.title}
                  </div>
                  <div className="text-[11px] text-[#54657A] truncate font-normal leading-tight mt-0.5">
                    {card.subtitle}
                  </div>
                </div>
              </div>
              <ChevronRight
                size={16}
                className="text-slate-400 group-hover:text-[#0057B8] group-hover:translate-x-0.5 transition-all shrink-0"
                aria-hidden="true"
              />
            </button>
          );
        }

        // Case 2: QuickReplyAction or String (contextual reply card)
        const label = typeof item === "string" ? item : ("label" in item ? item.label : item.title);
        const value = typeof item === "string" ? item : item.value;
        const subtext = typeof item === "object" && "subtext" in item ? item.subtext : undefined;

        return (
          <button
            key={typeof item === "object" && "id" in item ? item.id : idx}
            type="button"
            disabled={disabled}
            onClick={() => handleClick(value, label)}
            className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-white border border-[#DDE8F5] hover:border-[#0057B8] hover:bg-[#F4F8FD] hover:-translate-y-[1px] transition-all duration-160 flex items-center justify-between text-left cursor-pointer shadow-2xs group focus-visible:outline-2 focus-visible:outline-[#0057B8] disabled:opacity-50 disabled:pointer-events-none"
          >
            <div className="min-w-0 pr-2">
              <span className="text-xs font-bold text-[#0B2545] group-hover:text-[#0057B8] transition-colors truncate block">
                {label}
              </span>
              {subtext && (
                <span className="text-[10px] text-slate-500 truncate block">
                  {subtext}
                </span>
              )}
            </div>
            <ChevronRight
              size={14}
              className="text-slate-400 group-hover:text-[#0057B8] group-hover:translate-x-0.5 transition-all shrink-0"
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
