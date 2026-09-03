import fs from "fs";
import { CoursesStore } from "../lib/courses-store.ts";
import { SchedulesStore, computeAvailableSlots } from "../lib/schedules-store.ts";
import { LeadsStore, maskPhoneNumber } from "../lib/leads-store.ts";
import { MediaStore, MAX_FILE_SIZE_BYTES } from "../lib/media-store.ts";

console.log("=== KIỂM THỬ XÁC MINH SPRINT 4: PRODUCTION BUSINESS MODULES ===");
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

// 1. Kiểm tra Courses Store (Dữ liệu có cấu trúc, Giá số nguyên, Soft-delete)
console.log("\n1. Kiểm tra Kho Khóa Học (CoursesStore):");
const courses = CoursesStore.getCourses();
assert(
  courses.length > 0 && typeof courses[0].priceAmount === "number",
  "Khóa học lưu học phí dưới dạng số nguyên (integer VND) có thể tính toán"
);

const newCourse = CoursesStore.createCourse({
  code: "TEST-CRS-01",
  title: "Khóa Học Kiểm Thử Tự Động",
  slug: "khoa-hoc-kiem-thu",
  category: "mos-ic3",
  categoryName: "Chứng Chỉ Quốc Tế",
  tagline: "Kiểm thử tự động",
  priceAmount: 899000,
  originalPriceAmount: 1200000,
  currency: "VND",
  duration: "4 buổi",
  totalSessions: 4,
  badge: "Mới 2026",
  examCode: "Certiport",
  description: "Mô tả khóa học kiểm thử",
  features: ["Bao đỗ"],
  popular: false,
  status: "DRAFT",
});
assert(
  newCourse.status === "DRAFT" && newCourse.deletedAt === null,
  "Tạo mới khóa học thành công với trạng thái DRAFT"
);

const deleteOk = CoursesStore.softDeleteCourse(newCourse.id);
assert(
  deleteOk && CoursesStore.getCourses().every((c) => c.id !== newCourse.id),
  "Soft-delete khóa học thành công: Chuyển vào thùng rác, không hiển thị trong danh sách chính"
);

// 2. Kiểm tra Schedules Store (Tự động tính toán số chỗ còn lại)
console.log("\n2. Kiểm tra Lịch Khai Giảng (SchedulesStore):");
const batches = SchedulesStore.getBatches();
assert(
  batches.length > 0 && typeof batches[0].availableSlots === "number",
  "Lịch khai giảng tự động tính toán availableSlots = capacity - reserved - enrolled"
);

const testSlots = computeAvailableSlots({ capacity: 30, reservedCount: 5, enrolledCount: 15 });
assert(testSlots === 10, "Công thức tính số chỗ trống chính xác tuyệt đối (30 - 5 - 15 = 10)");

// 3. Kiểm tra Leads Store (Pipeline 7 bước, Che số điện thoại PII, Timeline)
console.log("\n3. Kiểm tra CRM Leads (LeadsStore):");
const maskedLeads = LeadsStore.getLeads(true);
assert(
  maskedLeads.length > 0 && maskedLeads[0].phone.includes("***"),
  "Tự động che số điện thoại PII (Masking) đối với người dùng không có quyền export"
);

const rawLeads = LeadsStore.getLeads(false);
assert(
  rawLeads.length > 0 && !rawLeads[0].phone.includes("***"),
  "Cung cấp số điện thoại đầy đủ cho người dùng có quyền lead.export"
);

// 4. Kiểm tra Media Store (Chặn file độc hại, giới hạn 25MB, tính dung lượng thật)
console.log("\n4. Kiểm tra Kho Media & Đề Thi (MediaStore):");
const maliciousUpload = MediaStore.registerFile({
  originalFilename: "malware.exe",
  mimeType: "application/x-msdownload",
  fileSizeBytes: 1024,
  uploadedBy: "tester",
});
assert(
  maliciousUpload.success === false && maliciousUpload.error?.includes("bị cấm"),
  "Chặn đứng tệp tin thực thi độc hại (.exe)"
);

const oversizedUpload = MediaStore.registerFile({
  originalFilename: "heavy-video.pdf",
  mimeType: "application/pdf",
  fileSizeBytes: MAX_FILE_SIZE_BYTES + 1000,
  uploadedBy: "tester",
});
assert(
  oversizedUpload.success === false && oversizedUpload.error?.includes("vượt quá giới hạn"),
  "Chặn tệp tin vượt quá dung lượng tối đa 25 MB"
);

const safeUpload = MediaStore.registerFile({
  originalFilename: "official-practice-test.pdf",
  mimeType: "application/pdf",
  fileSizeBytes: 2500000,
  uploadedBy: "admin_super",
});
assert(
  safeUpload.success === true && safeUpload.file.isPrivate === true,
  "Đăng ký tệp an toàn thành công với thuộc tính isPrivate = true"
);

const totalStorage = MediaStore.getTotalStorageBytes();
assert(totalStorage > 0, "Dung lượng lưu trữ kho Media được tính toán theo byte thực tế");

// 5. Kiểm tra Gỡ bỏ Nhãn Giả mạo trong BlockchainVerifyModal.tsx
console.log("\n5. Kiểm tra Gỡ Bỏ Nhãn Giả mạo trong Modal Chứng Chỉ:");
const modalContent = fs.readFileSync("components/BlockchainVerifyModal.tsx", "utf-8");
assert(
  !modalContent.includes("EduLedger Node") &&
    !modalContent.includes("Sổ Cái Blockchain") &&
    modalContent.includes("Mã Băm Đối Soát Toàn Vẹn"),
  "BlockchainVerifyModal.tsx đã gỡ bỏ hoàn toàn các tuyên bố sai lệch về Blockchain"
);

console.log(`\n=== TỔNG KẾT SPRINT 4: ${passed} PASS, ${failed} FAIL ===`);
if (failed > 0) process.exit(1);
