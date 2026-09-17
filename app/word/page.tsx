import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import { FileText, CheckCircle2, ShieldCheck } from "lucide-react";

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
      <section className="bg-[#F4F8FD] border-b border-[#E5EEF8] pt-14 pb-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5EEF8] text-[#0057B8] text-xs font-bold shadow-xs">
                <FileText className="w-4 h-4 text-[#0057B8]" />
                <span>CHUẨN NGHỊ ĐỊNH 30/2020/NĐ-CP</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[#0B2545]">
                Soạn Thảo Văn Bản Chuẩn{" "}
                <span className="text-[#0057B8]">
                  Chuyên Nghiệp Với Word
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Nói không với nhảy trang, lệch lề, lỗi font chữ. Làm chủ các tính năng nâng cao: Section Break, Header/Footer khác nhau, Mục lục tự động 3 cấp và Trộn thư hàng loạt.
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
                  Kỹ Năng Đạt Được
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Quy chuẩn căn lề, font chữ, giãn dòng theo chuẩn văn bản hành chính Việt Nam.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Tạo mục lục hình ảnh, bảng biểu và mục lục nội dung tự động chỉ với 1 click.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
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
