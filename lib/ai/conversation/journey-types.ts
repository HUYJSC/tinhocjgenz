/**
 * Core Types for AI Conversation Planner & Journey State Machine
 */

export type JourneyGoal =
  | "mos_certification"
  | "ic3_certification"
  | "practical_excel"
  | "office_comprehensive";

export type CurrentLevel =
  | "beginner_zero"      // Mới bắt đầu / Mất gốc từ số 0
  | "basic_elementary"   // Đã biết gõ phím / tính toán cơ bản
  | "intermediate_adv";  // Đã thành thạo, muốn học chuyên sâu

export type TargetSubject =
  | "excel"
  | "word"
  | "powerpoint"
  | "combo_all"
  | "unsure";

export type TargetDate =
  | "within_1_month"
  | "1_3_months"
  | "3_6_months"
  | "flexible";

export type StudyTimePerWeek =
  | "under_3h"
  | "3_5h"
  | "5_8h"
  | "over_8h";

export interface QuickReplyOption {
  label: string;
  value: string;
}

export interface JourneySlots {
  goal?: JourneyGoal;
  currentLevel?: CurrentLevel | string;
  targetSubject?: TargetSubject | string;
  targetDate?: TargetDate | string;
  studyTimePerWeek?: StudyTimePerWeek | string;
  occupationOrNeed?: string;
  requiredSkills?: string[];
  ic3Experience?: "learned_before" | "never_learned";
  ic3Scope?: "all_gs6" | "single_level";
}

export interface JourneyState extends JourneySlots {
  conversationId: string;
  flow: "start" | JourneyGoal;
  currentStep: string;
  recommendationReady: boolean;
  progress: number; // 0 to 100
  updatedAt: number;
}

export interface StepDefinition {
  stepId: string;
  slot: keyof JourneySlots;
  question: string;
  quickReplies: QuickReplyOption[];
  helpText?: string;
}

export interface JourneyFlowDefinition {
  flowId: JourneyGoal;
  title: string;
  requiredSlots: (keyof JourneySlots)[];
  steps: StepDefinition[];
}

export interface ConversationTurnResult {
  conversationId: string;
  reply: string;
  journey: {
    flow: string;
    step: string;
    progress: number;
    slots: JourneySlots;
  };
  quickReplies: QuickReplyOption[];
  mascotState: "idle" | "listening" | "thinking" | "speaking" | "success" | "error";
  recommendationReady: boolean;
  roadmapData?: Record<string, unknown>;
}

