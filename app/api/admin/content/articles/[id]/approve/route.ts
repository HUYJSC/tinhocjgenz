import { NextRequest, NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";

export async function POST(
  _req: NextRequest,
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

    article.status = "APPROVED";
    ContentDb.saveArticle(article);
    ContentDb.addAuditLog({
      action: "approve",
      entityType: "article",
      entityId: id,
      user: "Admin",
      details: `Đã duyệt bài viết: ${article.title}`,
    });

    return NextResponse.json({ success: true, data: article });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi duyệt bài viết" },
      { status: 500 }
    );
  }
}
