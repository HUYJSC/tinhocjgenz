import { NormalizedItem, AiContentResult } from "../types";
import { AiProvider } from "./ai-provider";

export type RewriteTone =
  | "Dễ hiểu"
  | "Ngắn gọn"
  | "Chi tiết"
  | "Chuyên gia"
  | "Chuẩn SEO"
  | "Dành cho học sinh"
  | "Dành cho dân văn phòng";

export class AiContentEditorService {
  // Convert Vietnamese string to clean SEO slug
  public static slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  // Calculate estimated reading time
  public static calculateReadingTime(text: string): number {
    const wordCount = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }

  // Generate contextual CTA based on content topics
  public static generateCta(title: string, content: string): string {
    const lower = (title + " " + content).toLowerCase();

    if (lower.includes("excel") || lower.includes("bảng tính") || lower.includes("hàm")) {
      return "Bạn muốn làm chủ các hàm Excel từ cơ bản đến nâng cao và tự tin chinh phục chứng chỉ MOS? Khám phá ngay lộ trình học Excel chuẩn quốc tế tại Tin học GenZ!";
    }
    if (lower.includes("mos") || lower.includes("chứng chỉ") || lower.includes("word") || lower.includes("powerpoint")) {
      return "Bạn đang chuẩn bị thi chứng chỉ MOS để xét tốt nghiệp hoặc ứng tuyển việc làm? Tham khảo ngay khóa luyện thi MOS cấp tốc tại Tin học GenZ!";
    }
    if (lower.includes("ic3") || lower.includes("google") || lower.includes("gmail") || lower.includes("docs")) {
      return "Nâng cao năng lực làm việc trực tuyến và sở hữu chứng chỉ tin học quốc tế IC3 cùng đội ngũ giảng viên tận tâm tại Tin học GenZ.";
    }
    if (lower.includes("ai") || lower.includes("gemini") || lower.includes("chatgpt") || lower.includes("copilot")) {
      return "Khám phá các khóa học ứng dụng AI thực chiến dành riêng cho học sinh, sinh viên và dân văn phòng tại Tin học GenZ!";
    }
    if (lower.includes("bảo mật") || lower.includes("an toàn") || lower.includes("lừa đảo")) {
      return "Trang bị nền tảng an toàn thông tin vững chắc và kỹ năng số bảo mật toàn diện tại Tin học GenZ.";
    }

    return "Nâng cao kỹ năng tin học văn phòng và công nghệ số cùng hệ thống khóa học thực chiến tại Tin học GenZ!";
  }

