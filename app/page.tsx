import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Target, MessageSquare, ShieldCheck } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
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
        return <Zap size={22} className="text-blue-600" />;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Section (Stats) */}
      <StatsSection />

      {/* 3. Featured Courses Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-[#f8fafc] via-slate-50/50 to-[#f8fafc] border-b border-slate-100/60 relative">
        {/* Subtle decorative blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider">
              <Sparkles size={12} className="text-cyan-500" />
              <span>Chương Trình Học Chất Lượng Cao</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Khóa Học Tin Học Văn Phòng Thực Chiến
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Các khóa học được thiết kế tinh gọn, dễ hiểu nhất dành cho học sinh, sinh viên và người đi làm. Lựa chọn khóa học phù hợp để nâng cấp bản thân ngay hôm nay!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-700 transition-colors duration-300 group"
            >
              Xem chi tiết tất cả khóa học
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Sự Khác Biệt Tại Thầy Giáo GenZ
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Chúng tôi thay đổi hoàn toàn cách tiếp cận tin học văn phòng khô khan truyền thống, mang đến trải nghiệm học tập tràn đầy cảm hứng và hiệu quả vượt bậc.
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

      {/* 5. Testimonials Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-[#f8fafc] to-white border-t border-slate-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Học Viên Nói Gì Về Chúng Tôi
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Sự hài lòng và thành công của học viên là động lực lớn nhất để Thầy giáo GenZ không ngừng hoàn thiện chất lượng giảng dạy mỗi ngày.
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

      {/* 6. High-Converting Bottom CTA Banner */}
      <section className="py-20 md:py-28 bg-gradient-to-tr from-blue-950 via-blue-900 to-slate-950 text-white relative overflow-hidden">
        {/* Subtle backdrop blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] max-w-3xl mx-auto">
            Đột Phá Kỹ Năng Văn Phòng <br className="hidden sm:inline" />
            Và Tăng Tốc Công Việc Của Bạn Ngay Hôm Nay!
          </h2>
          <p className="text-blue-200/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-bold">
            Gia nhập cộng đồng hơn 500+ học viên đã bứt phá thành công cùng Thầy giáo GenZ. Đừng để kỹ năng văn phòng hạn chế bước tiến sự nghiệp của bạn!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-black tracking-wide uppercase bg-white text-slate-900 hover:bg-slate-50 shadow-2xl transition-all duration-300 group hover:-translate-y-0.5"
            >
              Đăng ký tư vấn miễn phí
              <ArrowRight size={15} className="text-blue-600 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-black tracking-wide uppercase text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-300"
            >
              Xem chi tiết các khóa học
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
