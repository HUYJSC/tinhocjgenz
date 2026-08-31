import fs from "fs";
import path from "path";
import {
  Source,
  Article,
  Category,
  AuditLog,
  SocialPost,
  ContentEngineMetrics,
} from "./types";
import { DEFAULT_SOURCES, DEFAULT_CATEGORIES } from "./default-sources";

// Storage path in workspace or /tmp in serverless environments
const DATA_DIR = path.join(process.cwd(), "data", "content-engine");
const SOURCES_FILE = path.join(DATA_DIR, "sources.json");
const ARTICLES_FILE = path.join(DATA_DIR, "articles.json");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");
const LOGS_FILE = path.join(DATA_DIR, "audit_logs.json");
const SOCIAL_FILE = path.join(DATA_DIR, "social_posts.json");

// In-memory fallback if file system is read-only
let memorySources: Source[] = [...DEFAULT_SOURCES];
let memoryCategories: Category[] = [...DEFAULT_CATEGORIES];
let memoryArticles: Article[] = [];
let memoryLogs: AuditLog[] = [];
let memorySocial: SocialPost[] = [];

// Seed initial demo published articles so the website is instantly rich with content
const INITIAL_ARTICLES: Article[] = [
  {
    id: "art-excel-ai-copilot-2026",
    sourceId: "src-ms-365",
    sourceName: "Microsoft 365 Updates",
    originalUrl: "https://www.microsoft.com/en-us/microsoft-365/blog/excel-ai-copilot-update",
    originalTitle: "Announcing Next-Gen Copilot Actions and Python in Excel for Business Users",
    originalDescription: "Microsoft announces powerful new updates for Excel with Copilot actions, enabling automated data cleansing, formula suggestion, and advanced forecasting.",
    originalContent: "Today we are bringing Python in Excel and Copilot AI agents to all Microsoft 365 business subscribers...",
    originalAuthor: "Microsoft 365 Team",
    originalPublishedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),

    title: "Microsoft nâng cấp Copilot trong Excel: Tự động viết hàm, làm sạch dữ liệu và dự báo kinh doanh",
    slug: "microsoft-nang-cap-copilot-trong-excel-tu-dong-viet-ham-du-bao",
    excerpt: "Bản cập nhật mới nhất từ Microsoft giúp người dùng Excel tạo hàm phức tạp, phân tích dữ liệu chuyên sâu chỉ bằng câu lệnh tiếng Việt tự nhiên.",
    content: `## Mở đầu ngắn
Microsoft vừa chính thức công bố bản cập nhật đột phá cho bộ công cụ Excel trên Microsoft 365, tích hợp sâu trí tuệ nhân tạo **Copilot thế hệ mới** cùng khả năng chạy mã phân tích dữ liệu tự động.

## Nội dung mới là gì?
Trước đây, để phân tích các bộ dữ liệu lớn với hàng chục ngàn dòng, người dùng phải ghi nhớ hàng loạt hàm lồng nhau như \`XLOOKUP\`, \`INDEX/MATCH\`, \`SUMIFS\` hay viết macro VBA phức tạp. 

Với bản nâng cấp này:
- **Tự động viết hàm theo ngữ cảnh:** Bạn chỉ cần gõ yêu cầu bằng ngôn ngữ tự nhiên (ví dụ: *"Tìm top 5 nhân viên có doanh số cao nhất quý 3 và tính hoa hồng 7%"*), Copilot sẽ tự động sinh công thức chính xác 100%.
- **Làm sạch bảng tính tức thì:** Phát hiện dữ liệu trùng lặp, ô trống hoặc định dạng sai ngày tháng chỉ với 1 click.
- **Vẽ biểu đồ thông minh:** Tự động đề xuất dạng biểu đồ phù hợp nhất với cấu trúc bảng số liệu.

## Có gì đáng chú ý đối với sinh viên và dân văn phòng?
Điểm sáng lớn nhất là giao diện trực quan, không đòi hỏi kiến thức lập trình chuyên sâu. Ngay cả khi bạn chỉ mới nắm kiến thức Tin học văn phòng cơ bản, Copilot vẫn đóng vai trò như một chuyên gia số liệu đồng hành hỗ trợ 24/7.

## Ảnh hưởng đến công việc thực tế
1. **Tiết kiệm tới 70% thời gian xử lý báo cáo tuần/tháng.**
2. **Hạn chế tối đa lỗi logic:** Tránh các lỗi công thức thường gặp như \`#N/A\`, \`#VALUE!\`.
3. **Nâng cao năng lực cạnh tranh:** Kỹ năng kết hợp Excel và AI hiện là tiêu chí tuyển dụng hàng đầu tại các doanh nghiệp.

## Ai nên quan tâm?
- Sinh viên các khối ngành Kinh tế, Tài chính, Kế toán, Quản trị kinh doanh.
- Nhân viên văn phòng, chuyên viên phân tích dữ liệu, kế toán viên.
- Thí sinh đang ôn luyện chứng chỉ quốc tế **MOS Excel (Associate / Expert)**.

## Cách áp dụng thực tế
1. Luôn chuẩn hóa tiêu đề cột và cấu trúc bảng trước khi gọi trợ lý AI.
2. Kiểm tra lại kết quả công thức do AI sinh ra để hiểu bản chất hàm.
3. Rèn luyện tư duy đặt câu lệnh (Prompting) rõ ràng, cụ thể về các điều kiện lọc.

## Kết luận
AI không thay thế người dùng Excel, nhưng người biết ứng dụng AI vào Excel chắc chắn sẽ làm việc nhanh và hiệu quả hơn gấp nhiều lần. Hãy chủ động cập nhật kỹ năng ngay từ hôm nay!`,
    metaTitle: "Microsoft Nâng Cấp Copilot Trong Excel: Tự Động Viết Hàm & Phân Tích Dữ Liệu",
    metaDescription: "Tìm hiểu bản cập nhật Microsoft Copilot trong Excel giúp tự động viết hàm, làm sạch dữ liệu và lập báo cáo nhanh chóng cho dân văn phòng và sinh viên.",
    keywords: ["Excel AI", "Microsoft Copilot", "Tin học văn phòng", "Học Excel", "MOS Excel", "Phân tích dữ liệu"],
    categoryId: "cat-office",
    categoryName: "Microsoft Office & MOS",
    tags: ["Excel", "Copilot", "Microsoft 365", "MOS", "Tin học văn phòng"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Bạn muốn làm chủ các hàm Excel từ cơ bản đến nâng cao và tự tin chinh phục chứng chỉ MOS? Khám phá ngay lộ trình học Excel chuẩn quốc tế tại Tin học GenZ!",
    readingTimeMinutes: 4,

    aiScore: 94,
    aiScoreBreakdown: {
      topicRelevance: 30,
      freshness: 19,
      educationalValue: 19,
      seoPotential: 14,
      conversionPotential: 12,
    },
    aiReason: "Nội dung liên quan mật thiết đến kỹ năng Excel và ứng dụng AI thực tế cho sinh viên và dân công sở.",
    aiTone: "Dễ hiểu",
    status: "PUBLISHED",
    publishedAt: new Date(Date.now() - 3600 * 1000 * 20).toISOString(),
    views: 342,
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "art-gemini-workspace-2026",
    sourceId: "src-google-workspace",
    sourceName: "Google Workspace Updates",
    originalUrl: "https://workspaceupdates.googleblog.com/gemini-side-panel-features",
    originalTitle: "Gemini in Google Docs and Gmail gets smarter context-aware suggestions",
    originalDescription: "Google rolls out deeper Gemini integration across Docs, Sheets, and Gmail with real-time grammar refinement and email summarization.",
    originalContent: "We are expanding Gemini capabilities across Google Docs, Sheets, and Slides with advanced context awareness...",
    originalAuthor: "Google Workspace Team",
    originalPublishedAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),

    title: "Google tích hợp Gemini vào Docs và Gmail: Soạn thảo văn bản và tóm tắt email thông minh",
    slug: "google-tich-hop-gemini-vao-docs-va-gmail-soan-thao-thong-minh",
    excerpt: "Tính năng Gemini Side Panel mới trên Google Workspace giúp sinh viên và nhân sự văn phòng viết email chuẩn chỉ và tra cứu tài liệu tức thì.",
    content: `## Mở đầu ngắn
Google tiếp tục nâng tầm hệ sinh thái Google Workspace khi triển khai tính năng **Gemini Side Panel** cải tiến trên toàn cầu, hỗ trợ người dùng làm việc trực tiếp trên Google Docs, Gmail và Google Drive.

## Nội dung mới là gì?
- **Tóm tắt chuỗi email dài:** Chỉ với 1 chạm, bạn có thể nắm bắt toàn bộ nội dung của hàng chục email trao đổi trong công việc.
- **Hỗ trợ viết văn bản học thuật & thương mại:** Đề xuất câu chữ trau chuốt, kiểm tra ngữ pháp tiếng Việt và tiếng Anh chuẩn mực.
- **Tìm kiếm thông tin chéo tài liệu:** Yêu cầu Gemini tìm thông tin từ file Google Drive liên quan mà không cần mở từng tài liệu để đọc.

## Có gì đáng chú ý?
Giao diện thanh bên (Side Panel) được thiết kế đồng bộ, không làm gián đoạn dòng suy nghĩ của bạn khi đang làm việc. Điều này giúp tối ưu hóa không gian làm việc trực quan trên cả máy tính bàn lẫn laptop.

## Ai nên quan tâm?
- Người dùng thường xuyên làm việc trên môi trường Google Workspace.
- Học sinh, sinh viên chuẩn bị bài thuyết trình, khóa luận và tiểu luận.
- Ứng viên đang ôn thi chứng chỉ quốc tế **IC3 GS6 / IC3 Spark**.

## Kết luận
Việc kết hợp thành thạo các công cụ đám mây của Google cùng trợ lý ảo AI sẽ giúp bạn tăng tốc độ xử lý công việc và xây dựng tác phong làm việc chuẩn mực số.`,
    metaTitle: "Google Tích Hợp Gemini Vào Docs & Gmail: Trợ Lý Soạn Thảo Đỉnh Cao",
    metaDescription: "Khám phá các tính năng mới của Google Gemini trên Google Docs và Gmail giúp tăng tốc độ làm việc và soạn thảo chuyên nghiệp.",
    keywords: ["Google Gemini", "Google Docs", "Google Workspace", "IC3", "Kỹ năng số"],
    categoryId: "cat-google",
    categoryName: "Google Workspace & IC3",
    tags: ["Google Docs", "Gmail", "Gemini", "IC3", "Google Workspace"],
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Nâng cao năng lực làm việc trực tuyến và sở hữu chứng chỉ tin học quốc tế IC3 cùng đội ngũ giảng viên tận tâm tại Tin học GenZ.",
    readingTimeMinutes: 3,

    aiScore: 91,
    aiScoreBreakdown: {
      topicRelevance: 28,
      freshness: 18,
      educationalValue: 19,
      seoPotential: 13,
      conversionPotential: 13,
    },
    aiReason: "Phù hợp chủ đề kỹ năng số Google Workspace và chứng chỉ tin học quốc tế IC3.",
    aiTone: "Dễ hiểu",
    status: "PUBLISHED",
    publishedAt: new Date(Date.now() - 3600 * 1000 * 36).toISOString(),
    views: 215,
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "art-security-phishing-2026",
    sourceId: "src-bleeping-computer",
    sourceName: "BleepingComputer Cybersecurity",
    originalUrl: "https://www.bleepingcomputer.com/news/security/new-qr-code-phishing-tactics",
    originalTitle: "CISA and Security Experts Warn of Sophisticated Quishing and Session Hijacking Attacks",
    originalDescription: "Security researchers observe a sharp rise in QR-code phishing (Quishing) targeting corporate email accounts and MFA tokens.",
    originalContent: "Cybersecurity authorities have issued an advisory regarding advanced quishing campaigns...",
    originalAuthor: "BleepingComputer Staff",
    originalPublishedAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),

    title: "Cảnh báo thủ đoạn lừa đảo Quishing qua mã QR: Dân văn phòng và sinh viên cần hết sức cảnh giác",
    slug: "canh-bao-thu-doan-lua-dao-quishing-qua-ma-qr-can-canh-giac",
    excerpt: "Các chuyên gia an toàn thông tin cảnh báo làn sóng lừa đảo bằng mã QR giả mạo trong email công việc nhằm đánh cắp tài khoản ngân hàng và mạng xã hội.",
    content: `## Mở đầu ngắn
Hình thức lừa đảo qua mã QR (hay còn gọi là **Quishing - QR Phishing**) đang bùng phát mạnh mẽ, lợi dụng thói quen quét mã thanh toán và xác thực nhanh của người dùng trẻ.

## Thủ đoạn mới diễn ra như thế nào?
Kẻ xấu gửi email giả danh ngân hàng, cơ quan thuế, hoặc thông báo cập nhật tài khoản Microsoft/Google của công ty:
1. Email không chứa liên kết chữ (link) mà đính kèm **một hình ảnh mã QR**.
2. Bộ lọc bảo mật email truyền thống khó phát hiện link độc hại ẩn bên trong ảnh mã QR.
3. Khi người dùng dùng camera điện thoại quét mã, trang web đăng nhập giả mạo sẽ xuất hiện nhằm chiếm đoạt mật khẩu và mã OTP/MFA.

## Cách phòng chống và nhận diện
- **Tuyệt đối không quét mã QR từ các email lạ** yêu cầu đăng nhập lại tài khoản hoặc nộp phạt.
- **Kiểm tra kỹ tên miền trên thanh địa chỉ trình duyệt:** Đảm bảo địa chỉ web chính xác 100% trước khi nhập mật khẩu.
- **Bật xác thực đa yếu tố bằng ứng dụng Authenticator**, hạn chế dùng mã OTP gửi qua SMS.

## Kết luận
Bảo mật thông tin cá nhân là kỹ năng sinh tồn trong kỷ nguyên số. Hãy luôn duy trì sự cẩn trọng trước mọi yêu cầu quét mã QR bất thường!`,
    metaTitle: "Cảnh Báo Thủ Đoạn Lừa Đảo Quishing Qua Mã QR & Cách Phòng Tránh",
    metaDescription: "Tìm hiểu về mã độc Quishing qua mã QR và các quy tắc bảo mật an toàn thông tin cá nhân dành cho sinh viên và nhân viên văn phòng.",
    keywords: ["An toàn thông tin", "Quishing", "Lừa đảo mã QR", "Bảo mật", "Kỹ năng số"],
    categoryId: "cat-security",
    categoryName: "An toàn thông tin & Bảo mật",
    tags: ["Bảo mật", "An toàn thông tin", "Quishing", "Kỹ năng số"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Trang bị nền tảng an toàn thông tin vững chắc và kỹ năng làm việc số chuẩn quốc tế tại Tin học GenZ.",
    readingTimeMinutes: 3,

    aiScore: 89,
    aiScoreBreakdown: {
      topicRelevance: 27,
      freshness: 17,
      educationalValue: 20,
      seoPotential: 13,
      conversionPotential: 12,
    },
    aiReason: "Nội dung mang tính cảnh báo và giáo dục an toàn số cao cho cộng đồng độc giả trẻ.",
    aiTone: "Chuyên gia",
    status: "PUBLISHED",
    publishedAt: new Date(Date.now() - 3600 * 1000 * 60).toISOString(),
    views: 189,
    createdAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper: Ensure directory exists
function ensureDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("[ContentEngineDB] Warning: Could not create directory on disk, using in-memory state:", err);
  }
}

