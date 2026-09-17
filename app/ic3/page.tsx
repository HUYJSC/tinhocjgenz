import { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema, generateFAQSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";
import { GraduationCap, CheckCircle2, ShieldCheck, Monitor, Laptop, Globe } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Khóa Học Luyện Thi IC3 GS6 Cấp Tốc",
  description: "Khóa học luyện thi chứng chỉ tin học quốc tế IC3 Digital Literacy GS6 chuẩn Certiport. Lộ trình ôn tập 3 module: Computing Fundamentals, Key Applications, Living Online.",
  path: "/ic3",
  keywords: [
    "khóa học IC3",
    "chứng chỉ IC3",
    "IC3 GS6",
    "luyện thi IC3",
    "IC3 chuẩn đầu ra đại học",
    "đề thi IC3 GS6",
    "lệ phí thi IC3",
  ],
});

const ic3Faqs = [
  {
    question: "Chứng chỉ IC3 GS6 là gì và khác gì so với MOS?",
    answer: "IC3 (Internet and Computing Core Certification) là chứng chỉ quốc tế đo lường kiến thức kỹ thuật số tổng thể (phần cứng, phần mềm, mạng, an toàn thông tin và ứng dụng văn phòng). Trong khi MOS chuyên sâu vào bộ ứng dụng Microsoft Office, IC3 cung cấp nền tảng số toàn diện và là chuẩn đầu ra bắt buộc tại nhiều trường Đại học/Cao đẳng.",
  },
  {
    question: "Bài thi IC3 GS6 gồm những cấp độ (Level) nào?",
    answer: "IC3 GS6 gồm 3 cấp độ (Level 1, Level 2, Level 3). Mỗi cấp độ bao gồm 7 tiêu chuẩn kỹ năng số cốt lõi từ cơ bản, ứng dụng đến nâng cao.",
  },
  {
    question: "Học IC3 mất bao lâu thì có thể đi thi?",
    answer: "Tại Tin Học Gen Z, khóa học IC3 GS6 được chia nhỏ theo từng module tinh gọn, trung bình học viên chỉ cần từ 4 - 6 buổi ôn luyện là tự tin đi thi và đạt điểm cao.",
  },
];

export default function Ic3PillarPage() {
  const ic3Courses = coursesData.filter(
    (c) => c.id.includes("ic3") || c.title.toLowerCase().includes("ic3")
  );

  const courseSchema = generateCourseSchema({
    name: "Khóa Học Luyện Thi Chứng Chỉ IC3 GS6 Chuẩn Quốc Tế",
    description: "Đào tạo kỹ năng số toàn diện và luyện thi chứng chỉ IC3 GS6 chuẩn Certiport.",
    url: "https://tinhocgenz.io.vn/ic3",
    price: "490.000đ",
    educationalLevel: "Học sinh, Sinh viên",
  });

  const faqSchema = generateFAQSchema(ic3Faqs);

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
          <Breadcrumb items={[{ name: "Chứng Chỉ IC3 GS6", url: "/ic3" }]} />
        </div>
      </div>

      <TopicClusterNav currentClusterId="ic3" />

      {/* Hero */}
      <section className="bg-[#F4F8FD] border-b border-[#E5EEF8] pt-14 pb-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5EEF8] text-[#0057B8] text-xs font-bold shadow-xs">
                <GraduationCap className="w-4 h-4 text-[#0057B8]" />
                <span>CHUẨN ĐẦU RA TIN HỌC ĐẠI HỌC TOÀN QUỐC</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[#0B2545]">
                Khóa Học Luyện Thi Chứng Chỉ{" "}
                <span className="text-[#0057B8]">
                  IC3 GS6 Quốc Tế
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Nắm vững kỹ năng công nghệ số thế hệ mới, vượt qua kỳ thi IC3 GS6 ngay lần đầu với ngân hàng đề thi sát thực tế 100%.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#dang-ky"
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0057B8] hover:bg-[#003F88] shadow-sm transition-all"
                >
                  Đăng Ký Nhận Lộ Trình Ôn Thi &rarr;
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E5EEF8] rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <h3 className="text-lg font-bold text-[#0B2545] mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0057B8]" />
                  Vì Sao Nên Luyện Thi IC3 Tại TinHocGenZ?
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Lộ trình tinh gọn chỉ 3-5 buổi, tập trung trực tiếp kiến thức trọng tâm.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Phần mềm luyện thi bản quyền mô phỏng 99% đề thi thật tại IIG.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Cam kết bao đỗ 100% - Tài trợ học lại miễn phí nếu chưa đạt chứng chỉ.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Hỗ trợ thủ tục đăng ký thi Certiport nhanh chóng, không lo hết chỗ.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Monitor className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Level 1: Kiến thức nền tảng</h3>
            <p className="text-sm text-slate-600">Nắm vững phần cứng, hệ điều hành, quản lý tập tin và an toàn số cơ bản.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Laptop className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Level 2: Ứng dụng số thực hành</h3>
            <p className="text-sm text-slate-600">Thành thạo phần mềm văn phòng, tạo lập và định dạng nội dung số chuyên nghiệp.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Globe className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Level 3: Xã hội số & An toàn</h3>
            <p className="text-sm text-slate-600">Kỹ năng làm việc cộng tác trực tuyến, điện toán đám mây và bảo mật không gian mạng.</p>
          </div>
        </div>

        {/* Courses list */}
        {ic3Courses.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Khóa Học IC3 Khai Giảng Gần Nhất</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ic3Courses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="mb-20 bg-white rounded-2xl p-8 sm:p-12 border border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Câu Hỏi Thường Gặp Về Chứng Chỉ IC3 GS6
              </h2>
            </div>
            <div className="space-y-4">
              {ic3Faqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-slate-900 text-base mb-2">{faq.question}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section id="dang-ky" className="max-w-4xl mx-auto">
          <ContactForm
            defaultCourse="Khóa Học Luyện Thi IC3 GS6 Chuẩn Quốc Tế"
            title="Đăng Ký Tư Vấn & Nhận Đề Thi Thử IC3 GS6 Miễn Phí"
          />
        </section>
      </div>
    </div>
  );
}
