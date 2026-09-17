import { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema, generateFAQSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";
import { CheckCircle2, Briefcase, ShieldCheck } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Khóa Học Tin Học Văn Phòng Thực Chiến",
  description: "Khóa học tin học văn phòng cấp tốc (Word, Excel, PowerPoint) ứng dụng thực tế 100%. Nâng cao hiệu suất công việc, xử lý báo cáo, hợp đồng chuyên nghiệp.",
  path: "/tin-hoc-van-phong",
  keywords: [
    "khóa học tin học văn phòng",
    "học tin học văn phòng cấp tốc",
    "tin học văn phòng cho người đi làm",
    "học excel văn phòng",
    "học word văn phòng",
    "tin học ứng dụng",
  ],
});

const officeFaqs = [
  {
    question: "Khóa học tin học văn phòng thực chiến khác gì so với thi MOS?",
    answer: "Khóa học thực chiến tập trung vào giải quyết các bài toán công việc thực tế hàng ngày (lập bảng lương, báo cáo tài chính, hợp đồng, tự động hóa) thay vì chỉ bấm thao tác để lấy điểm thi.",
  },
  {
    question: "Người chưa biết gì hoặc lớn tuổi có học được không?",
    answer: "Chắc chắn được! Phương pháp giảng dạy 1 kèm 1, cầm tay chỉ việc, bài tập gắn liền với ngành nghề thực tế của học viên (Kế toán, Nhân sự, Bán hàng, Hành chính...).",
  },
];

export default function TinHocVanPhongPage() {
  const officeCourses = coursesData.filter(
    (c) => c.category === "practical-office" || c.id.includes("office")
  );

  const courseSchema = generateCourseSchema({
    name: "Khóa Học Tin Học Văn Phòng Ứng Dụng Thực Tế",
    description: "Đào tạo kỹ năng Word, Excel, PowerPoint chuyên sâu cho người đi làm.",
    url: "https://tinhocgenz.io.vn/tin-hoc-van-phong",
    price: "490.000đ",
  });

  const faqSchema = generateFAQSchema(officeFaqs);

  return (
    <div className="flex flex-col w-full bg-slate-50/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: "Tin Học Văn Phòng", url: "/tin-hoc-van-phong" }]} />
        </div>
      </div>

      <TopicClusterNav currentClusterId="tin-hoc-van-phong" />

      {/* Hero */}
      <section className="bg-[#F4F8FD] border-b border-[#E5EEF8] pt-14 pb-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5EEF8] text-[#0057B8] text-xs font-bold shadow-xs">
                <Briefcase className="w-4 h-4 text-[#0057B8]" />
                <span>KỸ NĂNG NGHỀ NGHIỆP THỰC CHIẾN</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[#0B2545]">
                Khóa Học Tin Học Văn Phòng{" "}
                <span className="text-[#0057B8]">
                  Ứng Dụng Thực Tế
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Tăng gấp đôi tốc độ xử lý công việc văn phòng: Làm chủ bảng tính Excel nâng cao, soạn thảo hợp đồng quy chuẩn Word và thiết kế Slide báo cáo thuyết trình chuyên nghiệp.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#dang-ky"
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0057B8] hover:bg-[#003F88] shadow-sm transition-all"
                >
                  Đăng Ký Khóa Học Ngay &rarr;
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E5EEF8] rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <h3 className="text-lg font-bold text-[#0B2545] mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0057B8]" />
                  Mục Tiêu Sau Khóa Học
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Làm chủ 30+ hàm Excel thông dụng và các công cụ PivotTable, VLOOKUP, INDEX-MATCH.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Soạn thảo hợp đồng, báo cáo, công văn chuẩn thể thức văn bản hành chính nhà nước.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Tự động hóa tác vụ cơ bản, rút ngắn 50% thời gian xử lý thủ công.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Các Khóa Tin Học Văn Phòng Phù Hợp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officeCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20 bg-white rounded-2xl p-8 sm:p-12 border border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Câu Hỏi Thường Gặp
              </h2>
            </div>
            <div className="space-y-4">
              {officeFaqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-slate-900 text-base mb-2">{faq.question}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="dang-ky" className="max-w-4xl mx-auto">
          <ContactForm
            defaultCourse="Khóa Học Tin Học Văn Phòng Toàn Diện"
            title="Đăng Ký Học Tin Học Văn Phòng Thực Chiến"
          />
        </section>
      </div>
    </div>
  );
}
