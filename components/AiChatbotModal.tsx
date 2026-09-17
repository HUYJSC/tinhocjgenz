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
} from "lucide-react";
import { RoadmapResult, PathwayCriteria } from "@/lib/ai-rag-service";
import MascotBot, { MascotState } from "./MascotBot";

interface AiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  quickReplies?: string[];
  roadmap?: RoadmapResult;
}

export default function AiChatbotModal({ isOpen, onClose }: AiChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content:
        "Chào bạn! Mình là Trợ lý học tập AI của Tin Học Gen Z. Mình sẽ giúp bạn xây dựng lộ trình học phù hợp nhất. Bạn muốn học để đi làm, nâng cao kỹ năng hay thi chứng chỉ?",
      quickReplies: [
        "Thi chứng chỉ MOS quốc tế",
        "Thi chứng chỉ IC3 GS6",
        "Học thực chiến Excel đi làm",
        "Lấy lại gốc tin học từ số 0",
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [botState, setBotState] = useState<MascotState>("greeting");
  const speakingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [conversationId, setConversationId] = useState<string>("");
  const [criteria, setCriteria] = useState<PathwayCriteria>({});

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
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          criteria,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.conversationId && !conversationId) {
          setConversationId(data.conversationId);
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
        setBotState("speaking");
        if (speakingTimerRef.current) clearTimeout(speakingTimerRef.current);
        speakingTimerRef.current = setTimeout(() => {
          setBotState("idle");
        }, 2600);
      } else {
        messageCounter.current += 1;
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${messageCounter.current}`,
            role: "assistant",
            content: "Có lỗi khi xử lý câu trả lời. Bạn có thể để lại SĐT hoặc gọi hotline 033.229.8065 để được hỗ trợ ngay!",
            quickReplies: ["Đăng ký nhận tư vấn trực tiếp"],
          },
        ]);
        setBotState("idle");
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
      setBotState("idle");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "msg-welcome-reset",
        role: "assistant",
        content:
          "Chào bạn! Mình sẽ giúp bạn thiết kế lại lộ trình học mới. Bạn muốn học để đi làm, nâng cao kỹ năng hay thi chứng chỉ?",
        quickReplies: [
          "Thi chứng chỉ MOS quốc tế",
          "Thi chứng chỉ IC3 GS6",
          "Học thực chiến Excel đi làm",
          "Lấy lại gốc tin học từ số 0",
        ],
      },
    ]);
    setCriteria({});
    setBotState("greeting");
    setTimeout(() => {
      setBotState((prev) => (prev === "greeting" ? "idle" : prev));
    }, 2200);
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
        setTimeout(() => {
          setShowLeadModal(false);
          setLeadSuccess(false);
        }, 2500);
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

        {/* Modal Header */}
        <div className="bg-white border-b border-[#E5EEF8] px-5 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <MascotBot state={botState} size={40} showShadow={false} />
            </div>
            <div>
              <h3 id="ai-chat-title" className="text-sm sm:text-base font-bold text-[#0B2545] flex items-center gap-1.5">
                <span>Trợ Lý Học Tập AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {botState === "thinking"
                  ? "Đang phân tích dữ liệu khóa học..."
                  : botState === "listening"
                  ? "Đang lắng nghe câu hỏi của bạn..."
                  : botState === "speaking"
                  ? "Đang giải đáp lộ trình học..."
                  : "Tư vấn lộ trình bám sát dữ liệu khảo thí & đào tạo chính thức"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
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
                  <div className="mt-4 pt-4 border-t border-[#E5EEF8] space-y-4 text-slate-800">
                    {/* Assessment */}
                    <div className="p-3 rounded-xl bg-[#F4F8FD] border border-[#E5EEF8]">
                      <strong className="block text-xs font-bold text-[#0057B8] uppercase tracking-wider mb-1">
                        Đánh Giá & Nhận Định:
                      </strong>
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">{msg.roadmap.assessment}</p>
                    </div>

                    {/* Primary Course Recommendation */}
                    <div className="p-3.5 rounded-xl bg-white border-2 border-[#0057B8]/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0057B8]">
                          {msg.roadmap.primaryCourse.badge}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {msg.roadmap.primaryCourse.duration}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#0B2545]">
                        {msg.roadmap.primaryCourse.title}
                      </h4>
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[11px] text-slate-500 block">Học phí trọn gói</span>
                          <span className="text-base font-bold text-[#0057B8]">
                            {msg.roadmap.primaryCourse.priceFormatted}
                          </span>
                        </div>
                        <Link
                          href={msg.roadmap.primaryCourse.enrollmentUrl}
                          onClick={onClose}
                          className="px-3.5 py-2 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <span>Xem khóa</span>
                          <ChevronRight size={13} />
                        </Link>
                      </div>
                    </div>

                    {/* Phases breakdown */}
                    <div className="space-y-2.5">
                      <strong className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
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
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (reply === "Đăng ký nhận tư vấn trực tiếp" || reply === "Đăng ký xếp lớp ngay") {
                            setShowLeadModal(true);
                          } else {
                            handleSendMessage(reply);
                          }
                        }}
                        className="px-3 py-1.5 rounded-full bg-[#F4F8FD] hover:bg-blue-50 border border-[#E5EEF8] hover:border-[#0057B8]/40 text-[#0057B8] text-xs font-semibold transition-all cursor-pointer text-left"
                      >
                        {reply}
                      </button>
                    ))}
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
                <span className="font-medium text-slate-600">Trợ lý AI đang phân tích dữ liệu khóa học...</span>
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
              placeholder="Nhập câu hỏi hoặc chọn các gợi ý bên trên..."
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
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
            <span>Dữ liệu đào tạo chuẩn Certiport & Tin Học Gen Z</span>
            <button
              type="button"
              onClick={handleReset}
              className="hover:text-[#0057B8] underline cursor-pointer"
            >
              Làm lại lộ trình
            </button>
          </div>
        </div>
      </div>

      {/* LEAD REGISTRATION MODAL */}
      {showLeadModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E5EEF8] max-w-sm w-full p-6 shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowLeadModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X size={16} />
            </button>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-[#0B2545]">Đăng Ký Nhận Lộ Trình Chi Tiết</h4>
              <p className="text-xs text-slate-500">Giảng viên chuyên môn sẽ liên hệ xếp ca học trong 15 phút.</p>
            </div>

            {leadSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold text-center space-y-1">
                <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
                <p>Đăng ký thành công! Trung tâm sẽ gọi điện tư vấn sớm nhất.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full p-2.5 rounded-xl border border-[#E5EEF8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số điện thoại / Zalo *</label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="Ví dụ: 0912 345 678"
                    className="w-full p-2.5 rounded-xl border border-[#E5EEF8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ghi chú hoặc mục tiêu riêng</label>
                  <input
                    type="text"
                    value={leadForm.note}
                    onChange={(e) => setLeadForm({ ...leadForm, note: e.target.value })}
                    placeholder="Ví dụ: Cần nộp chứng chỉ trước tháng 6"
                    className="w-full p-2.5 rounded-xl border border-[#E5EEF8]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="w-full py-3 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white font-bold text-xs transition-colors cursor-pointer mt-2"
                >
                  {leadSubmitting ? "Đang gửi..." : "Gửi Thông Tin Nhận Ưu Đãi"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
