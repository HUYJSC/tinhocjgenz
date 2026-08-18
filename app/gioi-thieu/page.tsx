import Link from "next/link";
import { Award, Target, BookOpen, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Học Qua Thực Hành",
      desc: "Lý thuyết chỉ chiếm 20% thời lượng. 80% còn lại là thực hành trên các tình huống thực tế của doanh nghiệp.",
      icon: <Target className="text-blue-600 group-hover:scale-110 smooth-transition" size={20} />
    },
    {
      title: "Không Ngại Hỏi Đáp",
      desc: "Group support 24/7 giải đáp mọi thắc mắc học tập, công việc. Thầy giáo cam kết hỗ trợ đồng hành trọn đời.",
      icon: <Heart className="text-pink-500 group-hover:scale-110 smooth-transition" size={20} />
    },
    {
      title: "Ngôn Ngữ GenZ",
      desc: "Nói không với giáo điều, khô khan. Học tin học vui vẻ, tràn đầy năng lượng và dễ tiếp thu nhất.",
      icon: <Sparkles className="text-cyan-500 group-hover:scale-110 smooth-transition" size={20} />
    }
  ];

  return (
    <div className="flex flex-col w-full bg-slate-50/30">
      {/* 1. Header Banner */}
      <section className="bg-white pt-24 pb-16 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-600">
            Về Chúng Tôi
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Câu Chuyện Của "Thầy giáo GenZ"
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Sứ mệnh cách tân phương thức học Tin học văn phòng khô khan truyền thống thành trải nghiệm thực chiến đầy cảm hứng và hiệu quả vượt trội.
          </p>
        </div>
      </section>

      {/* 2. Story Section */}
      <section className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Image / Mockup Block */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-[2rem] bg-slate-900 shadow-featured shadow-premium overflow-hidden p-6 sm:p-8 flex flex-col justify-between text-white border border-slate-800 hover:shadow-featured-hover transition-all duration-500">
                <div className="flex justify-between items-start">
                  <div className="bg-blue-600 p-2.5 rounded-xl">
                    <Award className="text-cyan-300" size={24} />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                    Sáng Lập Brand
                  </span>
                </div>
                
                <div className="my-auto space-y-4">
                  <h3 className="text-2xl font-black tracking-tight font-display">Thầy Giáo GenZ</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                    "Là một freelancer và trainer lâu năm, tôi thấu hiểu những rào cản cực lớn của mọi người khi đối mặt với bảng biểu Excel, văn bản Word hay slide thuyết trình PowerPoint."
                  </p>
                  <blockquote className="border-l-2 border-blue-500 pl-3.5 text-xs text-blue-200 italic font-semibold leading-relaxed">
                    "Mục tiêu của tinhocgenz.io.vn là giúp bạn làm chủ công cụ và tối ưu hóa 300% hiệu suất làm việc!"
                  </blockquote>
                </div>

                <div className="flex items-center gap-3 border-t border-slate-800/60 pt-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
                    GZ
                  </div>
                  <div>
                    <p className="text-[11px] font-black leading-none">Microsoft Office Specialist</p>
                    <p className="text-[9px] text-slate-500 leading-none mt-1">IT Trainer & Freelancer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Text Detail */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                Người Đồng Hành Tin Cậy Trên Con Đường Phát Triển Sự Nghiệp
              </h2>
              
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Thầy giáo GenZ khởi nguồn từ một dự án cá nhân nhằm hỗ trợ các bạn sinh viên vượt qua nỗi ám ảnh mang tên "Tin học văn phòng". Nhận thấy phương pháp giảng dạy tại trường học và trung tâm cũ thường quá nặng lý thuyết và thiếu thực tế, chúng tôi đã xây dựng nên bộ giáo trình thực chiến 100% dựa trên case-study doanh nghiệp thật.
              </p>

              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Với xuất phát điểm là một chuyên gia Công nghệ thông tin tự do (freelancer) và huấn luyện viên công nghệ doanh nghiệp, Thầy giáo GenZ mang đến tư duy thực tế nhất: <strong>chỉ học cái doanh nghiệp cần, làm nhanh nhất và tối ưu nhất bằng phím tắt và mẹo thông minh</strong>.
              </p>

              {/* Teaching Style Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {values.map((v, i) => (
                  <div key={i} className="bg-slate-50/50 p-5 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group flex flex-col items-start gap-3">
                    <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm shrink-0 group-hover:bg-slate-50 smooth-transition">
                      {v.icon}
                    </div>
                    <h3 className="font-black text-slate-950 text-sm leading-snug">{v.title}</h3>
                    <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">{v.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-none">Kinh Nghiệm & Năng Lực Giảng Dạy</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xl mx-auto">
              Cam kết chất lượng chuẩn đầu ra quốc tế và chuyên môn cao, mang lại giá trị cao nhất cho từng học viên.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Experience Card 1 */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover flex gap-4 group">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl h-fit shrink-0 group-hover:bg-blue-50 smooth-transition">
                <Award size={20} className="text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-slate-900 text-sm sm:text-base leading-snug">Chứng chỉ MOS Expert</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Chứng chỉ Microsoft Office Specialist cấp độ Expert trực tiếp từ Microsoft, cam kết kỹ năng chuẩn hãng.
                </p>
              </div>
            </div>

            {/* Experience Card 2 */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover flex gap-4 group">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl h-fit shrink-0 group-hover:bg-cyan-50 smooth-transition">
                <BookOpen size={20} className="text-cyan-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-slate-900 text-sm sm:text-base leading-snug">5+ Năm Đào Tạo</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Kinh nghiệm giảng dạy, kèm cặp trực tiếp cho hơn 500+ học viên từ mất gốc đến nâng cao làm chủ công cụ.
                </p>
              </div>
            </div>

            {/* Experience Card 3 */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover flex gap-4 group">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl h-fit shrink-0 group-hover:bg-emerald-50 smooth-transition">
                <ShieldCheck size={20} className="text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-slate-900 text-sm sm:text-base leading-snug">Đối Tác Doanh Nghiệp</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Đã và đang cố vấn, xây dựng hệ thống báo cáo & nâng cấp nghiệp vụ tin học văn phòng cho nhiều công ty vừa và nhỏ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Call-to-action */}
      <section className="py-20 bg-white text-center border-t border-slate-100/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">Sẵn Sàng Nâng Tầm Bản Thân Cùng Thầy Giáo GenZ?</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed font-semibold">
            Để lại thông tin nhận tư vấn lộ trình học phù hợp nhất với bạn hoàn toàn miễn phí.
          </p>
          <div className="pt-2">
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-black tracking-wide uppercase btn-premium-primary"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
