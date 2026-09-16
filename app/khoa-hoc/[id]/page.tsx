import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { coursesData, testimonialsData } from "@/data/mockData";
import {
  Award,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  ArrowRight,
  School,
  ArrowLeft,
  BookOpen,
  HelpCircle,
  GraduationCap,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CourseScheduleWidget from "@/components/CourseScheduleWidget";
import Breadcrumb from "@/components/Breadcrumb";
import PriceBlock from "@/components/PriceBlock";
import { buildMetadata } from "@/lib/seo";
import { generateCourseSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";
import { getCurriculumByCourseId, getAllLessons } from "@/data/lessonsData";

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
      answer: "Hoàn toàn theo kịp! Lộ trình đào tạo được thiết kế theo phương pháp 'Cầm tay chỉ việc' từ các thao tác cơ bản nhất, bám sát bộ ma trận đề thi chuẩn Certiport. Giảng viên trực tiếp sửa bài và giải đáp thắc mắc cho từng học viên.",
    },
    {
      question: "Nếu thi không đạt chuẩn đầu ra của trường thì có được học lại không?",
      answer: "Tin Học Gen Z hỗ trợ chính sách học lại hoàn toàn miễn phí nếu học viên tham gia đầy đủ buổi học và hoàn thành bài tập theo hướng dẫn.",
    },
    {
      question: "Hình thức học và thực hành diễn ra như thế nào?",
      answer: "Khóa học được tổ chức Online tương tác trực tiếp qua Zoom/Google Meet kết hợp cấp tài khoản máy ảo luyện đề mô phỏng bài thi thật của Certiport.",
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

  const curriculum = getCurriculumByCourseId(course.id);
  const allLessons = curriculum ? getAllLessons(course.id) : [];
  const firstLesson = allLessons[0];

  return (
    <div className="flex flex-col w-full bg-white font-sans text-[#0057B8]">
      {/* 1. Structured Data for Search Engines */}
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
      <div className="bg-white border-b border-[#0057B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { name: "Khóa học", url: "/khoa-hoc" },
              { name: course.title, url: `/khoa-hoc/${course.id}` },
            ]}
          />
        </div>
      </div>

      {/* 3. Header Banner & Course Overview (UI-01: Pure White Bg, Solid #0057B8 Text) */}
      <section className="bg-white text-[#0057B8] pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#0057B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6">
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0057B8] hover:underline"
            >
              <ArrowLeft size={14} />
              <span>Quay lại danh sách khóa học</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Info Column (8 cols desktop) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2">
                {course.badge && (
                  <span className="px-3 py-1 rounded-md text-xs font-bold border border-[#0057B8] bg-white text-[#0057B8] flex items-center gap-1">
                    <Star size={12} className="text-[#0057B8]" />
                    {course.badge}
                  </span>
                )}
                {course.examCode && (
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-bold border border-[#0057B8] bg-white text-[#0057B8]">
                    Chuẩn Khảo Thí: {course.examCode}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-display text-[#0057B8]">
                {course.title}
              </h1>

              <p className="text-[#0057B8] text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
                {course.description}
              </p>

              {/* Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#0057B8]">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#0057B8]">
                    Thời lượng học
                  </span>
                  <div className="text-sm font-black text-[#0057B8] flex items-center gap-1.5">
                    <Clock size={15} className="text-[#0057B8]" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#0057B8]">
                    Chuẩn đào tạo
                  </span>
                  <div className="text-sm font-black text-[#0057B8] flex items-center gap-1.5">
                    <Award size={15} className="text-[#0057B8]" />
                    <span>Chuẩn Khảo Thí Certiport</span>
                  </div>
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#0057B8]">
                    Hình thức học
                  </span>
                  <div className="text-sm font-black text-[#0057B8] flex items-center gap-1.5">
                    <School size={15} className="text-[#0057B8]" />
                    <span>Online & Luyện Máy Ảo</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Pricing & Quick CTA Card (4 cols desktop) (UI-04) */}
            <div className="lg:col-span-4">
              <div className="bg-white text-[#0057B8] rounded-2xl p-6 sm:p-7 border-2 border-[#0057B8] space-y-5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0057B8] block mb-2">
                    Học phí niêm yết
                  </span>
                  <PriceBlock
                    price={course.price}
                    originalPrice={course.originalPrice}
                    priceNote={course.priceNote}
                    size="lg"
                  />
                </div>

                <div className="space-y-2.5 pt-3 border-t border-[#0057B8] text-xs font-semibold text-[#0057B8]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#0057B8] shrink-0" />
                    <span>Chính sách hỗ trợ học lại miễn phí khi chưa đạt chuẩn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#0057B8] shrink-0" />
                    <span>Cung cấp tài khoản máy ảo thực hành chuẩn khảo thí</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#0057B8] shrink-0" />
                    <span>Hướng dẫn thủ tục đăng ký thi IIG Việt Nam chính thức</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {firstLesson && (
                    <Link
                      href={`/khoa-hoc/${course.id}/bai-hoc/${firstLesson.id}`}
                      className="w-full min-h-12 py-3.5 rounded-xl bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] font-black text-xs sm:text-sm tracking-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <span>Bắt Đầu Học Thử Miễn Phí</span>
                      <ArrowRight size={15} />
                    </Link>
                  )}

                  <a
                    href="#dang-ky"
                    className="w-full min-h-11 py-3 rounded-xl bg-white hover:bg-[#0057B8] text-[#0057B8] hover:text-white border border-[#0057B8] font-bold text-xs tracking-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <span>Yêu Cầu Tư Vấn Lộ Trình</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Syllabus & Detailed Curriculum */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#0057B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Main Syllabus Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#0057B8] text-[#0057B8] text-xs font-black uppercase tracking-wider mb-2">
                  <BookOpen size={13} className="text-[#0057B8]" />
                  CHƯƠNG TRÌNH ĐÀO TẠO & BÀI HỌC
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight">
                  Lộ Trình Học Chi Tiết Từng Bài & Thực Hành
                </h2>
                <p className="text-[#0057B8] text-xs sm:text-sm mt-1">
                  Giáo trình tích hợp lý thuyết trọng tâm và bài tập thực hành trắc nghiệm có giải thích chi tiết.
                </p>
              </div>

              {/* Interactive Curriculum with Direct Lesson Access */}
              {curriculum && curriculum.chapters.length > 0 ? (
                <div className="space-y-6">
                  {curriculum.chapters.map((chapter) => (
                    <div key={chapter.id} className="p-6 rounded-2xl bg-white border border-[#0057B8] space-y-4">
                      <div className="border-b border-[#0057B8] pb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#0057B8]">
                          Chương {chapter.order}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-[#0057B8]">
                          {chapter.title}
                        </h3>
                        <p className="text-xs text-[#0057B8] mt-0.5">
                          {chapter.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {chapter.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-4 rounded-xl bg-white border border-[#0057B8] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md border border-[#0057B8] text-[#0057B8] text-[10px] font-black font-mono">
                                  Bài {lesson.order}
                                </span>
                                {lesson.isFreePreview && (
                                  <span className="px-2 py-0.5 rounded-md bg-[#0057B8] text-white text-[9px] font-bold uppercase">
                                    Học thử miễn phí
                                  </span>
                                )}
                                <span className="text-[11px] text-[#0057B8] font-semibold flex items-center gap-1">
                                  <Clock size={11} />
                                  {lesson.duration}
                                </span>
                              </div>
                              <h4 className="text-sm font-black text-[#0057B8]">
                                {lesson.title}
                              </h4>
                              <p className="text-xs text-[#0057B8] line-clamp-1">
                                {lesson.summary}
                              </p>
                            </div>

                            <Link
                              href={`/khoa-hoc/${course.id}/bai-hoc/${lesson.id}`}
                              className="self-start sm:self-center shrink-0 px-4 py-2 rounded-lg bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <span>Vào học</span>
                              <ArrowRight size={13} />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : course.syllabus && course.syllabus.length > 0 ? (
                <div className="space-y-4">
                  {course.syllabus.map((item) => (
                    <div
                      key={item.session}
                      className="p-6 rounded-2xl bg-white border border-[#0057B8] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-md bg-[#0057B8] text-white font-mono font-black text-xs">
                          BUỔI {item.session}
                        </span>
                        <span className="text-xs font-bold text-[#0057B8]">120 phút / buổi</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-[#0057B8] leading-snug">
                        {item.title}
                      </h3>

                      <ul className="space-y-2 pt-2 border-t border-[#0057B8]">
                        {item.contents.map((cnt, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0057B8] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-2 shrink-0" />
                            <span>{cnt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {course.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#0057B8]">
                      <CheckCircle2 size={18} className="text-[#0057B8] shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-[#0057B8]">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Instructor Profile Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white text-[#0057B8] space-y-4 border border-[#0057B8]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#0057B8] flex items-center justify-center text-[#0057B8]">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#0057B8] tracking-wider">ĐỘI NGŨ ĐÀO TẠO</span>
                    <h3 className="text-lg font-black text-[#0057B8]">Giảng Viên Đạt Chuẩn MOS Master</h3>
                    <p className="text-xs text-[#0057B8]">Chứng chỉ Sư phạm Quốc tế Certiport</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#0057B8] leading-relaxed">
                  Đội ngũ giảng viên trên 8 năm kinh nghiệm giảng dạy và luyện thi chứng chỉ quốc tế. Phương pháp giảng bài trực quan, hỗ trợ sửa bài chi tiết cho từng học viên.
                </p>
              </div>

              {/* Course Guarantee Callout */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white text-[#0057B8] space-y-3 border-2 border-[#0057B8]">
                <h3 className="text-base sm:text-lg font-black text-[#0057B8] flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#0057B8]" />
                  Chính Sách Cam Kết & Quyền Lợi Học Viên
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#0057B8] font-medium">
                  <li>• Học viên được hỗ trợ học lại miễn phí nếu chưa đạt chuẩn đầu ra theo cam kết.</li>
                  <li>• Cấp quyền sử dụng phần mềm máy ảo mô phỏng đề thi Certiport trong suốt khóa học.</li>
                  <li>• Giảng viên hỗ trợ giải đáp thắc mắc chuyên môn trước ngày thi chính thức.</li>
                </ul>
              </div>

            </div>

            {/* Sidebar: Upcoming Batches & Schedule (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <CourseScheduleWidget courseTitle={course.title} />

              {course.targetAudience && (
                <div className="bg-white p-6 rounded-2xl border border-[#0057B8] space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0057B8]">
                    Đối tượng phù hợp:
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#0057B8] leading-relaxed">
                    {course.targetAudience}
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 5. Student Reviews & Testimonials Section */}
      <section className="py-14 sm:py-16 bg-white border-b border-[#0057B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#0057B8] uppercase tracking-widest border border-[#0057B8] px-3.5 py-1.5 rounded-md inline-block">
              PHẢN HỒI HỌC VIÊN
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight">
              Cảm Nhận Học Viên Về Khóa Học
            </h2>
            <p className="text-[#0057B8] text-xs sm:text-sm">
              Chia sẻ thực tế từ các bạn đã tham gia khóa học và đạt chứng chỉ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {courseReviews.map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-white border border-[#0057B8] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-[#0057B8] fill-[#0057B8]" />
                    ))}
                  </div>
                  {rev.score && (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-black border border-[#0057B8] text-[#0057B8]">
                      {rev.score}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#0057B8] italic leading-relaxed">
                  &ldquo;{rev.content}&rdquo;
                </p>
                <div className="pt-2 border-t border-[#0057B8] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0057B8]">{rev.name}</span>
                  <span className="text-[#0057B8]">{rev.universityOrCompany}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions (Course FAQs) */}
      <section className="py-14 sm:py-16 bg-white border-b border-[#0057B8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#0057B8] uppercase tracking-widest border border-[#0057B8] px-3.5 py-1.5 rounded-md inline-block">
              HỎI ĐÁP KHÓA HỌC
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight">
              Giải Đáp Thắc Mắc Thường Gặp
            </h2>
          </div>

          <div className="space-y-4">
            {courseFaqs.map((faq, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-xl bg-white border border-[#0057B8] space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-[#0057B8] flex items-center gap-2">
                  <HelpCircle size={16} className="text-[#0057B8] shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#0057B8] leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Related Courses Section */}
      {relatedCourses.length > 0 && (
        <section className="py-14 sm:py-16 bg-white border-b border-[#0057B8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-black text-[#0057B8] uppercase tracking-widest border border-[#0057B8] px-3.5 py-1.5 rounded-md inline-block">
                GỢI Ý THÊM
              </span>
              <h2 className="text-2xl font-black text-[#0057B8] tracking-tight">
                Khóa Học Liên Quan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCourses.map((rel) => (
                <div key={rel.id} className="p-6 rounded-2xl bg-white border border-[#0057B8] space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase text-[#0057B8] border border-[#0057B8] px-2 py-0.5 rounded-md inline-block">
                      {rel.duration}
                    </span>
                    <h3 className="text-base font-bold text-[#0057B8]">{rel.title}</h3>
                    <p className="text-xs text-[#0057B8] line-clamp-2">{rel.description}</p>
                  </div>
                  <div className="pt-3 border-t border-[#0057B8] flex items-center justify-between">
                    <span className="font-black text-[#0057B8] text-sm">{rel.price}</span>
                    <Link
                      href={`/khoa-hoc/${rel.id}`}
                      className="text-xs font-bold text-[#0057B8] hover:underline flex items-center gap-1"
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
      <section id="dang-ky" className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#0057B8] uppercase tracking-widest border border-[#0057B8] px-3.5 py-1.5 rounded-md inline-block">
              ĐĂNG KÝ TƯ VẤN & XẾP LỚP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight">
              Đăng Ký Khóa Học: {course.title}
            </h2>
            <p className="text-[#0057B8] text-xs sm:text-sm">
              Để lại thông tin bên dưới, giảng viên Tin Học Gen Z sẽ liên hệ tư vấn lộ trình phù hợp cho bạn.
            </p>
          </div>

          <ContactForm defaultCourse={course.title} />
        </div>
      </section>
    </div>
  );
}
