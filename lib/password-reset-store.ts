/**
 * Password Reset Store & OTP Manager for Admin Accounts
 * In-memory secure OTP storage with rate limiting, expiration, and audit trail.
 */

import { AdminUsersStore } from "./admin-users-store";
import { AuditStore } from "./audit-store";
import { hashPassword } from "./auth-server";

export interface PasswordResetOtpRecord {
  userId: string;
  username: string;
  otp: string;
  targetType: "email" | "phone";
  targetValue: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
}

// In-memory OTP storage
const OTP_STORE = new Map<string, PasswordResetOtpRecord>();

// IP Rate Limiter for OTP Requests (Max 5 requests per 15 minutes)
const RATE_LIMIT_STORE = new Map<string, { count: number; resetAt: number }>();

function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length <= 2 ? `${name}*` : `${name.slice(0, 2)}***${name.slice(-1)}`;
  return `${maskedName}@${domain}`;
}

function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 7) return phone;
  return `${cleaned.slice(0, 3)}****${cleaned.slice(-3)}`;
}

export const PasswordResetStore = {
  /**
   * Generates a 6-digit OTP for admin account recovery
   */
  createOtp(credential: string, ipAddress = "127.0.0.1"): {
    success: boolean;
    error?: string;
    otp?: string;
    maskedTarget?: string;
    username?: string;
  } {
    const now = Date.now();

    // 1. IP Rate Limiting Check
    const rateLimit = RATE_LIMIT_STORE.get(ipAddress);
    if (rateLimit) {
      if (rateLimit.resetAt > now) {
        if (rateLimit.count >= 5) {
          const waitMins = Math.ceil((rateLimit.resetAt - now) / 60000);
          return {
            success: false,
            error: `Bạn đã yêu cầu gửi OTP quá nhiều lần. Vui lòng chờ ${waitMins} phút trước khi thử lại.`,
          };
        }
        rateLimit.count += 1;
      } else {
        RATE_LIMIT_STORE.set(ipAddress, { count: 1, resetAt: now + 15 * 60 * 1000 });
      }
    } else {
      RATE_LIMIT_STORE.set(ipAddress, { count: 1, resetAt: now + 15 * 60 * 1000 });
    }

    // 2. Find admin user
    const user = AdminUsersStore.findByCredential(credential);
    if (!user) {
      return {
        success: false,
        error: "Không tìm thấy tài khoản quản trị viên với thông tin này. Vui lòng kiểm tra lại Email hoặc SĐT.",
      };
    }

    // 3. Generate secure 6-digit OTP
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const otp = (100000 + (randomArray[0] % 900000)).toString();

    // Target is email or phone
    const isEmail = credential.includes("@");
    const targetType = isEmail ? "email" : "phone";
    const targetValue = isEmail ? user.email : user.phone;
    const maskedTarget = isEmail ? maskEmail(user.email) : maskPhone(user.phone);

    // 4. Save to OTP Store (valid for 10 minutes)
    const otpRecord: PasswordResetOtpRecord = {
      userId: user.id,
      username: user.username,
      otp,
      targetType,
      targetValue,
      createdAt: now,
      expiresAt: now + 10 * 60 * 1000,
      attempts: 0,
    };

    OTP_STORE.set(user.id, otpRecord);

    // 5. Audit Log
    AuditStore.addLog({
      user: user.username,
      role: user.role,
      action: "UPDATE",
      resourceType: "Auth",
      resourceId: user.username,
      ipAddress,
      details: `Yêu cầu mã OTP khôi phục mật khẩu gửi tới ${maskedTarget}`,
      severity: "INFO",
    });

    return {
      success: true,
      otp,
      maskedTarget,
      username: user.username,
    };
  },

  /**
   * Verifies OTP and updates new password
   */
  async resetPassword(params: {
    credential: string;
    otp: string;
    newPassword: string;
    ipAddress?: string;
  }): Promise<{ success: boolean; error?: string; username?: string }> {
    const { credential, otp, newPassword, ipAddress = "127.0.0.1" } = params;
    const now = Date.now();

    // 1. Password policy check
    if (!newPassword || newPassword.length < 12) {
      return {
        success: false,
        error: "Mật khẩu mới phải có tối thiểu 12 ký tự để đảm bảo an toàn hệ thống.",
      };
    }

    // 2. Find user
    const user = AdminUsersStore.findByCredential(credential);
    if (!user) {
      return {
        success: false,
        error: "Không tìm thấy thông tin tài khoản hợp lệ.",
      };
    }

    // 3. Verify OTP
    const record = OTP_STORE.get(user.id);
    if (!record) {
      return {
        success: false,
        error: "Yêu cầu khôi phục không tồn tại hoặc đã hết hạn. Vui lòng bấm 'Gửi lại mã OTP'.",
      };
    }

    if (record.expiresAt < now) {
      OTP_STORE.delete(user.id);
      return {
        success: false,
        error: "Mã OTP đã hết hạn sau 10 phút. Vui lòng yêu cầu mã mới.",
      };
    }

    if (record.attempts >= 5) {
      OTP_STORE.delete(user.id);
      return {
        success: false,
        error: "Bạn đã nhập sai mã OTP quá 5 lần. Vui lòng gửi lại mã mới.",
      };
    }

    if (record.otp !== otp.trim()) {
      record.attempts += 1;
      return {
        success: false,
        error: `Mã OTP không chính xác. Bạn còn ${5 - record.attempts} lần thử.`,
      };
    }

    // 4. Hash new password with cryptographically secure salt
    const saltBytes = new Uint8Array(16);
    crypto.getRandomValues(saltBytes);
    const salt = Array.from(saltBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const passwordHash = await hashPassword(newPassword, salt);

    // 5. Update user in store
    AdminUsersStore.updatePassword(user.id, passwordHash, salt);

    // 6. Delete used OTP (Single-use)
    OTP_STORE.delete(user.id);

    // 7. Audit Log
    AuditStore.addLog({
      user: user.username,
      role: user.role,
      action: "UPDATE",
      resourceType: "Auth",
      resourceId: user.username,
      ipAddress,
      details: `Đặt lại mật khẩu thành công qua xác thực OTP`,
      severity: "CRITICAL",
    });

    return {
      success: true,
      username: user.username,
    };
  },

  /**
   * Helper to check if active OTP exists for display in emergency admin recovery
   */
  getActiveOtp(credential: string): string | undefined {
    const user = AdminUsersStore.findByCredential(credential);
    if (!user) return undefined;
    const record = OTP_STORE.get(user.id);
    if (!record || record.expiresAt < Date.now()) return undefined;
    return record.otp;
  },
};