  // Main AI Rewriter
  public static async rewrite(
    item: NormalizedItem,
    tone: RewriteTone = "Dễ hiểu",
    customCategory?: string
  ): Promise<AiContentResult> {
    const systemPrompt = `Bạn là Senior Content Editor kiêm chuyên gia công nghệ của website Tin học GenZ (https://tinhocgenz.io.vn).
Nhiệm vụ của bạn là:
1. Đọc và hiểu toàn bộ nội dung từ bài viết nguồn (tiếng Anh hoặc tiếng Việt).
2. Lấy ra các sự kiện, dữ liệu kỹ thuật và điểm cốt lõi quan trọng nhất.
3. TUYỆT ĐỐI KHÔNG DỊCH MÁY NGUYÊN VĂN BÀI GỐC. Hãy viết lại một bài viết HOÀN TOÀN ĐỘC LẬP bằng tiếng Việt tự nhiên, gãy gọn, chuyên nghiệp, hấp dẫn.
4. Điều chỉnh văn phong theo yêu cầu Tone: "${tone}".
5. Đảm bảo cấu trúc bài viết có các đề mục Markdown rõ ràng (H2: ##):
   - ## Mở đầu ngắn
   - ## Nội dung mới là gì?
   - ## Có gì đáng chú ý?
   - ## Ảnh hưởng đến người dùng và công việc thực tế
   - ## Ai nên quan tâm?
   - ## Cách áp dụng thực tế
   - ## Kết luận

Bắt buộc trả về đúng định dạng JSON thuần túy theo mẫu sau:
{
  "title": "Tiêu đề tiếng Việt hấp dẫn, chuẩn SEO, không giật tít quá đà (60-80 ký tự)",
  "slug": "slug-tieng-viet-khong-dau-ngan-gon",
  "excerpt": "Đoạn tóm tắt ngắn 2-3 câu nêu bật giá trị cốt lõi của bài viết (120-160 ký tự)",
  "content": "Nội dung bài viết đầy đủ theo cấu trúc các đề mục Markdown ở trên...",
  "metaTitle": "Tiêu đề SEO (dưới 65 ký tự)",
  "metaDescription": "Mô tả SEO chuẩn thu hút click (dưới 160 ký tự)",
  "keywords": ["từ khóa 1", "từ khóa 2", "từ khóa 3", "từ khóa 4", "từ khóa 5"],
  "category": "${customCategory || "AI & Trí tuệ nhân tạo"}",
  "tags": ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
  "cta": "Lời kêu gọi hành động khóa học phù hợp tại Tin học GenZ"
}`;

    const userPrompt = `VIẾT LẠI BÀI VIẾT CHO TIN HỌC GENZ:
Nguồn: ${item.sourceName} (${item.sourceUrl})
Tiêu đề nguồn: ${item.title}
Tóm tắt nguồn: ${item.description}
Nội dung chi tiết: ${item.content}
Tone yêu cầu: ${tone}`;

    try {
      const rawText = await AiProvider.generateText({
        systemPrompt,
        userPrompt,
        responseFormat: "json",
        temperature: 0.7,
      });

      const parsed = JSON.parse(rawText.replace(/```json/g, "").replace(/```/g, "").trim());

      const generatedTitle = parsed.title || item.title;
      const slug = this.slugify(parsed.slug || generatedTitle);
      const content = parsed.content || item.description;
      const readingTimeMinutes = this.calculateReadingTime(content);
      const cta = parsed.cta || this.generateCta(generatedTitle, content);

      return {
        title: generatedTitle,
        slug,
        excerpt: parsed.excerpt || item.description.slice(0, 160),
        content,
        metaTitle: parsed.metaTitle || generatedTitle,
        metaDescription: parsed.metaDescription || (parsed.excerpt || item.description).slice(0, 160),
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords : ["Tin công nghệ", "Tin học GenZ", "Kỹ năng số"],
        category: parsed.category || customCategory || "AI & Trí tuệ nhân tạo",
        tags: Array.isArray(parsed.tags) ? parsed.tags : ["Công nghệ", "Kỹ năng số", "Tin học GenZ"],
        cta,
        readingTimeMinutes,
        sourceName: item.sourceName,
        sourceUrl: item.originalUrl,
      };
    } catch (err) {
      console.warn("[AiContentEditorService] Fallback rewrite used due to parsing error:", err);

      const generatedTitle = `Cập nhật mới từ ${item.sourceName}: ${item.title}`;
      const slug = this.slugify(item.title);
      const cta = this.generateCta(generatedTitle, item.description);

      return {
        title: generatedTitle,
        slug,
        excerpt: item.description.slice(0, 160),
        content: `## Mở đầu ngắn\n${item.description}\n\n## Nội dung mới là gì?\nThông tin được ghi nhận từ ${item.sourceName} mang đến nhiều cải tiến đáng giá cho người dùng công nghệ.\n\n## Có gì đáng chú ý?\n- Tính năng trực quan, dễ tiếp cận.\n- Tối ưu hiệu quả làm việc và học tập.\n\n## Ai nên quan tâm?\nHọc sinh, sinh viên và nhân viên văn phòng quan tâm đến kỹ năng số và công nghệ hiện đại.\n\n## Kết luận\nViệc thường xuyên cập nhật kiến thức công nghệ sẽ giúp bạn luôn dẫn đầu và nâng cao hiệu suất làm việc mỗi ngày.`,
        metaTitle: generatedTitle.slice(0, 65),
        metaDescription: item.description.slice(0, 160),
        keywords: ["Tin công nghệ", "Tin học GenZ", "Kỹ năng số", item.sourceName],
        category: customCategory || "AI & Trí tuệ nhân tạo",
        tags: ["Công nghệ", "Kỹ năng số", item.sourceName],
        cta,
        readingTimeMinutes: this.calculateReadingTime(item.description),
        sourceName: item.sourceName,
        sourceUrl: item.originalUrl,
      };
    }
  }
}
