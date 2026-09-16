import Link from "next/link";
import { Clock, Award, ArrowRight } from "lucide-react";
import { Course } from "@/data/mockData";
import PriceBlock from "@/components/PriceBlock";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Category mapping
  const categoryLabel = course.id.includes("mos")
    ? "Chứng Chỉ MOS Quốc Tế"
    : course.id.includes("ic3")
    ? "Kỹ Năng Số IC3 GS6"
    : "Tin Học Thực Chiến";

  return (
    <div
      className={`relative flex flex-col justify-between h-full bg-white rounded-2xl border ${
        course.popular
          ? "border-2 border-[#0057B8]"
          : "border border-[#0057B8]"
      } transition-colors overflow-hidden group`}
    >
      {/* Popular badge */}
      {course.popular && (
        <div className="absolute top-0 right-0 bg-[#0057B8] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10">
          NỔI BẬT
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 sm:p-6 pb-4 flex-1 flex flex-col relative z-10 text-[#0057B8]">
        
        {/* 1. Category Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center border border-[#0057B8] px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-white text-[#0057B8]">
            {categoryLabel}
          </span>
          <div className="p-1.5 border border-[#0057B8] rounded-md shrink-0">
            <Award size={16} className="text-[#0057B8]" />
          </div>
        </div>

        {/* 2. Bold Title */}
        <Link href={`/khoa-hoc/${course.id}`} className="block group/title">
          <h3 className="text-base sm:text-[17px] font-black text-[#0057B8] hover:underline transition-colors tracking-tight leading-snug min-h-[2.5rem] flex items-center">
            <span className="line-clamp-2">{course.title}</span>
          </h3>
        </Link>

        {/* 3. Course Tagline: Outcome statement */}
        <div className="mt-2 px-3 py-2 rounded-lg text-xs font-semibold leading-relaxed border border-[#0057B8] min-h-[3rem] flex items-center bg-white text-[#0057B8]">
          <span className="line-clamp-2">{course.tagline}</span>
        </div>

        {/* 4. Duration Badge */}
        <div className="inline-flex items-center gap-1.5 mt-2 w-max px-2.5 py-1 rounded-md border border-[#0057B8] text-[#0057B8] text-[10px] font-semibold">
          <Clock size={12} className="text-[#0057B8]" />
          <span>{course.duration}</span>
        </div>

        {/* 5. Max 2 Key Features Bullets (IA-01) */}
        <ul className="space-y-1.5 my-3 pt-3 border-t border-[#0057B8] flex-1">
          {course.features.slice(0, 2).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[#0057B8] font-medium text-xs leading-normal">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-1.5 shrink-0" />
              <span className="line-clamp-2">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 6. Card Footer: Price + Single Primary CTA (IA-01) */}
      <div className="p-5 sm:p-6 pt-0 bg-white border-t border-[#0057B8] rounded-b-2xl relative z-10">
        <div className="flex flex-col gap-3 pt-3">
          <PriceBlock
            price={course.price}
            originalPrice={course.originalPrice}
            priceNote={course.priceNote}
            size="sm"
          />

          <Link
            href={`/khoa-hoc/${course.id}`}
            className="w-full min-h-11 py-2.5 rounded-xl text-xs font-black tracking-wide uppercase transition-colors text-center bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Xem Chi Tiết</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
