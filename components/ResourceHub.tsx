"use client";

import { useState } from "react";
import { Download, CheckCircle2, Send, Lock, BookOpen } from "lucide-react";

interface ResourceItem {
  id: string;
  title: string;
  category: "Đề Thi MOS" | "Excel Thực Chiến" | "IC3 Kỹ Năng Số" | "Biểu Mẫu Doanh Nghiệp";
  format: "PDF / ZIP" | "XLSX Template" | "EBOOK";
  downloadsCount: string;
  description: string;
  includes: string[];
  badge?: string;
}

const RESOURCES: ResourceItem[] = [
  {
    id: "res-1",
    title: "Trọn Bộ 50 Đề Thi Thử MOS 2019/365 Kèm Đáp Án Chi Tiết",
    category: "Đề Thi MOS",
    format: "PDF / ZIP",
    downloadsCount: "3.420+ lượt tải",
    description: "Tuyển tập các bộ đề thi thử bám sát 99% cấu trúc đề thi thật của Certiport (gồm cả Word MO-100, Excel MO-200, PowerPoint MO-300).",
    includes: [
      "50 file đề thi thực hành định dạng chuẩn Certiport",
      "File hướng dẫn giải từng bước (Step-by-step)",
      "Bộ video giải thích các câu bẫy dễ mất điểm"
    ],
    badge: "Hot Nhất Sinh Viên"
  },
  {
    id: "res-2",
    title: "Sổ Tay 100+ Hàm Excel & Phím Tắt Thần Tốc Cho Dân Văn Phòng",
    category: "Excel Thực Chiến",
    format: "EBOOK",
    downloadsCount: "5.180+ lượt tải",
    description: "Cẩm nang tổng hợp các hàm xử lý chuỗi, ngày tháng, tìm kiếm (XLOOKUP, INDEX, MATCH) và phím tắt tăng tốc độ làm việc lên gấp 3 lần.",
    includes: [
      "Công thức và ví dụ thực tế cho từng hàm",
      "Bảng tra cứu phím tắt Excel bản in màu đẹp mắt",
      "Các mẹo sửa lỗi #N/A, #VALUE!, #REF! thường gặp"
    ],
    badge: "Khuyên Dùng Cho Người Đi Làm"
  },
  {
    id: "res-3",
    title: "Cẩm Nang Ôn Thi Chứng Chỉ Kỹ Năng Số IC3 GS6 Toàn Diện",
    category: "IC3 Kỹ Năng Số",
    format: "PDF / ZIP",
    downloadsCount: "2.150+ lượt tải",
    description: "Hệ thống kiến thức 7 chuyên đề số theo tiêu chuẩn Hoa Kỳ: Công nghệ cơ bản, An toàn bảo mật, Điện toán đám mây và Đạo đức số.",
    includes: [
      "Tóm tắt lý thuyết trọng tâm 3 cấp độ Level 1, 2, 3",
      "Bộ 200 câu hỏi trắc nghiệm mô phỏng có giải thích",
      "Từ điển thuật ngữ công nghệ thông tin cơ bản"
    ]
  },
  {
    id: "res-4",
    title: "Bộ Template Quản Lý Thu Chi, Kế Toán Kho & Dashboard Excel Động",
    category: "Biểu Mẫu Doanh Nghiệp",
    format: "XLSX Template",
    downloadsCount: "4.300+ lượt tải",
    description: "Bộ file Excel mẫu tự động hóa tính toán doanh thu, công nợ, quản lý hàng tồn kho và báo cáo biểu đồ động dành cho kế toán & quản lý.",
    includes: [
      "File quản lý kho hàng nhập - xuất - tồn tự động",
      "Dashboard báo cáo doanh thu theo tháng / quý cực đẹp",
      "Mẫu tính lương và chấm công nhân sự chuẩn quy định"
    ],
    badge: "May Đo Cho Doanh Nghiệp"
  }
];

export default function ResourceHub() {
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [leadName, setLeadName] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleDownloadClick = (item: ResourceItem) => {
    setSelectedResource(item);
    setIsSuccess(false);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadPhone.trim().length >= 9) {
      setIsSuccess(true);
      // In real scenario, opens file download or triggers Zalo auto-message
    } else {
      alert("Vui lòng nhập số điện thoại hoặc Zalo hợp lệ!");
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#F4F8FD] relative overflow-hidden border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="section-badge mx-auto">
            <BookOpen size={14} className="text-[#0057B8]" />
            <span>KHO TÀI LIỆU MIỄN PHÍ • TỰ HỌC & THI THỬ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight leading-snug font-display">
            Tải Miễn Phí Bộ Đề Thi & Template Excel Mẫu
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tin Học Gen Z tổng hợp và chia sẻ miễn phí nguồn học liệu chuẩn quốc tế giúp bạn tự tin ôn luyện chuẩn đầu ra và nâng tầm kỹ năng làm việc.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESOURCES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] hover:border-[#0057B8]/40 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Top Badge Info */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#F4F8FD] text-[#0057B8] border border-[#E2E8F0]">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{item.downloadsCount}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0B2545] leading-snug mb-3 group-hover:text-[#0057B8] transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* What's included checklist */}
                <div className="space-y-2 py-3 border-y border-[#E2E8F0] mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tài liệu bao gồm:</p>
                  {item.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 size={14} className="text-[#0057B8] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Action Trigger */}
              <button
                type="button"
                onClick={() => handleDownloadClick(item)}
                className="w-full py-3.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Download size={15} />
                <span>Tải Trọn Bộ Tài Liệu Miễn Phí</span>
              </button>
            </div>
          ))}
        </div>

        {/* Modal / Popup for Lead Form */}
        {selectedResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2545]/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-[#E2E8F0] shadow-xl relative space-y-5">
              
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-[#0B2545] font-bold text-lg p-1 cursor-pointer"
              >
                ✕
              </button>

              {!isSuccess ? (
                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0057B8] bg-[#F4F8FD] border border-[#E2E8F0] px-3 py-1 rounded-full">
                      Tải Tài Liệu Miễn Phí
                    </span>
                    <h4 className="text-lg font-bold text-[#0B2545] leading-snug pt-1">
                      {selectedResource.title}
                    </h4>
                    <p className="text-slate-600 text-xs">
                      Vui lòng để lại SĐT hoặc Zalo để hệ thống tự động gửi liên kết tải tốc độ cao và mật khẩu giải nén cho bạn.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Họ và tên</label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0057B8] focus:ring-2 focus:ring-[#0057B8]/15"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Số điện thoại / Zalo <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0968123456"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0057B8] focus:ring-2 focus:ring-[#0057B8]/15"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white font-bold text-xs uppercase tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 active:scale-[0.99]"
                  >
                    <Send size={14} />
                    <span>Gửi Link Tải Qua Zalo Ngay</span>
                  </button>

                  <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                    <Lock size={11} /> Cam kết bảo mật thông tin cá nhân 100%
                  </p>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#F4F8FD] text-[#0057B8] flex items-center justify-center mx-auto shadow-sm border border-[#E2E8F0]">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B2545]">Đã Gửi Thành Công!</h4>
                  <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                    Hệ thống đã ghi nhận thông tin của bạn. Link tải trọn bộ tài liệu <strong>{selectedResource.title}</strong> sẽ được gửi tới Zalo <strong>{leadPhone}</strong> ngay tức thì!
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedResource(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#0057B8] text-white text-xs font-bold hover:bg-[#003F88] transition-all cursor-pointer"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