// Helper: Read JSON file safely
function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn(`[ContentEngineDB] Warning reading ${filePath}:`, err);
  }
  return fallback;
}

// Helper: Write JSON file safely
function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    ensureDirectory();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn(`[ContentEngineDB] Warning writing ${filePath}:`, err);
  }
}

// Initialize database with seed files if not already present
export function initContentEngineDb(): void {
  ensureDirectory();

  // Sources
  if (!fs.existsSync(SOURCES_FILE)) {
    writeJsonFile(SOURCES_FILE, DEFAULT_SOURCES);
    memorySources = [...DEFAULT_SOURCES];
  } else {
    memorySources = readJsonFile<Source[]>(SOURCES_FILE, DEFAULT_SOURCES);
  }

  // Categories
  if (!fs.existsSync(CATEGORIES_FILE)) {
    writeJsonFile(CATEGORIES_FILE, DEFAULT_CATEGORIES);
    memoryCategories = [...DEFAULT_CATEGORIES];
  } else {
    memoryCategories = readJsonFile<Category[]>(CATEGORIES_FILE, DEFAULT_CATEGORIES);
  }

  // Articles
  if (!fs.existsSync(ARTICLES_FILE)) {
    writeJsonFile(ARTICLES_FILE, INITIAL_ARTICLES);
    memoryArticles = [...INITIAL_ARTICLES];
  } else {
    memoryArticles = readJsonFile<Article[]>(ARTICLES_FILE, INITIAL_ARTICLES);
  }

  // Logs
  if (!fs.existsSync(LOGS_FILE)) {
    const initialLog: AuditLog = {
      id: "log-init",
      action: "source_add",
      entityType: "system",
      entityId: "system",
      user: "System",
      details: "Hệ thống Tin học GenZ Content Engine khởi tạo thành công.",
      timestamp: new Date().toISOString(),
    };
    writeJsonFile(LOGS_FILE, [initialLog]);
    memoryLogs = [initialLog];
  } else {
    memoryLogs = readJsonFile<AuditLog[]>(LOGS_FILE, []);
  }

  // Social
  if (!fs.existsSync(SOCIAL_FILE)) {
    writeJsonFile(SOCIAL_FILE, []);
    memorySocial = [];
  } else {
    memorySocial = readJsonFile<SocialPost[]>(SOCIAL_FILE, []);
  }
}

