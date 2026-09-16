import Link from "next/link";
import { ArrowLeft, Home, Search, BookOpen, Award, FileSpreadsheet, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#FFFFFF] px-4 py-16">
      <div className="max-w-2xl w-full text-center space-y-8 bg-[#FFFFFF] p-8 sm:p-12 rounded-2xl border-2 border-[#0057B8]">
        <div className="space-y-3">
          <span className="text-6xl sm:text-7xl font-black text-[#0057B8] font-mono">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0057B8]">
            Trang Không Tồn Tại Hoặc Đã Thay Đổi Địa Chỉ
          </h1>
          <p className="text-[#0057B8] text-sm sm:text-base max-w-lg mx-auto">
            Đường dẫn bạn truy cập có thể đã được cập nhật sang cấu trúc URL chuẩn SEO mới của Tin Học Gen Z.
          </p>
        </div>

        {/* Quick Hub Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <Link
            href="/mos"
            className="p-3 rounded-xl border-2 border-[#0057B8] hover:bg-[#0057B8] hover:text-[#FFFFFF] transition-colors text-xs font-bold text-[#0057B8] flex flex-col items-center gap-1.5"
          >
            <Award className="w-5 h-5" />
            <span>Luyện Thi MOS</span>
          </Link>
          <Link
            href="/ic3"
            className="p-3 rounded-xl border-2 border-[#0057B8] hover:bg-[#0057B8] hover:text-[#FFFFFF] transition-colors text-xs font-bold text-[#0057B8] flex flex-col items-center gap-1.5"
          >
            <Award className="w-5 h-5" />
            <span>Chứng Chỉ IC3</span>
          </Link>
          <Link
            href="/excel"
            className="p-3 rounded-xl border-2 border-[#0057B8] hover:bg-[#0057B8] hover:text-[#FFFFFF] transition-colors text-xs font-bold text-[#0057B8] flex flex-col items-center gap-1.5"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span>Khóa Học Excel</span>
          </Link>
          <Link
            href="/blog"
            className="p-3 rounded-xl border-2 border-[#0057B8] hover:bg-[#0057B8] hover:text-[#FFFFFF] transition-colors text-xs font-bold text-[#0057B8] flex flex-col items-center gap-1.5"
          >
            <BookOpen className="w-5 h-5" />
            <span>Blog Tin Học</span>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t-2 border-[#0057B8]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#FFFFFF] bg-[#0057B8] border-2 border-[#0057B8] hover:bg-[#FFFFFF] hover:text-[#0057B8] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </Link>
          <a
            href={SITE_CONFIG.contact.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0057B8] bg-[#FFFFFF] border-2 border-[#0057B8] hover:bg-[#0057B8] hover:text-[#FFFFFF] transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Hỗ Trợ Zalo 24/7</span>
          </a>
        </div>
      </div>
    </div>
  );
}
