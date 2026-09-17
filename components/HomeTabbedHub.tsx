"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Award, Trophy, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import LearningPathway from "./LearningPathway";
import CourseCard from "./CourseCard";
import HallOfFame from "./HallOfFame";
import GuaranteePolicy from "./GuaranteePolicy";
import { coursesData } from "@/data/mockData";

export default function HomeTabbedHub() {
  const [activeTab, setActiveTab] = useState<"pathway" | "courses" | "halloffame" | "guarantee">("pathway");

  const featuredCourses = coursesData.filter((c) =>
    ["mos-master-combo", "mos-2019", "ic3-gs6"].includes(c.id)
  );

  const tabs = [
    {
      id: "pathway",
      label: "Lộ Trình Đào Tạo",
      sub: "Học sinh, Sinh viên, Đi làm",
      icon: <Users size={16} />,
    },
    {
      id: "courses",
      label: "Khóa Học Trọng Tâm",
      sub: "Combo MOS, IC3 GS6, AI",
      icon: <Award size={16} />,
    },
    {
      id: "halloffame",
      label: "Bảng Vàng Điểm Cao",
      sub: "Chứng chỉ 980 - 1000đ",
      icon: <Trophy size={16} />,
    },
    {
      id: "guarantee",
      label: "Cam Kết Bao Đỗ 100%",
      sub: "Học lại 0đ nếu chưa đạt",
      icon: <ShieldCheck size={16} />,
    }
  ];

  return (
    <section className="py-10 sm:py-14 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Interactive Tab Selector Bar (Clean EdTech Light Surface) */}
        <div className="bg-[#F4F8FD] p-1.5 sm:p-2 rounded-2xl border border-[#E5EEF8] max-w-3xl mx-auto mb-8 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as "pathway" | "courses" | "halloffame" | "guarantee")}
                  aria-pressed={isActive}
                  className={`min-h-14 py-2 px-3 rounded-xl text-center transition-all flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-white text-[#0057B8] shadow-sm border border-[#E5EEF8]"
                      : "text-slate-600 hover:text-[#0B2545] hover:bg-white/60"
                  }`}
                >
                  <span className={isActive ? "text-[#0057B8]" : "text-slate-500"}>
                    {tab.icon}
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-bold tracking-tight leading-tight">{tab.label}</div>
                    <div className="text-[11px] text-slate-400 font-normal hidden sm:block leading-none mt-0.5">{tab.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display Area */}
        <div className="transition-all duration-500">
          
          {/* TAB 1: UNIVERSAL LEARNING PATHWAY */}
          {activeTab === "pathway" && (
            <div className="animate-fade-in space-y-6">
              <LearningPathway />
            </div>
          )}

          {/* TAB 2: FEATURED COURSES (TOP 3) */}
          {activeTab === "courses" && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0057B8] font-bold text-xs uppercase tracking-wider border border-blue-100">
                  <Sparkles size={12} className="text-[#0057B8]" />
                  LỘ TRÌNH TINH GỌN 3 - 9 BUỔI
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2545]">
                  3 Khóa Học MOS & IC3 Phổ Biến Nhất
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                {featuredCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </div>

              <div className="text-center pt-2">
                <Link
                  href="/khoa-hoc"
                  className="min-h-11 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-colors group"
                >
                  <span>Xem Toàn Bộ 6+ Khóa Học & Bảng Giá Chi Tiết</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 3: HALL OF FAME */}
          {activeTab === "halloffame" && (
            <div className="animate-fade-in">
              <HallOfFame />
            </div>
          )}

          {/* TAB 4: GUARANTEE POLICY */}
          {activeTab === "guarantee" && (
            <div className="animate-fade-in">
              <GuaranteePolicy />
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
