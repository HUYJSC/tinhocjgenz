import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import { Presentation, CheckCircle2, ShieldCheck, Sparkles, Palette, Video } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Khóa Học Thiết Kế Slide PowerPoint Chuyên Nghiệp & Thuyết Trình | Tin Học Gen Z",
  description: "Khóa học làm chủ PowerPoint: Thiết kế Slide Pitching, Báo cáo dự án, Slide bảo vệ luận văn ấn tượng với hiệu ứng Morph, Master Slide và tư duy trực quan hóa dữ liệu.",
  path: "/powerpoint",
  keywords: [
    "khóa học powerpoint",
    "thiết kế slide powerpoint",
    "học powerpoint chuyên nghiệp",
    "hiệu ứng morph powerpoint",
    "slide thuyết trình đẹp",
    "powerpoint cho sinh viên",
  ],
});

export default function PowerPointPillarPage() {
  const courseSchema = generateCourseSchema({
    name: "Khóa Học Thiết Kế Slide PowerPoint & Thuyết Trình Ấn Tượng",
    description: "Đào tạo tư duy thiết kế Slide hiện đại, trực quan hóa dữ liệu và kỹ năng trình bày thuyết phục.",
    url: "https://tinhocgenz.io.vn/powerpoint",
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
          <Breadcrumb items={[{ name: "Master PowerPoint", url: "/powerpoint" }]} />
        </div>
      </div>

      <TopicClusterNav currentClusterId="powerpoint" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-950 via-slate-900 to-slate-900 text-white pt-16 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
                <Presentation className="w-4 h-4 text-amber-400" />
                <span>THIẾT KẾ SLIDE THỜI ĐẠI MỚI</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Thiết Kế Slide Thuyết Trình{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">
                  Cuốn Hút & Đẳng Cấp
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                Biến những slide ngập tràn chữ thành bài trình chiếu hình ảnh sống động, hiệu ứng mượt mà (Morph, Zoom) giúp bạn tự tin ghi điểm tuyệt đối trước người nghe.
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
                  Bạn Sẽ Làm Chủ
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Tư duy bố cục, phân cấp thông tin và phối màu chuẩn nhận diện thương hiệu.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Làm chủ kỹ thuật Morph, Zoom transition tạo chuyển động như video 3D.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Kho tài nguyên hơn 10.000+ template, icon vector và infographic bản quyền.</span>
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
            defaultCourse="Khóa Học PowerPoint Chuyên Nghiệp"
            title="Đăng Ký Khóa Học Thiết Kế Slide PowerPoint"
          />
        </section>
      </div>
    </div>
  );
}
