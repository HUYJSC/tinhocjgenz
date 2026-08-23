import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Target, MessageSquare, ShieldCheck, Award, School } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import UniversityPathway from "@/components/UniversityPathway";
import ScheduleSection from "@/components/ScheduleSection";
import CourseCard from "@/components/CourseCard";
import TestimonialCard from "@/components/TestimonialCard";
import { coursesData, testimonialsData, valuesData } from "@/data/mockData";

export default function Home() {
  // Helper to map valuesData icon strings to React nodes
  const getValueIcon = (name: string) => {
    switch (name) {
      case "Zap":
        return <Zap size={22} className="text-blue-600 group-hover:scale-110 smooth-transition" />;
      case "Target":
        return <Target size={22} className="text-cyan-500 group-hover:scale-110 smooth-transition" />;
      case "MessageCircle":
        return <MessageSquare size={22} className="text-indigo-500 group-hover:scale-110 smooth-transition" />;
      case "ShieldCheck":
        return <ShieldCheck size={22} className="text-emerald-500 group-hover:scale-110 smooth-transition" />;
      default:
        return <Award size={22} className="text-blue-600" />;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Stats Section */}
      <StatsSection />

      {/* 3. University Exit Standard Interactive Pathway (DNTU Benchmark) */}
      <UniversityPathway />

      {/* 4. Featured Courses Matrix */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-[#f8fafc] via-slate-50/50 to-[#f8fafc] border-b border-slate-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider">
              <Sparkles size={12} className="text-cyan-500" />
              <span>Chương Trình Đào Tạo Chuẩn Quốc Tế</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Khóa Học MOS, IC3 & <span className="text-blue-600">Tin Học Thực Chiến</span>
            </h2>
            
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Lộ trình tinh gọn, cam kết bao đỗ chứng chỉ quốc tế Certiport và làm chủ kỹ năng xử lý dữ liệu doanh nghiệp trong thời gian ngắn nhất.
            </p>
          </div>

          {/* Grid of Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.slice(0, 6).map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-700 transition-colors duration-300 group"
            >
              Xem toàn bộ chương trình và bảng học phí chi tiết
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Real-Time Schedule & Exam Batches */}
      <ScheduleSection />

      {/* 6. Why Choose PH Digital Education */}
      <section className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-extrabold text-xs uppercase tracking-wider">
              <ShieldCheck size={14} className="text-blue-600" />
              <span>Giá Trị Khác Biệt Cốt Lõi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Tại Sao Hơn 5.000+ Sinh Viên & Người Đi Làm <br className="hidden sm:inline" />
              Lựa Chọn <span className="text-blue-600">PH Digital Education?</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Chúng tôi thay đổi hoàn toàn phương pháp dạy tin học truyền thống bằng sự kết hợp giữa giáo trình chuẩn Certiport Hoa Kỳ, phần mềm thi thử độc quyền và giảng viên kèm cặp 1:1 sát sao.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuesData.map((val) => (
              <div
                key={val.id}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 hover:border-blue-500/25 shadow-premium hover:shadow-premium-hover transition-all duration-500 group flex flex-col items-start gap-6"
              >
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-blue-600 group-hover:text-white shrink-0 transition-all duration-500 ease-out text-slate-800">
                  {getValueIcon(val.iconName)}
                </div>
                <div className="space-y-3 flex-grow flex flex-col justify-between">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
                    {val.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-[#f8fafc] to-white border-t border-slate-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Cảm Nhận Từ <span className="text-blue-600">Học Viên Tốt Nghiệp</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Sự hài lòng và kết quả điểm số ấn tượng của sinh viên DNTU, Lạc Hồng, UEH... là minh chứng rõ nhất cho chất lượng đào tạo tại PH Digital Education.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonialsData.map((testi) => (
              <TestimonialCard key={testi.id} testimonial={testi} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. High-Converting Bottom CTA Banner */}
      <section className="py-20 md:py-28 bg-gradient-to-tr from-blue-950 via-blue-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cyan-300">
            <School size={14} />
            <span>Tự Tin Đạt Chuẩn Đầu Ra Xét Tốt Nghiệp Sớm</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] max-w-3xl mx-auto">
            Sẵn Sàng Cầm Trên Tay Chứng Chỉ <br className="hidden sm:inline" />
            MOS / IC3 Với Điểm Số Tuyệt Đối?
          </h2>
          
          <p className="text-blue-200/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Đăng ký ngay hôm nay để nhận trọn bộ tài khoản phần mềm thi thử bản quyền Certiport và ưu đãi học phí lên tới 30% khi đăng ký theo nhóm!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-black tracking-wide uppercase bg-white text-slate-900 hover:bg-slate-50 shadow-2xl transition-all duration-300 group hover:-translate-y-0.5"
            >
              Đăng Ký Tư Vấn & Giữ Chỗ
              <ArrowRight size={15} className="text-blue-600 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
            
            <a
              href="https://zalo.me/0332298065"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-black tracking-wide uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
            >
              Chat Trực Tiếp Qua Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
