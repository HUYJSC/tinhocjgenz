import { NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";
import { getErrorMessage } from "@/lib/errors";

export async function GET() {
  try {
    const logs = ContentDb.getAuditLogs();
    return NextResponse.json({ success: true, data: logs });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: getErrorMessage(err, "Lỗi lấy nhật ký hoạt động") },
      { status: 500 }
    );
  }
}
