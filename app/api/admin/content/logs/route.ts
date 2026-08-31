import { NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";

export async function GET() {
  try {
    const logs = ContentDb.getAuditLogs();
    return NextResponse.json({ success: true, data: logs });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi lấy nhật ký hoạt động" },
      { status: 500 }
    );
  }
}
