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
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Khóa học", href: "/khoa-hoc" },
    { label: "Dịch vụ", href: "/dich-vu" },
    { label: "Bảng giá", href: "/bang-gia" },
    { label: "Liên hệ", href: "/lien-he" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 w-full ${
        scrolled
          ? "bg-white/75 backdrop-blur-md border-b border-slate-100/80 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.03)] py-2"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="group shrink-0">
            <div className="bg-white/80 hover:bg-white border border-slate-200/60 hover:border-slate-300/80 rounded-xl px-3 py-1.5 smooth-transition">
              <img 
                src="/logo-wide.png" 
                alt="TinhocGenZ Logo" 
                className="h-9 md:h-10 w-auto group-hover:scale-[1.02] transition-all duration-500 ease-out" 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1.5 px-0.5 text-xs lg:text-sm font-bold tracking-wide transition-all duration-300 nav-link-animated ${
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
