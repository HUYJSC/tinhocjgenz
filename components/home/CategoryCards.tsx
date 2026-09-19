import React from "react";
import Link from "next/link";
import { Laptop, Code2, LineChart, ArrowRight } from "lucide-react";

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "office",
    title: "Tin học văn phòng",
    description: "Word, Excel, PowerPoint từ cơ bản đến nâng cao, chuẩn Certiport quốc tế.",
    href: "/tin-hoc-van-phong",
    icon: <Laptop size={24} className="text-[#0057B8]" />,
    badge: "Phổ biến nhất",
  },
  {
    id: "coding",
    title: "Lập trình cho Gen Z",
    description: "Python, Web, Ứng dụng thực tiễn cho người mới bắt đầu tiếp cận công nghệ.",
    href: "/python",
    icon: <Code2 size={24} className="text-[#0057B8]" />,
    badge: "Xu hướng",
  },
  {
    id: "digital-skills",
    title: "Kỹ năng số",
    description: "Công cụ AI, kỹ năng học tập, tự động hóa và làm việc hiệu quả thời đại 4.0.",
    href: "/khoa-hoc",
    icon: <LineChart size={24} className="text-[#0057B8]" />,
    badge: "Thực chiến",
  },
];

export default function CategoryCards() {
  return (
    <section aria-label="Danh mục đào tạo trọng tâm" className="py-8 sm:py-12 bg-[#F7FAFE]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative flex flex-col justify-between rounded-[20px] bg-white border border-[#DDE8F5] p-6 sm:p-7 shadow-[0_2px_12px_rgba(11,37,69,0.04)] hover:shadow-[0_8px_24px_rgba(0,87,184,0.08)] hover:border-[#0057B8]/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F8FD] border border-[#DDE8F5] flex items-center justify-center group-hover:bg-[#0057B8]/10 group-hover:border-[#0057B8]/30 transition-colors">
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-bold text-[#0057B8] bg-[#F4F8FD] border border-[#DDE8F5] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {cat.badge}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#0B2545] group-hover:text-[#0057B8] transition-colors leading-snug mb-2">
                  {cat.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#54657A] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#DDE8F5] flex items-center justify-between text-xs font-bold text-[#0057B8]">
                <span>Khám phá chương trình</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

