import { NextRequest, NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";
import { ContentPipelineService } from "@/lib/content-engine/services/pipeline";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const sourceId = body.sourceId;

    if (sourceId) {
      const source = ContentDb.getSourceById(sourceId);
      if (!source) {
        return NextResponse.json(
          { success: false, error: "Không tìm thấy nguồn tin được chỉ định" },
          { status: 404 }
        );
      }
      const result = await ContentPipelineService.runForSource(source, 5);
      return NextResponse.json({ success: true, data: [result] });
    }

    // Fetch all active sources
    const results = await ContentPipelineService.runAllActive();
    return NextResponse.json({ success: true, data: results });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi tiến trình thu thập tin" },
      { status: 500 }
    );
  }
}
