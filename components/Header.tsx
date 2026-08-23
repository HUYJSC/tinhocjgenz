"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Laptop } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection to adjust styling dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation Links
  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Khóa học MOS/IC3", href: "/khoa-hoc" },
    { label: "Thi Thử Online", href: "/thi-thu" },
    { label: "Tài Liệu Free", href: "/tai-lieu" },
    { label: "Bảng Giá", href: "/bang-gia" },
    { label: "Giới Thiệu", href: "/gioi-thieu" },
    { label: "Liên Hệ", href: "/lien-he" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-2.5 sm:py-3 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Typography - NO SQUARE BOX, SEAMLESS TRANSPARENT */}
          <Link href="/" className="group shrink-0 flex items-center gap-3 sm:gap-3.5 py-1">
            <img 
              src="/logo-icon.png" 
              alt="PH Digital Education Logo" 
              className="h-10 sm:h-12 md:h-13 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" 
            />
            <div className="flex flex-col justify-center">
              <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 leading-tight group-hover:text-blue-600 transition-colors font-display">
                PH DIGITAL EDUCATION
              </span>
              <div className="text-[9px] sm:text-[11px] font-bold tracking-wider mt-0.5 flex items-center gap-1 sm:gap-1.5 leading-none">
                <span className="hidden sm:inline text-slate-500">Information Technology</span>
                <span className="inline sm:hidden text-slate-500">IT</span>
                <span className="text-amber-500 font-black">•</span>
                <span className="text-blue-600 font-black">IC3</span>
                <span className="text-amber-500 font-black">•</span>
                <span className="text-indigo-600 font-black">MOS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1.5 px-0.5 text-xs lg:text-sm font-black tracking-wide transition-all duration-300 nav-link-animated ${
                    isActive
                      ? "text-blue-600 nav-link-active"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-extrabold tracking-wide uppercase btn-premium-primary group"
            >
              Đăng ký ngay
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-slate-50 text-slate-600 focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xl animate-fade-in z-50">
          <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "text-blue-600 bg-blue-50/50"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/lien-he"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-3 rounded-full text-xs font-extrabold tracking-wide uppercase btn-premium-primary"
              >
                Đăng ký ngay
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
