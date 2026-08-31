import fs from "fs";
import path from "path";

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  course: string;
  university?: string;
  date: string;
  status: "Chờ gọi" | "Đã tư vấn" | "Đã đóng học phí" | "Hủy";
  note: string;
  createdAt: string;
}

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

const INITIAL_LEADS: LeadRecord[] = [
  {
    id: "lead-1",
    name: "Nguyễn Văn Tuấn",
    phone: "0968123456",
    course: "Combo MOS 3 Môn Cấp Tốc",
    university: "Sinh viên Đại học",
    date: "31/08/2026",
    status: "Chờ gọi",
    note: "Cần thi gấp lấy chứng chỉ quốc tế xét tốt nghiệp đợt 1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "lead-2",
    name: "Lê Thị Mai",
    phone: "0912345678",
    course: "Chứng chỉ IC3 GS6 Chuẩn Quốc Tế",
    university: "Học sinh THPT / Tân sinh viên",
    date: "31/08/2026",
    status: "Đã tư vấn",
    note: "Đăng ký nhóm 3 bạn giảm 20% học phí",
    createdAt: new Date().toISOString(),
  },
  {
    id: "lead-3",
    name: "Trần Minh Quang",
    phone: "0987654321",
    course: "MOS Excel 2019 / 365",
    university: "Chuyên viên Kế toán",
    date: "30/08/2026",
    status: "Đã đóng học phí",
    note: "Lớp tối 2-4-6, đã cấp tài khoản máy ảo Certiport",
    createdAt: new Date().toISOString(),
  },
];

let memoryLeads: LeadRecord[] = [...INITIAL_LEADS];

export class LeadsStore {
  static getLeads(): LeadRecord[] {
    try {
      if (fs.existsSync(LEADS_FILE)) {
        const raw = fs.readFileSync(LEADS_FILE, "utf-8");
        return JSON.parse(raw);
      }
      this.saveAll(memoryLeads);
      return memoryLeads;
    } catch {
      return memoryLeads;
    }
  }

  static saveAll(leads: LeadRecord[]) {
    memoryLeads = leads;
    try {
      const dir = path.dirname(LEADS_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
    } catch (e) {
      console.warn("Lỗi lưu leads ra disk, dùng in-memory:", e);
    }
  }

  static addLead(lead: Omit<LeadRecord, "id" | "date" | "status" | "createdAt">): LeadRecord {
    const leads = this.getLeads();
    const newRecord: LeadRecord = {
      id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: lead.name,
      phone: lead.phone,
      course: lead.course || "Tư vấn tổng quát",
      university: lead.university || "Chưa cập nhật",
      date: new Date().toLocaleDateString("vi-VN"),
      status: "Chờ gọi",
      note: lead.note || "Đăng ký từ biểu mẫu website",
      createdAt: new Date().toISOString(),
    };
    leads.unshift(newRecord);
    this.saveAll(leads);
    return newRecord;
  }

  static updateStatus(id: string, status: LeadRecord["status"]): boolean {
    const leads = this.getLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx !== -1) {
      leads[idx].status = status;
      this.saveAll(leads);
      return true;
    }
    return false;
  }

  static deleteLead(id: string): boolean {
    const leads = this.getLeads();
    const filtered = leads.filter((l) => l.id !== id);
    if (filtered.length !== leads.length) {
      this.saveAll(filtered);
      return true;
    }
    return false;
  }
}
