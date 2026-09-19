"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  RotateCcw,
  CheckCircle2,
  UserCheck,
  ChevronRight,
  Minus,
  Image as ImageIcon,
  Compass,
  GraduationCap,
  Calendar,
} from "lucide-react";
import { RoadmapResult } from "@/lib/ai-rag-service";
import AiMascot, { MascotState } from "./ai-assistant/AiMascot";

interface AiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface QuickReplyItem {
  label: string;
  value: string;
}

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  quickReplies?: (string | QuickReplyItem)[];
  roadmap?: RoadmapResult;
}

const DEFAULT_ACTIONS = [
  {
    id: "action-roadmap",
    title: "Tư vấn lộ trình học",
    subtitle: "Lộ trình học phù hợp với mục tiêu của bạn",
    query: "Tư vấn lộ trình học cho mình nhé",
    icon: <Compass size={18} className="text-[#0066FF]" />,
  },
  {
    id: "action-courses",
    title: "Khóa học phù hợp",
    subtitle: "Gợi ý khóa học theo nhu cầu",
    query: "Khóa học nào phù hợp với mình nhất hiện nay?",
    icon: <GraduationCap size={18} className="text-[#0066FF]" />,
  },
  {
    id: "action-schedule",
    title: "Hỏi lịch học",
    subtitle: "Lịch khai giảng và thời gian học",
    query: "Cho mình hỏi lịch khai giảng gần nhất nhé",
    icon: <Calendar size={18} className="text-[#0066FF]" />,
  },
];

