import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { coursesData } from "@/data/mockData";

export default function PricingTable() {
  // Format price into localized currency style or return raw string
  const formatPrice = (value: string | number) => {
    if (typeof value === "string") return value;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replace("₫", "đ");
  };

  // Helper to render pricing cell elegantly in the table
  const renderPriceCell = (price: string | number, originalPrice?: string | number) => {
    const priceStr = String(price);
    
    if (priceStr.includes("|")) {
      const parts = priceStr.split("|");
      return (
        <div className="flex flex-col gap-0.5 py-0.5">
          {parts.map((part, index) => {
            const [label, val] = part.split(":");
            return (
              <div key={index} className="text-xs leading-normal">
                <span className="font-bold text-slate-700">{label.trim()}: </span>
                <span className="font-bold text-[#0057B8] bg-[#F4F8FD] border border-[#E2E8F0] px-1.5 py-0.5 rounded-md inline-block my-0">
                  {val?.trim() || part.trim()}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <span className="font-bold text-slate-900 text-xs sm:text-sm">
          {formatPrice(price)}
        </span>
        {originalPrice && (
          <span className="text-xs sm:text-xs font-semibold text-slate-500 line-through mt-0">
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
      
      {/* Mobile Card List (< sm) */}
      <div className="sm:hidden divide-y divide-[#E2E8F0]">
        <div className="bg-[#F4F8FD] py-3 px-4 font-bold text-[#0057B8] text-xs tracking-wider uppercase border-l-[3px] border-l-[#0057B8] flex items-center gap-2">
          <BookOpen size={14} className="text-[#0057B8]" />
          <span>Khóa Học Tin Học Văn Phòng Chuyên Nghiệp</span>
        </div>
        {coursesData.map((course) => (
          <div key={course.id} className="p-4 space-y-3 bg-white">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-[#0B2545] text-base leading-snug">
                  {course.title}
                </h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">{course.description}</p>
              </div>
              {course.popular && (
                <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold text-[#0057B8] bg-[#F4F8FD] border border-[#E2E8F0]">
                  Khuyên dùng
                </span>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#E2E8F0]">
              <div>
                <span className="text-xs font-bold text-slate-500 block">Học phí trọn gói</span>
                {renderPriceCell(course.price, course.originalPrice)}
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-500 block">Thời lượng</span>
                <span className="text-slate-700 font-bold text-xs bg-slate-100 px-2 py-1 rounded-md inline-block border border-slate-200">
                  {course.duration}
                </span>
              </div>
            </div>

            <Link
              href={`/lien-he?select=${course.id}`}
              className={`w-full min-h-11 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide uppercase transition-colors flex items-center justify-center gap-2 ${
                course.popular
                  ? "bg-[#0057B8] hover:bg-[#003F88] text-white shadow-sm"
                  : "bg-white hover:bg-[#F4F8FD] text-slate-700 hover:text-[#0057B8] border border-slate-300 hover:border-[#0057B8]"
              }`}
            >
              <span>Đăng Ký Tư Vấn</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop / Tablet Table (>= sm) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0B2545] text-white text-xs sm:text-xs font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-5 w-[45%]">Khoản mục / Nội dung</th>
              <th className="py-3.5 px-4 w-[18%]">Giá niêm yết</th>
              <th className="py-3.5 px-4 w-[25%]">Thời lượng / Ghi chú</th>
              <th className="py-3.5 px-4 w-[12%] text-center">Đăng ký</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[#E2E8F0] text-xs sm:text-sm">
            
            {/* --- SECTION 1: KHÓA HỌC TIN HỌC VĂN PHÒNG --- */}
            <tr className="bg-[#F4F8FD]">
              <td colSpan={4} className="py-3 px-5 font-bold text-[#0057B8] text-xs tracking-widest uppercase border-l-[3px] border-l-[#0057B8]">
                <div className="flex items-center gap-2">
                  <BookOpen size={13} className="text-[#0057B8]" />
                  KHÓA HỌC TIN HỌC VĂN PHÒNG CHUYÊN NGHIỆP
                </div>
              </td>
            </tr>
            {coursesData.map((course) => (
              <tr
                key={course.id}
                className={`group transition-colors ${
                  course.popular
                    ? "bg-[#F4F8FD]/50 hover:bg-[#F4F8FD] font-medium"
                    : "hover:bg-slate-50/70"
                }`}
              >
                {/* Title & Badge */}
                <td className="py-3.5 px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#0B2545] text-xs sm:text-sm group-hover:text-[#0057B8] transition-colors">
                      {course.title}
                    </span>
                    {course.popular && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold text-[#0057B8] bg-[#F4F8FD] border border-[#E2E8F0]">
                        Khuyên dùng
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed line-clamp-1">{course.description}</p>
                </td>
                
                {/* Price */}
                <td className="py-3.5 px-4">
                  {renderPriceCell(course.price, course.originalPrice)}
                </td>
                
                {/* Duration */}
                <td className="py-3.5 px-4">
                  <span className="text-slate-700 font-semibold text-xs bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                    {course.duration}
                  </span>
                </td>
                
                {/* Action Link */}
                <td className="py-3.5 px-4 text-center">
                  <Link
                    href={`/lien-he?select=${course.id}`}
                    className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors ${
                      course.popular
                        ? "bg-[#0057B8] hover:bg-[#003F88] text-white shadow-sm"
                        : "bg-white hover:bg-[#F4F8FD] text-slate-700 hover:text-[#0057B8] border border-slate-300 hover:border-[#0057B8]"
                    }`}
                  >
                    Đăng ký
                    <ArrowRight size={11} />
                  </Link>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      
      {/* Table Footer Helper */}
      <div className="bg-[#F4F8FD] px-5 py-4 border-t border-[#E2E8F0] text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="font-semibold text-slate-700">* Học viên đăng ký theo nhóm từ 3 bạn được giảm ngay 15% - 40% tổng học phí.</p>
        <p className="font-bold text-[#0057B8]">Cam kết bao đỗ 100% - Học lại miễn phí nếu chưa đạt!</p>
      </div>

    </div>
  );
}
