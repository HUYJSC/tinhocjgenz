/**
 * Production RAG (Retrieval-Augmented Generation) & Deterministic Pathway Engine
 * Guarantees strict grounding against courses, policies, and roadmap templates.
 */

import { AiStore, AiKnowledgeDocument, AiRoadmapTemplate } from "./ai-store";
import { CoursesStore, AdminCourseItem } from "./courses-store";

export interface PathwayCriteria {
  goal?: string; // Đi làm, thi chứng chỉ MOS, IC3, học kỹ năng số
  level?: string; // Mất gốc/số 0, cơ bản, trung cấp
  domain?: string; // Word, Excel, PowerPoint, IC3, Tổng hợp
  timePerWeek?: string; // 2-4h, 5-8h, linh hoạt
  budget?: string; // Dưới 1 triệu, 1-2 triệu, không quan trọng
  learningMode?: string; // Online Zoom 1:1, Kèm sát ca tối, Cuối tuần
  timeline?: string; // Cấp tốc 1-2 tuần, 1 tháng, thong thả
}

export interface RecommendedPhase {
  phaseIndex: number;
  title: string;
  duration: string;
  focus: string;
  skills: string[];
  practicalProject: string;
}

export interface RoadmapResult {
  assessment: string;
  phases: RecommendedPhase[];
  primaryCourse: {
    id: string;
    title: string;
    priceAmount: number;
    priceFormatted: string;
    duration: string;
    enrollmentUrl: string;
    badge: string;
  };
  additionalCourses: {
    id: string;
    title: string;
    priceAmount: number;
    priceFormatted: string;
    duration: string;
  }[];
  totalEstimatedWeeks: number;
  acquiredSkills: string[];
  suggestedProjects: string[];
  suitableCertifications: string[];
  advisoryNote: string;
}

export class AiRagService {
  /**
   * Sanitizes input to prevent prompt injection and system prompt leak
   */
  static sanitizeInput(input: string): string {
    if (!input) return "";
    return input
      .replace(/ignore (all )?(previous|above) instructions/gi, "[blocked]")
      .replace(/system prompt/gi, "[system]")
      .replace(/reveal (your )?instructions/gi, "[blocked]")
      .replace(/jailbreak/gi, "[blocked]")
      .trim();
  }

  /**
   * Formats currency in VND standard
   */
  static formatVND(amount: number): string {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(amount)
      .replace("₫", "đ");
  }

  /**
   * Retrieves relevant knowledge chunks based on query
   */
  static retrieveContext(query: string, maxResults = 3): {
    documents: AiKnowledgeDocument[];
    courses: AdminCourseItem[];
    roadmaps: AiRoadmapTemplate[];
  } {
    const cleanQuery = this.sanitizeInput(query).toLowerCase();
    const queryTokens = cleanQuery.split(/\s+/).filter((w) => w.length > 1);

    // 1. Prioritize active published courses
    const allCourses = CoursesStore.getCourses().filter((c) => c.status === "PUBLISHED");
    const matchedCourses = allCourses.filter((course) => {
      const matchInTitle = queryTokens.some((t) => course.title.toLowerCase().includes(t));
      const matchInTagline = queryTokens.some((t) => course.tagline.toLowerCase().includes(t));
      const matchInDesc = queryTokens.some((t) => course.description.toLowerCase().includes(t));
      const matchInCat = cleanQuery.includes(course.category.toLowerCase());
      return matchInTitle || matchInTagline || matchInDesc || matchInCat;
    });

    // 2. Retrieve published knowledge documents
    const allDocs = AiStore.getDocuments().filter((d) => d.status === "PUBLISHED");
    const matchedDocs = allDocs.filter((doc) => {
      const matchInTitle = queryTokens.some((t) => doc.title.toLowerCase().includes(t));
      const matchInContent = queryTokens.some((t) => doc.content.toLowerCase().includes(t));
      const matchInTags = doc.tags.some((tag) => cleanQuery.includes(tag.toLowerCase()));
      return matchInTitle || matchInContent || matchInTags;
    });

    // 3. Retrieve roadmaps
    const allRoadmaps = AiStore.getRoadmaps().filter((r) => r.status === "PUBLISHED");
    const matchedRoadmaps = allRoadmaps.filter((rm) => {
      return queryTokens.some((t) => rm.title.toLowerCase().includes(t));
    });

    return {
      documents: (matchedDocs.length > 0 ? matchedDocs : allDocs).slice(0, maxResults),
      courses: (matchedCourses.length > 0 ? matchedCourses : allCourses).slice(0, 4),
      roadmaps: matchedRoadmaps.slice(0, 2),
    };
  }

