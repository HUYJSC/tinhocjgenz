import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema, generateFAQSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";
import { CheckCircle2, Briefcase, FileSpreadsheet, FileText, Presentation, ShieldCheck } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Khóa Học Tin Học Văn Phòng Thực Chiến Cho Người Đi Làm | Tin Học Gen Z",
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
    (c) => c.category === "van-phong" || c.category === "nang-cao"
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
      <section className="bg-gradient-to-br from-teal-950 via-slate-900 to-slate-900 text-white pt-16 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold">
                <Briefcase className="w-4 h-4 text-teal-400" />
                <span>KỸ NĂNG NGHỀ NGHIỆP THỰC CHIẾN</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Khóa Học Tin Học Văn Phòng{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                  Ứng Dụng Thực Tế
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                Tăng gấp đôi tốc độ xử lý công việc văn phòng: Làm chủ bảng tính Excel nâng cao, soạn thảo hợp đồng quy chuẩn Word và thiết kế Slide báo cáo thuyết trình chuyên nghiệp.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#dang-ky"
                  className="px-7 py-3.5 rounded-xl font-extrabold text-sm text-slate-900 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 shadow-lg transition-all"
                >
                  Đăng Ký Khóa Học Ngay &rarr;
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Mục Tiêu Sau Khóa Học
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>Làm chủ 30+ hàm Excel thông dụng và các công cụ PivotTable, VLOOKUP, INDEX-MATCH.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>Soạn thảo hợp đồng, báo cáo, công văn chuẩn thể thức văn bản hành chính nhà nước.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>Tự thiết kế Slide thuyết trình dự án cuốn hút, thuyết phục cấp trên và đối tác.</span>
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
          <h2 className="text-2xl font-black text-slate-900 mb-8">Các Khóa Tin Học Văn Phòng Phù Hợp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officeCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
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
