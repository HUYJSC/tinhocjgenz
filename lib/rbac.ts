/**
 * Server-Side Role-Based Access Control (RBAC) & Authorization Engine
 * Integrates Core Rules with Next.js Request & Response
 */

import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME, AdminSessionPayload } from "./auth-server";
import { AdminUsersStore } from "./admin-users-store";
import { Permission, hasPermission } from "./rbac-core";

export * from "./rbac-core";

export type AuthCheckResult =
  | { authorized: true; session: AdminSessionPayload }
  | { authorized: false; response: NextResponse };

/**
 * Validates request authentication and enforces required permission server-side
 */
export async function authorizeAdminRequest(
  req: NextRequest,
  permission?: Permission
): Promise<AuthCheckResult> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Từ chối truy cập: Phiên đăng nhập không hợp lệ hoặc đã hết hạn (401 Unauthorized)",
        },
        { status: 401 }
      ),
    };
  }

  // Verify account is active
  const user = AdminUsersStore.getUserById(session.userId);
  if (user && !user.isActive) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Từ chối truy cập: Tài khoản hiện đang bị khóa (403 Forbidden)",
        },
        { status: 403 }
      ),
    };
  }

  // Verify permission
  if (permission && !hasPermission(session.role, permission)) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          error: `Từ chối truy cập: Tài khoản không có quyền [${permission}] (403 Forbidden)`,
        },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, session };
}
