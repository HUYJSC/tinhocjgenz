import Link from "next/link";
import { ArrowRight, BookOpen, Clock, ChevronRight, FileText, Target } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AudienceSelector from "@/components/AudienceSelector";
import CourseCard from "@/components/CourseCard";
import ContinueLearningWidget from "@/components/ContinueLearningWidget";
import { coursesData } from "@/data/mockData";
import { BLOG_POSTS } from "@/data/blogData";

export default function Home() {
  // 3 core featured courses directly from catalog (no nested tabs per IA-02 & Spec 4.2)
  const featuredCourses = coursesData.slice(0, 3);
  const latestGuides = BLOG_POSTS.slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-white text-[#0057B8]">
      
      {/* 1. Hero Section (Spec 4.2) */}
      <HeroSection />

      {/* 1.5. Dynamic Resume Learning Widget */}
      <ContinueLearningWidget />

      {/* 2. Featured Courses: Direct display of 3 core programs without nested tabs (IA-02) */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#0057B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#0057B8] text-[#0057B8] text-[10px] font-black uppercase tracking-wider mb-2">
                <BookOpen size={13} className="text-[#0057B8]" />
                CHƯƠNG TRÌNH TRỌNG ĐIỂM
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight font-display">
                Khóa học nổi bật
              </h2>
            </div>

            <Link
              href="/khoa-hoc"
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#0057B8] hover:underline uppercase tracking-wider"
            >
              <span>Xem tất cả khóa học</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {featuredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Choose Learning Target / Audience Selector (Spec 4.2 & IA-02) */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#0057B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#0057B8] text-[#0057B8] text-[10px] font-black uppercase tracking-wider">
              LỘ TRÌNH THEO MỤC TIÊU
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight font-display">
              Chọn mục tiêu học tập của bạn
            </h2>
            <p className="text-[#0057B8] text-xs sm:text-sm">
              Lựa chọn đúng đối tượng giúp bạn tiết kiệm thời gian và tiếp cận chương trình phù hợp nhất.
            </p>
          </div>

          <AudienceSelector />
        </div>
      </section>

      {/* 4. Experience Before Enrolling: 1 Trial Lesson + 1 Mock Exam Entry (Spec 4.2) */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#0057B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#0057B8] text-[#0057B8] text-[10px] font-black uppercase tracking-wider">
              TRẢI NGHIỆM THỰC TẾ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight font-display">
              Trải nghiệm trước khi đăng ký
            </h2>
            <p className="text-[#0057B8] text-xs sm:text-sm">
              Học thử bài giảng tương tác và làm đề thi thử trực tuyến hoàn toàn miễn phí.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Entry 1: Học thử bài đầu tiên */}
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#0057B8] bg-white flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl border border-[#0057B8] flex items-center justify-center">
                  <BookOpen size={24} className="text-[#0057B8]" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0057B8]">
                  Học thử bài giảng tương tác
                </h3>
                <p className="text-xs sm:text-sm text-[#0057B8] leading-relaxed">
                  Làm quen với giao diện học tập chuẩn, nắm bắt phương pháp giải các Task thực tế môn Word & Excel kèm bài tập trắc nghiệm.
                </p>
              </div>

              <Link
                href="/khoa-hoc/mos-master-combo/bai-hoc/word-lesson-1"
                className="min-h-[44px] py-2.5 px-5 rounded-xl bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Vào học thử ngay</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Entry 2: Thi thử trực tuyến */}
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#0057B8] bg-white flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl border border-[#0057B8] flex items-center justify-center">
                  <Target size={24} className="text-[#0057B8]" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0057B8]">
                  Thi thử trực tuyến MOS / IC3
                </h3>
                <p className="text-xs sm:text-sm text-[#0057B8] leading-relaxed">
                  Kiểm tra kiến thức với bộ câu hỏi chuẩn định dạng quốc tế, nhận kết quả và dự đoán điểm Certiport tức thì.
                </p>
              </div>

              <Link
                href="/thi-thu"
                className="min-h-[44px] py-2.5 px-5 rounded-xl bg-white hover:bg-[#0057B8] text-[#0057B8] hover:text-white border border-[#0057B8] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Làm bài thi thử 5 phút</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Training Proof & Key Verified Metrics (Spec 4.2 & UI-03) */}
      <StatsSection />

      {/* 6. Latest Guides & Knowledge Hub (Spec 4.2: 3 articles, short excerpts, all-link) */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#0057B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#0057B8] text-[#0057B8] font-bold text-[10px] uppercase tracking-wider mb-2">
                <FileText size={12} className="text-[#0057B8]" />
                CẨM NANG & THỦ THUẬT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight font-display">
                Bài viết & mẹo thi mới nhất
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#0057B8] hover:underline uppercase tracking-wider"
            >
              <span>Xem tất cả bài viết</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {latestGuides.map((guide) => (
              <article
                key={guide.slug}
                className="bg-white rounded-2xl border border-[#0057B8] flex flex-col justify-between overflow-hidden text-[#0057B8]"
              >
                <div>
                  <Link href={`/blog/${guide.slug}`} className="block relative h-44 overflow-hidden border-b border-[#0057B8]">
                    <img
                      src={guide.coverImage}
                      alt={guide.title}
                      width="1000"
                      height="560"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-[#0057B8] text-white">
                      {guide.categoryName}
                    </span>
                  </Link>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] font-semibold">
                      <Clock size={11} />
                      <span>{guide.readTime}</span>
                    </div>

                    <Link href={`/blog/${guide.slug}`} className="block">
                      <h3 className="text-sm sm:text-base font-black text-[#0057B8] hover:underline line-clamp-2 leading-snug font-display">
                        {guide.title}
                      </h3>
                    </Link>

                    <p className="text-xs line-clamp-2 leading-relaxed">
                      {guide.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-[#0057B8] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold">{guide.author.name}</span>
                  <Link
                    href={`/blog/${guide.slug}`}
                    className="font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Chi tiết</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Advisory Registration Form Section (Spec 4.2) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#0057B8] text-[#0057B8] text-[10px] font-black uppercase tracking-wider">
            TƯ VẤN LỘ TRÌNH
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0057B8] tracking-tight font-display">
            Sẵn sàng làm chủ tin học & thi đạt chứng chỉ?
          </h2>
          <p className="text-[#0057B8] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Đăng ký để được giảng viên trực tiếp tư vấn xếp lớp, hướng dẫn thủ tục đăng ký thi và nhận ưu đãi học phí!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/lien-he"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-xs font-black tracking-wide uppercase bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] transition-colors"
            >
              <span>Đăng ký tư vấn lộ trình</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/bang-gia"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-xs font-black tracking-wide uppercase bg-white hover:bg-[#0057B8] text-[#0057B8] hover:text-white border border-[#0057B8] transition-colors"
            >
              <span>Xem học phí công khai</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
