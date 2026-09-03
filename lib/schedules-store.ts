/**
 * Production Schedules & Class Batches Store
 * Automatically calculates available slots = capacity - reserved - enrolled.
 * Structured dates and times, referential integrity with courses.
 */

export type DeliveryMode = "ONLINE" | "OFFLINE" | "HYBRID";
export type BatchStatus = "OPENING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface AdminClassBatch {
  id: string;
  batchCode: string;
  courseId: string;
  courseName: string;
  courseType: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  daysOfWeek: number[]; // [1, 3, 5] for Mon, Wed, Fri
  startTime: string; // "19:30"
  endTime: string; // "21:30"
  deliveryMode: DeliveryMode;
  roomOrMeetingUrl?: string;
  capacity: number;
  reservedCount: number;
  enrolledCount: number;
  status: BatchStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export function computeAvailableSlots(batch: {
  capacity: number;
  reservedCount: number;
  enrolledCount: number;
}): number {
  return Math.max(0, batch.capacity - (batch.reservedCount || 0) - (batch.enrolledCount || 0));
}

// Initial structured batches
let BATCHES_STORE: AdminClassBatch[] = [
  {
    id: "batch-mos-e01",
    batchCode: "MOS-E2019-K01",
    courseId: "mos-excel",
    courseName: "MOS Excel 2019 / 365 Cấp Tốc",
    courseType: "MOS",
    startDate: "2026-09-15",
    endDate: "2026-09-30",
    daysOfWeek: [1, 3, 5],
    startTime: "19:30",
    endTime: "21:30",
    deliveryMode: "ONLINE",
    roomOrMeetingUrl: "https://meet.google.com/tgz-mose-001",
    capacity: 25,
    reservedCount: 8,
    enrolledCount: 12,
    status: "OPENING",
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: "batch-ic3-01",
    batchCode: "IC3-GS6-K02",
    courseId: "ic3-gs6",
    courseName: "Luyện Thi Chuẩn IC3 GS6 Toàn Diện",
    courseType: "IC3",
    startDate: "2026-09-18",
    endDate: "2026-10-05",
    daysOfWeek: [2, 4, 6],
    startTime: "19:30",
    endTime: "21:30",
    deliveryMode: "ONLINE",
    roomOrMeetingUrl: "https://meet.google.com/tgz-ic3-002",
    capacity: 20,
    reservedCount: 4,
    enrolledCount: 13,
    status: "OPENING",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: "batch-excel-01",
    batchCode: "EXC-PRO-K05",
    courseId: "excel-nang-cao",
    courseName: "Excel Thực Chiến & Báo Cáo Tự Động",
    courseType: "Excel",
    startDate: "2026-09-22",
    endDate: "2026-10-15",
    daysOfWeek: [1, 3, 5],
    startTime: "20:00",
    endTime: "22:00",
    deliveryMode: "HYBRID",
    roomOrMeetingUrl: "Phòng Lab 302 - 120 Hoàng Quốc Việt",
    capacity: 18,
    reservedCount: 5,
    enrolledCount: 11,
    status: "OPENING",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
];

export const SchedulesStore = {
  getBatches(includeDeleted = false) {
    const list = includeDeleted ? BATCHES_STORE : BATCHES_STORE.filter((b) => !b.deletedAt);
    return list.map((b) => ({
      ...b,
      availableSlots: computeAvailableSlots(b),
    }));
  },

  getBatchById(id: string) {
    const batch = BATCHES_STORE.find((b) => b.id === id);
    if (!batch) return null;
    return {
      ...batch,
      availableSlots: computeAvailableSlots(batch),
    };
  },

  createBatch(input: Omit<AdminClassBatch, "id" | "createdAt" | "updatedAt" | "deletedAt">) {
    const newBatch: AdminClassBatch = {
      id: `batch-${Date.now()}`,
      ...input,
      capacity: Math.max(1, Number(input.capacity) || 20),
      reservedCount: Math.max(0, Number(input.reservedCount) || 0),
      enrolledCount: Math.max(0, Number(input.enrolledCount) || 0),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };
    BATCHES_STORE.unshift(newBatch);
    return {
      ...newBatch,
      availableSlots: computeAvailableSlots(newBatch),
    };
  },

  updateBatch(id: string, updates: Partial<AdminClassBatch>) {
    const idx = BATCHES_STORE.findIndex((b) => b.id === id);
    if (idx === -1) return null;

    const updated: AdminClassBatch = {
      ...BATCHES_STORE[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    BATCHES_STORE[idx] = updated;
    return {
      ...updated,
      availableSlots: computeAvailableSlots(updated),
    };
  },

  softDeleteBatch(id: string): boolean {
    const batch = BATCHES_STORE.find((b) => b.id === id);
    if (!batch) return false;
    batch.deletedAt = new Date().toISOString();
    batch.status = "CANCELLED";
    batch.updatedAt = new Date().toISOString();
    return true;
  },
};
