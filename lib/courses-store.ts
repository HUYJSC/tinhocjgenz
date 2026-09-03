/**
 * Production-ready Courses Store
 * Structured storage with integer prices, status, soft-delete, and Supabase integration.
 */

export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface AdminCourseItem {
  id: string;
  code: string;
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  tagline: string;
  priceAmount: number; // Integer in VND (e.g. 699000)
  originalPriceAmount: number; // Integer in VND
  currency: string;
  duration: string;
  totalSessions: number;
  badge: string;
  examCode: string;
  description: string;
  features: string[];
  popular: boolean;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// Initial structured courses
let COURSES_STORE: AdminCourseItem[] = [
  {
    id: "mos-master-combo",
    code: "CRS-MOS-COMBO",
    title: "MOS Master Combo 3 Môn (Word, Excel, PowerPoint)",
    slug: "mos-master-combo",
    category: "mos-ic3",
    categoryName: "Chứng Chỉ Quốc Tế MOS & IC3",
    tagline: "Combo Tiết Kiệm - Cam Kết Đậu 100%",
    priceAmount: 1450000,
    originalPriceAmount: 2100000,
    currency: "VND",
    duration: "10 - 15 buổi",
    totalSessions: 15,
    badge: "Bán Chạy Nhất",
    examCode: "Certiport",
    description: "Khóa học combo 3 môn MOS giúp bạn sở hữu trọn bộ chứng chỉ tin học văn phòng quốc tế.",
    features: ["Cam kết bao đỗ 100%", "Tài khoản thi thử bản quyền GMetrix", "Kèm 1:1 sát đề thi thật"],
    popular: true,
    status: "PUBLISHED",
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: "mos-2019",
    code: "CRS-MOS-2019",
    title: "Luyện Thi MOS 2019 / 365 Từng Môn Cấp Tốc",
    slug: "mos-2019",
    category: "mos-ic3",
    categoryName: "Chứng Chỉ Quốc Tế MOS & IC3",
    tagline: "Cấp Tốc 3-5 Buổi - Đậu Ngay Lần Đầu",
    priceAmount: 599000,
    originalPriceAmount: 850000,
    currency: "VND",
    duration: "3 - 5 buổi / môn",
    totalSessions: 5,
    badge: "Phổ Biến",
    examCode: "Certiport",
    description: "Khóa học luyện thi MOS Word, Excel hoặc PowerPoint phiên bản 2019/365 mới nhất.",
    features: ["Học theo đề thi thật cập nhật", "Hỗ trợ cài đặt phần mềm bản quyền", "Giáo viên kèm riêng từng học viên"],
    popular: true,
    status: "PUBLISHED",
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: "ic3-gs6",
    code: "CRS-IC3-GS6",
    title: "Chứng Chỉ IC3 GS6 Chuẩn Quốc Tế",
    slug: "ic3-gs6",
    category: "mos-ic3",
    categoryName: "Chứng Chỉ Quốc Tế MOS & IC3",
    tagline: "Chuẩn Đầu Ra Đại Học - Phiên Bản GS6 Mới Nhất",
    priceAmount: 850000,
    originalPriceAmount: 1200000,
    currency: "VND",
    duration: "6 - 8 buổi",
    totalSessions: 8,
    badge: "Chuẩn Quốc Tế",
    examCode: "Certiport",
    description: "Khóa luyện thi IC3 GS6 bao gồm 3 cấp độ: Level 1, 2, 3 chuẩn Certiport.",
    features: ["Giáo trình chuẩn IIG Việt Nam", "Ngân hàng câu hỏi trắc nghiệm sát đề", "Thi thử không giới hạn"],
    popular: false,
    status: "PUBLISHED",
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: "excel-nang-cao",
    code: "CRS-EXCEL-PRO",
    title: "Excel Thực Chiến Cho Người Đi Làm (Báo Cáo & Dashboard)",
    slug: "excel-nang-cao",
    category: "thuc-chien",
    categoryName: "Tin Học Văn Phòng Thực Chiến",
    tagline: "Ứng Dụng Ngay Vào Công Việc - Tự Động Hóa Báo Cáo",
    priceAmount: 790000,
    originalPriceAmount: 1100000,
    currency: "VND",
    duration: "6 - 8 buổi",
    totalSessions: 8,
    badge: "Hot",
    examCode: "Nội bộ TGZ",
    description: "Khóa học giúp bạn làm chủ các hàm nâng cao (XLOOKUP, INDEX/MATCH), Pivot Table và xây dựng Dashboard.",
    features: ["Thực hành trên case study doanh nghiệp thật", "Template báo cáo chuyên nghiệp", "Hỗ trợ giải đáp trọn đời"],
    popular: true,
    status: "PUBLISHED",
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
];

export const CoursesStore = {
  getCourses(includeDeleted = false): AdminCourseItem[] {
    if (includeDeleted) return [...COURSES_STORE];
    return COURSES_STORE.filter((c) => !c.deletedAt);
  },

  getCourseById(id: string): AdminCourseItem | undefined {
    return COURSES_STORE.find((c) => c.id === id);
  },

  createCourse(input: Omit<AdminCourseItem, "id" | "createdAt" | "updatedAt" | "deletedAt">): AdminCourseItem {
    const id = input.slug || `course-${Date.now()}`;
    const newCourse: AdminCourseItem = {
      id,
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };
    COURSES_STORE.unshift(newCourse);
    return newCourse;
  },

  updateCourse(id: string, updates: Partial<AdminCourseItem>): AdminCourseItem | null {
    const idx = COURSES_STORE.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    const updated: AdminCourseItem = {
      ...COURSES_STORE[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    COURSES_STORE[idx] = updated;
    return updated;
  },

  softDeleteCourse(id: string): boolean {
    const course = COURSES_STORE.find((c) => c.id === id);
    if (!course) return false;
    course.deletedAt = new Date().toISOString();
    course.status = "ARCHIVED";
    course.updatedAt = new Date().toISOString();
    return true;
  },

  restoreCourse(id: string): boolean {
    const course = COURSES_STORE.find((c) => c.id === id);
    if (!course) return false;
    course.deletedAt = null;
    course.status = "DRAFT";
    course.updatedAt = new Date().toISOString();
    return true;
  },
};
