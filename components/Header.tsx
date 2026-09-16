import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, GraduationCap } from "lucide-react";

const courseLinks = [
  { href: "/khoa-hoc", label: "Tất cả khóa học", description: "Xem toàn bộ lộ trình học" },
  { href: "/mos", label: "Luyện thi MOS", description: "Word, Excel, PowerPoint" },
  { href: "/ic3", label: "Chứng chỉ IC3 GS6", description: "Nền tảng kỹ năng số quốc tế" },
  { href: "/excel", label: "Excel thực chiến", description: "Hàm, PivotTable và Dashboard" },
  { href: "/word", label: "Word thực chiến", description: "Soạn thảo văn bản chuyên nghiệp" },
  { href: "/powerpoint", label: "PowerPoint", description: "Thiết kế slide và thuyết trình" },
];

const primaryLinks = [
  { href: "/thi-thu", label: "Thi thử" },
  { href: "/tai-lieu", label: "Tài liệu" },
  { href: "/blog", label: "Bài viết" },
  { href: "/bang-gia", label: "Bảng giá" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Tin Học Gen Z - Trang chủ">
          <Image src="/logo-icon.png" alt="" width={40} height={40} priority className="h-10 w-10 object-contain" />
          <span className="leading-tight">
            <strong className="block text-sm font-bold tracking-tight text-slate-950">TIN HỌC GEN Z</strong>
            <span className="mt-0.5 block text-xs font-medium text-slate-500">MOS · IC3 · TIN HỌC VĂN PHÒNG</span>
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-1" aria-label="Điều hướng chính">
          <div className="group relative">
            <Link
              href="/khoa-hoc"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:bg-blue-50 focus-visible:text-blue-700"
            >
              Khóa học
              <ChevronDown size={15} aria-hidden="true" />
            </Link>

            <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-[420px] rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <div className="grid grid-cols-2 gap-1">
                  {courseLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2.5 transition-colors hover:bg-blue-50 focus-visible:bg-blue-50"
                    >
                      <span className="block text-sm font-semibold text-slate-900">{item.label}</span>
                      <span className="mt-0.5 block text-xs leading-5 text-slate-500">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex h-10 items-center rounded-lg px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://hoctructuyen.tinhocgenz.io.vn/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-10 shrink-0 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100 xl:inline-flex"
        >
          <GraduationCap size={17} aria-hidden="true" />
          Hệ thống học tập
        </a>

        <Link
          href="/lien-he"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Đăng ký học
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
