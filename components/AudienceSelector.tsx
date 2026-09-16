"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Briefcase, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { coursesData } from "@/data/mockData";
import PriceBlock from "@/components/PriceBlock";

type AudienceType = "student" | "worker" | "beginner";

interface AudienceOption {
  id: AudienceType;
  label: string;
  sublabel: string;
  icon: typeof GraduationCap;
  courseIds: string[];
}

export default function AudienceSelector() {
  const [selectedAudience, setSelectedAudience] = useState<AudienceType>("student");

  const options: AudienceOption[] = [
    {
      id: "student",
      label: "Sinh viên Đại học / Cao đẳng",
      sublabel: "Cần chứng chỉ MOS / IC3 xét chuẩn đầu ra tốt nghiệp",
      icon: GraduationCap,
      courseIds: ["mos-master-combo", "ic3-gs6"],
    },
    {
      id: "worker",
      label: "Người đi làm văn phòng",
      sublabel: "Cần thành thạo Excel, báo cáo số liệu và tự động hóa tác vụ",
      icon: Briefcase,
      courseIds: ["excel-master", "word-advanced"],
    },
    {
      id: "beginner",
      label: "Người mới bắt đầu",
      sublabel: "Mất gốc tin học, cần rèn luyện thao tác máy tính từ căn bản",
      icon: Sparkles,
      courseIds: ["cntt-co-ban", "mos-2019"],
    },
  ];

  const currentOption = options.find((opt) => opt.id === selectedAudience) || options[0];
  const suggestedCourses = coursesData.filter((c) => currentOption.courseIds.includes(c.id));

  return (
    <div className="space-y-8 text-[#0057B8]">
      {/* 1. Selector Buttons: Single audience selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = selectedAudience === option.id;
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedAudience(option.id)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-colors cursor-pointer ${
                isSelected
                  ? "bg-[#0057B8] text-white border-[#0057B8]"
                  : "bg-white text-[#0057B8] border-[#0057B8] hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-lg border ${
                    isSelected
                      ? "border-white bg-[#0057B8] text-white"
                      : "border-[#0057B8] bg-white text-[#0057B8]"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <span className="font-black text-sm sm:text-base">
                  {option.label}
                </span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isSelected ? "text-white opacity-90" : "text-[#0057B8] opacity-80"
                }`}
              >
                {option.sublabel}
              </p>
            </button>
          );
        })}
      </div>

      {/* 2. Suggested Courses Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-[#0057B8]">
            Lộ trình gợi ý cho: <span className="underline">{currentOption.label}</span>
          </h3>
          <Link
            href="/khoa-hoc"
            className="text-xs font-bold text-[#0057B8] hover:underline flex items-center gap-1"
          >
            <span>Xem tất cả khóa</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestedCourses.map((course) => (
            <div
              key={course.id}
              className="p-6 rounded-2xl bg-white border border-[#0057B8] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider border border-[#0057B8] px-2 py-0.5 rounded-md inline-block">
                  {course.duration}
                </span>
                <h4 className="text-base font-black text-[#0057B8]">
                  {course.title}
                </h4>
                <p className="text-xs text-[#0057B8] leading-relaxed line-clamp-2">
                  {course.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#0057B8] flex items-end justify-between gap-4">
                <PriceBlock
                  price={course.price}
                  originalPrice={course.originalPrice}
                  priceNote={course.priceNote}
                  size="sm"
                />

                <Link
                  href={`/khoa-hoc/${course.id}`}
                  className="px-4 py-2 rounded-xl bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>Chi tiết</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate training link */}
      <div className="p-4 rounded-xl border border-[#0057B8] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-[#0057B8]">
          Bạn là đại diện Doanh nghiệp cần đào tạo tin học hoặc nâng cao năng lực số cho nhân sự?
        </span>
        <Link
          href="/lien-he?type=doanh-nghiep"
          className="font-bold underline text-[#0057B8] shrink-0"
        >
          Liên hệ lộ trình đào tạo Doanh nghiệp &rarr;
        </Link>
      </div>
    </div>
  );
}

