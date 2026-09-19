/**
 * AI Learning Assistant Type Definitions
 * Strict contracts for Mascot States, User Intents, Conversation Context, and Page Context.
 */

import { RoadmapResult } from "@/lib/ai-rag-service";

export type MascotState =
  | "idle"
  | "hover"
  | "active"
  | "thinking"
  | "newMessage"
  | "greeting"
  | "opened"
  | "typing"
  | "speaking"
  | "success"
  | "error"
  | "sleeping";

export type UserIntent =
  | "COURSE_DISCOVERY"
  | "LEARNING_PATH"
  | "COURSE_DETAILS"
  | "SCHEDULE"
  | "PRICE"
  | "LEVEL_ASSESSMENT"
  | "OFFICE_SKILLS"
  | "EXCEL"
  | "WORD"
  | "POWERPOINT"
  | "PROGRAMMING"
  | "PYTHON"
  | "WEB_DEVELOPMENT"
  | "AI_TOOLS"
  | "DIGITAL_SKILLS"
  | "CERTIFICATION"
  | "ACCOUNT_SUPPORT"
  | "GENERAL_CHAT"
  | "UNKNOWN";

export interface ConversationContext {
  goal?: string;
  currentLevel?: "zero" | "beginner" | "intermediate" | "advanced" | string;
  interestedTopics: string[];
  preferredSchedule?: string;
  preferredLearningMode?: string;
  budget?: string;
  recommendedCourses: string[];
  currentCourse?: string;
  lastIntent?: UserIntent;
  lastTopic?: string;
  lastQuestionAsked?: string;
  turnCount: number;
}

export interface PageContext {
  pageType: "home" | "course" | "exam" | "roadmap" | "docs" | "pricing" | "about" | "other";
  pathname: string;
  courseId?: string;
  courseName?: string;
  category?: string;
}

export interface ActionCard {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  value: string;
}

export interface QuickReplyAction {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  icon?: string;
}

export interface CourseRecommendation {
  id: string;
  title: string;
  levelOrFormat: string;
  reason: string;
  href: string;
  price?: string;
  schedule?: string;
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "user" | "system";
  content: string;
  timestamp: string;
  actionCards?: ActionCard[];
  quickReplies?: (string | QuickReplyAction)[];
  roadmap?: RoadmapResult;
  recommendedCourse?: CourseRecommendation;
  isError?: boolean;
  isSuccessReaction?: boolean;
}

export interface AiAssistantConfig {
  greetingDelayMs?: number; // 7000-10000ms
  hoverDelayMs?: number; // 500-700ms
  bubbleDurationMs?: number; // 4000-5000ms
  enableStreaming?: boolean;
}
