import { NextRequest, NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/rbac";
import { AiStore } from "@/lib/ai-store";
import { getErrorMessage } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "ai.conversations");
    if (!auth.authorized) return auth.response;

    const conversations = AiStore.getAllConversations();

    return NextResponse.json({
      success: true,
      total: conversations.length,
      data: conversations,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "ai.conversations");
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu Conversation ID." }, { status: 400 });
    }

    AiStore.deleteConversation(id);

    return NextResponse.json({
      success: true,
      message: "Đã xóa cuộc hội thoại.",
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}
