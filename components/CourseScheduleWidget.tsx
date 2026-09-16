"use client";

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Laptop, 
  ShieldCheck,
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
      status: "Đang mở đăng ký",
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
      startDate: "Thứ 7 & Chủ Nhật hàng tuần",
      status: "Đang mở đăng ký",
      slotsTotal: 8,
      slotsRemaining: 3,
      mode: "Online qua Zoom/Google Meet + Kèm 1:1"
    }
  ];

  const scheduleList = batches && batches.length > 0 ? batches : defaultBatches;
  const [selectedBatchId, setSelectedBatchId] = useState<string>(scheduleList[0]?.id || "b-1");
  const [isCustom1on1, setIsCustom1on1] = useState<boolean>(false);

  const handleSelectAndScroll = (batch: BatchItem) => {
    setSelectedBatchId(batch.id);
    const formElement = document.getElementById("dang-ky");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      const noteInput = document.querySelector('textarea[name="note"], input[name="note"]') as HTMLInputElement | HTMLTextAreaElement;
      if (noteInput) {
        noteInput.value = `Yêu cầu tư vấn: ${courseTitle} - ${batch.name} (${batch.time})`;
      }
    }
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#0057B8] space-y-6">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-[#0057B8] pb-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 border border-[#0057B8] px-2.5 py-0.5 rounded-md bg-white text-[#0057B8] text-[10px] font-black uppercase tracking-wider">
            <Calendar size={12} className="text-[#0057B8]" />
            LỊCH KHAI GIẢNG DỰ KIẾN
          </span>
          <h3 className="text-base sm:text-lg font-black text-[#0057B8] font-display">
            Chọn Lịch Học Phù Hợp
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0057B8] border border-[#0057B8] px-2.5 py-1 rounded-md">
          <CheckCircle2 size={12} className="text-[#0057B8]" />
          <span>Đang nhận đăng ký</span>
        </span>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center p-1 bg-white rounded-lg border border-[#0057B8] gap-1">
        <button
          type="button"
          onClick={() => setIsCustom1on1(false)}
          className={`flex-1 py-2 px-3 rounded-md text-xs font-black transition-all cursor-pointer ${
            !isCustom1on1
              ? "bg-[#0057B8] text-white"
              : "bg-white text-[#0057B8] hover:underline"
          }`}
        >
          <span>Lớp Theo Ca Cố Định</span>
        </button>
        <button
          type="button"
          onClick={() => setIsCustom1on1(true)}
          className={`flex-1 py-2 px-3 rounded-md text-xs font-black transition-all cursor-pointer ${
            isCustom1on1
              ? "bg-[#0057B8] text-white"
              : "bg-white text-[#0057B8] hover:underline"
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

            return (
              <div
                key={batch.id}
                onClick={() => setSelectedBatchId(batch.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-white border-2 border-[#0057B8]"
                    : "bg-white border border-[#0057B8] hover:bg-white"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#0057B8]" />
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-xs sm:text-sm text-[#0057B8]">
                      {batch.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold border border-[#0057B8] text-[#0057B8]">
                      {batch.status}
                    </span>
                  </div>

                  <div className="text-xs text-[#0057B8] space-y-1">
                    <p className="flex items-center gap-1.5 font-bold">
                      <Clock size={13} className="shrink-0 text-[#0057B8]" />
                      <span>{batch.time}</span>
                    </p>
                    <p className="text-[11px] flex items-center gap-1.5">
                      <Calendar size={12} className="shrink-0 text-[#0057B8]" />
                      <span>Khai giảng: <strong>{batch.startDate}</strong></span>
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAndScroll(batch);
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Yêu Cầu Tư Vấn Lớp Này</span>
                      <ArrowRight size={13} />
                    </button>
                    <a
                      href={`https://zalo.me/${CONTACT_INFO.phone}?text=${encodeURIComponent(`Chào trung tâm, mình muốn tư vấn khóa ${courseTitle} - ${batch.name}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white border border-[#0057B8] text-[#0057B8] hover:bg-[#0057B8] hover:text-white flex items-center justify-center transition-colors"
                      title="Chat Zalo tư vấn"
                    >
                      <MessageSquare size={14} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW 2: CUSTOM 1-ON-1 SCHEDULE */
        <div className="p-5 rounded-xl border border-[#0057B8] bg-white space-y-4 text-[#0057B8]">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white border border-[#0057B8] text-[#0057B8] shrink-0">
              <Laptop size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-sm text-[#0057B8]">Kèm 1:1 Theo Khung Giờ Riêng Của Bạn</h4>
              <p className="text-xs leading-relaxed text-[#0057B8]">
                Linh hoạt thời gian theo lịch cá nhân của học viên, phù hợp người bận rộn hoặc cần ôn thi cấp tốc.
              </p>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs font-medium text-[#0057B8]">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#0057B8] shrink-0" />
              <span>Tự chọn khung giờ học: Sáng, Chiều, Tối (7:00 - 23:00)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#0057B8] shrink-0" />
              <span>Giảng viên kèm trực tiếp trên bài tập thực tế</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#0057B8] shrink-0" />
              <span>Học tập liên tục hoặc linh hoạt theo lịch rảnh</span>
            </li>
          </ul>

          <a
            href={`https://zalo.me/${CONTACT_INFO.phone}?text=${encodeURIComponent(`Chào trung tâm, mình muốn đăng ký học kèm 1:1 theo giờ riêng khóa: ${courseTitle}`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 rounded-lg bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors inline-block text-center"
          >
            <span>Yêu Cầu Tư Vấn Kèm 1:1 Qua Zalo</span>
            <ArrowRight size={14} className="inline-block" />
          </a>
        </div>
      )}

      {/* Bottom Guarantee Banner */}
      <div className="p-3.5 rounded-xl border border-[#0057B8] bg-white flex items-center gap-3 text-xs text-[#0057B8]">
        <ShieldCheck size={18} className="text-[#0057B8] shrink-0" />
        <span className="leading-tight">
          <strong>Chính sách đào tạo:</strong> Hỗ trợ tài khoản phần mềm luyện thi và giải đáp thắc mắc đến khi đạt chứng chỉ.
        </span>
      </div>

    </div>
  );
}
