import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import { Cpu, CheckCircle2, ShieldCheck, Award, FileCheck, Layers } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Khóa Học Chứng Chỉ Ứng Dụng CNTT Cơ Bản Theo Chuẩn Bộ TT&TT | Tin Học Gen Z",
  description: "Luyện thi chứng chỉ Ứng dụng CNTT cơ bản theo Thông tư 03/2014/TT-BTTTT. Đầy đủ 6 module kiến thức: Máy tính cơ bản, Windows, Internet, Word, Excel, PowerPoint cơ bản.",
  path: "/cntt-co-ban",
  keywords: [
    "chứng chỉ ứng dụng cntt cơ bản",
    "chứng chỉ tin học cơ bản",
    "thông tư 03/2014",
    "luyện thi tin học cơ bản",
    "chứng chỉ tin học thi công chức",
  ],
});

export default function CnttCoBanPillarPage() {
  const courseSchema = generateCourseSchema({
    name: "Khóa Học Luyện Thi Chứng Chỉ Ứng Dụng CNTT Cơ Bản",
    description: "Đào tạo chuẩn kỹ năng sử dụng công nghệ thông tin theo Thông tư 03/2014/TT-BTTTT.",
    url: "https://tinhocgenz.io.vn/cntt-co-ban",
    price: "490.000đ",
  });

  return (
    <div className="flex flex-col w-full bg-slate-50/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: "CNTT Cơ Bản", url: "/cntt-co-ban" }]} />
        </div>
      </div>

      <TopicClusterNav currentClusterId="cntt-co-ban" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white pt-16 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-700/50 border border-slate-600 text-slate-300 text-xs font-bold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>CHUẨN THÔNG TƯ 03/2014/TT-BTTTT</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Luyện Thi Chứng Chỉ{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-300">
                  Ứng Dụng CNTT Cơ Bản
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                Chứng chỉ tin học chuẩn quốc gia cần thiết cho sinh viên tốt nghiệp, thi tuyển công chức, viên chức và nâng ngạch. Luyện đề trắc nghiệm và thực hành bao đỗ 100%.
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
                  6 Module Chuẩn Bộ TT&TT
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>IU01: Hiểu biết về CNTT cơ bản</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>IU02: Sử dụng máy tính cơ bản (Windows)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>IU03: Xử lý văn bản cơ bản (Word)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>IU04: Sử dụng bảng tính cơ bản (Excel)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>IU05: Sử dụng trình chiếu cơ bản (PowerPoint)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>IU06: Sử dụng Internet cơ bản</span>
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
            defaultCourse="Khóa Học Luyện Thi Ứng Dụng CNTT Cơ Bản"
            title="Đăng Ký Tư Vấn & Thi Chứng Chỉ CNTT Cơ Bản"
          />
        </section>
      </div>
    </div>
  );
}
