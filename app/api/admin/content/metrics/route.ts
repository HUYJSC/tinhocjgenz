import { NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";

export async function GET() {
  try {
    const metrics = ContentDb.getMetrics();
    return NextResponse.json({ success: true, data: metrics });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi lấy số liệu metrics" },
      { status: 500 }
    );
  }
}
