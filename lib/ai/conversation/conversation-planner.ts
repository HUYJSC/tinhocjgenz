/**
 * Master Conversation Planner
 * Orchestrates deterministic journey state transitions, slot filling,
 * contextual guidance, and roadmap generation.
 */

import { JourneyStateManager } from "./journey-state";
import { AnswerParser } from "./answer-parser";
import { NextQuestionResolver } from "./next-question-resolver";
import { ConversationTurnResult, JourneySlots } from "./journey-types";
import { AiRagService, PathwayCriteria } from "@/lib/ai-rag-service";

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
      goal: state.goal === "mos_certification"
        ? "Thi chứng chỉ MOS"
        : state.goal === "ic3_certification"
        ? "Thi chứng chỉ IC3 GS6"
        : state.goal === "practical_excel"
        ? "Học Excel thực chiến đi làm"
        : "Tin học văn phòng toàn diện",
      level: state.currentLevel === "beginner_zero"
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
  }): Promise<ConversationTurnResult> {
    const { conversationId, userMessage } = params;

    // 1. Get or create journey state
    const state = JourneyStateManager.getOrCreate(conversationId);

    // 2. Parse user message
    const parsed = AnswerParser.parseMessage(userMessage);

    // 3. If goal switched mid-conversation
    if (parsed.goalSwitched && parsed.slots.goal) {
      JourneyStateManager.switchGoal(state, parsed.slots.goal);
    }

    // 4. Apply newly extracted slots
    JourneyStateManager.applySlots(state, parsed.slots);

    // 5. If user message contained no valid slots and wasn't a reset command
    const hasNewSlots = Object.keys(parsed.slots).length > 0;

    // 6. Resolve next step deterministically
    const nextStep = NextQuestionResolver.resolveNextStep(state);
    state.currentStep = nextStep.stepId;

    // 7. Check if recommendation is ready
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

    // 8. In-progress turn: Formulate conversational response
    JourneyStateManager.save(state);

    let prefix = "";
    if (hasNewSlots) {
      prefix = this.getAcknowledgement(parsed.slots);
    } else {
      // Contextual fallback: guide user back without dumb generic response
      prefix = "Để mình có thể tư vấn chính xác nhất lộ trình học và học phí cho bạn:\n";
    }

    const reply = `${prefix}${nextStep.question}`;

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
      mascotState: "speaking",
      recommendationReady: false,
    };
  },
};
