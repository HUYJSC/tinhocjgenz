"use client";

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  MessageSquare, 
  Laptop, 
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";

export interface BatchItem {
  id: string;
  name: string;
  time: string;
  startDate: string;
  status: "Đang mở đăng ký" | "Sắp đầy chỗ" | "Chỉ còn 2 suất";
  slotsTotal: number;
  slotsRemaining: number;
  mode: string;
}

interface Props {
  courseTitle: string;
  batches?: BatchItem[];
}

export default function CourseScheduleWidget({ courseTitle, batches }: Props) {
  const defaultBatches: BatchItem[] = [
    {
      id: "b-1",
      name: "Lớp Tối 2 - 4 - 6 (Cấp Tốc)",
      time: "19h30 - 21h30 (3 buổi ôn + luyện đề)",
      startDate: "Tối Thứ 2 hàng tuần",
      status: "Chỉ còn 2 suất",
      slotsTotal: 10,
      slotsRemaining: 2,
      mode: "Online qua Zoom/Google Meet + Kèm 1:1"
    },
    {
      id: "b-2",
      name: "Lớp Tối 3 - 5 - 7 (Thực Chiến)",
      time: "19h30 - 21h30 (3 buổi ôn + luyện đề)",
      startDate: "Tối Thứ 3 hàng tuần",
      status: "Đang mở đăng ký",
      slotsTotal: 10,
      slotsRemaining: 5,
      mode: "Online qua Zoom/Google Meet + Kèm 1:1"
    },
    {
      id: "b-3",
      name: "Lớp Thứ 7 & Chủ Nhật (Cuối Tuần)",
      time: "14h00 - 17h00 (2 buổi chuyên sâu)",
      startDate: "Thứ 7 tuần này",
      status: "Sắp đầy chỗ",
      slotsTotal: 8,
      slotsRemaining: 3,
      mode: "Online qua Zoom/Google Meet + Kèm 1:1"
    }
  ];

  const scheduleList = batches && batches.length > 0 ? batches : defaultBatches;
  const [selectedBatchId, setSelectedBatchId] = useState<string>(scheduleList[0]?.id || "b-1");
  const [isCustom1on1, setIsCustom1on1] = useState<boolean>(false);

  const selectedBatch = scheduleList.find(b => b.id === selectedBatchId) || scheduleList[0];

  const handleSelectAndScroll = (batch: BatchItem) => {
    setSelectedBatchId(batch.id);
    const formElement = document.getElementById("dang-ky");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      // Pre-fill or highlight note if input exists
      const noteInput = document.querySelector('textarea[name="note"], input[name="note"]') as HTMLInputElement | HTMLTextAreaElement;
      if (noteInput) {
        noteInput.value = `Đăng ký: ${courseTitle} - ${batch.name} (${batch.time})`;
      }
    }
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-premium space-y-6">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider">
            <Calendar size={12} className="text-blue-600" />
            LỊCH KHAI GIẢNG & GIỮ CHỖ
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 font-display flex items-center gap-2">
            <span>Chọn Lịch Học Phù Hợp</span>
          </h3>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Đang mở đăng ký</span>
        </span>
      </div>

      {/* Mode Switcher: Theo Ca Cố Định vs Kèm 1:1 Tự Chọn Giờ */}
      <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/70">
        <button
          type="button"
          onClick={() => setIsCustom1on1(false)}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
            !isCustom1on1
              ? "bg-white text-blue-700 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>Lớp Theo Ca Cố Định</span>
        </button>
        <button
          type="button"
          onClick={() => setIsCustom1on1(true)}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
            isCustom1on1
              ? "bg-white text-blue-700 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>Kèm 1:1 Giờ Tự Chọn</span>
        </button>
      </div>

      {/* VIEW 1: REGULAR BATCHES LIST */}
      {!isCustom1on1 ? (
        <div className="space-y-3.5">
          {scheduleList.map((batch) => {
            const isSelected = selectedBatchId === batch.id;
            const percentFilled = Math.round(((batch.slotsTotal - batch.slotsRemaining) / batch.slotsTotal) * 100);

            return (
              <div
                key={batch.id}
                onClick={() => setSelectedBatchId(batch.id)}
                className={`p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-blue-50/70 border-blue-500 shadow-md ring-2 ring-blue-500/20"
                    : "bg-slate-50/70 hover:bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-blue-600" />
                )}

                <div className="space-y-2">
                  {/* Top Row: Name & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-xs sm:text-sm text-slate-900">
                      {batch.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-tight shrink-0 ${
                        batch.status === "Chỉ còn 2 suất"
                          ? "bg-rose-50 text-rose-700 border border-rose-200 animate-pulse"
                          : batch.status === "Sắp đầy chỗ"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {batch.status}
                    </span>
                  </div>

                  {/* Time & Start date */}
                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="flex items-center gap-1.5 font-bold text-blue-600">
                      <Clock size={13} className="shrink-0" />
                      <span>{batch.time}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <Calendar size={12} className="shrink-0 text-slate-400" />
                      <span>Khai giảng: <strong className="text-slate-800">{batch.startDate}</strong></span>
                    </p>
                  </div>

                  {/* Slots Remaining Progress Bar */}
                  <div className="space-y-1 pt-1.5 border-t border-slate-200/60">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <span>Đã đăng ký: {percentFilled}%</span>
                      <span className="text-rose-600 font-extrabold">Còn lại: {batch.slotsRemaining} / {batch.slotsTotal} chỗ</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          batch.slotsRemaining <= 2 ? "bg-rose-500" : "bg-blue-600"
                        }`}
                        style={{ width: `${percentFilled}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Button inside selected item */}
                  {isSelected && (
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectAndScroll(batch);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <span>Giữ Chỗ Ca Này</span>
                        <ArrowRight size={13} />
                      </button>
                      <a
                        href={`https://zalo.me/${CONTACT_INFO.phone}?text=${encodeURIComponent(`Chào trung tâm, mình muốn đăng ký khóa ${courseTitle} - ${batch.name}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-700 flex items-center justify-center transition-colors"
                        title="Chat Zalo giữ chỗ"
                      >
                        <MessageSquare size={14} />
                      </a>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW 2: CUSTOM 1-ON-1 SCHEDULE */
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-blue-50/70 border border-indigo-200/80 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0">
              <Laptop size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-sm text-slate-900">Kèm 1:1 Theo Khung Giờ Riêng Của Bạn</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Phù hợp cho người đi làm bận rộn, trực ca, hoặc cần ôn cấp tốc 2 - 3 ngày trước kỳ thi chính thức.
              </p>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>Tự chọn khung giờ học: Sáng, Chiều, Tối (7:00 - 23:00)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>Giảng viên kèm trực tiếp trên file dữ liệu của bạn</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>Học liên tục hoặc ngắt quãng theo lịch rảnh</span>
            </li>
          </ul>

          <a
            href={`https://zalo.me/${CONTACT_INFO.phone}?text=${encodeURIComponent(`Chào trung tâm, mình muốn đăng ký học kèm 1:1 theo giờ riêng khóa: ${courseTitle}`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Đặt Lịch Kèm 1:1 Qua Zalo</span>
            <ArrowRight size={14} />
          </a>
        </div>
      )}

      {/* Bottom Guarantee Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-xs text-slate-600">
        <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
        <span className="leading-tight">
          <strong>Cam kết 100%:</strong> Tặng phần mềm thi thử Certiport và kèm đến khi nhận chứng chỉ.
        </span>
      </div>

    </div>
  );
}
