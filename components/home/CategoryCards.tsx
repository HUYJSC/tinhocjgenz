import React from "react";
import Link from "next/link";
import { Laptop, Code2, BarChart2, Users, ArrowRight } from "lucide-react";

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "office",
    title: "Tin học văn phòng",
    description: "Word, Excel, PowerPoint từ cơ bản đến nâng cao",
    href: "/tin-hoc-van-phong",
    icon: <Laptop size={22} className="text-[#0057B8]" />,
  },
  {
    id: "coding",
    title: "Lập trình cho Gen Z",
    description: "Python, Web, Ứng dụng thực tiễn",
    href: "/python",
    icon: <Code2 size={22} className="text-[#0057B8]" />,
  },
  {
    id: "digital-skills",
    title: "Kỹ năng số",
    description: "Công cụ AI, kỹ năng học tập và làm việc hiệu quả",
    href: "/khoa-hoc",
    icon: <BarChart2 size={22} className="text-[#0057B8]" />,
  },
  {
    id: "study-skills",
    title: "Kỹ năng học tập hiệu quả",
    description: "Phương pháp và công cụ cho Gen Z",
    href: "/blog",
    icon: <Users size={22} className="text-[#0057B8]" />,
  },
];

export default function CategoryCards() {
  return (
    <section aria-label="Danh mục đào tạo trọng tâm" className="py-6 sm:py-8 bg-[#F7FAFE]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative flex items-center justify-between rounded-2xl bg-white border border-[#E5EEF8] p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-[#0057B8]/40 transition-all duration-200"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#EBF3FF] flex items-center justify-center shrink-0 group-hover:bg-[#0057B8] transition-colors [&>svg]:group-hover:text-white">
                  {cat.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#0B2545] group-hover:text-[#0057B8] transition-colors truncate">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#54657A] mt-0.5 line-clamp-1 font-normal">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#EBF3FF] text-[#0057B8] flex items-center justify-center shrink-0 ml-2 group-hover:bg-[#0057B8] group-hover:text-white transition-all">
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
