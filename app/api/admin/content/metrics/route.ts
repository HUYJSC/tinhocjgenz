import { NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";
import { getErrorMessage } from "@/lib/errors";

export async function GET() {
  try {
    const metrics = ContentDb.getMetrics();
    return NextResponse.json({ success: true, data: metrics });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: getErrorMessage(err, "Lỗi lấy số liệu metrics") },
      { status: 500 }
    );
  }
}
