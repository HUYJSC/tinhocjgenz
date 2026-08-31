import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema, generateFAQSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";
import { Award, CheckCircle2, Star, ShieldCheck, Clock, FileSpreadsheet, FileText, Presentation, HelpCircle, ArrowRight, BookOpen, GraduationCap } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Khóa Học MOS 2019/365 Cấp Tốc - Cam Kết Đậu 100% | Tin Học Gen Z",
  description: "Luyện thi chứng chỉ MOS Word, Excel, PowerPoint chuẩn quốc tế Certiport. Lộ trình tinh gọn 3-5 buổi, thực hành 100% trên đề thi thật, bao đỗ đầu ra.",
  path: "/mos",
  keywords: [
    "khóa học MOS",
    "luyện thi MOS",
    "chứng chỉ MOS",
    "MOS Excel",
    "MOS Word",
    "MOS PowerPoint",
    "thi MOS ở đâu",
    "lệ phí thi MOS",
    "đề thi MOS 2019",
  ],
});

const mosFaqs = [
  {
    question: "Chứng chỉ MOS là gì và có thời hạn bao lâu?",
    answer: "Chứng chỉ MOS (Microsoft Office Specialist) là bài thi đánh giá kỹ năng tin học văn phòng chuẩn quốc tế do Microsoft và Certiport (Hoa Kỳ) cấp. Chứng chỉ có giá trị vĩnh viễn và được công nhận trên toàn cầu.",
  },
  {
    question: "Người mất gốc tin học có học và thi MOS được không?",
    answer: "Hoàn toàn được! Giáo trình tại Tin Học Gen Z được thiết kế theo phương pháp Cầm tay chỉ việc, bám sát bộ đề thi thật của Certiport. Học viên mất gốc chỉ cần từ 3 - 5 buổi ôn luyện đúng phương pháp là đạt 800 - 1000 điểm.",
  },
  {
    question: "Hình thức học và thi MOS như thế nào?",
    answer: "Học viên có thể học Online qua Zoom/Google Meet hoặc học Offline. Khi thi, học viên sẽ thi trực tiếp tại các trung tâm khảo thí ủy quyền của IIG Việt Nam trên phần mềm Certiport.",
  },
  {
    question: "Chính sách cam kết đầu ra tại Tin Học Gen Z như thế nào?",
    answer: "Tin Học Gen Z cam kết 100% học viên thi đỗ ngay lần đầu nếu tham gia đầy đủ buổi học và làm bài tập theo hướng dẫn. Trường hợp thi không đạt, trung tâm tài trợ ôn luyện lại hoàn toàn miễn phí cho đến khi có chứng chỉ.",
  },
];

