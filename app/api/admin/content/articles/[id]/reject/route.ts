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
    article.status = "REJECTED";
    if (body.reason) {
      article.aiReason = body.reason;
    }

    ContentDb.saveArticle(article);
    ContentDb.addAuditLog({
      action: "reject",
      entityType: "article",
      entityId: id,
      user: "Admin",
      details: `Đã từ chối bài viết: ${article.title} (${body.reason || "Không phù hợp"})`,
    });

    return NextResponse.json({ success: true, data: article });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi từ chối bài viết" },
      { status: 500 }
    );
  }
}
