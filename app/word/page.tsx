import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import { FileText, CheckCircle2, ShieldCheck, Bookmark, FileSpreadsheet, Sparkles } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Khóa Học Microsoft Word Soạn Thảo Văn Bản Chuẩn Nghị Định 30 | Tin Học Gen Z",
  description: "Khóa học làm chủ Microsoft Word: Định dạng chuẩn thể thức văn bản hành chính, mục lục tự động, trộn thư Mail Merge, định dạng khóa luận và đồ án chuyên nghiệp.",
  path: "/word",
  keywords: [
    "khóa học word",
    "học soạn thảo văn bản",
    "word chuẩn nghị định 30",
    "mục lục tự động word",
    "mail merge word",
    "định dạng khóa luận tốt nghiệp",
  ],
});

export default function WordPillarPage() {
  const courseSchema = generateCourseSchema({
    name: "Khóa Học Soạn Thảo Văn Bản & Làm Chủ Microsoft Word Chuyên Nghiệp",
    description: "Đào tạo kỹ năng soạn thảo văn bản hành chính, hợp đồng, đồ án chuẩn quy định.",
    url: "https://tinhocgenz.io.vn/word",
    price: "390.000đ",
  });

  return (
    <div className="flex flex-col w-full bg-slate-50/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: "Master Word", url: "/word" }]} />
        </div>
      </div>

      <TopicClusterNav currentClusterId="word" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900 text-white pt-16 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>CHUẨN NGHỊ ĐỊNH 30/2020/NĐ-CP</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Soạn Thảo Văn Bản Chuẩn{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Chuyên Nghiệp Với Word
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                Nói không với nhảy trang, lệch lề, lỗi font chữ. Làm chủ các tính năng nâng cao: Section Break, Header/Footer khác nhau, Mục lục tự động 3 cấp và Trộn thư hàng loạt.
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
                  Kỹ Năng Đạt Được
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Quy chuẩn căn lề, font chữ, giãn dòng theo chuẩn văn bản hành chính Việt Nam.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Tạo mục lục hình ảnh, bảng biểu và mục lục nội dung tự động chỉ với 1 click.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Trộn thư (Mail Merge) gửi hàng trăm thư mời, hợp đồng, chứng nhận tự động.</span>
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
            defaultCourse="Khóa Học Microsoft Word Chuyên Nghiệp"
            title="Đăng Ký Khóa Học Soạn Thảo Văn Bản Word"
          />
        </section>
      </div>
    </div>
  );
}
