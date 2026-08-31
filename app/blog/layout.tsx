import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cẩm Nang Luyện Thi MOS & IC3 Quốc Tế",
  description: "Tổng hợp bài viết kinh nghiệm luyện thi MOS, IC3 GS6 đạt 1000 điểm, thủ thuật Excel nâng cao và kỹ năng tin học văn phòng thực chiến.",
  path: "/blog",
  keywords: ["cẩm nang tin học", "bí quyết thi MOS 1000 điểm", "mẹo thi IC3", "hàm excel nâng cao"],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
