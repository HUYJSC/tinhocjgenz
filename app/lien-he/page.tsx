import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, MessageSquare, Clock, Sparkles, School, ShieldCheck } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50/30">

      {/* 1. Header Banner */}
      <section className="bg-white pt-24 pb-16 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-700">
            <School size={13} className="text-blue-600" />
            PH DIGITAL EDUCATION • TƯ VẤN LỘ TRÌNH 24/7
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-display">
            Liên Hệ Nhận Tư Vấn & Lịch Thi
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Bạn cần tư vấn chuẩn đầu ra xét tốt nghiệp đại học (DNTU, Lạc Hồng, UEH...) hay đặt lịch dịch vụ máy tính? Đội ngũ giảng viên PH Digital Education sẵn sàng hỗ trợ 24/7.
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
                  <span>Kênh kết nối chính thức</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  Đồng Hành Cùng Bạn Đến Khi Cầm Bằng Trên Tay!
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Lớp học luyện thi chứng chỉ MOS, IC3 và Tin học thực chiến được tổ chức trực tuyến tương tác cao (Online 1:1 hoặc nhóm nhỏ) trên toàn quốc. Hỗ trợ kèm cấp tốc theo yêu cầu đợt xét tốt nghiệp.
                </p>
              </div>

              {/* Information Cards List */}
              <div className="space-y-4 flex-1">
                {/* Phone */}
                <div className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover hover:border-blue-500/25 transition-all duration-300 group">
                  <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-2xl h-fit shrink-0 group-hover:bg-blue-600 group-hover:text-white smooth-transition text-blue-600">
                    <Phone size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hotline / Zalo Tư Vấn 24/7</p>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm sm:text-base font-black text-slate-900 hover:text-blue-600 smooth-transition block">
                      {CONTACT_INFO.displayPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover hover:border-blue-500/25 transition-all duration-300 group">
                  <div className="p-3.5 bg-cyan-50 border border-cyan-100 rounded-2xl h-fit shrink-0 group-hover:bg-cyan-600 group-hover:text-white smooth-transition text-cyan-600">
                    <Mail size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Hỗ Trợ Đào Tạo</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm sm:text-base font-black text-slate-900 hover:text-blue-600 smooth-transition block">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover hover:border-blue-500/25 transition-all duration-300 group">
                  <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-2xl h-fit shrink-0 group-hover:bg-indigo-600 group-hover:text-white smooth-transition text-indigo-600">
                    <MapPin size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hình Thức Đào Tạo</p>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block leading-normal">
                      Online Tương Tác Trực Tiếp Toàn Quốc & Kèm 1:1 Cấp Tốc
                    </span>
                  </div>
                </div>

                {/* Support Time */}
                <div className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover hover:border-blue-500/25 transition-all duration-300 group">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl h-fit shrink-0 group-hover:bg-emerald-600 group-hover:text-white smooth-transition text-emerald-600">
                    <Clock size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Thời Gian Hỗ Trợ</p>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block">
                      8:00 - 22:30 (Từ Thứ 2 đến Chủ Nhật)
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
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">Quy Trình Đồng Hành Đảm Bảo Đỗ 100%</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Phương pháp giảng dạy trực tiếp, không học qua video thu sẵn, đảm bảo bạn nắm vững thao tác ngay trong từng buổi học.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50/70 p-8 rounded-3xl border border-slate-200/70 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover text-center space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto text-sm font-black shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white smooth-transition">1</div>
              <h3 className="font-black text-slate-900 text-base leading-snug">Học Tương Tác Trực Tuyến</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Giảng viên chia sẻ màn hình máy ảo thi Certiport, chỉ rõ từng bẫy đề thi và mẹo giải bài tốc độ cao.
              </p>
            </div>

            <div className="bg-slate-50/70 p-8 rounded-3xl border border-slate-200/70 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover text-center space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center mx-auto text-sm font-black shadow-sm group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white smooth-transition">2</div>
              <h3 className="font-black text-slate-900 text-base leading-snug">Cài Đặt Phần Mềm Luyện Thi</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Hỗ trợ cài đặt phần mềm thi thử từ xa qua Ultraview, cấp tài khoản luyện đề không giới hạn số lần làm.
              </p>
            </div>

            <div className="bg-slate-50/70 p-8 rounded-3xl border border-slate-200/70 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover text-center space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-sm font-black shadow-sm group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white smooth-transition">3</div>
              <h3 className="font-black text-slate-900 text-base leading-snug">Kèm 1:1 Đến Ngày Đi Thi</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Trực tiếp hỗ trợ giải đáp bài tập, đăng ký ca thi tại hội đồng khảo thí IIG/Certiport chính thức.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
