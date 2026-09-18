"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  Send,
  RotateCcw,
  CheckCircle2,
  UserCheck,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { RoadmapResult } from "@/lib/ai-rag-service";
import MascotBot, { MascotState } from "./MascotBot";

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

export default function AiChatbotModal({ isOpen, onClose }: AiChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content:
        "Chào bạn! Mình là Trợ lý học tập AI của Tin Học Gen Z. Mình sẽ giúp bạn xây dựng lộ trình học chuẩn xác và tối ưu nhất. Mục tiêu chính của bạn hiện tại là gì?",
      quickReplies: [
        { label: "Thi lấy bằng MOS quốc tế", value: "mos_certification" },
        { label: "Thi chứng chỉ IC3 GS6", value: "ic3_certification" },
        { label: "Thực chiến Excel đi làm", value: "practical_excel" },
        { label: "Học văn phòng toàn diện", value: "office_comprehensive" },
      ],
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

  // Trigger greeting animation on modal open
  useEffect(() => {
    if (!isOpen) return;

    const startTimer = setTimeout(() => {
      setBotState("greeting");
    }, 10);

    const idleTimer = setTimeout(() => {
      setBotState((prev) => (prev === "greeting" ? "idle" : prev));
    }, 2200);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(idleTimer);
    };
  }, [isOpen]);

  // Focus trap and Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const messageCounter = useRef(1);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    messageCounter.current += 1;
    const userMsgId = `usr-${messageCounter.current}`;

    const userMsg: Message = {
      id: userMsgId,
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
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.conversationId && !conversationId) {
          setConversationId(data.conversationId);
        }

        if (data.journey?.progress !== undefined) {
          setJourneyProgress(data.journey.progress);
        }

        messageCounter.current += 1;
        const botMsg: Message = {
          id: `bot-${messageCounter.current}`,
          role: "assistant",
          content: data.reply,
          quickReplies: data.quickReplies,
          roadmap: data.roadmapData,
        };

        setMessages((prev) => [...prev, botMsg]);

        if (data.recommendationReady || data.mascotState === "success") {
          setBotState("success");
          if (speakingTimerRef.current) clearTimeout(speakingTimerRef.current);
          speakingTimerRef.current = setTimeout(() => {
            setBotState("idle");
          }, 3200);
        } else {
          setBotState(data.mascotState || "speaking");
          if (speakingTimerRef.current) clearTimeout(speakingTimerRef.current);
          speakingTimerRef.current = setTimeout(() => {
            setBotState("idle");
          }, 2400);
        }
      } else {
        messageCounter.current += 1;
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${messageCounter.current}`,
            role: "assistant",
            content: "Có lỗi khi xử lý câu trả lời. Bạn có thể để lại SĐT hoặc gọi hotline 033.229.8065 để được hỗ trợ ngay!",
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
            content: data.reply,
            quickReplies: data.quickReplies,
          },
        ]);
        setJourneyProgress(data.journey?.progress || 10);
      }
    } catch {
      // Local fallback reset
      setMessages([
        {
          id: "msg-welcome-reset",
          role: "assistant",
          content:
            "Chào bạn! Mình là Trợ lý học tập AI của Tin Học Gen Z. Mình sẽ giúp bạn xây dựng lộ trình học chuẩn xác và tối ưu nhất. Mục tiêu chính của bạn hiện tại là gì?",
          quickReplies: [
            { label: "Thi lấy bằng MOS quốc tế", value: "mos_certification" },
            { label: "Thi chứng chỉ IC3 GS6", value: "ic3_certification" },
            { label: "Thực chiến Excel đi làm", value: "practical_excel" },
            { label: "Học văn phòng toàn diện", value: "office_comprehensive" },
          ],
        },
      ]);
      setJourneyProgress(10);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setBotState((prev) => (prev === "greeting" ? "idle" : prev));
      }, 2000);
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
          note: `Đăng ký từ AI Chatbot Lộ trình: ${leadForm.note || "Tư vấn xếp lớp"}`,
          formType: "AI Learning Pathway Advisor",
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
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="w-full sm:max-w-2xl h-[92dvh] sm:h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl border border-[#E5EEF8] shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Top Accent line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#0057B8] z-20" />

        {/* Journey Progress Bar */}
        {journeyProgress > 0 && (
          <div className="absolute top-[3px] left-0 w-full h-[2.5px] bg-[#0057B8]/10 z-20">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${journeyProgress}%` }}
            />
          </div>
        )}

        {/* Modal Header */}
        <div className="bg-white border-b border-[#E5EEF8] px-4 sm:px-5 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <MascotBot state={botState} size={40} showShadow={false} />
            </div>
            <div>
              <h3 id="ai-chat-title" className="text-sm sm:text-base font-bold text-[#0B2545] flex items-center gap-1.5">
                <span>Trợ Lý Học Tập AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {journeyProgress > 10 && journeyProgress < 100 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#0057B8] border border-blue-200">
                    Tiến độ {journeyProgress}%
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                {botState === "thinking"
                  ? "Đang phân tích thông tin & dữ liệu khóa học..."
                  : botState === "listening"
                  ? "Đang lắng nghe câu trả lời của bạn..."
                  : botState === "speaking"
                  ? "Đang giải đáp lộ trình học..."
                  : botState === "success"
                  ? "Tuyệt vời! Lộ trình đã sẵn sàng"
                  : botState === "error"
                  ? "Đang kết nối lại chuyên viên..."
                  : "Tư vấn lộ trình bám sát dữ liệu khảo thí & đào tạo chính thức"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <a
              href="tel:0332298065"
              title="Gọi hotline tư vấn: 033.229.8065"
              className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-1"
              aria-label="Gọi hotline tư vấn trực tiếp"
            >
              <Phone size={15} />
              <span className="hidden md:inline text-xs font-semibold">033.229.8065</span>
            </a>
            <a
              href="https://zalo.me/0332298065"
              target="_blank"
              rel="noopener noreferrer"
              title="Chat Zalo cùng chuyên viên tư vấn"
              className="p-2 rounded-xl text-slate-500 hover:text-[#0057B8] hover:bg-blue-50 transition-colors flex items-center gap-1"
              aria-label="Chat Zalo với chuyên viên"
            >
              <MessageCircle size={15} />
              <span className="hidden md:inline text-xs font-semibold">Zalo</span>
            </a>
            <button
              type="button"
              onClick={handleReset}
              title="Làm lại lộ trình"
              className="p-2 rounded-xl text-slate-500 hover:text-[#0057B8] hover:bg-[#F4F8FD] transition-colors cursor-pointer"
              aria-label="Làm lại lộ trình"
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Đóng bảng chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat History Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F4F8FD]/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 items-start ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                  <MascotBot state="idle" size={30} showShadow={false} />
                </div>
              )}

              <div
                className={`max-w-[86%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#0057B8] text-white rounded-tr-xs shadow-xs"
                    : "bg-white text-slate-800 border border-[#E5EEF8] rounded-tl-xs shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Structured Roadmap Card if present */}
                {msg.roadmap && (
                  <div className="mt-4 pt-4 border-t border-[#E5EEF8] space-y-3 animate-in fade-in zoom-in-95 duration-300">
                    {/* Assessment summary */}
                    <div className="p-3 rounded-xl bg-[#F4F8FD] border border-[#E5EEF8] text-xs text-[#0B2545] font-medium leading-relaxed">
                      <strong className="block text-[#0057B8] font-bold mb-1">Đánh Giá Đầu Vào:</strong>
                      {msg.roadmap.assessment}
                    </div>

                    {/* Primary Recommended Course Card */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/50 to-white border-2 border-[#0057B8]/20 shadow-sm space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded-full bg-[#0057B8] text-white text-[10px] font-bold uppercase tracking-wider mb-1">
                            {msg.roadmap.primaryCourse.badge}
                          </span>
                          <h4 className="font-bold text-sm text-[#0B2545]">
                            {msg.roadmap.primaryCourse.title}
                          </h4>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-extrabold text-[#0057B8]">
                            {msg.roadmap.primaryCourse.priceFormatted}
                          </span>
                          <span className="block text-[11px] text-slate-500">
                            {msg.roadmap.primaryCourse.duration}
                          </span>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center gap-2">
                        <Link
                          href={`/khoa-hoc/${msg.roadmap.primaryCourse.id}`}
                          target="_blank"
                          className="text-xs font-semibold text-[#0057B8] hover:underline flex items-center gap-1"
                        >
                          <span>Xem chi tiết môn học</span>
                          <ChevronRight size={13} />
                        </Link>
                      </div>
                    </div>

                    {/* Timeline Phases */}
                    <div className="space-y-2 pt-1">
                      <strong className="text-xs font-bold text-[#0B2545] block">
                        Các Giai Đoạn Đào Tạo:
                      </strong>
                      {msg.roadmap.phases.map((phase) => (
                        <div key={phase.phaseIndex} className="p-3 rounded-xl bg-white border border-[#E5EEF8] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-xs text-[#0B2545]">{phase.title}</h5>
                            <span className="text-[11px] text-slate-500 font-medium">{phase.duration}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{phase.focus}</p>
                          <div className="pt-1 text-[11px] text-slate-500 flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-[#0057B8] shrink-0" />
                            <span>Dự án: {phase.practicalProject}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Call to action buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setLeadForm((prev) => ({ ...prev, note: `Lộ trình: ${msg.roadmap?.primaryCourse.title}` }));
                          setShowLeadModal(true);
                        }}
                        className="flex-1 py-3 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <UserCheck size={15} />
                        <span>Đăng Ký Nhận Tư Vấn Xếp Lớp</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Reply Chips */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
                    {msg.quickReplies.map((reply, idx) => {
                      const label = typeof reply === "string" ? reply : reply.label;
                      const value = typeof reply === "string" ? reply : reply.value;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (
                              value === "register_lead" ||
                              label === "Đăng ký nhận tư vấn trực tiếp" ||
                              label === "Đăng ký xếp lớp ngay"
                            ) {
                              setShowLeadModal(true);
                            } else if (value === "chat_zalo") {
                              window.open("https://zalo.me/0332298065", "_blank");
                            } else {
                              handleSendMessage(label);
                            }
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#F4F8FD] hover:bg-blue-50 border border-[#E5EEF8] hover:border-[#0057B8]/40 text-[#0057B8] text-xs font-semibold transition-all cursor-pointer text-left shadow-2xs active:scale-95"
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* AI Thinking indicator */}
          {loading && (
            <div className="flex gap-3 items-start animate-in fade-in duration-200">
              <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                <MascotBot state="thinking" size={32} showShadow={false} />
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-xs bg-white border border-[#E5EEF8] text-xs text-slate-600 flex items-center gap-2.5 shadow-2xs">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] animate-bounce" />
                </div>
                <span className="font-medium text-slate-600">Trợ lý AI đang phân tích và lập lộ trình...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer Bar */}
        <div className="bg-white border-t border-[#E5EEF8] p-3 sm:p-4 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onFocus={() => {
                if (!loading && botState === "idle") {
                  setBotState("listening");
                }
              }}
              onBlur={() => {
                if (!loading && botState === "listening") {
                  setBotState("idle");
                }
              }}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (!loading && botState === "idle") {
                  setBotState("listening");
                }
              }}
              placeholder="Nhập câu trả lời hoặc chọn gợi ý bên trên..."
              className="flex-1 min-h-11 px-4 py-2.5 rounded-xl border border-[#E5EEF8] bg-[#F4F8FD]/50 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0057B8] focus:ring-2 focus:ring-[#0057B8]/20 transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || loading}
              className="min-h-11 px-4 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white transition-colors disabled:opacity-40 flex items-center justify-center cursor-pointer shrink-0 shadow-xs"
              aria-label="Gửi tin nhắn"
            >
              <Send size={16} />
            </button>
          </form>
          <div className="mt-2 text-center">
            <span className="text-[10px] text-slate-400">
              Trợ lý học tập AI Tin Học Gen Z cam kết thông tin bám sát khung chuẩn khảo thí IIG & Certiport
            </span>
          </div>
        </div>
      </div>

      {/* Lead Registration Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#E5EEF8] space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
                <UserCheck size={18} className="text-[#0057B8]" />
                <span>Nhận Tư Vấn Lộ Trình 1:1</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowLeadModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
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
                  Giảng viên chuyên môn sẽ liên hệ tư vấn và gửi bài thi thử miễn phí cho bạn qua số điện thoại sớm nhất.
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0057B8]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0057B8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ghi chú thêm (khung giờ học rảnh, mục tiêu thi...)
                  </label>
                  <textarea
                    rows={2}
                    value={leadForm.note}
                    onChange={(e) => setLeadForm({ ...leadForm, note: e.target.value })}
                    placeholder="Ví dụ: Rảnh tối 2-4-6, muốn thi trong 1 tháng..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0057B8]"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLeadModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="flex-1 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold transition-colors disabled:opacity-50"
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
