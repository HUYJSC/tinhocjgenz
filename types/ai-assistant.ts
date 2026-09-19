/**
 * AI Learning Assistant Type Definitions
 * Strict contracts for Mascot States, User Intents, Conversation Context, and Page Context.
 */

import { RoadmapResult } from "@/lib/ai-rag-service";

export type MascotState =
  | "idle"
  | "hover"
  | "greeting"
  | "opened"
  | "thinking"
  | "typing"
  | "speaking"
  | "success"
  | "newMessage"
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
  currentLevel?: "zero" | "beginner" | "intermediate" | "advanced";
  interestedTopics: string[];
  preferredSchedule?: string;
  preferredLearningMode?: string;
  budget?: string;
  recommendedCourses: string[];
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

export interface QuickReplyAction {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  icon?: string;
}

export interface CourseCardRecommendation {
  id: string;
  title: string;
  level: string;
  duration: string;
  schedule?: string;
  price?: string;
  tagline?: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "user" | "system";
  content: string;
  timestamp: string;
  quickReplies?: (string | QuickReplyAction)[];
  roadmap?: RoadmapResult;
  recommendedCourse?: CourseCardRecommendation;
  isError?: boolean;
  isSuccessReaction?: boolean;
}

export interface AiAssistantConfig {
  greetingDelayMs?: number; // 5000-8000ms
  hoverDelayMs?: number; // 500-700ms
  bubbleDurationMs?: number; // 4000-6000ms
  enableStreaming?: boolean;
}
