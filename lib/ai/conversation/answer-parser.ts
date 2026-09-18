/**
 * Robust Multi-Slot Answer Parser
 * Parses both Quick Reply values/labels and free-form natural language Vietnamese text.
 * Capable of extracting multiple slots from a single message (e.g. level + subject + timeline).
 */

import {
  JourneySlots,
  JourneyGoal,
  CurrentLevel,
  TargetSubject,
  TargetDate,
  StudyTimePerWeek,
} from "./journey-types";
import { JOURNEY_FLOWS, START_STEP } from "./journey-flows";

export interface ParsedAnswerResult {
  slots: Partial<JourneySlots>;
  goalSwitched: boolean;
  confidence: number;
}

export const AnswerParser = {
  /**
   * Normalizes text for matching
   */
  normalize(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents for lenient comparison
      .replace(/[^\w\s]/g, " ") // Replace punctuation with space
      .replace(/\s+/g, " "); // Collapse multiple spaces
  },

  /**
   * 1. Matches Quick Reply exact value or label
   */
  matchQuickReply(rawText: string): Partial<JourneySlots> | null {
    const cleanRaw = rawText.trim().toLowerCase();

    // Check Start Step options
    for (const opt of START_STEP.quickReplies) {
      if (cleanRaw === opt.value.toLowerCase() || cleanRaw === opt.label.toLowerCase()) {
        return { goal: opt.value as JourneyGoal };
      }
    }

    // Check all flow steps
    for (const flow of Object.values(JOURNEY_FLOWS)) {
      for (const step of flow.steps) {
        for (const opt of step.quickReplies) {
          if (cleanRaw === opt.value.toLowerCase() || cleanRaw === opt.label.toLowerCase()) {
            return { [step.slot]: opt.value };
          }
        }
      }
    }

    return null;
  },

  /**
   * 2. Detects Goal or Goal Switching
   */
  detectGoal(rawText: string): { goal?: JourneyGoal; isSwitch: boolean } {
    const norm = this.normalize(rawText);

    const isSwitch =
      norm.includes("khong thi mos") ||
      norm.includes("khong hoc mos") ||
      norm.includes("thoi minh muon") ||
      norm.includes("thoi toi muon") ||
      norm.includes("doi sang") ||
      norm.includes("chuyen sang");

    // Excel Practical / đi làm
    if (
      norm.includes("thuc chien excel") ||
      norm.includes("excel di lam") ||
      norm.includes("hoc excel de di lam") ||
      norm.includes("excel cho nguoi di lam") ||
      norm.includes("practical excel") ||
      (norm.includes("excel") && norm.includes("di lam"))
    ) {
      return { goal: "practical_excel", isSwitch };
    }

    // MOS Certification
    if (
      norm.includes("thi mos") ||
      norm.includes("bang mos") ||
      norm.includes("chung chi mos") ||
      norm.includes("mos quoc te") ||
      norm.includes("mos 2019") ||
      norm.includes("mos 365")
    ) {
      return { goal: "mos_certification", isSwitch };
    }

    // IC3 GS6 Certification
    if (
      norm.includes("thi ic3") ||
      norm.includes("chung chi ic3") ||
      norm.includes("ic3 gs6") ||
      norm.includes("ic3 quoc te")
    ) {
      return { goal: "ic3_certification", isSwitch };
    }

    // Comprehensive Office
    if (
      norm.includes("van phong toan dien") ||
      norm.includes("tron bo van phong") ||
      norm.includes("word excel powerpoint") ||
      norm.includes("tin hoc van phong toan dien")
    ) {
      return { goal: "office_comprehensive", isSwitch };
    }

    return { isSwitch: false };
  },

  /**
   * 3. Extracts Current Level
   */
  extractLevel(norm: string): CurrentLevel | undefined {
    if (
      norm.includes("mat goc") ||
      norm.includes("so 0") ||
      norm.includes("moi bat dau") ||
      norm.includes("chua biet gi") ||
      norm.includes("chua tung hoc") ||
      norm.includes("tu dau")
    ) {
      return "beginner_zero";
    }

    if (
      norm.includes("co ban") ||
      norm.includes("biet so") ||
      norm.includes("biet go phim") ||
      norm.includes("tinh toan don gian") ||
      norm.includes("biet nhap lieu")
    ) {
      return "basic_elementary";
    }

    if (
      norm.includes("thanh thao") ||
      norm.includes("chuyen sau") ||
      norm.includes("nang cao") ||
      norm.includes("da co nen tang") ||
      norm.includes("kha")
    ) {
      return "intermediate_adv";
    }

    return undefined;
  },

  /**
   * 4. Extracts Target Subject (Word, Excel, PowerPoint, Combo)
   */
  extractSubject(norm: string): TargetSubject | undefined {
    if (norm.includes("chua biet") || norm.includes("phan van") || norm.includes("chua ro")) {
      return "unsure";
    }
    if (norm.includes("ca 3 mon") || norm.includes("tron bo") || norm.includes("combo")) {
      return "combo_all";
    }
    if (norm.includes("excel")) {
      return "excel";
    }
    if (norm.includes("word")) {
      return "word";
    }
    if (norm.includes("powerpoint") || norm.includes("ppt")) {
      return "powerpoint";
    }

    return undefined;
  },

  /**
   * 5. Extracts Target Date / Timeline
   */
  extractTimeline(norm: string): TargetDate | undefined {
    const monthMatch = norm.match(/\b(\d+)\s*(?:thang|m)\b/);
    if (monthMatch) {
      const m = parseInt(monthMatch[1], 10);
      if (m <= 1) return "within_1_month";
      if (m <= 3) return "1_3_months";
      return "3_6_months";
    }

    if (
      norm.includes("1 thang") ||
      norm.includes("mot thang") ||
      norm.includes("cap toc") ||
      norm.includes("gap") ||
      norm.includes("trong thang")
    ) {
      return "within_1_month";
    }

    if (
      norm.includes("2 thang") ||
      norm.includes("hai thang") ||
      norm.includes("3 thang") ||
      norm.includes("ba thang") ||
      norm.includes("1 3 thang") ||
      norm.includes("khoang 2 thang") ||
      norm.includes("thang toi")
    ) {
      return "1_3_months";
    }

    if (
      norm.includes("4 thang") ||
      norm.includes("5 thang") ||
      norm.includes("6 thang") ||
      norm.includes("3 6 thang")
    ) {
      return "3_6_months";
    }

    if (
      norm.includes("thong tha") ||
      norm.includes("linh hoat") ||
      norm.includes("chua co han") ||
      norm.includes("khi nao ranh")
    ) {
      return "flexible";
    }

    return undefined;
  },

  /**
   * 6. Extracts Study Time Per Week
   */
  extractStudyTime(norm: string): StudyTimePerWeek | undefined {
    // Check numbers of hours: e.g. "4 tieng", "4 gio", "4h", "5 tieng moi tuan"
    const hourMatch = norm.match(/\b(\d+)\s*(?:gio|tieng|h)\b/);
    if (hourMatch) {
      const h = parseInt(hourMatch[1], 10);
      if (h <= 2) return "under_3h";
      if (h <= 5) return "3_5h";
      if (h <= 8) return "5_8h";
      return "over_8h";
    }

    if (
      norm.includes("duoi 3") ||
      norm.includes("1 2 gio") ||
      norm.includes("1 2h") ||
      norm.includes("it thoi gian")
    ) {
      return "under_3h";
    }

    if (
      norm.includes("3 5") ||
      norm.includes("ca toi") ||
      norm.includes("2 3 buoi") ||
      norm.includes("3 den 5") ||
      norm.includes("khoang 4") ||
      norm.includes("tam 4")
    ) {
      return "3_5h";
    }

    if (
      norm.includes("5 8") ||
      norm.includes("5 den 8") ||
      norm.includes("moi ngay 1")
    ) {
      return "5_8h";
    }

    if (
      norm.includes("tren 8") ||
      norm.includes("nhieu thoi gian") ||
      norm.includes("toan thoi gian")
    ) {
      return "over_8h";
    }

    return undefined;
  },

  /**
   * Main Parsing Pipeline: Extracts all detectable slots from a single message
   */
  parseMessage(userMessage: string): ParsedAnswerResult {
    // 1. Try exact quick reply match first
    const qrMatch = this.matchQuickReply(userMessage);
    if (qrMatch) {
      return {
        slots: qrMatch,
        goalSwitched: false,
        confidence: 1.0,
      };
    }

    const norm = this.normalize(userMessage);
    const slots: Partial<JourneySlots> = {};

    // 2. Detect Goal & Goal Switch
    const goalRes = this.detectGoal(userMessage);
    if (goalRes.goal) {
      slots.goal = goalRes.goal;
    }

    // 3. Extract Level
    const level = this.extractLevel(norm);
    if (level) {
      slots.currentLevel = level;
    }

    // 4. Extract Subject
    const subject = this.extractSubject(norm);
    if (subject) {
      slots.targetSubject = subject;
    }

    // 5. Extract Timeline
    const timeline = this.extractTimeline(norm);
    if (timeline) {
      slots.targetDate = timeline;
    }

    // 6. Extract Study Time
    const studyTime = this.extractStudyTime(norm);
    if (studyTime) {
      slots.studyTimePerWeek = studyTime;
    }

    // 7. Extract IC3 Specifics
    if (norm.includes("chua tung hoc") || norm.includes("chua hoc ic3")) {
      slots.ic3Experience = "never_learned";
    } else if (norm.includes("da hoc ic3") || norm.includes("da tung hoc")) {
      slots.ic3Experience = "learned_before";
    }

    if (norm.includes("tron bo") || norm.includes("3 level") || norm.includes("gs6")) {
      slots.ic3Scope = "all_gs6";
    } else if (norm.includes("tung level")) {
      slots.ic3Scope = "single_level";
    }

    // 8. Extract Practical Excel Specifics
    if (norm.includes("ke toan") || norm.includes("tai chinh") || norm.includes("kiem toan")) {
      slots.occupationOrNeed = "ke_toan_tai_chinh";
    } else if (norm.includes("nhan su") || norm.includes("hanh chinh")) {
      slots.occupationOrNeed = "nhan_su_hanh_chinh";
    } else if (norm.includes("kinh doanh") || norm.includes("marketing") || norm.includes("sale")) {
      slots.occupationOrNeed = "kinh_doanh_mkt";
    } else if (norm.includes("sinh vien")) {
      slots.occupationOrNeed = "sinh_vien";
    }

    if (norm.includes("ham") || norm.includes("xlookup") || norm.includes("sumif") || norm.includes("cong thuc")) {
      slots.requiredSkills = ["ham_cong_thuc"];
    } else if (norm.includes("pivot") || norm.includes("pivottable") || norm.includes("du lieu")) {
      slots.requiredSkills = ["pivottable_dulieu"];
    } else if (norm.includes("dashboard") || norm.includes("bao cao")) {
      slots.requiredSkills = ["dashboard_baocao"];
    }

    const confidence = Object.keys(slots).length > 0 ? 0.9 : 0.0;

    return {
      slots,
      goalSwitched: goalRes.isSwitch,
      confidence,
    };
  },
};
