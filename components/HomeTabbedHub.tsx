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
    <section className="py-10 sm:py-14 bg-gradient-to-b from-white via-slate-50/50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Interactive Tab Selector Bar (Sticky-friendly, Anti-Long-Scroll) */}
        <div className="bg-slate-900 text-white p-1.5 sm:p-2.5 rounded-2xl sm:rounded-full shadow-xl border border-slate-800 max-w-3xl mx-auto mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2.5 px-3 rounded-xl sm:rounded-full text-center transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md scale-[1.02]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-slate-400"}>
                    {tab.icon}
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-black tracking-tight leading-tight">{tab.label}</div>
                    <div className="text-[10px] text-slate-300 font-normal hidden sm:block leading-none mt-0.5">{tab.sub}</div>
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-[10px] uppercase tracking-wider">
                  <Sparkles size={12} className="text-blue-600" />
                  LỘ TRÌNH TINH GỌN 3 - 9 BUỔI
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all group"
                >
                  <span>Xem Toàn Bộ 6+ Khóa Học & Bảng Giá Chi Tiết</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
