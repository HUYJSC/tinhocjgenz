import { NormalizedItem, AiScoreResult } from "../types";
import { AiProvider } from "./ai-provider";

export class AiRelevanceEngine {
  public static async evaluate(item: NormalizedItem): Promise<AiScoreResult> {
    const systemPrompt = `Bạn là chuyên gia thẩm định nội dung công nghệ cấp cao của nền tảng đào tạo Tin học GenZ (chuyên về MOS, IC3, Excel, Word, PowerPoint, Google Workspace, ChatGPT, AI & Kỹ năng số).
Nhiệm vụ của bạn là đánh giá mức độ phù hợp và giá trị của bài viết nguồn đối với độc giả là học sinh, sinh viên và nhân viên văn phòng Việt Nam.

Quy tắc chấm điểm (0-100):
- Topic relevance (độ sát chủ đề: Office, AI, Kỹ năng số, MOS, IC3, Tech tools): Tối đa 30 điểm
- Freshness (tính cập nhật, tin mới): Tối đa 20 điểm
- Educational value (giá trị học hỏi thực tế, mẹo hay, kiến thức bổ ích): Tối đa 20 điểm
- SEO potential (tiềm năng tìm kiếm của người dùng Việt): Tối đa 15 điểm
- Conversion potential (khả năng dẫn dắt người đọc quan tâm đến khóa học/chứng chỉ): Tối đa 15 điểm

Bắt buộc trả về định dạng JSON thuần túy theo mẫu sau:
{
  "score": 88,
  "breakdown": {
    "topicRelevance": 28,
    "freshness": 18,
    "educationalValue": 18,
    "seoPotential": 12,
    "conversionPotential": 12
  },
  "category": "Tên một trong các danh mục: AI & Trí tuệ nhân tạo | Microsoft Office & MOS | Google Workspace & IC3 | An toàn thông tin & Bảo mật | Công cụ Lập trình & Tech Trends | Kỹ năng số & Hiệu suất",
  "reason": "Giải thích ngắn gọn 1-2 câu lý do bài viết này phù hợp hoặc không phù hợp",
  "recommended": true
}`;

    const userPrompt = `ĐÁNH GIÁ ĐỘ PHÙ HỢP [AI_SCORE]:
Tiêu đề gốc: ${item.title}
Nguồn tin: ${item.sourceName} (${item.sourceUrl})
Tóm tắt nội dung gốc: ${item.description.slice(0, 800)}
Nội dung chi tiết: ${item.content.slice(0, 1500)}`;

    try {
      const rawText = await AiProvider.generateText({
        systemPrompt,
        userPrompt,
        responseFormat: "json",
        temperature: 0.3,
      });

      const parsed = JSON.parse(rawText.replace(/```json/g, "").replace(/```/g, "").trim());
      const score = typeof parsed.score === "number" ? Math.min(100, Math.max(0, parsed.score)) : 80;

      return {
        score,
        breakdown: {
          topicRelevance: parsed.breakdown?.topicRelevance ?? Math.round(score * 0.3),
          freshness: parsed.breakdown?.freshness ?? Math.round(score * 0.2),
          educationalValue: parsed.breakdown?.educationalValue ?? Math.round(score * 0.2),
          seoPotential: parsed.breakdown?.seoPotential ?? Math.round(score * 0.15),
          conversionPotential: parsed.breakdown?.conversionPotential ?? Math.round(score * 0.15),
        },
        category: parsed.category || "AI & Trí tuệ nhân tạo",
        reason: parsed.reason || "Bài viết có giá trị thực tiễn cho học tập và kỹ năng số văn phòng.",
        recommended: score >= 60,
      };
    } catch (err) {
      console.warn("[AiRelevanceEngine] Fallback scoring used due to parsing error:", err);
      // Fallback heuristic scoring
      const keywords = ["excel", "word", "office", "microsoft", "google", "ai", "copilot", "gemini", "chatgpt", "security", "mos", "ic3"];
      const matched = keywords.filter((k) => (item.title + " " + item.description).toLowerCase().includes(k)).length;
      const score = Math.min(95, 70 + matched * 5);

      return {
        score,
        breakdown: {
          topicRelevance: Math.min(30, 20 + matched * 2),
          freshness: 18,
          educationalValue: 18,
          seoPotential: 12,
          conversionPotential: 12,
        },
        category: "AI & Trí tuệ nhân tạo",
        reason: "Bài viết chứa các từ khóa công nghệ trọng tâm phù hợp với đối tượng học viên Tin học GenZ.",
        recommended: score >= 60,
      };
    }
  }
}