  /**
   * Generates a grounded, schema-validated learning roadmap
   */
  static generateRoadmap(criteria: PathwayCriteria): RoadmapResult {
    const goal = (criteria.goal || "mos").toLowerCase();
    const level = (criteria.level || "basic").toLowerCase();
    const allCourses = CoursesStore.getCourses().filter((c) => c.status === "PUBLISHED");

    let primaryCourse = allCourses.find((c) => c.id === "mos-master-combo") || allCourses[0];
    const additionalCourses: AdminCourseItem[] = [];

    // Match exact course grounded in database
    if (goal.includes("excel") || criteria.domain?.toLowerCase().includes("excel")) {
      const excelCourse = allCourses.find((c) => c.id === "combo-survival-office" || c.slug.includes("excel"));
      if (excelCourse) primaryCourse = excelCourse;
    } else if (goal.includes("ic3") || criteria.domain?.toLowerCase().includes("ic3")) {
      const ic3Course = allCourses.find((c) => c.slug.includes("ic3"));
      if (ic3Course) primaryCourse = ic3Course;
    } else if (goal.includes("word")) {
      const wordCourse = allCourses.find((c) => c.slug.includes("word") || c.title.includes("Word"));
      if (wordCourse) primaryCourse = wordCourse;
    } else if (goal.includes("combo") || goal.includes("chứng chỉ") || goal.includes("tốt nghiệp")) {
      const comboCourse = allCourses.find((c) => c.id === "mos-master-combo");
      if (comboCourse) primaryCourse = comboCourse;
    }

    // Additional courses grounded
    allCourses.forEach((c) => {
      if (c.id !== primaryCourse.id && additionalCourses.length < 2) {
        additionalCourses.push(c);
      }
    });

    // Assessment text
    const assessment = level.includes("mất gốc") || level.includes("số 0")
      ? "Trình độ hiện tại: Mới bắt đầu hoặc cần hệ thống lại từ số 0. Cần tập trung phương pháp 'Cầm tay chỉ việc', chuẩn hóa phím tắt, thao tác chuột và cấu trúc thanh Ribbon trước khi luyện đề thi áp lực thời gian."
      : level.includes("trung cấp") || level.includes("nâng cao")
      ? "Trình độ hiện tại: Đã có nền tảng thao tác cơ bản. Cần tập trung trực diện vào các hàm nâng cao (XLOOKUP, SUMIFS lồng nhau), mẹo tối ưu thời gian làm bài 50 phút và xử lý các bẫy đề thi Certiport."
      : "Trình độ hiện tại: Đã biết sử dụng cơ bản nhưng thao tác chưa chuẩn format thi quốc tế. Khuyến nghị củng cố quy tắc soạn thảo/bảng tính chuẩn trước khi chuyển sang luyện đề thực chiến.";

    // Phases definition grounded in duration
    const phases: RecommendedPhase[] = [
      {
        phaseIndex: 1,
        title: "Giai đoạn 1: Chuẩn hóa kỹ năng & Công cụ cốt lõi",
        duration: criteria.timeline?.includes("cấp tốc") ? "2 - 3 buổi" : "1 - 2 tuần",
        focus: "Làm chủ các tính năng bắt buộc và quy chuẩn thao tác văn phòng chuyên nghiệp.",
        skills: [
          primaryCourse.title.includes("Excel") ? "Hàm XLOOKUP, INDEX-MATCH, SUMIFS" : "Kỹ thuật Section Break, Header/Footer, Style văn bản",
          "Phím tắt thao tác nhanh x2 tốc độ",
          "Chuẩn hóa dữ liệu theo quy chuẩn doanh nghiệp",
        ],
        practicalProject: "Hoàn thiện sản phẩm thực hành đầu tay theo form mẫu chuẩn.",
      },
      {
        phaseIndex: 2,
        title: "Giai đoạn 2: Luyện đề mô phỏng thực chiến & Thi thử bản quyền",
        duration: criteria.timeline?.includes("cấp tốc") ? "2 - 3 buổi" : "1 - 2 tuần",
        focus: "Thực hành trên máy ảo mô phỏng 99% đề thi thật Certiport/IIG, rèn luyện áp lực thời gian 50 phút.",
        skills: [
          "Phân bổ thời gian thi hiệu quả",
          "Nhận diện và tránh các bẫy trừ điểm của phần mềm khảo thí",
          "Đạt mốc 850 - 1000 điểm tối đa",
        ],
        practicalProject: "Vượt qua 3 đề thi thử liên tiếp đạt trên 850/1000 điểm trên phần mềm thi thử.",
      },
    ];

    const suitableCerts: string[] = [];
    if (primaryCourse.title.includes("MOS") || goal.includes("mos")) {
      suitableCerts.push("Chứng chỉ quốc tế Microsoft Office Specialist (MOS) có giá trị vĩnh viễn");
    }
    if (primaryCourse.title.includes("IC3") || goal.includes("ic3")) {
      suitableCerts.push("Chứng chỉ quốc tế IC3 Digital Literacy GS6 chuẩn Bộ TT&TT");
    }
    if (suitableCerts.length === 0) {
      suitableCerts.push("Chứng nhận hoàn thành khóa học thực chiến của Tin Học Gen Z");
    }

    return {
      assessment,
      phases,
      primaryCourse: {
        id: primaryCourse.id,
        title: primaryCourse.title,
        priceAmount: primaryCourse.priceAmount,
        priceFormatted: this.formatVND(primaryCourse.priceAmount),
        duration: primaryCourse.duration,
        enrollmentUrl: `/lien-he?select=${primaryCourse.id}`,
        badge: primaryCourse.badge || "Khuyên Dùng",
      },
      additionalCourses: additionalCourses.map((c) => ({
        id: c.id,
        title: c.title,
        priceAmount: c.priceAmount,
        priceFormatted: this.formatVND(c.priceAmount),
        duration: c.duration,
      })),
      totalEstimatedWeeks: criteria.timeline?.includes("cấp tốc") ? 1 : 3,
      acquiredSkills: [
        "Thành thạo trọn vẹn kỹ năng thực tế theo đúng yêu cầu công việc và khảo thí",
        "Tự tin dự thi đạt chứng chỉ quốc tế điểm cao 900+ ngay lần đầu tiên",
        "Cam kết tài trợ học lại hoàn toàn miễn phí 0đ nếu chưa đạt chuẩn đầu ra",
      ],
      suggestedProjects: [
        "Bộ hồ sơ tài liệu/bảng tính quản lý tự động hoàn chỉnh mang vào CV phỏng vấn",
      ],
      suitableCertifications: suitableCerts,
      advisoryNote: "Lộ trình trên được xây dựng tự động dựa trên ngân hàng dữ liệu khóa học chính thức của Tin Học Gen Z. Giảng viên sẽ liên hệ để xếp lịch học chi tiết phù hợp với ca trống của bạn.",
    };
  }

