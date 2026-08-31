import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Danh Sách Khóa Học MOS, IC3 & Tin Học Văn Phòng",
  description: "Tổng hợp các khóa đào tạo tin học thực chiến, luyện thi chứng chỉ quốc tế MOS 2019/365, IC3 GS6 và Excel nâng cao. Cam kết tài trợ học lại 100% miễn phí.",
  path: "/khoa-hoc",
  keywords: ["khóa học MOS", "khóa học IC3", "khóa học tin học văn phòng", "khóa học Excel"],
});

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
