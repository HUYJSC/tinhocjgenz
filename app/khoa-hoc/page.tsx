"use client";

import { useState, useTransition, Suspense, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/mockData";
import { matchesSearch } from "@/lib/text-utils";
import { Search, X, BookOpen, RotateCcw, Award, FileSpreadsheet } from "lucide-react";

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
    <div className="flex flex-col w-full bg-white text-[#0057B8]">
      
      {/* 1. Compact Header & Search (IA-01: Concise title, 2 lines desc, immediate search) */}
      <section className="bg-white pt-8 pb-8 sm:pt-10 sm:pb-10 border-b border-[#0057B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black text-[#0057B8] tracking-tight leading-tight font-display">
            Khóa học tin học
          </h1>
          
          <p className="text-[#0057B8] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Học thực chiến cùng giảng viên đạt chuẩn quốc tế MOS Master. Làm chủ kỹ năng số trong học tập và công việc.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <label htmlFor="course-search-input" className="sr-only">
                Tìm kiếm khóa học
              </label>
              <div className="absolute left-4 pointer-events-none text-[#0057B8]">
                <Search size={18} />
              </div>
              <input
                id="course-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm khóa học (Word, Excel, MOS, IC3)..."
                className="w-full min-h-[48px] pl-11 pr-10 py-3 rounded-xl bg-white border-2 border-[#0057B8] text-[#0057B8] text-sm font-semibold placeholder-[#0057B8]/60 focus:outline-none focus:ring-2 focus:ring-[#0057B8] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 p-1 rounded-full text-[#0057B8] hover:bg-[#0057B8] hover:text-white transition-colors"
                  aria-label="Xóa từ khóa tìm kiếm"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs: Short, clear labels */}
          <div
            className="pt-2 -mx-4 px-4 flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar snap-x"
            role="tablist"
            aria-label="Lọc khóa học theo nhóm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
              className={`min-h-10 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap snap-start cursor-pointer border border-[#0057B8] ${
                selectedCategory === "all"
                  ? "bg-[#0057B8] text-white"
                  : "bg-white text-[#0057B8] hover:bg-[#0057B8] hover:text-white"
              }`}
            >
              Tất cả ({coursesData.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "mos-ic3"}
              onClick={() => setSelectedCategory("mos-ic3")}
              className={`min-h-10 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap snap-start cursor-pointer border border-[#0057B8] ${
                selectedCategory === "mos-ic3"
                  ? "bg-[#0057B8] text-white"
                  : "bg-white text-[#0057B8] hover:bg-[#0057B8] hover:text-white"
              }`}
            >
              <Award size={14} className="inline-block mr-1.5 align-[-2px]" aria-hidden="true" />
              MOS & IC3
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "practical-office"}
              onClick={() => setSelectedCategory("practical-office")}
              className={`min-h-10 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap snap-start cursor-pointer border border-[#0057B8] ${
                selectedCategory === "practical-office"
                  ? "bg-[#0057B8] text-white"
                  : "bg-white text-[#0057B8] hover:bg-[#0057B8] hover:text-white"
              }`}
            >
              <FileSpreadsheet size={14} className="inline-block mr-1.5 align-[-2px]" aria-hidden="true" />
              Tin học & AI văn phòng
            </button>
          </div>
        </div>
      </section>

      {/* 2. Courses Grid Section */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Results bar */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#0057B8] text-xs font-bold text-[#0057B8]">
            <div>
              Hiển thị <span className="font-black">{filteredCourses.length}</span> / {coursesData.length} khóa học
              {searchQuery && (
                <span className="ml-1">
                  cho từ khóa &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>

            {(searchQuery || selectedCategory !== "all") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-[#0057B8] hover:underline font-bold cursor-pointer"
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
            <div className="bg-white rounded-2xl border-2 border-[#0057B8] p-10 sm:p-14 text-center max-w-lg mx-auto space-y-4">
              <div className="w-14 h-14 rounded-xl border border-[#0057B8] text-[#0057B8] flex items-center justify-center mx-auto">
                <BookOpen size={28} />
              </div>
              <h3 className="text-lg font-black text-[#0057B8]">
                Không tìm thấy khóa học phù hợp
              </h3>
              <p className="text-[#0057B8] text-xs sm:text-sm leading-relaxed">
                Không có kết quả nào khớp với &ldquo;{searchQuery}&rdquo;. Hãy thử tìm kiếm với các từ khóa phổ biến: <strong>Excel</strong>, <strong>Word</strong>, <strong>MOS</strong>, <strong>IC3</strong> hoặc đặt lại bộ lọc.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0057B8] hover:bg-white text-white hover:text-[#0057B8] border border-[#0057B8] font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Xóa bộ lọc & Xem tất cả</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. MOS vs IC3 Comparison Matrix (Two-Color System) */}
      <section className="py-14 bg-white border-t border-[#0057B8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0057B8]">
              So sánh chứng chỉ: MOS và IC3 GS6
            </h2>
            <p className="text-[#0057B8] text-xs sm:text-sm max-w-xl mx-auto">
              Lựa chọn đúng chứng chỉ phù hợp với mục tiêu tốt nghiệp và yêu cầu công việc.
            </p>
          </div>

          {/* Desktop Table (>= md) */}
          <div className="hidden md:block overflow-hidden rounded-2xl border-2 border-[#0057B8]">
            <table className="w-full text-left text-xs border-collapse">
              <caption className="sr-only">Bảng so sánh chứng chỉ MOS và IC3 GS6</caption>
              <thead>
                <tr className="bg-[#0057B8] text-white">
                  <th scope="col" className="p-4 font-black uppercase tracking-wider w-1/4 border-r border-white">Tiêu chí</th>
                  <th scope="col" className="p-4 font-black uppercase tracking-wider w-3/8 text-center border-r border-white">Chứng chỉ MOS (Microsoft)</th>
                  <th scope="col" className="p-4 font-black uppercase tracking-wider w-3/8 text-center">Chứng chỉ IC3 GS6 (Certiport)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0057B8] bg-white font-medium text-[#0057B8]">
                <tr>
                  <th scope="row" className="p-4 font-bold border-r border-[#0057B8]">Đơn vị cấp bằng</th>
                  <td className="p-4 text-center font-bold border-r border-[#0057B8]">Microsoft Corporation (Hoa Kỳ)</td>
                  <td className="p-4 text-center font-bold">Certiport (Hoa Kỳ)</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-bold border-r border-[#0057B8]">Nội dung khảo thí</th>
                  <td className="p-4 border-r border-[#0057B8]">Từng phần mềm chuyên sâu: Word, Excel, PowerPoint. Xử lý văn bản, hàm tính, trình chiếu.</td>
                  <td className="p-4">Kỹ năng số tổng quan: Máy tính căn bản, Ứng dụng số, Cuộc sống trực tuyến.</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-bold border-r border-[#0057B8]">Thời hạn giá trị</th>
                  <td className="p-4 text-center font-bold border-r border-[#0057B8]">Vô thời hạn (Toàn cầu)</td>
                  <td className="p-4 text-center font-bold">Vô thời hạn (Toàn cầu)</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-bold border-r border-[#0057B8]">Đối tượng & Mục đích</th>
                  <td className="p-4 border-r border-[#0057B8]">Chuẩn đầu ra phổ biến tại các trường Đại học; ưu tiên tuyển dụng doanh nghiệp.</td>
                  <td className="p-4">Chuẩn năng lực số cho khối kỹ thuật, giáo dục và người cần bằng đánh giá CNTT tổng quát.</td>
                </tr>
                <tr className="bg-white">
                  <th scope="row" className="p-4 font-bold border-r border-[#0057B8]">Cam kết đào tạo</th>
                  <td className="p-4 text-center font-bold border-r border-[#0057B8]">Luyện đề trên máy ảo • Hỗ trợ học lại miễn phí</td>
                  <td className="p-4 text-center font-bold">Bộ đề chuẩn Certiport • Hỗ trợ học lại miễn phí</td>
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
                mos: "Từng phần mềm Word, Excel, PowerPoint chuyên sâu",
                ic3: "Tổng quát 3 phần: Máy tính, Ứng dụng số, Kỷ nguyên số",
              },
              {
                title: "Thời hạn giá trị",
                mos: "Vô thời hạn (Vĩnh viễn)",
                ic3: "Vô thời hạn (Vĩnh viễn)",
              },
              {
                title: "Mục đích sử dụng",
                mos: "Chuẩn đầu ra ĐH, ưu tiên ứng tuyển doanh nghiệp",
                ic3: "Chứng chỉ kỹ năng số toàn diện chuẩn Certiport",
              },
            ].map((row, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-[#0057B8] space-y-2 text-[#0057B8]">
                <div className="text-xs font-black uppercase tracking-wider border-b border-[#0057B8] pb-1.5 flex items-center justify-between">
                  <span>{row.title}</span>
                  <span className="text-[10px] font-bold">Tiêu chí {idx + 1}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-[#0057B8] space-y-1">
                    <span className="text-[10px] font-black uppercase block">MOS</span>
                    <p className="font-semibold">{row.mos}</p>
                  </div>
                  <div className="p-2.5 rounded-lg border border-[#0057B8] space-y-1">
                    <span className="text-[10px] font-black uppercase block">IC3 GS6</span>
                    <p className="font-semibold">{row.ic3}</p>
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
      <div className="min-h-[50vh] flex items-center justify-center bg-white">
        <div className="text-[#0057B8] text-sm font-bold animate-pulse">Đang tải danh mục khóa học...</div>
      </div>
    }>
      <CourseCatalogContent />
    </Suspense>
  );
}
