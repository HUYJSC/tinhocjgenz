import { NextRequest, NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const article = ContentDb.getArticleById(id);
    if (!article) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const scheduleDate = body.scheduledAt;

    if (scheduleDate) {
      article.status = "SCHEDULED";
      article.scheduledAt = scheduleDate;
      ContentDb.addAuditLog({
        action: "schedule",
        entityType: "article",
        entityId: id,
        user: "Admin",
        details: `Đã lên lịch đăng bài "${article.title}" vào ngày ${scheduleDate}`,
      });
    } else {
      article.status = "PUBLISHED";
      article.publishedAt = new Date().toISOString();
      ContentDb.addAuditLog({
        action: "publish",
        entityType: "article",
        entityId: id,
        user: "Admin",
        details: `Đã xuất bản bài viết công nghệ: ${article.title}`,
      });
    }

    ContentDb.saveArticle(article);
    return NextResponse.json({ success: true, data: article });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi xuất bản bài viết" },
      { status: 500 }
    );
  }
}
