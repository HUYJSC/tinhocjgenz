import { NextRequest, NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";
import { Source } from "@/lib/content-engine/types";

export async function GET() {
  try {
    const sources = ContentDb.getSources();
    return NextResponse.json({ success: true, data: sources });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi lấy danh sách nguồn" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.feedUrl) {
      return NextResponse.json(
        { success: false, error: "Tên nguồn và Feed URL là bắt buộc" },
        { status: 400 }
      );
    }

    const newSource: Source = {
      id: body.id || `src-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: body.name.trim(),
      url: body.url ? body.url.trim() : body.feedUrl.trim(),
      feedUrl: body.feedUrl.trim(),
      sourceType: body.sourceType || "RSS",
      category: body.category || "AI & Trí tuệ nhân tạo",
      language: body.language || "en",
      priority: body.priority || "NORMAL",
      isActive: body.isActive ?? true,
      autoFetch: body.autoFetch ?? true,
      autoProcessAi: body.autoProcessAi ?? true,
      autoPublish: body.autoPublish ?? false,
      fetchInterval: Number(body.fetchInterval) || 30,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = ContentDb.saveSource(newSource);
    return NextResponse.json({ success: true, data: saved });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi tạo nguồn tin mới" },
      { status: 500 }
    );
  }
}
