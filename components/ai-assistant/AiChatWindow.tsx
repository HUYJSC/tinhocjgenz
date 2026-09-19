"use client";

import React, { useRef, useEffect, useState } from "react";
import { UserCheck, X, CheckCircle2 } from "lucide-react";
import { ChatMessage, MascotState } from "@/types/ai-assistant";
import AiChatHeader from "./AiChatHeader";
import AiMessage from "./AiMessage";
import AiChatInput from "./AiChatInput";
import AiTypingIndicator from "./AiTypingIndicator";
import AiMascot from "./AiMascot";

interface AiChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  loading: boolean;
  botState: MascotState;
  inputVal: string;
  setInputVal: (val: string) => void;
  onSend: (text?: string) => void;
  onReset: () => void;
  placeholder: string;
}

export default function AiChatWindow({
  isOpen,
  onClose,
  messages,
  loading,
  botState,
  inputVal,
  setInputVal,
  onSend,
  onReset,
  placeholder,
}: AiChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Lead modal state
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", note: "" });
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Handle lead submission
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setLeadSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: leadForm.name,
          phone: leadForm.phone,
          notes: `[AI Chat Advisor Lead] ${leadForm.note || ""}`,
          source: "ai_learning_assistant",
        }),
      });

      if (res.ok) {
        setLeadSuccess(true);
        setTimeout(() => {
          setShowLeadModal(false);
          setLeadSuccess(false);
          setLeadForm({ name: "", phone: "", note: "" });
        }, 2200);
      }
    } catch {
      // Ignore network failures gracefully
    } finally {
      setLeadSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby="ai-chat-title"
        className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[380px] h-[580px] sm:h-[620px] max-h-[calc(100dvh-32px)] bg-white rounded-[28px] border border-[#E5EEF8] shadow-[0_20px_60px_rgba(0,102,255,0.18)] flex flex-col overflow-hidden relative select-none animate-in fade-in slide-in-from-bottom-3 duration-200"
      >
        {/* Header */}
        <AiChatHeader
          botState={botState}
          onReset={onReset}
          onClose={onClose}
          onMinimize={onClose}
        />

        {/* Chat History Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F7FAFE]">
          {messages.map((msg, index) => (
            <AiMessage
              key={msg.id}
              message={msg}
              onQuickAction={(val) => onSend(val)}
              isLast={index === messages.length - 1}
              onOpenLeadModal={() => setShowLeadModal(true)}
            />
          ))}

          {/* Typing / Thinking indicator */}
          {loading && (
            <AiTypingIndicator state={botState === "typing" ? "typing" : "thinking"} />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Peeking Mascot with Speech Bubble (only on early turns when not typing) */}
        {messages.length <= 2 && !loading && (
          <div className="absolute right-2.5 bottom-[70px] z-20 pointer-events-none flex items-end gap-1 select-none animate-in fade-in duration-300">
            <div className="relative mb-8 px-2.5 py-1 rounded-2xl bg-white border border-[#0066FF] shadow-xs text-[10px] font-bold text-[#0066FF] text-center leading-tight whitespace-nowrap">
              <span>Hỏi mình<br />bất cứ điều gì nhé!</span>
              <div className="absolute -bottom-1.5 right-2 w-2 h-2 bg-white border-r border-b border-[#0066FF] rotate-45" />
            </div>
            <div className="w-16 h-16 shrink-0 relative -mr-1 -mb-1">
              <AiMascot state="greeting" size={64} animated={false} priority={true} />
            </div>
          </div>
        )}

        {/* Input Footer */}
        <AiChatInput
          value={inputVal}
          onChange={setInputVal}
          onSend={() => onSend()}
          loading={loading}
          placeholder={placeholder}
        />
      </div>

      {/* Embedded Lead Registration Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#E5EEF8] space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
                <UserCheck size={18} className="text-[#0066FF]" />
                <span>Nhận Tư Vấn Lộ Trình 1:1</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowLeadModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X size={16} />
              </button>
            </div>

            {leadSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h5 className="font-bold text-slate-800 text-sm">Đăng ký thành công!</h5>
                <p className="text-xs text-slate-500">
                  Giảng viên chuyên môn sẽ liên hệ tư vấn và gửi bài thi thử miễn phí cho bạn sớm nhất.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Họ và tên của bạn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Số điện thoại / Zalo <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ghi chú thêm
                  </label>
                  <textarea
                    rows={2}
                    value={leadForm.note}
                    onChange={(e) => setLeadForm({ ...leadForm, note: e.target.value })}
                    placeholder="Ví dụ: Rảnh tối 2-4-6, muốn thi trong 1 tháng..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowLeadModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="flex-1 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {leadSubmitting ? "Đang gửi..." : "Gửi Thông Tin"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

