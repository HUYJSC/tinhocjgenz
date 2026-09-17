/**
 * Production Data Store & Abstraction for AI Learning Pathway Advisor
 * Supports Knowledge Documents, Chunks, Roadmaps, Conversations, Feedback and Settings.
 */

export interface AiKnowledgeDocument {
  id: string;
  title: string;
  category: "course" | "certification" | "policy" | "faq" | "learning_guide";
  content: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface AiKnowledgeChunk {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  category: string;
  tags: string[];
  tokenCount: number;
  embedding?: number[];
  updatedAt: string;
}

export interface AiRoadmapTemplate {
  id: string;
  title: string;
  targetRole: "student" | "worker" | "beginner" | "career_changer";
  targetGoal: "mos_cert" | "ic3_cert" | "excel_master" | "office_pro" | "ai_office";
  level: "beginner" | "basic" | "intermediate" | "advanced";
  estimatedWeeks: number;
  recommendedCourseIds: string[];
  phases: {
    phaseIndex: number;
    title: string;
    duration: string;
    focus: string;
    skills: string[];
    practicalProject: string;
  }[];
  certificationName?: string;
  status: "PUBLISHED" | "DRAFT";
  createdAt: string;
  updatedAt: string;
}

export interface AiChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  quickReplies?: string[];
  recommendedCourseIds?: string[];
  roadmapData?: Record<string, unknown>;
}

