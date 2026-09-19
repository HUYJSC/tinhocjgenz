"use client";

import React from "react";
import { QuickReplyAction } from "@/types/ai-assistant";

interface AiQuickActionsProps {
  actions: (string | QuickReplyAction)[];
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export default function AiQuickActions({
  actions,
  onSelect,
  disabled = false,
}: AiQuickActionsProps) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {actions.map((act, index) => {
        const label = typeof act === "string" ? act : act.label;
        const val = typeof act === "string" ? act : act.value;

        return (
          <button
            key={index}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(val)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F7FAFE] hover:bg-[#EBF3FF] text-[#0066FF] border border-[#DDE8F5] hover:border-[#0066FF]/40 transition-all cursor-pointer active:scale-95 disabled:opacity-50 text-left shadow-2xs"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