export default function AiChatbotModal({ isOpen, onClose }: AiChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content: "Chào bạn! 👋\nMình là trợ lý học tập AI.\nMình có thể giúp gì cho bạn?",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [botState, setBotState] = useState<MascotState>("greeting");
  const speakingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [conversationId, setConversationId] = useState<string>("");
  const [journeyProgress, setJourneyProgress] = useState<number>(10);

  // Lead registration form modal inside chatbot
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", note: "" });
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Trigger greeting animation on open
  useEffect(() => {
    if (!isOpen) return;
    const startTimer = setTimeout(() => setBotState("greeting"), 10);
    const idleTimer = setTimeout(() => {
      setBotState((prev) => (prev === "greeting" ? "idle" : prev));
    }, 2200);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(idleTimer);
    };
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const messageCounter = useRef(1);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    messageCounter.current += 1;
    const userMsg: Message = {
      id: `user-${messageCounter.current}`,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);
    setBotState("thinking");

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationId,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.conversationId && !conversationId) {
          setConversationId(data.conversationId);
        }

        messageCounter.current += 1;
        const botReply: Message = {
          id: `bot-${messageCounter.current}`,
          role: "assistant",
          content: data.reply,
          quickReplies: data.quickReplies,
          roadmap: data.roadmap,
        };

        setMessages((prev) => [...prev, botReply]);

        if (data.journey?.progress) {
          setJourneyProgress(data.journey.progress);
        }

        if (data.shouldCaptureLead) {
          setShowLeadModal(true);
        }

        setBotState(data.mascotState || "speaking");
        if (speakingTimerRef.current) clearTimeout(speakingTimerRef.current);
        speakingTimerRef.current = setTimeout(() => {
          setBotState("idle");
        }, 2400);
      } else {
        messageCounter.current += 1;
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${messageCounter.current}`,
            role: "assistant",
            content:
              "Có lỗi khi xử lý câu trả lời. Bạn có thể để lại SĐT hoặc gọi hotline 033.229.8065 để được hỗ trợ ngay!",
            quickReplies: [{ label: "Đăng ký nhận tư vấn trực tiếp", value: "register_lead" }],
          },
        ]);
        setBotState("error");
        setTimeout(() => setBotState("idle"), 2800);
      }
    } catch {
      messageCounter.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${messageCounter.current}`,
          role: "assistant",
          content: "Lỗi kết nối tới hệ thống máy chủ AI. Vui lòng thử lại sau.",
        },
      ]);
      setBotState("error");
      setTimeout(() => setBotState("idle"), 2800);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setBotState("greeting");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reset: true,
          conversationId,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessages([
          {
            id: `msg-welcome-reset-${Date.now()}`,
            role: "assistant",
            content: "Chào bạn! 👋\nMình là trợ lý học tập AI.\nMình có thể giúp gì cho bạn?",
          },
        ]);
        setJourneyProgress(data.journey?.progress || 10);
      }
    } catch {
      setMessages([
        {
          id: "msg-welcome-reset",
          role: "assistant",
          content: "Chào bạn! 👋\nMình là trợ lý học tập AI.\nMình có thể giúp gì cho bạn?",
        },
      ]);
      setJourneyProgress(10);
    } finally {
      setLoading(false);
      setTimeout(() => setBotState("idle"), 1500);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setLeadSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          note: `[Tư vấn Chatbot AI] ${leadForm.note}`,
          selection: "Tư vấn lộ trình học từ Trợ lý AI",
        }),
      });

      if (res.ok) {
        setLeadSuccess(true);
        setBotState("success");
        setTimeout(() => {
          setShowLeadModal(false);
          setLeadSuccess(false);
          setBotState("idle");
        }, 2800);
      }
    } catch {
      alert("Lỗi khi gửi thông tin. Vui lòng liên hệ hotline.");
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-chat-title"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-end justify-end pointer-events-auto select-none"
    >
      {/* Floating Chat Panel (Desktop 380-420px, Mobile full-width with margins) */}
      <div
        ref={modalRef}
        className="w-[calc(100vw-32px)] sm:w-[380px] h-[580px] sm:h-[620px] max-h-[calc(100dvh-32px)] bg-white rounded-[28px] border border-[#E5EEF8] shadow-[0_20px_60px_rgba(0,102,255,0.18)] flex flex-col overflow-hidden relative animate-in fade-in slide-in-from-bottom-3 duration-200"
      >
        {/* Chat Header: Primary Electric Blue background */}
        <div className="bg-[#0066FF] px-4 py-3.5 flex items-center justify-between shrink-0 text-white select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 border border-white/30">
              <AiMascot state={botState} size={32} priority={true} animated={false} />
            </div>
            <div>
              <h3 id="ai-chat-title" className="text-sm font-bold flex items-center gap-1.5 leading-none">
                <span>Trợ lý học tập AI</span>
              </h3>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-white/80 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Đang hoạt động</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleReset}
              title="Làm mới cuộc trò chuyện"
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Làm mới"
            >
              <RotateCcw size={15} />
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Thu nhỏ"
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Thu nhỏ"
            >
              <Minus size={16} />
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Đóng bảng chat"
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Đóng bảng chat"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Journey Progress Bar */}
        {journeyProgress > 10 && (
          <div className="h-1 bg-white/20 w-full overflow-hidden shrink-0">
            <div
              className="h-full bg-emerald-400 transition-all duration-500"
              style={{ width: `${Math.min(100, journeyProgress)}%` }}
            />
          </div>
        )}

        {/* Chat History Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F7FAFE]">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 items-start ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
                  <AiMascot state="idle" size={28} animated={false} />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#0066FF] text-white rounded-tr-xs shadow-xs"
                    : "bg-white text-[#0B2545] border border-[#E5EEF8] rounded-tl-xs shadow-[0_2px_10px_rgba(11,37,69,0.04)]"
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Structured Roadmap Card if present */}
                {msg.roadmap && (
                  <div className="mt-3.5 p-3.5 bg-[#F7FAFE] rounded-xl border border-[#E5EEF8] space-y-2.5 text-xs">
                    <div className="font-bold text-[#0066FF] flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#0066FF]" />
                      <span>{msg.roadmap.assessment || "Lộ trình đào tạo đề xuất"}</span>
                    </div>
                    {msg.roadmap.primaryCourse && (
                      <div className="text-slate-700">
                        <strong>Khóa học trọng tâm:</strong> {msg.roadmap.primaryCourse.title}
                        {msg.roadmap.totalEstimatedWeeks ? ` (${msg.roadmap.totalEstimatedWeeks} tuần)` : ""}
                      </div>
                    )}
                    {msg.roadmap.phases && msg.roadmap.phases.length > 0 && (
                      <ul className="space-y-1 text-slate-600">
                        {msg.roadmap.phases.map((ph, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#0066FF] font-bold">•</span>
                            <span><strong>{ph.title}:</strong> {ph.focus} ({ph.duration})</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="pt-2 flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={() => setShowLeadModal(true)}
                        className="w-full py-2 rounded-lg bg-[#0066FF] text-white font-bold text-center hover:bg-[#0052CC] transition-colors cursor-pointer"
                      >
                        Đăng ký xếp lớp theo lộ trình này
                      </button>
                      <Link
                        href={msg.roadmap.primaryCourse?.enrollmentUrl || "/khoa-hoc"}
                        className="text-center font-semibold text-[#0066FF] hover:underline text-[11px] py-0.5"
                      >
                        Xem chi tiết khóa học →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Quick Actions Row below welcome message */}
                {index === 0 && msg.role === "assistant" && (
                  <div className="mt-3.5 space-y-2 pt-2 border-t border-[#E5EEF8]">
                    {DEFAULT_ACTIONS.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleSendMessage(action.query)}
                        className="w-full p-2.5 rounded-xl bg-[#F7FAFE] hover:bg-[#EBF3FF] border border-[#E5EEF8] text-left transition-colors flex items-center justify-between gap-2 cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#EBF3FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors [&>svg]:group-hover:text-white">
                            {action.icon}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-[#0B2545] group-hover:text-[#0066FF] transition-colors">
                              {action.title}
                            </div>
                            <div className="text-[11px] text-[#54657A] line-clamp-1">
                              {action.subtitle}
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* AI Thinking indicator */}
          {loading && (
            <div className="flex gap-2.5 items-start animate-in fade-in duration-200">
              <div className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
                <AiMascot state="thinking" size={28} animated={false} />
              </div>
              <div className="p-3 rounded-2xl rounded-tl-xs bg-white border border-[#E5EEF8] text-xs text-[#54657A] flex items-center gap-2 shadow-2xs">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce" />
                </div>
                <span className="font-medium">Đang suy nghĩ...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Peeking Mascot with Speech Bubble (matching reference design) */}
        {messages.length <= 2 && !loading && (
          <div className="absolute right-2.5 bottom-[70px] z-20 pointer-events-none flex items-end gap-1 select-none animate-in fade-in duration-300">
            {/* Speech Bubble */}
            <div className="relative mb-8 px-2.5 py-1 rounded-2xl bg-white border border-[#0066FF] shadow-xs text-[10px] font-bold text-[#0066FF] text-center leading-tight whitespace-nowrap">
              <span>Hỏi mình<br />bất cứ điều gì nhé!</span>
              <div className="absolute -bottom-1.5 right-2 w-2 h-2 bg-white border-r border-b border-[#0066FF] rotate-45" />
            </div>
            {/* Peeking Mascot Asset */}
            <div className="w-16 h-16 shrink-0 relative -mr-1 -mb-1">
              <AiMascot state="greeting" size={64} animated={false} priority={true} />
            </div>
          </div>
        )}

        {/* Chat Input Footer */}
        <div className="bg-white border-t border-[#E5EEF8] p-3 shrink-0 relative z-30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              title="Đính kèm tệp / ảnh"
              className="p-2 rounded-xl text-slate-400 hover:text-[#0066FF] hover:bg-[#EBF3FF] transition-colors cursor-pointer shrink-0"
              aria-label="Đính kèm"
            >
              <ImageIcon size={18} />
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={loading}
              className="flex-1 h-10 px-3.5 text-xs sm:text-sm bg-[#F7FAFE] rounded-xl border border-[#E5EEF8] text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
            />

            <button
              type="submit"
              disabled={!inputVal.trim() || loading}
              className="w-10 h-10 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white transition-colors disabled:opacity-40 flex items-center justify-center cursor-pointer shrink-0 shadow-xs active:scale-95"
              aria-label="Gửi tin nhắn"
            >
              <ChevronRight size={18} className="stroke-[2.5]" />
            </button>
          </form>

          {/* Footer Text */}
          <div className="mt-2 text-center text-[10px] text-slate-400 font-medium select-none">
            Tin Học Gen Z • Luôn đồng hành cùng bạn 💙
          </div>
        </div>
      </div>

      {/* Lead Registration Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#DDE8F5] space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
                <UserCheck size={18} className="text-[#0057B8]" />
                <span>Nhận Tư Vấn Lộ Trình 1:1</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowLeadModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
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
                    Họ và tên học viên *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0057B8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Số điện thoại / Zalo *
                  </label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0057B8]"
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
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0057B8]"
                  />
                </div>

                <div className="pt-2 flex gap-2">
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
                    className="flex-1 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {leadSubmitting ? "Đang gửi..." : "Gửi Thông Tin"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
