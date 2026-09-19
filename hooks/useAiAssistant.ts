"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ChatMessage, ActionCard, CourseRecommendation } from "@/types/ai-assistant";
import { useConversationContext } from "./useConversationContext";
import { usePageContext } from "./usePageContext";
import { useMascotAnimation } from "./useMascotAnimation";
import { trackEvent } from "@/lib/analytics";

const PROACTIVE_BUBBLE_SESSION_KEY = "tinhocgenz_ai_bubble_dismissed";

export function useAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [proactiveBubbleVisible, setProactiveBubbleVisible] = useState(false);
  const [proactiveBubbleText, setProactiveBubbleText] = useState("");

  const pageContext = usePageContext();
  const {
    conversationId,
    context,
    recordTurn,
    resetConversation,
  } = useConversationContext();

  const {
    mascotState,
    setMascotState,
    handleHoverStart,
    handleHoverEnd,
    transitionTemporarily,
  } = useMascotAnimation({ isChatOpen: isOpen });

  // 1. Initial greeting tailored to Page Context (Section 10 & 22)
  const initialGreeting = useMemo<ChatMessage>(() => {
    let content = "Chào bạn! 👋\nMình là trợ lý học tập AI của Tin Học Gen Z.\nBạn muốn mình hỗ trợ gì?";
    let initialActions: ActionCard[] = [
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

    if (pageContext.pathname.startsWith("/python")) {
      content = "Chào bạn! 👋 Bạn đang xem khóa Python phải không?\nMình có thể giúp bạn xem khóa này có phù hợp với trình độ hiện tại không nhé.";
      initialActions = [
        {
          id: "py-beginner",
          icon: "🐍",
          title: "Chưa biết lập trình",
          subtitle: "Bắt đầu từ số 0, làm quen cú pháp",
          value: "Tôi chưa biết gì về lập trình, học Python có khó không?",
        },
        {
          id: "py-duration",
          icon: "⏱️",
          title: "Thời gian & Lịch học",
          subtitle: "Khóa Python học trong bao lâu?",
          value: "Khóa học Python kéo dài bao lâu và lịch thế nào?",
        },
      ];
    } else if (pageContext.pathname.startsWith("/excel")) {
      content = "Chào bạn! 👋 Bạn đang tìm hiểu Excel phải không?\nBạn muốn học từ đầu hay nâng cao kỹ năng đang có?";
      initialActions = [
        {
          id: "excel-zero",
          icon: "📊",
          title: "Học từ con số 0",
          subtitle: "Lấy lại căn bản và phím tắt thông dụng",
          value: "Mình mất gốc Excel, muốn học từ đầu",
        },
        {
          id: "excel-work",
          icon: "💼",
          title: "Excel thực chiến đi làm",
          subtitle: "Hàm nâng cao, PivotTable & Dashboard",
          value: "Mình cần khóa Excel thực chiến phục vụ công việc",
        },
      ];
    } else if (pageContext.pathname.startsWith("/mos")) {
      content = "Chào bạn! 👋 Bạn đang tìm hiểu chứng chỉ MOS quốc tế phải không?\nBạn cần chứng chỉ để ra trường hay đi làm?";
    }

    return {
      id: "initial_welcome",
      role: "assistant",
      content,
      timestamp: "Vừa xong",
      actionCards: initialActions,
    };
  }, [pageContext.pathname]);

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  // 2. Dynamic Input Placeholder based on Page Context (Section 12 & 22)
  const placeholder = useMemo(() => {
    if (pageContext.pathname.startsWith("/python")) {
      return "Hỏi mình về khóa Python này...";
    }
    if (pageContext.pathname.startsWith("/excel")) {
      return "Hỏi mình về Excel...";
    }
    if (pageContext.pathname.startsWith("/mos")) {
      return "Hỏi mình về chứng chỉ MOS...";
    }
    if (pageContext.pathname.startsWith("/ic3")) {
      return "Hỏi mình về chứng chỉ IC3 GS6...";
    }
    return "Hỏi mình về Word, Excel, Python, AI...";
  }, [pageContext.pathname]);

  // 3. Proactive speech bubble: 7–10 seconds after page load when closed (Section 20 & 21)
  useEffect(() => {
    if (isOpen || typeof window === "undefined") return;

    const isDismissed = sessionStorage.getItem(PROACTIVE_BUBBLE_SESSION_KEY);
    if (isDismissed) return;

    let text = "Chào bạn 👋\nBạn đang tìm khóa học gì vậy?";
    if (pageContext.pathname.startsWith("/python")) {
      text = "Bạn đang xem Python phải không?\nMình tư vấn lộ trình nhé 👋";
    } else if (pageContext.pathname.startsWith("/excel")) {
      text = "Bạn đang tìm khóa Excel đi làm?\nMình gợi ý lộ trình nhé 👋";
    }

    const timer = setTimeout(() => {
      setProactiveBubbleText(text);
      setProactiveBubbleVisible(true);

      // Auto-hide in 4.5 seconds
      const hideTimer = setTimeout(() => {
        setProactiveBubbleVisible(false);
      }, 4500);

      return () => clearTimeout(hideTimer);
    }, 8000);

    return () => clearTimeout(timer);
  }, [isOpen, pageContext.pathname]);

  const handleDismissBubble = useCallback(() => {
    setProactiveBubbleVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(PROACTIVE_BUBBLE_SESSION_KEY, "true");
    }
  }, []);

  // 4. Open / Close / Toggle Chat
  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setProactiveBubbleVisible(false);
        trackEvent("ai_launcher_opened", { page: pageContext.pathname });
      } else {
        trackEvent("ai_chat_closed", { page: pageContext.pathname });
      }
      return next;
    });
  }, [pageContext.pathname]);

  const handleOpenChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setProactiveBubbleVisible(false);
    trackEvent("ai_launcher_opened", { page: pageContext.pathname });
  }, [pageContext.pathname]);

  const handleCloseChat = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
    trackEvent("ai_chat_closed", { page: pageContext.pathname });
  }, [pageContext.pathname]);

  // 5. Send Message Handler
  const handleSendMessage = useCallback(
    async (customText?: string) => {
      const textToSend = (customText || inputVal).trim();
      if (!textToSend || loading) return;

      setInputVal("");
      setProactiveBubbleVisible(false);

      // User Message
      const userMsg: ChatMessage = {
        id: `u_${Date.now()}`,
        role: "user",
        content: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      setMascotState("thinking");
      trackEvent("ai_message_sent", { text_length: textToSend.length });

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
          // Normalize Course Recommendation if present
          let courseRec: CourseRecommendation | undefined;
          if (data.recommendedCourse) {
            courseRec = {
              id: data.recommendedCourse.id || "course_rec",
              title: data.recommendedCourse.title || "Khóa học phù hợp",
              levelOrFormat: data.recommendedCourse.level || "Cơ bản • Thực hành",
              reason: data.recommendedCourse.reason || "Phù hợp với mục tiêu bạn vừa chia sẻ.",
              href: data.recommendedCourse.url || "/khoa-hoc",
              price: data.recommendedCourse.price,
              schedule: data.recommendedCourse.schedule,
            };
            trackEvent("ai_course_recommended", { course_id: courseRec.id });
          }

          const botMsg: ChatMessage = {
            id: `a_${Date.now()}`,
            role: "assistant",
            content: data.reply || "Mình đã nhận được thông tin từ bạn.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            quickReplies: data.quickReplies,
            roadmap: data.roadmap || data.roadmapData,
            recommendedCourse: courseRec,
          };

          setMessages((prev) => [...prev, botMsg]);
          recordTurn(data.intent, data.topic, data.level, data.currentCourse);

          // Success subtle feedback (Section 32: 1 -> 1.02 -> 1, no confetti)
          if (data.recommendationReady || courseRec) {
            transitionTemporarily("success", 1200);
          } else {
            setMascotState(isOpen ? "opened" : "idle");
          }
        } else {
          throw new Error(data.error || "Lỗi phản hồi");
        }
      } catch {
        // Section 33: Graceful user-friendly error without technical stack trace
        setMascotState("error");
        const errorMsg: ChatMessage = {
          id: `err_${Date.now()}`,
          role: "assistant",
          content: "Mình đang gặp một chút trục trặc kết nối. Bạn thử lại giúp mình nhé.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true,
          actionCards: [
            {
              id: "retry",
              icon: "🔄",
              title: "Thử lại câu vừa rồi",
              subtitle: textToSend,
              value: textToSend,
            },
          ],
        };
        setMessages((prev) => [...prev, errorMsg]);
        setTimeout(() => {
          setMascotState(isOpen ? "opened" : "idle");
        }, 1800);
      } finally {
        setLoading(false);
      }
    },
    [
      inputVal,
      loading,
      conversationId,
      context,
      pageContext,
      isOpen,
      setMascotState,
      recordTurn,
      transitionTemporarily,
    ]
  );

  // 6. Reset Conversation Handler
  const handleReset = useCallback(async () => {
    resetConversation();
    setMessages([initialGreeting]);
    setMascotState("idle");
    try {
      await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, reset: true }),
      });
    } catch {
      // Ignore
    }
  }, [conversationId, initialGreeting, resetConversation, setMascotState]);

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    toggleChat,
    handleOpenChat,
    handleCloseChat,
    messages,
    loading,
    inputVal,
    setInputVal,
    placeholder,
    mascotState,
    proactiveBubbleVisible,
    proactiveBubbleText,
    handleDismissBubble,
    handleSendMessage,
    handleReset,
    handleHoverStart,
    handleHoverEnd,
  };
}
