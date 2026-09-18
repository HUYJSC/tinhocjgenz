import { NextRequest, NextResponse } from "next/server";
import { ConversationPlanner } from "@/lib/ai/conversation/conversation-planner";
import { AiStore } from "@/lib/ai-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationId, reset } = body;

    const convId =
      conversationId ||
      `conv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    // 1. Handle Reset command
    if (reset) {
      const resetResult = ConversationPlanner.reset(convId);
      return NextResponse.json({
        success: true,
        conversationId: convId,
        reply: resetResult.reply,
        journey: resetResult.journey,
        quickReplies: resetResult.quickReplies,
        mascotState: resetResult.mascotState,
        recommendationReady: false,
      });
    }

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Nội dung tin nhắn không được để trống." },
        { status: 400 }
      );
    }

    // 2. Process turn via Master Conversation Planner
    const result = await ConversationPlanner.planTurn({
      conversationId: convId,
      userMessage: message,
    });

    // 3. Persist conversation history in AiStore for Admin audit & knowledge learning
    let conv = AiStore.getConversation(convId);
    if (!conv) {
      conv = {
        id: convId,
        userIp:
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          req.headers.get("x-real-ip") ||
          "127.0.0.1",
        messages: [],
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    // Record user message
    conv.messages.push({
      id: `msg-${Date.now()}-u`,
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    });

    // Record assistant message
    conv.messages.push({
      id: `msg-${Date.now()}-a`,
      role: "assistant",
      content: result.reply,
      timestamp: new Date().toISOString(),
      quickReplies: result.quickReplies.map((q) => q.label),
      roadmapData: result.roadmapData,
    });

    if (result.recommendationReady) {
      conv.status = "completed";
    }

    AiStore.saveConversation(conv);

    return NextResponse.json({
      success: true,
      conversationId: convId,
      reply: result.reply,
      journey: result.journey,
      quickReplies: result.quickReplies,
      mascotState: result.mascotState,
      recommendationReady: result.recommendationReady,
      roadmapData: result.roadmapData,
      action: result.action,
    });
  } catch (err) {
    console.error("AI Chat API Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Có lỗi khi kết nối với Trợ lý AI. Vui lòng thử lại sau.",
      },
      { status: 500 }
    );
  }
}
