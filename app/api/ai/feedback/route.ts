import { NextRequest, NextResponse } from "next/server";
import { AiStore } from "@/lib/ai-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { conversationId, rating, comment } = body;

    if (!conversationId || !rating) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin đánh giá." },
        { status: 400 }
      );
    }

    const item = AiStore.addFeedback({
      conversationId,
      rating: rating === "helpful" ? "helpful" : "unhelpful",
      comment: comment || "",
    });

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Lỗi lưu phản hồi." }, { status: 500 });
  }
}
