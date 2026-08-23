"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";
import { Sparkles, Star, Award, ShieldCheck, CheckCircle2, FileSpreadsheet, HelpCircle, School } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredCourses = selectedCategory === "all"
    ? coursesData
    : coursesData.filter((c) => c.category === selectedCategory);

  return (
    <div className="flex flex-col w-full bg-slate-50/30">
      
      {/* 1. Header Banner */}
      <section className="bg-white pt-20 pb-14 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-indigo-500/10 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-700">
            <Award size={13} className="text-blue-600" />
            PH DIGITAL EDUCATION • HỆ THỐNG KHÓA HỌC CHUẨN QUỐC TẾ
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-display">
            Chương Trình Đào Tạo & Luyện Thi Chứng Chỉ
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Học thực chiến cùng đội ngũ giảng viên đạt chuẩn MOS Master & chuyên gia CNTT. Cam kết 100% đạt chuẩn đầu ra đại học và làm chủ kỹ năng số trong doanh nghiệp.
          </p>

          {/* Filter Tabs */}
          <div className="pt-6 flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tất Cả Khóa Học ({coursesData.length})
            </button>
            <button
              onClick={() => setSelectedCategory("mos-ic3")}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all duration-300 ${
                selectedCategory === "mos-ic3"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🎓 Chuẩn Đầu Ra MOS & IC3 (Certiport)
            </button>
            <button
              onClick={() => setSelectedCategory("practical-office")}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all duration-300 ${
                selectedCategory === "practical-office"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              💼 Tin Học Thực Chiến & AI Doanh Nghiệp
            </button>
          </div>
        </div>
      </section>

      {/* 2. Courses Grid Section */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. MOS vs IC3 Comparison Matrix */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Bảng So Sánh Chứng Chỉ: <span className="text-blue-600">Nên Học MOS Hay IC3?</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
              Giúp sinh viên ĐH Công Nghệ Đồng Nai (DNTU) và các trường dễ dàng lựa chọn đúng chứng chỉ phù hợp theo quy định xét tốt nghiệp.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 font-black">Tiêu chí so sánh</th>
                  <th className="p-4 font-black text-blue-400">Chứng Chỉ MOS (Microsoft)</th>
                  <th className="p-4 font-black text-cyan-400">Chứng Chỉ IC3 GS6 (Certiport)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-4 font-extrabold text-slate-900">Đơn vị cấp bằng</td>
                  <td className="p-4 text-slate-700">Microsoft Corporation (Hoa Kỳ)</td>
                  <td className="p-4 text-slate-700">Certiport (Hoa Kỳ)</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 font-extrabold text-slate-900">Nội dung khảo thí</td>
                  <td className="p-4 text-slate-700">Chuyên sâu từng ứng dụng: Word, Excel, PowerPoint riêng biệt</td>
                  <td className="p-4 text-slate-700">Tổng quát 3 phần: Nền tảng máy tính, Ứng dụng số, Kỷ nguyên số</td>
                </tr>
                <tr>
                  <td className="p-4 font-extrabold text-slate-900">Thời hạn giá trị</td>
                  <td className="p-4 text-emerald-600 font-bold">Vô thời hạn (Vĩnh viễn)</td>
                  <td className="p-4 text-emerald-600 font-bold">Vô thời hạn (Vĩnh viễn)</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 font-extrabold text-slate-900">Chuẩn đầu ra ĐH (DNTU, LHU...)</td>
                  <td className="p-4 text-blue-700 font-bold">Phổ biến nhất, bắt buộc cho khối Kinh tế & CNTT</td>
                  <td className="p-4 text-cyan-700 font-bold">Chuẩn kỹ năng số quốc tế, áp dụng cho nhiều khoa</td>
                </tr>
                <tr>
                  <td className="p-4 font-extrabold text-slate-900">Cam kết tại PH Digital Education</td>
                  <td className="p-4 text-slate-800 font-extrabold">Bao đỗ 100% • Ôn 3 - 5 buổi</td>
                  <td className="p-4 text-slate-800 font-extrabold">Bao đỗ 100% • Bộ đề chuẩn 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Teaching Guarantees */}
      <section className="py-16 bg-slate-50 border-b border-slate-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="flex gap-4 p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/80 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group">
              <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-2xl h-fit shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white smooth-transition text-blue-600">
                <Star size={20} fill="currentColor" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-black text-slate-900 text-sm leading-snug">Học liệu & Phần mềm thi thử</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Cung cấp phần mềm mô phỏng phòng thi thật Certiport 100% và kho biểu mẫu doanh nghiệp độc quyền.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/80 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group">
              <div className="p-3.5 bg-cyan-50 border border-cyan-100 rounded-2xl h-fit shrink-0 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white smooth-transition text-cyan-600">
                <Award size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-black text-slate-900 text-sm leading-snug">Luyện thi chuẩn đề 2026</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Cập nhật các dạng câu hỏi mới nhất, mẹo tránh bẫy giúp 99.4% học viên đạt từ 850 đến 1000 điểm.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/80 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group">
              <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl h-fit shrink-0 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white smooth-transition text-emerald-600">
                <ShieldCheck size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-black text-slate-900 text-sm leading-snug">Bảo hành đầu ra 100%</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Đồng hành hỗ trợ giải đáp 24/7. Nếu không thi đỗ được đào tạo lại hoàn toàn miễn phí đến khi nhận bằng.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
