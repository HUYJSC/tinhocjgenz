import { removeVietnameseTones, matchesSearch } from "../lib/text-utils.ts";
import {
  getCurriculumByCourseId,
  getLessonById,
  getAllLessons,
} from "../data/lessonsData.ts";
import {
  saveLessonProgressServer,
  getUserCourseProgressServer,
  getUserRecentActivityServer,
} from "../lib/learning-store.ts";

console.log("=== KIỂM THỬ XÁC MINH SPRINT 5: CODELEARN LEARNING FLOW & SEARCH ===");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

// 1. Kiểm tra thuật toán chuẩn hóa tiếng Việt không dấu
console.log("\n1. Kiểm tra chuẩn hóa tìm kiếm tiếng Việt (Accent-insensitive):");
assert(
  removeVietnameseTones("Tin Học Văn Phòng") === "tin hoc van phong",
  "Chuyển đổi đúng chữ hoa có dấu thành chữ thường không dấu"
);
assert(
  removeVietnameseTones("Đề thi MOS Excel 2019") === "de thi mos excel 2019",
  "Xử lý chuẩn chữ Đ/đ trong tiếng Việt"
);
assert(
  matchesSearch("Luyện Thi MOS Word Cấp Tốc", "word"),
  "Tìm kiếm khớp từ khóa tiếng Anh không phân biệt hoa thường"
);
assert(
  matchesSearch("Chứng chỉ IC3 GS6 Chuẩn Quốc Tế", "chuan quoc te"),
  "Tìm kiếm không dấu khớp dữ liệu có dấu"
);
assert(
  matchesSearch("Khóa học Excel thực chiến", "EXCEL THUC CHIEN"),
  "Tìm kiếm chữ hoa không dấu khớp chữ thường có dấu"
);

// 2. Kiểm tra cấu trúc dữ liệu Khóa học & Bài học (Curriculum & Lessons)
console.log("\n2. Kiểm tra Cấu trúc dữ liệu bài học & bài tập:");
const mosCurriculum = getCurriculumByCourseId("mos-master-combo");
assert(mosCurriculum !== null, "Tìm thấy giáo trình cho khóa mos-master-combo");
assert(mosCurriculum.chapters.length >= 3, "Khóa MOS Combo có đủ 3 chương (Word, Excel, PowerPoint)");

const allMosLessons = getAllLessons("mos-master-combo");
assert(allMosLessons.length >= 4, `Khóa MOS Combo có ${allMosLessons.length} bài học thực hành`);

const wordLesson1 = getLessonById("mos-master-combo", "word-lesson-1");
assert(wordLesson1 !== null, "Truy xuất thành công chi tiết bài 1 môn Word");
assert(wordLesson1.lesson.exercise.options.length === 4, "Bài tập có đầy đủ 4 phương án lựa chọn");
assert(
  typeof wordLesson1.lesson.exercise.correctIndex === "number",
  "Bài tập có đáp án chính xác được xác định rõ ràng"
);
assert(
  wordLesson1.lesson.exercise.explanation.length > 20,
  "Bài tập có lời giải và giải thích chi tiết"
);

// 3. Kiểm tra tính Idempotent của hệ thống lưu trữ tiến độ (Progress Store)
console.log("\n3. Kiểm tra Tính Idempotent và chống ghi đè/nhân đôi dữ liệu:");
const testUserId = "test-user-qa-123";
const courseId = "mos-master-combo";
const lessonId = "word-lesson-1";

// Lần 1: Học viên hoàn thành bài tập với 100 điểm
const rec1 = saveLessonProgressServer({
  userId: testUserId,
  courseId,
  lessonId,
  completed: true,
  score: 100,
});
assert(rec1.completed === true && rec1.score === 100, "Lưu tiến độ lần đầu thành công");

// Lần 2: Học viên refresh hoặc gửi trùng request với điểm thấp hơn
const rec2 = saveLessonProgressServer({
  userId: testUserId,
  courseId,
  lessonId,
  completed: true,
  score: 80,
});
assert(rec2.score === 100, "Bảo toàn điểm số cao nhất khi gửi lại request");
assert(rec2.completedAt === rec1.completedAt, "Không làm sai lệch mốc thời gian hoàn thành lần đầu");

// Lấy danh sách tiến độ của học viên
const progressList = getUserCourseProgressServer(testUserId, courseId);
assert(progressList.length === 1, "Không bị nhân đôi bản ghi tiến độ trong cùng 1 bài học (Idempotent)");

// Kiểm tra recent activity
const recent = getUserRecentActivityServer(testUserId);
assert(recent !== null && recent.lessonId === lessonId, "Lấy chính xác bài học gần nhất vừa truy cập");

console.log(`\n=== TỔNG KẾT SPRINT 5: ${passed} PASS, ${failed} FAIL ===\n`);

if (failed > 0) {
  process.exit(1);
}

