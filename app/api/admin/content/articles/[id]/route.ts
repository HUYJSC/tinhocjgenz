import { NextRequest, NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";

export async function GET(
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
    return NextResponse.json({ success: true, data: article });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi lấy chi tiết bài viết" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const existing = ContentDb.getArticleById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const updated = ContentDb.saveArticle({
      ...existing,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    });

    ContentDb.addAuditLog({
      action: "article_edit",
      entityType: "article",
      entityId: id,
      user: "Admin",
      details: `Đã chỉnh sửa bài viết: ${updated.title}`,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi cập nhật bài viết" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const success = ContentDb.deleteArticle(id);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy bài viết để xóa" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Đã xóa bài viết" });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi xóa bài viết" },
      { status: 500 }
    );
  }
}
