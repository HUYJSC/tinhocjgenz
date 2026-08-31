import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";
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
              <div key={index} className="text-[11px] leading-normal">
                <span className="font-bold text-slate-500">{label.trim()}: </span>
                <span className="font-black text-blue-600 bg-blue-50/50 border border-blue-100/20 px-1.5 py-0.5 rounded-md inline-block my-0">
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
        <span className="font-black text-slate-900 text-xs sm:text-sm">
          {formatPrice(price)}
        </span>
        {originalPrice && (
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 line-through mt-0">
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-500 overflow-hidden">
      
      {/* Table Header Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-white text-[9px] sm:text-[11px] font-black uppercase tracking-wider border-b border-slate-800">
              <th className="py-3.5 px-5 w-[45%] font-display">Khoản mục / Nội dung</th>
              <th className="py-3.5 px-4 w-[18%] font-display">Giá niêm yết</th>
              <th className="py-3.5 px-4 w-[25%] font-display">Thời lượng / Ghi chú</th>
              <th className="py-3.5 px-4 w-[12%] text-center font-display">Đăng ký</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            
            {/* --- SECTION 1: KHÓA HỌC TIN HỌC VĂN PHÒNG --- */}
            <tr className="bg-blue-600/[0.06]">
              <td colSpan={4} className="py-3 px-5 font-black text-blue-700 text-[10px] sm:text-[11px] tracking-widest uppercase border-l-[3px] border-l-blue-500">
                <div className="flex items-center gap-2 font-display">
                  <BookOpen size={12} className="text-blue-500" />
                  KHÓA HỌC TIN HỌC VĂN PHÒNG CHUYÊN NGHIỆP
                </div>
              </td>
            </tr>
            {coursesData.map((course) => (
              <tr
                key={course.id}
                className={`group smooth-transition ${
                  course.popular
                    ? "bg-blue-50/5 hover:bg-blue-50/10 font-medium"
                    : "hover:bg-slate-50/40"
                }`}
              >
                {/* Title & Badge */}
                <td className="py-3.5 px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 smooth-transition">
                      {course.title}
                    </span>
                    {course.popular && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[8px] font-black text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-sm">
                        <Sparkles size={7} /> HOT
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-[10px] mt-0.5 leading-relaxed line-clamp-1">{course.description}</p>
                </td>
                
                {/* Price */}
                <td className="py-3.5 px-4">
                  {renderPriceCell(course.price, course.originalPrice)}
                </td>
                
                {/* Duration */}
                <td className="py-3.5 px-4">
                  <span className="text-slate-600 font-bold text-[9px] sm:text-[11px] bg-slate-100 border border-slate-200/40 px-2.5 py-1 rounded-lg">
                    {course.duration}
                  </span>
                </td>
                
                {/* Action Link */}
                <td className="py-3.5 px-4 text-center">
                  <Link
                    href={`/lien-he?select=${course.id}`}
                    className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-[10px] font-black tracking-wide uppercase transition-all duration-300 ${
                      course.popular
                        ? "btn-premium-primary"
                        : "btn-premium-secondary"
                    }`}
                  >
                    Đăng ký
                    <ArrowRight size={10} />
                  </Link>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      
      {/* Table Footer Helper */}
      <div className="bg-slate-50/80 px-5 py-4 border-t border-slate-100/80 text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="font-semibold">* Học viên đăng ký theo nhóm từ 3 bạn được giảm ngay 15% - 40% tổng học phí.</p>
        <p className="font-black text-blue-700">Cam kết bao đỗ 100% - Học lại miễn phí nếu chưa đạt!</p>
      </div>

    </div>
  );
}
