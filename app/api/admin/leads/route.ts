import { NextRequest, NextResponse } from "next/server";
import { LeadsStore } from "@/lib/leads-store";

export async function GET() {
  const leads = LeadsStore.getLeads();
  return NextResponse.json({
    success: true,
    total: leads.length,
    data: leads,
  });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Thiếu id hoặc status" }, { status: 400 });
    }
    const updated = LeadsStore.updateStatus(id, status);
    if (updated) {
      return NextResponse.json({ success: true, message: "Cập nhật trạng thái thành công" });
    }
    return NextResponse.json({ success: false, error: "Không tìm thấy lead" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu tham số id" }, { status: 400 });
    }
    const deleted = LeadsStore.deleteLead(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
