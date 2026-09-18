/**
 * Deterministic Next Question & Step Resolver
 * Inspects JourneyState, identifies missing slots, and resolves the next step.
 */

import { JourneyState, JourneyFlowDefinition } from "./journey-types";
import { JOURNEY_FLOWS, START_STEP } from "./journey-flows";

export interface ResolvedStep {
  stepId: string;
  slot?: string;
  question: string;
  quickReplies: { label: string; value: string }[];
  isCompleted: boolean;
  helpText?: string;
}

export const NextQuestionResolver = {
  /**
   * Retrieves array of required slots that are still missing in state
   */
  getMissingSlots(flowDef: JourneyFlowDefinition, state: JourneyState): string[] {
    return flowDef.requiredSlots.filter((slot) => {
      const val = state[slot];
      return val === undefined || val === null || val === "";
    });
  },

  /**
   * Resolves the deterministic next step based on state
   */
  resolveNextStep(state: JourneyState): ResolvedStep {
    // 1. If goal not yet selected -> START step
    if (!state.goal) {
      return {
        stepId: START_STEP.stepId,
        slot: START_STEP.slot,
        question: START_STEP.question,
        quickReplies: START_STEP.quickReplies,
        isCompleted: false,
      };
    }

    const flowDef = JOURNEY_FLOWS[state.goal];
    if (!flowDef) {
      return {
        stepId: START_STEP.stepId,
        slot: START_STEP.slot,
        question: START_STEP.question,
        quickReplies: START_STEP.quickReplies,
        isCompleted: false,
      };
    }

    // 2. Special Branch: MOS "unsure" subject -> Ask career to advise
    if (state.goal === "mos_certification" && state.targetSubject === "unsure" && !state.occupationOrNeed) {
      return {
        stepId: "MOS_UNSURE_ADVICE",
        slot: "occupationOrNeed",
        question: "Đối với chứng chỉ MOS: Ngành Kế toán/Tài chính/Kinh doanh thường thi Excel; Hành chính/Nhân sự thường thi Word; Marketing/Thuyết trình chọn PowerPoint. Bạn đang học ngành nào hoặc cần bằng nộp cho đơn vị nào để mình gợi ý môn thi chuẩn nhất?",
        quickReplies: [
          { label: "Ngành Kinh tế / Kế toán / Tài chính (Khuyên chọn Excel)", value: "excel" },
          { label: "Khối Hành chính / Văn phòng / Luật (Khuyên chọn Word)", value: "word" },
          { label: "Nhu cầu thuyết trình & Báo cáo (Khuyên chọn PowerPoint)", value: "powerpoint" },
          { label: "Thi trọn bộ MOS Master (Cả 3 môn)", value: "combo_all" },
        ],
        isCompleted: false,
      };
    }

    // 3. Find missing slots
    const missing = this.getMissingSlots(flowDef, state);

    // If no slots are missing, recommendation is ready!
    if (missing.length === 0) {
      state.recommendationReady = true;
      return {
        stepId: "RECOMMENDATION_READY",
        question: "Tuyệt vời! Mình đã thu thập đủ thông tin để lập lộ trình học tối ưu dành riêng cho bạn.",
        quickReplies: [
          { label: "Đăng ký tư vấn xếp lớp 1:1", value: "register_lead" },
          { label: "Hỏi thêm về học phí & ưu đãi", value: "ask_tuition" },
          { label: "Tìm hiểu phần mềm thi thử IIG", value: "ask_exam_software" },
        ],
        isCompleted: true,
      };
    }

    // 4. Resolve next question matching the first missing slot
    const nextSlot = missing[0];
    const matchingStep = flowDef.steps.find((s) => s.slot === nextSlot);

    if (matchingStep) {
      return {
        stepId: matchingStep.stepId,
        slot: matchingStep.slot,
        question: matchingStep.question,
        quickReplies: matchingStep.quickReplies,
        isCompleted: false,
        helpText: matchingStep.helpText,
      };
    }

    // Fallback if no matching step found
    return {
      stepId: "RECOMMENDATION_READY",
      question: "Tuyệt vời! Lộ trình đào tạo tối ưu của bạn đã sẵn sàng.",
      quickReplies: [
        { label: "Đăng ký tư vấn xếp lớp", value: "register_lead" },
        { label: "Chat Zalo với giảng viên", value: "chat_zalo" },
      ],
      isCompleted: true,
    };
  },
};
