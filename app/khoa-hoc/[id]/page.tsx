import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { coursesData, upcomingBatchesData, testimonialsData } from "@/data/mockData";
import {
  Award,
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserCheck,
  School,
  ArrowLeft,
  BookOpen,
  Star,
  HelpCircle,
  Users,
  GraduationCap,
  MessageSquareQuote
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CourseScheduleWidget from "@/components/CourseScheduleWidget";
import Breadcrumb from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id,
  }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = coursesData.find((c) => c.id === id);

  if (!course) {
    return {
      title: "Khóa học không tồn tại",
    };
  }

  return buildMetadata({
    title: `${course.title} | Đào Tạo Chuẩn Quốc Tế`,
    description: course.description,
    path: `/khoa-hoc/${course.id}`,
    keywords: [course.title, course.badge || "", "luyện thi tin học", "khóa học tin học"],
  });
}

export default async function CourseDetailPage(props: CoursePageProps) {
  const params = await props.params;
  const course = coursesData.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  const courseFaqs = [
    {
      question: `Người mất gốc hoặc mới bắt đầu có theo kịp khóa học ${course.title} không?`,
      answer: "Hoàn toàn theo kịp! Lộ trình đào tạo được thiết kế theo phương pháp 'Cầm tay chỉ việc' từ các thao tác cơ bản nhất, bám sát bộ ma trận đề thi chuẩn Certiport. Giảng viên trực tiếp sửa bài và giải đáp thắc mắc 1:1 cho từng học viên.",
    },
    {
      question: "Nếu thi không đạt chuẩn đầu ra của trường thì có được học lại không?",
      answer: "Tin Học Gen Z cam kết tài trợ học lại 100% hoàn toàn miễn phí. Nếu học viên tham gia đầy đủ buổi học và hoàn thành bài tập theo hướng dẫn nhưng không đạt điểm chuẩn, bạn sẽ được xếp lớp ôn thi lại miễn phí cho đến khi thi đỗ.",
    },
    {
      question: "Hình thức học và thực hành diễn ra như thế nào?",
      answer: "Khóa học được tổ chức Online tương tác trực tiếp qua Zoom/Google Meet kết hợp cấp tài khoản máy ảo luyện đề mô phỏng phần mềm thi thật của Certiport không giới hạn.",
    },
    {
      question: "Sau khi thi xong thì bao lâu có chứng chỉ quốc tế?",
      answer: "Sau khi hoàn thành bài thi tại trung tâm khảo thí ủy quyền của IIG Việt Nam, thí sinh biết điểm ngay tại chỗ và có thể tải bản điện tử (PDF có mã QR chứng nhận toàn cầu) trên hệ thống Certiport trong 24-48 giờ.",
    },
  ];

  const courseSchema = generateCourseSchema({
    name: course.title,
    description: course.description,
    url: `https://tinhocgenz.io.vn/khoa-hoc/${course.id}`,
    price: course.price,
    courseCode: course.examCode,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Trang chủ", url: "/" },
    { name: "Khóa học", url: "/khoa-hoc" },
    { name: course.title, url: `/khoa-hoc/${course.id}` },
  ]);

  const faqSchema = generateFAQSchema(courseFaqs);

  // Filter related courses
  const relatedCourses = coursesData
    .filter((c) => c.id !== course.id && (c.category === course.category || !course.category))
    .slice(0, 3);

  // Relevant testimonials
  const courseReviews = testimonialsData.slice(0, 2);

  return (
    <div className="flex flex-col w-full bg-slate-50/40 font-sans">
      {/* 1. Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 2. Visual Breadcrumb Navigation */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { name: "Khóa học", url: "/khoa-hoc" },
              { name: course.title, url: `/khoa-hoc/${course.id}` },
            ]}
          />
        </div>
      </div>

      {/* 3. Header Banner & Course Overview */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 text-white pt-20 pb-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="mb-6">
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Quay lại danh sách khóa học</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2">
                {course.badge && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {course.badge}
                  </span>
                )}
                {course.examCode && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                    Chuẩn Khảo Thí: {course.examCode}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-display">
                {course.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
                {course.description}
              </p>

              {/* Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Thời lượng học</span>
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    <Clock size={15} className="text-cyan-400" />
                    {course.duration}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Tỷ lệ đỗ Certiport</span>
                  <div className="text-sm font-black text-emerald-400 flex items-center gap-1.5">
                    <Award size={15} className="text-emerald-400" />
                    {course.passRate || "99.4% Đỗ ngay lần đầu"}
                  </div>
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Hình thức đào tạo</span>
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    <School size={15} className="text-amber-400" />
                    Online Tương Tác & Luyện Máy Ảo
                  </div>
                </div>
              </div>

            </div>

            {/* Right Pricing & Quick CTA Card */}
            <div className="lg:col-span-4">
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                    Học phí trọn gói
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-blue-600 leading-none">
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm font-bold text-slate-400 line-through">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                  {course.priceNote && (
                    <p className="text-xs font-bold text-amber-600 mt-2">
                      🔥 {course.priceNote}
                    </p>
                  )}
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>Tài trợ học lại 100% miễn phí nếu không đạt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>Cấp tài khoản máy ảo thi thử không giới hạn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>Hỗ trợ thủ tục đăng ký thi IIG Việt Nam chính thức</span>
                  </div>
                </div>

                <a
                  href="#dang-ky"
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <span>Đăng Ký Nhận Ưu Đãi Ngay</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Syllabus & Detailed Curriculum */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Syllabus Content */}
            <div className="lg:col-span-8 space-y-10">
              
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black uppercase tracking-wider mb-2">
                  <BookOpen size={13} className="text-blue-600" />
                  KHUNG CHƯƠNG TRÌNH ĐÀO TẠO
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Lộ Trình Học Chi Tiết Từng Buổi
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Giáo trình được tối ưu thực chiến 100%, tập trung vào kỹ năng làm bài và ngân hàng đề thi thật của Certiport.
                </p>
              </div>

              {/* Syllabus Timeline */}
              {course.syllabus && course.syllabus.length > 0 ? (
                <div className="space-y-6">
                  {course.syllabus.map((item) => (
                    <div
                      key={item.session}
                      className="p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-500/30 transition-all duration-300 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono font-black text-xs">
                          BUỔI {item.session}
                        </span>
                        <span className="text-xs font-bold text-slate-400">120 phút / buổi</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>

                      <ul className="space-y-2 pt-2 border-t border-slate-200/60">
                        {item.contents.map((cnt, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                            <span>{cnt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {course.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Instructor Profile Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">ĐỘI NGŨ ĐÀO TẠO</span>
                    <h3 className="text-lg font-black text-white">Giảng Viên MOS Master Trainer</h3>
                    <p className="text-xs text-slate-400">Chứng chỉ Sư phạm Quốc tế Certiport & Chuyên gia Khảo thí IIG</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Trực tiếp giảng dạy bởi đội ngũ Master Trainer trên 8 năm kinh nghiệm. Đã đào tạo thành công hơn 5.000+ sinh viên các trường Đại học đạt chuẩn đầu ra và 1.200+ học viên đạt điểm tuyệt đối 1000/1000 điểm ngay lần thi đầu tiên.
                </p>
              </div>

              {/* Course Guarantee Callout */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-4 shadow-xl">
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <ShieldCheck size={20} className="text-cyan-400" />
                  Chính Sách Cam Kết Đào Tạo & Quyền Lợi Học Viên
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200 font-medium">
                  <li>• Nếu không đạt điểm chuẩn của trường, học viên được học lại toàn bộ khóa học miễn phí 100%.</li>
                  <li>• Cấp tài khoản phần mềm thi thử mô phỏng đề thi Certiport 2026 không giới hạn số lần làm bài.</li>
                  <li>• Giảng viên kèm cặp 1:1, giải đáp thắc mắc trước ngày thi qua Ultraviewer / Zalo 24/7.</li>
                </ul>
              </div>

            </div>

            {/* Sidebar: Upcoming Batches & Schedule */}
            <div className="lg:col-span-4 space-y-6">
              <CourseScheduleWidget courseTitle={course.title} />

              {course.targetAudience && (
                <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Đối tượng phù hợp:</h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                    {course.targetAudience}
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 5. Student Reviews & Testimonials Section */}
      <section className="py-16 bg-slate-50/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full">
              ĐÁNH GIÁ XÁC THỰC
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Học Viên Nói Gì Về Khóa Học?
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Trải nghiệm thực tế từ các học viên đã hoàn thành khóa học và đạt chứng chỉ quốc tế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {courseReviews.map((rev) => (
              <div key={rev.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.score && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {rev.score}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{rev.content}&rdquo;
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{rev.name}</span>
                  <span className="text-slate-400">{rev.universityOrCompany}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions (Course FAQs) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full">
              HỎI ĐÁP THƯỜNG GẶP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Giải Đáp Thắc Mắc Về Khóa Học
            </h2>
          </div>

          <div className="space-y-4">
            {courseFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle size={16} className="text-blue-600 shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Related Courses Section */}
      {relatedCourses.length > 0 && (
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                GỢI Ý THÊM
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Khóa Học Liên Quan Bạn Có Thể Quan Tâm
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCourses.map((rel) => (
                <div key={rel.id} className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-500 shadow-sm transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase text-blue-600">{rel.duration}</span>
                    <h3 className="text-base font-bold text-slate-900">{rel.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{rel.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-black text-blue-600 text-sm">{rel.price}</span>
                    <Link
                      href={`/khoa-hoc/${rel.id}`}
                      className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1"
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Registration Contact Form */}
      <section id="dang-ky" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full">
              ĐĂNG KÝ TƯ VẤN & XẾP LỚP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Đăng Ký Khóa Học: {course.title}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Để lại thông tin bên dưới, giảng viên Tin Học Gen Z sẽ gọi điện tư vấn lộ trình và áp dụng ưu đãi giảm giá nhóm cho bạn ngay!
            </p>
          </div>

          <ContactForm defaultCourse={course.title} />
        </div>
      </section>
    </div>
  );
}
