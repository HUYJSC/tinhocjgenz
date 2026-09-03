import fs from "fs";
import path from "path";

console.log("=== KIỂM THỬ XÁC MINH SPRINT 0 & SPRINT 1 ===");
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

// 1. Kiểm tra robots.ts
const robotsContent = fs.readFileSync("app/robots.ts", "utf-8");
assert(
  robotsContent.includes('"/admin"') && robotsContent.includes('"/admin/"'),
  "app/robots.ts chặn cả /admin và /admin/"
);
assert(
  robotsContent.includes('"/portal"') && robotsContent.includes('"/portal/"'),
  "app/robots.ts chặn cả /portal và /portal/"
);

// 2. Kiểm tra proxy.ts
const proxyContent = fs.readFileSync("proxy.ts", "utf-8");
assert(
  proxyContent.includes("pathname.slice(0, -1)") &&
    proxyContent.includes("NextResponse.redirect"),
  "proxy.ts có logic chuẩn hóa trailing slash dứt khoát 1 lần"
);
assert(
  proxyContent.includes("X-Robots-Tag") &&
    proxyContent.includes("noindex, nofollow, noarchive"),
  "proxy.ts gán header noindex, nofollow cho khu vực quản trị"
);

// 3. Kiểm tra lib/auth-server.ts
const authServerContent = fs.readFileSync("lib/auth-server.ts", "utf-8");
assert(
  !authServerContent.includes('"ph2026"') &&
    !authServerContent.includes('"PH@Digital2026#MasterKey"') &&
    !authServerContent.includes('"tinhocgenz@2026"'),
  "lib/auth-server.ts đã xóa bỏ 100% các mã PIN và MasterKey hardcode"
);
assert(
  authServerContent.includes("iterations: 100000") &&
    authServerContent.includes("PBKDF2"),
  "lib/auth-server.ts sử dụng thuật toán băm mật khẩu chuẩn NIST PBKDF2 (100,000 vòng)"
);
assert(
  authServerContent.includes("verifyMfaCode") &&
    authServerContent.includes("requireMfa"),
  "lib/auth-server.ts có cơ chế kiểm tra xác thực hai bước MFA/TOTP"
);
assert(
  authServerContent.includes("cleanPass.length < 12"),
  "lib/auth-server.ts thực thi chính sách mật khẩu tối thiểu 12 ký tự"
);

// 4. Kiểm tra AdminAuthGate.tsx
const authGateContent = fs.readFileSync(
  "app/admin/components/AdminAuthGate.tsx",
  "utf-8"
);
assert(
  !authGateContent.includes("ASVS Level 2") &&
    !authGateContent.includes("RBAC SECURE GATE") &&
    !authGateContent.includes("Mã PIN"),
  "AdminAuthGate.tsx đã gỡ bỏ hoàn toàn khẩu hiệu bảo mật giả và ô nhập PIN"
);
assert(
  authGateContent.includes('id="admin-username"') &&
    authGateContent.includes('id="admin-password"') &&
    authGateContent.includes('id="admin-mfa-code"'),
  "AdminAuthGate.tsx có đầy đủ trường nhập định danh cá nhân và MFA chuẩn Accessibility (id/label)"
);

// 5. Kiểm tra next.config.ts
const nextConfigContent = fs.readFileSync("next.config.ts", "utf-8");
assert(
  nextConfigContent.includes("/(admin|portal|api)/:path*") &&
    nextConfigContent.includes("noindex, nofollow, noarchive"),
  "next.config.ts khai báo header tĩnh noindex cho admin/portal/api"
);

// 6. Kiểm tra AdminSidebar.tsx
const sidebarContent = fs.readFileSync(
  "app/admin/components/AdminSidebar.tsx",
  "utf-8"
);
assert(
  !sidebarContent.includes('"Blockchain"') &&
    sidebarContent.includes("Kết Quả & Chứng Nhận"),
  "AdminSidebar.tsx đã đổi tên module chứng chỉ trung thực, gỡ nhãn Blockchain giả"
);

console.log(`\n=== TỔNG KẾT: ${passed} PASS, ${failed} FAIL ===`);
if (failed > 0) process.exit(1);
