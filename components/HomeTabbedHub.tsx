"use client";

import { useState } from "react";
import Link from "next/link";
import { School, Award, Trophy, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import UniversityPathway from "./UniversityPathway";
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
      label: "Chuẩn Đầu Ra ĐH",
      sub: "DNTU, LHU, UEH...",
      icon: <School size={16} />,
      color: "blue"
    },
    {
      id: "courses",
      label: "Khóa Học Trọng Tâm",
      sub: "Combo MOS, IC3 GS6",
      icon: <Award size={16} />,
      color: "cyan"
    },
    {
      id: "halloffame",
      label: "Bảng Vàng Điểm Cao",
      sub: "Chứng chỉ 980 - 1000đ",
      icon: <Trophy size={16} />,
      color: "amber"
    },
    {
      id: "guarantee",
      label: "Cam Kết Bao Đỗ 100%",
      sub: "Học lại 0đ nếu rớt",
      icon: <ShieldCheck size={16} />,
      color: "emerald"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Interactive Tab Selector Bar (Sticky-friendly, Anti-Long-Scroll) */}
        <div className="bg-slate-900 text-white p-2 sm:p-3 rounded-3xl sm:rounded-full shadow-2xl border border-slate-800 max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-3 sm:px-4 rounded-2xl sm:rounded-full text-center transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-[1.02]"
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
          
          {/* TAB 1: UNIVERSITY EXIT PATHWAY */}
          {activeTab === "pathway" && (
            <div className="animate-fade-in space-y-6">
              <UniversityPathway />
            </div>
          )}

          {/* TAB 2: FEATURED COURSES (TOP 3) */}
          {activeTab === "courses" && (
            <div className="animate-fade-in space-y-10">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-[10px] uppercase tracking-wider">
                  <Sparkles size={12} className="text-cyan-500" />
                  LỘ TRÌNH TINH GỌN 3 - 9 BUỔI
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  3 Khóa Học MOS & IC3 Phổ Biến Nhất
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {featuredCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/khoa-hoc"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all group"
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