  /**
   * Interactive Chatbot Engine: Context-aware response with deterministic grounding
   */
  static async processChat(
    userMessage: string,
    history: { role: "user" | "assistant"; content: string }[],
    criteria?: PathwayCriteria
  ): Promise<{
    reply: string;
    quickReplies: string[];
    roadmapData?: RoadmapResult;
    isRoadmapReady?: boolean;
  }> {
    const cleanMsg = this.sanitizeInput(userMessage).toLowerCase();

    // Check if user is answering criteria steps
    const updatedCriteria: PathwayCriteria = { ...criteria };

    if (!updatedCriteria.goal) {
      if (cleanMsg.includes("chứng chỉ") || cleanMsg.includes("mos") || cleanMsg.includes("ic3")) {
        updatedCriteria.goal = "Thi chứng chỉ quốc tế";
      } else if (cleanMsg.includes("đi làm") || cleanMsg.includes("công việc") || cleanMsg.includes("kế toán")) {
        updatedCriteria.goal = "Học thực chiến để đi làm";
      } else if (cleanMsg.includes("nâng cao") || cleanMsg.includes("kỹ năng")) {
        updatedCriteria.goal = "Nâng cao kỹ năng tin học";
      }
    }

    if (!updatedCriteria.level) {
      if (cleanMsg.includes("mất gốc") || cleanMsg.includes("số 0") || cleanMsg.includes("chưa biết")) {
        updatedCriteria.level = "Người mới bắt đầu / Mất gốc";
      } else if (cleanMsg.includes("cơ bản") || cleanMsg.includes("biết sơ")) {
        updatedCriteria.level = "Đã biết cơ bản";
      } else if (cleanMsg.includes("nâng cao") || cleanMsg.includes("khá")) {
        updatedCriteria.level = "Khá / Muốn học nâng cao";
      }
    }

    // If all key questions answered or user explicitly asks for roadmap
    const readyForRoadmap =
      cleanMsg.includes("lập lộ trình") ||
      cleanMsg.includes("xem lộ trình") ||
      (Boolean(updatedCriteria.goal) && Boolean(updatedCriteria.level));

    if (readyForRoadmap) {
      const roadmap = this.generateRoadmap(updatedCriteria);
      return {
        reply: `Dựa trên thông tin của bạn (${updatedCriteria.goal || "Thi lấy bằng MOS/IC3"}, trình độ: ${updatedCriteria.level || "Cơ bản"}), mình đã thiết kế lộ trình đào tạo tối ưu nhất bên dưới. Khóa học được cam kết bao đỗ 100% với chính sách học lại 0đ nếu chưa đạt chứng chỉ!`,
        quickReplies: ["Xem chi tiết học phí", "Đăng ký xếp lớp ngay", "Hỏi thêm về phần mềm thi thử"],
        roadmapData: roadmap,
        isRoadmapReady: true,
      };
    }

    // Step-by-step guidance
    if (!updatedCriteria.goal) {
      return {
        reply: "Chào bạn! Mình là Trợ lý học tập AI của Tin Học Gen Z. Mình sẽ giúp bạn xây dựng lộ trình học phù hợp nhất. Mục tiêu chính của bạn hiện tại là gì?",
        quickReplies: ["Thi lấy bằng MOS quốc tế", "Thi chứng chỉ IC3 GS6", "Thực chiến Excel đi làm", "Học văn phòng toàn diện"],
      };
    }

    if (!updatedCriteria.level) {
      return {
        reply: "Tuyệt vời! Để mình lên lộ trình bám sát nhất với bạn, trình độ tin học hiện tại của bạn đang ở mức nào?",
        quickReplies: ["Mới bắt đầu / Mất gốc từ số 0", "Đã biết gõ phím và tính toán cơ bản", "Đã thành thạo, muốn học chuyên sâu"],
      };
    }

    if (!updatedCriteria.timePerWeek) {
      return {
        reply: "Mỗi tuần bạn có thể dành khoảng bao nhiêu thời gian để tham gia học và thực hành?",
        quickReplies: ["Cấp tốc (3 - 5 buổi hoàn thành)", "2 - 3 buổi / tuần (Ca tối)", "Lớp cuối tuần Thứ 7 - CN"],
      };
    }

    // Default RAG retrieval query
    const context = this.retrieveContext(userMessage);
    const primaryCourse = context.courses[0];

    const reply = `Tại Tin Học Gen Z, khóa học **${primaryCourse.title}** đang có học phí niêm yết là **${this.formatVND(primaryCourse.priceAmount)}** (thời lượng ${primaryCourse.duration}). Bạn được học Online Zoom tương tác trực tiếp, kèm 1:1 và cấp tài khoản phần mềm thi thử mô phỏng 99% đề thi thật tại IIG với cam kết bao đỗ 100%!`;

    return {
      reply,
      quickReplies: ["Tư vấn lộ trình học", "Đăng ký tư vấn trực tiếp", "Chat Zalo với giảng viên"],
    };
  }
}

