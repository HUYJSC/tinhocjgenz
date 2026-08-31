import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema, generateFAQSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";
import { FileSpreadsheet, CheckCircle2, ShieldCheck, BarChart3, Database, Sparkles, Layers } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Khóa Học Excel Nâng Cao & Báo Cáo Dashboard",
  description: "Khóa học Excel thực hành chuyên sâu: Hàm nâng cao (XLOOKUP, INDEX-MATCH, SUMIFS), Pivot Table, Dashboard tương tác và tự động hóa xử lý dữ liệu doanh nghiệp.",
  path: "/excel",
  keywords: [
    "khóa học excel",
    "học excel nâng cao",
    "excel văn phòng",
    "hàm excel",
    "excel dashboard",
    "tự động hóa excel",
    "khóa học excel cho người đi làm",
  ],
});

const excelFaqs = [
  {
    question: "Khóa học Excel phù hợp với đối tượng nào?",
    answer: "Khóa học phù hợp với sinh viên kinh tế, tài chính, kế toán, nhân sự, kinh doanh, marketing và tất cả những ai cần quản lý dữ liệu, báo cáo chuyên nghiệp trong công việc.",
  },
  {
    question: "Nội dung đào tạo Excel gồm những gì?",
    answer: "Chương trình bao gồm: Định dạng dữ liệu chuẩn, hệ thống hàm xử lý logic - chuỗi - ngày tháng, hàm tìm kiếm nâng cao (VLOOKUP, XLOOKUP, INDEX/MATCH), Data Validation, PivotTable, Power Query và thiết kế Dashboard báo cáo động.",
  },
];

export default function ExcelPillarPage() {
  const excelCourses = coursesData.filter(
    (c) => c.title.toLowerCase().includes("excel") || c.id.includes("excel")
  );

  const courseSchema = generateCourseSchema({
    name: "Khóa Học Excel Thực Hành Từ Cơ Bản Đến Nâng Cao",
    description: "Đào tạo kỹ năng làm chủ Microsoft Excel và phân tích dữ liệu chuyên nghiệp.",
    url: "https://tinhocgenz.io.vn/excel",
    price: "490.000đ",
  });

  return (
    <div className="flex flex-col w-full bg-slate-50/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(excelFaqs)) }}
      />

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: "Master Excel", url: "/excel" }]} />
        </div>
      </div>

      <TopicClusterNav currentClusterId="excel" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white pt-16 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>KỸ NĂNG VÀNG TRONG MỌI DOANH NGHIỆP</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Làm Chủ Microsoft Excel{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                  Từ Cơ Bản Đến Master
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                Xử lý dữ liệu hàng nghìn dòng trong vài phút, tự động hóa báo cáo với công thức thông minh, Pivot Table và Dashboard tương tác trực quan.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#dang-ky"
                  className="px-7 py-3.5 rounded-xl font-extrabold text-sm text-slate-900 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 shadow-lg transition-all"
                >
                  Nhận Giáo Trình & Tư Vấn Miễn Phí &rarr;
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Bạn Sẽ Làm Được Gì?
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Làm chủ hoàn toàn các hàm: IF lồng nhau, VLOOKUP/XLOOKUP, INDEX-MATCH, SUMIFS, COUNTIFS.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Tạo bảng tổng hợp động và biểu đồ phân tích chuyên nghiệp bằng PivotTable & Slicer.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Xử lý và làm sạch dữ liệu tự động với Power Query.</span>
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
            <BarChart3 className="w-10 h-10 text-emerald-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Báo Cáo Động & Dashboard</h3>
            <p className="text-sm text-slate-600">Trình bày số liệu kinh doanh, doanh thu trực quan, cập nhật dữ liệu 1 chạm.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Database className="w-10 h-10 text-teal-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Quản Trị Dữ Liệu Lớn</h3>
            <p className="text-sm text-slate-600">Tối ưu bảng tính, chống giật lag khi file có hàng chục nghìn bản ghi.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Sparkles className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Hàm Nâng Cao & Logic</h3>
            <p className="text-sm text-slate-600">Kết hợp linh hoạt các hàm lồng ghép giải quyết mọi bài toán quản trị.</p>
          </div>
        </div>

        {excelCourses.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Các Khóa Học Excel Nổi Bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {excelCourses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-20 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-10">
              Câu Hỏi Thường Gặp Về Khóa Học Excel
            </h2>
            <div className="space-y-4">
              {excelFaqs.map((faq, i) => (
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
            defaultCourse="Khóa Học Excel Thực Hành Từ Cơ Bản Đến Nâng Cao"
            title="Đăng Ký Khóa Học Excel Thực Chiến"
          />
        </section>
      </div>
    </div>
  );
}
