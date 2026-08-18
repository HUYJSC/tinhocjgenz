import Link from "next/link";
import { Check, Clock, Sparkles, FileSpreadsheet, FileText, Award, Laptop } from "lucide-react";
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

  // Map icons, tagline backgrounds, and category tags dynamically based on course ID
  const getCourseMeta = (id: string) => {
    switch (id) {
      case "mos-2019":
        return {
          icon: <Award size={20} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />,
          category: "Chứng Chỉ Quốc Tế",
          badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-100/50",
          taglineBg: "bg-indigo-50/70 text-indigo-800 border border-indigo-100/50 shadow-xs shadow-indigo-100/10",
          accentColor: "indigo"
        };
      case "combo-survival-office":
        return {
          icon: <Laptop size={20} className="text-blue-600 group-hover:text-white transition-colors duration-300" />,
          category: "Thực Chiến Công Sở",
          badgeColor: "bg-blue-50 text-blue-700 border-blue-100/50",
          taglineBg: "bg-blue-50/70 text-blue-800 border border-blue-100/50 shadow-xs shadow-blue-100/10",
          accentColor: "blue"
        };
      case "ai-office-breakthrough":
        return {
          icon: <Sparkles size={20} className="text-rose-600 group-hover:text-white transition-colors duration-300" />,
          category: "Kỹ Năng Tương Lai",
          badgeColor: "bg-rose-50 text-rose-700 border-rose-100/50",
          taglineBg: "bg-rose-50/70 text-rose-800 border border-rose-100/50 shadow-xs shadow-rose-100/10",
          accentColor: "rose"
        };
      case "excel-custom-accounting":
        return {
          icon: <FileSpreadsheet size={20} className="text-emerald-600 group-hover:text-white transition-colors duration-300" />,
          category: "Giải Pháp Doanh Nghiệp",
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100/50",
          taglineBg: "bg-emerald-50/70 text-emerald-800 border border-emerald-100/50 shadow-xs shadow-emerald-100/10",
          accentColor: "emerald"
        };
      case "cntt-national-app":
        return {
          icon: <Award size={20} className="text-amber-600 group-hover:text-white transition-colors duration-300" />,
          category: "Chứng Chỉ Quốc Gia",
          badgeColor: "bg-amber-50 text-amber-700 border-amber-100/50",
          taglineBg: "bg-amber-50/70 text-amber-800 border border-amber-100/50 shadow-xs shadow-amber-100/10",
          accentColor: "amber"
        };
      default:
        return {
          icon: <Laptop size={20} className="text-blue-600 group-hover:text-white transition-colors duration-300" />,
          category: "Khóa Học Tin Học",
          badgeColor: "bg-blue-50 text-blue-700 border-blue-100/50",
          taglineBg: "bg-blue-50/70 text-blue-800 border border-blue-100/50",
          accentColor: "blue"
        };
    }
  };

  const meta = getCourseMeta(course.id);

  // Map index to stagger delay class
  const delayClass = index === 0 ? "delay-0" : index === 1 ? "delay-100" : index === 2 ? "delay-200" : "delay-300";

  // Dynamic SVG Checkmark rendering based on theme accent color
  const renderSvgCheck = () => {
    const accentMap: Record<string, string> = {
      indigo: "bg-indigo-50 text-indigo-600 border border-indigo-100/60 group-hover:bg-indigo-100 group-hover:text-indigo-700",
      blue: "bg-blue-50 text-blue-600 border border-blue-100/60 group-hover:bg-blue-100 group-hover:text-blue-700",
      rose: "bg-rose-50 text-rose-600 border border-rose-100/60 group-hover:bg-rose-100 group-hover:text-rose-700",
      emerald: "bg-emerald-50 text-emerald-600 border border-emerald-100/60 group-hover:bg-emerald-100 group-hover:text-emerald-700",
      amber: "bg-amber-50 text-amber-600 border border-amber-100/60 group-hover:bg-amber-100 group-hover:text-amber-700",
      teal: "bg-teal-50 text-teal-600 border border-teal-100/60 group-hover:bg-teal-100 group-hover:text-teal-700",
    };

    const styleClass = accentMap[meta.accentColor] || accentMap.blue;

    return (
      <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ease-out group-hover:scale-110 ${styleClass}`}>
        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  };

  // Helper to render pricing elegantly (handling splits for different configurations)
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
                <div key={idx} className="flex justify-between items-center bg-white border border-slate-100/80 px-2.5 py-1.5 rounded-xl transition-all duration-300">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{label.trim()}</span>
                  <span className="text-xs font-black text-slate-900 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">{val?.trim() || part.trim()}</span>
                </div>
              );
            })}
          </div>
          {course.priceNote && (
            <span className="text-[9px] font-black text-blue-600 bg-blue-50/70 border border-blue-100/60 px-2 py-0.5 rounded-md w-max tracking-wide">
              🔥 {course.priceNote}
            </span>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-end min-h-[5.25rem] gap-1 pt-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
            {formatPrice(course.price)}
          </span>
          {course.originalPrice && (
            <span className="text-[10px] font-bold text-slate-400 line-through">
              {formatPrice(course.originalPrice)}
            </span>
          )}
        </div>
        {course.priceNote && (
          <span className="text-[9px] font-black text-blue-600 bg-blue-50/70 border border-blue-100/60 px-2 py-0.5 rounded-md w-max tracking-wide">
            🔥 {course.priceNote}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`relative flex flex-col justify-between h-full bg-white rounded-[2.25rem] transition-all duration-500 animate-slide-up ${delayClass} ${
        course.popular
          ? "border-2 border-transparent border-gradient-featured shadow-featured shadow-premium hover:shadow-featured-hover hover:scale-[1.04] md:scale-[1.03] pulse-glow-blue z-10"
          : "border border-slate-200/80 hover:border-blue-500/30 hover:scale-[1.02] shadow-premium hover:shadow-premium-hover"
      } overflow-hidden group`}
    >
      {/* Dynamic Background Hover Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-cyan-500/0 to-cyan-500/[0.02] pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Popular badge flag with soft subtle pulsing glow */}
      {course.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[9px] font-black px-4 py-2 rounded-bl-3xl flex items-center gap-1 z-10 shadow-md">
          <Sparkles size={10} className="animate-pulse text-cyan-300" />
          HOT COURSE
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 sm:p-6 pb-4 flex-1 flex flex-col relative z-10">
        
        {/* 1 & 2. Icon + Category Tag Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`inline-flex items-center border px-2.5 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase ${meta.badgeColor}`}>
            {meta.category}
          </span>
          <div className={`p-2 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-${meta.accentColor}-600 group-hover:text-white transition-all duration-500 shrink-0`}>
            {meta.icon}
          </div>
        </div>

        {/* 3. Bold Title - strictly aligned to 2 lines max height */}
        <h3 className="text-base sm:text-[17px] font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-300 tracking-tight leading-snug min-h-[2.5rem] flex items-center">
          <span className="line-clamp-2">{course.title}</span>
        </h3>

        {/* 3.5 Course Tagline: Soft Pastel Highlight - strictly aligned to 2 lines */}
        <div className={`mt-2 px-3 py-2 rounded-xl text-[11px] font-black tracking-wide leading-relaxed border min-h-[3.25rem] flex items-center ${meta.taglineBg}`}>
          <span className="line-clamp-2">{course.tagline}</span>
        </div>

        {/* Duration badge: subtle scale on card hover */}
        <div className="inline-flex items-center gap-1 mt-2 w-max px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 text-[9px] font-bold">
          <Clock size={10} className="text-blue-500" />
          {course.duration}
        </div>

        {/* 4. Short Description - strictly aligned to 3 lines */}
        <p className="text-slate-500 text-xs leading-relaxed mt-2.5 min-h-[3.75rem] flex items-start font-semibold">
          <span className="line-clamp-3">{course.description}</span>
        </p>

        {/* Divider */}
        <div className="my-3.5 border-t border-slate-100" />

        {/* 5. Feature Checklist - locked to 9rem max height to guarantee equal size */}
        <ul className="space-y-2 mb-2 min-h-[8.5rem] flex flex-col justify-start">
          {course.features.slice(0, 5).map((feature, idx) => (
            <li key={idx} className="flex gap-2.5 text-slate-600 font-semibold text-[11px] sm:text-xs leading-normal">
              {renderSvgCheck()}
              <span className="flex-1 line-clamp-2">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 6 & 7. Card Footer (Price + CTA Button) */}
      <div className="p-5 sm:p-6 pt-0 bg-slate-50/50 border-t border-slate-100/60 rounded-b-[2.25rem] relative z-10">
        <div className="flex flex-col gap-3">
          
          {/* Price display helper */}
          {renderPricing()}

          {/* Action Register Link */}
          <Link
            href={`/lien-he?select=${course.id}`}
            className={`w-full py-3 rounded-full text-xs font-black tracking-wide uppercase transition-all duration-300 text-center active:scale-[0.98] ${
              course.popular
                ? "btn-premium-primary"
                : "btn-premium-secondary"
            }`}
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
