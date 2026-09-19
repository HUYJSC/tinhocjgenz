"use client";

import { useState, useEffect, useCallback } from "react";
import { ChatMessage } from "@/types/ai-assistant";
import { useConversationContext } from "./useConversationContext";
import { useMascotAnimation } from "./useMascotAnimation";

export function useAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [greetingBubbleText, setGreetingBubbleText] = useState<string | null>(null);
  const [showGreetingBubble, setShowGreetingBubble] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState<string>("");

  const {
    conversationId,
    context,
    pageContext,
    recordTurn,
    resetConversation,
  } = useConversationContext();

  const {
    mascotState,
    setMascotState,
    isClicking,
    reducedMotion,
    triggerClick,
    transitionTemporarily,
    handleHoverStart,
    handleHoverEnd,
  } = useMascotAnimation({ isChatOpen: isOpen });

  // Initial welcome message
  const initialMessage: ChatMessage = {
    id: "welcome-1",
    role: "assistant",
    content: "Chào bạn! 👋\nMình là trợ lý học tập AI của Tin Học Gen Z.\nMình có thể giúp bạn chọn khóa học, tư vấn lộ trình hoặc giải đáp thắc mắc về lịch học.",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    quickReplies: [
      { id: "qr-path", label: "Tư vấn lộ trình", value: "Tư vấn lộ trình học phù hợp cho mình" },
      { id: "qr-course", label: "Chọn khóa học", value: "Khóa học nào phù hợp với mình nhất hiện nay?" },
      { id: "qr-schedule", label: "Hỏi lịch học", value: "Cho mình hỏi lịch khai giảng gần nhất nhé" },
      { id: "qr-starter", label: "Tôi chưa biết bắt đầu từ đâu", value: "Mình chưa biết bắt đầu từ đâu, tư vấn giúp mình với" },
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  // Dynamic input placeholder based on page context
  const getDynamicPlaceholder = useCallback(() => {
    if (pageContext.pageType === "course" && pageContext.category === "programming") {
      return "Hỏi mình về khóa Python này...";
    }
    if (pageContext.pageType === "course" && pageContext.category === "office") {
      return "Hỏi mình về Word, Excel, PowerPoint...";
    }
    if (pageContext.pageType === "exam") {
      return "Hỏi mình về cấu trúc đề thi Certiport, MOS...";
    }
    if (pageContext.pageType === "pricing") {
      return "Hỏi mình về học phí và ưu đãi trọn gói...";
    }
    return "Hỏi mình về khóa học, lộ trình...";
  }, [pageContext]);

  // One-time session greeting bubble after 6s
  useEffect(() => {
    if (typeof window === "undefined" || isOpen) return;

    const hasGreeted = sessionStorage.getItem("tinhocgenz_ai_greeted");
    if (hasGreeted) return;

    const timer1 = setTimeout(() => {
      setGreetingBubbleText("Chào bạn 👋");
      setShowGreetingBubble(true);
      sessionStorage.setItem("tinhocgenz_ai_greeted", "true");

      const timer2 = setTimeout(() => {
        setGreetingBubbleText("Mình có thể giúp bạn chọn khóa học phù hợp.");
      }, 1200);

      const hideTimer = setTimeout(() => {
        setShowGreetingBubble(false);
      }, 5500);

      return () => {
        clearTimeout(timer2);
        clearTimeout(hideTimer);
      };
    }, 6000);

    return () => clearTimeout(timer1);
  }, [isOpen]);

  // Keyboard support: Escape closes chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Send Message
  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputVal).trim();
    if (!textToSend || loading) return;

    setLastUserMessage(textToSend);
    setInputVal("");
    setShowGreetingBubble(false);

    const userMsgId = `u_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setMascotState("thinking");

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          conversationId,
          context,
          pageContext,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMascotState("typing");

        // Format assistant reply
        const botMsg: ChatMessage = {
          id: `a_${Date.now()}`,
          role: "assistant",
          content: data.reply || "Mình đã nhận được câu hỏi của bạn.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          quickReplies: data.quickReplies,
          roadmap: data.roadmap || data.roadmapData,
          recommendedCourse: data.recommendedCourse,
          isSuccessReaction: Boolean(data.recommendationReady || data.roadmap),
        };

        setMessages((prev) => [...prev, botMsg]);

        // Record turn in context
        recordTurn(data.intent, data.topic, data.level);

        // Success celebration if roadmap or course is recommended
        if (data.recommendationReady || data.roadmap) {
          transitionTemporarily("success", 2800);
        } else {
          setTimeout(() => {
            setMascotState(isOpen ? "opened" : "idle");
          }, 1400);
        }
      } else {
        throw new Error(data.error || "Lỗi API");
      }
    } catch {
      setMascotState("error");
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: "assistant",
        content: "Mình đang gặp một chút trục trặc. Bạn thử lại giúp mình nhé.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
        quickReplies: [
          { id: "retry", label: "Thử lại", value: textToSend },
          { id: "hotline", label: "Gọi hotline 033.229.8065", value: "Cho mình số hotline hỗ trợ trực tiếp" },
        ],
      };
      setMessages((prev) => [...prev, errorMsg]);
      setTimeout(() => {
        setMascotState(isOpen ? "opened" : "idle");
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  // Reset conversation
  const handleReset = async () => {
    setMascotState("greeting");
    setLoading(true);
    const newConvId = resetConversation();

    try {
      await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset: true, conversationId: newConvId }),
      });
    } catch {
      // Ignore network errors on reset
    } finally {
      setMessages([initialMessage]);
      setLoading(false);
      setTimeout(() => setMascotState(isOpen ? "opened" : "idle"), 1200);
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      triggerClick(() => setIsOpen(true));
    } else {
      setIsOpen(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    toggleChat,
    messages,
    loading,
    inputVal,
    setInputVal,
    mascotState,
    setMascotState,
    isClicking,
    reducedMotion,
    placeholder: getDynamicPlaceholder(),
    greetingBubbleText,
    showGreetingBubble,
    setShowGreetingBubble,
    handleSendMessage,
    handleReset,
    handleHoverStart,
    handleHoverEnd,
    lastUserMessage,
  };
}
