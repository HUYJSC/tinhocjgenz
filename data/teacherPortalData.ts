export const teacherInfo = {
  name: "Thầy Huy (MOS Master Trainer)",
  department: "Bộ Môn Khảo Thí & Tin Học Quốc Tế",
  activeClasses: 3,
  totalStudents: 38,
  pendingSubmissions: 4,
};

export const teachingClasses = [
  {
    id: "c1",
    name: "MOS Excel 2019 Cấp Tốc - Lớp Tối 2-4-6",
    schedule: "19h30 - 21h30 (Thứ 2, 4, 6)",
    studentsCount: 14,
    sessionProgress: "Buổi 3 / 5",
    roomLink: "https://meet.google.com/ph-excel-t246",
  },
  {
    id: "c2",
    name: "IC3 Digital Literacy GS6 - Lớp Tối 3-5-7",
    schedule: "19h30 - 21h30 (Thứ 3, 5, 7)",
    studentsCount: 12,
    sessionProgress: "Buổi 2 / 5",
    roomLink: "https://meet.google.com/ph-ic3-gs6",
  },
  {
    id: "c3",
    name: "Kèm 1:1 Cấp Tốc MOS Word - Nguyễn Hoàng Nam",
    schedule: "14h00 - 16h00 (Thứ 7, CN)",
    studentsCount: 1,
    sessionProgress: "Buổi 3 / 3",
    roomLink: "https://meet.google.com/ph-word-vip1",
  },
];

export const initialStudentsAttendance = [
  { id: "s1", name: "Nguyễn Hoàng Nam", phone: "0901234567", present: true, notes: "Làm bài tốt" },
  { id: "s2", name: "Trần Thị Thu Thảo", phone: "0912345678", present: true, notes: "Nắm vững XLOOKUP" },
  { id: "s3", name: "Lê Minh Trí", phone: "0923456789", present: false, notes: "Xin phép đi công tác" },
  { id: "s4", name: "Phạm Thúy Hằng", phone: "0934567890", present: true, notes: "" },
  { id: "s5", name: "Vũ Hải Đăng", phone: "0945678901", present: true, notes: "" },
];

export const initialGradingQueue = [
  {
    id: "sub-1",
    studentName: "Nguyễn Hoàng Nam",
    lessonTitle: "Buổi 3: XLOOKUP Chuyên Sâu",
    fileName: "Bai_Tap_Excel_XLOOKUP_HoangNam.xlsx",
    submittedAt: "Hôm nay 10:30",
    status: "Chờ chấm",
    suggestedScore: 95,
  },
  {
    id: "sub-2",
    studentName: "Trần Thị Thu Thảo",
    lessonTitle: "Buổi 2: Trộn Thư Mail Merge",
    fileName: "De_Luyen_MailMerge_ThuThao.docx",
    submittedAt: "Hôm nay 09:15",
    status: "Chờ chấm",
    suggestedScore: 100,
  },
  {
    id: "sub-3",
    studentName: "Lê Minh Trí",
    lessonTitle: "Buổi 2: Trộn Thư Mail Merge",
    fileName: "De_Luyen_MailMerge_MinhTri.docx",
    submittedAt: "Hôm qua 22:00",
    status: "Chờ chấm",
    suggestedScore: 85,
  },
];

export const academicWarnings = [
  {
    id: "w1",
    studentName: "Lê Minh Trí",
    class: "MOS Excel T2-4-6",
    reason: "Vắng 2 buổi thực hành liên tiếp & chưa nộp bài tập Buổi 2",
    level: "danger",
    actionSuggested: "Giảng viên gọi điện thoại trực tiếp hoặc nhắc Zalo trước 17:00",
  },
  {
    id: "w2",
    studentName: "Vũ Hải Đăng",
    class: "MOS Excel T2-4-6",
    reason: "Điểm thi thử lần 1 chỉ đạt 620/1000 (Dưới ngưỡng an toàn 700)",
    level: "warning",
    actionSuggested: "Xếp lịch phụ đạo 1:1 30 phút trước buổi học thứ 4",
  },
];

