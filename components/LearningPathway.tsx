"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Clock, 
  ShieldCheck, 
  Laptop
} from "lucide-react";

export interface TargetPathway {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  targetAudience: string;
  duration: string;
  outcomes: string[];
  recommendedCourses: {
    name: string;
    badge: string;
    description: string;
    link: string;
  }[];
}

const PATHWAYS: TargetPathway[] = [
  {
    id: "student",
    title: "Học Sinh & Sinh Viên",
    subtitle: "Luyện thi MOS & IC3 Cấp Tốc lấy bằng",
    icon: <GraduationCap size={18} />,
    targetAudience: "Sinh viên các trường ĐH/CĐ cần chứng chỉ tốt nghiệp hoặc học sinh THPT nâng cao kỹ năng số.",
    duration: "3 - 5 buổi trọng tâm",
    outcomes: [
      "Cam kết đỗ chứng chỉ quốc tế MOS & IC3 ngay lần thi đầu (Học lại 0đ nếu chưa đạt)",
      "Tặng tài khoản phần mềm thi thử bản quyền Certiport sát 99% đề thi thật tại IIG",
      "Kèm 1:1 trực tiếp, chỉ rõ từng bẫy đề thi và mẹo đạt điểm tối đa 900 - 1000đ"
    ],
    recommendedCourses: [
      {
        name: "Combo MOS 3 Môn (Word + Excel + PowerPoint)",
        badge: "Khuyên Dùng",
        description: "Lộ trình tối ưu nhất để sở hữu trọn bộ 3 chứng chỉ MOS quốc tế.",
        link: "/khoa-hoc/mos-master-combo"
      },
      {
        name: "Chứng Chỉ Kỹ Năng Số Quốc Tế IC3 GS6",
        badge: "Quốc Tế",
        description: "Chuẩn kỹ năng số toàn diện về máy tính, mạng và ứng dụng văn phòng.",
        link: "/khoa-hoc/ic3-gs6"
      }
    ]
  },
  {
    id: "worker",
    title: "Người Đi Làm & Kế Toán",
    subtitle: "Thực chiến Excel, Dashboard & Báo Cáo",
    icon: <Briefcase size={18} />,
    targetAudience: "Nhân viên văn phòng, kế toán, ngân hàng, quản lý muốn tối ưu tốc độ xử lý bảng tính.",
    duration: "4 - 6 buổi thực chiến",
    outcomes: [
      "Làm chủ các hàm nâng cao: XLOOKUP, Dynamic Array, INDEX-MATCH, SUMIFS đa điều kiện",
      "Thiết kế Dashboard báo cáo quản trị động, PivotTable đa chiều tự động cập nhật",
      "Ứng dụng AI (ChatGPT, Copilot) hỗ trợ viết công thức phức tạp và xử lý dữ liệu lớn"
    ],
    recommendedCourses: [
      {
        name: "Combo Thực Chiến Excel & Word Chuyên Sâu",
        badge: "Bán Chạy",
        description: "Học trực tiếp trên file dữ liệu công việc thực tế, giải quyết tắc nghẽn công việc.",
        link: "/khoa-hoc/combo-survival-office"
      },
      {
        name: "Ứng Dụng AI Văn Phòng Đột Phá Hiệu Suất 10X",
        badge: "Xu Hướng",
        description: "Tự động hóa báo cáo, tạo slide thuyết trình chỉ trong 5 phút bằng AI.",
        link: "/khoa-hoc/ai-office-breakthrough"
      }
    ]
  },
  {
    id: "beginner",
    title: "Người Mới & Mất Gốc",
    subtitle: "Cầm tay chỉ việc từ con số 0",
    icon: <Laptop size={18} />,
    targetAudience: "Người chưa từng học tin học, thao tác máy tính còn chậm, muốn có nền tảng vững chắc.",
    duration: "5 - 8 buổi kèm kỹ",
    outcomes: [
      "Thành thạo kỹ năng gõ văn bản 10 ngón chuẩn, quản lý tệp tin và bảo mật máy tính",
      "Soạn thảo hợp đồng, công văn Word chuẩn quy thức văn bản hành chính",
      "Lập bảng tính Excel quản lý thu chi, bán hàng và in ấn bảng biểu đẹp mắt"
    ],
    recommendedCourses: [
      {
        name: "Luyện Thi MOS 2019 / 365 Từng Môn (Word / Excel)",
        badge: "Cơ Bản Đến Nâng Cao",
        description: "Giảng viên kèm 1:1 từng thao tác chuột và phím tắt cơ bản.",
        link: "/khoa-hoc/mos-2019"
      }
    ]
  },
  {
    id: "business",
    title: "Doanh Nghiệp & Tổ Chức",
    subtitle: "Đào tạo In-House theo yêu cầu",
    icon: <Building2 size={18} />,
    targetAudience: "Công ty, phòng ban, tổ chức cần chuẩn hóa kỹ năng số và năng suất làm việc cho nhân sự.",
    duration: "Thiết kế linh hoạt theo nhu cầu",
    outcomes: [
      "Giáo trình may đo riêng biệt dựa trên biểu mẫu và quy trình làm việc thực tế của công ty",
      "Kiểm tra năng lực đầu vào và cấp chứng nhận hoàn thành khóa học cho nhân viên",
      "Hỗ trợ kỹ thuật và giải đáp vướng mắc bảng tính trọn đời sau đào tạo"
    ],
    recommendedCourses: [
      {
        name: "Chương Trình Đào Tạo Doanh Nghiệp May Đo",
        badge: "Doanh Nghiệp",
        description: "Tối ưu hóa quy trình làm việc và năng suất nhân sự toàn diện.",
        link: "/lien-he"
      }
    ]
  }
];

