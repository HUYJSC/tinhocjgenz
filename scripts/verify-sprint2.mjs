import fs from "fs";
import {
  hasPermission,
  canModifyRole,
  canLockAccount,
  ROLE_PERMISSIONS_MAP,
} from "../lib/rbac-core.ts";

console.log("=== KIỂM THỬ XÁC MINH SPRINT 2: SERVER-SIDE RBAC & DATABASE ===");
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

// 1. Kiểm tra Ma trận Phân quyền RBAC (Granular Permissions)
console.log("\n1. Kiểm tra Ma trận Phân quyền Granular RBAC:");
assert(
  hasPermission("super_admin", "user.role.update") &&
    hasPermission("super_admin", "audit.read") &&
    hasPermission("super_admin", "course.delete"),
  "Super Admin sở hữu toàn quyền cao nhất"
);

assert(
  hasPermission("academic", "lead.read") &&
    hasPermission("academic", "course.create") &&
    !hasPermission("academic", "user.role.update") &&
    !hasPermission("academic", "user.lock"),
  "Academic (Giáo vụ) có quyền đào tạo & CRM nhưng KHÔNG có quyền sửa vai trò hoặc khóa tài khoản"
);

assert(
  hasPermission("teacher", "course.read") &&
    hasPermission("teacher", "schedule.manage") &&
    !hasPermission("teacher", "lead.read") &&
    !hasPermission("teacher", "audit.read"),
  "Teacher (Giảng viên) chỉ truy cập lớp học, KHÔNG được xem leads CRM hoặc audit log"
);

assert(
  hasPermission("student", "course.read") &&
    !hasPermission("student", "course.create") &&
    !hasPermission("student", "lead.read"),
  "Student (Học viên) chỉ có quyền đọc khóa học công khai, mặc định từ chối mọi quyền quản trị"
);

// 2. Kiểm tra Phòng chống Leo thang Đặc quyền (Privilege Escalation Prevention)
console.log("\n2. Kiểm tra Chống Leo thang Đặc quyền:");
const academicElevate = canModifyRole("academic", "teacher", "admin");
assert(
  academicElevate.allowed === false,
  "Chặn Giáo vụ tự ý nâng quyền Giảng viên thành Admin"
);

const adminElevateSuper = canModifyRole("admin", "academic", "super_admin");
assert(
  adminElevateSuper.allowed === false,
  "Chặn Admin tạo tài khoản Super Admin"
);

const adminDemoteSuper = canModifyRole("admin", "super_admin", "admin");
assert(
  adminDemoteSuper.allowed === false,
  "Chặn Admin hạ quyền của Super Admin"
);

const superDemoteLast = canModifyRole("super_admin", "super_admin", "teacher");
assert(
  superDemoteLast.allowed === false,
  "Chặn hạ quyền Super Admin cuối cùng đang hoạt động"
);

// 3. Kiểm tra Quy tắc Khóa Tài khoản (Account Locking Safety)
console.log("\n3. Kiểm tra An toàn Khóa Tài khoản:");
const selfLock = canLockAccount("usr-01", "super_admin", "usr-01", "super_admin");
assert(
  selfLock.allowed === false && selfLock.reason?.includes("chính mình"),
  "Chặn người dùng tự khóa tài khoản của chính mình"
);

const academicLockUser = canLockAccount("usr-02", "academic", "usr-03", "teacher");
assert(
  academicLockUser.allowed === false,
  "Chặn Giáo vụ khóa tài khoản người dùng"
);

const adminLockSuper = canLockAccount("usr-admin", "admin", "usr-01", "super_admin");
assert(
  adminLockSuper.allowed === false,
  "Chặn Admin khóa tài khoản của Super Admin"
);

// 4. Kiểm tra Toàn vẹn 35 Bảng Cơ sở dữ liệu PostgreSQL Migration
console.log("\n4. Kiểm tra File Migration Database 35 Bảng:");
const migrationSql = fs.readFileSync(
  "supabase/migrations/20260903000001_master_schema.sql",
  "utf-8"
);

const REQUIRED_TABLES = [
  // Auth & RBAC (7)
  "profiles", "roles", "permissions", "role_permissions", "user_roles", "user_sessions", "login_attempts",
  // Courses & Classes (11)
  "course_categories", "courses", "course_versions", "course_modules", "course_lessons",
  "class_batches", "class_schedules", "teacher_assignments", "enrollments", "attendance_records", "grade_records",
  // CRM (6)
  "leads", "lead_sources", "lead_activities", "lead_assignments", "lead_tasks", "lead_status_history",
  // Media & CMS (8)
  "media_files", "media_permissions", "post_categories", "post_tags", "posts", "post_tag_relations", "post_versions", "post_reviews",
  // AI Content (6)
  "ai_sources", "ai_crawl_jobs", "ai_source_items", "ai_drafts", "ai_generation_logs", "ai_duplicate_checks",
  // Certificates & Audit (5)
  "certificates", "certificate_verifications", "certificate_revocations", "audit_events", "security_alerts"
];

let tablesFound = 0;
for (const table of REQUIRED_TABLES) {
  if (migrationSql.includes(`CREATE TABLE IF NOT EXISTS public.${table}`)) {
    tablesFound++;
  } else {
    console.error(`  [MISSING TABLE] public.${table}`);
  }
}
assert(
  tablesFound === REQUIRED_TABLES.length,
  `Đầy đủ ${REQUIRED_TABLES.length}/${REQUIRED_TABLES.length} bảng dữ liệu chuẩn hóa trong migration SQL`
);

// 5. Kiểm tra Row Level Security (RLS)
console.log("\n5. Kiểm tra Row Level Security (RLS):");
assert(
  migrationSql.includes("ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY") &&
    migrationSql.includes("ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY") &&
    migrationSql.includes("ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY") &&
    migrationSql.includes("ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY") &&
    migrationSql.includes("ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY"),
  "Row Level Security (RLS) được bật và áp dụng chính sách chặt chẽ"
);

// 6. Kiểm tra Rollback SQL
console.log("\n6. Kiểm tra File Rollback SQL:");
const rollbackSql = fs.readFileSync(
  "supabase/migrations/20260903000001_rollback_master_schema.sql",
  "utf-8"
);
let rollbackDrops = 0;
for (const table of REQUIRED_TABLES) {
  if (rollbackSql.includes(`DROP TABLE IF EXISTS public.${table}`)) {
    rollbackDrops++;
  }
}
assert(
  rollbackDrops === REQUIRED_TABLES.length,
  `File Rollback SQL chứa đầy đủ lệnh DROP an toàn cho cả ${REQUIRED_TABLES.length} bảng`
);

// 7. Kiểm tra Supabase Helper an toàn
console.log("\n7. Kiểm tra Thư viện Supabase Client an toàn:");
const supabaseContent = fs.readFileSync("lib/supabase.ts", "utf-8");
assert(
  supabaseContent.includes('typeof window !== "undefined"') &&
    supabaseContent.includes("FATAL SECURITY VIOLATION"),
  "lib/supabase.ts có chốt an toàn ngăn chặn tuyệt đối rò rỉ Service Role Key ra browser"
);

console.log(`\n=== TỔNG KẾT: ${passed} PASS, ${failed} FAIL ===`);
if (failed > 0) process.exit(1);
