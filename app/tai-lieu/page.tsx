import { Metadata } from "next";
import ResourceHub from "@/components/ResourceHub";
import { BookOpen, Sparkles, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Kho Tài Liệu & Bộ Đề Thi MOS / IC3 Miễn Phí",
  description: "Tải trọn bộ 50+ đề thi thử MOS 2019, IC3 GS6 bám sát đề thi thật Certiport, tài liệu phím tắt và bài tập thực hành Excel hoàn toàn miễn phí.",
  path: "/tai-lieu",
});

export default function ResourcesPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50/40">

      {/* 1. Header Banner */}
      <section className="bg-white pt-24 pb-16 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-emerald-500/10 via-cyan-400/10 to-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-emerald-800">
            <BookOpen size={13} className="text-emerald-600" />
            PH DIGITAL EDUCATION • THƯ VIỆN HỌC LIỆU MỞ
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-display">
            Kho Tài Liệu & Đề Thi MOS / IC3 Miễn Phí
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Tuyển tập đầy đủ các bộ đề thi thử bám sát đề thật, cẩm nang phím tắt văn phòng và file Excel mẫu ứng dụng thực tế. Tải về học tập hoàn toàn miễn phí.
          </p>
        </div>
      </section>

      {/* 2. Resources Library Section */}
      <ResourceHub />

    </div>
  );
}
