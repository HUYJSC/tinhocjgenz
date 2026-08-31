import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema, generateFAQSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";
import { GraduationCap, Award, CheckCircle2, ShieldCheck, HelpCircle, Monitor, Laptop, Globe } from "lucide-react";

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
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white pt-16 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>CHUẨN ĐẦU RA TIN HỌC ĐẠI HỌC TOÀN QUỐC</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Khóa Học Luyện Thi Chứng Chỉ{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                  IC3 GS6 Quốc Tế
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                Nắm vững kỹ năng công nghệ số thế hệ mới, vượt qua kỳ thi IC3 GS6 ngay lần đầu với ngân hàng đề thi sát thực tế 100%.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#dang-ky"
                  className="px-7 py-3.5 rounded-xl font-extrabold text-sm text-slate-900 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 shadow-lg shadow-amber-400/20 transition-all"
                >
                  Đăng Ký Nhận Lộ Trình Ôn Thi &rarr;
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Vì Sao Nên Luyện Thi IC3 Tại TinHocGenZ?
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Giáo trình chuẩn GS6 mới nhất theo khung Certiport Hoa Kỳ.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Luyện trực tiếp trên hệ thống thi thử mô phỏng thời gian thực.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Hỗ trợ cấp tốc 1-1 cho sinh viên cần chứng chỉ nộp tốt nghiệp gấp.</span>
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
            <Monitor className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Level 1: Kiến thức nền tảng</h3>
            <p className="text-sm text-slate-600">Nắm vững phần cứng, hệ điều hành, quản lý tập tin và an toàn số cơ bản.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Laptop className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Level 2: Ứng dụng số thực hành</h3>
            <p className="text-sm text-slate-600">Thành thạo phần mềm văn phòng, tạo lập và định dạng nội dung số chuyên nghiệp.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Globe className="w-10 h-10 text-cyan-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Level 3: Xã hội số & An toàn</h3>
            <p className="text-sm text-slate-600">Kỹ năng làm việc cộng tác trực tuyến, điện toán đám mây và bảo mật không gian mạng.</p>
          </div>
        </div>

        {/* Courses list */}
        {ic3Courses.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Khóa Học IC3 Khai Giảng Gần Nhất</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ic3Courses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="mb-20 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
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
