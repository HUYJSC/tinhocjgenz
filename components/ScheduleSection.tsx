"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Users, ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { upcomingBatchesData } from "@/data/mockData";

export default function ScheduleSection() {
  const router = useRouter();
  return (
    <section className="py-20 sm:py-24 bg-[#F4F8FD] border-b border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="section-badge mx-auto">
            <Calendar size={13} className="text-[#0057B8]" />
            <span>Lịch Khai Giảng & Lịch Thi Certiport Hàng Tháng</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2545] tracking-tight leading-tight">
            Lịch Học Gần Nhất & <span className="text-[#0057B8]">Đợt Thi Cấp Chứng Chỉ</span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Các lớp học được tổ chức liên tục theo hình thức Online tương tác trực tiếp hoặc Kèm 1:1 cấp tốc. Số lượng học viên mỗi lớp giới hạn để đảm bảo chất lượng bao đỗ cao nhất.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingBatchesData.map((batch) => {
            const isUrgent = batch.status === "Chỉ còn 2 suất";
            return (
              <div
                key={batch.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] hover:border-[#0057B8]/40 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between gap-6 relative group"
              >
                {/* Top Badge & Type */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#F4F8FD] text-[#0057B8] border border-[#E2E8F0]">
                    Phân hệ: {batch.courseType}
                  </span>
                  
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                      isUrgent
                        ? "bg-[#F4F8FD] text-[#0057B8] border border-[#0057B8]/30"
                        : "bg-[#F4F8FD] text-[#0057B8] border border-[#E2E8F0]"
                    }`}
                  >
                    {isUrgent && <ShieldAlert size={13} />}
                    {batch.status} ({batch.slotsRemaining} slot)
                  </span>
                </div>

                {/* Course Name & Time */}
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B2545] group-hover:text-[#0057B8] transition-colors leading-snug">
                    {batch.courseName}
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={15} className="text-[#0057B8] shrink-0" />
                      <span><strong>Thời gian:</strong> {batch.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-[#0057B8] shrink-0" />
                      <span><strong>Thời lượng:</strong> {batch.scheduleTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={15} className="text-[#0057B8] shrink-0" />
                      <span><strong>Hình thức:</strong> {batch.mode}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0057B8]">
                    <CheckCircle2 size={14} />
                    <span>Cam kết bao đỗ 100%</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const formElement = document.getElementById("dang-ky-tu-van");
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: "smooth" });
                        const noteInput = document.querySelector(
                          'textarea[name="message"], textarea[name="note"]'
                        ) as HTMLTextAreaElement | null;
                        if (noteInput) {
                          noteInput.value = `Đăng ký giữ chỗ: ${batch.courseName} - Khai giảng ${batch.startDate} (${batch.scheduleTime})`;
                          noteInput.dispatchEvent(new Event("input", { bubbles: true }));
                        }
                      } else {
                        router.push(`/lien-he?select=${encodeURIComponent(batch.courseName)}`);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide bg-[#0057B8] hover:bg-[#003F88] text-white transition-all duration-300 shadow-sm cursor-pointer active:scale-[0.99]"
                  >
                    <span>Giữ Chỗ Ca Này</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Schedule Notice */}
        <div className="mt-12 bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-extrabold text-[#0B2545]">
              Bạn cần lịch thi hoặc kèm riêng 1:1 gấp trong tuần này để nộp hồ sơ tốt nghiệp?
            </h4>
            <p className="text-xs text-slate-600">
              Tin Học Gen Z sắp xếp giảng viên hỗ trợ kèm cấp tốc 24/7 theo thời gian biểu của bạn.
            </p>
          </div>
          <Link
            href="/lien-he"
            className="shrink-0 px-6 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            Đăng Ký Kèm Riêng 1:1
          </Link>
        </div>

      </div>
    </section>
  );
}
