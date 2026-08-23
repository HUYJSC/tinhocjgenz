import Link from "next/link";
import { Award, Target, BookOpen, ShieldCheck, Heart, Sparkles, School, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Chuẩn Quốc Tế Certiport",
      desc: "Giáo trình và bài giảng liên tục cập nhật theo ma trận đề thi mới nhất của Microsoft & Certiport Hoa Kỳ.",
      icon: <Award className="text-blue-600 group-hover:scale-110 smooth-transition" size={20} />
    },
    {
      title: "Hỗ Trợ 1:1 Tận Tâm",
      desc: "Giảng viên trực tiếp kèm cặp, gỡ lỗi và giải đáp mọi thắc mắc học tập, ôn thi 24/7 đến khi nhận bằng.",
      icon: <Heart className="text-pink-500 group-hover:scale-110 smooth-transition" size={20} />
    },
    {
      title: "Thực Chiến 100%",
      desc: "Nói không với lý thuyết hàn lâm. Học viên được thực hành trực tiếp trên máy ảo thi thử và bài toán doanh nghiệp.",
      icon: <Sparkles className="text-cyan-500 group-hover:scale-110 smooth-transition" size={20} />
    }
  ];

  return (
    <div className="flex flex-col w-full bg-slate-50/30">
      {/* 1. Header Banner */}
      <section className="bg-white pt-24 pb-16 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-700">
            <School size={13} className="text-blue-600" />
            PH DIGITAL EDUCATION • HỆ SINH THÁI ĐÀO TẠO CNTT
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Sứ Mệnh & Giá Trị Cốt Lõi
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Kiến tạo giải pháp đào tạo Tin học Văn phòng Thực chiến & Luyện thi chứng chỉ quốc tế MOS / IC3 chất lượng cao, đồng hành cùng sinh viên và nhân sự trẻ trên hành trình hội nhập số.
          </p>
        </div>
      </section>

      {/* 2. Story Section */}
      <section className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Image / Mockup Block */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 shadow-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between text-white border border-slate-800 transition-all duration-500">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-white p-1 rounded-2xl flex items-center justify-center shadow-lg border border-slate-700">
                    <img src="/logo.png" alt="PH Digital Education" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-500/40">
                    Certiport Certified
                  </span>
                </div>
                
                <div className="my-auto space-y-4">
                  <h3 className="text-2xl font-black tracking-tight text-white">PH DIGITAL EDUCATION</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                    "Chúng tôi tin rằng kỹ năng công nghệ thông tin và chứng chỉ quốc tế không chỉ là tấm bằng để tốt nghiệp, mà là đòn bẩy trực tiếp quyết định thu nhập và vị thế của bạn trong môi trường làm việc hiện đại."
                  </p>
                  <blockquote className="border-l-2 border-cyan-400 pl-3.5 text-xs text-cyan-200 italic font-semibold leading-relaxed">
                    "Mục tiêu của PH Digital Education: 100% học viên tự tin vượt qua kỳ thi và làm chủ dữ liệu doanh nghiệp!"
                  </blockquote>
                </div>

                <div className="flex items-center gap-3 border-t border-slate-800/80 pt-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-black text-white text-xs shadow-md">
                    PH
                  </div>
                  <div>
                    <p className="text-[11px] font-black leading-none text-white">Microsoft MOS Master Instructors</p>
                    <p className="text-[9px] text-cyan-400 leading-none mt-1">Authorized Certiport Mentors</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Text Detail */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                Đồng Hành Cùng Sinh Viên Đạt Chuẩn Đầu Ra & Bứt Phá Năng Lực Doanh Nghiệp
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <strong>PH DIGITAL EDUCATION</strong> được thành lập từ sự thấu hiểu sâu sắc trước những khó khăn của sinh viên các trường Đại học lớn (như ĐH Công Nghệ Đồng Nai - DNTU, ĐH Lạc Hồng, UEH, HUTECH...) khi phải đối mặt với kỳ thi chuẩn đầu ra MOS / IC3 để kịp xét tốt nghiệp.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Khác biệt hoàn toàn với phương pháp dạy dàn trải truyền thống, PH Digital Education tập trung vào <strong>Lộ trình cấp tốc 3 - 5 buổi thực chiến</strong>, luyện trực tiếp trên phần mềm mô phỏng giống 99% đề thi thật của Certiport và kèm cặp 1:1 sát sao.
              </p>

              {/* Teaching Style Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {values.map((v, i) => (
                  <div key={i} className="bg-slate-50/70 p-5 rounded-3xl border border-slate-200/70 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover flex flex-col items-start gap-3">
                    <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm shrink-0">
                      {v.icon}
                    </div>
                    <h3 className="font-black text-slate-950 text-sm leading-snug">{v.title}</h3>
                    <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Credentials & Experience */}
      <section className="py-24 sm:py-32 bg-[#f8fafc] border-y border-slate-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-none">Hồ Sơ Năng Lực & Cam Kết</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xl mx-auto">
              Chất lượng đào tạo được khẳng định bởi hơn 5.200+ học viên đã đạt chứng chỉ điểm cao.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover flex gap-4 group">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl h-fit shrink-0 text-blue-600">
                <Award size={20} />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-slate-900 text-sm sm:text-base leading-snug">100% Giảng Viên MOS Master</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Được cấp chứng nhận Master cao nhất từ Microsoft, chuyên môn sâu về Word, Excel, PowerPoint, Access.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover flex gap-4 group">
              <div className="p-3 bg-cyan-50 border border-cyan-100 rounded-xl h-fit shrink-0 text-cyan-600">
                <BookOpen size={20} />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-slate-900 text-sm sm:text-base leading-snug">Tương Thích 18+ Trường ĐH</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Giáo trình khớp 100% quy chế chuẩn đầu ra của các trường ĐH Công nghệ Đồng Nai, Lạc Hồng, UEH, HUTECH...
                </p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover flex gap-4 group">
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl h-fit shrink-0 text-emerald-600">
                <ShieldCheck size={20} />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-slate-900 text-sm sm:text-base leading-snug">Cam Kết Bao Đỗ 100%</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Chính sách bảo hành đầu ra minh bạch bằng văn bản, miễn phí 100% học lại nếu thí sinh không đạt điểm thi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Call-to-action */}
      <section className="py-20 bg-white text-center border-t border-slate-100/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
            Sẵn Sàng Chinh Phục Chứng Chỉ Cùng PH Digital Education?
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed font-semibold">
            Đội ngũ tư vấn sẽ liên hệ phân tích chuẩn đầu ra theo trường của bạn và gợi ý lịch thi gần nhất.
          </p>
          <div className="pt-2">
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-black tracking-wide uppercase btn-premium-primary"
            >
              Nhận Tư Vấn Lộ Trình Ngay
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
