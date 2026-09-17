import { NextRequest, NextResponse } from "next/server";
import { PasswordResetStore } from "@/lib/password-reset-store";
import { SmsService } from "@/lib/sms-service";
import { getErrorMessage } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const body = await req.json();
    const credential = (body.credential || body.email || body.phone || "").trim();

    if (!credential) {
      return NextResponse.json(
        {
          success: false,
          error: "Vui lòng nhập Email hoặc Số điện thoại quản trị viên.",
        },
        { status: 400 }
      );
    }

    const result = PasswordResetStore.createOtp(credential, ip);

    if (!result.success || !result.otp || !result.targetValue) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Không thể tạo mã xác thực.",
        },
        { status: 400 }
      );
    }

    // Dispatch OTP directly to phone or email
    const smsResult = await SmsService.sendOtp(result.targetValue, result.otp);

    return NextResponse.json({
      success: true,
      message: `Mã xác thực OTP đã được gửi đến ${result.maskedTarget}. Vui lòng kiểm tra tin nhắn điện thoại để lấy mã xác thực.`,
      maskedTarget: result.maskedTarget,
      username: result.username,
      provider: smsResult.provider,
      sentToPhone: smsResult.success,
      providerNote: !smsResult.success ? smsResult.error : undefined,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(err),
      },
      { status: 500 }
    );
  }
}
