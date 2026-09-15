import Link from "next/link";
import { Clock, Sparkles, FileSpreadsheet, Award, Laptop } from "lucide-react";
import { Course } from "@/data/mockData";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  // Format price dynamically into localized currency style or return direct string
  const formatPrice = (value: string | number) => {
    if (typeof value === "string") return value;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replace("₫", "đ");
  };

  // Standardized metadata mapping with oceanic brand system
  const getCourseMeta = (id: string) => {
    return {
      icon: <Award size={20} className="text-[#0057B8]" />,
      category: id.includes("mos") ? "Chứng Chỉ MOS Quốc Tế" : id.includes("ic3") ? "Kỹ Năng Số IC3 GS6" : "Tin Học Thực Chiến",
      badgeColor: "bg-[#E8F1FC] text-[#0057B8] border border-[#D8E4F2]",
      taglineBg: "bg-[#F4F8FD] text-[#172B4D] border border-[#D8E4F2]",
    };
  };

  const meta = getCourseMeta(course.id);

  // Map index to stagger delay class
  const delayClass = index === 0 ? "delay-0" : index === 1 ? "delay-100" : index === 2 ? "delay-200" : "delay-300";

  // Standardized SVG Checkmark
  const renderSvgCheck = () => {
    return (
      <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#E8F1FC] text-[#0057B8] border border-[#D8E4F2]">
        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  };

  // Helper to render pricing
  const renderPricing = () => {
    const priceStr = String(course.price);
    
    if (priceStr.includes("|")) {
      const priceParts = priceStr.split("|");
      return (
        <div className="flex flex-col justify-end min-h-[5.25rem] w-full gap-1 pt-3">
          <div className="space-y-1 w-full">
            {priceParts.map((part, idx) => {
              const [label, val] = part.split(":");
              return (
                <div key={idx} className="flex justify-between items-center bg-[#F4F8FD] border border-[#D8E4F2] px-2.5 py-1.5 rounded-lg transition-colors">
                  <span className="text-[10px] font-bold text-[#526581] uppercase tracking-wider">{label.trim()}</span>
                  <span className="text-xs font-bold text-[#0B2545] bg-white border border-[#D8E4F2] px-2 py-0.5 rounded-md">{val?.trim() || part.trim()}</span>
                </div>
              );
            })}
          </div>
          {course.priceNote && (
            <span className="text-[9px] font-bold text-[#0057B8] bg-[#E8F1FC] border border-[#D8E4F2] px-2 py-0.5 rounded-md w-max tracking-wide">
              {course.priceNote}
            </span>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-end min-h-[5.25rem] gap-1 pt-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base sm:text-lg font-black text-[#0B2545] tracking-tight leading-none">
            {formatPrice(course.price)}
          </span>
          {course.originalPrice && (
            <span className="text-[10px] font-bold text-[#526581] line-through">
              {formatPrice(course.originalPrice)}
            </span>
          )}
        </div>
        {course.priceNote && (
          <span className="text-[9px] font-bold text-[#0057B8] bg-[#E8F1FC] border border-[#D8E4F2] px-2 py-0.5 rounded-md w-max tracking-wide">
            {course.priceNote}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`relative flex flex-col justify-between h-full bg-white rounded-2xl border ${
        course.popular
          ? "border-[#0057B8] shadow-card ring-1 ring-[#0057B8]/20"
          : "border-[#D8E4F2] hover:border-[#0057B8]/60 shadow-xs hover:shadow-card"
      } transition-all duration-200 overflow-hidden group`}
    >
      {/* Popular badge */}
      {course.popular && (
        <div className="absolute top-0 right-0 bg-[#0057B8] text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1 z-10 shadow-xs">
          <Sparkles size={10} className="text-white" />
          NỔI BẬT
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 sm:p-6 pb-4 flex-1 flex flex-col relative z-10">
        
        {/* 1 & 2. Icon + Category Tag Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`inline-flex items-center border px-2.5 py-0.5 rounded-lg text-[9px] font-bold tracking-wider uppercase ${meta.badgeColor}`}>
            {meta.category}
          </span>
          <div className="p-2 bg-[#F4F8FD] border border-[#D8E4F2] rounded-xl shrink-0">
            {meta.icon}
          </div>
        </div>

        {/* 3. Bold Title - clickable to detail page */}
        <Link href={`/khoa-hoc/${course.id}`} className="group/title block">
          <h3 className="text-base sm:text-[17px] font-black text-[#0B2545] group-hover/title:text-[#0057B8] transition-colors duration-200 tracking-tight leading-snug min-h-[2.5rem] flex items-center">
            <span className="line-clamp-2">{course.title}</span>
          </h3>
        </Link>

        {/* 3.5 Course Tagline: Soft Highlight */}
        <div className={`mt-2 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide leading-relaxed border min-h-[3.25rem] flex items-center ${meta.taglineBg}`}>
          <span className="line-clamp-2">{course.tagline}</span>
        </div>

        {/* Duration badge */}
        <div className="inline-flex items-center gap-1 mt-2 w-max px-2 py-1 rounded-lg bg-[#F4F8FD] border border-[#D8E4F2] text-[#526581] text-[9px] font-semibold">
          <Clock size={10} className="text-[#0057B8]" />
          {course.duration}
        </div>

        {/* 4. Short Description */}
        <p className="text-[#526581] text-xs leading-relaxed mt-2.5 min-h-[3.75rem] flex items-start font-normal">
          <span className="line-clamp-3">{course.description}</span>
        </p>

        {/* Divider */}
        <div className="my-3.5 border-t border-[#D8E4F2]" />

        {/* 5. Feature Checklist */}
        <ul className="space-y-2 mb-2 min-h-[8.5rem] flex flex-col justify-start">
          {course.features.slice(0, 5).map((feature, idx) => (
            <li key={idx} className="flex gap-2.5 text-[#172B4D] font-medium text-xs leading-normal">
              {renderSvgCheck()}
              <span className="flex-1 line-clamp-2">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 6 & 7. Card Footer (Price + 2 Action Buttons) */}
      <div className="p-5 sm:p-6 pt-0 bg-white border-t border-[#D8E4F2] rounded-b-2xl relative z-10">
        <div className="flex flex-col gap-3">
          
          {/* Price display helper */}
          {renderPricing()}

          {/* Action Links: Chi tiết & Đăng ký */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/khoa-hoc/${course.id}`}
              className="w-full min-h-11 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-colors text-center bg-white hover:bg-[#E8F1FC] text-[#0057B8] border border-[#D8E4F2] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#0057B8]"
            >
              Chi tiết
            </Link>
            <Link
              href={`/lien-he?select=${course.id}`}
              className="w-full min-h-11 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-colors text-center bg-[#0057B8] hover:bg-[#003F88] active:bg-[#00336F] text-white shadow-xs flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#0057B8]"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
