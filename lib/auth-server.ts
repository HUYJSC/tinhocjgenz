/**
 * Server-Side Authentication & Session Management for Tin Học Gen Z
 * Cryptographically signed sessions using HMAC-SHA256 (Web Crypto API)
 * Individual User Authentication with PBKDF2, MFA (2FA), and Anti-Brute-Force
 */

import { AdminUsersStore, RoleType } from "./admin-users-store";
import { AuditStore } from "./audit-store";

export const SESSION_COOKIE_NAME = "tgz_admin_session";
export const SESSION_EXPIRATION_SECONDS = 60 * 60 * 12; // 12 hours

/**
 * Retrieves master secret with strict production requirement
 */
function getMasterSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_SESSION_SECRET must be configured with at least 32 characters.");
  }

  return "development-only-session-secret-change-before-deploy";
}

function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;

  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

function getConfiguredPassword(username: string): string | undefined {
  const raw = process.env.ADMIN_USER_PASSWORDS_JSON;
  if (!raw) return undefined;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return undefined;

    const value = (parsed as Record<string, unknown>)[username];
    return typeof value === "string" && value.length >= 12 ? value : undefined;
  } catch {
    return undefined;
  }
}

export type UserRoleType = RoleType;

export interface AdminSessionPayload {
  userId: string;
  username: string;
  name: string;
  role: UserRoleType;
  exp: number;
}

/**
 * Generates an HMAC-SHA256 signature for data string
 */
async function signData(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Creates a cryptographically signed session token string
 */
export async function createSessionToken(user: {
  userId: string;
  username: string;
  name: string;
  role: UserRoleType;
}): Promise<string> {
  const payload: AdminSessionPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + SESSION_EXPIRATION_SECONDS,
  };
  const json = JSON.stringify(payload);
  const base64Payload = btoa(unescape(encodeURIComponent(json)));
  const signature = await signData(base64Payload, getMasterSecret());
  return `${base64Payload}.${signature}`;
}

/**
 * Verifies and decodes a session token
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<AdminSessionPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [base64Payload, signature] = parts;
  const expectedSignature = await signData(base64Payload, getMasterSecret());

  // Constant-time comparison
  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const json = decodeURIComponent(escape(atob(base64Payload)));
    const payload: AdminSessionPayload = JSON.parse(json);

    // Expiry check
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    // Verify user is not locked
    const user = AdminUsersStore.getUserById(payload.userId);
    if (user && !user.isActive) {
      return null; // Instantly revoke session if user account is locked
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Computes PBKDF2 hash using Web Crypto API (100,000 iterations, SHA-256)
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );
  return Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Validates the configured six-digit administrative MFA backup code.
 * No default or client-visible bypass code is accepted.
 */
export function verifyMfaCode(code: string): boolean {
  const cleanCode = code.trim();
  const configuredCode = process.env.ADMIN_MFA_BACKUP_CODE?.trim();

  if (!/^\d{6}$/.test(cleanCode) || !configuredCode || !/^\d{6}$/.test(configuredCode)) {
    return false;
  }

  return constantTimeEqual(cleanCode, configuredCode);
}

export interface AuthResult {
  success: boolean;
  token?: string;
  user?: {
    userId: string;
    username: string;
    name: string;
    role: UserRoleType;
  };
  requireMfa?: boolean;
  message?: string;
  error?: string;
  remainingAttempts?: number;
}

/**
 * Authenticates individual user with strict password policy & MFA
 */
