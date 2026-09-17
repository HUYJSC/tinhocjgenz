import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import type { Course } from "@/data/mockData";

interface CourseCardProps {
  course: Course;
  index?: number;
}

function formatPrice(value: string | number) {
  if (typeof value === "string") return value;
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(value)
    .replace("₫", "đ");
}

function Price({ course }: { course: Course }) {
  const price = String(course.price);

  if (price.includes("|")) {
    return (
      <div className="space-y-2">
        {price.split("|").map((part) => {
          const [label, value] = part.split(":");
          return (
            <div key={part} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
              <span className="text-slate-500">{label?.trim()}</span>
              <strong className="text-right font-semibold text-slate-900">{value?.trim() || part.trim()}</strong>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <strong className="text-lg font-bold text-slate-950">{formatPrice(course.price)}</strong>
      {course.originalPrice && <span className="text-sm text-slate-400 line-through">{formatPrice(course.originalPrice)}</span>}
    </div>
  );
}

export default function CourseCard({ course }: CourseCardProps) {
  const category = course.categoryName || course.badge || "Khóa học Tin Học Gen Z";

  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(0,87,184,0.1)] ${course.popular ? "border-[#0057B8]/40 ring-1 ring-[#0057B8]/20" : "border-[#E5EEF8]"}`}>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex rounded-md bg-[#F4F8FD] border border-[#E5EEF8] px-2.5 py-1 text-xs font-semibold text-[#0057B8]">{category}</span>
          {course.popular && <span className="rounded-md bg-[#0057B8] px-2.5 py-1 text-xs font-semibold text-white shadow-xs">Khuyên dùng</span>}
        </div>

        <Link href={`/khoa-hoc/${course.id}`} className="mt-4 block">
          <h3 className="line-clamp-2 text-lg font-bold leading-6 text-[#0B2545] transition-colors hover:text-[#0057B8]">{course.title}</h3>
        </Link>

        <p className="mt-2.5 line-clamp-2 text-sm font-medium leading-6 text-[#003F88]">{course.tagline}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
            <Clock size={14} className="text-[#0057B8]" aria-hidden="true" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1 text-[#0057B8] bg-[#F4F8FD] border border-[#E5EEF8] px-2 py-0.5 rounded font-medium">
            Zoom tương tác + Kèm 1:1
          </span>
        </div>

        {course.targetAudience && (
          <p className="mt-3 text-xs text-slate-500 line-clamp-1">
            <span className="font-semibold text-slate-700">Phù hợp: </span>
            {course.targetAudience}
          </p>
        )}

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{course.description}</p>

        <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
          {course.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2 text-xs leading-5 text-slate-600">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F4F8FD] text-[#0057B8]">
                <Check size={11} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="line-clamp-2">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-[#E5EEF8] bg-[#F4F8FD]/50 p-5 sm:p-6">
        <Price course={course} />
        {course.priceNote ? (
          <p className="mt-2 text-xs leading-5 font-semibold text-[#0057B8]">{course.priceNote}</p>
        ) : (
          <p className="mt-1 text-xs text-slate-500">Trọn gói phần mềm thi thử & bảo hành học lại 0đ</p>
        )}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link href={`/khoa-hoc/${course.id}`} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#E5EEF8] bg-white px-3 text-sm font-semibold text-[#0B2545] transition-colors hover:bg-white hover:text-[#0057B8] shadow-xs">
            Chi tiết
          </Link>
          <Link href={`/lien-he?select=${course.id}`} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#0057B8] px-3 text-sm font-bold text-white transition-colors hover:bg-[#003F88] shadow-sm">
            Đăng ký <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
