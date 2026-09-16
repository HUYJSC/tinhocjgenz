import { NextRequest, NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";
import { getErrorMessage } from "@/lib/errors";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const source = ContentDb.getSourceById(id);
    if (!source) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy nguồn tin" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: source });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: getErrorMessage(err, "Lỗi lấy chi tiết nguồn") },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const existing = ContentDb.getSourceById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy nguồn tin" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const updated = ContentDb.saveSource({
      ...existing,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: getErrorMessage(err, "Lỗi cập nhật nguồn tin") },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const success = ContentDb.deleteSource(id);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy nguồn để xóa" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Đã xóa nguồn tin" });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: getErrorMessage(err, "Lỗi xóa nguồn tin") },
      { status: 500 }
    );
  }
}
