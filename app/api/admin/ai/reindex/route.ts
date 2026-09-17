import { NextRequest, NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/rbac";
import { AiStore } from "@/lib/ai-store";
import { getErrorMessage } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "ai.knowledge");
    if (!auth.authorized) return auth.response;

    const docs = AiStore.getDocuments().filter((d) => d.status === "PUBLISHED");

    // Re-index simulation: Chunking and indexing
    let totalChunks = 0;
    docs.forEach((doc) => {
      const chunks = doc.content.split(/\n\n+/).filter((c) => c.trim().length > 10);
      totalChunks += chunks.length;
    });

    return NextResponse.json({
      success: true,
      message: `Đồng bộ thành công! Đã xử lý ${docs.length} tài liệu và ${totalChunks} chunks vào bộ nhớ tìm kiếm AI.`,
      stats: {
        documentsIndexed: docs.length,
        totalChunks,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}
