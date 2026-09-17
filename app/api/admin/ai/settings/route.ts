import { NextRequest, NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/rbac";
import { AiStore } from "@/lib/ai-store";
import { getErrorMessage } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "ai.settings");
    if (!auth.authorized) return auth.response;

    const settings = AiStore.getSettings();

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "ai.settings");
    if (!auth.authorized) return auth.response;

    const body = await req.json();
    const updated = AiStore.updateSettings({
      systemPrompt: body.systemPrompt,
      temperature: Number(body.temperature) || 0.2,
      similarityThreshold: Number(body.similarityThreshold) || 0.65,
      maxTokens: Number(body.maxTokens) || 1000,
      activeProvider: body.activeProvider || "builtin-rag",
      modelName: body.modelName || "gemini-1.5-flash",
      enableExternalAi: Boolean(body.enableExternalAi),
      unansweredNotificationEmail: body.unansweredNotificationEmail || "",
    });

    return NextResponse.json({
      success: true,
      message: "Đã cập nhật cấu hình AI.",
      data: updated,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}

