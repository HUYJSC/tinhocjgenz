import { Article, SocialPost } from "../types";
import { AiProvider } from "./ai-provider";

export class SocialDistributionService {
  private static BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tinhocgenz.io.vn";

  public static async generateSocialPosts(article: Article): Promise<SocialPost[]> {
    const articleUrl = `${this.BASE_URL}/tin-cong-nghe/${article.slug}`;

    const systemPrompt = `Bạn là Social Media Manager chuyên nghiệp của Tin học GenZ.
Hãy tạo 3 bài đăng mạng xã hội (Facebook, Zalo, Telegram) cho bài viết công nghệ mới nhất.
Yêu cầu:
1. Facebook: 100-200 từ, có emoji bắt mắt, câu mở đầu kích thích tò mò, 3 gạch đầu dòng điểm nhấn, CTA kêu gọi đọc bài chi tiết kèm link, 3-5 hashtag.
2. Zalo: 50-120 từ, súc tích, chuyên nghiệp, thông tin trọng tâm, kèm link.
3. Telegram: 50-150 từ, định dạng gọn gàng, phù hợp cộng đồng tech/học viên, kèm link và hashtag.

Bắt buộc trả về định dạng JSON thuần túy theo mẫu sau:
{
  "facebook": "Nội dung bài đăng Facebook...",
  "zalo": "Nội dung bài đăng Zalo...",
  "telegram": "Nội dung bài đăng Telegram..."
}`;

    const userPrompt = `Tiêu đề: ${article.title}
Tóm tắt: ${article.excerpt}
Chủ đề: ${article.categoryName}
Link bài viết: ${articleUrl}
CTA: ${article.ctaText || ""}`;

    try {
      const rawText = await AiProvider.generateText({
        systemPrompt,
        userPrompt,
        responseFormat: "json",
        temperature: 0.7,
      });

      const parsed = JSON.parse(rawText.replace(/```json/g, "").replace(/```/g, "").trim());

      const posts: SocialPost[] = [
        {
          id: `sp-fb-${Date.now()}`,
          articleId: article.id,
          platform: "facebook",
          content: parsed.facebook || `🔥 CẬP NHẬT CÔNG NGHỆ: ${article.title}\n\n${article.excerpt}\n\n👉 Xem chi tiết ngay tại: ${articleUrl}\n\n#TinHocGenZ #TinCongNghe #MOS #IC3`,
          status: "READY",
          createdAt: new Date().toISOString(),
        },
        {
          id: `sp-zalo-${Date.now()}`,
          articleId: article.id,
          platform: "zalo",
          content: parsed.zalo || `[Tin công nghệ] ${article.title}\n\n${article.excerpt}\n\nKhám phá tại: ${articleUrl}`,
          status: "READY",
          createdAt: new Date().toISOString(),
        },
        {
          id: `sp-tele-${Date.now()}`,
          articleId: article.id,
          platform: "telegram",
          content: parsed.telegram || `⚡️ **${article.title}**\n\n${article.excerpt}\n\n🔗 [Đọc toàn bộ bài viết](${articleUrl})`,
          status: "READY",
          createdAt: new Date().toISOString(),
        },
      ];

      return posts;
    } catch {
      return [
        {
          id: `sp-fb-${Date.now()}`,
          articleId: article.id,
          platform: "facebook",
          content: `🚀 **${article.title}**\n\n${article.excerpt}\n\n👉 Đọc ngay bài phân tích chuyên sâu tại: ${articleUrl}\n\n#TinHocGenZ #CongNghe #KyNangSo`,
          status: "READY",
          createdAt: new Date().toISOString(),
        },
        {
          id: `sp-zalo-${Date.now()}`,
          articleId: article.id,
          platform: "zalo",
          content: `📌 ${article.title}\n${article.excerpt}\nChi tiết: ${articleUrl}`,
          status: "READY",
          createdAt: new Date().toISOString(),
        },
        {
          id: `sp-tele-${Date.now()}`,
          articleId: article.id,
          platform: "telegram",
          content: `📢 **${article.title}**\n\n${article.excerpt}\n\n🌐 Link: ${articleUrl}`,
          status: "READY",
          createdAt: new Date().toISOString(),
        },
      ];
    }
  }
}
