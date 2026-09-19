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
    <section className="py-12 sm:py-16 space-y-8">
      
      {/* Top Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F8FD] border border-[#E2E8F0] text-[#0057B8] font-extrabold text-xs uppercase tracking-wider">
          <Sparkles size={12} className="text-[#0057B8]" />
          LỘ TRÌNH ĐÀO TẠO CHO MỌI ĐỐI TƯỢNG
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2545] font-display">
          Chọn Lộ Trình Phù Hợp Nhất Với Bạn
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm">
          Dù bạn là học sinh, sinh viên, người đi làm hay doanh nghiệp, Tin Học Gen Z đều có chương trình đào tạo tối ưu riêng biệt.
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
                  ? "bg-[#0057B8] text-white shadow-md shadow-[rgba(0,87,184,0.2)] scale-[1.02]"
                  : "bg-white text-slate-700 hover:bg-[#F4F8FD] hover:text-[#0057B8] border border-[#E2E8F0]"
              }`}
            >
              {path.icon}
              <span>{path.title}</span>
            </button>
          );
        })}
      </div>

      {/* Pathway Content Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-premium space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left info & outcomes */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0057B8] bg-[#F4F8FD] border border-[#E2E8F0] px-2.5 py-1 rounded-md">
                {currentPathway.subtitle}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-display mt-2">
                {currentPathway.title}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                {currentPathway.targetAudience}
              </p>
            </div>

            {/* Outcomes */}
            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Giá Trị Đạt Được Sau Khóa Học:
              </p>
              <ul className="space-y-2">
                {currentPathway.outcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                    <CheckCircle2 size={16} className="text-[#0057B8] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-[#E2E8F0]">
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-[#0057B8]" />
                Thời lượng: <strong className="text-[#0B2545]">{currentPathway.duration}</strong>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-[#0057B8]" />
                Cam kết: <strong className="text-[#0B2545]">Bao đỗ 100%</strong>
              </span>
            </div>
          </div>

          {/* Right recommended courses */}
          <div className="lg:col-span-5 bg-[#F4F8FD] border border-[#E2E8F0] rounded-2xl p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-1.5">
              <Award size={14} className="text-[#0057B8]" />
              Khóa Học Khuyến Nghị
            </p>

            <div className="space-y-3">
              {currentPathway.recommendedCourses.map((c, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-[0_2px_8px_rgba(11,37,69,0.04)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-[#F4F8FD] text-[#0057B8] border border-[#E2E8F0]">
                      {c.badge}
                    </span>
                    <Link href={c.link} className="text-[#0057B8] hover:text-[#003F88] text-xs font-bold flex items-center gap-0.5">
                      <span>Xem khóa</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#0B2545] leading-snug">
                    {c.name}
                  </h5>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/lien-he"
              className="w-full py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-colors"
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
