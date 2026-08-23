"use client";

import { ShieldCheck, CheckCircle2, RefreshCw, Award, HeartHandshake, FileCheck2, Sparkles } from "lucide-react";

export default function GuaranteePolicy() {
  const policies = [
    {
      icon: <RefreshCw size={24} className="text-blue-600" />,
      title: "Cam Kết Học Lại Miễn Phí 100%",
      desc: "Nếu học viên đi thi lần đầu chưa đạt số điểm mong muốn hoặc chưa đủ chuẩn đầu ra của trường, bạn sẽ được tham gia học lại toàn bộ khóa học và kèm 1:1 hoàn toàn miễn phí mà không phải đóng thêm bất kỳ chi phí nào."
    },
    {
      icon: <Award size={24} className="text-amber-500" />,
      title: "100% Giảng Viên MOS Master Cấp Quốc Tế",
      desc: "Trực tiếp đứng lớp là các thầy cô có chứng chỉ Microsoft Office Specialist Master và IC3 Authorized Educator, giàu kinh nghiệm thực chiến và nắm rõ mọi bẫy đề thi khảo thí mới nhất của Certiport."
    },
    {
      icon: <FileCheck2 size={24} className="text-cyan-500" />,
      title: "Tài Khoản Phần Mềm Thi Thử Không Giới Hạn",
      desc: "Mỗi học viên được cấp quyền truy cập vào hệ thống thi thử mô phỏng giống 99% phần mềm thi thật của Certiport. Luyện đề không giới hạn số lần cho đến khi tự tin đạt điểm chuẩn trên 850/1000."
    },
    {
      icon: <HeartHandshake size={24} className="text-emerald-500" />,
      title: "Hỗ Trợ Kỹ Thuật & Sửa Bài 1:1 Trọn Đời",
      desc: "Kể cả sau khi đã cầm chứng chỉ trên tay, bạn vẫn luôn được đội ngũ giảng viên PH Digital Education hỗ trợ giải đáp các vướng mắc về Excel, Word, PowerPoint phát sinh trong quá trình đi làm thực tế."
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-black tracking-wider uppercase">
            <ShieldCheck size={14} className="text-cyan-400" />
            CHÍNH SÁCH BẢO HÀNH ĐÀO TẠO • QUYỀN LỢI HỌC VIÊN
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-snug font-display">
            4 Cam Kết Vàng Bảo Đảm Đỗ 100%
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            PH Digital Education cam kết bảo vệ tối đa quyền lợi của học viên bằng văn bản đào tạo minh bạch, rõ ràng và có trách nhiệm cao nhất.
          </p>
        </div>

        {/* 4 Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {policies.map((p, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 hover:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 shadow-xl space-y-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner group-hover:scale-110 smooth-transition">
                {p.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                {p.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Link Footer */}
        <div className="mt-12 text-center">
          <a
            href="/lien-he"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Sparkles size={16} />
            <span>Đăng Ký Khóa Học Nhận Bảo Hành Bao Đỗ</span>
          </a>
        </div>

      </div>
    </section>
  );
}