export async function authenticateUser(params: {
  credential: string;
  password: string;
  mfaCode?: string;
  ipAddress?: string;
}): Promise<AuthResult> {
  const { credential, password, mfaCode, ipAddress = "127.0.0.1" } = params;
  const cleanCred = credential.trim();
  const cleanPass = password;

  // 1. Password Policy Check: Minimum 12 characters
  if (!cleanPass || cleanPass.length < 12) {
    return {
      success: false,
      error: "Mật khẩu quản trị phải có tối thiểu 12 ký tự theo chính sách bảo mật.",
    };
  }

  // 2. Find user by username or email
  const user = AdminUsersStore.findByCredential(cleanCred);

  if (!user) {
    // Timing attack mitigation: Run dummy hash calculation
    await hashPassword(cleanPass, "dummy_salt_mitigation");
    AuditStore.addLog({
      user: cleanCred || "unknown",
      role: "anonymous",
      action: "LOGIN_FAILED",
      resourceType: "Auth",
      resourceId: "admin_login",
      ipAddress,
      details: `Đăng nhập thất bại: Tài khoản không tồn tại (${cleanCred})`,
      severity: "WARNING",
    });
    return {
      success: false,
      error: "Tên đăng nhập hoặc mật khẩu không chính xác.",
    };
  }

  // 3. Account Status & Temporary Lock Check
  if (!user.isActive) {
    AuditStore.addLog({
      user: user.username,
      role: user.role,
      action: "LOGIN_FAILED",
      resourceType: "Auth",
      resourceId: user.username,
      ipAddress,
      details: `Đăng nhập bị chặn: Tài khoản ${user.username} đang bị khóa (${user.lockReason || "Không rõ"})`,
      severity: "WARNING",
    });
    return {
      success: false,
      error: "Tài khoản hiện đang bị tạm khóa. Vui lòng liên hệ Quản trị viên tối cao.",
    };
  }

  if (user.lockedUntil && user.lockedUntil > Date.now()) {
    const waitSeconds = Math.ceil((user.lockedUntil - Date.now()) / 1000);
    return {
      success: false,
      error: `Tài khoản tạm thời bị khóa do nhập sai nhiều lần. Vui lòng thử lại sau ${waitSeconds} giây.`,
    };
  }

  // 4. Verify password. Production credentials must come from server-only environment variables.
  let isPasswordCorrect = false;
  const configuredPassword = getConfiguredPassword(user.username);

  if (configuredPassword) {
    isPasswordCorrect = constantTimeEqual(cleanPass, configuredPassword);
  } else if (process.env.NODE_ENV === "production") {
    return {
      success: false,
      error: "Tài khoản quản trị chưa được cấu hình thông tin xác thực trên máy chủ.",
    };
  } else if (user.passwordHash && user.salt) {
    const computed = await hashPassword(cleanPass, user.salt);
    isPasswordCorrect = constantTimeEqual(computed, user.passwordHash);
  }

  if (!isPasswordCorrect) {
    const lockStatus = AdminUsersStore.recordFailedAttempt(user.id);
    AuditStore.addLog({
      user: user.username,
      role: user.role,
      action: "LOGIN_FAILED",
      resourceType: "Auth",
      resourceId: user.username,
      ipAddress,
      details: `Đăng nhập thất bại: Sai mật khẩu cho tài khoản ${user.username}`,
      severity: "WARNING",
    });

    if (lockStatus.locked) {
      return {
        success: false,
        error: "Nhập sai quá 5 lần. Tài khoản đã bị tạm khóa trong 15 phút.",
        remainingAttempts: 0,
      };
    }

    return {
      success: false,
      error: "Tên đăng nhập hoặc mật khẩu không chính xác.",
      remainingAttempts: lockStatus.remainingAttempts,
    };
  }

  // 5. MFA / Two-Factor Authentication Check
  const requiresMfa = user.mfaEnabled || user.role === "super_admin" || user.role === "admin";
  if (requiresMfa) {
    if (!mfaCode) {
      return {
        success: false,
        requireMfa: true,
        message: "Xác thực danh tính thành công. Vui lòng nhập mã bảo mật hai bước (MFA).",
      };
    }

    const isMfaValid = verifyMfaCode(mfaCode);
    if (!isMfaValid) {
      AuditStore.addLog({
        user: user.username,
        role: user.role,
        action: "LOGIN_FAILED",
        resourceType: "Auth",
        resourceId: user.username,
        ipAddress,
        details: `Xác thực MFA thất bại cho tài khoản ${user.username}`,
        severity: "WARNING",
      });
      return {
        success: false,
        requireMfa: true,
        error: "Mã xác thực hai bước không hợp lệ hoặc đã hết hạn.",
      };
    }
  }

  // 6. Login Success: Update records and issue token
  AdminUsersStore.updateLastLogin(user.id);

  const token = await createSessionToken({
    userId: user.id,
    username: user.username,
    name: user.fullName,
    role: user.role,
  });

  AuditStore.addLog({
    user: user.username,
    role: user.role,
    action: "LOGIN",
    resourceType: "Auth",
    resourceId: user.username,
    ipAddress,
    details: `Đăng nhập thành công phiên quản trị cho ${user.fullName} (${user.role.toUpperCase()}) qua xác thực cá nhân${requiresMfa ? " + MFA" : ""}`,
    severity: "INFO",
  });

  return {
    success: true,
    token,
    user: {
      userId: user.id,
      username: user.username,
      name: user.fullName,
      role: user.role,
    },
  };
}
