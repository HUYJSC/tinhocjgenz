import { notFound } from "next/navigation";
import Link from "next/link";
import { coursesData, upcomingBatchesData } from "@/data/mockData";
import { Award, CheckCircle2, Clock, Calendar, ShieldCheck, Sparkles, ArrowRight, UserCheck, School, ArrowLeft, BookOpen, Star } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id,
  }));
}

export default async function CourseDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const course = coursesData.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  // Find upcoming batches for this course or relevant ones
  const relevantBatches = upcomingBatchesData.slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-slate-50/40">

      {/* 1. Header Banner & Course Overview */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 text-white pt-24 pb-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb & Back Link */}
          <div className="mb-6">
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Quay lại danh sách khóa học</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2">
                {course.badge && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {course.badge}
                  </span>
                )}
                {course.examCode && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                    Mã thi: {course.examCode}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-display">
                {course.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
                {course.description}
              </p>

              {/* Highlights bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Thời lượng học</span>
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    <Clock size={15} className="text-cyan-400" />
                    {course.duration}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Tỷ lệ đỗ Certiport</span>
                  <div className="text-sm font-black text-emerald-400 flex items-center gap-1.5">
                    <Award size={15} className="text-emerald-400" />
                    {course.passRate || "99.4% Đỗ lần đầu"}
                  </div>
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Hình thức đào tạo</span>
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    <School size={15} className="text-amber-400" />
                    Online 1:1 & Nhóm Nhỏ
                  </div>
                </div>
              </div>

            </div>

            {/* Right Pricing & Quick CTA Card */}
            <div className="lg:col-span-4">
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                    Học phí trọn gói
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-blue-600 leading-none">
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm font-bold text-slate-400 line-through">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                  {course.priceNote && (
                    <p className="text-xs font-bold text-amber-600 mt-2">
                      🔥 {course.priceNote}
                    </p>
                  )}
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>Cam kết bao đỗ 100% - Học lại 0đ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>Cấp tài khoản máy ảo thi thử không giới hạn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>Hỗ trợ thủ tục đăng ký thi IIG chính thức</span>
                  </div>
                </div>

                <a
                  href="#dang-ky"
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <span>Đăng Ký Khóa Học Này</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Syllabus & Curriculum Detailed Matrix */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Syllabus Content */}
            <div className="lg:col-span-8 space-y-10">
              
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black uppercase tracking-wider mb-2">
                  <BookOpen size={13} className="text-blue-600" />
                  KHUNG CHƯƠNG TRÌNH ĐÀO TẠO
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Lộ Trình Học Chi Tiết Từng Buổi
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Được thiết kế tối ưu, tập trung 100% vào thực hành và ngân hàng đề thi thật của Certiport.
                </p>
              </div>

              {/* Syllabus Timeline */}
              {course.syllabus && course.syllabus.length > 0 ? (
                <div className="space-y-6">
                  {course.syllabus.map((item) => (
                    <div
                      key={item.session}
                      className="p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-500/30 transition-all duration-300 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono font-black text-xs">
                          BUỔI {item.session}
                        </span>
                        <span className="text-xs font-bold text-slate-400">120 phút / buổi</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>

                      <ul className="space-y-2 pt-2 border-t border-slate-200/60">
                        {item.contents.map((cnt, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                            <span>{cnt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {course.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Course Features / Guarantee Callout */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-4 shadow-xl">
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <ShieldCheck size={20} className="text-cyan-400" />
                  Chính Sách Cam Kết Đào Tạo Bằng Văn Bản
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200 font-medium">
                  <li>• Nếu không đạt điểm chuẩn của trường, học viên được học lại toàn bộ khóa học miễn phí 100%.</li>
                  <li>• Cấp tài khoản phần mềm thi thử mô phỏng đề thi Certiport 2026 không giới hạn số lần làm bài.</li>
                  <li>• Giảng viên kèm cặp 1:1, giải đáp thắc mắc trước ngày thi qua Ultraviewer / Zalo.</li>
                </ul>
              </div>

            </div>

            {/* Sidebar: Upcoming Batches & Registration */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Upcoming Batches Card */}
              <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" />
                  Lịch Khai Giảng Dự Kiến
                </h3>

                <div className="space-y-3">
                  {relevantBatches.map((batch) => (
                    <div key={batch.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-slate-900">{batch.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-red-50 text-red-700 border border-red-200">
                          {batch.status}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 font-bold">{batch.time}</p>
                      <p className="text-[11px] text-slate-500">Khai giảng: {batch.startDate}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              {course.targetAudience && (
                <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Đối tượng phù hợp:</h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                    {course.targetAudience}
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* 3. Direct Contact Form Registration */}
      <section id="dang-ky" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full">
              ĐĂNG KÝ TƯ VẤN & XẾP LỚP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Đăng Ký Khóa Học: {course.title}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Để lại thông tin bên dưới, giảng viên PH Digital Education sẽ gọi điện tư vấn lộ trình và áp dụng ưu đãi giảm giá nhóm cho bạn ngay!
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

    </div>
  );
}
