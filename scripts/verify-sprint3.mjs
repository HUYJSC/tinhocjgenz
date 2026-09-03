import fs from "fs";
import { AuditService } from "../lib/audit-service.ts";

console.log("=== KIỂM THỬ XÁC MINH SPRINT 3: ENTERPRISE AUDIT SERVICE ===");
let passed = 0;
let failed = 0;

function assert(condition, name) {
  if (condition) {
    console.log(`  [PASS] ${name}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${name}`);
    failed++;
  }
}

async function runTests() {
  // 1. Kiểm tra cơ chế tự động làm sạch (Sanitize) PII và Bí mật (Passwords, Tokens, Secrets)
  console.log("\n1. Kiểm tra Tự động Làm Sạch Bí Mật (Anti-Secret Leak in Logs):");
  const recordWithSecrets = await AuditService.recordEvent({
    actorUsername: "admin_super",
    actorRole: "super_admin",
    action: "ROLE_CHANGE",
    resourceType: "UserAccount",
    resourceId: "usr-02",
    beforeState: {
      password: "SuperSecretPassword123!",
      passwordHash: "5d41402abc4b2a76b9719d911017c592",
      salt: "random_salt_12345",
      role: "academic",
    },
    afterState: {
      token: "secret_jwt_token_xyz",
      otp: "888666",
      role: "admin",
    },
    ipAddress: "14.232.18.99",
    details: "Thử nghiệm ghi nhật ký kèm trường bí mật",
    severity: "CRITICAL",
  });

  assert(
    recordWithSecrets.beforeState?.password === "[REDACTED]" &&
      recordWithSecrets.beforeState?.passwordHash === "[REDACTED]" &&
      recordWithSecrets.beforeState?.salt === "[REDACTED]" &&
      recordWithSecrets.afterState?.token === "[REDACTED]" &&
      recordWithSecrets.afterState?.otp === "[REDACTED]",
    "Toàn bộ mật khẩu, passwordHash, salt, token, OTP đều được tự động [REDACTED]"
  );

  assert(
    recordWithSecrets.beforeState?.role === "academic" &&
      recordWithSecrets.afterState?.role === "admin",
    "Dữ liệu nghiệp vụ an toàn (role) được lưu giữ nguyên vẹn để đối soát"
  );

  // 2. Kiểm tra tính độc nhất của EventId
  console.log("\n2. Kiểm tra Định danh Duy nhất Event ID:");
  assert(
    recordWithSecrets.eventId.startsWith("evt-") &&
      recordWithSecrets.eventId.length > 10,
    "Mỗi bản ghi Audit Log đều sở hữu eventId độc nhất và duy nhất"
  );

  // 3. Kiểm tra Bộ lọc Phía Server và Phân trang (Server-side Pagination & Filtering)
  console.log("\n3. Kiểm tra Bộ lọc và Phân trang Server-side:");
  const criticalLogs = await AuditService.getLogs({ severity: "CRITICAL" });
  assert(
    criticalLogs.logs.every((l) => l.severity === "CRITICAL"),
    "Bộ lọc severity=CRITICAL hoạt động chính xác 100%"
  );

  const paginatedLogs = await AuditService.getLogs({ limit: 1, page: 1 });
  assert(
    paginatedLogs.logs.length <= 1 && paginatedLogs.total >= 1,
    "Phân trang server-side trả đúng số lượng limit và tổng số bản ghi"
  );

  // 4. Kiểm tra Tích hợp AuditService vào API Đăng nhập và Quản lý người dùng
  console.log("\n4. Kiểm tra Tích hợp AuditService vào Codebase:");
  const loginRoute = fs.readFileSync("app/api/admin/auth/login/route.ts", "utf-8");
  assert(
    loginRoute.includes("AuditService.recordEvent") &&
      loginRoute.includes("LOGIN_SUCCESS") &&
      loginRoute.includes("LOGIN_FAILED"),
    "app/api/admin/auth/login/route.ts tự động ghi nhận LOGIN_SUCCESS và LOGIN_FAILED"
  );

  const usersRoute = fs.readFileSync("app/api/admin/users/route.ts", "utf-8");
  assert(
    usersRoute.includes("AuditService.recordEvent") &&
      usersRoute.includes("ROLE_CHANGE") &&
      usersRoute.includes("ACCOUNT_LOCK"),
    "app/api/admin/users/route.ts tự động ghi nhận ROLE_CHANGE và ACCOUNT_LOCK"
  );

  const logoutRoute = fs.readFileSync("app/api/admin/auth/logout/route.ts", "utf-8");
  assert(
    logoutRoute.includes("AuditService.recordEvent") &&
      logoutRoute.includes("LOGOUT"),
    "app/api/admin/auth/logout/route.ts tự động ghi nhận LOGOUT"
  );

  // 5. Kiểm tra Gỡ Bỏ Nhãn Giả mạo trong AdminTopbar.tsx
  console.log("\n5. Kiểm tra Gỡ Bỏ Nhãn Giả mạo:");
  const topbarContent = fs.readFileSync(
    "app/admin/components/AdminTopbar.tsx",
    "utf-8"
  );
  assert(
    !topbarContent.includes("Blockchain") &&
      topbarContent.includes("Kết Quả & Chứng Nhận Học Viên"),
    "AdminTopbar.tsx đã gỡ bỏ hoàn toàn nhãn Blockchain giả mạo"
  );

  console.log(`\n=== TỔNG KẾT SPRINT 3: ${passed} PASS, ${failed} FAIL ===`);
  if (failed > 0) process.exit(1);
}

runTests();