// Initialize immediately on module load
initContentEngineDb();

// ==========================================
// SOURCE OPERATIONS
// ==========================================
export const ContentDb = {
  getSources(): Source[] {
    const fromFile = readJsonFile<Source[]>(SOURCES_FILE, memorySources);
    memorySources = fromFile;
    return fromFile;
  },

  getSourceById(id: string): Source | undefined {
    return this.getSources().find((s) => s.id === id);
  },

  saveSource(source: Source): Source {
    const sources = this.getSources();
    const index = sources.findIndex((s) => s.id === source.id);
    if (index >= 0) {
      sources[index] = { ...source, updatedAt: new Date().toISOString() };
    } else {
      sources.unshift(source);
    }
    writeJsonFile(SOURCES_FILE, sources);
    memorySources = sources;
    this.addAuditLog({
      action: index >= 0 ? "source_edit" : "source_add",
      entityType: "source",
      entityId: source.id,
      user: "Admin",
      details: `Đã ${index >= 0 ? "cập nhật" : "thêm"} nguồn tin: ${source.name}`,
    });
    return source;
  },

  deleteSource(id: string): boolean {
    let sources = this.getSources();
    const target = sources.find((s) => s.id === id);
    if (!target) return false;
    sources = sources.filter((s) => s.id !== id);
    writeJsonFile(SOURCES_FILE, sources);
    memorySources = sources;
    this.addAuditLog({
      action: "source_delete",
      entityType: "source",
      entityId: id,
      user: "Admin",
      details: `Đã xóa nguồn tin: ${target.name}`,
    });
    return true;
  },

  // ==========================================
  // CATEGORIES OPERATIONS
  // ==========================================
  getCategories(): Category[] {
    return readJsonFile<Category[]>(CATEGORIES_FILE, memoryCategories);
  },

  // ==========================================
  // ARTICLE OPERATIONS
  // ==========================================
  getArticles(): Article[] {
    const articles = readJsonFile<Article[]>(ARTICLES_FILE, memoryArticles);
    memoryArticles = articles;
    return articles;
  },

  getPublishedArticles(): Article[] {
    return this.getArticles()
      .filter((a) => a.status === "PUBLISHED")
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  },

  getArticleById(id: string): Article | undefined {
    return this.getArticles().find((a) => a.id === id);
  },

  getArticleBySlug(slug: string): Article | undefined {
    return this.getArticles().find((a) => a.slug === slug && a.status === "PUBLISHED");
  },

  saveArticle(article: Article): Article {
    const articles = this.getArticles();
    const index = articles.findIndex((a) => a.id === article.id);
    if (index >= 0) {
      articles[index] = { ...article, updatedAt: new Date().toISOString() };
    } else {
      articles.unshift(article);
    }
    writeJsonFile(ARTICLES_FILE, articles);
    memoryArticles = articles;
    return article;
  },

  saveArticlesBatch(newArticles: Article[]): number {
    const articles = this.getArticles();
    let count = 0;
    for (const art of newArticles) {
      const idx = articles.findIndex((a) => a.id === art.id);
      if (idx >= 0) {
        articles[idx] = art;
      } else {
        articles.unshift(art);
        count++;
      }
    }
    writeJsonFile(ARTICLES_FILE, articles);
    memoryArticles = articles;
    return count;
  },

  deleteArticle(id: string): boolean {
    let articles = this.getArticles();
    const target = articles.find((a) => a.id === id);
    if (!target) return false;
    articles = articles.filter((a) => a.id !== id);
    writeJsonFile(ARTICLES_FILE, articles);
    memoryArticles = articles;
    this.addAuditLog({
      action: "delete",
      entityType: "article",
      entityId: id,
      user: "Admin",
      details: `Đã xóa bài viết: ${target.title || target.originalTitle}`,
    });
    return true;
  },

  // ==========================================
  // METRICS & AUDIT LOGS
  // ==========================================
  getMetrics(): ContentEngineMetrics {
    const sources = this.getSources();
    const articles = this.getArticles();

    const todayStr = new Date().toISOString().slice(0, 10);
    const fetchedToday = articles.filter((a) => a.createdAt.startsWith(todayStr)).length;

    const newCount = articles.filter((a) => a.status === "NEW" || a.status === "FETCHED").length;
    const aiDraftCount = articles.filter((a) => a.status === "AI_DRAFT").length;
    const reviewCount = articles.filter((a) => a.status === "REVIEW").length;
    const approvedCount = articles.filter((a) => a.status === "APPROVED").length;
    const scheduledCount = articles.filter((a) => a.status === "SCHEDULED").length;
    const publishedCount = articles.filter((a) => a.status === "PUBLISHED").length;
    const rejectedCount = articles.filter((a) => a.status === "REJECTED").length;
    const duplicateCount = articles.filter((a) => a.status === "DUPLICATE").length;
    const errorCount = articles.filter((a) => a.status === "FAILED").length;

    const scoredArticles = articles.filter((a) => a.aiScore > 0);
    const avgAiScore =
      scoredArticles.length > 0
        ? Math.round(scoredArticles.reduce((acc, cur) => acc + cur.aiScore, 0) / scoredArticles.length)
        : 85;

    return {
      totalSources: sources.length,
      activeSources: sources.filter((s) => s.isActive).length,
      totalArticles: articles.length,
      fetchedToday,
      newCount,
      aiDraftCount,
      reviewCount,
      approvedCount,
      scheduledCount,
      publishedCount,
      rejectedCount,
      duplicateCount,
      errorCount,
      avgAiScore,
    };
  },

  getAuditLogs(): AuditLog[] {
    return readJsonFile<AuditLog[]>(LOGS_FILE, memoryLogs).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  addAuditLog(log: Omit<AuditLog, "id" | "timestamp">): AuditLog {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    // Keep max 500 logs
    const trimmed = logs.slice(0, 500);
    writeJsonFile(LOGS_FILE, trimmed);
    memoryLogs = trimmed;
    return newLog;
  },

  // ==========================================
  // SOCIAL POSTS
  // ==========================================
  getSocialPosts(): SocialPost[] {
    return readJsonFile<SocialPost[]>(SOCIAL_FILE, memorySocial);
  },

  saveSocialPost(post: SocialPost): SocialPost {
    const posts = this.getSocialPosts();
    const idx = posts.findIndex((p) => p.id === post.id);
    if (idx >= 0) {
      posts[idx] = post;
    } else {
      posts.unshift(post);
    }
    writeJsonFile(SOCIAL_FILE, posts);
    memorySocial = posts;
    return post;
  },
};
