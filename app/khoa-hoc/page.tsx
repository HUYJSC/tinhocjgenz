"use client";

import { useState, useTransition, Suspense, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";
import { matchesSearch } from "@/lib/text-utils";
import { Star, Award, ShieldCheck, FileSpreadsheet, Search, X, BookOpen, Filter, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

function CourseCatalogContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read initial query params from URL
  const initialSearch = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Sync state to URL without full reload
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    startTransition(() => {
      router.replace(targetUrl, { scroll: false });
    });
  }, [searchQuery, selectedCategory, pathname, router]);

  // Filtering logic
  const filteredCourses = coursesData.filter((course) => {
    // 1. Category check
    const matchesCat =
      selectedCategory === "all" || course.category === selectedCategory;

    // 2. Search query check (accent-insensitive & case-insensitive)
    const matchesQuery =
      matchesSearch(course.title, searchQuery) ||
      matchesSearch(course.tagline, searchQuery) ||
      matchesSearch(course.description, searchQuery) ||
      matchesSearch(course.examCode || "", searchQuery) ||
      matchesSearch(course.badge || "", searchQuery);

    return matchesCat && matchesQuery;
  });

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <div className="flex flex-col w-full bg-[#F4F8FD]">
      
      {/* 1. Header Banner & Filter Hub */}
      <section className="bg-white pt-10 pb-10 sm:pt-14 sm:pb-12 lg:pt-20 lg:pb-14 border-b border-[#D8E4F2] relative overflow-hidden tech-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 border border-[#D8E4F2] bg-[#E8F1FC] px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#0057B8] shadow-xs">
            <Award size={13} className="text-[#0057B8]" />
            PH DIGITAL EDUCATION • HỆ THỐNG KHÓA HỌC CHUẨN QUỐC TẾ
          </span>
          
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2545] tracking-tight leading-tight font-display">
            Chương Trình Đào Tạo & Luyện Thi Chứng Chỉ
          </h1>
          
          <p className="text-[#526581] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Học thực chiến cùng đội ngũ giảng viên đạt chuẩn MOS Master & chuyên gia CNTT. Cam kết 100% đạt chứng chỉ quốc tế và làm chủ kỹ năng số trong công việc & doanh nghiệp.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <label htmlFor="course-search-input" className="sr-only">
                Tìm kiếm khóa học
              </label>
              <div className="absolute left-4 pointer-events-none text-[#526581]">
                <Search size={18} />
              </div>
              <input
                id="course-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm khóa học, môn thi (Word, Excel, MOS, IC3, Python)..."
                className="w-full min-h-[48px] pl-11 pr-10 py-3 rounded-xl bg-white border border-[#7186A3] text-[#172B4D] text-sm font-medium placeholder-[#526581] focus:outline-none focus:ring-2 focus:ring-[#0057B8]/20 focus:border-[#0057B8] shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 p-1 rounded-full text-[#526581] hover:text-[#172B4D] hover:bg-[#F4F8FD] transition-colors"
                  aria-label="Xóa từ khóa tìm kiếm"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="pt-3 -mx-4 px-4 flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2.5 overflow-x-auto no-scrollbar snap-x" role="tablist" aria-label="Lọc khóa học theo nhóm">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
              className={`min-h-11 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap snap-start cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0057B8] ${
                selectedCategory === "all"
                  ? "bg-[#0057B8] text-white shadow-xs"
                  : "bg-white text-[#526581] border border-[#D8E4F2] hover:bg-[#E8F1FC] hover:text-[#0057B8]"
              }`}
            >
              Tất Cả Khóa Học ({coursesData.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "mos-ic3"}
              onClick={() => setSelectedCategory("mos-ic3")}
              className={`min-h-11 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap snap-start cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0057B8] ${
                selectedCategory === "mos-ic3"
                  ? "bg-[#0057B8] text-white shadow-xs"
                  : "bg-white text-[#526581] border border-[#D8E4F2] hover:bg-[#E8F1FC] hover:text-[#0057B8]"
              }`}
            >
              <Award size={15} className="inline-block mr-1.5 align-[-3px]" aria-hidden="true" />
              Chứng Chỉ Quốc Tế MOS & IC3 (Certiport)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "practical-office"}
              onClick={() => setSelectedCategory("practical-office")}
              className={`min-h-11 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap snap-start cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0057B8] ${
                selectedCategory === "practical-office"
                  ? "bg-[#0057B8] text-white shadow-xs"
                  : "bg-white text-[#526581] border border-[#D8E4F2] hover:bg-[#E8F1FC] hover:text-[#0057B8]"
              }`}
            >
              <FileSpreadsheet size={15} className="inline-block mr-1.5 align-[-3px]" aria-hidden="true" />
              Tin Học Thực Chiến & AI Doanh Nghiệp
            </button>
          </div>
        </div>
      </section>

      {/* 2. Courses Grid Section */}
      <section className="py-10 sm:py-14 lg:py-20 bg-[#F4F8FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Results bar */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#D8E4F2] text-xs font-bold text-[#526581]">
            <div>
              Hiển thị <span className="text-[#0057B8] font-black">{filteredCourses.length}</span> / {coursesData.length} chương trình đào tạo
              {searchQuery && (
                <span className="ml-1 text-[#172B4D]">
                  cho từ khóa &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>

            {(searchQuery || selectedCategory !== "all") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-[#0057B8] hover:text-[#003F88] font-bold cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Đặt lại bộ lọc</span>
              </button>
            )}
          </div>

          {/* Results Grid or Empty State */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#D8E4F2] p-10 sm:p-16 text-center max-w-lg mx-auto shadow-card space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#E8F1FC] text-[#0057B8] flex items-center justify-center mx-auto">
                <BookOpen size={28} />
              </div>
              <h3 className="text-lg font-black text-[#0B2545]">
                Không tìm thấy khóa học phù hợp
              </h3>
              <p className="text-[#526581] text-xs sm:text-sm leading-relaxed">
                Không có kết quả nào khớp với &ldquo;{searchQuery}&rdquo;. Hãy thử tìm kiếm với các từ khóa phổ biến: <strong>Excel</strong>, <strong>Word</strong>, <strong>MOS</strong>, <strong>IC3</strong> hoặc đặt lại bộ lọc.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0057B8] hover:bg-[#003F88] active:bg-[#00336F] text-white font-bold text-xs uppercase tracking-wide shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0057B8]"
              >
                <RotateCcw size={14} />
                <span>Xóa bộ lọc & Xem tất cả</span>
              </button>
            </div>
          )}
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
              Giúp bạn dễ dàng lựa chọn đúng chứng chỉ phù hợp với mục tiêu học tập, tốt nghiệp và nâng cao kỹ năng đi làm.
            </p>
          </div>

          {/* Desktop Table (>= md) */}
          <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <caption className="sr-only">Bảng so sánh chứng chỉ MOS và IC3 GS6</caption>
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th scope="col" className="p-4 sm:p-5 font-black uppercase tracking-wider w-1/4">Tiêu chí so sánh</th>
                  <th scope="col" className="p-4 sm:p-5 font-black uppercase tracking-wider bg-blue-600 w-3/8 text-center">Chứng chỉ MOS (Microsoft)</th>
                  <th scope="col" className="p-4 sm:p-5 font-black uppercase tracking-wider bg-cyan-600 w-3/8 text-center">Chứng chỉ IC3 GS6 (Certiport)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-700">
                <tr className="hover:bg-slate-50 transition-colors">
                  <th scope="row" className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/50">Đơn vị cấp bằng</th>
                  <td className="p-4 sm:p-5 text-center font-bold text-blue-700">Microsoft Corporation (Hoa Kỳ)</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-cyan-700">Certiport (Hoa Kỳ)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <th scope="row" className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/50">Nội dung khảo thí</th>
                  <td className="p-4 sm:p-5">Chuyên sâu từng phần mềm riêng biệt: Word, Excel, PowerPoint. Kiểm tra kỹ năng xử lý văn bản, hàm tính toán, bảng biểu.</td>
                  <td className="p-4 sm:p-5">Tổng quát 3 cấp độ: Kỷ nguyên số, Máy tính căn bản, Ứng dụng số. Kiểm tra hiểu biết bao quát về CNTT, an ninh mạng, đám mây.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <th scope="row" className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/50">Thời hạn giá trị</th>
                  <td className="p-4 sm:p-5 text-center font-bold text-emerald-600">Vô thời hạn (Giá trị vĩnh viễn toàn cầu)</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-emerald-600">Vô thời hạn (Giá trị vĩnh viễn toàn cầu)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <th scope="row" className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/50">Đối tượng & Mục đích</th>
                  <td className="p-4 sm:p-5">Chuẩn đầu ra phổ biến nhất tại các trường ĐH lớn (DNTU, Lạc Hồng, UEH...). Ưu tiên hàng đầu khi ứng tuyển doanh nghiệp.</td>
                  <td className="p-4 sm:p-5">Chuẩn đầu ra công nghệ thông tin cho khối kỹ thuật, sư phạm, và người cần chứng chỉ đánh giá năng lực số tổng quan.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors bg-blue-50/20">
                  <th scope="row" className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/50">Cam kết tại Tin Học Gen Z</th>
                  <td className="p-4 sm:p-5 text-center font-black text-blue-700">Bao đỗ 100% • Ôn cấp tốc 3-5 buổi • Tài trợ học lại 0đ</td>
                  <td className="p-4 sm:p-5 text-center font-black text-cyan-700">Bao đỗ 100% • Ngân hàng đề thi chuẩn 2026 • Máy ảo thực chiến</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Comparison Cards (< md) */}
          <div className="md:hidden space-y-3">
            {[
              {
                title: "Đơn vị cấp bằng",
                mos: "Microsoft Corporation (Hoa Kỳ)",
                ic3: "Certiport (Hoa Kỳ)",
              },
              {
                title: "Nội dung khảo thí",
                mos: "Chuyên sâu từng môn Word, Excel, PowerPoint riêng biệt",
                ic3: "Tổng quát 3 phần: Máy tính, Ứng dụng số, Kỷ nguyên số",
              },
              {
                title: "Thời hạn giá trị",
                mos: "Vô thời hạn (Vĩnh viễn)",
                ic3: "Vô thời hạn (Vĩnh viễn)",
              },
              {
                title: "Mục đích sử dụng",
                mos: "Chuẩn quốc tế phổ biến nhất, ưu tiên tuyển dụng doanh nghiệp",
                ic3: "Chuẩn kỹ năng số toàn diện về máy tính & công nghệ",
              },
              {
                title: "Cam kết tại Tin Học Gen Z",
                mos: "Bao đỗ 100% • Ôn 3 - 5 buổi cấp tốc",
                ic3: "Bao đỗ 100% • Bộ đề chuẩn Certiport 2026",
              },
            ].map((row, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center justify-between">
                  <span>{row.title}</span>
                  <span className="text-[10px] text-slate-400 font-bold">Tiêu chí {idx + 1}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
                    <span className="text-[10px] font-black text-blue-700 uppercase block">MOS</span>
                    <p className="text-slate-800 font-semibold leading-relaxed">{row.mos}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-cyan-50/70 border border-cyan-100 space-y-1">
                    <span className="text-[10px] font-black text-cyan-700 uppercase block">IC3 GS6</span>
                    <p className="text-slate-800 font-semibold leading-relaxed">{row.ic3}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center bg-slate-50">
        <div className="text-slate-400 text-sm font-bold animate-pulse">Đang tải danh mục khóa học...</div>
      </div>
    }>
      <CourseCatalogContent />
    </Suspense>
  );
}
