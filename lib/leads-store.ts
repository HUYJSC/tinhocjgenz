import fs from "fs";
import path from "path";

export type LeadStatus =
  | "NEW"
  | "CONTACTING"
  | "CONSULTED"
  | "RESERVED"
  | "PAID"
  | "ENROLLED"
  | "LOST";

export interface LeadActivity {
  id: string;
  timestamp: string;
  actor: string;
  type: "CALL" | "ZALO" | "NOTE" | "STATUS_CHANGE";
  content: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  course: string;
  university?: string;
  date: string;
  status: LeadStatus;
  note: string;
  assignedTo?: string;
  potentialScore?: number; // 1 to 5
  activities: LeadActivity[];
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

// Helper: Normalize old Vietnamese status strings to 7 standard pipeline codes
export function normalizeLeadStatus(raw: string): LeadStatus {
  switch (raw) {
    case "Chờ gọi":
    case "NEW":
      return "NEW";
    case "Đang liên hệ":
    case "CONTACTING":
      return "CONTACTING";
    case "Đã tư vấn":
    case "CONSULTED":
      return "CONSULTED";
    case "Đã giữ chỗ":
    case "RESERVED":
      return "RESERVED";
    case "Đã đóng học phí":
    case "PAID":
      return "PAID";
    case "Đã vào lớp":
    case "ENROLLED":
      return "ENROLLED";
    case "Hủy":
    case "LOST":
      return "LOST";
    default:
      return "NEW";
  }
}

// Mask sensitive phone numbers (PII protection)
export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 7) return "***";
  return phone.slice(0, 4) + "***" + phone.slice(-3);
}

const INITIAL_LEADS: LeadRecord[] = [
  {
    id: "lead-1",
    name: "Nguyễn Văn Tuấn",
    phone: "0968123456",
    email: "tuan.nguyen@example.com",
    course: "Combo MOS 3 Môn Cấp Tốc",
    university: "Đại học Bách Khoa Hà Nội",
    date: "31/08/2026",
    status: "NEW",
    note: "Cần thi gấp lấy chứng chỉ quốc tế xét tốt nghiệp đợt 1",
    assignedTo: "academic_lan",
    potentialScore: 5,
    activities: [
      {
        id: "act-1",
        timestamp: "2026-08-31T09:15:00Z",
        actor: "Hệ thống Web",
        type: "NOTE",
        content: "Đăng ký tư vấn trực tuyến từ Landing Page MOS",
      },
    ],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "lead-2",
    name: "Lê Thị Mai",
    phone: "0912345678",
    email: "mai.le@example.com",
    course: "Chứng chỉ IC3 GS6 Chuẩn Quốc Tế",
    university: "Đại học Kinh Tế Quốc Dân",
    date: "31/08/2026",
    status: "CONSULTED",
    note: "Đăng ký nhóm 3 bạn giảm 20% học phí",
    assignedTo: "academic_lan",
    potentialScore: 4,
    activities: [
      {
        id: "act-2",
        timestamp: "2026-08-31T10:00:00Z",
        actor: "academic_lan",
        type: "CALL",
        content: "Đã gọi điện tư vấn lịch học tối 2-4-6 và gửi lộ trình qua Zalo.",
      },
    ],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "lead-3",
    name: "Trần Minh Quang",
    phone: "0987654321",
    email: "quang.tran@example.com",
    course: "MOS Excel 2019 / 365",
    university: "Chuyên viên Tài chính - Kế toán",
    date: "30/08/2026",
    status: "PAID",
    note: "Lớp tối 2-4-6, đã cấp tài khoản máy ảo Certiport",
    assignedTo: "academic_lan",
    potentialScore: 5,
    activities: [
      {
        id: "act-3",
        timestamp: "2026-08-30T14:30:00Z",
        actor: "academic_lan",
        type: "STATUS_CHANGE",
        content: "Xác nhận đã đóng học phí chuyển khoản ngân hàng Techcombank.",
      },
    ],
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let memoryLeads: LeadRecord[] = [...INITIAL_LEADS];

export class LeadsStore {
  static getLeads(maskPhone = true): LeadRecord[] {
    let list: LeadRecord[] = [];
    try {
      if (fs.existsSync(LEADS_FILE)) {
        const raw = fs.readFileSync(LEADS_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        list = parsed.map((item: any) => ({
          ...item,
          status: normalizeLeadStatus(item.status),
          activities: Array.isArray(item.activities) ? item.activities : [],
        }));
      } else {
        list = [...memoryLeads];
      }
    } catch {
      list = [...memoryLeads];
    }

    if (maskPhone) {
      return list.map((l) => ({
        ...l,
        phone: maskPhoneNumber(l.phone),
      }));
    }
    return list;
  }

  static saveAll(leads: LeadRecord[]) {
    memoryLeads = leads;
    try {
      const dir = path.dirname(LEADS_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
    } catch (e) {
      console.warn("[LeadsStore] Lỗi lưu file leads, sử dụng memory:", e);
    }
  }

  static addLead(lead: {
    name: string;
    phone: string;
    email?: string;
    course?: string;
    university?: string;
    note?: string;
  }): LeadRecord {
    const rawLeads = this.getLeads(false);
    const newRecord: LeadRecord = {
      id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      course: lead.course || "Tư vấn tổng quát",
      university: lead.university || "Chưa cập nhật",
      date: new Date().toLocaleDateString("vi-VN"),
      status: "NEW",
      note: lead.note || "Đăng ký từ biểu mẫu website",
      potentialScore: 3,
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: "Hệ thống Web",
          type: "NOTE",
          content: "Đăng ký thành công từ website",
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    rawLeads.unshift(newRecord);
    this.saveAll(rawLeads);
    return newRecord;
  }

  static updateStatus(id: string, status: LeadStatus, actorName = "Admin"): boolean {
    const rawLeads = this.getLeads(false);
    const idx = rawLeads.findIndex((l) => l.id === id);
    if (idx !== -1) {
      const oldStatus = rawLeads[idx].status;
      rawLeads[idx].status = normalizeLeadStatus(status);
      rawLeads[idx].updatedAt = new Date().toISOString();
      if (!Array.isArray(rawLeads[idx].activities)) {
        rawLeads[idx].activities = [];
      }
      rawLeads[idx].activities.unshift({
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: actorName,
        type: "STATUS_CHANGE",
        content: `Chuyển trạng thái từ [${oldStatus}] sang [${status}]`,
      });
      this.saveAll(rawLeads);
      return true;
    }
    return false;
  }

  static addActivity(id: string, activity: Omit<LeadActivity, "id" | "timestamp">): boolean {
    const rawLeads = this.getLeads(false);
    const idx = rawLeads.findIndex((l) => l.id === id);
    if (idx !== -1) {
      if (!Array.isArray(rawLeads[idx].activities)) {
        rawLeads[idx].activities = [];
      }
      rawLeads[idx].activities.unshift({
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...activity,
      });
      rawLeads[idx].updatedAt = new Date().toISOString();
      this.saveAll(rawLeads);
      return true;
    }
    return false;
  }

  static deleteLead(id: string): boolean {
    const rawLeads = this.getLeads(false);
    const filtered = rawLeads.filter((l) => l.id !== id);
    if (filtered.length !== rawLeads.length) {
      this.saveAll(filtered);
      return true;
    }
    return false;
  }
}
