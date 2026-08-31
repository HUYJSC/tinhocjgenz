import Link from "next/link";
import { ArrowLeft, Home, Search, BookOpen, Award, FileSpreadsheet, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50/60 px-4 py-16">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
        <div className="space-y-3">
          <span className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Trang Không Tồn Tại Hoặc Đã Thay Đổi Địa Chỉ
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Đường dẫn bạn truy cập có thể đã được cập nhật sang cấu trúc URL chuẩn SEO mới của Tin Học Gen Z.
          </p>
        </div>

        {/* Quick Hub Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <Link
            href="/mos"
            className="p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs font-bold text-slate-800 flex flex-col items-center gap-1.5"
          >
            <Award className="w-5 h-5 text-blue-600" />
            <span>Luyện Thi MOS</span>
          </Link>
          <Link
            href="/ic3"
            className="p-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-xs font-bold text-slate-800 flex flex-col items-center gap-1.5"
          >
            <Award className="w-5 h-5 text-indigo-600" />
            <span>Chứng Chỉ IC3</span>
          </Link>
          <Link
            href="/excel"
            className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs font-bold text-slate-800 flex flex-col items-center gap-1.5"
          >
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <span>Khóa Học Excel</span>
          </Link>
          <Link
            href="/blog"
            className="p-3 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all text-xs font-bold text-slate-800 flex flex-col items-center gap-1.5"
          >
            <BookOpen className="w-5 h-5 text-amber-600" />
            <span>Blog Tin Học</span>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </Link>
          <a
            href={SITE_CONFIG.contact.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-blue-600" />
            <span>Hỗ Trợ Zalo 24/7</span>
          </a>
        </div>
      </div>
    </div>
  );
}
