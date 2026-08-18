import { NextResponse } from "next/server";

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

    // 2. Check if Google Apps Script URL is set
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      // If not configured, we log and return success to ensure graceful degradation for user
      console.warn("GOOGLE_SCRIPT_URL is not set in environment variables.");
      return NextResponse.json(
        { 
          status: "success", 
          message: "Đăng ký thành công (Chế độ mô phỏng - GOOGLE_SCRIPT_URL chưa được cấu hình)" 
        }
      );
    }

    // 3. Forward request to Google Apps Script Web App
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Google Script returned status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Contact Form Integration Error:", error);
    return NextResponse.json(
      { 
        status: "error", 
        message: "Có lỗi xảy ra khi gửi thông tin đăng ký. Vui lòng liên hệ trực tiếp số điện thoại." 
      },
      { status: 500 }
    );
  }
}
