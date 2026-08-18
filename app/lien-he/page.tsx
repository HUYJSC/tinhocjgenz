import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, MessageSquare, Clock, Sparkles } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50/30">
      
      {/* 1. Header Banner */}
      <section className="bg-white pt-24 pb-16 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-600">
            Liên Hệ Ngay
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-display">
            Kết Nối Với Thầy Giáo GenZ
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Bạn có câu hỏi về khóa học hoặc cần đặt lịch sửa máy gấp? Hãy liên hệ ngay, Thầy giáo luôn sẵn sàng hỗ trợ bạn 24/7!
          </p>
        </div>
      </section>

      {/* 2. Contact Details & Form Section */}
      <section className="py-24 sm:py-32 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left side details */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 animate-slide-up">
              
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-lg w-fit">
                  <Sparkles size={13} className="text-cyan-500" />
                  <span>Kênh kết nối trực tiếp</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  Đừng Ngần Ngại Gọi Cho Thầy Giáo Nhé!
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  Lớp học Tin học văn phòng được tổ chức trực tuyến (online) 1-1 hoặc theo nhóm nhỏ trên toàn quốc. Các dịch vụ cài đặt phần mềm và hỗ trợ kỹ thuật máy tính được thực hiện nhanh chóng từ xa qua Ultraview/Teamview. Lịch học vô cùng linh động theo khung giờ rảnh của bạn.
                </p>
              </div>

              {/* Information Cards List */}
              <div className="space-y-4 flex-1">
                {/* Phone */}
                <div className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover hover:border-blue-500/25 transition-all duration-500 group">
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl h-fit shrink-0 group-hover:bg-blue-50 smooth-transition">
                    <Phone size={18} className="text-blue-600" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Điện thoại / Zalo</p>
                    <a href="tel:0397912705" className="text-sm sm:text-base font-black text-slate-900 hover:text-blue-600 smooth-transition block">
                      0397.912.705
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover hover:border-blue-500/25 transition-all duration-500 group">
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl h-fit shrink-0 group-hover:bg-cyan-50 smooth-transition">
                    <Mail size={18} className="text-cyan-500" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hòm thư điện tử</p>
                    <a href="mailto:tinhocgenz@gmail.com" className="text-sm sm:text-base font-black text-slate-900 hover:text-blue-600 smooth-transition block">
                      tinhocgenz@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover hover:border-blue-500/25 transition-all duration-500 group">
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl h-fit shrink-0 group-hover:bg-indigo-50 smooth-transition">
                    <MapPin size={18} className="text-indigo-500" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mô hình học tập</p>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block leading-normal">
                      Học trực tuyến & Hỗ trợ toàn quốc
                    </span>
                  </div>
                </div>

                {/* Support Time */}
                <div className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover hover:border-blue-500/25 transition-all duration-500 group">
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl h-fit shrink-0 group-hover:bg-emerald-50 smooth-transition">
                    <Clock size={18} className="text-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Thời gian làm việc</p>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block">
                      8:00 - 22:00 (Từ Thứ 2 đến Chủ nhật)
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right side form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Online Model Highlights Section */}
      <section className="bg-white border-t border-slate-100/60 overflow-hidden py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">Mô Hình Học Trực Tuyến Tương Tác Cao</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Không như các khóa học online thu âm sẵn nhàm chán, tại Thầy giáo GenZ bạn sẽ học trực tiếp tương tác 100% cùng giảng viên.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover text-center space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-blue-600 flex items-center justify-center mx-auto text-sm font-black shadow-sm group-hover:scale-110 group-hover:bg-blue-50 smooth-transition">1</div>
              <h3 className="font-black text-slate-900 text-base leading-snug">Học Qua Google Meet / Zoom</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Giảng viên chia sẻ màn hình trực quan, hướng dẫn từng thao tác phím tắt, công thức Excel chi tiết và sinh động.
              </p>
            </div>
            
            <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover text-center space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-cyan-500 flex items-center justify-center mx-auto text-sm font-black shadow-sm group-hover:scale-110 group-hover:bg-cyan-50 smooth-transition">2</div>
              <h3 className="font-black text-slate-900 text-base leading-snug">Hỗ Trợ Từ Xa Qua Ultraview</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Gặp lỗi công thức khó hay cài đặt phần mềm? Thầy giáo sẽ trực tiếp kết nối điều khiển máy hỗ trợ xử lý lỗi ngay lập tức.
              </p>
            </div>

            <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover text-center space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-emerald-500 flex items-center justify-center mx-auto text-sm font-black shadow-sm group-hover:scale-110 group-hover:bg-emerald-50 smooth-transition">3</div>
              <h3 className="font-black text-slate-900 text-base leading-snug">Group Hỗ Trợ Trọn Đời</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Tham gia nhóm Zalo hỗ trợ trọn đời. Bất cứ khi nào đi làm gặp bảng biểu khó hay lỗi file, hãy nhắn tin để thầy giáo giải đáp.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
