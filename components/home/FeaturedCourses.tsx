import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Users } from "lucide-react";

interface CourseItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: "Phổ biến" | "Bán chạy" | "Mới";
  href: string;
  icon: React.ReactNode;
}

function OfficeStackIcon() {
  return (
    <div className="relative w-12 h-10 flex items-center shrink-0" aria-hidden="true">
      {/* Word */}
      <div className="absolute left-0 top-1 w-6 h-6 rounded-md bg-[#0057B8] text-white font-extrabold text-[10px] flex items-center justify-center shadow-xs">
        W
      </div>
      {/* PowerPoint */}
      <div className="absolute left-3 top-0 w-6 h-6 rounded-md bg-[#D83B01] text-white font-extrabold text-[10px] flex items-center justify-center shadow-xs z-10">
        P
      </div>
      {/* Excel */}
      <div className="absolute left-6 top-2 w-6 h-6 rounded-md bg-[#107C41] text-white font-extrabold text-[10px] flex items-center justify-center shadow-xs z-20">
        X
      </div>
    </div>
  );
}

function PythonIcon() {
  return (
    <svg
      viewBox="0 0 110 110"
      className="w-10 h-10 shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M54.2 3C29.2 3 30.8 13.9 30.8 13.9L30.9 25.2H54.6V28.7H21.7C9.3 28.7 3.3 35.5 3.3 47.9C3.3 62.6 11.2 62.9 11.2 62.9H19.7V51.2C19.7 37.3 31.9 37.3 31.9 37.3H54.4V34.5C54.4 34.5 54.7 3 54.2 3ZM40.5 10.8C42.8 10.8 44.7 12.7 44.7 15C44.7 17.3 42.8 19.2 40.5 19.2C38.2 19.2 36.3 17.3 36.3 15C36.3 12.7 38.2 10.8 40.5 10.8Z"
        fill="#366D9C"
      />
      <path
        d="M55.8 107C80.8 107 79.2 96.1 79.2 96.1L79.1 84.8H55.4V81.3H88.3C100.7 81.3 106.7 74.5 106.7 62.1C106.7 47.4 98.8 47.1 98.8 47.1H90.3V58.8C90.3 72.7 78.1 72.7 78.1 72.7H55.6V75.5C55.6 75.5 55.3 107 55.8 107ZM69.5 99.2C67.2 99.2 65.3 97.3 65.3 95C65.3 92.7 67.2 90.8 69.5 90.8C71.8 90.8 73.7 92.7 73.7 95C73.7 97.3 71.8 99.2 69.5 99.2Z"
        fill="#FFD43B"
      />
    </svg>
  );
}

const FEATURED_COURSES: CourseItem[] = [
  {
    id: "office-master",
    title: "Làm chủ Microsoft Office",
    subtitle: "Từ cơ bản đến nâng cao",
    badge: "Phổ biến",
    href: "/mos",
    icon: <OfficeStackIcon />,
  },
  {
    id: "python-starter",
    title: "Lập trình Python cho người mới bắt đầu",
    subtitle: "Xây nền tảng vững chắc",
    badge: "Bán chạy",
    href: "/python",
    icon: <PythonIcon />,
  },
  {
    id: "ai-skills",
    title: "Ứng dụng AI trong học tập & công việc",
    subtitle: "Làm việc thông minh hơn",
    badge: "Mới",
    href: "/khoa-hoc",
    icon: (
      <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] flex items-center justify-center shrink-0">
        <Cpu size={22} className="text-[#0066FF]" />
      </div>
    ),
  },
  {
    id: "effective-learning",
    title: "Kỹ năng học tập hiệu quả",
    subtitle: "Phương pháp và công cụ cho Gen Z",
    href: "/blog",
    icon: (
      <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] flex items-center justify-center shrink-0">
        <Users size={22} className="text-[#0066FF]" />
      </div>
    ),
  },
];

export default function FeaturedCourses() {
  return (
    <section aria-labelledby="featured-courses-title" className="py-10 sm:py-14 bg-white border-b border-[#E5EEF8]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 id="featured-courses-title" className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
              Khóa học nổi bật
            </h2>
            <p className="text-xs sm:text-sm text-[#54657A] mt-1 font-normal">
              Những khóa học được Gen Z yêu thích nhất hiện nay
            </p>
          </div>

          <Link
            href="/khoa-hoc"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors group self-start sm:self-auto"
          >
            <span>Xem tất cả</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {FEATURED_COURSES.map((course) => (
            <Link
              key={course.id}
              href={course.href}
              className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#E5EEF8] p-5 shadow-xs hover:shadow-md hover:border-[#0066FF]/40 transition-all duration-200"
            >
              {/* Top Badge */}
              {course.badge && (
                <span className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0066FF] text-white">
                  {course.badge}
                </span>
              )}

              <div className="space-y-3 pt-1">
                {/* Course Icon */}
                <div className="h-11 flex items-center">
                  {course.icon}
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B2545] group-hover:text-[#0066FF] transition-colors leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#54657A] mt-1 line-clamp-1 font-normal">
                    {course.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Arrow Action */}
              <div className="pt-3 mt-2 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-[#EBF3FF] text-[#0066FF] flex items-center justify-center group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
