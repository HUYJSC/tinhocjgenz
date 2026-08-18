import PricingTable from "@/components/PricingTable";
import { HelpCircle, Star, Sparkles } from "lucide-react";

export default function PricingPage() {
  const faqs = [
    {
      q: "Tôi có được giảm học phí khi đăng ký nhiều khóa học không?",
      a: "Có! Khi đăng ký Combo từ 2 khóa học trở lên (ví dụ: Excel nâng cao + Luyện thi MOS), bạn sẽ được giảm trực tiếp 10% trên tổng giá trị học phí."
    },
    {
      q: "Giá dịch vụ cài Win và Office đã bao gồm bản quyền chưa?",
      a: "Giá dịch vụ đã bao gồm việc cài đặt, kích hoạt đầy đủ tính năng sử dụng ổn định trọn đời và hỗ trợ fix lỗi phát sinh miễn phí cho bạn."
    },
    {
      q: "Phương thức thanh toán học phí như thế nào?",
      a: "Bạn có thể thanh toán qua chuyển khoản ngân hàng hoặc ví điện tử (Momo/ZaloPay). Bạn có thể đóng 100% học phí hoặc chia làm 2 đợt đóng đối với khóa học dài hạn."
    },
    {
      q: "Tôi có thể yêu cầu cài đặt các phần mềm đặc thù chuyên ngành khác không?",
      a: "Hoàn toàn được! Bên cạnh các phần mềm thiết kế và Office thông dụng, Thầy giáo GenZ hỗ trợ tìm kiếm, cài đặt và cấu hình tất cả các phần mềm học tập, làm việc đặc thù khác (SPSS, Matlab, Solidworks, Eclipse...) theo đúng yêu cầu cấu hình máy của bạn."
    }
  ];

  return (
    <div className="flex flex-col w-full bg-slate-50/30">
      
      {/* 1. Header Banner */}
      <section className="bg-white pt-20 pb-14 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-600">
            Bảng Giá Dịch Vụ
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Báo Giá Khóa Học & Dịch Vụ IT
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Bảng giá minh bạch, tối ưu chi phí dành riêng cho học sinh sinh viên. Cam kết không phát sinh bất kỳ khoản chi phí phụ nào khác.
          </p>
        </div>
      </section>

      {/* 2. Main Table Section */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingTable />
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="py-16 bg-white border-t border-slate-100/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20 space-y-3">
            <div className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-600">
              <HelpCircle size={13} />
              <span>Góc Giải Đáp</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-none">Câu Hỏi Thường Gặp</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-lg mx-auto">
              Một số thắc mắc phổ biến của các bạn học viên và khách hàng trước khi đăng ký dịch vụ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-3 bg-slate-50/50 p-6 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group flex flex-col justify-between">
                <h3 className="font-black text-slate-900 text-sm leading-snug flex gap-2.5">
                  <div className="p-1 bg-white border border-slate-100 rounded-lg shadow-sm shrink-0 text-cyan-500 group-hover:scale-110 smooth-transition">
                    <Star size={14} fill="currentColor" />
                  </div>
                  {faq.q}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pl-7.5">
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
