import MockExamQuiz from "@/components/MockExamQuiz";
import { Sparkles, HelpCircle, CheckCircle2, ShieldCheck } from "lucide-react";

export default function MockExamPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50/40">

      {/* 1. Header Banner */}
      <section className="bg-white pt-24 pb-16 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-700">
            <Sparkles size={13} className="text-amber-500" />
            CÔNG CỤ TEST ĐẦU VÀO MIỄN PHÍ • CHUẨN CERTIPORT
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-display">
            Thi Thử MOS & IC3 Online Miễn Phí
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Kiểm tra ngay trình độ tin học của bạn trong 5 phút. Xem ngay dự đoán khả năng đạt chuẩn đầu ra Đại học (DNTU, Lạc Hồng, UEH...) và nhận lộ trình cấp tốc bao đỗ 100%.
          </p>
        </div>
      </section>

      {/* 2. Interactive Mock Quiz Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MockExamQuiz />
        </div>
      </section>

      {/* 3. Guidelines & Benefits */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">1</div>
              <h4 className="font-black text-slate-900 text-base">Đề Thi Sát 99% Đề Thật</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Ngân hàng câu hỏi trích từ các kỳ thi khảo thí IIG/Certiport chính thức năm 2026.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-black">2</div>
              <h4 className="font-black text-slate-900 text-base">Biết Điểm & Giải Thích Ngay</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Hệ thống tự động chấm điểm và chỉ rõ từng bẫy thi thường khiến thí sinh mất điểm oan.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">3</div>
              <h4 className="font-black text-slate-900 text-base">Tư Vấn Lộ Trình 1:1 Miễn Phí</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Giảng viên MOS Master sẽ trực tiếp xem kết quả và đưa ra lộ trình ôn cấp tốc 3 buổi cho bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
