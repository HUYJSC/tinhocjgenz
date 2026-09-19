/**
 * Response Composer
 * Synthesizes natural, empathetic, and concise Vietnamese responses.
 * Respects user intent, incorporates official system knowledge, and seamlessly
 * transitions back to the active journey question without mechanical rigidity.
 */

import { JourneyState, QuickReplyOption } from "./journey-types";
import { ClassifiedIntentResult } from "./intent-router";
import { KNOWLEDGE_BASE } from "./knowledge-base";
import { NextQuestionResolver } from "./next-question-resolver";
import { JOURNEY_FLOWS, START_STEP } from "./journey-flows";

export interface ComposedResponse {
  reply: string;
  quickReplies?: QuickReplyOption[];
  mascotState: "idle" | "speaking" | "thinking" | "success" | "greeting";
  action?: "human_handoff" | "show_lead_modal" | "open_zalo";
}

export const ResponseComposer = {
  /**
   * Generates a smooth, natural transition back to the current in-progress journey step
   */
  getGentleReturnToFlow(state: JourneyState): {
    transitionText: string;
    quickReplies?: QuickReplyOption[];
  } {
    // If no flow chosen yet, return start options
    if (!state.flow) {
      return {
        transitionText:
          "Bạn đang muốn tìm hiểu chương trình nào: luyện thi chứng chỉ quốc tế (MOS, IC3) hay học thực chiến đi làm?",
        quickReplies: START_STEP.quickReplies,
      };
    }

    const flowDef = JOURNEY_FLOWS[state.flow];
    if (!flowDef) {
      return {
        transitionText: "Bạn đang muốn tập trung vào mục tiêu nào?",
        quickReplies: START_STEP.quickReplies,
      };
    }

    // Resolve current question based on state
    const nextStep = NextQuestionResolver.resolveNextStep(state);
    const question = nextStep.question;

    // Craft contextual bridging phrase based on current missing slot
    let bridge = "Giờ mình cùng quay lại lộ trình nhé — ";
    if (nextStep.stepId.includes("_1") || state.currentLevel === null) {
      bridge = "Để mình xếp lộ trình vừa sức nhất với bạn: ";
    } else if (nextStep.stepId.includes("_2") || state.targetSubject === null) {
      bridge = "Quay lại một chút nhé — ";
    } else if (nextStep.stepId.includes("_3") || state.targetDate === null) {
      bridge = "Để tính toán tiến độ học hợp lý: ";
    } else if (nextStep.stepId.includes("_4") || state.studyTimePerWeek === null) {
      bridge = "Chỉ còn một bước nữa để hoàn tất lộ trình: ";
    }

    return {
      transitionText: `${bridge}${question}`,
      quickReplies: nextStep.quickReplies,
    };
  },

  /**
   * Main Composition Engine
   */
  compose(intentResult: ClassifiedIntentResult, state: JourneyState): ComposedResponse {
    const { intent, subType } = intentResult;
    const hasActiveJourney = Boolean(
      state.goal && state.flow && state.flow !== "start" && !state.recommendationReady
    );

    // ==========================================
    // 1. GREETING
    // ==========================================
    if (intent === "greeting") {
      if (hasActiveJourney) {
        const ret = this.getGentleReturnToFlow(state);
        return {
          reply: `Chào bạn 👋 Mình vẫn đang ở đây đồng hành cùng bạn.\n\n${ret.transitionText}`,
          quickReplies: ret.quickReplies,
          mascotState: "greeting",
        };
      }

      return {
        reply:
          "Chào bạn 👋 Mình là Trợ lý học tập AI của Tin Học Gen Z. Mình có thể giúp bạn chọn lộ trình học tối ưu, giải đáp chứng chỉ MOS/IC3 hoặc kết nối với chuyên viên hỗ trợ. Bạn đang muốn học để phục vụ mục tiêu gì?",
        quickReplies: START_STEP.quickReplies,
        mascotState: "greeting",
      };
    }

    // ==========================================
    // 2. BOT IDENTITY
    // ==========================================
    if (intent === "bot_identity") {
      const core =
        "Mình là Trợ lý học tập AI của Tin Học Gen Z. Mình hỗ trợ bạn tìm hiểu chương trình đào tạo, chứng chỉ tin học quốc tế và xây dựng lộ trình học cá nhân hóa dựa trên dữ liệu chính thức của hệ thống.";

      if (hasActiveJourney) {
        const ret = this.getGentleReturnToFlow(state);
        return {
          reply: `${core}\n\n${ret.transitionText}`,
          quickReplies: ret.quickReplies,
          mascotState: "speaking",
        };
      }

      return {
        reply: `${core}\n\nBạn đang quan tâm đến chứng chỉ hay kỹ năng tin học nào?`,
        quickReplies: START_STEP.quickReplies,
        mascotState: "speaking",
      };
    }

    // ==========================================
    // 3. GRATITUDE / THANKS
    // ==========================================
    if (intent === "thanks") {
      if (hasActiveJourney) {
        const ret = this.getGentleReturnToFlow(state);
        return {
          reply: `Không có gì 😄 Rất vui được hỗ trợ bạn.\n\n${ret.transitionText}`,
          quickReplies: ret.quickReplies,
          mascotState: "speaking",
        };
      }

      return {
        reply:
          "Không có gì nè 😄 Chúc bạn một ngày học tập và làm việc thật hiệu quả! Cần tìm hiểu thêm về khóa học nào cứ nhắn mình nhé.",
        mascotState: "speaking",
      };
    }

    // ==========================================
    // 4. EMOTIONAL / UNCERTAINTY / FEAR OF EXAM
    // ==========================================
    if (intent === "fear_uncertainty") {
      const reassurance =
        "Lo lắng trước kỳ thi hoặc khi bắt đầu học là hoàn toàn bình thường. Thực tế, bài thi MOS/IC3 là dạng bài thực hành thao tác theo mẫu, không đánh đố. Tại Tin Học Gen Z, hơn 95% học viên mất gốc từ số 0 chỉ sau 2–4 tuần luyện đúng bộ đề đã đạt 850–1000 điểm ngay lần thi đầu tiên nhờ có trợ giảng kèm 1:1 và sửa lỗi chi tiết.";

      if (hasActiveJourney) {
        const ret = this.getGentleReturnToFlow(state);
        return {
          reply: `${reassurance}\n\n${ret.transitionText}`,
          quickReplies: ret.quickReplies,
          mascotState: "speaking",
        };
      }

      return {
        reply: `${reassurance}\n\nBạn muốn tìm hiểu lộ trình thi môn nào để mình hướng dẫn chi tiết từ số 0?`,
        quickReplies: START_STEP.quickReplies,
        mascotState: "speaking",
      };
    }

    // ==========================================
    // ==========================================
    // 5. KNOWLEDGE QUESTION (MOS, IC3, Comparisons, Excel, Python, AI)
    // ==========================================
    if (intent === "knowledge_question") {
      const key = subType || "mos_overview";
      const entry = KNOWLEDGE_BASE[key] || KNOWLEDGE_BASE["mos_overview"];

      // Context-aware dynamic quick replies
      let customReplies: QuickReplyOption[] = START_STEP.quickReplies;
      if (key === "excel_skills") {
        customReplies = [
          { label: "Excel cơ bản từ số 0", value: "Mình muốn học Excel cơ bản từ đầu" },
          { label: "Excel thực chiến đi làm", value: "Mình muốn học Excel nâng cao để đi làm" },
          { label: "Luyện thi MOS Excel", value: "Mình muốn luyện thi chứng chỉ MOS Excel" },
          { label: "Học bao lâu?", value: "Khóa Excel học bao lâu vậy bạn?" },
        ];
      } else if (key === "python_starter") {
        customReplies = [
          { label: "Python cho người mới", value: "Mình chưa biết gì về Python" },
          { label: "Lộ trình học Python", value: "Tư vấn lộ trình học Python cho mình" },
          { label: "Thời gian học bao lâu?", value: "Khóa Python học bao lâu vậy bạn?" },
          { label: "Còn lập trình Web?", value: "Còn lập trình Web thì thế nào?" },
        ];
      } else if (key === "web_development") {
        customReplies = [
          { label: "Khóa Lập trình Web", value: "Tư vấn khóa lập trình Web cho mình" },
          { label: "Khóa Python cơ bản", value: "Mình muốn học Python" },
          { label: "Cái nào dễ hơn?", value: "Học Web hay Python dễ hơn cho người mới?" },
        ];
      } else if (key === "ai_skills") {
        customReplies = [
          { label: "Khóa Ứng dụng AI (6 buổi)", value: "Tư vấn khóa học ứng dụng AI cho mình" },
          { label: "Học phí khóa AI", value: "Học phí khóa AI là bao nhiêu?" },
          { label: "Lịch khai giảng", value: "Lịch khai giảng khóa AI gần nhất?" },
        ];
      }

      if (hasActiveJourney) {
        const ret = this.getGentleReturnToFlow(state);
        return {
          reply: `${entry.content}\n\n${ret.transitionText}`,
          quickReplies: ret.quickReplies,
          mascotState: "speaking",
        };
      }

      return {
        reply: `${entry.content}\n\nBạn có muốn mình tư vấn thêm về khóa học nào trong chương trình này không?`,
        quickReplies: customReplies,
        mascotState: "speaking",
      };
    }

    // ==========================================
    // 6. FAQ (Tuition, Guarantee, Schedule, Duration)
    // ==========================================
    if (intent === "faq") {
      const key = subType || "tuition_policy";
      const entry = KNOWLEDGE_BASE[key] || KNOWLEDGE_BASE["tuition_policy"];

      let customReplies: QuickReplyOption[] = START_STEP.quickReplies;
      if (key === "duration_query") {
        customReplies = [
          { label: "Xem chi tiết khóa học", value: "Xem chi tiết các khóa học" },
          { label: "Học phí trọn gói", value: "Học phí các khóa thế nào?" },
          { label: "Đăng ký tư vấn xếp lớp", value: "register_lead" },
        ];
      } else if (key === "tuition_policy") {
        customReplies = [
          { label: "Ưu đãi học phí nhóm 30%", value: "Chính sách ưu đãi nhóm 30% thế nào?" },
          { label: "Tư vấn xếp lớp", value: "register_lead" },
          { label: "Lịch khai giảng", value: "Cho mình hỏi lịch khai giảng gần nhất" },
        ];
      }

      if (hasActiveJourney) {
        const ret = this.getGentleReturnToFlow(state);
        return {
          reply: `${entry.content}\n\n${ret.transitionText}`,
          quickReplies: ret.quickReplies,
          mascotState: "speaking",
        };
      }

      return {
        reply: `${entry.content}\n\nBạn đang dự định học môn nào để mình kiểm tra lịch học và ưu đãi tốt nhất cho bạn nhé?`,
        quickReplies: customReplies,
        mascotState: "speaking",
      };
    }

    // ==========================================
    // 7. HUMAN HANDOFF
    // ==========================================
    if (intent === "human_handoff") {
      return {
        reply:
          "Mình kết nối bạn với chuyên viên tư vấn ngay nhé! Đội ngũ tư vấn viên của Tin Học Gen Z luôn trực 24/7 để hỗ trợ bạn cụ thể về lịch học, ưu đãi học phí và bài test đầu vào.",
        quickReplies: [
          { label: "💬 Nhắn tin Zalo chuyên viên", value: "chat_zalo" },
          { label: "📞 Hotline: 033.229.8065", value: "call_hotline" },
          { label: "📝 Đăng ký nhận tư vấn 1:1", value: "register_lead" },
          ...(hasActiveJourney
            ? [{ label: "Tiếp tục tự xếp lộ trình AI", value: "continue_journey" }]
            : []),
        ],
        mascotState: "speaking",
        action: "human_handoff",
      };
    }

    // ==========================================
    // 8. CLARIFICATION ("Tôi chưa hiểu")
    // ==========================================
    if (intent === "clarification") {
      let explanation =
        "Để giải thích dễ hiểu hơn: Tin Học Gen Z giúp bạn xây dựng lộ trình học từ con số 0 đến khi thi đậu chứng chỉ hoặc ứng dụng thành thạo vào công việc.";

      if (state.flow === "mos_certification") {
        explanation =
          "MOS là bài thi thực hành thao tác trên máy tính cho từng môn Word, Excel hoặc PowerPoint. Mỗi môn thi độc lập, đạt 700/1000 điểm là có bằng quốc tế của Microsoft.";
      } else if (state.flow === "ic3_certification") {
        explanation =
          "IC3 GS6 là chứng chỉ đánh giá kiến thức máy tính và mạng cơ bản, gồm 3 bài thi (Level 1, 2, 3). Thường áp dụng cho sinh viên các trường đại học/cao đẳng làm chuẩn đầu ra công nghệ.";
      }

      if (hasActiveJourney) {
        const ret = this.getGentleReturnToFlow(state);
        return {
          reply: `${explanation}\n\n${ret.transitionText}`,
          quickReplies: ret.quickReplies,
          mascotState: "speaking",
        };
      }

      return {
        reply: `${explanation}\n\nBạn có muốn mình tư vấn lộ trình phù hợp với bạn không?`,
        quickReplies: START_STEP.quickReplies,
        mascotState: "speaking",
      };
    }

    // ==========================================
    // 9. OFF-TOPIC
    // ==========================================
    if (intent === "off_topic") {
      const witty =
        "Chuyện này thì mình biết sơ sơ thôi 😄 nhưng chuyên môn chính của mình là đồng hành giúp bạn chinh phục chứng chỉ Tin học và kỹ năng văn phòng thực chiến.";

      if (hasActiveJourney) {
        const ret = this.getGentleReturnToFlow(state);
        return {
          reply: `${witty}\n\nQuay lại một chút nhé: ${ret.transitionText}`,
          quickReplies: ret.quickReplies,
          mascotState: "speaking",
        };
      }

      return {
        reply: `${witty}\n\nNếu bạn đang cần tư vấn MOS, IC3 hoặc Excel đi làm thì nhắn mình hỗ trợ ngay nhé!`,
        quickReplies: START_STEP.quickReplies,
        mascotState: "speaking",
      };
    }

    // ==========================================
    // 10. SMALL TALK / COMPLIMENT / CASUAL
    // ==========================================
    const norm = intentResult.userMessage.toLowerCase();
    let replyCore = "Cảm ơn bạn 😄 Mình ở đây để giúp việc học tin học của bạn trở nên dễ dàng nhất có thể.";

    if (norm.includes("met") || norm.includes("buon")) {
      replyCore =
        "Hôm nay có vẻ là một ngày nhiều áp lực với bạn nhỉ? Nghỉ ngơi một chút lấy lại năng lượng nhé. Khi nào sẵn sàng mình tiếp tục hỗ trợ bạn!";
    } else if (norm.includes("de thuong") || norm.includes("xin") || norm.includes("gioi")) {
      replyCore = "Cảm ơn lời khen của bạn nhiều nhé 😄 Mình luôn cố gắng hỗ trợ bạn nhiệt tình và chính xác nhất.";
    } else if (norm.includes("suy nghi") || norm === "ok" || norm === "oke") {
      replyCore = "Cứ thong thả suy nghĩ nhé, không phải vội đâu.";
    }

    if (hasActiveJourney) {
      const ret = this.getGentleReturnToFlow(state);
      return {
        reply: `${replyCore}\n\n${ret.transitionText}`,
        quickReplies: ret.quickReplies,
        mascotState: "speaking",
      };
    }

    return {
      reply: `${replyCore}\n\nBạn đang muốn tìm hiểu khóa học nào để mình tư vấn thêm nhé?`,
      quickReplies: START_STEP.quickReplies,
      mascotState: "speaking",
    };
  },
};

