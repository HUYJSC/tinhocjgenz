"use client";

import Link from "next/link";
import { Calendar, Clock, Users, ArrowRight, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import { upcomingBatchesData } from "@/data/mockData";

export default function ScheduleSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-[11px] uppercase tracking-wider">
            <Calendar size={13} className="text-emerald-600" />
            <span>Lịch Khai Giảng & Lịch Thi Certiport Hàng Tháng</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Lịch Học Gần Nhất & <span className="text-blue-600">Đợt Thi Cấp Chứng Chỉ</span>
          </h2>
          
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
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
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-500/30 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between gap-6 relative group"
              >
                {/* Top Badge & Type */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-blue-50 text-blue-700 border border-blue-100">
                    Phân hệ: {batch.courseType}
                  </span>
                  
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                      isUrgent
                        ? "bg-rose-50 text-rose-600 border border-rose-200 animate-pulse"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {isUrgent && <ShieldAlert size={13} />}
                    {batch.status} ({batch.slotsRemaining} slot)
                  </span>
                </div>

                {/* Course Name & Time */}
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {batch.courseName}
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={15} className="text-blue-600 shrink-0" />
                      <span><strong>Thời gian:</strong> {batch.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-cyan-600 shrink-0" />
                      <span><strong>Thời lượng:</strong> {batch.scheduleTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={15} className="text-indigo-600 shrink-0" />
                      <span><strong>Hình thức:</strong> {batch.mode}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 size={14} />
                    <span>Cam kết bao đỗ 100%</span>
                  </div>

                  <Link
                    href="/lien-he"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide bg-slate-900 hover:bg-blue-600 text-white transition-all duration-300"
                  >
                    Giữ Chỗ Ngay
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Schedule Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-extrabold text-blue-950">
              Bạn cần lịch thi hoặc kèm riêng 1:1 gấp trong tuần này để nộp hồ sơ tốt nghiệp?
            </h4>
            <p className="text-xs text-blue-700">
              PH Digital Education sắp xếp giảng viên hỗ trợ kèm cấp tốc 24/7 theo thời gian biểu của bạn.
            </p>
          </div>
          <Link
            href="/lien-he"
            className="shrink-0 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Đăng Ký Kèm Riêng 1:1
          </Link>
        </div>

      </div>
    </section>
  );
}