export interface AiConversation {
  id: string;
  userId?: string;
  userIp?: string;
  leadPhone?: string;
  leadName?: string;
  criteria?: {
    goal?: string;
    level?: string;
    domain?: string;
    timePerWeek?: string;
    budget?: string;
    learningMode?: string;
    timeline?: string;
  };
  messages: AiChatMessage[];
  status: "active" | "completed" | "converted";
  unansweredQuestions?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AiFeedbackItem {
  id: string;
  conversationId: string;
  messageId?: string;
  rating: "helpful" | "unhelpful";
  comment?: string;
  createdAt: string;
}

export interface AiSettings {
  systemPrompt: string;
  temperature: number;
  similarityThreshold: number;
  maxTokens: number;
  activeProvider: "builtin-rag" | "gemini" | "openai";
  modelName: string;
  enableExternalAi: boolean;
  unansweredNotificationEmail: string;
}

// Initial Default Knowledge Base (Real Data from Tin Học Gen Z)
const DEFAULT_KNOWLEDGE_DOCUMENTS: AiKnowledgeDocument[] = [
  {
    id: "kb-policy-warranty",
    title: "Chính sách cam kết bao đỗ 100% & Bảo hành học lại 0đ",
    category: "policy",
    content: `Chính sách cam kết tại Tin Học Gen Z:
1. Cam kết chất lượng: Mọi học viên đăng ký các khóa luyện thi MOS (Word, Excel, PowerPoint) và IC3 GS6 được cam kết đậu 100% chứng chỉ quốc tế do Certiport Hoa Kỳ cấp.
2. Quyền lợi học lại 0đ: Nếu học viên tham gia đầy đủ buổi học và làm bài tập theo hướng dẫn nhưng thi chưa đạt điểm yêu cầu (700/1000 đối với MOS), trung tâm tài trợ học lại và ôn luyện 1:1 hoàn toàn miễn phí 0đ cho đến khi thi đỗ.
3. Phần mềm thi thử: Học viên được cấp tài khoản phần mềm thi thử bản quyền Certiport mô phỏng giống 99% đề thi thật tại IIG Việt Nam.`,
    tags: ["chính sách", "bảo hành", "bao đỗ", "cam kết", "học lại"],
    status: "PUBLISHED",
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "System",
  },
  {
    id: "kb-mos-certification",
    title: "Thông tin chứng chỉ Microsoft Office Specialist (MOS)",
    category: "certification",
    content: `Thông tin về kỳ thi và chứng chỉ MOS:
- Đơn vị khảo thí: Certiport (Hoa Kỳ) và đại diện IIG Việt Nam.
- Thời hạn chứng chỉ: Có giá trị vĩnh viễn trên toàn thế giới, không bao giờ hết hạn.
- Định dạng thi: Multi-Project (gồm 5-7 Project nhỏ với các task thực hành cụ thể), thời gian làm bài 50 phút trên máy tính.
- Thang điểm: Tối đa 1000 điểm, điểm đạt tối thiểu là 700/1000 điểm.
- Các môn thi phổ biến: MOS Word, MOS Excel, MOS PowerPoint (phiên bản 2019 / 365).
- Combo MOS Master: Sở hữu cả 3 chứng chỉ Word, Excel, PowerPoint giúp đáp ứng 100% chuẩn đầu ra đại học và tạo lợi thế CV vượt trội.`,
    tags: ["MOS", "Microsoft", "Word", "Excel", "PowerPoint", "Certiport", "IIG"],
    status: "PUBLISHED",
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "System",
  },
  {
    id: "kb-ic3-certification",
    title: "Thông tin chứng chỉ IC3 Digital Literacy (GS6)",
    category: "certification",
    content: `Chứng chỉ Tin học Quốc tế IC3 GS6:
- Phiên bản mới nhất: IC3 GS6 (Global Standard 6) chia làm 3 cấp độ: Level 1 (Cơ bản), Level 2 (Trung cấp), Level 3 (Nâng cao).
- Nội dung khảo thí: Công nghệ cơ bản (máy tính, thiết bị số), Ứng dụng chính (soạn thảo, bảng tính, trình chiếu) và Cuộc sống số (Internet, bảo mật thông tin, điện toán đám mây).
- Chuẩn đầu ra: Rất nhiều trường Đại học (như HUTECH, Kinh tế, Bách Khoa, Sư phạm...) công nhận là chuẩn đầu ra công nghệ thông tin bắt buộc.`,
    tags: ["IC3", "IC3 GS6", "chuẩn đầu ra", "kỹ năng số"],
    status: "PUBLISHED",
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "System",
  },
  {
    id: "kb-faq-schedule-tuition",
    title: "Hình thức học, lịch học và ưu đãi học phí",
    category: "faq",
    content: `Câu hỏi thường gặp về học phí & lịch học tại Tin Học Gen Z:
- Hình thức đào tạo: Học Online tương tác trực tiếp qua Zoom có chia sẻ màn hình + Giảng viên kèm 1:1 sửa bài trực tiếp; kết hợp tài khoản máy ảo thực hành 24/7.
- Lịch học: Ca học linh hoạt Sáng, Chiều hoặc Tối (19:30 - 21:00 hoặc 20:00 - 21:30), có lớp cấp tốc cuối tuần Thứ 7 - Chủ Nhật.
- Thời lượng: Khóa cấp tốc chỉ từ 3 - 5 buổi mỗi môn; Combo 3 môn từ 10 - 15 buổi.
- Học phí niêm yết:
  + Luyện thi từng môn MOS: 590.000đ / môn (Học phí gốc 800.000đ).
  + Combo MOS 3 môn: 1.450.000đ trọn gói 3 môn (Tiết kiệm 30%).
  + Luyện thi IC3 GS6: 690.000đ.
  + Excel thực chiến & Dashboard: 690.000đ.
  + Đăng ký theo nhóm từ 2 - 3 bạn: Giảm thêm 10% - 20% học phí.`,
    tags: ["học phí", "lịch học", "ca học", "combo", "ưu đãi", "zoom"],
    status: "PUBLISHED",
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "System",
  },
];

const DEFAULT_ROADMAP_TEMPLATES: AiRoadmapTemplate[] = [
  {
    id: "roadmap-mos-student",
    title: "Lộ Trình Cấp Tốc Đạt Chuẩn Đầu Ra MOS Cho Sinh Viên",
    targetRole: "student",
    targetGoal: "mos_cert",
    level: "basic",
    estimatedWeeks: 2,
    recommendedCourseIds: ["mos-master-combo", "mos-2019"],
    phases: [
      {
        phaseIndex: 1,
        title: "Giai đoạn 1: Chuẩn hóa kiến thức cốt lõi (Buổi 1 - 3)",
        duration: "3 buổi (6 giờ học)",
        focus: "Nắm trọn vẹn các thẻ Ribbon, hàm và công cụ bắt buộc trong đề thi Certiport",
        skills: ["Word: Section break, Header/Footer, Table of contents", "Excel: Hàm thống kê SUMIFS, COUNTIFS, VLOOKUP", "PPT: Slide Master, SmartArt"],
        practicalProject: "Xây dựng tài liệu báo cáo nghiên cứu hoàn chỉnh theo chuẩn ISO/IEEE",
      },
      {
        phaseIndex: 2,
        title: "Giai đoạn 2: Luyện đề mô phỏng sát đề thi thật (Buổi 4 - 5)",
        duration: "2 buổi (4 giờ học)",
        focus: "Thực chiến 5 đề Multi-Project trên máy ảo thi thử, rèn luyện áp lực 50 phút",
        skills: ["Phân bổ thời gian 50 phút", "Xử lý bẫy đề thi của Certiport", "Cách kiểm tra lại task đạt điểm 900+"],
        practicalProject: "Hoàn thành 3 đề thi thử đạt tối thiểu 850/1000 điểm",
      },
    ],
    certificationName: "Chứng chỉ MOS Word / Excel / PowerPoint Specialist quốc tế",
    status: "PUBLISHED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "roadmap-excel-worker",
    title: "Lộ Trình Tự Động Hóa & Báo Cáo Dashboard Cho Người Đi Làm",
    targetRole: "worker",
    targetGoal: "excel_master",
    level: "basic",
    estimatedWeeks: 3,
    recommendedCourseIds: ["combo-survival-office", "ai-office-breakthrough"],
    phases: [
      {
        phaseIndex: 1,
        title: "Giai đoạn 1: Xử lý dữ liệu & Công thức động (Buổi 1 - 2)",
        duration: "2 buổi",
        focus: "Làm chủ các hàm tìm kiếm hiện đại và xử lý chuỗi",
        skills: ["XLOOKUP, INDEX-MATCH nâng cao", "Hàm logic nhiều tầng: IF, IFS, AND, OR", "Làm sạch dữ liệu nhập khẩu"],
        practicalProject: "Bảng tính đối soát công nợ tự động cho phòng kế toán/kinh doanh",
      },
      {
        phaseIndex: 2,
        title: "Giai đoạn 2: Trực quan hóa & Dashboard tương tác (Buổi 3 - 4)",
        duration: "2 buổi",
        focus: "Thiết kế Dashboard báo cáo quản trị với PivotTable và Slicer",
        skills: ["PivotTable đa chiều", "Timeline & Slicer điều khiển", "Biểu đồ động báo cáo CEO"],
        practicalProject: "Báo cáo Dashboard phân tích doanh thu & chi phí theo quý",
      },
    ],
    certificationName: "MOS Excel 2019 / Chứng nhận Tin học Doanh nghiệp",
    status: "PUBLISHED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DEFAULT_SETTINGS: AiSettings = {
  systemPrompt: `Bạn là cố vấn học tập của Tin Học Gen Z. Chỉ đề xuất khóa học, học phí, lịch học và chính sách có trong dữ liệu được cung cấp. Không được tự tạo thông tin. Nếu dữ liệu chưa đủ, hãy nói rõ và đề nghị người dùng để lại thông tin để chuyên viên tư vấn liên hệ. Giữ phong cách chuyên nghiệp, chân thành, khuyến khích học viên, sử dụng tiếng Việt tự nhiên và chuẩn mực.`,
  temperature: 0.2,
  similarityThreshold: 0.65,
  maxTokens: 1000,
  activeProvider: "builtin-rag",
  modelName: "gemini-1.5-flash",
  enableExternalAi: false,
  unansweredNotificationEmail: "hotro@tinhocgenz.io.vn",
};

// In-Memory Persistent Store Class
class AiStoreManager {
  private documents: AiKnowledgeDocument[] = [...DEFAULT_KNOWLEDGE_DOCUMENTS];
  private roadmaps: AiRoadmapTemplate[] = [...DEFAULT_ROADMAP_TEMPLATES];
  private conversations: Map<string, AiConversation> = new Map();
  private feedbacks: AiFeedbackItem[] = [];
  private settings: AiSettings = { ...DEFAULT_SETTINGS };

  // Documents
  getDocuments(includeArchived = false): AiKnowledgeDocument[] {
    if (includeArchived) return this.documents;
    return this.documents.filter((d) => d.status !== "ARCHIVED");
  }

  getDocumentById(id: string): AiKnowledgeDocument | undefined {
    return this.documents.find((d) => d.id === id);
  }

  createDocument(doc: Omit<AiKnowledgeDocument, "id" | "createdAt" | "updatedAt" | "version">): AiKnowledgeDocument {
    const newDoc: AiKnowledgeDocument = {
      ...doc,
      id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.documents.unshift(newDoc);
    return newDoc;
  }

  updateDocument(id: string, updates: Partial<AiKnowledgeDocument>): AiKnowledgeDocument | null {
    const idx = this.documents.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    this.documents[idx] = {
      ...this.documents[idx],
      ...updates,
      version: this.documents[idx].version + 1,
      updatedAt: new Date().toISOString(),
    };
    return this.documents[idx];
  }

  deleteDocument(id: string): boolean {
    const idx = this.documents.findIndex((d) => d.id === id);
    if (idx === -1) return false;
    this.documents.splice(idx, 1);
    return true;
  }

  // Roadmaps
  getRoadmaps(): AiRoadmapTemplate[] {
    return this.roadmaps;
  }

  getRoadmapById(id: string): AiRoadmapTemplate | undefined {
    return this.roadmaps.find((r) => r.id === id);
  }

  createRoadmap(roadmap: Omit<AiRoadmapTemplate, "id" | "createdAt" | "updatedAt">): AiRoadmapTemplate {
    const newRoadmap: AiRoadmapTemplate = {
      ...roadmap,
      id: `roadmap-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.roadmaps.unshift(newRoadmap);
    return newRoadmap;
  }

  updateRoadmap(id: string, updates: Partial<AiRoadmapTemplate>): AiRoadmapTemplate | null {
    const idx = this.roadmaps.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    this.roadmaps[idx] = {
      ...this.roadmaps[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.roadmaps[idx];
  }

  deleteRoadmap(id: string): boolean {
    const idx = this.roadmaps.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    this.roadmaps.splice(idx, 1);
    return true;
  }

  // Conversations
  getConversation(id: string): AiConversation | undefined {
    return this.conversations.get(id);
  }

  getAllConversations(): AiConversation[] {
    return Array.from(this.conversations.values()).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  saveConversation(conv: AiConversation): void {
    conv.updatedAt = new Date().toISOString();
    this.conversations.set(conv.id, conv);
  }

  deleteConversation(id: string): boolean {
    return this.conversations.delete(id);
  }

  // Feedbacks
  addFeedback(feedback: Omit<AiFeedbackItem, "id" | "createdAt">): AiFeedbackItem {
    const item: AiFeedbackItem = {
      ...feedback,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.feedbacks.unshift(item);
    return item;
  }

  getFeedbacks(): AiFeedbackItem[] {
    return this.feedbacks;
  }

  // Settings
  getSettings(): AiSettings {
    return { ...this.settings };
  }

  updateSettings(updates: Partial<AiSettings>): AiSettings {
    this.settings = {
      ...this.settings,
      ...updates,
    };
    return { ...this.settings };
  }
}

export const AiStore = new AiStoreManager();
