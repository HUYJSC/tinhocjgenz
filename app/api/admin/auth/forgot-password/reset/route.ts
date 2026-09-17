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
    const otp = (body.otp || body.code || "").trim();
    const newPassword = body.newPassword || "";
    const confirmPassword = body.confirmPassword || "";

    if (!credential) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin tài khoản hoặc email/SĐT." },
        { status: 400 }
      );
    }

    if (!otp) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập mã xác thực OTP gồm 6 chữ số." },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 12) {
      return NextResponse.json(
        { success: false, error: "Mật khẩu mới phải có tối thiểu 12 ký tự." },
        { status: 400 }
      );
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: "Mật khẩu xác nhận không khớp với mật khẩu mới." },
        { status: 400 }
      );
    }

    const result = await PasswordResetStore.resetPassword({
      credential,
      otp,
      newPassword,
      ipAddress: ip,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Không thể đặt lại mật khẩu." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay bằng mật khẩu mới.",
      username: result.username,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: getErrorMessage(err) },
      { status: 500 }
    );
  }
}
