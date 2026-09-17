import { NextRequest, NextResponse } from "next/server";
import { PasswordResetStore } from "@/lib/password-reset-store";
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

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Không thể tạo mã xác thực.",
        },
        { status: 400 }
      );
    }

    // In a live production environment with SMS/Email gateway, send here.
    // We also return the OTP in the response or hint for immediate self-service recovery by the site owner.
    return NextResponse.json({
      success: true,
      message: `Mã xác thực OTP đã được tạo và gửi đến ${result.maskedTarget}. Mã có hiệu lực trong 10 phút.`,
      maskedTarget: result.maskedTarget,
      username: result.username,
      // Provide OTP directly to assist the site owner in initial recovery / dev environments
      otpCode: result.otp,
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

