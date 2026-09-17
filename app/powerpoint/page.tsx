import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import TopicClusterNav from "@/components/TopicClusterNav";
import ContactForm from "@/components/ContactForm";
import { Presentation, CheckCircle2, ShieldCheck } from "lucide-react";

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
      <section className="bg-[#F4F8FD] border-b border-[#E5EEF8] pt-14 pb-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5EEF8] text-[#0057B8] text-xs font-bold shadow-xs">
                <Presentation className="w-4 h-4 text-[#0057B8]" />
                <span>THIẾT KẾ SLIDE THỜI ĐẠI MỚI</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[#0B2545]">
                Thiết Kế Slide Thuyết Trình{" "}
                <span className="text-[#0057B8]">
                  Cuốn Hút & Đẳng Cấp
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Biến những slide ngập tràn chữ thành bài trình chiếu hình ảnh sống động, hiệu ứng mượt mà (Morph, Zoom) giúp bạn tự tin ghi điểm tuyệt đối trước người nghe.
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
                  Bạn Sẽ Làm Chủ
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Tư duy bố cục, phân cấp thông tin và phối màu chuẩn nhận diện thương hiệu.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
                    <span>Làm chủ kỹ thuật Morph, Zoom transition tạo chuyển động như video 3D.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0057B8] mt-0.5 flex-shrink-0" />
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
