"use client";

import { CheckCircle2, FileText, UserCheck, Calendar, Award, ArrowRight, ShieldAlert, Sparkles, ExternalLink } from "lucide-react";

export default function ExamGuide() {
  const steps = [
    {
      step: "01",
      title: "Tạo Tài Khoản Khảo Thí Certiport Quốc Tế",
      desc: "Đăng ký tài khoản chính thức tại Certiport.com bằng Email và thông tin CCCD/Hộ chiếu. Giảng viên PH Digital Education sẽ hướng dẫn bạn liên kết mã thí sinh và tài khoản sinh viên đúng quy định.",
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
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs font-black tracking-wider uppercase">
            <FileText size={14} className="text-cyan-600" />
            CẨM NANG KHẢO THÍ • HƯỚNG DẪN TỪ A ĐẾN Z
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug font-display">
            Quy Trình 4 Bước Đăng Ký & Thi Đạt Chuẩn Đầu Ra
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            PH Digital Education đồng hành cùng bạn trọn gói từ lúc tạo tài khoản, đăng ký ca thi đến khi cầm chứng chỉ Certiport chính thức trên tay.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50/70 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-500/30 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                {/* Step Number */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl sm:text-4xl font-black text-blue-600/30 group-hover:text-blue-600 font-mono transition-colors">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">
                    ✓
                  </div>
                </div>

                <h3 className="text-base font-black text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              {/* Note / Tip box */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200/70 text-[11px] text-slate-500 leading-normal">
                <span className="font-bold text-slate-800">💡 Lưu ý:</span> {item.tips}
              </div>
            </div>
          ))}
        </div>

        {/* Helpful Resources & Support Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles size={14} /> HỖ TRỢ THỦ TỤC CERTIPORT 24/7
            </span>
            <h4 className="text-lg sm:text-xl font-black text-white">
              Bạn Cần Hướng Dẫn Đăng Ký Tài Khoản & Tra Cứu Ca Thi Gần Nhất?
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm">
              Đội ngũ tư vấn sẽ hỗ trợ kiểm tra mã chứng chỉ và xếp ca thi phù hợp nhất cho bạn.
            </p>
          </div>
          <a
            href="/lien-he"
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Nhận Hướng Dẫn Miễn Phí</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
