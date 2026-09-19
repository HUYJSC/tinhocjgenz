import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Code, Sparkles, Award, Clock } from "lucide-react";

interface FeaturedCourseItem {
  id: string;
  title: string;
  description: string;
  badge: "Phổ biến" | "Bán chạy" | "Mới" | "Khuyên dùng";
  href: string;
  duration: string;
  icon: React.ReactNode;
}

const FEATURED_COURSES: FeaturedCourseItem[] = [
  {
    id: "mos-master",
    title: "Microsoft Office (MOS Master)",
    description: "Thành thạo Word, Excel, PowerPoint chuẩn quốc tế IIG. Cam kết điểm 900+ bao đỗ 100%.",
    badge: "Phổ biến",
    href: "/mos",
    duration: "12 buổi • Online / Offline",
    icon: <BookOpen size={22} className="text-[#0057B8]" />,
  },
  {
    id: "python-starter",
    title: "Lập trình Python cho người mới bắt đầu",
    description: "Tư duy lập trình hiện đại, xử lý dữ liệu và tự động hóa công việc thường nhật từ con số 0.",
    badge: "Mới",
    href: "/python",
    duration: "10 buổi • Thực hành dự án",
    icon: <Code size={22} className="text-[#0057B8]" />,
  },
  {
    id: "ai-skills",
    title: "Ứng dụng AI trong học tập & công việc",
    description: "Làm chủ ChatGPT, Claude và các công cụ AI thế hệ mới để nhân 3 tốc độ nghiên cứu và làm báo cáo.",
    badge: "Bán chạy",
    href: "/khoa-hoc",
    duration: "6 buổi • Cấp tốc thực chiến",
    icon: <Sparkles size={22} className="text-[#0057B8]" />,
  },
  {
    id: "ic3-gs6",
    title: "Chứng chỉ IC3 GS6 Quốc tế",
    description: "Chuẩn đầu ra tin học của hơn 50 trường đại học hàng đầu: Công nghệ, Mạng máy tính & Ứng dụng số.",
    badge: "Khuyên dùng",
    href: "/ic3",
    duration: "8 buổi • Bao đỗ 100%",
    icon: <Award size={22} className="text-[#0057B8]" />,
  },
];

export default function FeaturedCourses() {
  return (
    <section aria-labelledby="featured-courses-title" className="py-14 sm:py-20 bg-white border-b border-[#DDE8F5]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F8FD] border border-[#DDE8F5] text-[#0057B8] font-bold text-xs uppercase tracking-wider mb-2.5">
              <Award size={13} className="text-[#0057B8]" />
              CHƯƠNG TRÌNH ĐÀO TẠO TRỌNG TÂM
            </span>
            <h2 id="featured-courses-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] tracking-tight">
              Khóa học nổi bật
            </h2>
            <p className="text-sm sm:text-base text-[#54657A] mt-1">
              Những khóa học được Gen Z yêu thích và lựa chọn nhiều nhất hiện nay
            </p>
          </div>

          <Link
            href="/khoa-hoc"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0057B8] hover:text-[#003F88] transition-colors group self-start sm:self-auto"
          >
            <span>Xem tất cả khóa học</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_COURSES.map((course) => (
            <div
              key={course.id}
              className="group relative flex flex-col justify-between rounded-[20px] bg-white border border-[#DDE8F5] p-6 shadow-[0_2px_12px_rgba(11,37,69,0.04)] hover:shadow-[0_8px_24px_rgba(0,87,184,0.08)] hover:border-[#0057B8]/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Top icon and badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-11 h-11 rounded-xl bg-[#F4F8FD] border border-[#DDE8F5] flex items-center justify-center group-hover:bg-[#0057B8]/10 group-hover:border-[#0057B8]/30 transition-colors">
                    {course.icon}
                  </div>
                  <span className="text-[11px] font-bold text-[#0057B8] bg-[#F4F8FD] border border-[#DDE8F5] px-2.5 py-0.5 rounded-full">
                    {course.badge}
                  </span>
                </div>

                {/* Course info */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B2545] group-hover:text-[#0057B8] transition-colors leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#54657A] mt-2 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                {/* Duration info */}
                <div className="flex items-center gap-1.5 text-xs text-[#54657A] pt-1">
                  <Clock size={13} className="text-[#0057B8]" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-4 mt-4 border-t border-[#DDE8F5] flex items-center justify-between">
                <Link
                  href={course.href}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-[#F4F8FD] text-[#0057B8] group-hover:bg-[#0057B8] group-hover:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Chi tiết khóa học</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

