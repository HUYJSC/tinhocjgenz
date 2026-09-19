"use client";

import { FileText, ArrowRight, Sparkles } from "lucide-react";

export default function ExamGuide() {
  const steps = [
    {
      step: "01",
      title: "Tạo Tài Khoản Khảo Thí Certiport Quốc Tế",
      desc: "Đăng ký tài khoản chính thức tại Certiport.com bằng Email và thông tin CCCD/Hộ chiếu. Giảng viên Tin Học Gen Z sẽ hướng dẫn bạn liên kết mã thí sinh và tài khoản sinh viên đúng quy định.",
      tips: "Lưu ý: Tên đăng ký phải khớp 100% với CCCD để chứng chỉ quốc tế được trường ĐH công nhận."
    },
    {
      step: "02",
      title: "Lựa Chọn Lịch Thi & Hội Đồng Khảo Thí IIG",
      desc: "Chọn đợt thi phù hợp với lịch xét tốt nghiệp của trường bạn (thi tại điểm thi IIG TP.HCM, Đồng Nai hoặc các trường ĐH liên kết). Trung tâm hỗ trợ thủ tục giữ suất thi Certiport nhanh chóng.",
      tips: "Nên đăng ký trước ngày thi tối thiểu 5 - 7 ngày để hoàn thiện danh sách báo danh."
    },
    {
      step: "03",
      title: "Luyện Đề Máy Ảo & Thực Chiến Phòng Thi",
      desc: "Hoàn thành 3 - 5 buổi ôn luyện trọng tâm trên phần mềm thi thử mô phỏng giống 99% phần mềm thi thật của Certiport. Nắm vững phím tắt, mẹo giải bẫy câu hỏi và cách phân bổ 50 phút làm bài.",
      tips: "Được làm test thử không giới hạn số lần cho đến khi điểm thi thử đạt trên 850/1000 điểm."
    },
    {
      step: "04",
      title: "Nhận Bảng Điểm & Nộp Chứng Chỉ Về Trường",
      desc: "Biết kết quả điểm số ngay khi bấm nộp bài thi (Passed/Failed). Chứng chỉ điện tử (Digital Badge & PDF có mã xác thực Certiport toàn cầu) được cấp ngay trong 24h để nộp xét tốt nghiệp.",
      tips: "Chứng chỉ MOS/IC3 có giá trị vĩnh viễn trên toàn thế giới, không bao giờ hết hạn."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="section-badge mx-auto">
            <FileText size={14} className="text-[#0057B8]" />
            <span>CẨM NANG KHẢO THÍ • HƯỚNG DẪN TỪ A ĐẾN Z</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight leading-snug font-display">
            Quy Trình 4 Bước Đăng Ký & Thi Đạt Chuẩn Đầu Ra
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tin Học Gen Z đồng hành cùng bạn trọn gói từ lúc tạo tài khoản, đăng ký ca thi đến khi cầm chứng chỉ Certiport chính thức trên tay.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] hover:border-[#0057B8]/40 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                {/* Step Number */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl sm:text-4xl font-bold text-[#0057B8]/30 group-hover:text-[#0057B8] font-mono transition-colors">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F4F8FD] text-[#0057B8] border border-[#E2E8F0] flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#0B2545] leading-snug mb-3 group-hover:text-[#0057B8] transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              {/* Note / Tip box */}
              <div className="p-3 rounded-xl bg-[#F4F8FD] border border-[#E2E8F0] text-xs text-slate-600 leading-normal">
                <span className="font-bold text-[#0B2545]">💡 Lưu ý:</span> {item.tips}
              </div>
            </div>
          ))}
        </div>

        {/* Helpful Resources & Support Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#0B2545] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-[#003F88]/40">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-bold text-[#5f9ee2] uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles size={14} /> HỖ TRỢ THỦ TỤC CERTIPORT 24/7
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Bạn Cần Hướng Dẫn Đăng Ký Tài Khoản & Tra Cứu Ca Thi Gần Nhất?
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm">
              Đội ngũ tư vấn sẽ hỗ trợ kiểm tra mã chứng chỉ và xếp ca thi phù hợp nhất cho bạn.
            </p>
          </div>
          <a
            href="/lien-he"
            className="px-6 py-3.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-sm hover:shadow-md transition-all shrink-0 flex items-center gap-2 active:scale-[0.99]"
          >
            <span>Nhận Hướng Dẫn Miễn Phí</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
