import Link from "next/link";
import { Award, FileSpreadsheet, FileText, Presentation, Code2, Cpu, GraduationCap, CheckCircle2 } from "lucide-react";

export const TOPIC_CLUSTERS = [
  {
    id: "mos",
    title: "Chứng Chỉ MOS",
    tagline: "MOS Word, Excel, PowerPoint 365/2019",
    href: "/mos",
    icon: Award,
    color: "from-blue-600 to-cyan-500",
    badge: "Quốc Tế",
  },
  {
    id: "ic3",
    title: "Chứng Chỉ IC3 GS6",
    tagline: "Chuẩn kỹ năng số thế hệ mới",
    href: "/ic3",
    icon: GraduationCap,
    color: "from-indigo-600 to-purple-500",
    badge: "Chuẩn SV",
  },
  {
    id: "tin-hoc-van-phong",
    title: "Tin Học Văn Phòng",
    tagline: "Kỹ năng thực chiến cho người đi làm",
    href: "/tin-hoc-van-phong",
    icon: CheckCircle2,
    color: "from-emerald-600 to-teal-500",
    badge: "Thực Chiến",
  },
  {
    id: "excel",
    title: "Master Excel",
    tagline: "Hàm nâng cao, Dashboard & Tự động hóa",
    href: "/excel",
    icon: FileSpreadsheet,
    color: "from-green-600 to-emerald-500",
    badge: "Hot Nhất",
  },
  {
    id: "word",
    title: "Master Word",
    tagline: "Soạn thảo văn bản, đồ án & hợp đồng",
    href: "/word",
    icon: FileText,
    color: "from-blue-700 to-indigo-600",
    badge: "Chuẩn NĐ 30",
  },
  {
    id: "powerpoint",
    title: "Master PowerPoint",
    tagline: "Thiết kế Slide thuyết trình chuyên nghiệp",
    href: "/powerpoint",
    icon: Presentation,
    color: "from-amber-600 to-orange-500",
    badge: "Ấn Tượng",
  },
  {
    id: "python",
    title: "Python Ứng Dụng",
    tagline: "Tự động hóa dữ liệu Excel & văn phòng",
    href: "/python",
    icon: Code2,
    color: "from-cyan-600 to-blue-600",
    badge: "Xu Hướng",
  },
  {
    id: "cntt-co-ban",
    title: "CNTT Cơ Bản",
    tagline: "Chuẩn Bộ Thông Tin & Truyền Thông",
    href: "/cntt-co-ban",
    icon: Cpu,
    color: "from-slate-700 to-slate-900",
    badge: "Chuẩn TT03",
  },
];

interface TopicClusterNavProps {
  currentClusterId?: string;
}

export default function TopicClusterNav({ currentClusterId }: TopicClusterNavProps) {
  return (
    <section className="py-6 border-b border-slate-200/80 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
            Chủ Đề Trọng Tâm & Lộ Trình Đào Tạo
          </h2>
          <Link
            href="/khoa-hoc"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Tất cả lộ trình &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {TOPIC_CLUSTERS.map((cluster) => {
            const Icon = cluster.icon;
            const isActive = currentClusterId === cluster.id;

            return (
              <Link
                key={cluster.id}
                href={cluster.href}
                className={`group flex flex-col items-center text-center p-2.5 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50/80 border-blue-300 text-blue-900 shadow-sm"
                    : "bg-white border-slate-200 hover:border-blue-200 hover:shadow-md hover:translate-y-[-1px]"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 bg-gradient-to-br ${cluster.color} text-white shadow-sm`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight group-hover:text-blue-600 transition-colors">
                  {cluster.title}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5 hidden sm:inline-block truncate w-full">
                  {cluster.badge}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
