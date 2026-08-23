import PricingTable from "@/components/PricingTable";
import { HelpCircle, Star, Sparkles, ShieldCheck, Users, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const faqs = [
    {
      q: "Nếu tôi thi không đạt chuẩn đầu ra thì có được học lại không?",
      a: "Hoàn toàn miễn phí! PH Digital Education cam kết bao đỗ 100%. Nếu không đạt điểm chuẩn trong kỳ thi Certiport chính thức, bạn sẽ được kèm cặp và học lại hoàn toàn miễn phí cho đến khi cầm chứng chỉ trên tay."
    },
    {
      q: "Chính sách giảm giá theo nhóm sinh viên áp dụng như thế nào?",
      a: "Nhóm từ 3 bạn được giảm ngay 15% học phí/bạn; nhóm từ 5 bạn giảm 25% học phí; nhóm từ 8 bạn trở lên giảm tới 35% - 40% học phí trọn gói kèm tặng trọn bộ phần mềm thi thử."
    },
    {
      q: "Giá dịch vụ cài Win và Office đã bao gồm bản quyền chưa?",
      a: "Giá dịch vụ đã bao gồm việc cài đặt, kích hoạt đầy đủ tính năng sử dụng ổn định trọn đời và hỗ trợ fix lỗi phát sinh miễn phí cho bạn qua Ultraviewer/Anydesk."
    },
    {
      q: "Thời gian ôn thi cấp tốc 3 buổi có kịp cho đợt xét tốt nghiệp không?",
      a: "Rất kịp thời! Giáo trình được thiết kế cô đọng 100% dạng đề thi thật Certiport. 99.4% học viên hoàn thành khóa 3 buổi đều vượt qua kỳ thi với số điểm trên 850/1000."
    }
  ];

  return (
    <div className="flex flex-col w-full bg-slate-50/30">
      
      {/* 1. Header Banner */}
      <section className="bg-white pt-20 pb-14 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-700">
            <Award size={13} className="text-blue-600" />
            PH DIGITAL EDUCATION • HỌC PHÍ MINH BẠCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-display">
            Bảng Giá Khóa Học & Luyện Thi MOS / IC3
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Học phí tối ưu dành cho sinh viên và người đi làm. Cam kết trọn gói, không phát sinh chi phí, bảo hành đầu ra thi đỗ 100%.
          </p>
        </div>
      </section>

      {/* 2. Group Promo Highlight Banner */}
      <section className="py-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Users size={24} className="text-cyan-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black leading-tight">
                Ưu Đãi Đăng Ký Theo Nhóm: Giảm Sốc 15% - 40% Học Phí
              </h3>
              <p className="text-xs text-blue-100 mt-0.5">
                Càng đông càng rẻ - Cùng bạn bè đạt chuẩn đầu ra xét tốt nghiệp sớm!
              </p>
            </div>
          </div>
          <Link
            href="/lien-he"
            className="shrink-0 px-6 py-2.5 rounded-full bg-white text-blue-900 font-black text-xs uppercase tracking-wider hover:bg-slate-100 shadow-lg transition-all"
          >
            Nhận Mã Giảm Nhóm
          </Link>
        </div>
      </section>

      {/* 3. Main Table Section */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingTable />
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="py-16 bg-white border-t border-slate-100/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-700">
              <HelpCircle size={13} />
              <span>Góc Giải Đáp</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-none">Câu Hỏi Thường Gặp</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-lg mx-auto">
              Giải đáp các thắc mắc phổ biến về kỳ thi Certiport, chuẩn đầu ra đại học và hình thức học tại PH Digital Education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-3 bg-slate-50/70 p-6 rounded-3xl border border-slate-200/70 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover flex flex-col justify-between">
                <h3 className="font-black text-slate-900 text-sm leading-snug flex items-start gap-2.5">
                  <div className="p-1 bg-white border border-slate-200/60 rounded-lg shadow-sm shrink-0 text-cyan-500 mt-0.5">
                    <Star size={14} fill="currentColor" />
                  </div>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
