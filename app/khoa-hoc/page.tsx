import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";
import { Sparkles, Star, Award, ShieldCheck } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50/30">
      
      {/* 1. Header Banner */}
      <section className="bg-white pt-20 pb-14 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-600">
            Chương Trình Đào Tạo
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Khóa Học Tin Học Văn Phòng
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Học tập thực chiến cùng Thầy giáo GenZ qua các khóa học Excel nâng cao, soạn thảo quy chuẩn, thiết kế slide Morph ấn tượng hay luyện thi MOS 100% đỗ.
          </p>
        </div>
      </section>

      {/* 2. Courses Grid Section */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {coursesData.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Promo Banner / Teaching Guarantees */}
      <section className="py-16 bg-white border-t border-slate-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="flex gap-4 p-6 sm:p-7 bg-slate-50/50 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group">
              <div className="p-3.5 bg-white border border-slate-100 rounded-2xl h-fit shrink-0 group-hover:scale-110 group-hover:bg-blue-50 smooth-transition">
                <Star size={20} fill="currentColor" className="text-blue-600" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-black text-slate-900 text-sm leading-snug">Học liệu chất lượng cao</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Tặng kho biểu mẫu, slide PowerPoint thiết kế sẵn và các file thực hành case-study thực tế trị giá 1.500.000đ.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 p-6 sm:p-7 bg-slate-50/50 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group">
              <div className="p-3.5 bg-white border border-slate-100 rounded-2xl h-fit shrink-0 group-hover:scale-110 group-hover:bg-cyan-50 smooth-transition">
                <Award size={20} className="text-cyan-500" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-black text-slate-900 text-sm leading-snug">Luyện thi đề thật MOS</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Học viên thi MOS được cung cấp phần mềm thi thử giống 99% thực tế và được cam kết đầu ra đỗ 100%.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 p-6 sm:p-7 bg-slate-50/50 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group">
              <div className="p-3.5 bg-white border border-slate-100 rounded-2xl h-fit shrink-0 group-hover:scale-110 group-hover:bg-emerald-50 smooth-transition">
                <ShieldCheck size={20} className="text-emerald-500" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-black text-slate-900 text-sm leading-snug">Cam kết làm được việc</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Đồng hành hỗ trợ trọn đời sau khóa học qua Group hỗ trợ. Hoàn tiền 100% học phí nếu không làm được việc.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
