import { NextResponse } from "next/server";
import { LeadsStore } from "@/lib/leads-store";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Validate fields
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { status: "error", message: "Họ tên và Số điện thoại là bắt buộc" },
        { status: 400 }
      );
    }

    // 2. Persist lead in database / CRM
    const newLead = LeadsStore.addLead({
      name: String(data.name).trim(),
      phone: String(data.phone).trim(),
      course: data.course || data.subject || "Khóa học MOS / IC3 Cấp Tốc",
      university: data.university || data.school || "Học viên Website",
      note: data.note || data.message || `Đăng ký từ biểu mẫu: ${data.formType || "Tư vấn trực tiếp"}`,
    });

    // 3. Optional: Forward request to Google Apps Script Web App if configured
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (googleScriptUrl) {
      fetch(googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch((e) => console.warn("Lỗi forward Google Script:", e));
    }

    return NextResponse.json({
      status: "success",
      message: "Đăng ký tư vấn thành công! Giảng viên sẽ liên hệ trong 15 phút.",
      leadId: newLead.id,
    });
  } catch (error: any) {
    console.error("Contact Form Error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Có lỗi xảy ra khi tiếp nhận thông tin. Vui lòng gọi trực tiếp hotline 033.229.8065.",
      },
      { status: 500 }
    );
  }
}
