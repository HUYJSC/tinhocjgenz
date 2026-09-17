import { NextRequest, NextResponse } from "next/server";
import { AiRagService, PathwayCriteria } from "@/lib/ai-rag-service";
import { AiStore } from "@/lib/ai-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationId, history = [], criteria } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Nội dung tin nhắn không được để trống." },
        { status: 400 }
      );
    }

    // Process chat with RAG service
    const result = await AiRagService.processChat(
      message,
      Array.isArray(history) ? history : [],
      criteria as PathwayCriteria
    );

    // Persist conversation in AiStore
    const convId = conversationId || `conv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    let conv = AiStore.getConversation(convId);

    if (!conv) {
      conv = {
        id: convId,
        userIp: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1",
        messages: [],
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    // Add user message
    conv.messages.push({
      id: `msg-${Date.now()}-u`,
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    });

    // Add assistant response
    conv.messages.push({
      id: `msg-${Date.now()}-a`,
      role: "assistant",
      content: result.reply,
      timestamp: new Date().toISOString(),
      quickReplies: result.quickReplies,
      roadmapData: result.roadmapData ? (result.roadmapData as unknown as Record<string, unknown>) : undefined,
    });

    if (result.isRoadmapReady) {
      conv.status = "completed";
    }

    AiStore.saveConversation(conv);

    return NextResponse.json({
      success: true,
      conversationId: convId,
      reply: result.reply,
      quickReplies: result.quickReplies,
      roadmapData: result.roadmapData,
      isRoadmapReady: result.isRoadmapReady,
    });
  } catch (err) {
    console.error("AI Chat API Error:", err);
    return NextResponse.json(
      { success: false, error: "Có lỗi khi kết nối với Trợ lý AI. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
