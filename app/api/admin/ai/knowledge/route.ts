import { NextRequest, NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/rbac";
import { AiStore } from "@/lib/ai-store";
import { getErrorMessage } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "ai.knowledge");
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(req.url);
    const includeArchived = searchParams.get("includeArchived") === "true";
    const docs = AiStore.getDocuments(includeArchived);

    return NextResponse.json({
      success: true,
      total: docs.length,
      data: docs,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "ai.knowledge");
    if (!auth.authorized) return auth.response;

    const body = await req.json();
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: "Tiêu đề và nội dung tài liệu là bắt buộc." },
        { status: 400 }
      );
    }

    const created = AiStore.createDocument({
      title: body.title,
      category: body.category || "faq",
      content: body.content,
      tags: Array.isArray(body.tags) ? body.tags : [],
      status: body.status || "PUBLISHED",
      createdBy: auth.session.name || "Admin",
    });

    return NextResponse.json({
      success: true,
      data: created,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "ai.knowledge");
    if (!auth.authorized) return auth.response;

    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "Thiếu Document ID." }, { status: 400 });
    }

    const updated = AiStore.updateDocument(body.id, {
      title: body.title,
      category: body.category,
      content: body.content,
      tags: body.tags,
      status: body.status,
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Tài liệu không tồn tại." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "ai.knowledge");
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu Document ID." }, { status: 400 });
    }

    const ok = AiStore.deleteDocument(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Không tìm thấy tài liệu cần xóa." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Đã xóa tài liệu khỏi kho kiến thức.",
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}

