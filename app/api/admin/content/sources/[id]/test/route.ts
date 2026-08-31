import { NextRequest, NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";
import { ContentCollectorService } from "@/lib/content-engine/services/collector";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    let source = ContentDb.getSourceById(id);

    // If source not found in DB, check if feedUrl was passed in body to test before adding
    if (!source) {
      const body = await req.json().catch(() => ({}));
      if (body.feedUrl) {
        source = {
          id: "temp-test",
          name: body.name || "Nguồn kiểm tra",
          url: body.url || body.feedUrl,
          feedUrl: body.feedUrl,
          sourceType: body.sourceType || "RSS",
          category: body.category || "AI & Trí tuệ nhân tạo",
          language: body.language || "en",
          priority: "NORMAL",
          isActive: true,
          autoFetch: true,
          autoProcessAi: true,
          autoPublish: false,
          fetchInterval: 30,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      } else {
        return NextResponse.json(
          { success: false, error: "Không tìm thấy nguồn tin để kiểm tra" },
          { status: 404 }
        );
      }
    }

    const testResult = await ContentCollectorService.testSource(source);
    return NextResponse.json({ success: testResult.ok, data: testResult });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi kiểm tra kết nối nguồn" },
      { status: 500 }
    );
  }
}
