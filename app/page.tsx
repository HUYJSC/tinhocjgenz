import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Award, School } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import HomeTabbedHub from "@/components/HomeTabbedHub";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. Hero Section & Brand Value */}
      <HeroSection />

      {/* 2. Key Trust Metrics */}
      <StatsSection />

      {/* 3. Interactive Anti-Long-Scroll Tabbed Hub (Chuẩn Đầu Ra | Khóa Học | Bảng Vàng | Cam Kết) */}
      <HomeTabbedHub />

      {/* 4. Strategic Bottom CTA Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
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
