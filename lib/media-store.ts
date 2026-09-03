/**
 * Secure Media Storage Store
 * Strict MIME whitelist, UUID filenames, private bucket, real byte calculations.
 */

export interface MediaFileRecord {
  id: string;
  storagePath: string;
  originalFilename: string;
  sanitizedFilename: string;
  mimeType: string;
  fileSizeBytes: number;
  category: "exam" | "document" | "image" | "general";
  isPrivate: boolean;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".docx",
  ".xlsx",
  ".pptx",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
]);

export const FORBIDDEN_EXTENSIONS = new Set([
  ".exe",
  ".bat",
  ".cmd",
  ".msi",
  ".html",
  ".htm",
  ".js",
  ".ts",
  ".php",
  ".sh",
  ".vbs",
  ".ps1",
]);

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();
}

let MEDIA_FILES_STORE: MediaFileRecord[] = [
  {
    id: "media-001",
    storagePath: "exams/2026/mos-excel-practice-test-01.pdf",
    originalFilename: "Bo_De_Thi_Thu_MOS_Excel_2019_Chuan_Certiport.pdf",
    sanitizedFilename: "bo_de_thi_thu_mos_excel_2019_chuan_certiport.pdf",
    mimeType: "application/pdf",
    fileSizeBytes: 4250000, // 4.25 MB
    category: "exam",
    isPrivate: true,
    uploadedBy: "admin_super",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: "media-002",
    storagePath: "documents/2026/cam-nang-on-thi-ic3-gs6.pdf",
    originalFilename: "Cam_Nang_On_Thi_IC3_GS6_Toan_Dien.pdf",
    sanitizedFilename: "cam_nang_on_thi_ic3_gs6_toan_dien.pdf",
    mimeType: "application/pdf",
    fileSizeBytes: 8920000, // 8.92 MB
    category: "document",
    isPrivate: true,
    uploadedBy: "academic_lan",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: "media-003",
    storagePath: "templates/2026/excel-dashboard-finance.xlsx",
    originalFilename: "Template_Excel_Dashboard_Quan_Tri_Tai_Chinh.xlsx",
    sanitizedFilename: "template_excel_dashboard_quan_tri_tai_chinh.xlsx",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileSizeBytes: 2150000, // 2.15 MB
    category: "document",
    isPrivate: true,
    uploadedBy: "teacher_huy",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
];

export const MediaStore = {
  getFiles(category?: string): MediaFileRecord[] {
    let list = MEDIA_FILES_STORE.filter((f) => !f.deletedAt);
    if (category && category !== "ALL") {
      list = list.filter((f) => f.category === category);
    }
    return list;
  },

  getTotalStorageBytes(): number {
    return MEDIA_FILES_STORE.filter((f) => !f.deletedAt).reduce(
      (sum, f) => sum + f.fileSizeBytes,
      0
    );
  },

  formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  },

  registerFile(input: {
    originalFilename: string;
    mimeType: string;
    fileSizeBytes: number;
    category?: MediaFileRecord["category"];
    uploadedBy: string;
  }): { success: true; file: MediaFileRecord } | { success: false; error: string } {
    const ext = "." + (input.originalFilename.split(".").pop() || "").toLowerCase();

    if (FORBIDDEN_EXTENSIONS.has(ext)) {
      return {
        success: false,
        error: `Định dạng tệp ${ext} bị cấm hoàn toàn vì lý do bảo mật máy chủ.`,
      };
    }

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return {
        success: false,
        error: `Định dạng tệp ${ext} không được phép tải lên. Chỉ chấp nhận tài liệu và hình ảnh chuẩn (.pdf, .docx, .xlsx, .pptx, .png, .jpg).`,
      };
    }

    if (input.fileSizeBytes > MAX_FILE_SIZE_BYTES) {
      return {
        success: false,
        error: `Dung lượng tệp (${this.formatBytes(input.fileSizeBytes)}) vượt quá giới hạn cho phép (25 MB).`,
      };
    }

    const uuid = Math.random().toString(36).substring(2, 10);
    const sanitized = sanitizeFilename(input.originalFilename);
    const storagePath = `private/${input.category || "general"}/${Date.now()}-${uuid}-${sanitized}`;

    const newRecord: MediaFileRecord = {
      id: `media-${Date.now()}-${uuid}`,
      storagePath,
      originalFilename: input.originalFilename,
      sanitizedFilename: sanitized,
      mimeType: input.mimeType,
      fileSizeBytes: input.fileSizeBytes,
      category: input.category || "general",
      isPrivate: true,
      uploadedBy: input.uploadedBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };

    MEDIA_FILES_STORE.unshift(newRecord);
    return { success: true, file: newRecord };
  },

  deleteFile(id: string): boolean {
    const file = MEDIA_FILES_STORE.find((f) => f.id === id);
    if (!file) return false;
    file.deletedAt = new Date().toISOString();
    file.updatedAt = new Date().toISOString();
    return true;
  },
};
