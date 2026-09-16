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
    <article className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white ${course.popular ? "border-blue-300 shadow-md" : "border-slate-200 shadow-sm"}`}>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{category}</span>
          {course.popular && <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">Nổi bật</span>}
        </div>

        <Link href={`/khoa-hoc/${course.id}`} className="mt-4 block">
          <h3 className="line-clamp-2 text-lg font-bold leading-6 text-slate-950 transition-colors hover:text-blue-700">{course.title}</h3>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-blue-800">{course.tagline}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
            <Clock size={14} className="text-blue-600" aria-hidden="true" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium">
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
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <Check size={11} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="line-clamp-2">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-6">
        <Price course={course} />
        {course.priceNote ? (
          <p className="mt-2 text-xs leading-5 font-semibold text-blue-700">🔥 {course.priceNote}</p>
        ) : (
          <p className="mt-1 text-[11px] text-slate-400">Trọn gói phần mềm thi thử & bảo hành học lại 0đ</p>
        )}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link href={`/khoa-hoc/${course.id}`} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
            Chi tiết
          </Link>
          <Link href={`/lien-he?select=${course.id}`} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            Đăng ký <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