export default function LearningPathway() {
  const [selectedTab, setSelectedTab] = useState<string>("student");

  const currentPathway = PATHWAYS.find((p) => p.id === selectedTab) || PATHWAYS[0];

  return (
    <section className="py-8 space-y-8">
      
      {/* Top Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-[10px] uppercase tracking-wider">
          <Sparkles size={12} className="text-blue-600" />
          LỘ TRÌNH ĐÀO TẠO CHO MỌI ĐỐI TƯỢNG
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
          Chọn Lộ Trình Phù Hợp Nhất Với Bạn
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm">
          Dù bạn là học sinh, sinh viên, người đi làm hay doanh nghiệp, PH Digital Education đều có chương trình đào tạo tối ưu riêng biệt.
        </p>
      </div>

      {/* Target Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
        {PATHWAYS.map((path) => {
          const isSelected = path.id === selectedTab;
          return (
            <button
              key={path.id}
              onClick={() => setSelectedTab(path.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {path.icon}
              <span>{path.title}</span>
            </button>
          );
        })}
      </div>

      {/* Pathway Content Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-premium space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left info & outcomes */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                {currentPathway.subtitle}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-2">
                {currentPathway.title}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                {currentPathway.targetAudience}
              </p>
            </div>

            {/* Outcomes */}
            <div className="space-y-2.5">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                Giá Trị Đạt Được Sau Khóa Học:
              </p>
              <ul className="space-y-2">
                {currentPathway.outcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-blue-600" />
                Thời lượng: <strong className="text-slate-800">{currentPathway.duration}</strong>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-emerald-600" />
                Cam kết: <strong className="text-slate-800">Bao đỗ 100%</strong>
              </span>
            </div>
          </div>

          {/* Right recommended courses */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
            <p className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Award size={14} className="text-amber-500" />
              Khóa Học Khuyến Nghị
            </p>

            <div className="space-y-3">
              {currentPathway.recommendedCourses.map((c, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {c.badge}
                    </span>
                    <Link href={c.link} className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-0.5">
                      <span>Xem khóa</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                  <h5 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                    {c.name}
                  </h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/lien-he"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>Đăng Ký Tư Vấn Lộ Trình Này</span>
              <ArrowRight size={13} />
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
