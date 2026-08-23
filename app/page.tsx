import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Award, School, Star } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import UniversityPathway from "@/components/UniversityPathway";
import HallOfFame from "@/components/HallOfFame";
import GuaranteePolicy from "@/components/GuaranteePolicy";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";

export default function Home() {
  // Select only the TOP 3 flagship courses to keep homepage ultra-clean & focused
  const featuredCourses = coursesData.filter((c) => 
    ["mos-master-combo", "mos-2019", "ic3-gs6"].includes(c.id)
  );

  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. Hero & Value Proposition */}
      <HeroSection />

      {/* 2. Key Trust Metrics */}
      <StatsSection />

      {/* 3. University Exit Standard Interactive Pathway (DNTU, LHU, UEH...) */}
      <UniversityPathway />

      {/* 4. Flagship Courses Section (Curated Top 3 Best-Sellers) */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#f8fafc] via-slate-50/60 to-[#f8fafc] border-y border-slate-100/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider">
              <Sparkles size={12} className="text-cyan-500" />
              <span>Chương Trình Đào Tạo Trọng Tâm</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight font-display">
              Khóa Học MOS & IC3 <span className="text-blue-600">Được Đăng Ký Nhiều Nhất</span>
            </h2>
            
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Lộ trình tinh gọn 3 - 9 buổi, cam kết đỗ chuẩn đầu ra Đại học và cấp chứng chỉ quốc tế Certiport Hoa Kỳ ngay lần thi đầu tiên.
            </p>
          </div>

          {/* Clean 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {featuredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
          
          {/* Secondary CTA link to full catalog */}
          <div className="mt-14 text-center">
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-black text-xs uppercase tracking-wider border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <span>Xem Tất Cả Khóa Học & Bảng Học Phí Chi Tiết</span>
              <ArrowRight size={14} className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Hall of Fame - Real Student Certificates (DNTU, LHU, UEH) */}
      <HallOfFame />

      {/* 6. 4 Golden Pass Guarantees (Written Contract) */}
      <GuaranteePolicy />

      {/* 7. Strategic Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cyan-300">
            <School size={14} />
            <span>Tự Tin Đạt Chuẩn Đầu Ra Xét Tốt Nghiệp Sớm</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug max-w-2xl mx-auto font-display">
            Sẵn Sàng Nhận Bằng MOS & IC3 Với Điểm Tuyệt Đối?
          </h2>
          
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Đăng ký ngay hôm nay để nhận quyền truy cập phần mềm thi thử bản quyền Certiport và ưu đãi nhóm giảm tới 30% học phí!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-black tracking-wide uppercase bg-blue-600 hover:bg-blue-500 text-white shadow-xl transition-all duration-300 group hover:-translate-y-0.5"
            >
              <span>Đăng Ký Tư Vấn & Xếp Lớp</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            
            <a
              href="https://zalo.me/0332298065"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-black tracking-wide uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
            >
              Chat Trực Tiếp Qua Zalo
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
