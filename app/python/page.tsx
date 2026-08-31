import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import { Code2, CheckCircle2, ShieldCheck, Cpu, Terminal, FileCode } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Khóa Học Python Cho Người Mới & Tự Động Hóa Văn Phòng | Tin Học Gen Z",
  description: "Khóa học lập trình Python ứng dụng: Tự động hóa xử lý Excel, tổng hợp báo cáo tự động, cào dữ liệu web (Web Scraping) dành cho dân văn phòng và người mới bắt đầu.",
  path: "/python",
  keywords: [
    "khóa học python",
    "python cho người mới",
    "python tự động hóa excel",
    "học python văn phòng",
    "python cào dữ liệu",
    "python data analysis",
  ],
});

export default function PythonPillarPage() {
  const courseSchema = generateCourseSchema({
    name: "Khóa Học Python Ứng Dụng & Tự Động Hóa Công Việc",
    description: "Đào tạo lập trình Python thực chiến cho người mới, ứng dụng tự động hóa báo cáo và dữ liệu.",
    url: "https://tinhocgenz.io.vn/python",
    price: "890.000đ",
  });

  return (
    <div className="flex flex-col w-full bg-slate-50/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: "Python Ứng Dụng", url: "/python" }]} />
        </div>
      </div>

      <TopicClusterNav currentClusterId="python" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-900 text-white pt-16 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>KỸ NĂNG CÔNG NGHỆ TƯƠNG LAI</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Lập Trình Python &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Tự Động Hóa Công Việc
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                Dành cho người chưa từng viết code. Tự động hóa gộp hàng trăm file Excel, gửi email hàng loạt, crawl dữ liệu giá cả thị trường chỉ với vài dòng lệnh Python đơn giản.
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
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Nội Dung Trọng Tâm
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Nền tảng cú pháp Python dễ hiểu qua các ví dụ thực tế.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Làm việc với thư viện Pandas, OpenPyXL xử lý file Excel siêu tốc.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Cào dữ liệu trang web (BeautifulSoup / Selenium) và xuất báo cáo tự động.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section id="dang-ky" className="max-w-4xl mx-auto">
          <ContactForm
            defaultCourse="Khóa Học Python Tự Động Hóa Công Việc"
            title="Đăng Ký Khóa Học Lập Trình Python Ứng Dụng"
          />
        </section>
      </div>
    </div>
  );
}
