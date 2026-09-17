"use client";

import Link from "next/link";
import { ShieldCheck, RefreshCw, Award, HeartHandshake, FileCheck2, ArrowRight } from "lucide-react";

export default function GuaranteePolicy() {
  const policies = [
    {
      icon: <RefreshCw size={22} className="text-[#0057B8]" />,
      title: "Cam Kết Học Lại Miễn Phí 100%",
      desc: "Nếu học viên thi lần đầu chưa đạt số điểm mong muốn hoặc chưa đủ chuẩn đầu ra của trường, bạn sẽ được tham gia học lại toàn bộ khóa học và kèm 1:1 hoàn toàn miễn phí mà không phát sinh thêm bất kỳ chi phí nào."
    },
    {
      icon: <Award size={22} className="text-[#0057B8]" />,
      title: "100% Giảng Viên MOS Master Cấp Quốc Tế",
      desc: "Trực tiếp đứng lớp là các thầy cô có chứng chỉ Microsoft Office Specialist Master và IC3 Authorized Educator, giàu kinh nghiệm thực chiến và nắm rõ mọi bộ đề thi khảo thí mới nhất của Certiport."
    },
    {
      icon: <FileCheck2 size={22} className="text-[#0057B8]" />,
      title: "Tài Khoản Phần Mềm Thi Thử Không Giới Hạn",
      desc: "Mỗi học viên được cấp quyền truy cập vào hệ thống thi thử mô phỏng chuẩn xác giao diện và đề thi thật của Certiport. Luyện đề không giới hạn số lần cho đến khi tự tin đạt chuẩn trên 850/1000."
    },
    {
      icon: <HeartHandshake size={22} className="text-[#0057B8]" />,
      title: "Hỗ Trợ Kỹ Thuật & Sửa Bài 1:1 Trọn Đời",
      desc: "Kể cả sau khi đã cầm chứng chỉ trên tay, bạn vẫn luôn được đội ngũ giảng viên Tin Học Gen Z hỗ trợ giải đáp các vướng mắc về Excel, Word, PowerPoint phát sinh trong quá trình học tập và công việc thực tế."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F4F8FD] text-slate-800 relative border-t border-[#E5EEF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E5EEF8] text-[#0057B8] text-xs font-semibold tracking-wider uppercase shadow-sm">
            <ShieldCheck size={14} className="text-[#0057B8]" />
            CHÍNH SÁCH BẢO HÀNH ĐÀO TẠO • QUYỀN LỢI HỌC VIÊN
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2545] tracking-tight leading-snug">
            4 Cam Kết Vàng Bảo Đảm Đỗ 100%
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tin Học Gen Z cam kết bảo vệ tối đa quyền lợi của học viên bằng chính sách đào tạo minh bạch, rõ ràng và có trách nhiệm cao nhất.
          </p>
        </div>

        {/* 4 Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {policies.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5EEF8] hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B2545] leading-snug">
                {p.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Link Footer */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white font-semibold text-xs sm:text-sm tracking-wide uppercase shadow-sm transition-colors"
          >
            <span>Đăng Ký Khóa Học Nhận Bảo Hành Bao Đỗ</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