export default function MosPillarPage() {
  const mosCourses = coursesData.filter(
    (c) => c.id.includes("mos") || c.title.toLowerCase().includes("mos")
  );

  const courseSchema = generateCourseSchema({
    name: "Khóa Học Luyện Thi MOS 2019/365 Toàn Diện",
    description: "Đào tạo kỹ năng tin học văn phòng chuẩn Microsoft Office Specialist (Word, Excel, PowerPoint).",
    url: "https://tinhocgenz.io.vn/mos",
    price: "490.000đ",
    educationalLevel: "Từ mất gốc đến chuyên gia",
  });

  const faqSchema = generateFAQSchema(mosFaqs);

  return (
    <div className="flex flex-col w-full bg-slate-50/50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: "Luyện Thi MOS", url: "/mos" }]} />
        </div>
      </div>

      {/* Cluster Navigation */}
      <TopicClusterNav currentClusterId="mos" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>CHỨNG CHỈ QUỐC TẾ MICROSOFT VĨNH VIỄN</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Khóa Học Luyện Thi MOS 2019 / 365{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Bao Đậu 100%
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                Sở hữu chứng chỉ <strong>Microsoft Office Specialist (Word, Excel, PowerPoint)</strong> chỉ sau 3 - 5 buổi học cấp tốc. Thực hành trên ngân hàng đề thi thật Certiport 2026.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 p-3.5 rounded-xl">
                  <div className="text-2xl font-black text-cyan-400">99.6%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Tỷ lệ đậu lần đầu</div>
                </div>
                <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 p-3.5 rounded-xl">
                  <div className="text-2xl font-black text-amber-400">3 - 5 Buổi</div>
                  <div className="text-xs text-slate-400 mt-0.5">Thời gian hoàn thành</div>
                </div>
                <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 p-3.5 rounded-xl col-span-2 sm:col-span-1">
                  <div className="text-2xl font-black text-emerald-400">100%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Bảo hành học lại Free</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#dang-ky"
                  className="px-7 py-3.5 rounded-xl font-extrabold text-sm text-slate-900 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-400/20 transition-all transform hover:-translate-y-0.5"
                >
                  Đăng Ký Tư Vấn Ngay &rarr;
                </a>
                <a
                  href="#cac-mon-mos"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
                >
                  Xem Các Môn MOS
                </a>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Quyền Lợi Đặc Quyền Tại TinHocGenZ
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Bộ tài liệu & video bài giảng chuẩn format Certiport Multi-Project mới nhất.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Hệ thống chấm thi thử tự động, giao diện giống 100% phòng thi thật IIG.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Giảng viên kèm 1-1, sửa lỗi thao tác chi tiết từng bài tập.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Hỗ trợ thủ tục đăng ký thi tại IIG Việt Nam trọn gói.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Course Modules Grid */}
        <section id="cac-mon-mos" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Lộ Trình Các Môn Thi MOS Trọng Điểm
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Lựa chọn từng môn riêng lẻ hoặc trọn bộ Combo MOS Master để tối ưu chi phí và thời gian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* MOS Word */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">MOS Word</h3>
              <p className="text-xs font-semibold text-blue-600 mb-3">Mã đề: MO-100 / MO-110</p>
              <p className="text-sm text-slate-600 mb-4">
                Làm chủ văn bản, căn chỉnh lề, mục lục tự động, trộn thư Mail Merge, Style và quản lý tài liệu chuẩn quốc tế.
              </p>
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
                <span>3 - 4 buổi</span>
                <span className="font-bold text-slate-900">490.000đ</span>
              </div>
            </div>

            {/* MOS Excel */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-500 shadow-lg relative">
              <div className="absolute -top-3 right-6 bg-amber-400 text-slate-900 text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
                Phổ biến nhất
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">MOS Excel</h3>
              <p className="text-xs font-semibold text-emerald-600 mb-3">Mã đề: MO-200 / MO-210</p>
              <p className="text-sm text-slate-600 mb-4">
                Thành thạo bảng tính, công thức & hàm (VLOOKUP, IF, INDEX-MATCH), biểu đồ nâng cao, PivotTable và phân tích dữ liệu.
              </p>
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
                <span>4 - 5 buổi</span>
                <span className="font-bold text-slate-900">490.000đ</span>
              </div>
            </div>

            {/* MOS PowerPoint */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-600/10 text-orange-700 flex items-center justify-center mb-4">
                <Presentation className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">MOS PowerPoint</h3>
              <p className="text-xs font-semibold text-orange-600 mb-3">Mã đề: MO-300</p>
              <p className="text-sm text-slate-600 mb-4">
                Thiết kế Slide thuyết trình chuyên nghiệp, Animation, Morph effect, Master Slide, chèn đa phương tiện ấn tượng.
              </p>
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
                <span>3 - 4 buổi</span>
                <span className="font-bold text-slate-900">490.000đ</span>
              </div>
            </div>
          </div>
        </section>

        {/* Existing Courses in Database */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Các Lớp MOS Đang Khai Giảng</h2>
              <p className="text-sm text-slate-500 mt-1">Lịch học linh hoạt cả tuần, học bù & hỗ trợ 24/7</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mosCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* FAQ Section with JSON-LD Schema */}
        <section className="mb-20 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                <HelpCircle className="w-4 h-4" />
                Giải Đáp Thắc Mắc
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Câu Hỏi Thường Gặp Về Chứng Chỉ MOS
              </h2>
            </div>

            <div className="space-y-4">
              {mosFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
                >
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Capture Form Section */}
        <section id="dang-ky" className="max-w-4xl mx-auto">
          <ContactForm
            defaultCourse="Khóa Học MOS Toàn Diện (Word, Excel, PowerPoint)"
            title="Đăng Ký Tư Vấn & Nhận Bộ Đề Thi Thử MOS 2026 Miễn Phí"
            subtitle="Điền thông tin để được giáo viên kiểm tra trình độ và tư vấn lộ trình học tối ưu."
          />
        </section>
      </div>
    </div>
  );
}
