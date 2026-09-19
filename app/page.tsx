import NextImage from "next/image";
import Link from "next/link";
import { ArrowRight, School, BookOpen, Clock, ChevronRight, CheckCircle2, ShieldCheck, Award } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import StatsSection from "@/components/StatsSection";
import HomeTabbedHub from "@/components/HomeTabbedHub";
import ScheduleSection from "@/components/ScheduleSection";
import ContactForm from "@/components/ContactForm";
import { BLOG_POSTS } from "@/data/blogData";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function Home() {
  const latestGuides = BLOG_POSTS.slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. Hero Section & Brand Value */}
      <HeroSection />

      {/* 2. Focus Training Categories */}
      <CategoryCards />

      {/* 3. Featured Courses */}
      <FeaturedCourses />

      {/* 4. Interactive Tabbed Hub (Lộ Trình | Khóa Học | Bảng Vàng | Cam Kết) */}
      <section id="khoa-hoc-trong-tam">
        <HomeTabbedHub />
      </section>

      {/* 5. Additional Key Trust Metrics */}
      <StatsSection />

      {/* 4. Practical Certiport Diagnostic & Mock Exam Showcase */}
      <section className="py-14 sm:py-18 bg-[#F4F8FD] border-y border-[#E5EEF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-[#E5EEF8] p-8 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F8FD] border border-[#E5EEF8] text-[#0057B8] text-xs font-bold uppercase tracking-wider">
                  <Award size={13} className="text-[#0057B8]" />
                  KIỂM TRA TRÌNH ĐỘ MIỄN PHÍ • 0 ĐỒNG
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-[#0B2545]">
                  Thi Thử Certiport Online: Đo Lường Năng Lực Trong 5 Phút
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Chưa biết mình đang ở mức điểm nào? Hãy làm ngay bài mini-test 10 câu trắc nghiệm & thực hành bám sát cấu trúc đề thi chính thức của IIG. Hệ thống chấm điểm tự động và chỉ rõ từng lỗ hổng kỹ năng.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 size={16} className="text-[#0057B8] shrink-0" />
                    <span>Đề chuẩn khảo thí Certiport 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 size={16} className="text-[#0057B8] shrink-0" />
                    <span>Chấm điểm tự động thang 1000</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 size={16} className="text-[#0057B8] shrink-0" />
                    <span>Gợi ý lộ trình ôn cấp tốc tối ưu</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  href="/thi-thu"
                  className="w-full min-h-12 py-3.5 px-6 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Bắt Đầu Thi Thử Miễn Phí</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/tai-lieu"
                  className="w-full min-h-12 py-3.5 px-6 rounded-xl bg-[#F4F8FD] hover:bg-white text-[#0B2545] hover:text-[#0057B8] font-bold text-xs sm:text-sm border border-[#E5EEF8] transition-all text-center flex items-center justify-center gap-2"
                >
                  <BookOpen size={15} className="text-[#0057B8]" />
                  <span>Tải Bộ Đề Mẫu PDF</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. Upcoming Class Batches & Schedule */}
      <section id="lich-khai-giang">
        <ScheduleSection />
      </section>

      {/* 6. Latest Educational Guides & Knowledge Hub */}
      <section className="py-10 sm:py-14 lg:py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs uppercase tracking-wider mb-2">
                <BookOpen size={12} className="text-blue-600" />
                CẨM NANG & KHO TRI THỨC
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
                Bí Quyết Luyện Thi & Thủ Thuật Mới Nhất
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider group"
            >
              <span>Xem Tất Cả Bài Viết</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {latestGuides.map((guide) => (
              <article
                key={guide.slug}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-500/40 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <Link href={`/blog/${guide.slug}`} className="block relative h-44 overflow-hidden">
                    <NextImage
                      src={guide.coverImage}
                      sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) 50vw, 33vw"
                      alt={guide.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white">
                      {guide.categoryName}
                    </span>
                  </Link>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Clock size={11} />
                      <span>{guide.readTime}</span>
                    </div>

                    <Link href={`/blog/${guide.slug}`} className="block group/title">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover/title:text-blue-600 transition-colors line-clamp-2 leading-snug font-display">
                        {guide.title}
                      </h3>
                    </Link>

                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                      {guide.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/40 text-xs">
                  <span className="text-xs font-bold text-slate-600">{guide.author.name}</span>
                  <Link
                    href={`/blog/${guide.slug}`}
                    className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
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

      {/* 7. Direct Registration & Lead Consultation Form Section */}
      <section id="dang-ky-tu-van" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Award size={13} className="text-blue-600" />
              ĐĂNG KÝ TƯ VẤN & XẾP LỚP
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
              Nhận Lộ Trình Ôn Thi & Ưu Đãi Nhóm Đến 30%
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-normal">
              Điền thông tin bên dưới để giảng viên Tin Học Gen Z kiểm tra chuẩn đầu ra theo trường của bạn, xếp ca học phù hợp và giữ suất ưu đãi học phí trọn gói.
            </p>
          </div>

          <ContactForm />

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-center">
            <div className="p-4 rounded-xl bg-white border border-[#E5EEF8] shadow-xs space-y-1">
              <ShieldCheck size={20} className="text-[#0057B8] mx-auto" />
              <h4 className="text-xs font-bold text-[#0B2545]">Cam Kết Bao Đỗ 100%</h4>
              <p className="text-xs text-slate-500">Tài trợ học lại hoàn toàn miễn phí nếu chưa đạt điểm chuẩn</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E5EEF8] shadow-xs space-y-1">
              <School size={20} className="text-[#0057B8] mx-auto" />
              <h4 className="text-xs font-bold text-[#0B2545]">Chuẩn Khảo Thí Quốc Tế</h4>
              <p className="text-xs text-slate-500">Cấp tài khoản máy ảo luyện đề Certiport không giới hạn</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E5EEF8] shadow-xs space-y-1">
              <Clock size={20} className="text-[#0057B8] mx-auto" />
              <h4 className="text-xs font-bold text-[#0B2545]">Hỗ Trợ 1:1 Tận Tâm</h4>
              <p className="text-xs text-slate-500">Giảng viên Master Trainer kèm cặp và sửa bài trực tiếp</p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Strategic Bottom CTA Floating Banner */}
      <section className="py-14 sm:py-20 bg-white border-t border-[#E5EEF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#E5EEF8] bg-gradient-to-b from-[#F4F8FD] to-white p-8 text-center sm:p-14 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5EEF8] text-xs font-bold text-[#0057B8] shadow-xs">
                <Award size={14} className="text-[#0057B8]" />
                <span>CHỨNG CHỈ QUỐC TẾ • TÀI TRỢ HỌC LẠI 0Đ</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-[#0B2545]">
                Sẵn Sàng Làm Chủ Tin Học & Nhận Bằng MOS / IC3 Quốc Tế?
              </h2>

              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
                Đăng ký ngay hôm nay để nhận tài khoản phần mềm thi thử bản quyền Certiport và ưu đãi nhóm giảm tới 30% học phí trọn gói!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <a
                  href="#dang-ky-tu-van"
                  className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-[#0057B8] text-white hover:bg-[#003F88] shadow-sm transition-colors cursor-pointer"
                >
                  <span>Đăng Ký Tư Vấn & Xếp Lớp</span>
                  <ArrowRight size={15} />
                </a>

                <a
                  href={SITE_CONFIG.contact.zaloUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-[#0B2545] bg-white hover:bg-[#F4F8FD] border border-[#E5EEF8] transition-colors"
                >
                  Chat Trực Tiếp Qua Zalo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
