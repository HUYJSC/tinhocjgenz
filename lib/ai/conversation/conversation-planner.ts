/**
 * Master Conversation Planner
 * Orchestrates deterministic journey state transitions, slot filling,
 * conversational intent routing, contextual guidance, and roadmap generation.
 */

import { JourneyStateManager } from "./journey-state";
import { AnswerParser } from "./answer-parser";
import { NextQuestionResolver } from "./next-question-resolver";
import { ConversationTurnResult, JourneyGoal, JourneySlots } from "./journey-types";
import { AiRagService, PathwayCriteria } from "@/lib/ai-rag-service";
import { IntentRouter } from "./intent-router";
import { ResponseComposer } from "./response-composer";

import { ConversationContext, PageContext } from "@/types/ai-assistant";

export const ConversationPlanner = {
  /**
   * Generates a warm conversational acknowledgment for filled slots
   */
  getAcknowledgement(slots: Partial<JourneySlots>): string {
    const parts: string[] = [];

    if (slots.goal) {
      if (slots.goal === "mos_certification") parts.push("Mục tiêu: Thi chứng chỉ quốc tế MOS");
      else if (slots.goal === "ic3_certification") parts.push("Mục tiêu: Thi chứng chỉ quốc tế IC3 GS6");
      else if (slots.goal === "practical_excel") parts.push("Mục tiêu: Thực chiến Excel chuyên sâu đi làm");
      else if (slots.goal === "office_comprehensive") parts.push("Mục tiêu: Thành thạo Tin học văn phòng toàn diện");
    }

    if (slots.currentLevel) {
      if (slots.currentLevel === "beginner_zero") {
        parts.push("Trình độ: Mới bắt đầu từ số 0 (áp dụng kèm 1:1 cầm tay chỉ việc)");
      } else if (slots.currentLevel === "basic_elementary") {
        parts.push("Trình độ: Đã có nền tảng thao tác cơ bản");
      } else if (slots.currentLevel === "intermediate_adv") {
        parts.push("Trình độ: Khá / Muốn học chuyên sâu luyện đề điểm tối đa");
      }
    }

    if (slots.targetSubject) {
      if (slots.targetSubject === "excel") parts.push("Môn học: MOS Excel");
      else if (slots.targetSubject === "word") parts.push("Môn học: MOS Word");
      else if (slots.targetSubject === "powerpoint") parts.push("Môn học: MOS PowerPoint");
      else if (slots.targetSubject === "combo_all") parts.push("Môn học: Trọn bộ MOS Master");
    }

    if (slots.targetDate) {
      if (slots.targetDate === "within_1_month") parts.push("Thời hạn: Cấp tốc trong 1 tháng");
      else if (slots.targetDate === "1_3_months") parts.push("Thời hạn: 1 - 3 tháng");
      else if (slots.targetDate === "3_6_months") parts.push("Thời hạn: 3 - 6 tháng");
      else if (slots.targetDate === "flexible") parts.push("Thời hạn: Linh hoạt");
    }

    if (slots.studyTimePerWeek) {
      if (slots.studyTimePerWeek === "under_3h") parts.push("Thời gian: Dưới 3 giờ/tuần");
      else if (slots.studyTimePerWeek === "3_5h") parts.push("Thời gian: 3 - 5 giờ/tuần (2-3 buổi tối)");
      else if (slots.studyTimePerWeek === "5_8h") parts.push("Thời gian: 5 - 8 giờ/tuần");
      else if (slots.studyTimePerWeek === "over_8h") parts.push("Thời gian: Trên 8 giờ/tuần");
    }

    if (parts.length > 0) {
      return `Đã ghi nhận: ${parts.join(" • ")}.\n\n`;
    }
    return "";
  },

  /**
   * Translates JourneyState to PathwayCriteria for the RAG engine
   */
  toPathwayCriteria(state: JourneySlots): PathwayCriteria {
    return {
      goal:
        state.goal === "mos_certification"
          ? "Thi chứng chỉ MOS"
          : state.goal === "ic3_certification"
          ? "Thi chứng chỉ IC3 GS6"
          : state.goal === "practical_excel"
          ? "Học Excel thực chiến đi làm"
          : "Tin học văn phòng toàn diện",
      level:
        state.currentLevel === "beginner_zero"
          ? "Mất gốc / Số 0"
          : state.currentLevel === "basic_elementary"
          ? "Cơ bản"
          : "Nâng cao / Chuyên sâu",
      domain: (state.targetSubject as string) || (state.goal?.includes("excel") ? "Excel" : "Tổng hợp"),
      timeline: state.targetDate === "within_1_month" ? "Cấp tốc 1 tháng" : "1 - 3 tháng",
      timePerWeek: state.studyTimePerWeek === "3_5h" ? "3 - 5 giờ/tuần" : "Linh hoạt",
    };
  },

  /**
   * Master turn execution function
   */
  async planTurn(params: {
    conversationId: string;
    userMessage: string;
    context?: Partial<ConversationContext>;
    pageContext?: Partial<PageContext>;
  }): Promise<ConversationTurnResult> {
    const { conversationId, userMessage, context, pageContext } = params;

    // 1. Get or create journey state
    const state = JourneyStateManager.getOrCreate(conversationId);

    // Contextual hints: If state slots are not yet set, enrich from context / pageContext
    if (pageContext?.category && !state.goal) {
      const cat = pageContext.category.toLowerCase();
      if (cat.includes("mos")) state.goal = "mos_certification";
      else if (cat.includes("ic3")) state.goal = "ic3_certification";
      else if (cat.includes("excel")) state.goal = "practical_excel";
    }
    if (context?.goal && !state.goal) {
      if (
        context.goal === "mos_certification" ||
        context.goal === "ic3_certification" ||
        context.goal === "practical_excel" ||
        context.goal === "office_comprehensive"
      ) {
        state.goal = context.goal;
      }
    }
    if (context?.currentLevel && !state.currentLevel) {
      if (context.currentLevel === "zero") state.currentLevel = "beginner_zero";
      else if (context.currentLevel === "beginner") state.currentLevel = "basic_elementary";
      else if (context.currentLevel === "intermediate" || context.currentLevel === "advanced")
        state.currentLevel = "intermediate_adv";
    }

    // 2. Classify intent via IntentRouter
    const intentRes = IntentRouter.classify(userMessage, state);

    // 3. Special action quick reply clicks
    const normMsg = userMessage.trim().toLowerCase();
    if (normMsg === "continue_journey" || normMsg.includes("tiếp tục tự xếp lộ trình")) {
      const nextStep = NextQuestionResolver.resolveNextStep(state);
      return {
        conversationId,
        reply: `Dạ được chứ 😄 Mình tiếp tục nhé:\n\n${nextStep.question}`,
        journey: {
          flow: state.flow,
          step: state.currentStep,
          progress: state.progress,
          slots: { ...state },
        },
        quickReplies: nextStep.quickReplies,
        mascotState: "speaking",
        recommendationReady: false,
      };
    }

    if (normMsg === "chat_zalo") {
      return {
        conversationId,
        reply:
          "Bạn có thể nhắn tin trực tiếp với chuyên viên đào tạo của Tin Học Gen Z qua Zalo để được giải đáp 1:1 mọi thắc mắc nhé:\n👉 Zalo Chuyên viên: https://zalo.me/0332298065 (Hotline 033.229.8065)",
        journey: {
          flow: state.flow,
          step: state.currentStep,
          progress: state.progress,
          slots: { ...state },
        },
        quickReplies: [
          { label: "Tiếp tục tự xếp lộ trình AI", value: "continue_journey" },
          { label: "Đăng ký nhận tư vấn 1:1", value: "register_lead" },
        ],
        mascotState: "speaking",
        recommendationReady: false,
        action: "open_zalo",
      };
    }

    if (normMsg === "call_hotline") {
      return {
        conversationId,
        reply:
          "Số Hotline tư vấn và hỗ trợ học viên 24/7 của Tin Học Gen Z là:\n📞 **033.229.8065**\n\nBạn có thể gọi trực tiếp hoặc để lại số điện thoại để trung tâm liên hệ lại hỗ trợ nhé!",
        journey: {
          flow: state.flow,
          step: state.currentStep,
          progress: state.progress,
          slots: { ...state },
        },
        quickReplies: [
          { label: "Đăng ký nhận tư vấn 1:1", value: "register_lead" },
          { label: "Tiếp tục tự xếp lộ trình AI", value: "continue_journey" },
        ],
        mascotState: "speaking",
        recommendationReady: false,
      };
    }

    if (normMsg === "register_lead") {
      return {
        conversationId,
        reply:
          "Bạn vui lòng để lại thông tin liên hệ (Họ tên & Số điện thoại) bên dưới để chuyên viên liên hệ tư vấn chi tiết lịch học và ưu đãi học phí dành riêng cho bạn nhé!",
        journey: {
          flow: state.flow,
          step: state.currentStep,
          progress: state.progress,
          slots: { ...state },
        },
        quickReplies: [
          { label: "Tiếp tục tự xếp lộ trình AI", value: "continue_journey" },
        ],
        mascotState: "speaking",
        recommendationReady: false,
        action: "show_lead_modal",
      };
    }

    // 4. Case: Goal Switch Intent
    if (intentRes.intent === "change_goal") {
      const targetGoal = (intentRes.subType ||
        AnswerParser.detectGoal(userMessage).goal) as JourneyGoal;

      if (targetGoal) {
        JourneyStateManager.switchGoal(state, targetGoal);
      }

      // Check if user also provided other slots in the same message
      const auxSlots = AnswerParser.parseMessage(userMessage);
      JourneyStateManager.applySlots(state, auxSlots.slots);

      const nextStep = NextQuestionResolver.resolveNextStep(state);
      state.currentStep = nextStep.stepId;
      JourneyStateManager.save(state);

      const ack = this.getAcknowledgement(state);
      return {
        conversationId,
        reply: `${ack}${nextStep.question}`,
        journey: {
          flow: state.flow,
          step: state.currentStep,
          progress: state.progress,
          slots: { ...state },
        },
        quickReplies: nextStep.quickReplies,
        mascotState: "speaking",
        recommendationReady: false,
      };
    }

    // 5. Case: Journey Answer Intent (Explicit slots or quick reply answer)
    if (intentRes.intent === "journey_answer") {
      const parsed = AnswerParser.parseMessage(userMessage);

      // Apply slots
      JourneyStateManager.applySlots(state, parsed.slots);

      // Resolve next step deterministically
      const nextStep = NextQuestionResolver.resolveNextStep(state);
      state.currentStep = nextStep.stepId;

      // Check if recommendation is ready
      if (nextStep.isCompleted || state.recommendationReady) {
        state.recommendationReady = true;
        JourneyStateManager.save(state);

        const criteria = this.toPathwayCriteria(state);
        const roadmapData = AiRagService.generateRoadmap(criteria);

        const ack = this.getAcknowledgement(state);
        const reply = `${ack}🎉 Tuyệt vời! Dựa trên toàn bộ mục tiêu và điều kiện học của bạn, mình đã thiết kế lộ trình đào tạo tối ưu nhất bên dưới.\n\nKhóa học được cam kết bao đỗ 100% tại Certiport/IIG với chính sách học lại hoàn toàn miễn phí 0đ và tặng kèm tài khoản phần mềm luyện thi bản quyền!`;

        return {
          conversationId,
          reply,
          journey: {
            flow: state.flow,
            step: state.currentStep,
            progress: 100,
            slots: { ...state },
          },
          quickReplies: nextStep.quickReplies,
          mascotState: "success",
          recommendationReady: true,
          roadmapData: roadmapData as unknown as Record<string, unknown>,
        };
      }

      // In-progress turn: Formulate conversational response
      JourneyStateManager.save(state);

      const ack = this.getAcknowledgement(parsed.slots);
      const reply = `${ack}${nextStep.question}`;

      return {
        conversationId,
        reply,
        journey: {
          flow: state.flow,
          step: state.currentStep,
          progress: state.progress,
          slots: { ...state },
        },
        quickReplies: nextStep.quickReplies,
        mascotState: "speaking",
        recommendationReady: false,
      };
    }

    // 6. Case: Conversational Intents (Small talk, Greeting, Thanks, FAQ, Fear, Bot Identity, Off-topic, etc.)
    // Check if the user also included any slot in the message (e.g. "Thi có khó không? Tôi mới bắt đầu từ số 0")
    const embeddedSlots = AnswerParser.parseMessage(userMessage);
    const hasEmbeddedSlots = Object.keys(embeddedSlots.slots).length > 0;
    if (hasEmbeddedSlots) {
      JourneyStateManager.applySlots(state, embeddedSlots.slots);
      const stepCheck = NextQuestionResolver.resolveNextStep(state);
      state.currentStep = stepCheck.stepId;
    }

    // Compose natural response without losing journey
    const composed = ResponseComposer.compose(intentRes, state);
    JourneyStateManager.save(state);

    return {
      conversationId,
      reply: composed.reply,
      journey: {
        flow: state.flow,
        step: state.currentStep,
        progress: state.progress,
        slots: { ...state },
      },
      quickReplies: composed.quickReplies || [],
      mascotState: composed.mascotState,
      recommendationReady: state.recommendationReady,
      action: composed.action,
    };
  },

  /**
   * Resets journey state for a conversation
   */
  reset(conversationId: string): ConversationTurnResult {
    const state = JourneyStateManager.resetJourney(conversationId);
    const nextStep = NextQuestionResolver.resolveNextStep(state);

    return {
      conversationId,
      reply: nextStep.question,
      journey: {
        flow: state.flow,
        step: state.currentStep,
        progress: 10,
        slots: { ...state },
      },
      quickReplies: nextStep.quickReplies,
      mascotState: "greeting",
      recommendationReady: false,
    };
  },
};
