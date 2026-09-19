/**
 * Intent Router for AI Chatbot
 * Accurately classifies user messages into distinct intents before processing,
 * preventing small talk or inquiries from being misidentified as journey answers.
 */

import { JourneyState } from "./journey-types";
import { AnswerParser } from "./answer-parser";

export type UserIntent =
  | "journey_answer"
  | "small_talk"
  | "greeting"
  | "thanks"
  | "bot_identity"
  | "faq"
  | "knowledge_question"
  | "account_question"
  | "human_handoff"
  | "change_goal"
  | "fear_uncertainty"
  | "clarification"
  | "off_topic"
  | "unknown";

export interface ClassifiedIntentResult {
  intent: UserIntent;
  confidence: number;
  subType?: string;
  userMessage: string;
}

export const IntentRouter = {
  /**
   * Normalizes text for intent matching
   */
  normalize(text: string): string {
    return AnswerParser.normalize(text);
  },

  /**
   * Classifies user input considering current conversation journey state
   */
  classify(rawMessage: string, state?: JourneyState): ClassifiedIntentResult {
    const text = rawMessage.trim();
    const norm = this.normalize(text);

    // 1. Exact Quick Reply Click Check
    // If the message is an exact match for a predefined quick reply option,
    // it's definitively a journey answer.
    const qrMatch = AnswerParser.matchQuickReply(text);
    if (qrMatch) {
      if (qrMatch.goal && state && state.flow && qrMatch.goal !== state.flow) {
        return { intent: "change_goal", confidence: 1.0, userMessage: text };
      }
      return { intent: "journey_answer", confidence: 1.0, userMessage: text };
    }

    // 2. Goal Switching Intent
    const goalRes = AnswerParser.detectGoal(text);
    if (goalRes.isSwitch || (goalRes.goal && state?.flow && goalRes.goal !== state.flow)) {
      return {
        intent: "change_goal",
        confidence: 0.95,
        subType: goalRes.goal,
        userMessage: text,
      };
    }

    // 3. Human Handoff / Contact Real Person
    if (
      norm.includes("gap nguoi that") ||
      norm.includes("gap tu van vien") ||
      norm.includes("co nguoi that khong") ||
      norm.includes("tu van vien") ||
      norm.includes("chuyen vien") ||
      norm.includes("gap ad") ||
      norm.includes("cho minh gap") ||
      norm.includes("chat zalo") ||
      norm.includes("qua zalo") ||
      norm.includes("goi dien") ||
      norm.includes("goi cho toi") ||
      norm.includes("hotline") ||
      norm.includes("so dien thoai") ||
      norm.includes("lien he truc tiep")
    ) {
      return { intent: "human_handoff", confidence: 0.95, userMessage: text };
    }

    // 4. Greeting
    if (
      norm === "chao" ||
      norm === "chao ban" ||
      norm === "chao ad" ||
      norm === "chao bot" ||
      norm === "hello" ||
      norm === "hi" ||
      norm === "hi ban" ||
      norm === "alo" ||
      norm === "alo ad" ||
      norm === "chao em" ||
      norm.startsWith("chao ban") ||
      norm.startsWith("xin chao") ||
      norm.startsWith("hello") ||
      norm.startsWith("hi ")
    ) {
      return { intent: "greeting", confidence: 0.95, userMessage: text };
    }

    // 4b. Duration Query ("học bao lâu", "mất bao lâu", "thời gian học")
    if (
      norm.includes("bao lau") ||
      norm.includes("hoc bao lau") ||
      norm.includes("mat bao lau") ||
      norm.includes("thoi gian hoc") ||
      norm.includes("may buoi") ||
      norm.includes("may thang") ||
      norm.includes("may tuan") ||
      norm.includes("keo dai bao lau")
    ) {
      return { intent: "faq", subType: "duration_query", confidence: 0.95, userMessage: text };
    }

    // 4c. Level statement ("tui chưa biết gì", "mất gốc", "mới bắt đầu")
    if (
      norm.includes("chua biet gi") ||
      norm.includes("chua hoc bao gio") ||
      norm.includes("mat goc") ||
      norm.includes("so 0") ||
      norm.includes("con so 0") ||
      norm.includes("moi bat dau") ||
      norm.includes("nguoi moi")
    ) {
      return { intent: "journey_answer", subType: "beginner_level", confidence: 0.95, userMessage: text };
    }

    // 4d. Specific Course: Python
    if (
      norm.includes("hoc python") ||
      norm.includes("lap trinh python") ||
      norm === "python" ||
      norm.startsWith("python")
    ) {
      return { intent: "knowledge_question", subType: "python_starter", confidence: 0.95, userMessage: text };
    }

    // 4e. Specific Course: Web Development ("còn web", "học web")
    if (
      norm.includes("con web") ||
      norm.includes("hoc web") ||
      norm.includes("lap trinh web") ||
      norm.includes("lam website") ||
      norm.includes("front end") ||
      norm.includes("html css")
    ) {
      return { intent: "knowledge_question", subType: "web_development", confidence: 0.95, userMessage: text };
    }

    // 4f. Specific Domain: Excel
    if (
      norm.includes("hoc excel") ||
      norm.includes("excel thuc chien") ||
      norm.includes("tui muon hoc excel") ||
      norm.includes("muon hoc excel") ||
      norm === "excel"
    ) {
      return { intent: "knowledge_question", subType: "excel_skills", confidence: 0.95, userMessage: text };
    }

    // 4g. Specific Domain: Word / PowerPoint / Office general
    if (
      norm.includes("hoc word") ||
      norm.includes("hoc powerpoint") ||
      norm.includes("tin hoc van phong") ||
      norm.includes("tin hoc can ban")
    ) {
      return { intent: "knowledge_question", subType: "office_general", confidence: 0.95, userMessage: text };
    }

    // 4h. Specific Domain: AI Tools
    if (
      norm.includes("hoc ai") ||
      norm.includes("ung dung ai") ||
      norm.includes("chatgpt") ||
      norm.includes("cong cu ai")
    ) {
      return { intent: "knowledge_question", subType: "ai_skills", confidence: 0.95, userMessage: text };
    }

    // 5. Bot Identity
    if (
      norm.includes("ban la ai") ||
      norm.includes("ban ten gi") ||
      norm.includes("ten gi") ||
      norm.includes("ai tao ra ban") ||
      norm.includes("ban lam duoc gi") ||
      norm.includes("chuc nang cua ban") ||
      norm.includes("bot a") ||
      norm.includes("la nguoi hay bot") ||
      norm.includes("la bot dung khong")
    ) {
      return { intent: "bot_identity", confidence: 0.95, userMessage: text };
    }

    // 6. Gratitude / Thanks
    if (
      norm === "cam on" ||
      norm === "cam on nha" ||
      norm === "cam on ban" ||
      norm === "cam on ad" ||
      norm === "thank you" ||
      norm === "thanks" ||
      norm === "thank" ||
      norm.startsWith("cam on") ||
      norm.startsWith("thanks")
    ) {
      return { intent: "thanks", confidence: 0.95, userMessage: text };
    }

    // 7. Emotional / Uncertainty / Fear of failing
    if (
      norm.includes("kho khong") ||
      norm.includes("co kho khong") ||
      norm.includes("so thi") ||
      norm.includes("so rot") ||
      norm.includes("so truot") ||
      norm.includes("so khong dau") ||
      norm.includes("so khong lam duoc") ||
      norm.includes("so khong hoc duoc") ||
      norm.includes("hoc co kip khong") ||
      norm.includes("co kho lam khong") ||
      norm.includes("kho lam khong") ||
      norm.includes("co de khong") ||
      norm.includes("mat goc co hoc duoc khong") ||
      norm.includes("chua biet gi co hoc duoc khong")
    ) {
      return { intent: "fear_uncertainty", confidence: 0.9, userMessage: text };
    }

    // 8. FAQ / Knowledge Questions (Specific education queries)
    // 8a. MOS definition
    if (
      norm.includes("mos la gi") ||
      norm.includes("chung chi mos la gi") ||
      norm.includes("bang mos la gi") ||
      norm.includes("y nghia cua mos") ||
      norm.includes("tim hieu ve mos")
    ) {
      return {
        intent: "knowledge_question",
        subType: "mos_overview",
        confidence: 0.95,
        userMessage: text,
      };
    }

    // 8b. IC3 definition
    if (
      norm.includes("ic3 la gi") ||
      norm.includes("chung chi ic3 la gi") ||
      norm.includes("ic3 gs6 la gi") ||
      norm.includes("tim hieu ve ic3")
    ) {
      return {
        intent: "knowledge_question",
        subType: "ic3_overview",
        confidence: 0.95,
        userMessage: text,
      };
    }

    // 8c. MOS vs IC3 comparison
    if (
      (norm.includes("ic3") && norm.includes("mos")) ||
      norm.includes("khac nhau the nao") ||
      norm.includes("nen hoc mos hay ic3") ||
      norm.includes("nen thi mos hay ic3") ||
      norm.includes("so sanh mos va ic3")
    ) {
      return {
        intent: "knowledge_question",
        subType: "mos_vs_ic3",
        confidence: 0.95,
        userMessage: text,
      };
    }

    // 8d. Tuition / Cost questions
    if (
      norm.includes("hoc phi") ||
      norm.includes("gia tien") ||
      norm.includes("bao nhieu tien") ||
      norm.includes("chi phi") ||
      norm.includes("ton bao nhieu") ||
      norm.includes("khoa hoc gia bao nhieu") ||
      norm.includes("bang gia")
    ) {
      return {
        intent: "faq",
        subType: "tuition_policy",
        confidence: 0.95,
        userMessage: text,
      };
    }

    // 8e. Guarantee / Retake policy
    if (
      norm.includes("bao do") ||
      norm.includes("cam ket") ||
      norm.includes("hoc lai") ||
      norm.includes("hoc lai mien phi") ||
      norm.includes("thi lai") ||
      norm.includes("chinh sach")
    ) {
      return {
        intent: "faq",
        subType: "guarantee_policy",
        confidence: 0.9,
        userMessage: text,
      };
    }

    // 8f. Study format (Online / Offline / Schedule)
    if (
      norm.includes("hoc online hay offline") ||
      norm.includes("hoc o dau") ||
      norm.includes("dia chi") ||
      norm.includes("hinh thuc hoc") ||
      norm.includes("lich hoc") ||
      norm.includes("thoi gian hoc nhu the nao")
    ) {
      return {
        intent: "faq",
        subType: "study_format",
        confidence: 0.9,
        userMessage: text,
      };
    }

    // 9. Small Talk & Compliments
    if (
      norm.includes("de thuong") ||
      norm.includes("dang yeu") ||
      norm.includes("xin the") ||
      norm.includes("gioi the") ||
      norm.includes("thong minh the") ||
      norm.includes("haha") ||
      norm.includes("hihi") ||
      norm.includes("met qua") ||
      norm.includes("buon qua") ||
      norm.includes("chan qua") ||
      norm === "ok" ||
      norm === "oke" ||
      norm === "okay" ||
      norm === "da" ||
      norm === "vang" ||
      norm === "hieu roi" ||
      norm === "de minh suy nghi" ||
      norm.includes("de suy nghi")
    ) {
      return { intent: "small_talk", confidence: 0.9, userMessage: text };
    }

    // 10. Clarification
    if (
      norm.includes("chua hieu") ||
      norm.includes("khong hieu") ||
      norm.includes("giai thich them") ||
      norm.includes("giai thich de hieu hon") ||
      norm.includes("y ban la gi") ||
      norm.includes("la sao") ||
      norm.includes("nghia la sao")
    ) {
      return { intent: "clarification", confidence: 0.9, userMessage: text };
    }

    // 11. Off-topic (Out of domain queries)
    if (
      norm.includes("nau pho") ||
      norm.includes("thoi tiet") ||
      norm.includes("bong da") ||
      norm.includes("nguoi yeu") ||
      norm.includes("an gi") ||
      norm.includes("choi game") ||
      norm.includes("hat di")
    ) {
      return { intent: "off_topic", confidence: 0.95, userMessage: text };
    }

    // 12. Check if text contains valid journey slots (level, subject, timeline, study hours)
    const parsedSlots = AnswerParser.parseMessage(text);
    const slotCount = Object.keys(parsedSlots.slots).length;

    if (slotCount > 0) {
      return {
        intent: "journey_answer",
        confidence: 0.9,
        userMessage: text,
      };
    }

    // 13. Fallback
    return {
      intent: "unknown",
      confidence: 0.3,
      userMessage: text,
    };
  },
};

